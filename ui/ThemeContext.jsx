import React, { createContext, useState, useMemo, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const theme = useMemo(
    () => ({
      isDark,
      colors: {
        icon: isDark ? "#ffffff" : "#696F8C",
      },
    }),
    [isDark]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
