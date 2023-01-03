import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from '@reduxjs/toolkit';
import reminderReducer from '../features/reminderSlice';

const rootReducer = combineReducers({
  reminders: reminderReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
