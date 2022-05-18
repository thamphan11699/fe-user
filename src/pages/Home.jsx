import axios from "axios";
import React, { useEffect, useState } from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import News from "../components/News";
import AlertDialog from "../components/AlertDialog";

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
      <Categories />
      <Products products={listProduct} />
      {/* <Wrapper style={{ padding: 20 }}>
        <Title style={{ textDecorationLine: "underline" }}>TIN TỨC</Title>
      </Wrapper> */}
      <News />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
