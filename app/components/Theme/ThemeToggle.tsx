"use client";

import { useTheme } from "@/app/context/theme";
import { Theme } from "@/app/interfaces/context/theme.d";
import React, { useEffect, useState } from "react";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <button className="nav-link" onClick={toggleTheme}>
          {theme === Theme.LIGHT ? "🌙" : "☀"}
        </button>
      )}
    </>
  );
}

export default ThemeToggle;
