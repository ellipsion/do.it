import TodoList from "@/components/custom/todos/todo-list";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { removeFilter } from "@/redux/todo/slice";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(removeFilter());
  }, []);

  return (
    <div className="px-3 md:px-5 pt-3">
      <div className="">
        <div className="">
          <h2 className="font-semibold text-lg md:text-2xl">
            Good morning, <br className="md:hidden" /> {user?.displayName}! 👋
          </h2>
          <p className="md:font-medium text-sm md:text-lg text-gray-400">
            Today, Wed 24 Apr 2024
          </p>
        </div>
        <div className="mt-10">
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default Home;
