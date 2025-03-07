import {
  ComputerDesktopIcon,
  MoonIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

import { ThemesProps, applyTheme } from '@/lib/theme';

const useTheme = () => {
  const [theme, setTheme] = useState<string | null>(null);
  const { t } = useTranslation('common');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme || 'drake'); // Default to drake theme if none is set
    
    // Apply drake theme by default if no theme is set
    if (!savedTheme) {
      applyTheme('drake');
    }
  }, []);

  const themes: ThemesProps[] = [
    {
      id: 'system',
      name: t('system'),
      icon: ComputerDesktopIcon,
    },
    {
      id: 'drake',
      name: t('drake') || 'Drake', // Fallback if translation is missing
      icon: SparklesIcon,
    },
    {
      id: 'dark',
      name: t('dark'),
      icon: MoonIcon,
    },
  ];

  const selectedTheme = themes.find((t) => t.id === theme) || themes[1]; // Default to drake theme

  const toggleTheme = () => {
    // Toggle between drake and dark themes only
    if (selectedTheme.id === 'drake') {
      applyTheme('dark');
      setTheme('dark');
    } else {
      applyTheme('drake');
      setTheme('drake');
    }
  };

  return { theme, setTheme, selectedTheme, toggleTheme, themes, applyTheme };
};

export default useTheme;
