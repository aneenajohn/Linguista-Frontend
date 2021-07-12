import "./topbar.css";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import PeopleIcon from "@material-ui/icons/People";
import RssFeedIcon from "@material-ui/icons/RssFeed";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "../features/users/userStyles";
import { useState } from "react";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export function Topbar() {
  const {
    user: { username }
  } = useSelector((state) => state.auth);
  const classes = useStyles();
  const [isActive, setActive] = useState(false);
  console.log({ isActive });
  const toggleActive = () => setActive((isActive) => !isActive);
  const authDispatch = useDispatch();
  const navigate = useNavigate();

  const logoutBtnClicked = () => {
    authDispatch(logout());
    navigate("/");
  };
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
      <div
        className={isActive ? "showProfile" : "hideProfile"}
        onClick={() => toggleActive(isActive)}
      >
        <div className="user">
          Hi, <span className="username">{username}</span>
        </div>
        <div>
          <span className="logout" onClick={logoutBtnClicked}>
            Logout <ExitToAppRoundedIcon className="logout--icon" />
          </span>
        </div>
      </div>
    </>
  );
}
