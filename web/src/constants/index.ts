// API request related
export const API = {
  BASE_URL: '/api/v1',
  TIMEOUT: 30000,
};

// Pagination default values
export const PAGINATION = {
  DEFAULT_CURRENT: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: ['10', '20', '50', '100'],
};


// Theme configuration
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

// Language
export const LANGUAGES = {
  ZH_CN: 'zh-CN',
  EN_US: 'en-US',
};

// Time format
export const DATE_FORMAT = {
  FULL: 'YYYY-MM-DD HH:mm:ss',
  DATE: 'YYYY-MM-DD',
  TIME: 'HH:mm:ss',
  MONTH: 'YYYY-MM',
  YEAR: 'YYYY',
};


// Regular expressions
export const REGEX = {
  USERNAME: /^[a-zA-Z0-9_]+$/,
  PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,20}$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE: /^1[3-9]\d{9}$/,
}; 