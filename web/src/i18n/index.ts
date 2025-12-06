/**
 * Copyright 2025 Sven Victor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import zhCN from './zh-CN';
import enUS from './en-US';
import enUSCommon from './en-US/common';
import enUSAuthorization from './en-US/authorization';
import enUSSystem from './en-US/system';
import enUSAi from './en-US/ai';
import deDE from './de-DE';
import esES from './es-ES';
import frFR from './fr-FR';
import arAE from './ar-AE';
import svSE from './sv-SE';

import zhCNCommon from './zh-CN/common';
import zhCNAuthorization from './zh-CN/authorization';
import zhCNSystem from './zh-CN/system';
import zhCNAi from './zh-CN/ai';

import deDECommon from './de-DE/common';
import deDEAuthorization from './de-DE/authorization';
import deDESystem from './de-DE/system';
import deDEAi from './de-DE/ai';

import esESCommon from './es-ES/common';
import esESAuthorization from './es-ES/authorization';
import esESSystem from './es-ES/system';
import esESAi from './es-ES/ai';

import frFRCommon from './fr-FR/common';
import frFRAuthorization from './fr-FR/authorization';
import frFRSystem from './fr-FR/system';
import frFRAi from './fr-FR/ai';

import arAECommon from './ar-AE/common';
import arAEAuthorization from './ar-AE/authorization';
import arAESystem from './ar-AE/system';
import arAEAi from './ar-AE/ai';

import svSECommon from './sv-SE/common';
import svSEAuthorization from './sv-SE/authorization';
import svSESystem from './sv-SE/system';
import svSEAi from './sv-SE/ai';


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ns: ['common', 'authorization', 'system', 'ai'],
    defaultNS: 'translation',
    resources: {
      'zh-CN': {
        translation: zhCN,
        common: zhCNCommon,
        authorization: zhCNAuthorization,
        system: zhCNSystem,
        ai: zhCNAi,
      },
      'en-US': {
        translation: enUS,
        common: enUSCommon,
        authorization: enUSAuthorization,
        system: enUSSystem,
        ai: enUSAi,
      },
      'de-DE': {
        translation: deDE,
        common: deDECommon,
        authorization: deDEAuthorization,
        system: deDESystem,
        ai: deDEAi,
      },
      'es-ES': {
        translation: esES,
        common: esESCommon,
        authorization: esESAuthorization,
        system: esESSystem,
        ai: esESAi,
      },
      'fr-FR': {
        translation: frFR,
        common: frFRCommon,
        authorization: frFRAuthorization,
        system: frFRSystem,
        ai: frFRAi,
      },
      'ar-AE': {
        translation: arAE,
        common: arAECommon,
        authorization: arAEAuthorization,
        system: arAESystem,
        ai: arAEAi,
      },
      'sv-SE': {
        translation: svSE,
        common: svSECommon,
        authorization: svSEAuthorization,
        system: svSESystem,
        ai: svSEAi,
      },
    },
    fallbackLng: 'en-US',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 