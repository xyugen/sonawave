import React from "react";

const Header = () => {
  return (
    <header className="text-center spacey-2">
      <h1 className="text-5xl font-semibold bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">
        Sonawave
      </h1>
      <p>
        Converts <i>.wav</i> files into <b>16KHz, 16-bit, mono</b> format.
      </p>
    </header>
  );
};

export default Header;
