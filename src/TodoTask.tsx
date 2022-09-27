import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';

import { useDispatch } from 'react-redux';
import {
  editTask,
  deleteTask,
  markAsDone,
  setEditText,
  useAppSelector,
} from './features/todoList/ToDoListSlice';

const TodoTask: React.FC<{
  task: { id: number; name: string; checked: boolean };
  labelId: string;
}> = ({ task, labelId }) => {
  const [editOn, setEditOn] = useState({ state: false, id: 0 });
  const dispatch = useDispatch();

  const selectEditText = useAppSelector(state => state['todo list'].editText);

  const handleToggleCheck: (taskId: number) => void = taskId => {
    dispatch(markAsDone(taskId));

    //Mark task as done in localStorage
    let updatedLocalTasks = JSON.parse(localStorage.getItem('tasks')!).map(
      (t: { id: number; checked: boolean }) => {
        if (t.id === taskId) t.checked = !t.checked;
        return t;
      }
    );
    localStorage.setItem('tasks', JSON.stringify(updatedLocalTasks));
  };

  const toggleEdit: (task: {
    id: number;
    name: string;
    checked: boolean;
  }) => void = task => {
    setEditOn({ state: !editOn.state, id: task.id });
  };

  const handleEditTask: (
    e: { key: string },
    task: { id: number; name: string; checked: boolean }
  ) => void = (e, task) => {
    if (e.key === 'Enter') {
      setEditOn({ state: false, id: task.id });
      dispatch(editTask(task.id));

      // Edit task in the local storage
      let updatesLocalTasks = JSON.parse(localStorage.getItem('tasks')!).map(
        (t: { id: number; name: string }) => {
          if (t.id === task.id) t.name = selectEditText;
          return t;
        }
      );
      localStorage.setItem('tasks', JSON.stringify(updatesLocalTasks));
    }
  };

  const handleDeleteTask: (task: {
    id: number;
    name: string;
  }) => void = task => {
    dispatch(deleteTask(task.id));

    //Delete task from local storage
    let filtered = JSON.parse(localStorage.getItem('tasks')!).filter(
      (t: { id: number }) => t.id !== task.id
    );
    localStorage.setItem('tasks', JSON.stringify([filtered]));
  };
  return (
    <div key={task?.id}>
      <ListItem
        //  Special MUI syntax for buttons inside of a list item
        secondaryAction={
          <>
            <IconButton
              edge='end'
              aria-label='comments'
              onClick={() => toggleEdit(task)}
            >
              <EditIcon sx={{ color: '#af7eeb' }} />
            </IconButton>
            <IconButton
              edge='end'
              aria-label='comments'
              onClick={() => handleDeleteTask(task)}
            >
              <DeleteOutlineIcon sx={{ color: '#af7eeb' }} />
            </IconButton>
          </>
        }
        disablePadding
      >
        {/* Display editing option on click */}
        {editOn.state && editOn.id === task.id ? (
          <TextField
            id='outlined-basic'
            label='Edit task'
            variant='outlined'
            color='secondary'
            sx={{ marginRight: '1rem', width: '86%' }}
            onChange={e => dispatch(setEditText(e.target.value))}
            onKeyPress={e => handleEditTask(e, task)}
          />
        ) : (
          <ListItemButton
            role={undefined}
            onClick={() => handleToggleCheck(task.id)}
            dense
          >
            {/* Checkbox */}
            <ListItemIcon>
              <Checkbox
                edge='start'
                checked={task.checked}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
                sx={{ color: '#af7eeb' }}
                color='secondary'
              />
            </ListItemIcon>
            {/* Task text */}
            <ListItemText id={labelId} primary={task.name} />
          </ListItemButton>
        )}
      </ListItem>
    </div>
  );
};

export default TodoTask;
