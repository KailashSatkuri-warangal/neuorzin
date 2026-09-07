import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    root.classList.add('light');
    localStorage.setItem('neuorzin-theme', 'light');
  }, []);

  const toggleTheme = () => {
    // Keep light mode default
  };

  return { theme: 'light', toggleTheme, isDark: false };
}
