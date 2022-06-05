import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

export default function OrderDialog({ open, handleClose, data }) {
  console.log(data);
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
  return (
    <div>
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
