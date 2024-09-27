import { atom } from "recoil";

export const languageState = atom<string>({
  key: "language",
  default: navigator.language,
});
