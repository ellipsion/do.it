import { useNavigate, useParams } from "react-router-dom";
import TodoList from "@/components/custom/todos/todo-list";
import { getListBySlug } from "@/redux/list/slice";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { setFilter } from "@/redux/todo/slice";

const ListPage = () => {
  const dispatch = useAppDispatch();
  const { slug } = useParams();
  const list = getListBySlug(slug);
  const navigate = useNavigate();

  useEffect(() => {
    if (list) {
      dispatch(setFilter(list));
    } else {
      navigate("/not-found");
    }
  }, [list]);

  return (
    <div className="px-5 pt-3">
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
