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

import React from 'react';
import { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';
import HeaderDropdown from './HeaderDropdown';
import { createStyles } from 'antd-style';
const LanguageSwitchIcon = () => {
  return <svg
    viewBox="0 0 24 24"
    focusable="false"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z "
      className="css-c4d79v"
    />
  </svg>
}

const useStyles = createStyles(() => ({
  menuItemStyle: {
    minWidth: "160px",
  },
  menuItemIconStyle: {
    marginRight: "8px",
  },
}));

export const AllLangUIConfig: LanguageConfig[] = [
  { lang: 'en-US', label: 'English', icon: '🇺🇸' },
  { lang: 'sv-SE', label: 'Svenska', icon: '🇸🇪' },
  { lang: 'ar-AE', label: 'العربية', icon: '🇦🇪' },
  { lang: 'de-DE', label: 'Deutsch', icon: '🇩🇪' },
  { lang: 'es-ES', label: 'Español', icon: '🇪🇸' },
  { lang: 'fr-FR', label: 'Français', icon: '🇫🇷' },
  { lang: 'zh-CN', label: '中文', icon: '🇨🇳' },
];

export interface LanguageConfig {
  lang: string;
  label: string;
  icon: string;
}
export interface LanguageSwitchProps {
  transformLangConfig?: (langs: LanguageConfig[]) => LanguageConfig[];
}

const LanguageSwitch: React.FC<LanguageSwitchProps> = ({
  transformLangConfig = (langs) => langs,
}) => {
  const { i18n } = useTranslation();
  const { styles } = useStyles();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  const langMenu: MenuProps = {
    selectedKeys: [i18n.language],
    onClick: (info) => { handleLanguageChange(info.key) },
    items: transformLangConfig(AllLangUIConfig).map((localeObj) => ({
      key: localeObj.lang,
      className: styles.menuItemStyle,
      label: (
        <>
          <span role="img" aria-label={localeObj?.label || 'en-US'} className={styles.menuItemIconStyle}>
            {localeObj?.icon || '🌐'}
          </span>
          {localeObj?.label || 'en-US'}
        </>
      ),
    })),
  };
  return <HeaderDropdown
    menu={langMenu}
  >
    <LanguageSwitchIcon />
  </HeaderDropdown>
};

export default LanguageSwitch; 