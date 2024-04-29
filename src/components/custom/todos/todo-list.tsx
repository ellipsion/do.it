import { getTodos } from "@/redux/todoSlice";
import Todo from "./todo";
import { Task } from "@/types/task";
import { ScrollArea } from "@/components/ui/scroll-area";

const TodoList = () => {
  const tasks: Task[] = getTodos();

  return (
    <div className="w-full h-full md:max-w-4xl">
      <ScrollArea className="h-full md:pr-5">
        {tasks.length > 0 &&
          tasks.map((task) => <Todo key={task.id} task={task} />)}
        {tasks.length === 0 && (
          <div className="w-full border bg-gray-50 border-dashed p-10 rounded-lg">
            <p className="text-center text-xl font-normal italic text-gray-400">
              It's empty here
            </p>
          </div>
        )}
        <div className="h-10"></div>
      </ScrollArea>
    </div>
  );
};

export default TodoList;
