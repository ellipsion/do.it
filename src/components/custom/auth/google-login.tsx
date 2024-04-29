import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { loginWithGoogleAsync } from "@/redux/auth/thunk";
import { Loader2 } from "lucide-react";

const GoogleLogin = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const login = () => {
    dispatch(loginWithGoogleAsync());
  };
  return (
    <Button onClick={login} disabled={loading}>
      <span className="text-2xl font-semibold pr-2">G</span>
      Login with Google
      {loading && <Loader2 className="ml-2 animate-spin" size={18} />}
    </Button>
  );
};

export default GoogleLogin;
