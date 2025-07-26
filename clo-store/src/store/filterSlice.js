import { createSlice } from "@reduxjs/toolkit";

// Load saved filter state from localStorage (if available)
const savedState = JSON.parse(localStorage.getItem("filterState")) || {
  keyword: "",
  pricing: {
    paid: false,
    free: false,
    viewOnly: false,
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState: savedState,
  reducers: {
    setKeyword(state, action) {
      state.keyword = action.payload;
      localStorage.setItem("filterState", JSON.stringify(state));
    },
    togglePricing(state, action) {
      const key = action.payload;
      state.pricing[key] = !state.pricing[key];
      localStorage.setItem("filterState", JSON.stringify(state));
    },
    resetFilters(state) {
      state.keyword = "";
      state.pricing = {
        paid: false,
        free: false,
        viewOnly: false,
      };
      localStorage.setItem("filterState", JSON.stringify(state));
    },
  },
});

export const { setKeyword, togglePricing, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
