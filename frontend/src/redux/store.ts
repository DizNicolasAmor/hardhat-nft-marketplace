import { configureStore } from '@reduxjs/toolkit';

import networkReducer from './slices/networkSlice';
import toastReducer from './slices/toastSlice';
import marketplaceReducer from './slices/marketplaceSlice';
import userReducer from './slices/userSlice';

export default configureStore({
  reducer: {
    network: networkReducer,
    toast: toastReducer,
    marketplace: marketplaceReducer,
    user: userReducer,
  },
});
