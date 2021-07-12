import "./topbar.css";
import { Link } from "react-router-dom";
import PeopleIcon from "@material-ui/icons/People";
import RssFeedIcon from "@material-ui/icons/RssFeed";

import Avatar from "@material-ui/core/Avatar";
import { useSelector } from "react-redux";
import { randomColor } from "../features/users/utils";
import { useStyles } from "../features/users/userStyles";
import { useState } from "react";

export function Topbar() {
  const {
    user: { username }
  } = useSelector((state) => state.auth);
  const classes = useStyles();
  const [isActive, setActive] = useState(false);
  console.log({ isActive });
  const toggleActive = () => setActive((isActive) => !isActive);
  return (
    <>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link
            to={`/posts/`}
            className="topbarLink button muted-button topbarLink--title"
          >
            Linguista
          </Link>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <Link
              to={`/posts/`}
              className="topbarLink button muted-button para"
            >
              <RssFeedIcon className="topbar-icon" />
              Feed
            </Link>
            <Link
              to={`/all-users`}
              className="topbarLink button muted-button para"
            >
              <PeopleIcon className="topbar-icon" />
              People
            </Link>
            <span
              className="button muted-button para profile-icon"
              onClick={() => toggleActive(isActive)}
            >
              {/* <AccountCircleIcon className="topbar-icon" /> */}
              <Avatar
                className={classes.avatarTopBar}
                // style={{
                //   backgroundColor: randomColor()
                // }}
              >
                {" "}
                {username.slice(0, 2).toUpperCase()}
              </Avatar>
            </span>
          </div>
        </div>
      </div>
      <div className={isActive ? "showProfile" : "hideProfile"}>
        <div>
          Hi,<span className="username">{username}</span>
        </div>
      </div>
    </>
  );
}
