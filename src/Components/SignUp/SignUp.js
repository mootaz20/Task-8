import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useState } from "react";
import Button from "../Button/Button";
import InputCom from "../InputCom/InputCom";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
const SignUp = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [confirm, setconfirm] = useState('');
    const [first, setfirst] = useState('');
    const [last, setlast] = useState('');
    const [image, setimage] = useState("");
    const [previewImage, setPreviewImage] = useState('');
    const [error, setError] = useState({});
    const [loading, setloading] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const handleClick = () => {
        fileInputRef.current.click();
    };
    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewImage(url);
        }
        setimage(file);
    };
    const handleEmail = (e) => {
        setemail(e.target.value);
    };
    const handlePassword = (e) => {
        setpassword(e.target.value);
    };
    const handleconfirm = (e) => {
        setconfirm(e.target.value);
    };
    const handlefirst = (e) => {
        setfirst(e.target.value);
    };
    const handlelast = (e) => {
        setlast(e.target.value);
    };
    const isValidate = () => {
        const errors = {};
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Enter Valid email address";
        }
        if (!password || password.length < 8) {
            errors.password =
                "Password is required and must be at least 8 characters long";
        }
        if (!confirm || confirm.length < 8) {
            errors.confirm =
                "confirm password is required and must be at least 8 characters long";
        }
        if (password !== confirm) {
            errors.confirm = "Password and confirm password must be same";
        }
        if (!first) {
            errors.first = "First name is required";
        }
        if (!last) {
            errors.last = "Last name is required";
        }
        if (!image) {
            errors.image = "Image is required";
        }
        setError(errors);
        return Object.keys(errors).length === 0;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValidate()) {
            setloading(true);
            const user_name = first + "_" + last;
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            formData.append("profile_image", image);
            formData.append("first_name", first);
            formData.append("last_name", last);
            formData.append("user_name", user_name);
            formData.append("password_confirmation", confirm);
            axios
                .post("https://test1.focal-x.com/api/register", formData)
                .then((res) => {
                console.log(res.data);
                localStorage.setItem("token", res.data.data.token);
                localStorage.setItem("First-Name", res.data.data.user.first_name);
                localStorage.setItem("Last-Name", res.data.data.user.last_name);
                localStorage.setItem("image", res.data.data.user.profile_image_url);
                setemail("");
                setpassword("");
                setconfirm("");
                setfirst("");
                setlast("");
                setimage("");
                setPreviewImage("");
                setloading(false);
                toast.success("Register Success");
                navigate("/dashboard");
            })
                .catch((err) => {
                setloading(false);
                console.log(err.response.data.msg);
                toast.error(err.response.data.msg);
            });
        }
    };
    return (_jsx(_Fragment, { children: loading ? (_jsx("div", { className: "flex justify-center items-center h-full", children: _jsx(Loader, { auth: true }) })) : (_jsxs("div", { className: "auth-shape", style: { padding: "42px 0 20px" }, children: [_jsx("img", { src: "/assets/image/Logo.png", className: "mx-auto", alt: "error" }), _jsx("h1", { className: "font-semibold text-primary", style: { fontSize: "22px", margin: "42px 0 8px" }, children: "Sign up" }), _jsx("p", { className: "text-secondary font-normal text-sm", children: "Fill in the following fields to create an account." }), _jsxs("form", { onSubmit: (e) => handleSubmit(e), style: { margin: "24px 0", padding: "0 21px 0 30px" }, className: "flex flex-col text-start", children: [_jsx("label", { style: { marginBottom: "8px" }, htmlFor: "", className: "text-secondary text-sm font-medium", children: "Name" }), _jsxs("div", { className: "mb-4 md:flex md:flex-wrap md:space-x-6", children: [_jsxs("div", { className: "md:flex-1 w-full md:mb-0 mb-2", children: [_jsx(InputCom, { error: error.first, callBackFunction: handlefirst, value: first, label: "", type: "text", placeholder: "First Name" }), error.first && (_jsxs("p", { className: "text-red-500  text-sm font-meduim", children: [error.first, " "] }))] }), _jsxs("div", { className: "flex-1", children: [_jsx(InputCom, { callBackFunction: handlelast, value: last, error: error.last, label: "", type: "text", placeholder: "Last Name" }), error.last && (_jsxs("p", { className: "text-red-500 text-sm font-meduim", children: [error.last, " "] }))] })] }), _jsxs("div", { className: "mb-4", children: [_jsx(InputCom, { callBackFunction: handleEmail, value: email, error: error.email, label: "Email", type: "email", placeholder: "Enter your email" }), error.email && (_jsxs("p", { className: "text-red-500 text-sm font-meduim", children: [error.email, " "] }))] }), _jsx("label", { style: { marginBottom: "8px" }, htmlFor: "", className: "text-secondary mb-2.5 text-sm font-medium", children: "Password" }), _jsxs("div", { className: "mb-4 md:flex md:flex-wrap md:space-x-6", children: [_jsxs("div", { className: "md:flex-1 w-full md:mb-0 mb-2", children: [_jsx(InputCom, { callBackFunction: handlePassword, value: password, error: error.password, label: "", type: "password", placeholder: "Password" }), error.password && (_jsxs("p", { className: "text-red-500 text-sm font-meduim", children: [error.password, " "] }))] }), _jsxs("div", { className: "flex-1", children: [_jsx(InputCom, { callBackFunction: handleconfirm, value: confirm, error: error.confirm, label: "", type: "password", placeholder: "Confirm Password" }), error.confirm && (_jsxs("p", { className: "text-red-500 text-sm font-meduim", children: [error.confirm, " "] }))] })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("label", { htmlFor: "", style: { marginBottom: "17px" }, className: "text-secondary text-sm font-medium", children: "Profile Image" }), _jsxs("button", { type: "button", className: "inline-flex bg-photoBackGround items-center justify-center w-[100px] h-[100px] rounded", style: {
                                        border: error.image
                                            ? "2px dashed red"
                                            : "2px dashed rgba(56, 78, 183, 0.3)",
                                        marginBottom: "15px",
                                    }, onClick: handleClick, children: [previewImage ? (_jsx("img", { src: previewImage, alt: "Selected Preview", className: "w-full h-full object-cover rounded-md" })) : (_jsx("img", { src: "/assets/image/Upload icon.png", alt: "Upload Icon" })), _jsx("input", { ref: fileInputRef, className: "sr-only", type: "file", name: "image", id: "image", onChange: (e) => handleFile(e) })] }), error.image && (_jsxs("p", { className: "text-red-500 text-sm font-meduim", children: [error.image, " "] }))] }), _jsx(Button, { type: "submit", text: "SIGN UP" })] }), _jsxs("h1", { className: "text-secondary text-sm", children: ["Don\u2019t have an account?", " ", _jsx(NavLink, { to: "/", className: "text-customyellow underline font-semibold ", children: "Sign in" })] })] })) }));
};
export default SignUp;
