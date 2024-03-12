import React, { useEffect, useState } from "react";
import "./app.css";
import { GroupList } from "../groupsList/GroupsList";
import { FiltersContextState, GroupType } from "../../types";
import { GroupsContext } from "./groupsContext";
import { request } from "../../utils/api";
import { Filters } from "../filters/filters";
import { FiltersContext } from "./filtersContext";
import {
  getResultFromLocalStorage,
  saveResultInLocalStorage,
} from "../../utils/localStorage";

const initialFilters = {
  privacy: "all",
  color: "all",
  friends: "all",
};

function App() {
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [filters, setFilters] = useState(initialFilters);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const filterGroups = (groups: GroupType[], filters: FiltersContextState) => {
    const { privacy, color, friends } = filters;
    const filteredGroups = groups.filter((group) => {
      let isPrivacy = true;
      let isColor = true;
      let isFriends = true;

      if (privacy !== "all") {
        let statePrivacy;
        if (privacy === "opened") {
          statePrivacy = false;
        } else {
          statePrivacy = true;
        }
        isPrivacy = group.closed === statePrivacy;
      }

      if (color !== "all") {
        isColor =
          group.avatar_color !== undefined && group.avatar_color === color;
      }

      if (friends !== "all") {
        const result =
          group.friends !== undefined && group.friends.length !== 0;
        if (friends === "yes") {
          isFriends = result;
        } else {
          isFriends = !result;
        }
      }

      return isPrivacy && isColor && isFriends;
    });
    return filteredGroups;
  };

  const groupHandler = async () => {
    setLoading(true);
    try {
      const data = await request();
      if (data.data) {
        const groups = data.data;
        setGroups(groups);
        saveResultInLocalStorage("groups", { groups });
      }
      setError(false);
    } catch {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    groupHandler();
  }, []);

  useEffect(() => {
    const { groups } = getResultFromLocalStorage("groups");
    const filteredGroups = filterGroups(groups, filters);
    setGroups(filteredGroups);
  }, [filters]);

  return (
    <FiltersContext.Provider value={filters}>
      <GroupsContext.Provider value={{ groups, isLoading, isError }}>
        <div className="container">
          {groups.length !== 0 && (
            <>
              <Filters setFilters={setFilters} />
              <GroupList />
            </>
          )}
          {!isError && groups.length === 0 && (
            <>
              <Filters setFilters={setFilters} />
              <p className="not-found">По запросу группы не найдены</p>
            </>
          )}
          {isLoading && groups.length === 0 && (
            <p className="loading">loading...</p>
          )}
          {isError && groups.length === 0 && (
            <p className="error">
              Произошла ошибка! Обновите страницу/попробуйте отправить запрос
              позже
            </p>
          )}
        </div>
      </GroupsContext.Provider>
    </FiltersContext.Provider>
  );
}

export default App;
