import { createContext } from "react";
import { GroupsContextState } from "../../types";

const initialState: GroupsContextState = {
    groups: [],
    isError: false, 
    isLoading: false,
}

export const GroupsContext = createContext(initialState);