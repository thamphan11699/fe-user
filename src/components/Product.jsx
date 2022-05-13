import { SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  return (
    <Fragment>
      <Container>
        <Circle />
        <Image
          src={
            item.thumbnail
              ? item.thumbnail
              : "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png"
          }
        />
        <div style={{ position: "absolute", bottom: 10 }}>{item.name}</div>
        <Info>
          <Icon>
            <ShoppingCartOutlined />
          </Icon>
          <Icon>
            <Link to={`/product/${item.id}`}>
              <SearchOutlined />
            </Link>
          </Icon>
          {/* <Icon>
          <FavoriteBorderOutlined />
        </Icon> */}
        </Info>
      </Container>
    </Fragment>
  );
};

export default Product;
