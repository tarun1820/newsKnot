import { useState } from "react";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FlashMessage = (props) => {
  const [open, setOpen] = useState(true);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="">
      <Snackbar
        open={open}
        autoHideDuration={3000}
        message={props.message}
        onClose={handleClose}
      ></Snackbar>
    </div>
  );
};

export default FlashMessage;
