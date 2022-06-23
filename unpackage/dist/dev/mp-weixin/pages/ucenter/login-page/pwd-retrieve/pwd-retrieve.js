"use strict";
var common_vendor = require("../../../../common/vendor.js");
var pages_ucenter_loginPage_common_loginPage_mixin = require("../common/login-page.mixin.js");
require("../common/loginSuccess.js");
const _sfc_main = {
  mixins: [pages_ucenter_loginPage_common_loginPage_mixin.mixin],
  data() {
    return {
      lock: false,
      formData: {
        "phone": "",
        "code": "",
        "pwd": "",
        "pwd2": ""
      },
      rules: {
        phone: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("common.phonePlaceholder")
            },
            {
              pattern: /^1\d{10}$/,
              errorMessage: this.$t("common.formatErr")
            }
          ]
        },
        code: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("common.verifyCodePlaceholder")
            },
            {
              pattern: /^.{6}$/,
              errorMessage: this.$t("common.sixDigitCode")
            }
          ]
        },
        pwd: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("common.newPasswordPlaceholder")
            },
            {
              pattern: /^.{6,20}$/,
              errorMessage: this.$t("common.passwordDigits")
            }
          ]
        },
        pwd2: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("common.confirmPassword")
            },
            {
              pattern: /^.{6,20}$/,
              errorMessage: this.$t("common.passwordDigits")
            },
            {
              validateFunction: function(rule, value, data, callback) {
                if (value != data.pwd) {
                  callback("\u4E24\u6B21\u8F93\u5165\u5BC6\u7801\u4E0D\u4E00\u81F4");
                }
                return true;
              }
            }
          ]
        }
      }
    };
  },
  computed: {
    canSubmit() {
      return this.isPhone && this.isPwd && this.isCode;
    },
    isPhone() {
      let reg_phone = /^1\d{10}$/;
      let isPhone = reg_phone.test(this.formData.phone);
      return isPhone;
    },
    isPwd() {
      let reg_pwd = /^.{6,20}$/;
      let isPwd = reg_pwd.test(this.formData.pwd);
      return isPwd;
    },
    isCode() {
      let reg_code = /^\d{6}$/;
      let isCode = reg_code.test(this.formData.code);
      return isCode;
    }
  },
  onLoad(event) {
    if (event && event.phoneNumber) {
      this.formData.phone = event.phoneNumber;
      this.lock = true;
    }
    common_vendor.index.setNavigationBarTitle({
      title: this.$t("common.resetNavTitle")
    });
  },
  onReady() {
    if (this.formData.phone) {
      this.$refs.shortCode.start();
    }
    this.$refs.form.setRules(this.rules);
  },
  methods: {
    submit() {
      console.log("formData", this.formData);
      console.log("rules", this.rules);
      this.$refs.form.validate().then((res) => {
        common_vendor.Rt.callFunction({
          name: "uni-id-cf",
          data: {
            action: "resetPwdBySmsCode",
            params: {
              "mobile": this.formData.phone,
              "code": this.formData.code,
              "password": this.formData.pwd
            }
          },
          success: ({ result }) => {
            console.log(result);
            common_vendor.index.showToast({
              title: result.msg || "\u66F4\u65B0\u6210\u529F",
              icon: "none"
            });
            if (result.code === 0) {
              common_vendor.index.navigateBack();
            }
          }
        });
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_send_sms_code2 = common_vendor.resolveComponent("uni-send-sms-code");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_send_sms_code2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_send_sms_code = () => "../../../../components/uni-send-sms-code/uni-send-sms-code.js";
const _easycom_uni_forms = () => "../../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_send_sms_code + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.formData.phone = $event),
    b: common_vendor.p({
      disabled: $data.lock,
      focus: $data.formData.phone.length != 11,
      type: "number",
      inputBorder: false,
      maxlength: "11",
      placeholder: _ctx.$t("common.phonePlaceholder"),
      modelValue: $data.formData.phone
    }),
    c: common_vendor.p({
      name: "phone"
    }),
    d: common_vendor.sr("shortCode", "3973ee60-5,3973ee60-4"),
    e: common_vendor.p({
      phone: $data.formData.phone
    }),
    f: common_vendor.o(($event) => $data.formData.code = $event),
    g: common_vendor.p({
      focus: $data.formData.phone.length == 11,
      type: "number",
      inputBorder: false,
      maxlength: "6",
      placeholder: _ctx.$t("common.verifyCodePlaceholder"),
      modelValue: $data.formData.code
    }),
    h: common_vendor.p({
      name: "code"
    }),
    i: common_vendor.o(($event) => $data.formData.pwd = $event),
    j: common_vendor.p({
      type: "password",
      inputBorder: false,
      placeholder: _ctx.$t("common.newPasswordPlaceholder"),
      modelValue: $data.formData.pwd
    }),
    k: common_vendor.p({
      name: "pwd"
    }),
    l: common_vendor.o(($event) => $data.formData.pwd2 = $event),
    m: common_vendor.p({
      type: "password",
      inputBorder: false,
      placeholder: _ctx.$t("common.confirmNewPasswordPlaceholder"),
      modelValue: $data.formData.pwd2
    }),
    n: common_vendor.p({
      name: "pwd2"
    }),
    o: common_vendor.t(_ctx.$t("common.complete")),
    p: !$options.canSubmit,
    q: $options.canSubmit ? "primary" : "default",
    r: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    s: common_vendor.sr("form", "3973ee60-0"),
    t: common_vendor.p({
      value: $data.formData
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/22753/Documents/HBuilderProjects/uni-starter/pages/ucenter/login-page/pwd-retrieve/pwd-retrieve.vue"]]);
wx.createPage(MiniProgramPage);
