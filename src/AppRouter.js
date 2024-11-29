import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import Auth from "./pages/auth";
import Home from "./pages/Home";
import Products from "./Components/Products/Products";
import ShowProduct from "./Components/ShowProduct/ShowProduct";
import EditCom from "./Components/EditCom/EditCom";
import AddProduct from "./Components/AddProduct/AddProduct";
import NotFound from "./Components/NotFound/NotFound";
const AppRouter = () => {
    return (_jsxs(Routes, { children: [_jsxs(Route, { path: "/", element: _jsx(Auth, {}), children: [_jsx(Route, { index: true, element: _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(SignUp, {}) })] }), _jsxs(Route, { path: "/dashboard", element: _jsx(Home, {}), children: [_jsx(Route, { index: true, element: _jsx(Products, {}) }), _jsx(Route, { path: "add", element: _jsx(AddProduct, {}) }), _jsx(Route, { path: "product/:id", element: _jsx(ShowProduct, {}) }), _jsx(Route, { path: "product/edit/:id", element: _jsx(EditCom, {}) })] }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }));
};
export default AppRouter;
