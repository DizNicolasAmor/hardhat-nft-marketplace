import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { IItem } from '../../components/Item';

interface IMarketplaceState {
  isLoading: boolean;
  items: IItem[];
  itemsOwned: IItem[];
  itemsListed: IItem[];
}

const initialState: IMarketplaceState = {
  isLoading: false,
  items: [],
  itemsOwned: [],
  itemsListed: [],
};

export const marketplaceSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    resetMarketplace: (state: Draft<IMarketplaceState>) => {
      state.isLoading = false;
      state.items = [];
      state.itemsOwned = [];
      state.itemsListed = [];
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
    setItemsOwned: (
      state: Draft<IMarketplaceState>,
      action: PayloadAction<IItem[]>
    ) => ({
      ...state,
      itemsOwned: action.payload,
    }),
    setItemsListed: (
      state: Draft<IMarketplaceState>,
      action: PayloadAction<IItem[]>
    ) => ({
      ...state,
      itemsListed: action.payload,
    }),
  },
});

// Selectors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getMarketplace = (state: any): IMarketplaceState =>
  state.marketplace;

// Reducers and actions
export const {
  resetMarketplace,
  setIsLoading,
  setMarketplace,
  setItemsOwned,
  setItemsListed,
} = marketplaceSlice.actions;

export default marketplaceSlice.reducer;
