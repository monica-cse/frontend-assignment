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
  },
  reducers: {
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
    togglePricing(state, action) {
      const key = action.payload;
      state.pricing[key] = !state.pricing[key];
    },
    resetFilters(state) {
      state.keyword = "";
      state.pricing = {
        paid: false,
        free: false,
        viewOnly: false,
      };
    },
  },
});

export const { setKeyword, togglePricing, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
