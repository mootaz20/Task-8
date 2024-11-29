import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './AppRouter';
import { Toaster } from 'react-hot-toast';
function App() {
    return (_jsxs(_Fragment, { children: [_jsx(Toaster, {}), _jsx(BrowserRouter, { children: _jsx("div", { children: _jsx(AppRouter, {}) }) })] }));
}
export default App;
