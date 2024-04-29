import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ScrollArea } from "@/components/ui/scroll-area";
import { FC } from "react";
import { useAppSelector } from "@/hooks/redux";

interface ListSelectProps {
  onSelect: (value: string) => void;
  defaultValue: string;
}

const ListSelect: FC<ListSelectProps> = ({ onSelect, defaultValue }) => {
  const lists = useAppSelector((state) => state.lists.data);
  return (
    <Select onValueChange={onSelect} defaultValue={defaultValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a list" />
      </SelectTrigger>
      <SelectContent>
        <ScrollArea className="h-[200px] max-h-fit">
          <SelectGroup>
            <SelectItem value="no-list">
              <p>
                <span>🔲</span> No list
              </p>
            </SelectItem>
            {lists.map((list) => (
              <SelectItem key={list.id} value={list.id}>
                <p>
                  <span>{list.emoji.native}</span> {list.name}
                </p>
              </SelectItem>
            ))}
          </SelectGroup>
        </ScrollArea>
      </SelectContent>
    </Select>
  );
};

export default ListSelect;
