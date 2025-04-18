import { Switch } from "~/components/ui/switch";
import { Sun } from "lucide-react";
import { Moon } from "lucide-react";

import { useState, useEffect } from "react";

export default function Theme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDarkTheme =
      savedTheme === "dark" ||
      (savedTheme === null &&
        document.documentElement.classList.contains("dark"));

    if (isDarkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setIsDark(isDarkTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    setIsDark(newTheme);
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        {isDark ? (
          <Moon className="text-blue-500" />
        ) : (
          <Sun className="text-yellow-500" />
        )}
        <Switch
          id="theme-switch"
          checked={isDark}
          onCheckedChange={toggleTheme}
        />
      </div>
    </>
  );
}
