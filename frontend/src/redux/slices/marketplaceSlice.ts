import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { IItem } from '../../components/Item';

interface IMarketplaceState {
  isLoading: boolean;
  items: IItem[];
}

const initialState: IMarketplaceState = {
  isLoading: false,
  items: [],
};

export const marketplaceSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    resetMarketplace: (state: Draft<IMarketplaceState>) => {
      state.isLoading = false;
      state.items = [];
    },
    setIsLoading: (
      state: Draft<IMarketplaceState>,
      action: PayloadAction<boolean>
    ) => ({
      ...state,
      isLoading: action.payload,
    }),
    setMarketplace: (
      state: Draft<IMarketplaceState>,
      action: PayloadAction<IMarketplaceState>
    ) => {
      state.isLoading = action.payload.isLoading;
      state.items = [...action.payload.items];
    },
  },
});

// Selectors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getMarketplace = (state: any): IMarketplaceState =>
  state.marketplace;

// Reducers and actions
export const { resetMarketplace, setIsLoading, setMarketplace } =
  marketplaceSlice.actions;

export default marketplaceSlice.reducer;
