import { Component, ErrorInfo, PropsWithChildren } from "react";
import { Box, Button, Typography } from "@mui/material";

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  PropsWithChildren,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Uncaught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            height: "100dvh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            p: 2,
          }}
        >
          <Typography variant="h6">Something went wrong.</Typography>
          <Button onClick={() => (window.location.href = "/")}>
            Go to home
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}
