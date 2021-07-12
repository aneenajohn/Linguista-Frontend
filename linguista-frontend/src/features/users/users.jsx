import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import { fetchUsers } from "./userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Topbar } from "../../topbar/topbar";
import "../timeline/timeline.css";
import "./users.css";
import { useStyles } from "./userStyles";
import {
  followUserAdded,
  followUserClicked,
  unfollowUserClicked
} from "./userSlice";
import { randomColor } from "./utils";

export const Users = () => {
  const users = useSelector((state) => state.users.users);
  console.log("users", users);
  const usersStatus = useSelector((state) => state.users.status);
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    user: { _id: currentUserId },
    token
  } = useSelector((state) => state.auth);
  useEffect(() => {
    (async () => {
      if (usersStatus === "idle") {
        await dispatch(fetchUsers());
        console.log("users in user page", users);
      }
    })();
  }, [dispatch, usersStatus, users]);

  const btnLabel = (followers) => {
    console.log({ followers });
    const label = followers?.includes(currentUserId) ? "Unfollow" : "Follow";
    return label;
  };

  const onFollowBtnClicked = async (userToFollowId) => {
    await dispatch(followUserAdded({ currentUserId, userToFollowId }));
    const user = users.find((user) => user._id === userToFollowId);

    if (!user.followers.includes(currentUserId)) {
      await dispatch(
        followUserClicked({ currentUserId, userToFollowId, token })
      );
    } else {
      await dispatch(
        unfollowUserClicked({
          currentUserId,
          userToUnfollowId: userToFollowId,
          token
        })
      );
    }
  };

  return (
    <div>
      <Topbar />
      <section>
        {usersStatus === "loading" && <h2>Loading....</h2>}
        {usersStatus === "error" && <h2>Something went wrong... </h2>}
        {usersStatus === "fulfilled" && (
          <Grid container spacing={2}>
            {users.map((user) => (
              <>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <div className={classes.root}>
                    <Container>
                      <Card className={classes.cardContainer}>
                        <CardHeader
                          avatar={
                            <Avatar
                              className={classes.avatar}
                              style={{
                                backgroundColor: randomColor()
                              }}
                            >
                              {" "}
                              {user.username.slice(0, 2).toUpperCase()}
                            </Avatar>
                          }
                          action={
                            <Button
                              className={classes.followBtn}
                              variant="contained"
                              color="secondary"
                              onClick={() => onFollowBtnClicked(user._id)}
                            >
                              {btnLabel(user.followers)}
                            </Button>
                          }
                          title={
                            <Typography
                              variant="h4"
                              component="h2"
                              gutterBottom
                              className="user-name"
                            >
                              {user.username}
                            </Typography>
                          }
                          subheader={
                            <>
                              <Typography variant="h6" component="p">
                                Followers {user.followers.length}
                              </Typography>
                              <Typography variant="h6" component="p">
                                Following {user.followings.length}
                              </Typography>
                            </>
                          }
                        ></CardHeader>
                      </Card>
                    </Container>
                  </div>
                </Grid>
              </>
            ))}
          </Grid>
        )}
      </section>
    </div>
  );
};
