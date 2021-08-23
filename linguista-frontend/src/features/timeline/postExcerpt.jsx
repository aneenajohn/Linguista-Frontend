import React from "react";
import { Link } from "react-router-dom";
import "./timeline.css";
import { PostAuthor } from "./postAuthor";
import { TimeAgo } from "./timeAgo";
import { ReactionButtons } from "./reactionButtons";

export const PostExcerpt = ({ post }) => {
  return (
    <article className="post-excerpt" key={post.id}>
      <h2 className="title">{post.title}</h2>
      <div>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.createdAt} />
      </div>
      <p className="post-content para">
        {post.description?.substring(0, 100).concat("....")}
      </p>
      <ReactionButtons post={post} />
      <Link to={`/posts/${post._id}`} className="button muted-button para">
        View Post
      </Link>
    </article>
  );
};
