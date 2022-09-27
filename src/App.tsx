import React, { useEffect } from 'react';
import TodoList from './TodoList';
import InputTask from './InputTask';
import Tutorial from './Tutorial';

import {
  useAppSelector,
  useAppDispatch,
  initializeTasks,
} from './features/todoList/ToDoListSlice';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

const App: React.FC = () => {
  const list = useAppSelector(state => state['todo list'].todos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeTasks());
  }, [dispatch]);

  return (
    <div className='App'>
      <div className='todo'>
        <header>
          <h1>
            <PlaylistAddCheckIcon />
            ToDO List <Tutorial />
          </h1>
        </header>
        <div className='content-todo'>
          <InputTask />
          <TodoList list={list} />
        </div>
      </div>
    </div>
  );
};

export default App;
