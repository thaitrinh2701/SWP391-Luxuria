import { useEffect, useState } from "react";

export function useDarkMode() {
  const [theme, setTheme] = useState(localStorage.theme);
  // const [theme, setTheme] = useState("dark");
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);

    // save theme to local storage
    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
