import { Switch } from "~/components/ui/switch";
import { Sun } from "lucide-react";
import { Moon } from "lucide-react";

import { useState, useEffect } from "react";

export default function Theme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
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
