import { FC, useEffect, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverAnchor,
} from "@/components/ui/popover";

import ListForm from "./list-form";

import NewListButton from "./new-list-btn";

const AddListPopover: FC = () => {
  const width = document.documentElement.clientWidth;
  const [side, setSide] = useState<"right" | "bottom">("right");

  useEffect(() => {
    if (width < 760) {
      setSide("bottom");
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
              <NewListButton />
            </div>
          </PopoverTrigger>
        </PopoverAnchor>

        <PopoverContent side={side} align="start" className="w-fit mb-5">
          <ListForm close={closePopover} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AddListPopover;
