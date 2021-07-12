import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { red } from "@material-ui/core/colors";

const RejectButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
  },
}))(Button);

export { RejectButton };
