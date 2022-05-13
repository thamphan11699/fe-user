import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Categories = () => {
  const [listCategory, setListCategory] = useState([]);

  useEffect(() => {
    axios
      .post("http://127.0.0.1:8089/public/api/category/get-all", {
        pageIndex: 0,
        pageSize: 1000,
      })
      .then(({ data }) => {
        setListCategory(data);
      });
  }, []);

  return (
    <Container>
      {listCategory.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
