import { FC, useState } from "react";
import { Input } from "../input";
import { useForm } from "react-hook-form";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useAppDispatch } from "@/hooks/redux";
import {
  addListAsync,
  setListLoading,
  updateListAsync,
} from "@/redux/listSlice";
import { Emoji } from "@/types/emoji";
import { List } from "@/types/list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const defaultEmoji: Emoji = {
  id: "sparkles",
  name: "Sparkles",
  native: "✨",
  unified: "2728",
  keywords: ["stars", "shine", "shiny", "cool", "awesome", "good", "magic"],
  shortcodes: ":sparkles:",
};

interface ListFormProps {
  list?: List;
  close: () => void;
}

const ListForm: FC<ListFormProps> = ({ close, list }) => {
  const dispatch = useAppDispatch();

  const [emoji, setEmoji] = useState<Emoji>(list?.emoji || defaultEmoji);

  const { register, handleSubmit } = useForm({
    defaultValues: list ? { name: list.name } : undefined,
  });

  const handleFormSubmit = handleSubmit((values) => {
    if (list) {
      handleUpdate(values);
    } else {
      handleCreate(values);
    }
    close();
  });

  const handleUpdate = (values: { name: string }) => {
    if (list) {
      dispatch(setListLoading({ loading: true, action: "updating" }));
      dispatch(
        updateListAsync({ id: list.id, name: values.name, emoji: emoji })
      );
    }
  };

  const handleCreate = (values: { name: string }) => {
    dispatch(setListLoading({ loading: true, action: "creating" }));
    dispatch(addListAsync({ name: values.name, emoji: emoji }));
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="flex">
          <div className="pl-2 w-8 flex items-center justify-center bg-gray-100/60 rounded-none">
            {emoji?.native}
          </div>
          <Input
            {...register("name", { required: true })}
            placeholder="Enter list name"
            className="rounded-s-none"
          ></Input>
          <div className="bg-gray-100/60 rounded-s flex items-center">
            <Button type="submit" variant={"ghost"} size={"icon"}>
              <Plus size={18} />
            </Button>
          </div>
        </div>
      </form>

      {/* ClosePopover component to control popover close */}

      {/* Emoji Picker */}
      <div className="relative mt-5 bg-white w-[290px] h-[250px] overflow-hidden">
        <div className="absolute -top-2 -left-3">
          <Picker
            data={data}
            onEmojiSelect={setEmoji} // set selected emoji to state
            previewPosition={"none"}
            maxFrequentRows={1}
            perLine={8}
          />
        </div>
      </div>
    </div>
  );
};

export default ListForm;
