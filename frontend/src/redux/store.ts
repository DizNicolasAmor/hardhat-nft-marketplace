import { configureStore } from '@reduxjs/toolkit';

import networkReducer from './slices/networkSlice';
import toastReducer from './slices/toastSlice';
import tokenReducer from './slices/tokenSlice';
import userReducer from './slices/userSlice';

export default configureStore({
  reducer: {
    network: networkReducer,
    toast: toastReducer,
    token: tokenReducer,
    user: userReducer,
  },
});
