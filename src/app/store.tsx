import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todoList/ToDoListSlice';

export const store = configureStore({
  reducer: {
    'todo list': todoReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
