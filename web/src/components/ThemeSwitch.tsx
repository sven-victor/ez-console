import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import HeaderDropdown from "./HeaderDropdown";
import { useThemeMode } from "antd-style";
import { useTranslation } from "react-i18next";

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: React.FC<ThemeSwitchProps> = ({
  className,
}) => {
  const { t: tCommon } = useTranslation('common');

  const { themeMode, setThemeMode } = useThemeMode();

  return <HeaderDropdown
    key="theme-switch"
    className={className}
    menu={{
      items: [
        { key: 'light', label: <span><SunOutlined /> {tCommon('light', { defaultValue: 'Light Mode' })}</span> },
        { key: 'dark', label: <span><MoonOutlined /> {tCommon('dark', { defaultValue: 'Dark Mode' })}</span> }
      ],
      onClick: ({ key }) => {
        setThemeMode(key as 'light' | 'dark')
      },
      selectedKeys: [themeMode],
    }}
  >
    {themeMode === 'light' ? <SunOutlined /> : <MoonOutlined />}
  </HeaderDropdown>;
};

export default ThemeSwitch;