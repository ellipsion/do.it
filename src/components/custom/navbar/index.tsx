import MobileSidebar from "../sidebar/mobile";
import { useAppSelector } from "@/hooks/redux";
import GoogleLogin from "../auth/google-login";
import { getAuth } from "@/redux/auth/slice";

const Navbar = () => {
  const { user } = useAppSelector(getAuth);
  return (
    <div className="w-full md:hidden h-full bg-white flex items-center p-4">
      {user ? (
        <MobileSidebar />
      ) : (
        <div className="">
          <GoogleLogin />
        </div>
      )}
    </div>
  );
};

export default Navbar;
