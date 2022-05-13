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

const Image = styled.img`
  height: 75%;
  width: 85%;
  z-index: 2;
`;

const NewsItem = ({ item }) => {
  return (
    <>
      <Fragment>
        <Container>
          <Image
            src={
              item?.thumbnail
                ? item.thumbnail
                : "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png"
            }
          />
          <div style={{ position: "absolute", bottom: 10 }}>
            <Link to={`/news/${item.id}`}>{item.title}</Link>
          </div>
        </Container>
      </Fragment>
    </>
  );
};

export default NewsItem;
