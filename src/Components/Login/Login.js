import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import InputCom from "../InputCom/InputCom";
import { useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setemailError] = useState("");
    const [passwordError, setpasswordError] = useState("");
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };
    const isValidate = () => {
        let isValid = true;
        if (!email) {
            setemailError("Email is required");
            isValid = false;
        }
        else if (!/\S+@\S+\.\S+/.test(email)) {
            setemailError("Invalid email address");
            isValid = false;
        }
        ;
        if (!password) {
            setpasswordError("Password is required");
            isValid = false;
        }
        else if (password.length < 8) {
            setpasswordError("Password must be at least 8 characters long");
            isValid = false;
        }
        return isValid;
    };
    const handleLogin = (e) => {
        e.preventDefault();
        if (isValidate()) {
            setloading(true);
            console.log(email, password);
            const data = {
                email: email,
                password: password,
            };
            axios
                .post("https://test1.focal-x.com/api/login", data)
                .then((res) => {
                console.log("login success");
                console.log(res.data);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("First-Name", res.data.user.first_name);
                localStorage.setItem("Last-Name", res.data.user.last_name);
                localStorage.setItem("image", res.data.user.profile_image_url);
                setEmail("");
                setPassword("");
                setloading(false);
                toast.success('Login Success');
                navigate("/dashboard");
            })
                .catch((err) => {
                console.log(err.response.data.msg);
                setloading(false);
                toast.error(err.response.data.msg);
            });
        }
    };
    return (_jsx(_Fragment, { children: loading ? (_jsx("div", { className: "flex justify-center items-center h-full", children: _jsx(Loader, { auth: true }) })) : (_jsxs("div", { className: "auth-shape", style: { padding: "42px 0 41px" }, children: [_jsx("img", { src: "/assets/image/Logo.png", className: "mx-auto", alt: "error" }), _jsx("h1", { className: "font-semibold text-primary", style: { fontSize: "22px", margin: "43px 0 9px" }, children: "Sign In" }), _jsx("p", { className: "text-secondary font-normal text-sm", children: "Enter your credentials to access your account" }), _jsxs("form", { onSubmit: (e) => handleLogin(e), style: { margin: "50px 0 27px", padding: "0 30px" }, className: "flex flex-col text-start", children: [_jsxs("div", { className: "mb-5 flex flex-col", children: [_jsx(InputCom, { error: emailError, value: email, label: "Email", type: "email", placeholder: "Enter your email", callBackFunction: handleEmail }), emailError && (_jsxs("p", { className: "text-red-500 text-sm font-meduim", children: [emailError, " "] }))] }), _jsxs("div", { className: "flex flex-col", style: { marginBottom: "30px" }, children: [_jsx(InputCom, { error: passwordError, value: password, label: "Password", type: "password", placeholder: "Enter your password", callBackFunction: handlePassword }), passwordError && (_jsxs("p", { className: "text-red-500 text-sm font-meduim", children: [passwordError, " "] }))] }), _jsx(Button, { text: "SIGN IN", type: "submit" })] }), _jsxs("h1", { className: "text-secondary text-sm", children: ["Don\u2019t have an account?", " ", _jsx(NavLink, { to: "register", className: "text-customyellow font-semibold underline", children: "Create one" })] })] })) }));
};
export default Login;
