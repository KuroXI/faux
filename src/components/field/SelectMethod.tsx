import { Method } from "@/lib/type";
import { Check, ChevronsUpDown } from "lucide-react";
import { Fragment, useState } from "react";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn, parseMethodValue } from "@/lib/utils";

type SelectMethodProps = {
  name: string;
  value: string;
  index: number;
  path: number[];
  handleChange?: (name: string, value: string, index: number, path: number[]) => void;
  handleArrayValueChange?: (index: number, path: number[], value: string) => void;
  lists: Method[];
};

export const SelectMethod = ({
  name,
  value,
  index,
  path,
  handleChange,
  handleArrayValueChange,
  lists,
}: SelectMethodProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    if (handleArrayValueChange) {
      handleArrayValueChange(index, path, value);
    } else if (handleChange) {
      handleChange(name, value, index, path);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="w-full justify-between" variant="outline" role="combobox" aria-expanded={open}>
          {value ? value : "Select Value..."}
          <ChevronsUpDown size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full" align="end">
        <Command>
          <CommandInput placeholder="Select value..." />
          <CommandList>
            <CommandEmpty>No result found</CommandEmpty>
            {lists.map((list) => (
              <Fragment key={list.category}>
                <CommandGroup heading={list.category.toUpperCase()}>
                  {list.methods.map((method) => (
                    <CommandItem
                      key={`${list.category}.${method}`}
                      value={parseMethodValue(list.category, method)}
                      onSelect={handleSelect}
                    >
                      <Check className={cn("mr-2 h-4 w-4", value === method ? "opacity-100" : "opacity-0")} />
                      {method}
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
              </Fragment>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
