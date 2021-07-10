import { newPostCreated, postAdded } from "./timelineSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import "./timeline.css";

export const AddNewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const {
    user: { _id, username },
    token
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const onSavePostClicked = async () => {
    console.log(title, content);
    if (title && content) {
      await dispatch(
        newPostCreated({ userId: _id, title, description: content, token })
      );
      // await postDispatch(
      //   postAdded({ userId: _id, title, description: content })
      // );
      setContent("");
      setTitle("");
    }
  };

  const canSave = Boolean(title) && Boolean(content);

  return (
    <section>
      <h2 className="title">Add a new post</h2>
      <form>
        {/* <label htmlFor="postTitle" className="para">
          Post Title :
        </label> */}
        <input
          type="text"
          id="postTitle"
          className="postTitle"
          value={title}
          placeholder="Post title"
          onChange={onTitleChanged}
        />
        <br />
        {/* <label htmlFor="postContent"
        >Content :</label> */}
        <input
          type="text"
          id="postContent"
          className="postContent"
          placeholder={`What's happening, ${
            username[0].toUpperCase() + username.slice(1)
          }?`}
          value={content}
          onChange={onContentChanged}
        />

        <div class="btn__container">
          <button
            className="btn btn--primary"
            onClick={onSavePostClicked}
            disabled={!canSave}
          >
            Save Post
          </button>
        </div>
      </form>
    </section>
  );
};
