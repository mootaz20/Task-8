import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const InputCom = ({ label, type, placeholder, callBackFunction, value, error }) => {
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "flex flex-col", children: [label && (_jsx("label", { htmlFor: label, className: "text-secondary text-sm mb-2.5 font-medium", children: label })), _jsx("input", { className: `border rounded text-xs font-normal ${error ? "border-red-500" : "border-customGray"} `, value: value, type: type, name: label, id: label, placeholder: placeholder, style: { padding: "15px 15px 14px", color: "rgba(205, 205, 205, 1)" }, onChange: (e) => callBackFunction(e) })] }) }));
};
export default InputCom;
