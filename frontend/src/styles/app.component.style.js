import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    margin: "10px 100px",
    display: "flex",
    padding: "5px",
    marginBottom: "5px",
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "center",
    boxShadow: "1px 1px 1px 1px #808080",
    alignItems: "center",
    width: "600px",

    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  image: {
    marginLeft: "15px",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));

export { useStyles };
