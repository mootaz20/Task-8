import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import ProductsSVG from "../Components/ProductsSVG/ProductsSVG";
import { IoBookmarkOutline } from "react-icons/io5";
import LogoutSVG from "../Components/LogoutSVG/LogoutSVG";
import axios from "axios";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
const Home = () => {
    const userPhoto = localStorage.getItem('image');
    const first = localStorage.getItem("First-Name");
    const last = localStorage.getItem("Last-Name");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const handleClick = () => {
        axios
            .post("https://test1.focal-x.com/api/logout", [], {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
            toast.success(res.data.msg);
            localStorage.removeItem("image");
            localStorage.removeItem("First-Name");
            localStorage.removeItem("Last-Name");
            localStorage.removeItem("token");
            navigate('/');
        })
            .catch((err) => {
            toast.error(err.response.data.message);
        });
    };
    return (_jsxs("div", { className: "flex min-h-screen", children: [_jsx("div", { className: `fixed min-h-full md:static ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transform md:translate-x-0 transition-transform duration-300 lg:min-w-[20.02%] md:min-w-[200px] bg-sidebarColor px-3 z-10`, children: _jsxs("div", { className: "flex flex-col items-center justify-between h-full py-8", children: [_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("img", { src: "/assets/image/Logo (1).png", alt: "Logo", width: "97px", className: "mb-6  md:block" }), _jsx("img", { src: userPhoto, alt: "User Profile", width: "141px", className: "rounded-full mb-2  md:block" }), _jsxs("h1", { className: "font-bold text-lg mb-8  md:block", children: [first, " ", last] }), _jsxs(NavLink, { to: "/dashboard", className: "flex items-center text-sm gap-2 mb-3 rounded w-full justify-center py-2 lg:w-[193px] md:w-[140px]", children: [_jsx(ProductsSVG, {}), "Products"] }), _jsxs(NavLink, { to: "/favorites", className: "flex items-center text-sm gap-2 mb-3 rounded w-full justify-center py-2 lg:w-[193px] md:w-[140px]", children: [_jsx(IoBookmarkOutline, {}), "Favorites"] }), _jsxs(NavLink, { to: "/order", className: "flex items-center text-sm gap-2 mb-3 rounded w-full justify-center py-2 lg:w-[193px] md:w-[140px]", children: [_jsx(IoBookmarkOutline, {}), "Order List"] })] }), _jsxs("button", { onClick: handleClick, className: "flex items-center justify-center gap-2 text-sm font-medium py-2 lg:w-[193px] md:w-[140px]", children: ["Logout", _jsx(LogoutSVG, {})] })] }) }), _jsxs("div", { className: "w-full pt-6 bg-anotherSidebarColor", children: [_jsx("button", { className: "md:hidden p-4 text-gray-700 bg-gray-200 rounded-full absolute right-3 top-4 z-20", onClick: handleToggleSidebar, children: isSidebarOpen ? _jsx(IoMdClose, {}) : _jsx(RxHamburgerMenu, {}) }), _jsx(Outlet, {})] })] }));
};
export default Home;
