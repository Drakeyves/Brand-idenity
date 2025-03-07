import React from 'react';
import { cn } from '../../lib/utils';
import useTheme from '../../hooks/useTheme';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className,
  showLabel = false
}) => {
  const { selectedTheme, toggleTheme } = useTheme();
  const Icon = selectedTheme.icon;

  // Determine the next theme name for the tooltip
  const nextThemeName = selectedTheme.id === 'drake' ? 'Dark' : 'Drake';

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-md',
        'bg-background-secondary/50 hover:bg-background-secondary',
        'border border-accent-metallic-dark/10',
        'transition-all duration-200',
        'text-accent-metallic-light hover:text-white',
        className
      )}
      aria-label={`Switch to ${nextThemeName} theme`}
      title={`Switch to ${nextThemeName} theme`}
    >
      <Icon className="h-5 w-5" />
      {showLabel && (
        <span className="text-sm font-medium">{selectedTheme.name}</span>
      )}
    </button>
  );
};

export default ThemeToggle; 