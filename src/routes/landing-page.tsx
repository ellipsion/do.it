import GoogleLogin from "@/components/custom/auth/google-login";
import Logo from "@/components/custom/sidebar/logo";

const LandingPage = () => {
  return (
    <div className="p-5 h-screen animate-fade">
      <div className="h-full w-full flex items-center justify-center">
        <div className="flex flex-col gap-y-10">
          <div className="text-center">
            <Logo size="xl" />
            <p className="text-sm font-semibold text-gray-400">A Todo App</p>
          </div>
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
