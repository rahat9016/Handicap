import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import organizerReducer from "./features/organizer/organizationSlice";
import permissionReducer from "./features/permission/permissionSlice";
import userReducer from "./features/user/userSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            user: userReducer,
            auth: authReducer,
            organizer: organizerReducer,
            permission: permissionReducer,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];