import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";
import { randomColor } from "../../topbar/utils";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
    marginTop: "1rem"
  },
  paper: {
    maxWidth: 300,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2)
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500]
  },
  cardContainer: {
    maxWidth: 300,
    marginBottom: "1rem"
  },
  followBtn: {
    position: "relative",
    top: "12px"
  },
  avatar: {
    fontSize: "medium",
    position: "relative",
    bottom: "20px"
  },
  avatarTopBar: {
    fontSize: "medium",
    backgroundColor: randomColor()
  }
}));
