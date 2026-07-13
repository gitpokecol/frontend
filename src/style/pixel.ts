export const PIXEL_INK = "#33323C";
export const PIXEL_ACCENT = "#3D96FF";
export const PIXEL_FRAME_LINE = "#BFD3EE";
export const PIXEL_BUTTON_LIP = "#C9D4E4";
export const PIXEL_BUTTON_LIP_ACCENT = "#BFDCFF";
export const PIXEL_DISABLED = "#A6A6B0";

const svgUri = (svg: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

const dialogFrameTile = (ink: string, line: string) =>
  svgUri(
    `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" shape-rendering="crispEdges">` +
      `<rect x="1" y="1" width="10" height="10" fill="#FFFFFF"/>` +
      `<path fill="${line}" d="M4 2h1v1h-1zM5 2h2v1h-2zM7 2h1v1h-1zM3 3h1v1h-1zM8 3h1v1h-1zM2 4h1v1h-1zM9 4h1v1h-1zM2 5h1v2h-1zM9 5h1v2h-1zM2 7h1v1h-1zM9 7h1v1h-1zM3 8h1v1h-1zM8 8h1v1h-1zM2 9h1v1h-1zM4 9h1v1h-1zM5 9h2v1h-2zM7 9h1v1h-1zM9 9h1v1h-1z"/>` +
      `<path fill="${ink}" d="M2 0h3v1h-3zM7 0h3v1h-3zM5 0h2v1h-2zM1 1h1v1h-1zM10 1h1v1h-1zM0 2h1v3h-1zM11 2h1v3h-1zM0 5h1v2h-1zM11 5h1v2h-1zM0 7h1v3h-1zM11 7h1v3h-1zM1 10h1v1h-1zM10 10h1v1h-1zM2 11h3v1h-3zM5 11h2v1h-2zM7 11h3v1h-3z"/>` +
      `</svg>`
  );

const buttonFrameTile = (ink: string, lip?: string) =>
  svgUri(
    `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" shape-rendering="crispEdges">` +
      `<rect x="1" y="1" width="8" height="8" fill="#FFFFFF"/>` +
      (lip ? `<path fill="${lip}" d="M2 8h6v1h-6zM1 7h1v1h-1zM8 7h1v1h-1z"/>` : "") +
      `<path fill="${ink}" d="M2 0h2v1h-2zM4 0h2v1h-2zM6 0h2v1h-2zM1 1h1v1h-1zM8 1h1v1h-1zM0 2h1v2h-1zM9 2h1v2h-1zM0 4h1v2h-1zM9 4h1v2h-1zM0 6h1v2h-1zM9 6h1v2h-1zM1 8h1v1h-1zM8 8h1v1h-1zM2 9h2v1h-2zM4 9h2v1h-2zM6 9h2v1h-2z"/>` +
      `</svg>`
  );

export const pixelCard = {
  boxSizing: "border-box",
  border: "10px solid transparent",
  borderImageSource: dialogFrameTile(PIXEL_INK, PIXEL_FRAME_LINE),
  borderImageSlice: "5 fill",
  borderImageRepeat: "stretch",
  borderRadius: 0,
  background: "transparent",
};

export const pixelFrame = {
  ...pixelCard,
  borderImageSlice: "5",
  backgroundClip: "padding-box",
};

export const pixelButtonFrames = {
  normal: buttonFrameTile(PIXEL_INK, PIXEL_BUTTON_LIP),
  hover: buttonFrameTile(PIXEL_ACCENT, PIXEL_BUTTON_LIP_ACCENT),
  pressed: buttonFrameTile(PIXEL_ACCENT),
  disabled: buttonFrameTile(PIXEL_DISABLED),
};
