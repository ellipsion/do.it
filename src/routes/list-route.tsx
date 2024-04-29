import { useNavigate, useNavigation, useParams } from "react-router-dom";
import TodoList from "@/components/custom/todos/todo-list";
import { getListBySlug } from "@/redux/list/slice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setFilter } from "@/redux/todo/slice";

const ListPage = () => {
  const dispatch = useAppDispatch();
  const lists = useAppSelector((state) => state.lists.data);
  const { slug } = useParams();
  const list = getListBySlug(slug);
  const navigation = useNavigation();

  useEffect(() => {
    if (lists.length > 0) {
      if (list) {
        dispatch(setFilter(list));
      } else {
        throw new Response("", {
          status: 404,
          statusText: "Not Found",
        });
      }
    }
    // throw Error("not found");
  }, [list, lists]);

  return (
    <div className="px-5 pt-3 animate-fade">
      <div>
        <h2 className="font-semibold text-2xl">
          {list?.name} {list?.emoji.native}
        </h2>
        <p className="font-medium text-lg text-gray-400">
          Today, Wed 26 July 2023
        </p>
      </div>
      <div className="mt-10">
        <TodoList />
      </div>
    </div>
  );
};

export default ListPage;
