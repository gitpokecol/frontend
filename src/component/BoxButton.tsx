import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { PIXEL_ACCENT_COLOR, PIXEL_BORDER_COLOR } from "../style/pixel";

const BoxButton = styled(Button)({
  boxShadow: `3px 3px 0 ${PIXEL_BORDER_COLOR}`,
  textTransform: "none",
  fontSize: 16,
  color: "#000000",
  border: `3px solid ${PIXEL_BORDER_COLOR}`,
  borderRadius: 6,
  backgroundColor: "#FFFFFF",
  transition: "transform 80ms ease-out, box-shadow 80ms ease-out",
  "&:hover": {
    backgroundColor: "#FFFFFF",
    color: PIXEL_ACCENT_COLOR,
    borderColor: PIXEL_ACCENT_COLOR,
    boxShadow: `3px 3px 0 ${PIXEL_ACCENT_COLOR}`,
  },
  "&:active": {
    color: PIXEL_ACCENT_COLOR,
    backgroundColor: "#FFFFFF",
    borderColor: PIXEL_ACCENT_COLOR,
    transform: "translate(3px, 3px)",
    boxShadow: `0 0 0 ${PIXEL_ACCENT_COLOR}`,
  },
  "&.Mui-disabled": {
    backgroundColor: "#F5F5F5",
    borderColor: "#A0A0A0",
    color: "#A0A0A0",
    boxShadow: "3px 3px 0 #A0A0A0",
  },
});

export default BoxButton;
