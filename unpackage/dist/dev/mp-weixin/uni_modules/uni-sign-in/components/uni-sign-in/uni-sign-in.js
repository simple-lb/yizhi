"use strict";
var common_vendor = require("../../../../common/vendor.js");
var uni_modules_uniSignIn_utils_ad = require("../../utils/ad.js");
var _imports_0 = "/uni_modules/uni-sign-in/static/background.png";
const db = common_vendor.Rt.database();
const signInTable = db.action("signIn").collection("opendb-sign-in");
new Date(new Date().toLocaleDateString()).getTime();
const _sfc_main = {
  name: "uni-signIn",
  data() {
    return {
      total: 0,
      scores: 0,
      weekdays: [1, 2, 3, 4, 5, 6, 7],
      signInRes: {
        days: [],
        n: 0
      }
    };
  },
  mounted() {
  },
  methods: {
    async getSignedInInfo(ToastText = "\u4ECA\u65E5\u5DF2\u7B7E\u8FC7") {
      const date = new Date(new Date().toLocaleDateString()).getTime();
      let res = await signInTable.where(`'user_id' == $env.uid && 'date' == ${date} && 'isDelete' == false`).get();
      if (res.result.data.length) {
        this.signInRes = res.result;
        this.$refs.popup.open();
        common_vendor.index.showToast({
          title: ToastText,
          duration: 3e3,
          icon: "none"
        });
      }
      return res.result.data;
    },
    async showRewardedVideoAd() {
      let res = await this.getSignedInInfo();
      console.log(res);
      if (res && res.length == 0) {
        let {
          _id: userId
        } = common_vendor.index.getStorageSync("userInfo");
        console.log(userId, common_vendor.index.getStorageSync("userInfo"));
        if (!userId) {
          return common_vendor.index.navigateTo({
            url: "/pages/ucenter/login-page/index/index"
          });
        }
        uni_modules_uniSignIn_utils_ad.AD.show({
          adpid: 1733738477,
          adType: "RewardedVideo",
          urlCallback: {
            userId,
            extra: "uniSignIn"
          }
        }, (res2) => {
          if (res2 && res2.isEnded) {
            console.log("onClose " + res2.isEnded);
            let i = 0;
            common_vendor.index.showLoading({
              mask: true
            });
            let myIntive = setInterval(async (e) => {
              i++;
              res2 = await this.getSignedInInfo("\u7B7E\u5230\u6210\u529F");
              if (i > 2 || res2.length) {
                if (!res2.length) {
                  common_vendor.index.showToast({
                    title: "\u7B7E\u5230\u5931\u8D25\uFF01",
                    icon: "error",
                    duration: 6e3
                  });
                }
                clearInterval(myIntive);
                common_vendor.index.hideLoading();
              }
            }, 2e3);
          } else {
            console.log("onClose " + res2.isEnded);
            common_vendor.index.showToast({
              title: "\u64AD\u653E\u4E2D\u9014\u9000\u51FA,\u7B7E\u5230\u5931\u8D25\uFF01",
              icon: "error",
              duration: 5e3
            });
          }
        }, (err) => {
          console.log(err);
          common_vendor.index.showToast({
            title: err.errMsg,
            icon: "none"
          });
        });
      }
    },
    async open() {
      common_vendor.index.showLoading({
        mask: true
      });
      try {
        let res = await this.getSignedInInfo();
        if (res && res.length == 0) {
          let res2 = await signInTable.add({});
          console.log(res2);
          common_vendor.index.hideLoading();
          this.signInRes = res2.result;
          this.$refs.popup.open();
          if (this.signInRes.days.length == 7) {
            common_vendor.index.showToast({
              title: "\u4F60\u5DF2\u5B8C\u62107\u65E5\u8FDE\u7EED\u7B7E\u5230\uFF0C\u83B7\u5F9760\u79EF\u5206\uFF01",
              icon: "none",
              duration: 5e3
            });
          } else {
            common_vendor.index.showToast({
              title: "\u7B7E\u5230\u6210\u529F,\u83B7\u5F9710\u79EF\u5206\uFF01",
              icon: "none",
              duration: 5e3
            });
          }
        }
      } catch (e) {
        common_vendor.index.hideLoading();
        console.error(e);
      }
    },
    closeMe(e) {
      this.$refs.popup.close();
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup = () => "../../../uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _imports_0,
    b: common_vendor.t($data.signInRes.days.length),
    c: common_vendor.t($data.signInRes.score),
    d: common_vendor.f($data.weekdays, (item, index, i0) => {
      return common_vendor.e({
        a: $data.signInRes.days.includes(item - 1)
      }, $data.signInRes.days.includes(item - 1) ? {
        b: "0ba4adf3-1-" + i0 + ",0ba4adf3-0",
        c: common_vendor.p({
          color: "#FFFFFF",
          type: "checkmarkempty"
        })
      } : common_vendor.e({
        d: item < $data.signInRes.n
      }, item < $data.signInRes.n ? {
        e: "0ba4adf3-2-" + i0 + ",0ba4adf3-0",
        f: common_vendor.p({
          color: "#FFFFFF",
          type: "closeempty"
        })
      } : {
        g: "0ba4adf3-3-" + i0 + ",0ba4adf3-0",
        h: common_vendor.p({
          type: "checkmarkempty",
          color: "#FFFFFF"
        })
      }), {
        i: $data.signInRes.days.includes(item - 1) || item > $data.signInRes.n
      }, $data.signInRes.days.includes(item - 1) || item > $data.signInRes.n ? {
        j: common_vendor.t(item),
        k: item > $data.signInRes.n ? 1 : ""
      } : {}, {
        l: index
      });
    }),
    e: common_vendor.o($options.closeMe),
    f: common_vendor.p({
      type: "closeempty",
      size: "20",
      color: "#AAAAAA"
    }),
    g: common_vendor.sr("popup", "0ba4adf3-0"),
    h: common_vendor.p({
      type: "center"
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/22753/Documents/HBuilderProjects/uni-starter/uni_modules/uni-sign-in/components/uni-sign-in/uni-sign-in.vue"]]);
wx.createComponent(Component);
