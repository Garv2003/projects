import { configureStore } from '@reduxjs/toolkit'
import DarkThemeSlice from "@/store/slices/DarkThemeSlice";
import SideMenuVisibleSlice from "@/store/slices/SideMenuVisibleSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            darkTheme: DarkThemeSlice,
            sideMenuVisible: SideMenuVisibleSlice,
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']