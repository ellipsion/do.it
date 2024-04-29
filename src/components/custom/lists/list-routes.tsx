import { useAppSelector } from "@/hooks/redux";
import ListItem from "./list-item";

const ListRoutes = () => {
  const lists = useAppSelector((state) => state.lists.data);
  return (
    <div className="flex flex-col w-full pb-3">
      {lists.map((list) => (
        <ListItem key={list.id} list={list} />
      ))}
    </div>
  );
};

export default ListRoutes;
