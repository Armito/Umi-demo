import { useState, createContext } from 'react';

export interface Theme {
  type: 'light' | 'dark';
  foreground: string;
  background: string;
}

export const themes: Record<'light' | 'dark', Theme> = {
  light: {
    type: 'light',
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    type: 'dark',
    foreground: '#ffffff',
    background: '#222222',
  },
};

export const useTheme = (initialTheme: Theme) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const toggleTheme = (type?: 'light' | 'dark') => {
    switch (type) {
      case 'light':
        setTheme(themes.light);
        break;

      case 'dark':
        setTheme(themes.dark);
        break;

      default:
        setTheme(theme.type === 'light' ? themes.dark : themes.light);
    }
  };

  return {
    theme,
    toggleTheme,
  };
};

export const ThemeContext = createContext({
  theme: themes.light,
  toggleTheme: (type?: 'light' | 'dark') => {},
});
