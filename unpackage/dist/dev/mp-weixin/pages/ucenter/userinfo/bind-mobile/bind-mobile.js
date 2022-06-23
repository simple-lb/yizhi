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
    return {
      currenPhoneArea: "",
      formData: {
        phone: "",
        code: "",
        captcha: false
      }
    };
  },
  computed: {
    tipText() {
      return `\u9A8C\u8BC1\u7801\u5DF2\u901A\u8FC7\u77ED\u4FE1\u53D1\u9001\u81F3${this.currenPhoneArea} ${this.formData.mobile}\u3002\u5BC6\u7801\u4E3A6 - 20\u4F4D`;
    },
    canSubmit() {
      return this.isPhone() && this.isCode();
    }
  },
  onLoad(event) {
  },
  onReady() {
  },
  methods: __spreadProps(__spreadValues({}, common_vendor.mapMutations({
    setUserInfo: "user/login"
  })), {
    submit() {
      console.log(this.formData);
      common_vendor.Rt.callFunction({
        name: "uni-id-cf",
        data: {
          action: "bindMobileBySms",
          params: this.formData
        },
        success: ({
          result
        }) => {
          console.log(result);
          common_vendor.index.showToast({
            title: result.msg || result.errMsg,
            icon: "none"
          });
          if (result.errCode == "CAPTCHA_REQUIRED") {
            return this.$refs["popup-captcha"].open();
          }
          if (result.code === 0) {
            this.setUserInfo({ "mobile": result.mobile });
            common_vendor.index.navigateBack();
          }
        },
        complete: () => {
          this.formData.captcha = false;
        }
      });
    },
    isPhone() {
      let reg_phone = /^1\d{10}$/;
      let isPhone = reg_phone.test(this.formData.mobile);
      return isPhone;
    },
    isCode() {
      let reg_code = /^\d{6}$/;
      let isCode = reg_code.test(this.formData.code);
      return isCode;
    }
  })
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_send_sms_code2 = common_vendor.resolveComponent("uni-send-sms-code");
  const _easycom_uni_popup_captcha2 = common_vendor.resolveComponent("uni-popup-captcha");
  (_easycom_uni_easyinput2 + _easycom_uni_send_sms_code2 + _easycom_uni_popup_captcha2)();
}
const _easycom_uni_easyinput = () => "../../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_send_sms_code = () => "../../../../components/uni-send-sms-code/uni-send-sms-code.js";
const _easycom_uni_popup_captcha = () => "../../../../uni_modules/uni-captcha/components/uni-popup-captcha/uni-popup-captcha.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_send_sms_code + _easycom_uni_popup_captcha)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.formData.mobile = $event),
    b: common_vendor.p({
      clearable: true,
      focus: true,
      type: "number",
      inputBorder: false,
      maxlength: "11",
      placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7",
      modelValue: $data.formData.mobile
    }),
    c: common_vendor.sr("shortCode", "5fc56b0c-2,5fc56b0c-1"),
    d: common_vendor.p({
      ["code-type"]: "bind",
      phone: $data.formData.mobile
    }),
    e: common_vendor.o(($event) => $data.formData.code = $event),
    f: common_vendor.p({
      clearable: true,
      type: "number",
      inputBorder: false,
      maxlength: "6",
      placeholder: _ctx.$t("common.verifyCodePlaceholder"),
      modelValue: $data.formData.code
    }),
    g: !$options.canSubmit,
    h: $options.canSubmit ? "primary" : "default",
    i: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    j: common_vendor.sr("popup-captcha", "5fc56b0c-3"),
    k: common_vendor.o($options.submit),
    l: common_vendor.o(($event) => $data.formData.captcha = $event),
    m: common_vendor.p({
      scene: "bindMobileBySms",
      modelValue: $data.formData.captcha
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/22753/Documents/HBuilderProjects/uni-starter/pages/ucenter/userinfo/bind-mobile/bind-mobile.vue"]]);
wx.createPage(MiniProgramPage);
