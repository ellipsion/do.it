import { FC } from "react";
import { Task } from "@/types/task";
import { useAppDispatch } from "@/hooks/redux";
import { getListById } from "@/redux/list/slice";
import { Checkbox } from "@/components/ui/checkbox";
import { toggleComplete } from "@/redux/todo/slice";
import TodoActions from "./todo-actions";
import { toggleCompletedAsync } from "@/redux/todo/thunk";

interface TodoProps {
  task: Task;
}

const Todo: FC<TodoProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const emoji = getListById(task.list || "")?.emoji || null;

  const handleToggleComplete = (id: string, completed: boolean) => {
    dispatch(toggleComplete({ id, completed }));
    dispatch(toggleCompletedAsync({ id, completed }));
  };

  return (
    <div
      className="flex items-center gap-x-5 bg-white rounded-lg mb-3 p-2 animate-fade-fast"
      key={task.id}
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={(checked) =>
          handleToggleComplete(task.id, checked as boolean)
        }
      />
      <label className="flex-1 md:font-normal text-gray-800 text-sm">
        {task.title}
        {task.list && <span className="mx-3">{emoji?.native}</span>}
      </label>
      <p className="text-xs hidden text-gray-400 font-semibold h-8 bg-gray-100 md:flex items-center px-2 rounded-lg">
        10:00
      </p>
      <TodoActions task={task} emoji={emoji} />
    </div>
  );
};

export default Todo;
