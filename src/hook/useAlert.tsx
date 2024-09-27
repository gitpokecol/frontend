import { Typography } from "@mui/material";
import { useSnackbar } from "notistack";

export default function useAlert() {
  const { enqueueSnackbar } = useSnackbar();
  const alert = (
    message: string,
    variant: "default" | "error" | "success" | "warning" | "info"
  ) => {
    enqueueSnackbar(
      <Typography fontSize={25} sx={{ textShadow: "none" }}>
        {message}
      </Typography>,
      { variant }
    );
  };

  return alert;
}
