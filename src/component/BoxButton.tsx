import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const BoxButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  color: "#000000",
  border: "4px solid",
  backgroundColor: "#FFFFFF",
  borderColor: "#000000",
  "&:hover": {
    backgroundColor: "#FFFFFF",
    color: "#3D96FF",
    borderColor: "#3D96FF",
  },
  "&:active": {
    color: "#3D96FF",
    backgroundColor: "#FFFFFF",
    borderColor: "#3D96FF",
  },
});

export default BoxButton;
