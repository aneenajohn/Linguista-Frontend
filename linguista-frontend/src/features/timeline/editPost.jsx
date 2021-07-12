import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  postUpdated,
  selectPostById,
  updatedPost,
  postDeleted,
  userDeleted
} from "./timelineSlice";
import { useParams, useLocation } from "react-router-dom";
import "./timeline.css";
import { Topbar } from "../../topbar/topbar";
// import {updatedPost} from "./timelineSlice;"

export const EditPost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const post = useSelector((state) =>
  //   state.posts.find((post) => post.id === postId)
  // );

  const post = useSelector((state) => selectPostById(state, postId));

  const {
    user: { _id, username },
    token
  } = useSelector((state) => state.auth);

  console.log("post in edit post page", post);
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.description);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const onSavePostClicked = async () => {
    if (title && content) {
      await dispatch(
        postUpdated({
          id: postId,
          title,
          description: content
        })
      );
      navigate(`/posts/${postId}`);
      await dispatch(
        updatedPost({ postId, userId: _id, title, description: content, token })
      );
    }
  };

  const onDeletePostClicked = async () => {
    console.log("postId in edit page", postId);
    await dispatch(postDeleted({ postId: postId }));
    navigate(`/posts`);
    await dispatch(userDeleted({ postId: postId, userId: _id, token }));
  };

  return (
    <>
      <Topbar />
      <section>
        <h2 className="para--lead">Edit Post</h2>
        <form>
          <label htmlFor="postTitle" className="para">
            Post Title:
          </label>
          <br />
          <input
            type="text"
            id="postTitle"
            className="postTitle"
            placeholder="What's on your mind?"
            value={title}
            onChange={onTitleChanged}
          />
          <br />
          <label htmlFor="postContent" className="para">
            Content:
          </label>
          <br />
          <textarea
            id="postContent"
            className="postContent"
            value={content}
            onChange={onContentChanged}
          />
        </form>
        <button
          type="button"
          className="btn btn--primary btn-right"
          onClick={onSavePostClicked}
        >
          Save Post
        </button>
        <button
          type="button"
          className="btn-outlined btn-outlined--primary btn-left"
          onClick={onDeletePostClicked}
        >
          Delete Post
        </button>
      </section>
    </>
  );
};
