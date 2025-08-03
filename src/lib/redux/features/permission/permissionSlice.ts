import { createSlice } from "@reduxjs/toolkit";
import { IInitialState } from "./permissionTypes";

const initialState: IInitialState = {
  hasPermission: false
};

const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    setPermission: (state, action) => {
      state.hasPermission = action.payload;
    },
  },
});

export const { setPermission } = permissionSlice.actions;
export default permissionSlice.reducer;
