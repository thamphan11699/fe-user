import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import OrderDialog from "../components/OrderDialog";
import { mobile } from "../responsive";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

export default function Order() {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleClose = () => {
    setData([]);
    setOpen(false);
  };
  const columns = [
    { field: "code", headerName: "Mã đơ hàng", width: 400 },
    {
      field: "income",
      headerName: "Giá",
      width: 350,
      editable: true,
    },
    {
      field: "description",
      headerName: "Mô tả",
      width: 750,
      editable: true,
    },

    {
      field: "statusText",
      headerName: "Trạng thái đơn hàng",
      width: 300,
      editable: true,
    },
  ];

  const hadnleCellClick = (item) => {
    setData(item.orderProducts);
    setOpen(true);
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper style={{ marginBottom: 100 }}>
        <Title>ĐƠN HÀNG CỦA TÔI</Title>
        <Top>
          <TopButton type="filled">
            <Link
              to="/product"
              style={{ textDecoration: "none", color: "white" }}
            >
              TIẾP TỤC MUA SẮM
            </Link>
          </TopButton>
          <TopTexts>
            <TopText>SẢN PHẨM </TopText>
            {/* <TopText>Your Wishlist (0)</TopText> */}
          </TopTexts>
          <TopButton
            onClick={() => {
              navigate("/cart");
            }}
            type="filled"
          >
            ĐI ĐẾN GIỎ HÀNG
          </TopButton>
        </Top>
        <Bottom>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={cart.order}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 15]}
              checkboxSelection
              disableSelectionOnClick
              onCellClick={(cell) => hadnleCellClick(cell.row)}
            />
          </div>
        </Bottom>
      </Wrapper>
      <OrderDialog open={open} handleClose={handleClose} data={data} />
      <Footer />
    </Container>
  );
}
