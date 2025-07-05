import { useUser } from "@clerk/nextjs";

export type AppContextProviderType = {
    children: React.ReactNode
};

export interface AppContextType {
    user: ReturnType<typeof useUser>['user'];
}