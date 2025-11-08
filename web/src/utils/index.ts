// Date formatting
export const formatDate = (date: Date | string | number, format: string = 'YYYY-MM-DDTHH:mm:ssZ'): string => {
  const d = date instanceof Date ? date : new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
};

// Relative time formatting (e.g., 3 hours ago, 2 days ago)
export const formatRelativeTime = (date: Date | string | number): string => {
  const now = new Date();
  const d = date instanceof Date ? date : new Date(date);
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minutes ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hours ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} days ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} months ago`;
  }

  const years = Math.floor(months / 12);
  return `${years} years ago`;
};

// Local storage related
export const storage = {
  get: (key: string): any => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting item from localStorage:', error);
      return null;
    }
  },
  set: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting item to localStorage:', error);
    }
  },
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item from localStorage:', error);
    }
  },
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};

// URL parameter parsing
export const parseQueryParams = (queryString: string = window.location.search): Record<string, string> => {
  const params: Record<string, string> = {};
  const query = queryString.startsWith('?') ? queryString.substring(1) : queryString;

  if (!query) return params;

  query.split('&').forEach(part => {
    const [key, value] = part.split('=');
    if (key && value) {
      params[decodeURIComponent(key)] = decodeURIComponent(value);
    }
  });

  return params;
};

// Throttle function
export const throttle = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 300
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;

  return (...args: Parameters<T>): void => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 300
): ((...args: Parameters<T>) => void) => {
  let timer: number | null = null;

  return (...args: Parameters<T>): void => {
    if (timer) clearTimeout(timer);
    timer = window.setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

// Deep clone
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any;
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as any;
  }

  if (obj instanceof Object) {
    const copy = {} as Record<string, any>;
    Object.keys(obj).forEach(key => {
      copy[key] = deepClone((obj as Record<string, any>)[key]);
    });
    return copy as T;
  }

  return obj;
};

// Array chunking
export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};


// Generate random ID
export const generateId = (prefix: string = ''): string => {
  return `${prefix}${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Converts a color string to a semi-transparent version by applying a new alpha value.
 * Supports HEX (#RRGGBB, #RGB), RGB (rgb(r,g,b)), and RGBA (rgba(r,g,b,a)) color formats.
 * The output is always in rgba(r,g,b,a) format.
 *
 * @param {string} color The input color string (e.g., "#FF0000", "rgb(255,0,0)", "rgba(255,0,0,1)").
 * @param {number} alpha The new alpha value, a number between 0.0 (fully transparent) and 1.0 (fully opaque).
 * @returns {string} The color string in rgba(r,g,b,a) format with the new alpha value.
 * @throws {Error} If the alpha value is invalid, the color input is not a string,
 *                 or the color format is unsupported or invalid.
 */
export const transparentize = (color: string, alpha: number): string => {
  if (typeof alpha !== 'number' || alpha < 0 || alpha > 1) {
    throw new Error('Alpha must be a number between 0 and 1.');
  }

  if (typeof color !== 'string') {
    throw new Error('Color must be a string.');
  }

  // Normalize color string by trimming whitespace and converting to lowercase
  const normalizedColor = color.trim().toLowerCase();

  // Handle HEX colors: #RRGGBB or #RGB
  if (normalizedColor.startsWith('#')) {
    let hex = normalizedColor.slice(1);

    // Expand 3-digit hex to 6-digit hex (e.g., #F03 becomes #FF0033)
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    if (hex.length !== 6) {
      throw new Error('Invalid HEX color format. Expected #RRGGBB or #RGB.');
    }

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      // This can happen if hex contains non-hexadecimal characters
      throw new Error('Invalid characters in HEX color value.');
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // Regular expression to parse rgb(r, g, b) strings.
  // Allows for optional spaces around numbers and commas.
  const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
  const rgbMatch = normalizedColor.match(rgbRegex);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1], 10);
    const g = parseInt(rgbMatch[2], 10);
    const b = parseInt(rgbMatch[3], 10);

    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
      throw new Error('Invalid RGB color value. Each component must be between 0 and 255.');
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // Regular expression to parse rgba(r, g, b, a) strings.
  // Allows for optional spaces and a float for the alpha component.
  // The existing alpha component in the input string is ignored and replaced by the new alpha parameter.
  const rgbaRegex = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([0-9.]+)\s*\)$/;
  const rgbaMatch = normalizedColor.match(rgbaRegex);
  if (rgbaMatch) {
    const r = parseInt(rgbaMatch[1], 10);
    const g = parseInt(rgbaMatch[2], 10);
    const b = parseInt(rgbaMatch[3], 10);
    // The existing alpha (rgbaMatch[4]) is parsed but deliberately ignored;
    // the function's purpose is to set a *new* alpha.

    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
      throw new Error('Invalid RGBA color value. RGB components must be between 0 and 255.');
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  throw new Error(
    'Unsupported color format. Please use HEX (#RRGGBB, #RGB), RGB (rgb(r,g,b)), or RGBA (rgba(r,g,b,a)).'
  );
}

export const maskEmail = (email?: string) => {
  if (!email) {
    return '';
  }
  const [user, domain] = email.split('@');
  if (user.length <= 2) {
    return user[0] + '*'.repeat(user.length - 1) + '@' + domain;
  } else {
    return user[0] + '*'.repeat(user.length - 2) + user[user.length - 1] + '@' + domain;
  }
}

export const getURL = (uri?: string): string => {
  const baseURL = import.meta.env.BASE_URL
  if (!uri) {
    return baseURL;
  }
  if (baseURL.endsWith('/')) {
    if (uri.startsWith('/')) {
      return baseURL + uri.substring(1);
    }
    return baseURL + uri;
  }
  if (uri.startsWith('/')) {
    return baseURL + uri;
  }
  return baseURL + '/' + uri;
}