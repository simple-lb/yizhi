"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  onLoad() {
  },
  computed: {
    uniStarterConfig() {
      console.log(getApp());
      return getApp().globalData.config;
    }
  },
  data() {
    return {
      version: "V1.0.0",
      year: "2020",
      about: {}
    };
  },
  created() {
    this.about = this.uniStarterConfig.about;
    common_vendor.index.setNavigationBarTitle({
      title: this.$t("about.about") + " " + this.about.appName
    });
    this.year = new Date().getFullYear();
  },
  onNavigationBarButtonTap() {
    let {
      download,
      appName,
      slogan,
      logo
    } = this.about;
    uniShare.show({
      content: {
        type: 0,
        href: download,
        title: appName,
        summary: slogan,
        imageUrl: logo + "?x-oss-process=image/resize,m_fill,h_100,w_100"
      },
      menus: [
        {
          "img": "/static/app-plus/sharemenu/wechatfriend.png",
          "text": this.$t("common.wechatFriends"),
          "share": {
            "provider": "weixin",
            "scene": "WXSceneSession"
          }
        },
        {
          "img": "/static/app-plus/sharemenu/wechatmoments.png",
          "text": this.$t("common.wechatBbs"),
          "share": {
            "provider": "weixin",
            "scene": "WXSceneTimeline"
          }
        },
        {
          "img": "/static/app-plus/sharemenu/weibo.png",
          "text": this.$t("common.weibo"),
          "share": {
            "provider": "sinaweibo"
          }
        },
        {
          "img": "/static/app-plus/sharemenu/qq.png",
          "text": "QQ",
          "share": {
            "provider": "qq"
          }
        },
        {
          "img": "/static/app-plus/sharemenu/copyurl.png",
          "text": this.$t("common.copy"),
          "share": "copyurl"
        },
        {
          "img": "/static/app-plus/sharemenu/more.png",
          "text": this.$t("common.more"),
          "share": "shareSystem"
        }
      ],
      cancelText: this.$t("common.cancelShare")
    }, (e) => {
      console.log(e);
    });
  },
  methods: {
    navigateTo({
      url,
      title
    }) {
      common_vendor.index.navigateTo({
        url: "/pages/common/webview/webview?url=" + url + "&title=" + title,
        success: (res) => {
        },
        fail: () => {
        },
        complete: () => {
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_Sansnn_uQRCode2 = common_vendor.resolveComponent("Sansnn-uQRCode");
  _easycom_Sansnn_uQRCode2();
}
const _easycom_Sansnn_uQRCode = () => "../../../components/Sansnn-uQRCode/Sansnn-uQRCode.js";
if (!Math) {
  _easycom_Sansnn_uQRCode();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.about.logo,
    b: common_vendor.t($data.about.appName),
    c: common_vendor.t($data.version),
    d: common_vendor.p({
      text: $data.about.download,
      makeOnLoad: true
    }),
    e: common_vendor.t(_ctx.$t("about.sacnQR")),
    f: common_vendor.t($data.about.appName),
    g: common_vendor.t(_ctx.$t("about.client")),
    h: common_vendor.f($data.about.agreements, (agreement, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(agreement.title),
        b: common_vendor.o(($event) => $options.navigateTo(agreement)),
        c: $data.about.agreements.length - 1 > index
      }, $data.about.agreements.length - 1 > index ? {
        d: common_vendor.t(_ctx.$t("about.and"))
      } : {}, {
        e: index
      });
    }),
    i: common_vendor.t($data.year),
    j: common_vendor.t($data.about.company)
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e532e9c6"], ["__file", "C:/Users/22753/Documents/HBuilderProjects/uni-starter/pages/ucenter/about/about.vue"]]);
wx.createPage(MiniProgramPage);
