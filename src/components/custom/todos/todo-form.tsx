import { FC, useEffect, useState } from "react";
import { Input } from "../common/input";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Emoji } from "@/types/emoji";
import { findList } from "@/lib/list-utils";
import { addTodoAsync, updateTodoAsync } from "@/redux/todo/thunk";
import { setTodoLoading } from "@/redux/todo/slice";
import { setTaskModal } from "@/redux/edit/slice";
import ListSelectAccordian from "./list-select-accordian";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import { getListBySlug } from "@/redux/list/slice";

const defaultEmoji: Emoji = {
  id: "no-list",
  name: "Sparkles",
  native: "🔲",
  unified: "2728",
  keywords: ["stars", "shine", "shiny", "cool", "awesome", "good", "magic"],
  shortcodes: ":sparkles:",
};

const TodoForm: FC = () => {
  const dispatch = useAppDispatch();

  const {
    item: initialData,
    isEditMode,
    emoji: editEmoji,
  } = useAppSelector((state) => state.edit.task);

  const { slug } = useParams();
  const list = getListBySlug(slug);

  const initialListId = initialData ? initialData.list || "" : list?.id || "";
  const [listId, setListId] = useState<string>(initialListId);

  const initialEmoji = editEmoji ? editEmoji : list?.emoji || defaultEmoji;
  const [emoji, setEmoji] = useState<Emoji>(initialEmoji);

  const lists = useAppSelector((state) => state.lists.data);

  const { register, handleSubmit, setFocus } = useForm({
    defaultValues: initialData ? { title: initialData.title } : undefined,
  });

  useEffect(() => {
    setFocus("title");
  }, []);

  const handleFormSubmit = handleSubmit((values) => {
    if (isEditMode) {
      handleUpdate(values);
    } else {
      handleCreate(values);
    }
    closePopover();
  });

  const closePopover = () => {
    dispatch(setTaskModal({ open: false }));
  };

  const handleCreate = (values: { title: string }) => {
    dispatch(setTodoLoading({ loading: true, action: "creating" }));
    dispatch(addTodoAsync({ title: values.title, listId }));
  };

  const handleUpdate = (values: { title: string }) => {
    dispatch(setTodoLoading({ loading: true, action: "updating" }));
    if (initialData) {
      dispatch(
        updateTodoAsync({ id: initialData.id, title: values.title, listId })
      );
    }
  };

  const onSelectValueChange = (value: string) => {
    setListId(value);
    const list = findList(value, lists);
    setEmoji(list?.emoji || defaultEmoji);
  };

  return (
    <>
      <div className="md:w-[400px] space-y-3">
        <ListSelectAccordian value={listId} onSelect={onSelectValueChange} />
        <form onSubmit={handleFormSubmit} className="space-y-3">
          <div className="flex">
            <div className="pl-2 w-8 flex items-center justify-center bg-gray-100/60 rounded-none">
              {emoji?.native}
            </div>
            <Input
              {...register("title", { required: true })}
              placeholder="Enter task title"
              className="rounded-s-none"
            ></Input>
            <div className="bg-gray-100/60 rounded-s flex items-center">
              <Button type="submit" variant={"ghost"} size={"icon"}>
                <Plus size={18} />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default TodoForm;
