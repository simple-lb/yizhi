"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var common_vendor = require("../../../common/vendor.js");
var pages_ucenter_settings_dcPush_push = require("./dc-push/push.js");
const _sfc_main = {
  data() {
    return {
      pushServer: pages_ucenter_settings_dcPush_push.pushServer,
      supportMode: [],
      pushIsOn: "wait",
      currentLanguage: ""
    };
  },
  computed: __spreadProps(__spreadValues({}, common_vendor.mapGetters({
    "userInfo": "user/info",
    "hasLogin": "user/hasLogin"
  })), {
    i18nEnable() {
      return getApp().globalData.config.i18n.enable;
    }
  }),
  onLoad() {
    this.currentLanguage = common_vendor.index.getStorageSync("CURRENT_LANG") == "en" ? "English" : "\u7B80\u4F53\u4E2D\u6587";
    common_vendor.index.setNavigationBarTitle({
      title: this.$t("settings.navigationBarTitle")
    });
    common_vendor.index.checkIsSupportSoterAuthentication({
      success: (res) => {
        console.log(res);
        this.supportMode = res.supportMode;
      },
      fail: (err) => {
        console.log(err);
      }
    });
  },
  onShow() {
  },
  methods: __spreadProps(__spreadValues({}, common_vendor.mapActions({
    logout: "user/logout"
  })), {
    toEdit() {
      common_vendor.index.navigateTo({
        url: "/pages/ucenter/userinfo/userinfo"
      });
    },
    deactivate() {
      common_vendor.index.navigateTo({
        url: "/pages/ucenter/settings/deactivate/deactivate"
      });
    },
    changePwd() {
      common_vendor.index.navigateTo({
        url: "/pages/ucenter/login-page/pwd-retrieve/pwd-retrieve?phoneNumber=" + (this.userInfo && this.userInfo.mobile ? this.userInfo.mobile : ""),
        fail: (err) => {
          console.log(err);
        }
      });
    },
    startSoterAuthentication(checkAuthMode) {
      console.log(checkAuthMode);
      let title = { "fingerPrint": this.$t("settings.fingerPrint"), "facial": this.$t("settings.facial") }[checkAuthMode];
      this.checkIsSoterEnrolledInDevice({ checkAuthMode, title }).then(() => {
        console.log(checkAuthMode, title);
        common_vendor.index.startSoterAuthentication({
          requestAuthModes: [checkAuthMode],
          challenge: "123456",
          authContent: this.$t("settings.please") + ` ${title}`,
          complete: (res) => {
            console.log(res);
          },
          success: (res) => {
            console.log(res);
            if (res.errCode == 0) {
              return common_vendor.index.showToast({
                title: `${title}` + this.$t("settings.successText"),
                icon: "none"
              });
            }
            common_vendor.index.showToast({
              title: this.$t("settings.failTip"),
              icon: "none"
            });
          },
          fail: (err) => {
            console.log(err);
            console.log(`\u8BA4\u8BC1\u5931\u8D25:${err.errCode}`);
            common_vendor.index.showToast({
              title: this.$t("settings.authFailed"),
              icon: "none"
            });
          }
        });
      });
    },
    checkIsSoterEnrolledInDevice({ checkAuthMode, title }) {
      return new Promise((resolve, reject) => {
        common_vendor.index.checkIsSoterEnrolledInDevice({
          checkAuthMode,
          success: (res) => {
            console.log(res);
            if (res.isEnrolled) {
              return resolve(res);
            }
            common_vendor.index.showToast({
              title: this.$t("settings.deviceNoOpen") + `${title}`,
              icon: "none"
            });
            reject(res);
          },
          fail: (err) => {
            console.log(err);
            common_vendor.index.showToast({
              title: `${title}` + this.$t("settings.fail"),
              icon: "none"
            });
            reject(err);
          }
        });
      });
    },
    clickLogout() {
      if (this.hasLogin) {
        common_vendor.index.showModal({
          title: this.$t("settings.tips"),
          content: this.$t("settings.exitLogin"),
          cancelText: this.$t("settings.cancelText"),
          confirmText: this.$t("settings.confirmText"),
          success: (res) => {
            if (res.confirm) {
              this.logout();
              common_vendor.index.navigateBack();
            }
          },
          fail: () => {
          },
          complete: () => {
          }
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/ucenter/login-page/index/index"
        });
      }
    },
    clearTmp() {
      common_vendor.index.showLoading({
        title: this.$t("settings.clearing"),
        mask: true
      });
      common_vendor.index.getSavedFileList({
        success: (res) => {
          if (res.fileList.length > 0) {
            common_vendor.index.removeSavedFile({
              filePath: res.fileList[0].filePath,
              complete: (res2) => {
                console.log(res2);
                common_vendor.index.hideLoading();
                common_vendor.index.showToast({
                  title: this.$t("settings.clearedSuccessed"),
                  icon: "none"
                });
              }
            });
          } else {
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: this.$t("settings.clearedSuccessed"),
              icon: "none"
            });
          }
        },
        complete: (e) => {
          console.log(e);
        }
      });
    },
    changeLanguage() {
      console.log("\u8BED\u8A00\u5207\u6362");
      common_vendor.index.showActionSheet({
        itemList: ["English", "\u7B80\u4F53\u4E2D\u6587"],
        success: (res) => {
          console.log(res.tapIndex);
          let language = common_vendor.index.getStorageSync("CURRENT_LANG");
          if (!res.tapIndex && language == "zh-Hans" || res.tapIndex && language == "en") {
            const globalData = getApp().globalData;
            if (language === "en") {
              language = globalData.locale = "zh-Hans";
            } else {
              language = globalData.locale = "en";
            }
            common_vendor.index.setStorageSync("CURRENT_LANG", language);
            getApp().globalData.$i18n.locale = language;
            this.currentLanguage = res.tapIndex ? "\u7B80\u4F53\u4E2D\u6587" : "English";
            if (common_vendor.index.setLocale) {
              common_vendor.index.setLocale(language);
            }
            common_vendor.index.reLaunch({
              url: "/pages/list/list",
              complete: () => {
                common_vendor.index.$emit("changeLanguage", language);
              }
            });
          }
        },
        fail: () => {
        },
        complete: () => {
        }
      });
    }
  })
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      title: _ctx.$t("settings.userInfo"),
      to: "/pages/ucenter/userinfo/userinfo",
      link: "navigateTo"
    }),
    b: _ctx.userInfo.mobile
  }, _ctx.userInfo.mobile ? {
    c: common_vendor.p({
      title: _ctx.$t("settings.changePassword"),
      to: "/pages/ucenter/login-page/pwd-retrieve/pwd-retrieve?phoneNumber=" + _ctx.userInfo.mobile,
      link: "navigateTo"
    })
  } : {}, {
    d: common_vendor.p({
      border: false
    }),
    e: $data.supportMode.includes("fingerPrint")
  }, $data.supportMode.includes("fingerPrint") ? {
    f: common_vendor.o(($event) => $options.startSoterAuthentication("fingerPrint")),
    g: common_vendor.p({
      title: _ctx.$t("settings.fingerPrint"),
      link: true
    })
  } : {}, {
    h: $data.supportMode.includes("facial")
  }, $data.supportMode.includes("facial") ? {
    i: common_vendor.o(($event) => $options.startSoterAuthentication("facial")),
    j: common_vendor.p({
      title: _ctx.$t("settings.facial"),
      link: true
    })
  } : {}, {
    k: $options.i18nEnable
  }, $options.i18nEnable ? {
    l: common_vendor.o($options.changeLanguage),
    m: common_vendor.p({
      title: _ctx.$t("settings.changeLanguage"),
      rightText: $data.currentLanguage,
      link: true
    })
  } : {}, {
    n: common_vendor.p({
      border: false
    }),
    o: common_vendor.o($options.deactivate),
    p: common_vendor.p({
      title: _ctx.$t("settings.deactivate"),
      link: "navigateTo"
    }),
    q: common_vendor.p({
      border: false
    }),
    r: _ctx.hasLogin
  }, _ctx.hasLogin ? {
    s: common_vendor.t(_ctx.$t("settings.logOut"))
  } : {
    t: common_vendor.t(_ctx.$t("settings.login"))
  }, {
    v: common_vendor.o((...args) => $options.clickLogout && $options.clickLogout(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/22753/Documents/HBuilderProjects/uni-starter/pages/ucenter/settings/settings.vue"]]);
wx.createPage(MiniProgramPage);
