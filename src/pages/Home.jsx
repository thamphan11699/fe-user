import axios from "axios";
import React, { useEffect, useState } from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import styled from "styled-components";
import { mobile } from "../responsive";
import News from "../components/News";
import AlertDialog from "../components/AlertDialog";

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const Title = styled.h1`
  font-weight: 300;
`;

const Home = () => {
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    axios
      .post("http://127.0.0.1:8089/public/api/product/get-all", {
        pageIndex: 1,
        pageSize: 10,
        useParent: "Y",
      })
      .then(({ data }) => {
        setListProduct(data);
      });
  }, []);

  return (
    <div>
      <AlertDialog
        content={"Đơn hàng của bạn đã được tạo thành công"}
        title="Thông Báo"
      />
      <Announcement />
      <Navbar />
      <Slider />
      <Wrapper style={{ padding: 20 }}>
        <Title style={{ textDecorationLine: "underline" }}>
          DANH MỤC SẢN PHẨM
        </Title>
      </Wrapper>
      <Categories />
      <Wrapper style={{ padding: 20 }}>
        <Title style={{ textDecorationLine: "underline" }}>
          DANH SÁCH SẢN PHẨM
        </Title>
      </Wrapper>
      <Products products={listProduct} />
      <Wrapper style={{ padding: 20 }}>
        <Title style={{ textDecorationLine: "underline" }}>TIN TỨC</Title>
      </Wrapper>
      <News />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
