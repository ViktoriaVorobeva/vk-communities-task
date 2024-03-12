import { createContext } from "react";
import { FiltersContextState } from "../../types";


const initialState: FiltersContextState = {
    privacy: 'all',
    color: 'all',
    friends: 'all',
}

export const FiltersContext = createContext(initialState);