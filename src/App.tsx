import CheckboxList from './CheckboxList';
import InputTask from './InputTask';

import { useAppSelector } from './features/todoList/ToDoListSlice';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

const App: React.FC = () => {
  const list = useAppSelector(state => state['todo list'].todos);
  // const selectEditText = useAppSelector(state => state['todo list'].editText);

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
