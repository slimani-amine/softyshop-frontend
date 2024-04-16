"use strict";
exports.__esModule = true;
var react_1 = require("react");
var antd_1 = require("antd");
var onChange = function (value) {
    console.log("selected " + value);
};
var onSearch = function (value) {
    console.log('search:', value);
};
// Filter `option.label` match the user type `input`
var filterOption = function (input, option) { var _a; return ((_a = option === null || option === void 0 ? void 0 : option.label) !== null && _a !== void 0 ? _a : '').toLowerCase().includes(input.toLowerCase()); };
var SearchSpecific = function () { return (react_1["default"].createElement(antd_1.Select, { showSearch: true, placeholder: "Select a person", optionFilterProp: "children", onChange: onChange, onSearch: onSearch, filterOption: filterOption, options: [
        {
            value: 'jack',
            label: 'Jack'
        },
        {
            value: 'lucy',
            label: 'Lucy'
        },
        {
            value: 'tom',
            label: 'Tom'
        },
    ] })); };
exports["default"] = SearchSpecific;
