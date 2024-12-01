import { ThemeProvider } from '@mui/material'
import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import queryClient from './config/queryClient.js'
import SearchProvider from './context/SearchContext.jsx'
import ToastWrapper from './global/components/ToastWrapper.jsx'
import muiTheme from './global/theme/muiTheme.js'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={muiTheme}>
        <Router>
          <ToastWrapper />
          <SearchProvider>
            <App />
          </SearchProvider>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
