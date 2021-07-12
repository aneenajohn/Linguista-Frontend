import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, fetchPosts } from "./timelineSlice";
import { PostExcerpt } from "./postExcerpt";
import { AddNewPost } from "./addNewPost";
import { Topbar } from "../../topbar/topbar";

export const Timeline = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);

  const {
    user: { _id },
    token
  } = useSelector((state) => state.auth);

  const timelineStatus = useSelector((state) => state.timeline.status);
  const error = useSelector((state) => state.timeline.error);
  const { timeline } = useSelector((state) => state.timeline);

  console.log("posts", posts);

  useEffect(() => {
    (async () => {
      if (timelineStatus === "idle") {
        console.log("_id, token", _id, token);
        await dispatch(fetchPosts({ userId: _id, token }));
        // console.log(posts);
      }
    })();
  }, [timelineStatus, dispatch, _id, token]);

  return (
    <div>
      <Topbar />
      <section className="posts-list">
        <AddNewPost />
        <h1 className="postTitle">Timeline</h1>
        {timelineStatus === "loading" && <h2>Loading....</h2>}
        {timelineStatus === "error" && <h2>Something went wrong... </h2>}
        {timelineStatus === "succeeded" &&
          (posts.length === 0 ? (
            <div className="para--lead">No posts yet!</div>
          ) : (
            posts.map((post) => <PostExcerpt key={post._id} post={post} />)
          ))}
        <div
          className="mr-bottom
        "
        ></div>
      </section>
    </div>
  );
};
