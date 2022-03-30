import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  items: [],
};

export const marketplaceSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    resetMarketplace: (state: Draft<typeof initialState>) => {
      state.isLoading = false;
      state.items = [];
    },
    setIsLoading: (
      state: Draft<typeof initialState>,
      action: PayloadAction<boolean>
    ) => ({
      ...state,
      isLoading: action.payload,
    }),
    setMarketplace: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState>
    ) => {
      state.isLoading = action.payload.isLoading;
      state.items = [...action.payload.items];
    },
  },
});

// Selectors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getMarketplace = (state: any) => state.token;

// Reducers and actions
export const { resetMarketplace, setIsLoading, setMarketplace } =
  marketplaceSlice.actions;

export default marketplaceSlice.reducer;
