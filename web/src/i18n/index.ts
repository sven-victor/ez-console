import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import zhCN from './zh-CN';
import enUS from './en-US';
import enUSCommon from './en-US/common';
import enUSAuthorization from './en-US/authorization';
import enUSSystem from './en-US/system';
import deDE from './de-DE';
import esES from './es-ES';
import frFR from './fr-FR';
import arAE from './ar-AE';
import svSE from './sv-SE';

import zhCNCommon from './zh-CN/common';
import zhCNAuthorization from './zh-CN/authorization';
import zhCNSystem from './zh-CN/system';

import deDECommon from './de-DE/common';
import deDEAuthorization from './de-DE/authorization';
import deDESystem from './de-DE/system';

import esESCommon from './es-ES/common';
import esESAuthorization from './es-ES/authorization';
import esESSystem from './es-ES/system';

import frFRCommon from './fr-FR/common';
import frFRAuthorization from './fr-FR/authorization';
import frFRSystem from './fr-FR/system';

import arAECommon from './ar-AE/common';
import arAEAuthorization from './ar-AE/authorization';
import arAESystem from './ar-AE/system';

import svSECommon from './sv-SE/common';
import svSEAuthorization from './sv-SE/authorization';
import svSESystem from './sv-SE/system';


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ns: ['common', 'authorization', 'system'],
    defaultNS: 'translation',
    resources: {
      'zh-CN': {
        translation: zhCN,
        common: zhCNCommon,
        authorization: zhCNAuthorization,
        system: zhCNSystem,
      },
      'en-US': {
        translation: enUS,
        common: enUSCommon,
        authorization: enUSAuthorization,
        system: enUSSystem,
      },
      'de-DE': {
        translation: deDE,
        common: deDECommon,
        authorization: deDEAuthorization,
        system: deDESystem,
      },
      'es-ES': {
        translation: esES,
        common: esESCommon,
        authorization: esESAuthorization,
        system: esESSystem,
      },
      'fr-FR': {
        translation: frFR,
        common: frFRCommon,
        authorization: frFRAuthorization,
        system: frFRSystem,
      },
      'ar-AE': {
        translation: arAE,
        common: arAECommon,
        authorization: arAEAuthorization,
        system: arAESystem,
      },
      'sv-SE': {
        translation: svSE,
        common: svSECommon,
        authorization: svSEAuthorization,
        system: svSESystem,
      },
    },
    fallbackLng: 'en-US',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 