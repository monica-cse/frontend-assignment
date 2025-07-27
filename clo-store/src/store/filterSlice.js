import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    keyword: "",
    pricing: {
      paid: false,
      free: false,
      viewOnly: false,
    },
    priceRange: {
      min: 0,
      max: 999,
    },
  },
  reducers: {
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
    togglePricing(state, action) {
      const key = action.payload;
      state.pricing[key] = !state.pricing[key];
    },
    setPriceRange(state, action) {
      state.priceRange = action.payload;
    },
    resetFilters(state) {
      state.keyword = "";
      state.pricing = {
        paid: false,
        free: false,
        viewOnly: false,
      };
      state.priceRange = {
        min: 0,
        max: 999,
      };
    },
  },
});

export const {
  setKeyword,
  togglePricing,
  resetFilters,
  setPriceRange,
} = filterSlice.actions;

export default filterSlice.reducer;
