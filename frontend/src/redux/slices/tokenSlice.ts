import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  name: '',
  symbol: '',
  userBalance: '',
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    resetToken: (state: Draft<typeof initialState>) => {
      state.isLoading = false;
      state.name = '';
      state.symbol = '';
      state.userBalance = '';
    },
    setIsLoading: (
      state: Draft<typeof initialState>,
      action: PayloadAction<boolean>
    ) => ({
      ...state,
      isLoading: action.payload,
    }),
    setToken: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState>
    ) => {
      state.isLoading = action.payload.isLoading;
      state.name = action.payload.name;
      state.symbol = action.payload.symbol;
      state.userBalance = action.payload.userBalance;
    },
  },
});

// Selectors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getToken = (state: any) => state.token;

// Reducers and actions
export const { resetToken, setIsLoading, setToken } = tokenSlice.actions;

export default tokenSlice.reducer;
