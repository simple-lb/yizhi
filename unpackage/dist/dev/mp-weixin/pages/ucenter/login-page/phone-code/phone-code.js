"use strict";
var common_vendor = require("../../../../common/vendor.js");
var pages_ucenter_loginPage_common_loginPage_mixin = require("../common/login-page.mixin.js");
require("../common/loginSuccess.js");
const _sfc_main = {
  mixins: [pages_ucenter_loginPage_common_loginPage_mixin.mixin],
  data() {
    return {
      code: "",
      phone: "",
      captcha: false
    };
  },
  computed: {
    tipText() {
      return this.$t("common.verifyCodeSend") + `${this.phone}\u3002`;
    },
    canSubmit() {
      return this.code.length == 6;
    }
  },
  onLoad({ phoneNumber, phoneArea }) {
    this.phone = phoneNumber;
  },
  onReady() {
    if (this.phone.length == 11) {
      this.$refs.sendSmsCode.start();
    }
  },
  methods: {
    submit() {
      common_vendor.Rt.callFunction({
        name: "uni-id-cf",
        data: {
          action: "loginBySms",
          params: {
            "mobile": this.phone,
            "code": this.code,
            "captcha": this.captcha
          }
        },
        success: ({ result }) => {
          common_vendor.index.showToast({
            title: result.msg || result.errMsg,
            icon: "none"
          });
          if (result.errCode == "CAPTCHA_REQUIRED") {
            return this.$refs["popup-captcha"].open();
          }
          if (result.code === 0) {
            this.loginSuccess(result);
          }
        },
        complete: () => {
          this.captcha = false;
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_send_sms_code2 = common_vendor.resolveComponent("uni-send-sms-code");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_quick_login2 = common_vendor.resolveComponent("uni-quick-login");
  const _easycom_uni_popup_captcha2 = common_vendor.resolveComponent("uni-popup-captcha");
  (_easycom_uni_send_sms_code2 + _easycom_uni_easyinput2 + _easycom_uni_forms2 + _easycom_uni_quick_login2 + _easycom_uni_popup_captcha2)();
}
const _easycom_uni_send_sms_code = () => "../../../../components/uni-send-sms-code/uni-send-sms-code.js";
const _easycom_uni_easyinput = () => "../../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms = () => "../../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_quick_login = () => "../../../../components/uni-quick-login/uni-quick-login.js";
const _easycom_uni_popup_captcha = () => "../../../../uni_modules/uni-captcha/components/uni-popup-captcha/uni-popup-captcha.js";
if (!Math) {
  (_easycom_uni_send_sms_code + _easycom_uni_easyinput + _easycom_uni_forms + _easycom_uni_quick_login + _easycom_uni_popup_captcha)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t(_ctx.$t("common.verifyCodePlaceholder")),
    b: common_vendor.t($options.tipText),
    c: common_vendor.sr("sendSmsCode", "4332aba0-2,4332aba0-1"),
    d: common_vendor.p({
      phone: $data.phone
    }),
    e: common_vendor.o(($event) => $data.code = $event),
    f: common_vendor.p({
      type: "number",
      inputBorder: false,
      maxlength: "6",
      placeholder: _ctx.$t("common.verifyCodePlaceholder"),
      modelValue: $data.code
    }),
    g: common_vendor.t(_ctx.$t("common.login")),
    h: !$options.canSubmit,
    i: $options.canSubmit ? "primary" : "default",
    j: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    k: common_vendor.p({
      agree: true
    }),
    l: common_vendor.sr("popup-captcha", "4332aba0-4"),
    m: common_vendor.o($options.submit),
    n: common_vendor.o(($event) => $data.captcha = $event),
    o: common_vendor.p({
      scene: "loginBySms",
      modelValue: $data.captcha
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/22753/Documents/HBuilderProjects/uni-starter/pages/ucenter/login-page/phone-code/phone-code.vue"]]);
wx.createPage(MiniProgramPage);
