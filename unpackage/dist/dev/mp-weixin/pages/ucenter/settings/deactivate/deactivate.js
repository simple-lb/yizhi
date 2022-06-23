"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  onLoad() {
    common_vendor.index.setNavigationBarTitle({
      title: this.$t("deactivate.navigationBarTitle")
    });
  },
  methods: __spreadProps(__spreadValues({}, common_vendor.mapActions({
    logout: "user/logout"
  })), {
    cancel() {
      common_vendor.index.navigateBack();
    },
    nextStep() {
      common_vendor.index.showModal({
        content: "\u5DF2\u7ECF\u4ED4\u7EC6\u9605\u8BFB\u6CE8\u9500\u63D0\u793A\uFF0C\u77E5\u6653\u53EF\u80FD\u5E26\u6765\u7684\u540E\u679C\uFF0C\u5E76\u786E\u8BA4\u8981\u6CE8\u9500",
        complete: (e) => {
          if (e.confirm) {
            common_vendor.Rt.callFunction({
              name: "uni-id-cf",
              data: {
                "action": "closeAccount"
              },
              complete: (e2) => {
                console.log(e2);
                if (e2.result.code === 0) {
                  common_vendor.index.showToast({
                    title: "\u6CE8\u9500\u6210\u529F"
                  });
                  this.logout();
                  common_vendor.index.navigateTo({
                    url: "/pages/ucenter/login-page/index/index"
                  });
                } else {
                  common_vendor.index.showToast({
                    icon: "error",
                    title: e2.result.errMsg
                  });
                }
              }
            });
          } else {
            common_vendor.index.navigateBack();
          }
        }
      });
    }
  })
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t(_ctx.$t("deactivate.nextStep")),
    b: common_vendor.o((...args) => $options.nextStep && $options.nextStep(...args)),
    c: common_vendor.t(_ctx.$t("deactivate.cancelText")),
    d: common_vendor.o((...args) => $options.cancel && $options.cancel(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/22753/Documents/HBuilderProjects/uni-starter/pages/ucenter/settings/deactivate/deactivate.vue"]]);
wx.createPage(MiniProgramPage);
