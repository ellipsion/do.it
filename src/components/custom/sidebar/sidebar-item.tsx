import { cn } from "@/lib/utils";

import { useLocation, useNavigate } from "react-router-dom";

interface sidebarItemProps {
  emoji: string;
  label: string;
  href: string;
}

const SidebarItem = ({ emoji, label, href }: sidebarItemProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = pathname === href || pathname?.startsWith(`${href}/`);
  const changeRoute = () => navigate(href);

  return (
    <button
      type="button"
      onClick={changeRoute}
      className={cn(
        "flex items-center mx-3 my-1 rounded text-xs text-black font-medium text-center gap-x-2  pl-3 transition-all hover:bg-gray-300/20",
        isActive && "text-gray-700  bg-gray-200/30"
      )}
    >
      <div className="flex items-center gap-x-2 py-2 capitalize">
        {/* <Icon
          size={18}
          // className={cn("text-slate-500", isActive && "text-blue-700")}
        /> */}
        <span className="text-lg mr-1">{emoji}</span>
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-purple-700 h-full rounded-e",
          isActive && "opacity-100"
        )}
      ></div>
    </button>
  );
};

export default SidebarItem;
