import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  video: {
    width: "550px",
    height: "50vh",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  video2: {
    bottom: 0,
    width: "220px",
    height: "20vh",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  boxx: {
    justifyContent: "center",
    display: "flex",
    marginBottom: "30px",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  mycard: {
    padding: "10px",
    backgroundColor: "black",
    margin: "10px",
    boxShadow: "1px 1px 1px 1px #808080",
  },
  mycard2: {
    padding: "10px",
    backgroundColor: "black",
    margin: "10px",
    boxShadow: "1px 1px 1px 1px #808080",
  },
  textField: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "4px",
    fontWeight: 500,
  },
  input: {
    color: "white",
  },
  inputlabel: {
    color: "teal",
  },
}));

export { useStyles };
