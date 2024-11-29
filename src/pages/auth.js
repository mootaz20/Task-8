import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
const Auth = () => {
    return (_jsx(_Fragment, { children: _jsx("div", { className: "bg-custom-gradient px-3 flex justify-center items-center w-full min-h-[100vh] py-16", children: _jsx(Outlet, {}) }) }));
};
export default Auth;
