import { createSlice } from '@reduxjs/toolkit'

export interface SideMenuVisibleState {
    value: boolean
}

const initialState: SideMenuVisibleState = {
    value: false,
}

export const sideMenuVisibleSlice = createSlice({
    name: 'sideMenuVisible',
    initialState,
    reducers: {
        toggleSideMenu: (state) => {
            console.log("Toggling side menu")
            state.value = !state.value
        },
    },
})

export const { toggleSideMenu } = sideMenuVisibleSlice.actions
export default sideMenuVisibleSlice.reducer