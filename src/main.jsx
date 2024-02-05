import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'

import { ExperienceProvider } from "./Contexts/ExperienceContext";
import { AngleProvider } from './Contexts/AngleContext';
import { ProjectilesProvider } from './Contexts/ProjectilesContext';
import { BtProvider } from './Contexts/BTContext';
import { VelProvider } from './Contexts/VelContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <ExperienceProvider>
        <AngleProvider>
          <ProjectilesProvider>
            <VelProvider>
              <BtProvider>
                <App />
              </BtProvider>
            </VelProvider>
          </ProjectilesProvider>
        </AngleProvider>
      </ExperienceProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
