import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk(
  "timeline/fetchPosts",
  async ({ userId, token }) => {
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
    return response.data;
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

export const updatedPost = createAsyncThunk(
  "timeline/postUpdated",
  async ({ postId, userId, title, description, token }) => {
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_BACKEND_API}/post/${postId}`,
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

export const userDeleted = createAsyncThunk(
  "timeline/postDeleted",
  async ({ postId, userId, token }) => {
    const response = await axios({
      method: "delete",
      url: `${process.env.REACT_APP_BACKEND_API}/post/${postId}`,
      data: {
        userId
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
    },
    postUpdated: (state, action) => {
      const { id, title, description } = action.payload;
      const existingPost = state.timeline.find((post) => post._id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.description = description;
      }
    },
    postDeleted: (state, action) => {
      const { postId } = action.payload;
      state.timeline = state.timeline.filter((post) => post._id !== postId);
    }
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      // state.timeline = state.timeline.concat(action.payload.timeline);
      state.error = null;
      state.timeline = action.payload.timeline;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.payload;
    },
    [newPostCreated.pending]: (state) => {
      state.status = "loading";
    },
    [newPostCreated.fulfilled]: (state, action) => {
      state.status = "succeeded";
    }
  }
});

export const selectAllPosts = (state) => state.timeline.timeline;
export const selectPostById = (state, postId) =>
  state.timeline.timeline.find((post) => post._id === postId);

export default timelineSlice.reducer;
export const {
  reactionAdded,
  postAdded,
  postUpdated,
  postDeleted
} = timelineSlice.actions;
