import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider
      {...props}
      themes={["light", "dark"]}
      defaultTheme="light"
    >
      {children}
    </NextThemesProvider>
  );
}
