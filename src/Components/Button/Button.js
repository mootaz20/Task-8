import { jsx as _jsx } from "react/jsx-runtime";
const Button = ({ text, type }) => {
    return _jsx("button", { type: type, className: "buttonColor", children: text });
};
export default Button;
