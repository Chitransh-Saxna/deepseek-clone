'use client'
import { useUser } from "@clerk/nextjs";
import { createContext, useContext } from "react"
import type { AppContextProviderType, AppContextType } from "./appContextType";

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = ({ children }: AppContextProviderType) => {
    const { user } = useUser()
    const value: AppContextType = {
        user,
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}