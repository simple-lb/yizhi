"use strict";
var common_vendor = require("../../../common/vendor.js");
var _imports_0 = "/static/h5/download-app/ios.png";
var _imports_1 = "/static/h5/download-app/android.png";
const _sfc_main = {
  computed: {
    uniStarterConfig() {
      return getApp().globalData.config;
    }
  },
  data() {
    return {
      about: {},
      code: "",
      isIos: "",
      showMask: false,
      downloadUrl: {
        "ios": "",
        "android": ""
      }
    };
  },
  created() {
    this.about = this.uniStarterConfig.about;
    this.downloadUrl = this.uniStarterConfig.download;
    this.year = new Date().getFullYear();
    var userAgent = navigator.userAgent;
    var ua = userAgent.toLowerCase();
    this.isWeixin = ua.indexOf("micromessenger") != -1;
    this.isIos = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  },
  onLoad({
    code
  }) {
    this.code = code;
    document.getElementById("openApp").style.display = "none";
    document.getElementsByTagName("body")[0].style = "";
  },
  methods: {
    download() {
      if (this.code) {
        common_vendor.index.setClipboardData({
          data: this.code,
          complete: (e) => {
            console.log(e);
            common_vendor.index.hideToast();
            document.getElementById("#clipboard").style.top = "-999px";
            common_vendor.index.hideKeyboard();
          }
        });
      }
      if (this.isIos) {
        window.location.href = this.downloadUrl.ios;
      } else {
        if (this.isWeixin) {
          this.showMask = true;
        } else {
          window.location.href = this.downloadUrl.android;
        }
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.about.logo,
    b: common_vendor.t($data.about.appName),
    c: common_vendor.t($data.about.slogan),
    d: $data.isIos
  }, $data.isIos ? {
    e: _imports_0
  } : {
    f: _imports_1
  }, {
    g: common_vendor.t(_ctx.$t("invite.download")),
    h: common_vendor.o((...args) => $options.download && $options.download(...args)),
    i: common_vendor.t($data.about.version),
    j: common_vendor.t($data.about.company),
    k: $data.showMask
  }, $data.showMask ? {} : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/22753/Documents/HBuilderProjects/uni-starter/pages/ucenter/invite/invite.vue"]]);
wx.createPage(MiniProgramPage);
