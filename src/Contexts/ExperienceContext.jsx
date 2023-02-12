import React, { createContext, useState } from "react";

export const ExperienceContext = createContext();

export function ExperienceProvider({ children }) {
  const [experience, setExperience] = useState(null);

  return (
    <ExperienceContext.Provider value={{ experience, setExperience }}>
      {children}
    </ExperienceContext.Provider>
  );
}