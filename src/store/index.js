import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import feedsReducer from "./reducers/feedSlice";
import chatReducer from "./reducers/chatSlice";
const store = configureStore({
  reducer: {
    userReducer,
    feedsReducer,
    chatReducer,
  },
});

export default store;
