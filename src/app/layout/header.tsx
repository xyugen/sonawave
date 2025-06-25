import React from "react";
import { ThemeToggle } from "../components/ui/theme-toggle";

const Header = () => {
  return (
    <header className="relative text-center">
      <div className="space-y-2">
        <h1 className="text-5xl font-semibold bg-gradient-to-b from-black to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
          Sonawave
        </h1>
        <p className="text-slate-800 dark:text-slate-300">
          Converts <i>.wav</i> files into <b>16KHz, 16-bit, mono</b> format.
        </p>
      </div>
      <div className="absolute right-0 top-0">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
