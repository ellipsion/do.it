import { FC } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, PenBox, Trash2 } from "lucide-react";
import { useAppDispatch } from "@/hooks/redux";
import { deleteTodoAsync } from "@/redux/todo/thunk";
import { Task } from "@/types/task";
import { editTask } from "@/redux/edit/slice";
import { Emoji } from "@/types/emoji";

interface TodoActionProps {
  task: Task;
  emoji: Emoji | null;
}

const TodoActions: FC<TodoActionProps> = ({ task, emoji }) => {
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(deleteTodoAsync({ id: task.id }));
  };

  const handleEdit = () => {
    dispatch(editTask({ item: task, open: true, emoji, isEditMode: true }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
        <MoreVertical size={15} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-xl bg-white/50 backdrop-blur-sm">
        <DropdownMenuItem className="p-0" onClick={handleEdit}>
          <Button
            variant={"ghost"}
            className="w-full justify-start px-2 gap-x-2 font-light"
          >
            <PenBox size={18} strokeWidth={1} /> Edit
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0 mt-1" onClick={handleDelete}>
          <Button
            variant={"ghost"}
            className="w-full justify-start px-2 gap-x-2 font-light text-red-500 hover:text-red-600"
          >
            <Trash2 size={18} strokeWidth={1} /> Delete
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TodoActions;
