import React, { createContext, useState } from "react";

export const AngleContext = createContext();

export function AngleProvider({ children }) {
  const [angle, setAngle] = useState(null);

  return (
    <AngleContext.Provider value={{ angle, setAngle }}>
      {children}
    </AngleContext.Provider>
  );
}