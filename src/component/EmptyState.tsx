import { Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

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
      gap={3}
      paddingX={2}
    >
      <Typography textAlign="center">{message}</Typography>
      {action}
    </Stack>
  );
}
