import { FC } from "react";
import { getTaskCount } from "@/redux/listSlice";
import { List } from "@/types/list";
import { cn } from "@/lib/utils";

interface countBadgeProps {
  list?: List;
  active?: boolean;
}

const CountBadge: FC<countBadgeProps> = ({ list, active }) => {
  const count = getTaskCount(list?.id);
  return (
    <p
      className={cn(
        "py-1 w-8 text-xs text-center text-gray-800 bg-gray-100 rounded-xl transition-colors group-hover:bg-white",
        active && "bg-white"
      )}
    >
      {count}
    </p>
  );
};

export default CountBadge;
