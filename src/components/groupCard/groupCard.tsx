import {
  Group,
  Header,
  SimpleCell,
  Paragraph,
  Avatar,
  Accordion,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { GroupType } from "../../types";

export const GroupCard: React.FC<GroupType> = ({
  id,
  name,
  closed,
  avatar_color,
  members_count,
  friends,
}) => {
  return (
    <Group
      header={
        <Header
          mode="secondary"
          aside={
            avatar_color && (
              <Avatar
                size={100}
                src="#"
                style={{ backgroundColor: avatar_color }}
              />
            )
          }
        >
          {name}
        </Header>
      }
    >
      <SimpleCell>
        {closed ? (
          <Paragraph>Закрытая группа</Paragraph>
        ) : (
          <Paragraph>Открытая группа</Paragraph>
        )}
      </SimpleCell>
      <SimpleCell indicator={members_count}>Количество участников</SimpleCell>
      {friends && (
        <Accordion key={`${id}`}>
          <Accordion.Summary iconPosition="after">
            Количество друзей - {friends?.length}
          </Accordion.Summary>
          <Accordion.Content>
            <ul>
              {friends.map((friend, index) => (
                <li key={index}>
                  {friend.first_name} {friend.last_name}
                </li>
              ))}
            </ul>
          </Accordion.Content>
        </Accordion>
      )}
    </Group>
  );
};
