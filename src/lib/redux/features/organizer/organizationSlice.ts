import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { IInitialState } from "./organizationTypes";

const initialState: IInitialState = {
  id: "",
  roleId: "",
  roleName: "",
  organizationName: "",
};

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    setOrganization: (state, action) => {
      state.id = action.payload.id;
      state.roleId = action.payload.roleId;
      state.roleName = action.payload.roleName;
      state.organizationName = action.payload.organizationName;
    },
    clearOrganization: (state) => {
      state.id = "";
      state.roleName = "";
      state.roleId = "";
      state.organizationName = "";
      Cookies.remove("organizationData");
    },
  },
});

export const { setOrganization, clearOrganization } = organizationSlice.actions;
export default organizationSlice.reducer;
