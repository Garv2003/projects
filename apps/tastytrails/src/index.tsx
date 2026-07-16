/* @refresh reload */
import { render } from 'solid-js/web'

import './index.css'
import App from './App'
import { ThemeProvider } from './context/ThemeProvider'
import { AppProvider } from './context/AppProvider'
import { Toaster } from 'solid-toast';

const root = document.getElementById('root')

render(() => <ThemeProvider>
    <AppProvider>
        <Toaster />
        <App />
    </AppProvider>
</ThemeProvider>, root!)
