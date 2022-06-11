import i18n from "i18next";
import jaTranslation from "./ja/translation.json";
import { initReactI18next } from "react-i18next";

const resources = {
  ja: {
    translation: jaTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources: resources,
  lng: "ja",
  fallbackLng: "ja",

  interpolation: {
    escapeValue: false,
  },
});

export const jaTranslate = (key: string): string => {
  return i18n.t(key) as string;
}

export default i18n;
