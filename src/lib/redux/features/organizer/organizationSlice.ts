import { createSlice } from "@reduxjs/toolkit";
import { IInitialState } from "./organizationTypes";

const initialState: IInitialState = {
  id: "",
  role: "",
};

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    setOrganization: (state, action) => {
      state.id = action.payload.id;
      state.role = action.payload.role;
    },
  },
});

export const { setOrganization } = organizationSlice.actions;
export default organizationSlice.reducer;
