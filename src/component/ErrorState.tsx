import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import BoxButton from "./BoxButton";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  const { t } = useTranslation();

  return (
    <Stack
      height="100%"
      alignItems="center"
      justifyContent="center"
      gap={3}
      paddingX={2}
    >
      <Typography textAlign="center">{message ?? t("error.generic")}</Typography>
      {onRetry && (
        <BoxButton onClick={onRetry}>
          <Typography>{t("retry")}</Typography>
        </BoxButton>
      )}
    </Stack>
  );
}
