import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux";
import { LoaderCircle, Plus } from "lucide-react";

const NewListButton = () => {
  const { loading, action } = useAppSelector((state) => state.lists);

  if (loading)
    return (
      <Button
        variant="secondary"
        size={"lg"}
        className="rounded-full w-full space-x-2 px-3 opacity-70"
      >
        <LoaderCircle className="animate-spin" size={15} />
        <span className="text-xs font-light">{action} list</span>
      </Button>
    );

  return (
    <Button
      variant="secondary"
      size={"lg"}
      className="rounded-full w-full justify-start space-x-2 px-3"
    >
      <Plus size={15} />
      <span className="text-xs">Create new list</span>
    </Button>
  );
};

export default NewListButton;
