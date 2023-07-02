import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import refreshReducer from '../features/refresh/refreshSlice';

const rootReducer = combineReducers({
  user: userReducer,
  refresh: refreshReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

