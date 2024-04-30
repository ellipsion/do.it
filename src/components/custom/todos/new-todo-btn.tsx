import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux";
import { LoaderCircle, Plus } from "lucide-react";

const NewTodoButton = () => {
  const { loading, action } = useAppSelector((state) => state.todos);

  if (loading)
    return (
      <Button
        variant="default"
        size={"lg"}
        className="rounded-full w-full mx-5 md:w-1/2 space-x-2 px-3 opacity-70"
      >
        <LoaderCircle className="animate-spin" size={15} />
        <span className="hidden md:block text-xs font-light">
          {action} task
        </span>
      </Button>
    );

  return (
    <Button
      variant="default"
      size={"lg"}
      className="rounded-full w-full mx-5 md:w-1/2 justify-start space-x-2 md:px-3 px-4 h-12 md:h-10 shadow-muted-foreground/40 shadow-lg md:shadow-none"
    >
      <Plus size={15} />
      <span className="text-xs font-light hidden md:block">
        Create new task
      </span>
    </Button>
  );
};

export default NewTodoButton;
