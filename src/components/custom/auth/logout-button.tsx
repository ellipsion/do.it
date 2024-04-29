import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/redux";
import { logoutAsync } from "@/redux/auth/thunk";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const dispatch = useAppDispatch();

  const signOut = () => {
    dispatch(logoutAsync());
  };
  return (
    <Button
      className="text-muted-foreground"
      onClick={signOut}
      variant={"ghost"}
    >
      Logout <LogOut size={15} className="stroke-muted-foreground mx-2" />
    </Button>
  );
};

export default LogoutButton;
