import Navbar from "@/components/custom/navbar";
import Sidebar from "@/components/custom/sidebar";
import AddTodoPopover from "@/components/custom/todos/add-todo-popover";
import useInitializeApp from "@/hooks/useInitializeApp";
import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  useInitializeApp();

  return (
    <div className={cn("h-full xl:w-[80%] mx-auto animate-fade")}>
      <div className="h-16 fixed inset-y-0 w-full xl:w-[80%] z-50 ">
        <Navbar />
      </div>
      <div className="hidden md:flex flex-col h-full justify-center w-[21rem] xl:w-[22rem] fixed inset-y-0 z-40">
        <Sidebar />
      </div>
      <main className={cn("md:pl-[21rem] xl:pl-[22rem] pt-16 md:pt-10 pb-10")}>
        <Outlet />
      </main>
      <div className="h-20 fixed bottom-0 md:pl-[21rem] xl:pl-[22rem] w-full xl:w-[80%] z-50">
        <AddTodoPopover />
      </div>
    </div>
  );
};

export default DashboardLayout;
