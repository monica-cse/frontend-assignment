import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchContentData = createAsyncThunk("content/fetchData", async () => {
  const res = await fetch("https://closet-recruiting-api.azurewebsites.net/api/data");
  const data = await res.json();
  return data;
});

const contentSlice = createSlice({
  name: "content",
  initialState: {
    allItems: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContentData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContentData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allItems = action.payload;
      })
      .addCase(fetchContentData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default contentSlice.reducer;
