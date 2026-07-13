import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  PIXEL_ACCENT,
  PIXEL_DISABLED,
  pixelButtonFrames,
} from "../style/pixel";

const BoxButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  color: "#000000",
  borderRadius: 0,
  border: "8px solid transparent",
  borderImageSource: pixelButtonFrames.normal,
  borderImageSlice: "4 fill",
  borderImageRepeat: "stretch",
  backgroundColor: "transparent",
  padding: "2px 12px",
  transition: "none",
  "&:hover": {
    backgroundColor: "transparent",
    color: PIXEL_ACCENT,
    borderImageSource: pixelButtonFrames.hover,
  },
  "&:active": {
    backgroundColor: "transparent",
    color: PIXEL_ACCENT,
    borderImageSource: pixelButtonFrames.pressed,
    transform: "translateY(2px)",
  },
  "&:focus-visible": {
    outline: `2px solid ${PIXEL_ACCENT}`,
    outlineOffset: 2,
  },
  "&.Mui-disabled": {
    color: PIXEL_DISABLED,
    borderImageSource: pixelButtonFrames.disabled,
  },
});

export default BoxButton;
