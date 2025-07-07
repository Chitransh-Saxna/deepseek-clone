import { Dispatch, SetStateAction } from "react";
import type { OpenMenuType } from "../sidebar/sidebarTypes"

export type ChatLabelPropType = {
    openMenu: OpenMenuType;
    setOpenMenu: Dispatch<SetStateAction<OpenMenuType>>
}

