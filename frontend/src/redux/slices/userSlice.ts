import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  address: '',
  balance: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state: Draft<typeof initialState>) => {
      state.address = '';
      state.balance = '';
    },
    setUser: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState>
    ) => {
      state.address = action.payload.address;
      state.balance = action.payload.balance;
    },
  },
});

// Selectors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUser = (state: any) => state.user;

// Reducers and actions
export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
