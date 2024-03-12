import { Select, FormItem } from "@vkontakte/vkui";
import { FilterProps } from "../../types";

export const Filter: React.FC<FilterProps> = ({ title, id, options, onChange }) => {
  return (
    <>
      <FormItem top={title} htmlFor={id} />
      <Select onChange={(event) => onChange(event, id)} id={id} options={options} />
    </>
  );
};
