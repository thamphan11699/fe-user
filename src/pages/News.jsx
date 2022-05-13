import { Grid } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsItem from "../components/NewsItem";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  max
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const Title = styled.h1`
  font-weight: 300;
`;

const News = () => {
  let { id } = useParams();
  const [news, setNews] = useState({});

  const [relatedNews, setRelatedNews] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8089/public/api/news/${id}`)
      .then(({ data }) => {
        setNews(data);
      });
    axios
      .post("http://127.0.0.1:8089/public/api/news/get-all", {
        pageSize: 10000,
        pageIndex: 1,
      })
      .then(({ data }) => {
        setRelatedNews(data.filter((item, index) => item.id.toString() !== id));
      });
  }, [id]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Title style={{ paddingTop: 40 }}>{news.title}</Title>
      </div>
      <Wrapper>
        <div
          id="content"
          style={{ maxWidth: 1200, margin: "0 auto" }}
          dangerouslySetInnerHTML={{ __html: news.content }}
        ></div>
      </Wrapper>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Title style={{ paddingTop: 40 }}>TIN TỨC LIÊN QUAN</Title>
      </div>
      <Wrapper>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Grid container spacing={3}>
            {relatedNews.map((item, index) => (
              <Grid item md={4} sm={3} xs={12} key={index}>
                <NewsItem item={item} />
              </Grid>
            ))}
          </Grid>
        </div>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default News;
