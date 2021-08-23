import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reactionAdded, updateUserReaction } from "./timelineSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀"
};

export const ReactionButtons = ({ post }) => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const reactionPressed = async ({ userId, postId, reaction, token }) => {
    await dispatch(
      reactionAdded({
        userId,
        postId,
        reaction
      })
    );
    await dispatch(
      updateUserReaction({
        userId,
        postId,
        reaction,
        token
      })
    );
  };

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        // onClick={() =>
        // dispatch(
        //   reactionAdded({
        //     userId: post.userId,
        //     postId: post._id,
        //     reaction: name
        //   })
        // )
        // }
        onClick={() =>
          reactionPressed({
            userId: post.userId,
            postId: post._id,
            reaction: name,
            token
          })
        }
      >
        {emoji} {post.reactions[name].length}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};
