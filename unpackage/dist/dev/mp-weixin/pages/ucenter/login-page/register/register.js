"use strict";
var common_vendor = require("../../../../common/vendor.js");
var pages_ucenter_loginPage_register_validator = require("./validator.js");
var pages_ucenter_loginPage_common_loginPage_mixin = require("../common/login-page.mixin.js");
require("../common/loginSuccess.js");
const _sfc_main = {
  mixins: [pages_ucenter_loginPage_common_loginPage_mixin.mixin],
  data() {
    return {
      formData: {
        "username": "",
        "nickname": "",
        "password": "",
        "pwd2": "",
        "captcha": ""
      },
      rules: pages_ucenter_loginPage_register_validator.rules,
      agree: false
    };
  },
  computed: {
    canSubmit() {
      return this.formData.username.length && this.formData.password.length && this.formData.captcha.length == 4 && this.agree;
    }
  },
  onReady() {
    this.$refs.form.setRules(this.rules);
  },
  onLoad() {
    common_vendor.index.setNavigationBarTitle({
      title: this.$t("register.navigationBarTitle")
    });
  },
  methods: {
    submit() {
      if (!this.agree) {
        return common_vendor.index.showToast({
          title: this.$t("common.noAgree"),
          icon: "none"
        });
      }
      common_vendor.index.showLoading({
        mask: true
      });
      this.$refs.form.validate().then((res) => {
        this.submitForm(res);
      }).catch((errors) => {
        console.log(errors);
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    },
    submitForm(params) {
      common_vendor.Rt.callFunction({
        name: "uni-id-cf",
        data: {
          action: "register",
          params
        },
        success: ({ result }) => {
          console.log(result);
          if (result.code === 0) {
            this.loginSuccess(result);
          } else {
            common_vendor.index.showModal({
              content: result.msg,
              showCancel: false
            });
          }
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_captcha2 = common_vendor.resolveComponent("uni-captcha");
  const _easycom_uni_agreements2 = common_vendor.resolveComponent("uni-agreements");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_captcha2 + _easycom_uni_agreements2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_captcha = () => "../../../../uni_modules/uni-captcha/components/uni-captcha/uni-captcha.js";
const _easycom_uni_agreements = () => "../../../../components/uni-agreements/uni-agreements.js";
const _easycom_uni_forms = () => "../../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_captcha + _easycom_uni_agreements + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.formData.username = $event),
    b: common_vendor.p({
      inputBorder: false,
      placeholder: _ctx.$t("register.usernamePlaceholder"),
      trim: "both",
      modelValue: $data.formData.username
    }),
    c: common_vendor.p({
      name: "username",
      required: true
    }),
    d: common_vendor.o(($event) => $data.formData.nickname = $event),
    e: common_vendor.p({
      inputBorder: false,
      placeholder: _ctx.$t("register.nicknamePlaceholder"),
      trim: "both",
      modelValue: $data.formData.nickname
    }),
    f: common_vendor.p({
      name: "nickname"
    }),
    g: common_vendor.o(($event) => $data.formData.password = $event),
    h: common_vendor.p({
      inputBorder: false,
      placeholder: _ctx.$t("register.passwordDigitsPlaceholder"),
      type: "password",
      trim: "both",
      modelValue: $data.formData.password
    }),
    i: common_vendor.o(($event) => $data.formData.password = $event),
    j: common_vendor.p({
      name: "password",
      required: true,
      modelValue: $data.formData.password
    }),
    k: common_vendor.o(($event) => $data.formData.pwd2 = $event),
    l: common_vendor.p({
      inputBorder: false,
      placeholder: _ctx.$t("register.passwordAgain"),
      type: "password",
      trim: "both",
      modelValue: $data.formData.pwd2
    }),
    m: common_vendor.o(($event) => $data.formData.pwd2 = $event),
    n: common_vendor.p({
      name: "pwd2",
      required: true,
      modelValue: $data.formData.pwd2
    }),
    o: common_vendor.o(($event) => $data.formData.captcha = $event),
    p: common_vendor.p({
      scene: "register",
      modelValue: $data.formData.captcha
    }),
    q: common_vendor.p({
      name: "captcha",
      required: true
    }),
    r: common_vendor.o(($event) => $data.agree = $event),
    s: common_vendor.t(_ctx.$t("register.registerAndLogin")),
    t: !$options.canSubmit,
    v: $options.canSubmit ? "primary" : "default",
    w: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    x: common_vendor.sr("form", "03fd3e5e-0"),
    y: common_vendor.p({
      value: $data.formData,
      rules: $data.rules,
      ["validate-trigger"]: "submit",
      ["err-show-type"]: "undertext"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-03fd3e5e"], ["__file", "C:/Users/22753/Documents/HBuilderProjects/uni-starter/pages/ucenter/login-page/register/register.vue"]]);
wx.createPage(MiniProgramPage);
