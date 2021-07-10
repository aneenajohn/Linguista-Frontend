import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}/auth/login`,
      {
        email,
        password
      }
    );
    return response.data;
  }
);

const { token, user } = JSON.parse(localStorage?.getItem("login")) || {
  token: null,
  user: null
};
const initialState = {
  status: "idle",
  error: null,
  user,
  token,
  isLoggedIn: false
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage?.removeItem("login");
      state.isLoggedIn = false;
      state.token = null;
    }
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      const { user, token } = action.payload;
      state.status = "fulfilled";
      state.token = token;
      state.user = user;
      state.isLoggedIn = true;
      localStorage?.setItem(
        "login",
        JSON.stringify({ token, user, isLoggedIn: true })
      );
    },
    [loginUser.rejected]: (state, action) => {
      const errorMessage = action.error.message;
      console.log(errorMessage);
      state.status = "error";
      state.error = "Login failed! Please try again";
    }
  }
});

export default authSlice.reducer;
