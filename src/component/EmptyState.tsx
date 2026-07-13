import { Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import { pixelCard } from "../style/pixel";

interface EmptyStateProps {
  message: string;
  action?: ReactNode;
}

export default function EmptyState({ message, action }: EmptyStateProps) {
  return (
    <Stack
      height="100%"
      alignItems="center"
      justifyContent="center"
      paddingX={2}
    >
      <Stack sx={pixelCard} alignItems="center" gap={3} padding={4}>
        <Typography textAlign="center">{message}</Typography>
        {action}
      </Stack>
    </Stack>
  );
}
