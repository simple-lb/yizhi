"use strict";
var common_vendor = require("../../../../common/vendor.js");
function loginSuccess(result) {
  common_vendor.index.showToast({
    title: "\u767B\u5F55\u6210\u529F",
    icon: "none"
  });
  console.log("\u767B\u5F55\u6210\u529F", result);
  var delta = 0;
  let pages = getCurrentPages();
  pages.forEach((page, index) => {
    pages[pages.length - index - 1].route.split("/");
    if (pages[pages.length - index - 1].route.split("/")[2] == "login-page") {
      delta++;
    }
  });
  common_vendor.index.navigateBack({ delta });
}
exports.loginSuccess = loginSuccess;
