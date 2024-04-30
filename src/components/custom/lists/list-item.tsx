import { cn } from "@/lib/utils";
import { List } from "@/types/list";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CountBadge from "../common/count-badge";
import EditListPopover from "./edit-list-popover";
import { getListRoute } from "@/lib/route-utils";

interface ListItemProps {
  list: List;
}

const ListItem: FC<ListItemProps> = ({ list }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const href = getListRoute(list.slug);

  const isActive = pathname === href || pathname?.startsWith(`${href}/`);
  const changeRoute = () => navigate(href);

  return (
    <div
      className={cn(
        "flex items-center group mx-3 my-1 rounded text-xs text-black font-medium text-center gap-x-2  pl-3 transition-all hover:bg-gray-300/20 animate-fade",
        isActive && "text-gray-700  bg-gray-200/30"
      )}
    >
      <button
        onClick={changeRoute}
        className="flex items-center gap-x-2 py-2 w-full capitalize "
      >
        {/* <Icon
          size={18}
          // className={cn("text-slate-500", isActive && "text-blue-700")}
        /> */}
        <span className="text-lg mr-1">{list.emoji?.native}</span>
        <span className="max-w-28 truncate">{list.name}</span>
      </button>

      <div className="md:opacity-0 group-hover:opacity-100 transition-opacity">
        {/* <ListActions listId={list.id} /> */}
        <EditListPopover list={list} />
      </div>
      <div>
        <CountBadge list={list} active={isActive} />
      </div>
      <div
        className={cn(
          "opacity-0 border-2 border-gray-800 h-full rounded-e",
          isActive && "opacity-100"
        )}
      ></div>
    </div>
  );
};

export default ListItem;
