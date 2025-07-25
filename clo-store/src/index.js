import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./features/contentSlice";
import filterReducer from "./store/filterSlice";

const store = configureStore({
  reducer: {
    content: contentReducer,
    filter: filterReducer,
  },
});

export default store;
