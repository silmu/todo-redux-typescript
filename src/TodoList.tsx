import React from 'react';
import List from '@mui/material/List';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';

import { setAllTasks } from './features/todoList/ToDoListSlice';
import { useAppDispatch } from './features/todoList/ToDoListSlice';

import TodoTask from './TodoTask';

const TodoList: React.FC<{
  list: { id: number; name: string; checked: boolean }[];
}> = ({ list }) => {
  const dispatch = useAppDispatch();
  // Reorder task
  const reorder = (startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const handleOnDragEnd = (result: DropResult) => {
    //If element is dropped outside of the droppable area
    if (!result.destination) return;

    const reorderedTasks = reorder(
      result.source.index,
      result.destination.index
    );
    dispatch(setAllTasks(reorderedTasks));
    //Set localStorage
    localStorage.setItem('tasks', JSON.stringify(reorderedTasks));
  };

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {/* {list.map(task => {
        return ( */}
      <DragDropContext onDragEnd={result => handleOnDragEnd(result)}>
        <Droppable droppableId='droppable'>
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {list.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TodoTask
                        task={task}
                        labelId={`checkbox-list-label-${task?.id}`}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {/* );
      })} */}
    </List>
  );
};

export default TodoList;
