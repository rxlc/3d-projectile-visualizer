import React, { createContext, useState } from "react";

export const BTContext = createContext();

export function BtProvider({ children }) {
  const [btObject, setBtObject] = useState(null);

  return (
    <BTContext.Provider value={{ btObject, setBtObject }}>
      {children}
    </BTContext.Provider>
  );
}