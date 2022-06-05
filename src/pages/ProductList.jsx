import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const [category, setCategory] = useState({
    id: null,
  });

  const [listCategory, setListCategory] = useState([]);

  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    axios
      .post("http://127.0.0.1:8089/public/api/category/all", {
        pageIndex: 0,
        pageSize: 1000,
      })
      .then(({ data }) => {
        setListCategory(data.content);
        axios
          .post("http://127.0.0.1:8089/public/api/product/all", {
            category: { id: null },
          })
          .then(({ data }) => {
            setListProduct(data);
          });
      });
  }, []);

  const handleChangeCategory = (event) => {
    setCategory({ id: Number.parseFloat(event.target.value) });
    axios
      .post("http://127.0.0.1:8089/public/api/product/all", {
        category: { id: Number.parseFloat(event.target.value) },
      })
      .then(({ data }) => {
        console.log(data);
        setListProduct(data);
      });
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>Product</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select
            onChange={handleChangeCategory}
            value={category?.id ? category.id : null}
          >
            <Option disabled selected value={null}>
              Category
            </Option>
            {listCategory.map((item) => {
              return (
                <Fragment key={item.id}>
                  <Option value={item.id}>{item?.name}</Option>
                </Fragment>
              );
            })}
          </Select>
          {/* <Select>
            <Option disabled selected>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select> */}
        </Filter>
        {/* <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select defaultValue={"new"}>
            <Option value={"new"} selected>
              Newest
            </Option>
            <Option value={"asc"}>Price (asc)</Option>
            <Option value={"des"}>Price (desc)</Option>
          </Select>
        </Filter> */}
      </FilterContainer>
      <Products products={listProduct} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
