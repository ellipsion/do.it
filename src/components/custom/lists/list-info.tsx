import { List } from "@/types/list";
import { FC } from "react";
import CountBadge from "../common/count-badge";

interface ListInfoProps {
  list: List;
}

const ListInfo: FC<ListInfoProps> = ({ list }) => {
  return (
    <div className="flex gap-x-3 items-center capitalize">
      <span className="max-w-48 truncate">{list.name}</span>{" "}
      {list.emoji?.native} <CountBadge list={list} />
    </div>
  );
};

export default ListInfo;
