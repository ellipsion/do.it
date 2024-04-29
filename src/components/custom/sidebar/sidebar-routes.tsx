import SidebarItem from "./sidebar-item";
// import { usePathname } from "next/navigation";

const dashboardRoutes = [
  {
    emoji: "🏠",
    label: "Home",
    href: "/",
  },
];

const SidebarRoutes = () => {
  const routes = dashboardRoutes;

  return (
    <div className="flex flex-col w-full pt-3">
      {routes.map((route) => (
        <SidebarItem key={route.href} {...route} />
      ))}
    </div>
  );
};

export default SidebarRoutes;
