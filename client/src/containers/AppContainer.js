import React, { useContext } from "react"
import { ToastContainer } from "react-toastify"
import { ThemeProvider as StyledThemeProvider } from "styled-components"
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'

import "react-toastify/dist/ReactToastify.css"

import App from './App'
import GlobalStyle from "styles/GlobalStyle"
import store from "store"
import { ThemeContext } from "context/ThemeContext"

const queryClient = new QueryClient({
  defaultOptions: {
      queries: {
          refetchOnWindowFocus: false,
      },
  },
})

const AppContainer = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <QueryClientProvider client={queryClient}>
      <StyledThemeProvider theme={theme}>
        <GlobalStyle />
        <ToastContainer
          toastClassName="toast-style"
          autoClose={2000}
          closeButton={false}
          draggable={false}
        />
        <Provider store={store}>
          <App />
        </Provider>  
      </StyledThemeProvider>
    </QueryClientProvider>
  )
}

export default AppContainer
