import { Card, CardMedia, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeUserDialog, getUser } from "../redux/authSlice";
import { DropzoneArea } from "material-ui-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

export default function FormDialog() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const openUserDialog = useSelector((state) => state.auth.openUserDialog);
  const user = useSelector((state) => state.auth.user);

  const [fileUpload, setFileUpload] = useState("");

  const handleClose = () => {
    dispatch(closeUserDialog());
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let newUser = { ...user };
    if (fileUpload !== "") {
      const avatar = await uploadFile(fileUpload[0]);
      newUser.avatar = avatar;
    }
    axios
      .put(`http://127.0.0.1:8089/api/user/${newUser.id}`, newUser)
      .then(({ data }) => {
        dispatch(getUser(data));
        toast.success("Chỉnh sửa thành công");
      })
      .catch((err) => {
        toast.error("Chỉnh sửa không thành công");
      });
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type":
          "multipart/form-data; boundary=<calculated when request is sent>",
      },
    };
    const res = await axios.post(
      "http://127.0.0.1:8089/api/upload-file",
      formData,
      config
    );
    return res.data;
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
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
              />
            </Grid>
            <Grid item md={12} xs={12} container spacing={3}>
              <Grid item md={6} xs={12}>
                <DropzoneArea
                  acceptedFiles={["image/*"]}
                  dropzoneText={"Thêm hình ảnh"}
                  maxFileSize={30000000}
                  filesLimit={1}
                  onChange={(files) => setFileUpload(files)}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Card className={classes.root}>
                  <CardMedia
                    className={classes.media}
                    style={{}}
                    image={user?.avatar}
                    title={user?.username}
                  />
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="contained">
            OK
          </Button>
          <Button
            onClick={handleFormSubmit}
            color="primary"
            variant="contained"
          >
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
