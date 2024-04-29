import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/hooks/redux";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface ListSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

const ListSelect: FC<ListSelectProps> = ({ value, onValueChange }) => {
  const lists = useAppSelector((state) => state.lists.data);
  return (
    <RadioGroup onValueChange={onValueChange} defaultValue={value}>
      <ScrollArea className="max-h-[200px]">
        <div className="flex items-center space-x-2">
          <Label
            className={cn(
              "hover:bg-gray-100 w-full cursor-pointer p-2 rounded transition-colors",
              (value === "no-list" || !value) && "bg-gray-100"
            )}
          >
            <RadioGroupItem className="opacity-0 w-0" value="no-list" />
            🔲 No list
          </Label>
        </div>
        {lists.map((list) => (
          <div key={list.id} className="flex items-center space-x-2">
            <Label
              className={cn(
                "hover:bg-gray-100 w-full cursor-pointer p-2 rounded",
                value === list.id && "bg-gray-100"
              )}
            >
              <RadioGroupItem className="opacity-0 w-0" value={list.id} />
              {list.emoji.native} {list.name}
            </Label>
          </div>
        ))}
      </ScrollArea>
    </RadioGroup>
  );
};

export default ListSelect;
