import { Group } from "@vkontakte/vkui";
import { ChangeEvent, useContext } from "react";
import { GroupsContext } from "../app/groupsContext";
import { FiltersProps, GroupType } from "../../types";
import { Filter } from "../filter/filter";
import {
  AVATARFILTER,
  FRIENDSFILTER,
  PRIVACYFILTER,
} from "../../utils/constants";
import { FiltersContext } from "../app/filtersContext";

export const Filters: React.FC<FiltersProps> = ({ setFilters }) => {
  const { groups } = useContext(GroupsContext);
  const filters = useContext(FiltersContext);

  const getOptionsOfColors = (arr: GroupType[]) => {
    const colors = arr
      .filter((group) => group.avatar_color)
      .map((el) => el.avatar_color) as string[];
    return [...new Set(colors)];
  };

  const onChangeHandler = (
    event: ChangeEvent<HTMLSelectElement>,
    id: string
  ) => {
    setFilters({ ...filters, [id]: event.target.value });
  };

  return (
    <Group>
      <Filter {...{ ...PRIVACYFILTER, onChange: onChangeHandler }} />
      <Filter
        {...{
          ...AVATARFILTER,
          options: [
            { label: "Все", value: "all" },
            ...getOptionsOfColors(groups).map((color) => ({
              label: color,
              value: color,
            })),
          ],
          onChange: onChangeHandler,
        }}
      />
      <Filter {...{ ...FRIENDSFILTER, onChange: onChangeHandler }} />
    </Group>
  );
};
