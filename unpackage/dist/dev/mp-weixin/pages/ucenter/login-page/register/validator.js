"use strict";
var rules = {
  "username": {
    "rules": [
      {
        required: true,
        errorMessage: "\u8BF7\u8F93\u5165\u7528\u6237\u540D"
      },
      {
        minLength: 3,
        maxLength: 32,
        errorMessage: "\u7528\u6237\u540D\u957F\u5EA6\u5728 {minLength} \u5230 {maxLength} \u4E2A\u5B57\u7B26"
      },
      {
        validateFunction: function(rule, value, data, callback) {
          console.log(value);
          if (/^1\d{10}$/.test(value) || /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)) {
            callback("\u7528\u6237\u540D\u4E0D\u80FD\u662F\uFF1A\u624B\u673A\u53F7\u6216\u90AE\u7BB1");
          }
          return true;
        }
      }
    ],
    "label": "\u7528\u6237\u540D"
  },
  "password": {
    "rules": [
      {
        required: true,
        errorMessage: "\u8BF7\u8F93\u5165\u5BC6\u7801"
      },
      {
        minLength: 6,
        maxLength: 20,
        errorMessage: "\u5BC6\u7801\u957F\u5EA6\u5728 {minLength} \u5230 {maxLength} \u4E2A\u5B57\u7B26"
      }
    ],
    "label": "\u5BC6\u7801"
  },
  "pwd2": {
    "rules": [
      {
        required: true,
        errorMessage: "\u518D\u6B21\u8F93\u5165\u5BC6\u7801"
      },
      {
        minLength: 6,
        maxLength: 20,
        errorMessage: "\u5BC6\u7801\u957F\u5EA6\u5728 {minLength} \u5230 {maxLength} \u4E2A\u5B57\u7B26"
      },
      {
        validateFunction: function(rule, value, data, callback) {
          console.log(value);
          if (value != data.password) {
            callback("\u4E24\u6B21\u8F93\u5165\u5BC6\u7801\u4E0D\u4E00\u81F4");
          }
          return true;
        }
      }
    ],
    "label": "\u786E\u8BA4\u5BC6\u7801"
  }
};
exports.rules = rules;
