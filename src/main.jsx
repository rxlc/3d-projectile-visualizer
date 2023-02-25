import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'

import { ExperienceProvider } from "./Contexts/ExperienceContext";
import { AngleProvider } from './Contexts/AngleContext';
import { ProjectilesProvider } from './Contexts/ProjectilesContext';
import { VelProvider } from './Contexts/VelContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <ExperienceProvider>
        <AngleProvider>
          <ProjectilesProvider>
            <VelProvider>
              <App />
            </VelProvider>
          </ProjectilesProvider>
        </AngleProvider>
      </ExperienceProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
