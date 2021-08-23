import React from "react";
import { useSelector } from "react-redux";
import "./timeline.css";

export const PostAuthor = ({ userId }) => {
  const allUsers = useSelector((state) => state.users.users);
  const PostAuthor = allUsers.find((user) => user._id === userId);

  return (
    <span className="para author-name">
      By {PostAuthor ? PostAuthor.username : "Unkown Author"}
    </span>
  );
};
