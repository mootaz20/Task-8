import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useDispatch } from "react-redux";
import "./Product.css";
import { deleteProduct, deleteProductReducer } from "../../../redux/Slice";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteModal/DeleteModal";
import { useState } from "react";
const Product = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showModal, setshowModal] = useState(false);
    const handleDelete = (event) => {
        event.stopPropagation();
        console.log(product.id);
        setshowModal(true);
    };
    const onConfirm = () => {
        setshowModal(false);
        dispatch(deleteProductReducer(product.id));
        dispatch(deleteProduct(product.id));
    };
    const onClose = () => {
        setshowModal(false);
    };
    const handleCardClick = () => {
        navigate(`product/${product.id}`);
    };
    const handleEditClick = (event) => {
        event.stopPropagation();
        navigate(`product/edit/${product.id}`);
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { onClick: handleCardClick, className: "w-[208px] h-[208px] rounded-2xl overflow-hidden relative card hover:cursor-pointer", style: { boxShadow: "8px 8px 4px 0px rgba(0, 0, 0, 0.25)" }, children: [product.image_url ? (_jsx("img", { src: product.image_url, alt: "error", className: "w-full h-full object-cover rounded-2xl" })) : (_jsx("img", { src: "/assets/image/image 2.png", alt: "error", className: "w-full h-full object-cover rounded-2xl" })), _jsxs("div", { className: "flex flex-col justify-center items-center text-center bg-hoverCardBackGround px-3 cardHover w-[208px] h-[208px] ", children: [_jsx("h2", { className: "text-3xl font-medium mb-8 overflow-hidden whitespace-nowrap text-ellipsis w-full", children: product.name }), _jsxs("div", { className: "flex gap-2 justify-center", children: [_jsx("button", { onClick: handleEditClick, className: "w-[81px] h-[34px] rounded text-white text-sm font-medium bg-customyellow", children: "Edit" }), _jsx("button", { onClick: handleDelete, className: "w-[81px] h-[34px] rounded text-white text-sm font-medium bg-[rgba(254,0,0,1)]", children: "Delete" })] })] })] }), showModal && _jsx(DeleteModal, { onClose: onClose, onConfirm: onConfirm })] }));
};
export default Product;
