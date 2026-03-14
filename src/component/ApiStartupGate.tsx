import { useEffect, useState, PropsWithChildren } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const API_HOST = process.env.REACT_APP_API_HOST;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const PixelLoader = () => {
    const size = 16;
    return (
        <>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 1 }}>
                {Array.from({ length: 3 }).map((_, i) => (
                    <Box
                        key={i}
                        sx={{
                            width: size,
                            height: size,
                            bgcolor: "#ff3b3b",
                            border: "2px solid #000",
                            boxSizing: "border-box",
                            imageRendering: "pixelated",
                            transformOrigin: "center",
                            animation: `bounce 700ms ${i * 150}ms infinite cubic-bezier(.2,.7,.2,1)`,
                        }}
                    />
                ))}
            </Box>
            <Box component="style">{`
                @keyframes bounce {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-10px); }
                }
            `}</Box>
        </>
    );
};

export default function ApiStartupGate({ children }: PropsWithChildren) {
    const { t } = useTranslation();
    const [status, setStatus] = useState<"checking" | "ready" | "failed">(
        "checking"
    );

    useEffect(() => {
        let active = true;

        const pingOnce = async () => {
            if (!API_HOST) return false;
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 3000);
            try {
                const res = await fetch(`${API_HOST}/healthcheck`, {
                    method: "GET",
                    credentials: "include",
                    signal: controller.signal,
                });
                clearTimeout(timeout);
                return res.ok;
            } catch (e) {
                clearTimeout(timeout);
                return false;
            }
        };

        const runChecks = async () => {
            setStatus("checking");
            for (let i = 1; i <= 5; i++) {
                if (!active) return;
                const ok = await pingOnce();
                if (ok) {
                    if (!active) return;
                    setStatus("ready");
                    return;
                }
                // wait 5s before next try
                await sleep(5000);
            }
            if (!active) return;
            setStatus("failed");
        };

        runChecks();

        return () => {
            active = false;
        };
    }, []);

    if (status === "ready") return <>{children}</>;

    return (
        <Box
            sx={{
                height: "100dvh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 2,
                p: 2,
            }}
        >
            {status === "checking" ? (
                <>
                    <PixelLoader />
                    <Typography>{t("startup.waking")}</Typography>
                </>
            ) : (
                <>
                    <Typography variant="h6">{t("startup.cannotWake")}</Typography>
                    <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                        <Button
                            onClick={() => {
                                setTimeout(() => window.location.reload(), 0);
                            }}
                        >
                            {t("retry")}
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
}
