import React from "react";

const Header = () => {
  return (
    <header className="text-center space-y-2">
      <h1 className="text-5xl font-semibold bg-gradient-to-b from-black to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
        Sonawave
      </h1>
      <p className="text-slate-800 dark:text-slate-300">
        Converts <i>.wav</i> files into <b>16KHz, 16-bit, mono</b> format.
      </p>
    </header>
  );
};

export default Header;
