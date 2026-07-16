import { createSlice } from '@reduxjs/toolkit'

export interface DarkThemeState {
    value: boolean
}

const initialState: DarkThemeState = {
    value: false,
}

export const darkThemeSlice = createSlice({
    name: 'darkTheme',
    initialState,
    reducers: {
        toggleDarkTheme: (state) => {
            state.value = !state.value
            document.body.classList.toggle("dark-mode-variables");
        },
    },
})

export const { toggleDarkTheme } = darkThemeSlice.actions

export default darkThemeSlice.reducer