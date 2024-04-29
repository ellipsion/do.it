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
        <span className="text-xs font-light">{action} task</span>
      </Button>
    );

  return (
    <Button
      variant="default"
      size={"lg"}
      className="rounded-full w-full mx-5 md:w-1/2 justify-start space-x-2 px-3"
    >
      <Plus size={15} />
      <span className="text-xs font-light">Create new task</span>
    </Button>
  );
};

export default NewTodoButton;
