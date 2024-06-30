import { templates } from "@/lib/template";
import { Field } from "@/lib/type";
import { Dispatch, SetStateAction } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type TemplateProps = {
  setFields: Dispatch<SetStateAction<Field[]>>;
};

export const Template = ({ setFields }: TemplateProps) => {
  return (
    <Select onValueChange={(v) => setFields(JSON.parse(v))}>
      <SelectTrigger className="w-60">
        <SelectValue placeholder="Select a template" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {templates.map(({ name, fields }) => (
            <SelectItem key={name} value={JSON.stringify(fields)}>
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
