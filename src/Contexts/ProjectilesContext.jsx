import React, { createContext, useState } from "react";

export const ProjectilesContext = createContext();

export function ProjectilesProvider({ children }) {
  const [projectiles, setProjectiles] = useState([]);

  return (
    <ProjectilesContext.Provider value={{ projectiles, setProjectiles }}>
      {children}
    </ProjectilesContext.Provider>
  );
}