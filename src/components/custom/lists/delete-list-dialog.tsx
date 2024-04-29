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
import { deleteListAsync } from "@/redux/list/thunk";
import { FC } from "react";
import ListInfo from "./list-info";
import { List } from "@/types/list";
import { useNavigate, useParams } from "react-router-dom";

interface DeleteListDialogProps {
  list: List;
  close: () => void;
}

const DeleteListDialog: FC<DeleteListDialogProps> = ({ list, close }) => {
  const dispatch = useAppDispatch();
  const { slug } = useParams();
  const navigate = useNavigate();
  const handleDelete = () => {
    dispatch(deleteListAsync({ id: list.id }));
    close();

    if (slug === list.slug) {
      navigate("/");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} size={"sm"} className="flex-1">
          Delete list
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete list and all its items?</AlertDialogTitle>
          <div className="py-5 flex gap-x-2 items-center text-base font-medium">
            <div className="border border-red-400 text-red-400  px-3 py-1 rounded-lg">
              <ListInfo list={list} />
            </div>
          </div>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the list
            and all its items.
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

export default DeleteListDialog;
