import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { ToastTypes } from '../../components/ToastCustom';

const initialState: { message: string; type: ToastTypes } = {
  message: '',
  type: 'info',
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    resetToast: (state: Draft<typeof initialState>) => {
      state.message = '';
      state.type = 'info';
    },
    setToast: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState>
    ) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
  },
});

// Selectors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getToast = (state: any) => state.toast;

// Reducers and actions
export const { setToast, resetToast } = toastSlice.actions;

export default toastSlice.reducer;
