import { createSlice } from "@reduxjs/toolkit";

const feedsInitialState = {
  feeds: [],
  isLoading: false,
  error: "",
};

const feedsSlice = createSlice({
  name: "feeds",
  initialState: feedsInitialState,
  reducers: {
    setFeeds(state, action) {
      state.feeds = action.payload.feeds;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload.error;
    },
  },
});

export const feedsActions = feedsSlice.actions;
export default feedsSlice.reducer;
