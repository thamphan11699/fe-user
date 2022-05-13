import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const News = () => {
  const [listNews, setListNews] = useState([]);

  useEffect(() => {
    axios
      .post("http://127.0.0.1:8089/public/api/news/get-all", {
        pageSize: 10000,
        pageIndex: 1,
      })
      .then(({ data }) => {
        setListNews(data);
      });
  }, []);

  return (
    <>
      <Container>
        {listNews.map((item, index) => (
          <NewsItem key={index} item={item} />
        ))}
      </Container>
    </>
  );
};

export default News;
