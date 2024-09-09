import { atom } from "recoil";
import { BackgroundTheme } from "../type/background";

export const backgroundThemeState = atom<BackgroundTheme>({
  key: "backgroundTheme",
  default: "default",
});
