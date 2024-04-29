import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/redux";
import { getTaskCount } from "@/redux/list/slice";
import { FC } from "react";
import ListInfo from "./list-info";
import { List } from "@/types/list";
import { clearTodosInListAsync } from "@/redux/todo/thunk";
import { setTodoLoading } from "@/redux/todo/slice";

interface ClearListDialogProps {
  list: List;
  close: () => void;
}

const ClearListDialog: FC<ClearListDialogProps> = ({ list, close }) => {
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(setTodoLoading({ loading: true, action: "updating" }));
    dispatch(clearTodosInListAsync({ listId: list.id }));
    close();
  };
  const count = getTaskCount(list.id);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"link"} size={"sm"}>
          Clear All tasks
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Clear all items?</AlertDialogTitle>
          <div className="my-5 flex gap-x-2 items-center text-base font-medium">
            <div className="border border-red-400 text-red-400  px-3 py-1 rounded-lg">
              <ListInfo list={list} />
            </div>
          </div>
          <AlertDialogDescription>
            This will permanently delete
            <strong className="mx-1">{count}</strong>
            tasks within the list.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ClearListDialog;
