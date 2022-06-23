"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      type: "",
      phone: "",
      agree: false
    };
  },
  computed: {
    loginConfig() {
      return getApp().globalData.config.router.login;
    },
    isPhone() {
      return /^1\d{10}$/.test(this.phone);
    },
    imgSrc() {
      return "/static/login-index/" + this.type + ".png";
    }
  },
  onLoad(e) {
    this.type = e.type;
    common_vendor.index.$on("setLoginType", (type) => {
      this.type = type;
    });
  },
  onUnload() {
    common_vendor.index.$off("setLoginType");
  },
  onReady() {
  },
  methods: {
    quickLogin() {
      this.$refs.uniQuickLogin.login_before(this.type);
    },
    sendShortMsg() {
      if (!this.agree) {
        return common_vendor.index.showToast({
          title: this.$t("common.noAgree"),
          icon: "none"
        });
      }
      common_vendor.index.showLoading();
      common_vendor.index.navigateTo({
        url: "/pages/ucenter/login-page/phone-code/phone-code?phoneNumber=" + this.phone,
        complete: () => {
          common_vendor.index.hideLoading();
        }
      });
    },
    toPwdLogin() {
      common_vendor.index.navigateTo({
        url: "../pwd-login/pwd-login"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_agreements2 = common_vendor.resolveComponent("uni-agreements");
  const _easycom_uni_quick_login2 = common_vendor.resolveComponent("uni-quick-login");
  (_easycom_uni_agreements2 + _easycom_uni_quick_login2)();
}
const _easycom_uni_agreements = () => "../../../../components/uni-agreements/uni-agreements.js";
const _easycom_uni_quick_login = () => "../../../../components/uni-quick-login/uni-quick-login.js";
if (!Math) {
  (_easycom_uni_agreements + _easycom_uni_quick_login)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t(_ctx.$t("login.phoneLogin")),
    b: ["apple", "weixin"].includes($data.type)
  }, ["apple", "weixin"].includes($data.type) ? {
    c: common_vendor.o((...args) => $options.quickLogin && $options.quickLogin(...args)),
    d: $options.imgSrc,
    e: common_vendor.o(($event) => $data.agree = $event)
  } : {
    f: _ctx.$t("common.phonePlaceholder"),
    g: $data.phone,
    h: common_vendor.o(($event) => $data.phone = $event.detail.value),
    i: common_vendor.o(($event) => $data.agree = $event),
    j: common_vendor.t(_ctx.$t("login.getVerifyCode")),
    k: !$options.isPhone || !$data.agree,
    l: $options.isPhone && $data.agree ? "primary" : "default",
    m: common_vendor.o((...args) => $options.sendShortMsg && $options.sendShortMsg(...args)),
    n: common_vendor.t(_ctx.$t("login.phoneLoginTip"))
  }, {
    o: common_vendor.sr("uniQuickLogin", "6eca83d2-2"),
    p: common_vendor.p({
      agree: $data.agree
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6eca83d2"], ["__file", "C:/Users/22753/Documents/HBuilderProjects/uni-starter/pages/ucenter/login-page/index/index.vue"]]);
wx.createPage(MiniProgramPage);
