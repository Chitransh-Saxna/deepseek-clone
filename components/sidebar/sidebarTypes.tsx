import { Dispatch, SetStateAction } from "react";

export type SidebarPropsType = {
    expand: boolean;
    setExpand: Dispatch<SetStateAction<boolean>>
}

export type OpenMenuType = {
    id: number;
    open: boolean
}