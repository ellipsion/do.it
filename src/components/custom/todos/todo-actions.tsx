import { FC } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
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
        <DropdownMenuItem onClick={handleEdit}>
          <Button
            variant={"ghost"}
            size={"sm"}
            className="w-full justify-start"
          >
            edit
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>
          <Button
            variant={"ghost"}
            size={"sm"}
            className="w-full justify-start"
          >
            delete
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TodoActions;
