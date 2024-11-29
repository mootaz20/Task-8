import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../../redux/Slice";
import { GrFormPrevious } from "react-icons/gr";
import Loader from "../Loader/Loader";
const ShowProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { products, error, loading } = useSelector(state => state.products);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getProduct(id));
    }, [id]);
    const handleBackClick = () => {
        navigate("/dashboard");
    };
    return (_jsxs("div", { className: "show lg:px-16 px-6 pt-6 pb-12", children: [_jsx("div", { className: "", style: { marginBottom: "76px" }, children: _jsx("button", { onClick: handleBackClick, className: "w-[40px] h-[40px] rounded-full border border-1 border-black ", children: _jsx(GrFormPrevious, { className: "mx-auto" }) }) }), _jsx("div", { children: loading ? (_jsx("div", { className: "flex justify-center items-center h-full", children: _jsx(Loader, {}) })) : error ? (_jsx("h1", { className: "w-full h-full flex justify-center items-center text-3xl font-semibold", children: error })) : (_jsxs("div", { children: [_jsx("h1", { className: "lg:text-6xl md:text-3xl font-semibold mb-10", children: products.name }), products.image_url ? (_jsx("img", { src: products.image_url, alt: "error", width: "373px", className: "mx-auto max-h-[373px] rounded-2xl mb-10" })) : (_jsx("img", { src: "/assets/image/image 2.png", alt: "error", width: "373px", className: "mx-auto rounded-2xl mb-10" })), _jsxs("div", { className: "flex justify-between flex-wrap", children: [_jsxs("h1", { className: "lg:text-6xl md:text-3xl mb-[45px] font-semibold flex items-center gap-6", children: ["price :", _jsxs("span", { className: "font-medium text-productSpanColor lg:text-[40px] md:text-[25px] self-end", children: [products.price, "$"] })] }), _jsxs("h1", { className: "lg:text-6xl md:text-3xl mb-[45px] font-semibold flex items-center gap-6", children: ["Added At:", _jsx("span", { className: "font-medium text-productSpanColor lg:text-[40px] md:text-[25px] self-end", children: new Date(products.created_at).toLocaleDateString() })] })] }), _jsxs("h1", { className: "lg:text-6xl md:text-3xl font-semibold mb-10 flex items-center gap-6 justify-center", children: ["updated at :", _jsxs("span", { className: "font-medium text-productSpanColor lg:text-[40px] md:text-[25px] self-end", children: [new Date(products.updated_at).toLocaleDateString(), " "] }), " "] })] })) })] }));
};
export default ShowProduct;
