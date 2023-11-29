import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TodoState = {};

const initialState = {} as TodoState;

export const todo = createSlice({
  name: "todo",
  initialState,
  reducers: {
    reset: () => initialState,
  },
});

export const { reset } = todo.actions;
export default todo.reducer;
