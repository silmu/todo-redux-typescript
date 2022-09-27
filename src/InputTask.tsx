import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import { addTask, setInputText } from './features/todoList/ToDoListSlice';
import {
  useAppSelector,
  useAppDispatch,
} from './features/todoList/ToDoListSlice';

const InputTask: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectInputText = useAppSelector(state => state['todo list'].inputText);
  const todos = useAppSelector(state => state['todo list'].todos);

  const handleAddTask = () => {
    dispatch(addTask(selectInputText));
    localStorage.setItem(
      'tasks',
      JSON.stringify([
        ...todos,
        {
          id: todos.length + 1,
          name: selectInputText,
          checked: false,
        },
      ])
    );
  };

  return (
    <Box sx={{ width: '100%', height: 60 }}>
      <TextField
        id='outlined-basic'
        label='Add task'
        variant='outlined'
        color='secondary'
        sx={{ marginRight: '1rem', width: '81%' }}
        onChange={e => dispatch(setInputText(e.target.value))}
      />
      <Fab size='medium' color='secondary' aria-label='add'>
        <AddIcon onClick={handleAddTask} />
      </Fab>
    </Box>
  );
};

export default InputTask;
