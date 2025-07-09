import { Dispatch, SetStateAction } from "react";

export type PromptBoxPropsType = {
    isLoading?: boolean;
    setIsLoading?: Dispatch<SetStateAction<boolean>>
}