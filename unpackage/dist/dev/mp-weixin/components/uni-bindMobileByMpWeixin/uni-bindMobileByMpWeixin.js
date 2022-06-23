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
var common_vendor = require("../../common/vendor.js");
const db = common_vendor.Rt.database();
db.collection("uni-id-users");
const _sfc_main = {
  emits: ["next"],
  computed: __spreadValues({}, common_vendor.mapGetters({
    userInfo: "user/info",
    login: "user/hasLogin"
  })),
  data() {
    return {};
  },
  methods: __spreadProps(__spreadValues({}, common_vendor.mapMutations({
    setUserInfo: "user/login"
  })), {
    beforeGetphonenumber() {
      common_vendor.index.showLoading({
        mask: true
      });
      wx.checkSession({
        success() {
          console.log("session_key \u672A\u8FC7\u671F");
          common_vendor.index.hideLoading();
        },
        fail() {
          console.log("session_key \u5DF2\u7ECF\u5931\u6548\uFF0C\u6B63\u5728\u6267\u884C\u66F4\u65B0");
          wx.login({
            success({ code }) {
              common_vendor.Rt.callFunction({
                name: "uni-id-cf",
                data: {
                  "action": "refreshSessionKey",
                  "params": {
                    code
                  }
                },
                complete: (e) => {
                  console.log(e);
                  common_vendor.index.hideLoading();
                }
              });
            },
            fail: (err) => {
              console.error(err);
            }
          });
        }
      });
    },
    bindMobileByMpWeixin(e) {
      console.log(e.detail);
      if (e.errMsg == "getPhoneNumber:ok") {
        common_vendor.Rt.callFunction({
          name: "uni-id-cf",
          data: {
            "action": "bindMobileByMpWeixin",
            "params": e.detail
          },
          complete: (e2) => {
            console.log(e2);
          },
          success: (e2) => {
            common_vendor.index.showToast({
              title: e2.result.msg || "\u7ED1\u5B9A\u6210\u529F",
              icon: "none"
            });
            if (e2.result.code === 0) {
              this.setUserInfo({
                "mobile": e2.result.mobile
              });
            }
            this.closeMe();
          }
        });
      } else {
        this.closeMe();
      }
    },
    async open(uid) {
      this.$refs.popup.open();
      this.beforeGetphonenumber();
    },
    closeMe(e) {
      this.$refs.popup.close();
    }
  })
};
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.closeMe && $options.closeMe(...args)),
    b: common_vendor.o((...args) => $options.beforeGetphonenumber && $options.beforeGetphonenumber(...args)),
    c: common_vendor.o((...args) => $options.bindMobileByMpWeixin && $options.bindMobileByMpWeixin(...args)),
    d: common_vendor.sr("popup", "11b8d1f8-0"),
    e: common_vendor.p({
      type: "bottom"
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-11b8d1f8"], ["__file", "C:/Users/22753/Documents/HBuilderProjects/uni-starter/components/uni-bindMobileByMpWeixin/uni-bindMobileByMpWeixin.vue"]]);
wx.createComponent(Component);
