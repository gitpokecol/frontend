export const PIXEL_BORDER_COLOR = "#2b2b2b";
export const PIXEL_ACCENT_COLOR = "#3D96FF";

export const pixelFrame = {
  border: `3px solid ${PIXEL_BORDER_COLOR}`,
  borderRadius: "8px",
  boxShadow:
    "inset 0 0 0 2px rgba(255, 255, 255, 0.65), 4px 4px 0 rgba(0, 0, 0, 0.2)",
};

export const pixelCard = {
  ...pixelFrame,
  background: "#FFFFFF",
  boxShadow:
    "inset 0 0 0 2px #FFFFFF, inset 0 0 0 4px #D8D8D8, 4px 4px 0 rgba(0, 0, 0, 0.2)",
};
