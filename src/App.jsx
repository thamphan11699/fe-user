import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import News from "./pages/News";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import { getUser } from "./redux/authSlice";
import { getCartByUser } from "./redux/cartSlice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      axios
        .get("http://127.0.0.1:8089/api/user/me")
        .then(({ data }) => {
          // console.log(data);
          dispatch(getUser(data));
          axios
            .get(`http://127.0.0.1:8089/public/api/cart/${data.id}`)
            .then((res) => {
              dispatch(getCartByUser(res.data));
            });
        })
        .catch((err) => {
          localStorage.removeItem("token");
          delete axios.defaults.headers.common["Authorization"];
        });
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product" element={<ProductList />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/news/:id" element={<News />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
