import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'

import { ExperienceProvider } from "./Contexts/ExperienceContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <ExperienceProvider>
        <App />
      </ExperienceProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
