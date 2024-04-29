import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { FC, useState } from "react";
import { getListById } from "@/redux/listSlice";
import { useAppSelector } from "@/hooks/redux";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ListSelectProps {
  value: string;
  onSelect: (value: string) => void;
}

const ListSelectAccordian: FC<ListSelectProps> = ({ value, onSelect }) => {
  // const [selectedListId, setSelected] = useState("");
  const [open, setOpen] = useState<string>();

  const lists = useAppSelector((state) => state.lists.data);
  const list = getListById(value);

  const handleAccordianState = (value: string) => setOpen(value);
  const close = () => setOpen("");

  const handleValueChange = (value: string) => {
    onSelect(value);
    close();
  };

  return (
    <Accordion
      value={open}
      onValueChange={handleAccordianState}
      type="single"
      collapsible
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="w-[290px] px-2">
          {list ? (
            <span>
              {list.emoji.native} {list.name}
            </span>
          ) : (
            "🔲 No List"
          )}
        </AccordionTrigger>
        <AccordionContent>
          <RadioGroup onValueChange={handleValueChange} defaultValue={value}>
            <ScrollArea className="max-h-52">
              <div className="flex items-center space-x-2 my-1">
                <Label
                  className={cn(
                    "hover:bg-gray-100 w-full cursor-pointer pt-2 px-2 pb-3 rounded transition-colors",
                    (value === "no-list" || !value) && "bg-gray-100"
                  )}
                >
                  <RadioGroupItem className="opacity-0 w-0" value="no-list" />
                  🔲 No list
                </Label>
              </div>
              {lists.map((list) => (
                <div key={list.id} className="flex items-center space-x-2 my-1">
                  <Label
                    className={cn(
                      "hover:bg-gray-100 w-full cursor-pointer pt-2 px-2 pb-3 rounded",
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ListSelectAccordian;
