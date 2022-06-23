"use strict";
var common_vendor = require("../../../../common/vendor.js");
var pages_ucenter_loginPage_common_loginPage_mixin = require("../common/login-page.mixin.js");
require("../common/loginSuccess.js");
const _sfc_main = {
  mixins: [pages_ucenter_loginPage_common_loginPage_mixin.mixin],
  data() {
    return {
      "password": "",
      "username": "",
      "agree": false,
      "captcha": "",
      "needCaptcha": false
    };
  },
  computed: {
    canLogin() {
      return this.username.length && this.isPwd && this.agree;
    },
    isPwd() {
      return /^.{6,20}$/.test(this.password);
    },
    isPhone() {
      return /^1\d{10}$/.test(this.phone);
    }
  },
  methods: {
    toRetrievePwd() {
      common_vendor.index.navigateTo({
        url: "../pwd-retrieve/pwd-retrieve?phoneNumber=" + (this.isPhone ? this.username : "") + "&phoneArea=" + this.currenPhoneArea
      });
    },
    pwdLogin() {
      if (!this.agree) {
        return common_vendor.index.showToast({
          title: this.$t("common.noAgree"),
          icon: "none"
        });
      }
      common_vendor.Rt.callFunction({
        name: "uni-id-cf",
        data: {
          action: "login",
          params: {
            "username": this.username,
            "password": this.password,
            "captcha": this.captcha
          }
        },
        success: ({ result }) => {
          console.log(result);
          if (result.code === 0) {
            this.loginSuccess(result);
          } else {
            if (result.needCaptcha) {
              common_vendor.index.showToast({
                title: result.msg || "\u5B8C\u6210",
                icon: "none"
              });
              this.needCaptcha = true;
            } else {
              common_vendor.index.showModal({
                title: this.$t("common.error"),
                content: result.msg,
                showCancel: false,
                confirmText: this.$t("common.gotIt")
              });
            }
          }
        }
      });
    },
    toRegister(e) {
      console.log(e);
      common_vendor.index.navigateTo({
        url: "/pages/ucenter/login-page/register/register"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_captcha2 = common_vendor.resolveComponent("uni-captcha");
  const _easycom_uni_agreements2 = common_vendor.resolveComponent("uni-agreements");
  const _easycom_uni_quick_login2 = common_vendor.resolveComponent("uni-quick-login");
  (_easycom_uni_captcha2 + _easycom_uni_agreements2 + _easycom_uni_quick_login2)();
}
const _easycom_uni_captcha = () => "../../../../uni_modules/uni-captcha/components/uni-captcha/uni-captcha.js";
const _easycom_uni_agreements = () => "../../../../components/uni-agreements/uni-agreements.js";
const _easycom_uni_quick_login = () => "../../../../components/uni-quick-login/uni-quick-login.js";
if (!Math) {
  (_easycom_uni_captcha + _easycom_uni_agreements + _easycom_uni_quick_login)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t(_ctx.$t("pwdLogin.pwdLogin")),
    b: _ctx.$t("pwdLogin.placeholder"),
    c: $data.username,
    d: common_vendor.o(($event) => $data.username = $event.detail.value),
    e: _ctx.$t("pwdLogin.passwordPlaceholder"),
    f: $data.password,
    g: common_vendor.o(($event) => $data.password = $event.detail.value),
    h: $data.needCaptcha
  }, $data.needCaptcha ? {
    i: common_vendor.o(($event) => $data.captcha = $event),
    j: common_vendor.p({
      scene: "login",
      modelValue: $data.captcha
    })
  } : {}, {
    k: common_vendor.o(($event) => $data.agree = $event),
    l: common_vendor.t(_ctx.$t("pwdLogin.login")),
    m: !$options.canLogin,
    n: $options.canLogin ? "primary" : "default",
    o: common_vendor.o((...args) => $options.pwdLogin && $options.pwdLogin(...args)),
    p: common_vendor.t(_ctx.$t("pwdLogin.forgetPassword")),
    q: common_vendor.o((...args) => $options.toRetrievePwd && $options.toRetrievePwd(...args)),
    r: common_vendor.t(_ctx.$t("pwdLogin.register")),
    s: common_vendor.o((...args) => $options.toRegister && $options.toRegister(...args)),
    t: common_vendor.sr("uniQuickLogin", "7ba8c236-2"),
    v: common_vendor.p({
      agree: $data.agree
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7ba8c236"], ["__file", "C:/Users/22753/Documents/HBuilderProjects/uni-starter/pages/ucenter/login-page/pwd-login/pwd-login.vue"]]);
wx.createPage(MiniProgramPage);
