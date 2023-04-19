import { createSlice } from "@reduxjs/toolkit";

const chatInitialState = {
  //GLPyOvLWmhcNd2fv4DVc James rPmZfJK2WoXg8sS1uwh4

  // id: "GLPyOvLWmhcNd2fv4DVc",
  // openMsg: {
  //   id: "GLPyOvLWmhcNd2fv4DVc",
  //   creatorName: "James",
  //   feedId: "rPmZfJK2WoXg8sS1uwh4",
  // },
  openMsg: {
    id: "",
    creatorName: "",
    feedId: "",
  },
};

const chatSlice = createSlice({
  name: "chat",
  initialState: chatInitialState,
  reducers: {
    setOpenMsg(state, action) {
      state.openMsg = action.payload;
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
