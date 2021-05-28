import React from "react"
import { render } from "react-dom"

import AppContainer from "containers/AppContainer"
import dotenv from 'dotenv'
import { ThemeProvider } from "context/ThemeContext"
import 'bootstrap/dist/css/bootstrap.min.css';
dotenv.config()

const RootApp = () => (
    <ThemeProvider>
      <AppContainer />
    </ThemeProvider>
)
render(<RootApp />, document.getElementById("root"))
