import React from "react";
import { useSelector } from "react-redux";
import "./timeline.css";

export const PostAuthor = ({ userId }) => {
  const author = useSelector((state) => state.auth.user.username);

  return (
    <span className="para author-name">
      By {author ? author : "Unkown Author"}
    </span>
  );
};
