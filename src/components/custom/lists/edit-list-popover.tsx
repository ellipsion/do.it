import { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverAnchor,
} from "@/components/ui/popover";

import ListForm from "./list-form";
import { MoreVertical, Pen } from "lucide-react";
import { List } from "@/types/list";
import ListInfo from "./list-info";
import DeleteListDialog from "./delete-list-dialog";
import ClearListDialog from "./clear-list-dialog";

interface EditListPopoverProps {
  list: List;
}

const EditListPopover: FC<EditListPopoverProps> = ({ list }) => {
  const width = document.documentElement.clientWidth;
  const [side, setSide] = useState<"right" | "bottom">("right");
  const [align, setAlign] = useState<"start" | "center">("start");

  useEffect(() => {
    if (width < 760) {
      setSide("bottom");
      setAlign("center");
    }
  }, [width]);

  const [open, setOpen] = useState<boolean>(false);
  const closePopover = () => setOpen(false);

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor>
          <PopoverTrigger asChild>
            <div className="w-full px-3">
              <Button variant="ghost" size={"icon"} className="">
                <MoreVertical size={15} />
              </Button>
            </div>
          </PopoverTrigger>
        </PopoverAnchor>
        <PopoverContent side={side} align={align} className="w-fit mb-5">
          <Accordion orientation="vertical" type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="w-[290px]">
                <ListInfo list={list} />
              </AccordionTrigger>

              <AccordionContent>
                <p className="pb-3 flex gap-x-2 items-center text-xs font-medium text-gray-500">
                  <Pen size={12} />
                  Edit list
                </p>
                <ListForm close={closePopover} list={list} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex mt-5">
            <DeleteListDialog list={list} close={closePopover} />
            <ClearListDialog list={list} close={closePopover} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EditListPopover;
