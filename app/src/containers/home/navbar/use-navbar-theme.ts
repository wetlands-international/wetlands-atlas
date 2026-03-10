"use client";

import { RefObject, useEffect, useState } from "react";

type NavbarTheme = "light" | "dark";

const LIGHT_SECTION_SELECTOR = "[data-navbar-theme='light']";

export const useNavbarTheme = (navRef: RefObject<HTMLDivElement | null>): NavbarTheme => {
  const [theme, setTheme] = useState<NavbarTheme>("dark");

  useEffect(() => {
    const checkTheme = () => {
      if (!navRef.current) return;

      const navRect = navRef.current.getBoundingClientRect();
      const navCenter = navRect.top + navRect.height / 2;

      const lightSections = document.querySelectorAll(LIGHT_SECTION_SELECTOR);
      let isLight = false;

      for (const section of lightSections) {
        const rect = section.getBoundingClientRect();
        if (navCenter >= rect.top && navCenter <= rect.bottom) {
          isLight = true;
          break;
        }
      }

      setTheme(isLight ? "light" : "dark");
    };

    window.addEventListener("scroll", checkTheme, { passive: true });
    checkTheme();

    return () => window.removeEventListener("scroll", checkTheme);
  }, [navRef]);

  return theme;
};
