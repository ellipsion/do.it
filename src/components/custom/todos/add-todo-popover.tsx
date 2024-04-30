import { FC } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverAnchor,
} from "@/components/ui/popover";

import TodoForm from "./todo-form";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { setTaskModal } from "@/redux/edit/slice";
import NewTodoButton from "./new-todo-btn";

const AddTodoPopover: FC = () => {
  const { open } = useAppSelector((state) => state.edit.task);
  const { loading } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  const onOpenChange = (value: boolean) => {
    if (!loading) {
      dispatch(setTaskModal({ open: value }));
    }
  };
  return (
    <div className="relative">
      <Popover modal={true} open={open} onOpenChange={onOpenChange}>
        <PopoverAnchor className="max-w-4xl">
          <PopoverTrigger asChild>
            <div className="w-full md:h-20 max-w-4xl ">
              <div className="flex items-center md:bg-gray-100/20 md:backdrop-blur h-full justify-center transition-all ">
                <NewTodoButton />
              </div>
            </div>
          </PopoverTrigger>
        </PopoverAnchor>

        <PopoverContent side={"top"} align="center" className="w-fit mb-3 mr-5">
          <TodoForm />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AddTodoPopover;
