"use strict";
var __defProp = Object.defineProperty;
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
var common_vendor = require("../../../../common/vendor.js");
var uni_modules_uniFeedback_js_sdk_validator_opendbFeedback = require("../../js_sdk/validator/opendb-feedback.js");
console.log(uni_modules_uniFeedback_js_sdk_validator_opendbFeedback.validator);
const db = common_vendor.Rt.database();
const dbCollectionName = "opendb-feedback";
function getValidator(fields) {
  let result = {};
  for (let key in uni_modules_uniFeedback_js_sdk_validator_opendbFeedback.validator) {
    if (fields.indexOf(key) > -1) {
      result[key] = uni_modules_uniFeedback_js_sdk_validator_opendbFeedback.validator[key];
    }
  }
  return result;
}
const _sfc_main = {
  data() {
    let formData = {
      "content": "",
      "imgs": [],
      "contact": "",
      "mobile": ""
    };
    return {
      formData,
      formOptions: {},
      rules: __spreadValues({}, getValidator(Object.keys(formData)))
    };
  },
  onReady() {
    this.$refs.form.setRules(this.rules);
  },
  methods: {
    submit() {
      common_vendor.index.showLoading({
        mask: true
      });
      this.$refs.form.validate().then((res) => {
        this.submitForm(res);
      }).catch(() => {
        common_vendor.index.hideLoading();
      });
    },
    submitForm(value) {
      db.collection(dbCollectionName).add(value).then((res) => {
        common_vendor.index.showToast({
          icon: "none",
          title: "\u63D0\u4EA4\u6210\u529F"
        });
        this.getOpenerEventChannel().emit("refreshData");
        setTimeout(() => common_vendor.index.navigateBack(), 500);
      }).catch((err) => {
        common_vendor.index.showModal({
          content: err.message || "\u8BF7\u6C42\u670D\u52A1\u5931\u8D25",
          showCancel: false
        });
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_forms_item2 + _easycom_uni_file_picker2 + _easycom_uni_easyinput2 + _easycom_uni_forms2)();
}
const _easycom_uni_forms_item = () => "../../../uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_file_picker = () => "../../../uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_easyinput = () => "../../../uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms = () => "../../../uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_forms_item + _easycom_uni_file_picker + _easycom_uni_easyinput + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o([($event) => $data.formData.content = $event.detail.value, ($event) => _ctx.binddata("content", $event.detail.value)]),
    b: $data.formData.content,
    c: common_vendor.p({
      name: "content",
      label: "\u7559\u8A00\u5185\u5BB9/\u56DE\u590D\u5185\u5BB9",
      required: true
    }),
    d: common_vendor.o(($event) => $data.formData.imgs = $event),
    e: common_vendor.p({
      ["file-mediatype"]: "image",
      limit: 6,
      ["return-type"]: "array",
      modelValue: $data.formData.imgs
    }),
    f: common_vendor.p({
      name: "imgs",
      label: "\u56FE\u7247\u5217\u8868"
    }),
    g: common_vendor.o(($event) => $data.formData.contact = $event),
    h: common_vendor.p({
      trim: "both",
      modelValue: $data.formData.contact
    }),
    i: common_vendor.p({
      name: "contact",
      label: "\u8054\u7CFB\u4EBA"
    }),
    j: common_vendor.o(($event) => $data.formData.mobile = $event),
    k: common_vendor.p({
      trim: "both",
      modelValue: $data.formData.mobile
    }),
    l: common_vendor.p({
      name: "mobile",
      label: "\u8054\u7CFB\u7535\u8BDD"
    }),
    m: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    n: common_vendor.sr("form", "34893ba1-0"),
    o: common_vendor.p({
      value: $data.formData,
      ["validate-trigger"]: "submit",
      ["err-show-type"]: "toast"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/22753/Documents/HBuilderProjects/uni-starter/uni_modules/uni-feedback/pages/opendb-feedback/opendb-feedback.vue"]]);
wx.createPage(MiniProgramPage);