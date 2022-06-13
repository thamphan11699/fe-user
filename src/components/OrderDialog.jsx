import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../redux/cartSlice";

export default function OrderDialog({ open, handleClose, data, order }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const dataTable = data.map((item) => {
    return {
      id: item.id,
      name: item.product.name,
      color: item.product.color.name,
      size: item.product.size,
      amount: item.amount,
    };
  });
  const columns = [
    { field: "name", headerName: "Tên sản phẩm", width: 300 },
    {
      field: "color",
      headerName: "Màu sắc",
      width: 200,
      editable: true,
    },
    {
      field: "size",
      headerName: "Size",
      width: 200,
      editable: true,
    },

    {
      field: "amount",
      headerName: "Số lượng",
      width: 98,
      editable: true,
    },
  ];

  const cancleOrder = () => {
    axios
      .post(`http://localhost:8089/api/order/${order.id}`, {
        ...order,
        status: 6,
        description: "Đơn hàng bị hủy bởi khách hàng",
      })
      .then(({ data }) => {
        toast.success("Hủy đơn hàng thành công");
        axios
          .get(`http://127.0.0.1:8089/api/order/get-by-user/${user.id}`)
          .then((res) => {
            dispatch(getOrder(res.data));
            handleClose();
          });
      });
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ background: "#757ce8", color: "white" }}
        >
          Chi tiết đơn hàng
        </DialogTitle>
        <DialogContent dividers>
          <div style={{ height: 300, width: "850px" }}>
            <DataGrid
              rows={dataTable}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 15]}
              checkboxSelection
              disableSelectionOnClick
            />
          </div>
        </DialogContent>
        <DialogActions>
          {(order.status === 1 || order.status === 2) && (
            <Button
              onClick={() => cancleOrder()}
              color="secondary"
              autoFocus
              variant="contained"
            >
              Hủy Đơn Hàng
            </Button>
          )}
          <Button
            onClick={handleClose}
            color="primary"
            autoFocus
            variant="contained"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
