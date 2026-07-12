import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

interface LoaderProps {
  fillHeight?: boolean;
}

export default function Loader({ fillHeight = true }: LoaderProps) {
  const { t } = useTranslation();
  const size = 16;

  return (
    <Box
      role="status"
      aria-live="polite"
      aria-busy="true"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: fillHeight ? "100%" : "auto",
        width: "100%",
        py: fillHeight ? 0 : 4,
      }}
    >
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
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
              animation: `loader-bounce 700ms ${i * 150}ms infinite cubic-bezier(.2,.7,.2,1)`,
            }}
          />
        ))}
      </Box>
      <Box component="style">{`
        @keyframes loader-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</Box>
      <Box
        component="span"
        sx={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          whiteSpace: "nowrap",
        }}
      >
        {t("loading")}
      </Box>
    </Box>
  );
}
