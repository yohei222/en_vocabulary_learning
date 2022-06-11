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

export const jaTranslate = (key: string, object?: string): string => {
  if (object) {
    return i18n.t(key, { object: i18n.t(object) }) as string;
  } else {
    return i18n.t(key) as string;
  }
};

export default i18n;
