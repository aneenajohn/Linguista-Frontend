import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk(
  "timeline/fetchPosts",
  async ({ userId, token }) => {
    // console.log("In fetch", userId, token);
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_BACKEND_API}/post/timeline`,
      data: {
        userId: userId
      },
      headers: { authorization: token }
    });
    return response.data;
  }
);

export const updateUserReaction = createAsyncThunk(
  "timeline/reactionAdded",
  async ({ userId, postId, reaction, token }) => {
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_BACKEND_API}/post/${postId}/like`,
      data: {
        userId,
        reaction
      },
      headers: { authorization: token }
    });
  }
);

export const newPostCreated = createAsyncThunk(
  "timeline/newPostCreated",
  async ({ userId, title, description, token }) => {
    console.log("Post called for new post");
    console.log("In post call, ", userId, title, description, token);
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_BACKEND_API}/post/`,
      data: {
        userId,
        title,
        description
      },
      headers: { authorization: token }
    });
    return response.data;
  }
);

const initialState = {
  timeline: [],
  status: "idle",
  error: null
};
const timelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { userId, postId, reaction } = action.payload;
      const existingPost = state.timeline.find((post) => post._id === postId);
      existingPost && existingPost.reactions[reaction].includes(userId)
        ? existingPost.reactions[reaction].pop(userId)
        : existingPost.reactions[reaction].push(userId);
    },
    postAdded: (state, action) => {
      state.timeline.concat(action.payload);
    }
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      // const { timeline } = action.payload;
      state.status = "succeeded";
      // Add any fetched posts to the array
      console.log("payload", action.payload);
      // state.posts = state.posts.concat(action.payload);
      state.timeline = state.timeline.concat(action.payload.timeline);
      state.error = null;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.payload;
    },
    [newPostCreated.pending]: (state) => {
      state.status = "loading";
    },
    [newPostCreated.fulfilled]: (state, action) => {
      // state.timeline = state.timeline.concat(action.payload.timeline);
      state.status = "succeeded";
    }
  }
});

export const selectAllPosts = (state) => state.timeline.timeline;
export const selectPostById = (state, postId) =>
  state.timeline.timeline.find((post) => post._id === postId);

export default timelineSlice.reducer;
export const { reactionAdded, postAdded } = timelineSlice.actions;
