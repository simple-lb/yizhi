"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var common_appInit = require("./common/appInit.js");
require("./common/openApp.js");
var store_index = require("./store/index.js");
var lang_i18n = require("./lang/i18n.js");
require("./uni-starter.config.js");
require("./store/modules/user.js");
require("./lang/en.js");
require("./lang/zh-Hans.js");
if (!Math) {
  "./pages/list/list.js";
  "./pages/grid/grid.js";
  "./pages/ucenter/login-page/index/index.js";
  "./pages/list/search/search.js";
  "./pages/list/detail.js";
  "./pages/ucenter/userinfo/bind-mobile/bind-mobile.js";
  "./pages/ucenter/ucenter.js";
  "./pages/ucenter/about/about.js";
  "./uni_modules/uni-upgrade-center-app/pages/upgrade-popup.js";
  "./pages/uni-agree/uni-agree.js";
  "./pages/ucenter/settings/settings.js";
  "./pages/ucenter/userinfo/userinfo.js";
  "./pages/ucenter/userinfo/cropImage.js";
  "./pages/ucenter/login-page/pwd-login/pwd-login.js";
  "./pages/ucenter/login-page/pwd-retrieve/pwd-retrieve.js";
  "./pages/ucenter/login-page/phone-code/phone-code.js";
  "./pages/common/webview/webview.js";
  "./pages/ucenter/login-page/register/register.js";
  "./pages/ucenter/read-news-log/read-news-log.js";
  "./pages/ucenter/invite/invite.js";
  "./pages/ucenter/settings/deactivate/deactivate.js";
  "./uni_modules/uni-feedback/pages/opendb-feedback/opendb-feedback.js";
}
const _sfc_main = {
  globalData: {
    searchText: "",
    appVersion: {},
    config: {},
    $i18n: {},
    $t: {}
  },
  onLaunch: function() {
    console.log("App Launch");
    this.globalData.$i18n = this.$i18n;
    this.globalData.$t = (str) => this.$t(str);
    common_appInit.initApp();
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/22753/Documents/HBuilderProjects/uni-starter/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(lang_i18n.i18n);
  app.use(store_index.store);
  return { app };
}
createApp().app.mount("#app");
exports.createApp = createApp;
