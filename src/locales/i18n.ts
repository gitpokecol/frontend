import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./en.json";
import korean from "./ko.json";
import { LANGUAGE_KEY } from "../constant/common";

const resources = {
  en: {
    translation: english,
  },
  ko: {
    translation: korean,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem(LANGUAGE_KEY) || navigator.language,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
