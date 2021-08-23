import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios({
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_API}/auth/users`
  });
  return response.data;
});

export const followUserClicked = createAsyncThunk(
  "users/followUserAdded",
  async ({ currentUserId, userToFollowId, token }) => {
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_BACKEND_API}/users/${userToFollowId}/follow`,
      data: {
        userId: currentUserId
      },
      headers: { authorization: token }
    });
    return response.data;
  }
);

export const unfollowUserClicked = createAsyncThunk(
  "users/followUserAdded",
  async ({ currentUserId, userToUnfollowId, token }) => {
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_BACKEND_API}/users/${userToUnfollowId}/unfollow`,
      data: {
        userId: currentUserId
      },
      headers: { authorization: token }
    });
    return response.data;
  }
);

const initialState = {
  users: [],
  status: "idle",
  error: null
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    followUserAdded: (state, action) => {
      const { currentUserId, userToFollowId } = action.payload;
      const followedUser = state.users.find(
        (user) => user._id === userToFollowId
      );
      followedUser?.followers.includes(currentUserId)
        ? followedUser.followers.pop(currentUserId)
        : followedUser.followers.push(currentUserId);

      const currentUser = state.users.find(
        (user) => user._id === currentUserId
      );
      currentUser.followings.includes(userToFollowId)
        ? currentUser.followings.pop(userToFollowId)
        : currentUser.followings.push(userToFollowId);
    }
  },
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.status = "loading";
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.users = state.users.concat(action.payload.users);
      state.error = null;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.payload;
    }
  }
});

export default userSlice.reducer;
export const { followUserAdded } = userSlice.actions;
