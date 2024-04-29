import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "lucide-react";
import LogoutButton from "./logout-button";
import { useAppSelector } from "@/hooks/redux";

export const UserProfile = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return (
      <div className="flex p-2 items-center gap-x-2">
        <div className="p-2 bg-gray-100 rounded-full">
          <User />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <div className="flex p-2 items-center gap-x-2">
            <img
              referrerPolicy="no-referrer"
              alt="profile image"
              src={user.photoURL || undefined}
              width={40}
              height={40}
              className="rounded-full cursor-pointer"
            ></img>
            <div className="truncate">
              <p className="text-sm font-medium leading-tight">
                {user.displayName}
              </p>
              <p className=" text-xs font-medium text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="mr-10 mt-3">
          <div className=" text-muted-foreground">
            <LogoutButton />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
