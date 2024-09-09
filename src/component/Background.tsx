/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import backgroundImage from "../asset/background.png";
import greyBackgroundImage from "../asset/background-grey.png";
import smallBackgroundImage from "../asset/background-small.png";
import { BackgroundTheme } from "../type/background";
import { useRecoilValue } from "recoil";
import { backgroundThemeState } from "../store/background";

const animatedBackground = keyframes`
    from {
        background-position: 0 0;
    }
    to {
        background-position: -10000px -10000px;
    }
`;

const backgroundStyling = (theme?: BackgroundTheme) => {
  let image = null;

  if (theme === "grey") {
    image = greyBackgroundImage;
  } else if (theme === "small") {
    image = smallBackgroundImage;
  } else {
    image = backgroundImage;
  }

  return css({
    width: "100vw",
    height: "100vh",
    position: "fixed",
    overflow: "hidden",
    zIndex: -1,

    ":before": {
      content: '""',
      position: "absolute",
      width: "200%",
      height: "200%",
      top: "-50%",
      left: "-50%",
      background: `url(${image})`,
      backgroundRepeat: "repeat",
      backgroundPosition: "0 0",
      backgroundSize: "auto auto",
      animation: `${animatedBackground} 500s linear infinite`,
      transform: "rotate(-12deg)",
    },
  });
};

export default function Background() {
  const backgroundTheme = useRecoilValue(backgroundThemeState);

  return <div css={backgroundStyling(backgroundTheme)}></div>;
}
