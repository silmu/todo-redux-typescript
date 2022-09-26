import React, { useEffect } from 'react';
import CheckboxList from './CheckboxList';
import InputTask from './InputTask';

import {
  useAppSelector,
  useAppDispatch,
  initializeTasks,
} from './features/todoList/ToDoListSlice';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

const App: React.FC = () => {
  const list = useAppSelector(state => state['todo list'].todos);
  const dispatch = useAppDispatch();
  // const selectEditText = useAppSelector(state => state['todo list'].editText);

  useEffect(() => {
    dispatch(initializeTasks());
  }, [dispatch]);

  return (
    <div className='App'>
      <div className='container-main'>
        <div className='todo'>
          <header>
            <h1>
              <PlaylistAddCheckIcon />
              ToDO List
            </h1>
          </header>
          <div className='content-todo'>
            <InputTask />
            <CheckboxList list={list} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
