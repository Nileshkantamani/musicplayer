import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeMode;
  isDarkMode: boolean;
  setTheme: (theme: ThemeMode) => void;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Get the saved theme or default to 'system'
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    return savedTheme ? savedTheme : 'system';
  });
  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  
  // Apply the theme whenever it changes
  useEffect(() => {
    // Save the theme preference
    localStorage.setItem('theme', theme);
    
    // Check if should use dark mode
    const shouldUseDarkMode = 
      theme === 'dark' || 
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    // Update the state
    setIsDarkMode(shouldUseDarkMode);
    
    // Update the document class
    if (shouldUseDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  // Watch for system preference changes when theme is set to 'system'
  useEffect(() => {
    if (theme !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      setIsDarkMode(mediaQuery.matches);
      if (mediaQuery.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);
  
  // Set theme and update state
  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };
  
  // Toggle between light and dark modes (ignores system)
  const toggleDarkMode = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, setTheme, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}; 