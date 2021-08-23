import {
  blue,
  green,
  pink,
  yellow,
  purple,
  orange,
  deepPurple,
  lime,
  teal,
  cyan,
  blueGrey,
  brown
} from "@material-ui/core/colors";

export function randomColor() {
  let colors = [
    blue[500],
    green[500],
    pink[500],
    yellow[700],
    purple[500],
    orange[500],
    deepPurple[500],
    lime[500],
    teal[500],
    cyan[500],
    blueGrey[500],
    brown[500]
  ];
  let color = colors[Math.floor(Math.random() * colors.length)];
  // let color = "#" + hex.toString(16);

  return color;
}
