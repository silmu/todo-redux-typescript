import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import {
  addTask,
  setInputText,
  //   selectInputText,
} from './features/todoList/ToDoListSlice';
import {
  useAppSelector,
  useAppDispatch,
} from './features/todoList/ToDoListSlice';

const InputTask: React.FC = () => {
  const selectInputText = useAppSelector(state => state['todo list'].inputText);
  // const inputText = useSelector(selectInputText);
  const dispatch = useAppDispatch();

  const handleAddTask = () => {
    dispatch(addTask(selectInputText));
  };
  return (
    <Box sx={{ width: '100%', height: 60 }}>
      <TextField
        id='outlined-basic'
        label='Add task'
        variant='outlined'
        color='secondary'
        sx={{ marginRight: '1rem', width: '86%' }}
        onChange={e => dispatch(setInputText(e.target.value))}
      />
      <Fab size='medium' color='secondary' aria-label='add'>
        <AddIcon onClick={handleAddTask} />
      </Fab>
    </Box>
  );
};

export default InputTask;
