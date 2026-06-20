import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enNavbar from "./locales/en/navbar.json";
import enDashboard from "./locales/en/dashboard.json";
import enWeather from "./locales/en/weather.json";
import enServices from "./locales/en/services.json";
import enCalculators from "./locales/en/calculators.json";
import enFaq from "./locales/en/faq.json";
import enKnowledgeHub from "./locales/en/knowledgeHub.json";
import enGovernmentSchemes from "./locales/en/governmentSchemes.json";
import enVirtualAssistant from "./locales/en/virtualAssistant.json";
import enPartners from "./locales/en/partners.json";
import enNewsletter from "./locales/en/newsletter.json";
import enFooter from "./locales/en/footer.json";
import enCropRecommendation from "./locales/en/cropRecommendation.json";

import hiNavbar from "./locales/hi/navbar.json";
import hiDashboard from "./locales/hi/dashboard.json";
import hiWeather from "./locales/hi/weather.json";
import hiServices from "./locales/hi/services.json";
import hiCalculators from "./locales/hi/calculators.json";
import hiFaq from "./locales/hi/faq.json";
import hiKnowledgeHub from "./locales/hi/knowledgeHub.json";
import hiGovernmentSchemes from "./locales/hi/governmentSchemes.json";
import hiVirtualAssistant from "./locales/hi/virtualAssistant.json";
import hiPartners from "./locales/hi/partners.json";
import hiNewsletter from "./locales/hi/newsletter.json";
import hiFooter from "./locales/hi/footer.json";
import hiCropRecommendation from "./locales/hi/cropRecommendation.json";

import paNavbar from "./locales/pa/navbar.json";
import paDashboard from "./locales/pa/dashboard.json";
import paWeather from "./locales/pa/weather.json";
import paServices from "./locales/pa/services.json";
import paCalculators from "./locales/pa/calculators.json";
import paFaq from "./locales/pa/faq.json";
import paKnowledgeHub from "./locales/pa/knowledgeHub.json";
import paGovernmentSchemes from "./locales/pa/governmentSchemes.json";
import paVirtualAssistant from "./locales/pa/virtualAssistant.json";
import paPartners from "./locales/pa/partners.json";
import paNewsletter from "./locales/pa/newsletter.json";
import paFooter from "./locales/pa/footer.json";
import paCropRecommendation from "./locales/pa/cropRecommendation.json";

const savedLanguage =
  localStorage.getItem("language") || "en";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          ...enNavbar,
          ...enDashboard,
          ...enWeather,
          ...enServices,
          ...enCalculators,
          ...enFaq,
          ...enKnowledgeHub,
          ...enGovernmentSchemes,
          ...enVirtualAssistant,
          ...enPartners,
          ...enNewsletter,
          ...enFooter,
          ...enCropRecommendation
        }
      },

      hi: {
        translation: {
          ...hiNavbar,
          ...hiDashboard,
          ...hiWeather,
          ...hiServices,
          ...hiCalculators,
          ...hiFaq,
          ...hiKnowledgeHub,
          ...hiGovernmentSchemes,
          ...hiVirtualAssistant,
          ...hiPartners,
          ...hiNewsletter,
          ...hiFooter,
          ...hiCropRecommendation
        }
      },

      pa: {
        translation: {
          ...paNavbar,
          ...paDashboard,
          ...paWeather,
          ...paServices,
          ...paCalculators,
          ...paFaq,
          ...paKnowledgeHub,
          ...paGovernmentSchemes,
          ...paVirtualAssistant,
          ...paPartners,
          ...paNewsletter,
          ...paFooter,
          ...paCropRecommendation
        }
      }
    },

    lng: savedLanguage,
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;