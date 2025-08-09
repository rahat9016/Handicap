import { logout } from "@/services/auth.service";
import { createSlice } from "@reduxjs/toolkit";
import { IInitialState } from "./authTypes";

const initialState: IInitialState = {
  loading: false,
  userInformation: {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    profilePicture: "",
    isVerified: false,
    accountStatus: "",
    roleId: "",
    roleName: "",
  },
  data: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      logout();
      state.userInformation = initialState.userInformation;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUserInformation: (state, action) => {
      state.userInformation = {
        ...initialState.userInformation,
        ...action.payload,
      };
    },
    setUserId: (state, action) => {
      state.userInformation.id = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {
  setLoading,
  setUserInformation,
  setData,
  logoutUser,
  setUserId,
} = authSlice.actions;
export default authSlice.reducer;
