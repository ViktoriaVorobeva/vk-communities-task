import { useContext } from "react";
import { GroupCard } from "../groupCard/groupCard";
import { GroupsContext } from "../app/groupsContext";

export const GroupList = () => {
  const { groups } = useContext(GroupsContext);
  
  if (!groups) {
    return null;
  }

  return (
    <ul>
      {groups.map((group) => (
        <GroupCard key={group.id} {...group} />
      ))}
    </ul>
  );
};
