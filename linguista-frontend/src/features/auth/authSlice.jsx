import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials) => {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/auth/login`,
        credentials
      );
  
      return response.data;
    }
  );

