import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../redux/Slice";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const file = useRef(null);
    const [image, setImage] = useState(null);
    const [name, setname] = useState("");
    const [price, setprice] = useState("");
    const [showImage, setshowImage] = useState("");
    const { loading } = useSelector((state) => state.products);
    const handleBackClick = () => {
        navigate("/dashboard");
    };
    const handleButtonImage = () => {
        file.current?.click();
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const imageUrl = URL.createObjectURL(file);
            setshowImage(imageUrl);
        }
    };
    const handleAddClick = () => {
        const data = new FormData();
        data.append('image', image);
        data.append('name', name);
        data.append('price', price);
        dispatch(addProduct(data)).then((result) => {
            if (result.meta.requestStatus === "fulfilled") {
                toast.success("Product Added Successfully");
                navigate("/dashboard");
            }
        });
    };
    return (_jsxs("div", { className: "add lg:px-16 px-6  pt-6 pb-12", children: [_jsx("div", { className: "", style: { marginBottom: "76px" }, children: _jsx("button", { onClick: handleBackClick, className: "w-[40px] h-[40px] rounded-full border border-1 border-black ", children: _jsx(GrFormPrevious, { className: "mx-auto" }) }) }), _jsxs("div", { children: [_jsx("h1", { className: "lg:text-6xl md:text-3xl font-semibold", style: { marginBottom: "76px" }, children: "ADD NEW ITEM" }), _jsx("div", { children: loading ? (_jsxs("div", { className: "flex justify-center items-center", children: [_jsx(Loader, { auth: false }), " "] })) : (_jsxs("div", { className: "flex flex-wrap gap-x-8", children: [_jsxs("div", { className: "flex flex-col lg:w-[41.3%] w-full ", children: [_jsxs("div", { className: "flex flex-col mb-16 ", children: [_jsx("label", { className: "font-medium lg:text-[32px] md:text-[25px] text-[18px] text-secondary", style: { marginBottom: "16px" }, children: "Name" }), _jsx("input", { type: "text", style: { color: "rgba(205, 205, 205, 1)" }, className: "py-3 px-4 text-xs font-normal rounded border border-1 border-editBorderColor", placeholder: "Enter the product name", onChange: (e) => setname(e.target.value) })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("label", { className: "font-medium lg:text-[32px] md:text-[25px] text-[18px] text-secondary", style: { marginBottom: "16px" }, children: "Price" }), _jsx("input", { type: "number", style: { color: "rgba(205, 205, 205, 1)" }, className: "py-3 px-4 text-xs font-normal rounded border border-1 border-editBorderColor", placeholder: "Enter the product price", onChange: (e) => setprice(e.target.value) })] })] }), _jsxs("div", { className: "flex flex-col lg:w-[55.3%] w-full", children: [_jsx("label", { className: "font-medium lg:mt-0 mt-5 lg:text-[32px] md:text-[25px] text-[18px] text-secondary", style: { marginBottom: "14px" }, children: "Image" }), _jsxs("button", { type: "button", className: "inline-flex h-[209px] bg-photoBackGround items-center justify-center  rounded-md ", style: {
                                                border: "2px dashed rgba(56, 78, 183, 0.3)",
                                            }, onClick: handleButtonImage, children: [showImage ? (_jsx("img", { src: showImage, alt: "error", width: "208px", className: "mx-auto h-full object-cover" })) : (_jsx("img", { src: "/assets/image/Upload icon1.png", alt: "error", width: "120px", className: "mx-auto" })), _jsx("input", { type: "file", onChange: handleImageChange, className: "sr-only", ref: file })] })] })] })) }), _jsx("div", { className: "flex justify-center", style: { marginTop: "120px" }, children: _jsx("button", { onClick: handleAddClick, className: "rounded font-medium text-white bg-customyellow w-[199px] h-[61px] ", style: { fontSize: "32px" }, children: "Save" }) })] })] }));
};
export default AddProduct;
