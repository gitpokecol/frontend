/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface PixelatedProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
}

const pixelatedStyling = css({
  imageRendering: "pixelated",
});

export default function PixelatedImage({ alt, ...attributes }: PixelatedProps) {
  return <img css={pixelatedStyling} alt={alt} {...attributes} />;
}
