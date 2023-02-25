import React, { createContext, useState } from "react";

export const VelContext = createContext();

export function VelProvider({ children }) {
  const [vel, setVel] = useState(null);

  return (
    <VelContext.Provider value={{ vel, setVel }}>
      {children}
    </VelContext.Provider>
  );
}