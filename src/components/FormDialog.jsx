import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeUserDialog } from "../redux/authSlice";

export default function FormDialog() {
  const dispatch = useDispatch();

  const openUserDialog = useSelector((state) => state.auth.openUserDialog);
  const user = useSelector((state) => state.auth.user);

  const handleClose = () => {
    dispatch(closeUserDialog());
  };

  return (
    <div>
      <Dialog
        open={openUserDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
      >
        <DialogTitle
          id="form-dialog-title"
          style={{ background: "#757ce8", color: "white" }}
        >
          Thông tin người dùng
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                margin="dense"
                variant="outlined"
                id="name"
                label="Họ và tên"
                value={user?.userInfo?.fullName ? user?.userInfo?.fullName : ""}
                type="text"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                margin="dense"
                variant="outlined"
                id="email"
                label="Email"
                value={user?.email ? user?.email : ""}
                type="email"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                margin="dense"
                variant="outlined"
                id="email"
                label="Phone number"
                value={
                  user?.userInfo?.phoneNumber ? user?.userInfo?.phoneNumber : ""
                }
                type="text"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                margin="dense"
                variant="outlined"
                id="email"
                label="Địa chỉ"
                value={user?.userInfo?.address ? user?.userInfo?.address : ""}
                type="text"
                fullWidth
                disabled
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
