import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { MenuItem as MenuItemM, Menu as MenuM, Fade } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import Avatar from "@material-ui/core/Avatar";
import { logout, openUserDialog } from "../redux/authSlice";
import FormDialog from "./FormDialog";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleOpenUserDialog = () => {
    dispatch(openUserDialog());
  };
  return (
    <Container>
      <FormDialog />
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/">
            <Logo>TQANH.</Logo>
          </Link>
        </Center>
        <Right>
          {user == null && (
            <MenuItem>
              <Link to="/register">REGISTER</Link>
            </MenuItem>
          )}
          {user == null && (
            <MenuItem>
              <Link to="/login">SIGN IN</Link>
            </MenuItem>
          )}
          {user != null && (
            <MenuItem>
              <Link to="/cart">
                <Badge badgeContent={cart.countProduct} color="primary">
                  <ShoppingCartOutlined />
                </Badge>
              </Link>
            </MenuItem>
          )}
          {user && (
            <MenuItem>
              <Avatar
                alt="Remy Sharp"
                src="https://sohanews.sohacdn.com/2019/9/3/photo-1-15674713690051885929813.jpg"
                onClick={handleClick}
              />
              <MenuM
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItemM onClick={handleOpenUserDialog}>
                  Thông tin người dùng
                </MenuItemM>
                <MenuItemM onClick={handleLogout}>Logout</MenuItemM>
              </MenuM>
            </MenuItem>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
