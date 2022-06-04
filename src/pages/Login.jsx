import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { mobile } from "../responsive";
import { getUser, login } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { getCartByUser } from "../redux/cartSlice";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Login = () => {
  const [user, setUser] = useState({ usernameOrEmail: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    axios
      .post("http://127.0.0.1:8089/api/auth/sign-in", user)
      .then(({ data }) => {
        localStorage.setItem("token", data.accessToken);
        dispatch(login(data));
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;
        axios.get("http://127.0.0.1:8089/api/user/me").then(({ data }) => {
          dispatch(getUser(data));
          axios
            .get(`http://127.0.0.1:8089/public/api/cart/${data.id}`)
            .then((res) => {
              dispatch(getCartByUser(res.data));
            });
        });
        navigate("/");
      })
      .catch((err) => {
        alert("Đăng nhập không thành công, vui lòng thử lại");
      });
  };
  return (
    <Container>
      <Wrapper>
        <Title>Đăng Nhập</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Tên đăng nhập hoặc Email"
            name="usernameOrEmail"
            value={user.usernameOrEmail}
            type="text"
            required
            onChange={(e) =>
              setUser({ ...user, [e.target.name]: e.target.value })
            }
          />
          <Input
            placeholder="Mật khẩu"
            value={user.password}
            name="password"
            type="password"
            required
            onChange={(e) =>
              setUser({ ...user, [e.target.name]: e.target.value })
            }
          />
          <Button type="submit">Đăng Nhập</Button>
          <Link to="/register">Tạo tài khoản mới</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
