import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { enTranslation } from "./langs/en";
import { esTranslation } from "./langs/es";
import config from "./Constants";

const lang = navigator.language.substring(0,2)

i18n

  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng: lang,
    debug: config.USE_DEBUG,
    fallbackLng: lang || "es",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: enTranslation,
      es: esTranslation,
    },
  });

export default i18n;
