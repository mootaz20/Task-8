import { jsx as _jsx } from "react/jsx-runtime";
const Loader = ({ auth }) => {
    return (_jsx("div", { className: "flex justify-center items-center", children: _jsx("div", { className: `w-8 h-8  rounded-full animate-ping ${auth ? "bg-black" : "bg-customyellow"} ` }) }));
};
export default Loader;
