import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import IconButton from "@mui/material/IconButton";

const Tutorial = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <span>
      <IconButton onClick={handleClickOpen} sx={{ color: "white" }}>
        <InfoOutlinedIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{"Tutorial"}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Add tasks, edit, delete and mark as done with a checkbox. Hold and drag a task to rearrange order. <br />{" "}
            Tasks are stored in your browser storage and deleted when you clear browser cache.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Let's go!
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
};
export default Tutorial;
