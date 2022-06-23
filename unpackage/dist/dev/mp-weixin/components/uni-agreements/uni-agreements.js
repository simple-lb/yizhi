"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "uni-agreements",
  computed: {
    agreements() {
      return getApp().globalData.config.about.agreements || [];
    }
  },
  methods: {
    navigateTo({ url, title }) {
      common_vendor.index.navigateTo({
        url: "/pages/common/webview/webview?url=" + url + "&title=" + title,
        success: (res) => {
        },
        fail: () => {
        },
        complete: () => {
        }
      });
    },
    hasAnd(agreements, index) {
      return agreements.length - 1 > index;
    },
    setAgree(e) {
      this.isAgree = !this.isAgree;
      this.$emit("setAgree", this.isAgree);
    }
  },
  created() {
    common_vendor.index.$on("setAgreementsAgree", (state) => {
      console.log("setAgreementsAgree", state);
      this.isAgree = state;
      this.$emit("setAgree", state);
    });
  },
  data() {
    return {
      isAgree: false
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.isAgree,
    b: common_vendor.t(_ctx.$t("common.agree")),
    c: common_vendor.o((...args) => $options.setAgree && $options.setAgree(...args)),
    d: common_vendor.f($options.agreements, (agreement, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(agreement.title),
        b: common_vendor.o(($event) => $options.navigateTo(agreement)),
        c: $options.hasAnd($options.agreements, index)
      }, $options.hasAnd($options.agreements, index) ? {} : {}, {
        d: index
      });
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3915d2f8"], ["__file", "C:/Users/22753/Documents/HBuilderProjects/uni-starter/components/uni-agreements/uni-agreements.vue"]]);
wx.createComponent(Component);
