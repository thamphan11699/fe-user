import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    userInfo: {
      fullName: "",
      address: "",
      phoneNumber: "",
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    if (user.password === user.confirmPassword) {
      axios.post("http://127.0.0.1:8089/public/api/signup", user).then(({ data }) => {
        if (data.success) {
          alert(data.message);
          navigate("/login");
        } else {
          alert(data.message);
        }
      });
    } else {
      alert("Mật khẩu không trùng khớp!");
      return;
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>ĐĂNG KÝ</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            required
            placeholder="Họ và tên"
            type="text"
            name="fullName"
            value={user.userInfo.fullName}
            onChange={(event) =>
              setUser({
                ...user,
                userInfo: {
                  ...user.userInfo,
                  [event.target.name]: event.target.value,
                },
              })
            }
          />
          <Input
            required
            placeholder="Tên đăng nhập"
            type="text"
            name="username"
            value={user.username}
            onChange={(event) =>
              setUser({ ...user, [event.target.name]: event.target.value })
            }
          />
          <Input
            required
            placeholder="Email"
            type="email"
            name="email"
            value={user.email}
            onChange={(event) =>
              setUser({ ...user, [event.target.name]: event.target.value })
            }
          />
          <Input
            required
            placeholder="Mật khẩu"
            type="password"
            name="password"
            value={user.password}
            onChange={(event) =>
              setUser({ ...user, [event.target.name]: event.target.value })
            }
          />
          <Input
            required
            placeholder="Nhập lại mật khẩu"
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={(event) =>
              setUser({ ...user, [event.target.name]: event.target.value })
            }
          />
          <Input
            required
            placeholder="Số điện thoại"
            type="number"
            name="phoneNumber"
            value={user.userInfo.phoneNumber}
            onChange={(event) =>
              setUser({
                ...user,
                userInfo: {
                  ...user.userInfo,
                  [event.target.name]: event.target.value,
                },
              })
            }
          />
          <Input
            required
            placeholder="Địa chỉ"
            type="text"
            name="address"
            value={user.userInfo.address}
            onChange={(event) =>
              setUser({
                ...user,
                userInfo: {
                  ...user.userInfo,
                  [event.target.name]: event.target.value,
                },
              })
            }
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit">ĐĂNG KÝ</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
