import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'

import { ExperienceProvider } from "./Contexts/ExperienceContext";
import { AngleProvider } from './Contexts/AngleContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <ExperienceProvider>
        <AngleProvider>
          <App />
        </AngleProvider>
      </ExperienceProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
