import { IconButton } from "@material-ui/core";
import { Add, Delete, Remove } from "@material-ui/icons";
import axios from "axios";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { openAlertDialog } from "../redux/authSlice";
import { getCartByUser } from "../redux/cartSlice";
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

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const formatVND = (value) => {
    return value
      ? "VND " +
          value.toLocaleString("vi", { style: "currency", currency: "VND" })
      : "Hết hàng";
  };

  const handleOrder = () => {
    axios.post("http://127.0.0.1:8089/api/order", cart).then(({ data }) => {
      dispatch(openAlertDialog());
      navigate("/");
      axios
        .get(`http://127.0.0.1:8089/public/api/cart/${user.id}`)
        .then((res) => {
          dispatch(getCartByUser(res.data));
        });
    });
  };

  const addAmount = (item) => {
    axios
      .post(`http://127.0.0.1:8089/public/api/cart/add-amount/${cart.id}`, item)
      .then(({ data }) => {
        dispatch(getCartByUser(data));
      });
  };

  const removeAmount = (item) => {
    axios
      .post(
        `http://127.0.0.1:8089/public/api/cart/remove-amount/${cart.id}`,
        item
      )
      .then(({ data }) => {
        dispatch(getCartByUser(data));
      });
  };

  const deleteProduct = (item) => {
    axios
      .post(
        `http://127.0.0.1:8089/public/api/cart/delete-to-cart/${cart.id}`,
        item
      )
      .then(({ data }) => {
        dispatch(getCartByUser(data));
      });
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper style={{ marginBottom: 100 }}>
        <Title>GIỎ HÀNG CỦA BẠN</Title>
        <Top>
          <TopButton>
            <Link to="/product">TIẾP TỤC MUA SẮM</Link>
          </TopButton>
          <TopTexts>
            <TopText>SẢN PHẨM{" " + cart.countProduct}</TopText>
            {/* <TopText>Your Wishlist (0)</TopText> */}
          </TopTexts>
          <TopButton type="filled">ĐƠN HÀNG CỦA TÔI</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart && cart.products && cart.products.length > 0 ? (
              cart.products.map((item, index) => (
                <Fragment key={index}>
                  <Product>
                    <ProductDetail>
                      <Image
                        src={
                          item.product.thumbnail !== ""
                            ? item.product.thumbnail
                            : item.product?.parent?.thumbnail
                        }
                      />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {" " + item.product?.name}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {" " + item.product?.code}
                        </ProductId>
                        <ProductColor color={item.product?.color?.code} />
                        <ProductSize>
                          <b>Size:</b> {" " + item.product?.size}
                        </ProductSize>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <IconButton onClick={() => addAmount(item)}>
                          <Add />
                        </IconButton>
                        <ProductAmount>{item?.amount}</ProductAmount>
                        <IconButton onClick={() => removeAmount(item)}>
                          <Remove />
                        </IconButton>
                        <IconButton onClick={() => deleteProduct(item)}>
                          <Delete />
                        </IconButton>
                      </ProductAmountContainer>
                      <ProductPrice>
                        {formatVND(item.product?.price)}
                      </ProductPrice>
                    </PriceDetail>
                  </Product>
                  <Hr />
                </Fragment>
              ))
            ) : (
              <h1>
                KHÔNG CÓ SẢN PHẨM NÀO TRONG GIỎ HÀNG :{" "}
                <Link to="/product"> {" Mua Ngay"}</Link>
              </h1>
            )}
          </Info>
          <Summary>
            <SummaryTitle>TÓM TẮT ĐƠN HÀNG</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>TỔNG TIỀN</SummaryItemText>
              <SummaryItemPrice>{formatVND(cart.subtotal)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Phí vận chuyển</SummaryItemText>
              <SummaryItemPrice>{formatVND("50000")}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Khuyến mãi</SummaryItemText>
              <SummaryItemPrice>{formatVND("50000")}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Thành tiền</SummaryItemText>
              <SummaryItemPrice>{formatVND(cart.subtotal)}</SummaryItemPrice>
            </SummaryItem>
            <Button
              onClick={handleOrder}
              style={{ cursor: "pointer" }}
              disabled={cart.countProduct === 0 ? true : false}
            >
              ĐẶT NGAY
            </Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
