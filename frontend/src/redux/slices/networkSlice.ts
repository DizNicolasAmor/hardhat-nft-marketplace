import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  chainId: 0,
  name: '',
  symbol: '',
};

export const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    resetNetwork: (state: Draft<typeof initialState>) => {
      state.chainId = 0;
      state.name = '';
      state.symbol = '';
    },
    setNetwork: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState>
    ) => {
      state.chainId = action.payload.chainId;
      state.name = action.payload.name;
      state.symbol = action.payload.symbol;
    },
  },
});

// Selectors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getNetwork = (state: any) => state.network;

// Reducers and actions
export const { resetNetwork, setNetwork } = networkSlice.actions;

export default networkSlice.reducer;
