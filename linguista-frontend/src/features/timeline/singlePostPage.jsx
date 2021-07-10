import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PostAuthor } from "./postAuthor";
import { TimeAgo } from "./timeAgo";
import { ReactionButtons } from "./reactionButtons";
import { selectPostById } from "./timelineSlice";
import { useParams, useLocation } from "react-router-dom";
import "./timeline.css";

export const SinglePostPage = () => {
  const { postId } = useParams();

  const post = useSelector((state) => selectPostById(state, postId));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.createdAt} />
        </div>
        <p className="post-content para">{post.description}</p>
        <ReactionButtons post={post} />
        <Link to={`/editPost/${post._id}`} className="button para">
          Edit Post
        </Link>
      </article>
    </section>
  );
};
