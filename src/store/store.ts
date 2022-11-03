import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import counterReducer from '../features/Counter/counterSlice';
import userReducer from '../features/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
