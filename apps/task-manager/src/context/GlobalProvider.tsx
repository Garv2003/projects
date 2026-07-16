"use client";

import React, { createContext, useContext, useState } from "react";
import themes from "./theme";

export const GlobalContext = createContext({});
export const GlobalUpdateContext = createContext({}); // Provide a default value for createContext

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedTheme, setSelectedTheme] = useState<number>(0);
  const theme = themes[selectedTheme];

  return (
    <GlobalContext.Provider value={{ theme }}>
      <GlobalUpdateContext.Provider value={{ setSelectedTheme }}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
