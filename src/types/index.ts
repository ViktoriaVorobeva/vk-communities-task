import { ChangeEvent } from "react";

export interface GetGroupsResponse {
  result: 1 | 0;
  data?: GroupType[];
}

export interface GroupType {
  id: number;
  name: string;
  closed: boolean;
  avatar_color?: string;
  members_count: number;
  friends?: User[];
}

export interface User {
  first_name: string;
  last_name: string;
}

export interface GroupsContextState {
  groups: GroupType[];
  isError: boolean;
  isLoading: boolean;
}

export interface FiltersContextState {
  privacy: string;
  color: string;
  friends: string;
}

export interface FiltersProps {
  setFilters: React.Dispatch<React.SetStateAction<FiltersContextState>>;
}

export interface FilterProps {
  title: string;
  options: {
    value: string;
    label: string;
  }[];
  id: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>, id: string) => void;
}
