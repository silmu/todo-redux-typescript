import { createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../app/store";

export const todoListSlice = createSlice({
  name: "todo list",
  initialState: {
    todos: [
      { id: 1, name: "task 1", checked: false },
      { id: 2, name: "task 2", checked: false },
      { id: 3, name: "task 3", checked: false },
    ],
    inputText: "",
    editText: "",
  },
  reducers: {
    setAllTasks: (state, action) => {
      state.todos = action.payload;
    },
    addTask: (state, action) => {
      state.todos.push({
        id: state.todos.length + 1,
        name: action.payload,
        checked: false,
      });
    },
    markAsDone: (state, action) => {
      state.todos.forEach(task => {
        if (task.id === action.payload) {
          task.checked = !task.checked;
        }
      });
    },
    editTask: (state, action) => {
      state.todos.map(task => (task.id === action.payload ? (task.name = state.editText) : task));
    },
    deleteTask: (state, action) => {
      state.todos = state.todos.filter(task => task.id !== action.payload);
    },
    setInputText: (state, action) => {
      state.inputText = action.payload;
    },
    setEditText: (state, action) => {
      state.editText = action.payload;
    },
  },
});

export const { setAllTasks, addTask, editTask, deleteTask, setInputText, setEditText, markAsDone } =
  todoListSlice.actions;

//Initialize state if localStorage is not empty
export const initializeTasks = () => {
  const tasksFromLocal = localStorage.getItem("tasks") || null;
  if (tasksFromLocal) {
    return todoListSlice.actions.setAllTasks(JSON.parse(tasksFromLocal));
  }
  return todoListSlice.actions.setAllTasks([]);
};

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default todoListSlice.reducer;
