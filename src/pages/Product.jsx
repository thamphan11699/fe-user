import { IconButton, Tooltip } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import { mobile } from "../responsive";
import { addToCart } from "../redux/cartSlice";
import toast, { Toaster } from "react-hot-toast";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  let { id } = useParams();

  const [product, setProduct] = useState({});

  const [productChild, setProductChild] = useState({});

  const [listColor, setListColor] = useState([]);

  const [listSize, setListSize] = useState([]);

  const [size, setSize] = useState("");
  const [color, setColor] = useState({});

  const [listChild, setListChild] = useState([]);

  const [relatedProduct, setRelatedProduct] = useState([]);

  const [amount, setAmount] = useState(0);

  const cart = useSelector((state) => state.cart);

  const auth = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8089/public/api/product/${id}`)
      .then(({ data }) => {
        setProduct(data);
        setListChild(data.children);
        setProductChild(data.children[0]);
        setListColor([...new Set(data.children.map((item) => item.color))]);
        setListSize([...new Set(data.children.map((item) => item.size))]);

        setColor(data.children[0].color);

        axios
          .post("http://127.0.0.1:8089/public/api/product/all", {
            category: data.categories[0],
          })
          .then((res) => {
            setRelatedProduct(
              res.data.filter((item, index) => item.id.toString() !== id)
            );
          });
      });
  }, [id]);

  useEffect(() => {
    if (productChild?.id) {
      setSize(productChild.size);
    }
  }, [productChild]);

  const handleChangeColor = async (color) => {
    setColor(color);
    await filterProductChild(color, size);
    setAmount(0);
  };

  const filterProductChild = async (colors, size1) => {
    let pr = listChild.find(
      (item) => item.color.id === colors.id && item.size === size1
    );
    setProductChild(pr ? pr : null);
  };

  const handleChangeSize = async (event) => {
    setSize(event.target.value);
    await filterProductChild(color, event.target.value);
    setAmount(0);
  };

  const formatVND = (value) => {
    return value
      ? "VND " +
          value.toLocaleString("vi", { style: "currency", currency: "VND" })
      : "Hết hàng";
  };

  const handleAddToCart = () => {
    let cartItem = {
      product: productChild,
      amount: amount,
    };
    // Check product có trong cart hay chưa
    let product;
    if (cart.products && cart.products.length > 0) {
      product = cart.products.filter(
        (item, index) => item?.product.id === productChild.id
      );
    }
    if (auth) {
      if (product && product.length > 0) {
        console.log("Trùng");
        axios
          .post("http://127.0.0.1:8089/public/api/cart/update-to-cart", {
            ...cart,
            cartProduct: { ...cartItem, id: product[0].id },
          })
          .then(({ data }) => {
            toast.success("Thêm vào giỏ hàng thành công");
            dispatch(addToCart(data));
          });
      } else {
        axios
          .post("http://127.0.0.1:8089/public/api/cart/add-to-cart", {
            ...cart,
            cartProduct: cartItem,
          })
          .then(({ data }) => {
            toast.success("Thêm vào giỏ hàng thành côngs.");
            dispatch(addToCart(data));
          });
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <Container>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image
            src={
              productChild && productChild.thumbnail
                ? productChild.thumbnail
                : product.thumbnail
            }
          />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.description}</Desc>
          <Price>{formatVND(productChild?.price)}</Price>

          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {listColor.length > 0 &&
                listColor.map((item, index) => (
                  <Tooltip title={item.name} key={index}>
                    <div
                      style={
                        item.id === color.id
                          ? { border: "1px solid red" }
                          : null
                      }
                    >
                      <FilterColor
                        color={item.code}
                        onClick={() => handleChangeColor(item)}
                      />
                    </div>
                  </Tooltip>
                ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize
                value={size}
                // defaultValue={size || productChild.size}
                onChange={(event) => handleChangeSize(event)}
              >
                {listSize.length > 0 &&
                  listSize.map((item, index) => (
                    <Tooltip title={item} key={index}>
                      <FilterSizeOption value={item}>{item}</FilterSizeOption>
                    </Tooltip>
                  ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <span>Kho: </span>
              <Amount>{productChild ? productChild.quantity : 0}</Amount>
              <IconButton
                disabled={
                  productChild == null ||
                  (productChild && productChild.quantity === 0) ||
                  (productChild && amount <= 0)
                    ? true
                    : false
                }
                onClick={() => setAmount((preSate) => preSate - 1)}
              >
                <Remove />
              </IconButton>
              <Amount>{amount}</Amount>
              <IconButton
                disabled={
                  productChild == null ||
                  (productChild && productChild.quantity === 0) ||
                  (productChild && amount >= productChild.quantity)
                    ? true
                    : false
                }
                onClick={() => setAmount((preSate) => preSate + 1)}
              >
                <Add />
              </IconButton>
            </AmountContainer>
            <Button
              disabled={
                productChild == null ||
                (productChild && productChild.quantity === 0) ||
                amount === 0
                  ? true
                  : false
              }
              onClick={handleAddToCart}
            >
              GIỎ HÀNG
            </Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Wrapper style={{ padding: 20 }}>
        <Title style={{ textDecorationLine: "underline" }}>
          SẢN PHẨM LIÊN QUAN
        </Title>
      </Wrapper>
      <Products products={relatedProduct} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
