import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: { hello: "Hello" }},
      id: { translation: { hello: "Halo" }},
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
