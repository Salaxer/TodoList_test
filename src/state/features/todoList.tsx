import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TodoListType } from '../../container/todoList/TodoList';
import type { RootState } from '../store'

const initialState: TodoListType[] = [{
  check: false,
  message: "Todo list :)",
  date: Date.now(),
}]


export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<TodoListType>) => {
      state.push(action.payload);
    },
    modifyItem: (state, action: PayloadAction<{ index:number, newList: TodoListType}>) =>{
      state[action.payload.index] = {
        ...state[action.payload.index],
        ...action.payload.newList,
      }
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
    },
  },
})

export const { addItem, modifyItem, deleteItem } = todoListSlice.actions
export const selectTodoList = (state: RootState) => state.todoList
export default todoListSlice.reducer