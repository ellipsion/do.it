import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './redux';
import { setListLoading } from '@/redux/list/slice';
import { getListsAsync } from '@/redux/list/thunk';
import { removeFilter, setTodoLoading } from '@/redux/todo/slice';
import { getTodosAsync } from '@/redux/todo/thunk';


const useInitializeApp = () => {  
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

  
    useEffect(() => {
      dispatch(setTodoLoading({ loading: true, action: "fetching" }));
      dispatch(getTodosAsync());
    }, [user]);
  
    useEffect(() => {
      dispatch(setListLoading({ loading: true, action: "fetching" }));
      dispatch(getListsAsync());
      dispatch(removeFilter());
    }, [user]);

}

export default useInitializeApp