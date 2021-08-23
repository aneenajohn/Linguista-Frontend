import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import timelineReducer from "../features/timeline/timelineSlice";
import userReducer from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    timeline: timelineReducer,
    users: userReducer
  }
});
