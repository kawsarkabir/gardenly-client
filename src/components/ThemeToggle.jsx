import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDarkMode, setDarkMode] = useState(
    () => localStorage.getItem('theme') === 'dark',
  );

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
    const root = window.document.documentElement;
    if (checked) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <DarkModeSwitch
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={24}
      sunColor="#facc15"
      moonColor="#f1f1f1"
    />
  );
}
