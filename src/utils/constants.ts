export const DELAY = 1000;

const PRIVACYOPTIONS = [
  { label: "Все", value: "all" },
  { label: "Открытые", value: "opened" },
  { label: "Закрытые", value: "closed" },
];

const FRIENDSOPTIONS = [
    { label: "Все", value: "all" },
    { label: "Есть", value: "yes" },
    { label: "Нет", value: "no" },
  ];

export const PRIVACYFILTER = {
  id: "privacy",
  title: "Тип приватности",
  options: PRIVACYOPTIONS,
};

export const AVATARFILTER = {
  id: "color",
  title: "Цвет аватарки",
};

export const FRIENDSFILTER = {
    id: "friends",
    title: "Наличие друзей в группе",
    options: FRIENDSOPTIONS,
  };
