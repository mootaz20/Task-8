import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { GrFormPrevious } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../redux/Slice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
const EditCom = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const file = useRef();
    const { products, loading } = useSelector((state) => state.products);
    const navigate = useNavigate();
    const [name, setname] = useState('');
    const [price, setprice] = useState('');
    const [previewImage, setPreviewImage] = useState("");
    const [image, setimage] = useState("");
    const [loadingAfterSave, setloadingAfterSave] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getProduct(id));
        };
        fetchData();
    }, [dispatch, id]);
    useEffect(() => {
        if (products) {
            setname(products.name || null);
            setprice(products.price || null);
            setPreviewImage(products.image_url || '/assets/image/image 2.png');
        }
    }, [products]);
    const handleBackClick = () => {
        navigate("/dashboard");
    };
    const handleButtonImage = () => {
        file.current.click();
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
        }
        setimage(file);
    };
    const handleEditClick = () => {
        setloadingAfterSave(true);
        const data = new FormData();
        data.append('name', name);
        data.append('price', price);
        data.append("_method", "PUT");
        if (image) {
            data.append("image", image);
        }
        dispatch(updateProduct({ data, id })).then((result) => {
            if (result.meta.requestStatus === "fulfilled") {
                toast.success("Product updated successfully");
                setloadingAfterSave(false);
                navigate("/dashboard");
            }
        });
    };
    return (_jsxs("div", { className: "show lg:px-16 px-6 pt-6 pb-12", children: [_jsx("div", { className: "", style: { marginBottom: "76px" }, children: _jsx("button", { onClick: handleBackClick, className: "w-[40px] h-[40px] rounded-full border border-1 border-black ", children: _jsx(GrFormPrevious, { className: "mx-auto" }) }) }), _jsxs("div", { children: [_jsx("h1", { className: "lg:text-6xl md:text-3xl font-semibold", style: { marginBottom: "76px" }, children: "EDIT ITEM" }), loading ? (_jsx("div", { className: "flex justify-center items-center h-full", children: _jsx(Loader, { auth: false }) })) : loadingAfterSave ? (_jsx("div", { className: "flex justify-center items-center h-full", children: _jsx(Loader, { auth: false }) })) : (_jsx("div", { children: _jsxs("div", { className: "flex flex-wrap gap-x-8", children: [_jsxs("div", { className: "flex flex-col lg:w-[41.3%] w-full ", children: [_jsxs("div", { className: "flex flex-col mb-16 ", children: [_jsx("label", { className: "font-medium lg:text-[32px] md:text-[25px] text-[18px] text-secondary", style: { marginBottom: "16px" }, children: "Name" }), _jsx("input", { type: "text", className: "py-3 px-4 font-medium rounded border border-1 border-editBorderColor", value: name, onChange: (e) => setname(e.target.value) })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("label", { className: "font-medium lg:text-[32px] md:text-[25px] text-[18px] text-secondary", style: { marginBottom: "16px" }, children: "Price" }), _jsx("input", { type: "number", className: "py-3 px-4 font-medium rounded border border-1 border-editBorderColor", value: price, onChange: (e) => setprice(e.target.value) })] })] }), _jsxs("div", { className: "flex flex-col lg:w-[55.3%] w-full", children: [_jsx("label", { className: "font-medium lg:text-[32px] md:text-[25px] text-[18px] lg:mt-0 mt-5 text-secondary", style: { marginBottom: "14px" }, children: "Image" }), _jsxs("button", { type: "button", className: "inline-flex h-[209px] bg-photoBackGround items-center justify-center rounded-md ", style: {
                                                border: "2px dashed rgba(56, 78, 183, 0.3)",
                                            }, onClick: handleButtonImage, children: [_jsx("img", { src: previewImage, alt: "error", width: "208px", className: "mx-auto h-full object-cover" }), _jsx("input", { type: "file", onChange: handleImageChange, className: "sr-only", ref: file })] })] })] }) })), _jsx("div", { className: "flex justify-center", style: { marginTop: "120px" }, children: _jsx("button", { onClick: handleEditClick, className: "rounded font-medium text-white w-[199px] h-[61px] ", style: { backgroundColor: "#FEAF00", fontSize: "32px" }, children: "Save" }) })] })] }));
};
export default EditCom;
