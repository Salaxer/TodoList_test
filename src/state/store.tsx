import { configureStore } from '@reduxjs/toolkit'
import todoListReducer from './features/todoList'

//MIDDLEWARE
// const localStorageMiddleware = ({ getState }:any) => {
//   return (next: (arg0: any) => any) => (action: any) => {
//     const result = next(action);
//     localStorage.setItem('state', JSON.stringify(getState()));
//     return result;
//   };
// };

// const reHydrateStore = () => {
//   if (localStorage.getItem('state')) {
//     return JSON.parse(localStorage.getItem('state')!); // re-hydrate the store
//   }
// };


const store = configureStore({
  reducer: {
    todoList: todoListReducer,
  },
  // preloadedState: reHydrateStore(),
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware().concat(localStorageMiddleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store