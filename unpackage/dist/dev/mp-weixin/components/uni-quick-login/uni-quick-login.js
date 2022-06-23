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
var common_vendor = require("../../common/vendor.js");
var components_uniQuickLogin_i18n_index = require("./i18n/index.js");
var pages_ucenter_loginPage_common_loginSuccess = require("../../pages/ucenter/login-page/common/loginSuccess.js");
const {
  t
} = common_vendor.initVueI18n(components_uniQuickLogin_i18n_index.messages);
const db = common_vendor.Rt.database();
db.collection("uni-id-users");
const _sfc_main = {
  computed: {
    loginConfig() {
      return getApp().globalData.config.router.login;
    },
    agreements() {
      return getApp().globalData.config.about.agreements || [];
    }
  },
  data() {
    return {
      servicesList: [
        {
          "id": "username",
          "text": t("accountLogin"),
          "logo": "/static/uni-quick-login/user.png",
          "path": "/pages/ucenter/login-page/pwd-login/pwd-login"
        },
        {
          "id": "smsCode",
          "text": t("SMSLogin"),
          "logo": "/static/uni-quick-login/sms.png",
          "path": "/pages/ucenter/login-page/index/index?type=smsCode"
        },
        {
          "id": "weixin",
          "text": t("wechatLogin"),
          "logo": "/static/uni-quick-login/wechat.png"
        },
        {
          "id": "apple",
          "text": t("appleLogin"),
          "logo": "/static/uni-quick-login/apple.png"
        },
        {
          "id": "univerify",
          "text": t("oneClickLogin"),
          "logo": "/static/uni-quick-login/univerify.png"
        },
        {
          "id": "qq",
          "text": t("QQLogin"),
          "logo": "/static/uni-quick-login/univerify.png"
        },
        {
          "id": "xiaomi",
          "text": t("xiaomiLogin"),
          "logo": "/static/uni-quick-login/univerify.png"
        },
        {
          "id": "sinaweibo",
          "text": t("weibo"),
          "logo": "/static/uni-quick-login/univerify.png"
        }
      ],
      config: {},
      univerifyStyle: {
        "fullScreen": true,
        "backgroundColor": "#ffffff",
        "buttons": {
          "iconWidth": "45px",
          "list": []
        },
        "privacyTerms": {
          "defaultCheckBoxState": false,
          "textColor": "#BBBBBB",
          "termsColor": "#5496E3",
          "prefix": "\u6211\u5DF2\u9605\u8BFB\u5E76\u540C\u610F",
          "suffix": "\u5E76\u4F7F\u7528\u672C\u673A\u53F7\u7801\u767B\u5F55",
          "privacyItems": []
        }
      }
    };
  },
  watch: {
    agree(agree) {
      this.univerifyStyle.privacyTerms.defaultCheckBoxState = agree;
    }
  },
  props: {
    agree: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  async created() {
    let servicesList = this.servicesList;
    servicesList = servicesList.filter((item) => this.loginConfig.includes(item.id));
    if (this.loginConfig.includes("univerify")) {
      this.univerifyStyle.privacyTerms.privacyItems = this.agreements;
      servicesList.forEach(({
        id,
        logo,
        path
      }) => {
        if (id != "univerify") {
          this.univerifyStyle.buttons.list.push({
            "iconPath": logo,
            "provider": id
          });
        }
      });
    }
    console.log(servicesList);
    if (this.getRoute(1) == "/pages/ucenter/login-page/index/index" && ["weixin", "apple"].includes(this.loginConfig[0])) {
      servicesList = servicesList.filter((item) => item.id != this.loginConfig[0]);
    }
    this.servicesList = servicesList.filter((item) => {
      let path = item.path ? item.path.split("?")[0] : "";
      return path != this.getRoute(1);
    });
    console.log("servicesList", servicesList, this.servicesList);
  },
  mounted() {
  },
  methods: __spreadProps(__spreadValues({}, common_vendor.mapMutations({
    setUserInfo: "user/login"
  })), {
    getRoute(n = 0) {
      let pages = getCurrentPages();
      if (n > pages.length) {
        return "";
      }
      return "/" + pages[pages.length - n].route;
    },
    to(path) {
      console.log("\u6BD4\u8F83", this.getRoute(1), this.getRoute(2), path);
      if (this.getRoute(1) == path.split("?")[0] && this.getRoute(1) == "/pages/ucenter/login-page/index/index") {
        let type = path.split("?")[1].split("=")[1];
        common_vendor.index.$emit("setLoginType", type);
      } else if (this.getRoute(2) == path) {
        common_vendor.index.navigateBack();
      } else if (this.getRoute(1) != path) {
        common_vendor.index.navigateTo({
          url: path,
          animationType: "slide-in-left"
        });
      } else {
        console.log("\u51FA\u4E4E\u610F\u6599\u7684\u60C5\u51B5,path\uFF1A" + path);
      }
    },
    login_before(type, navigateBack = true) {
      console.log(type);
      if (!this.agree && type != "univerify") {
        return common_vendor.index.showToast({
          title: t("noAgree"),
          icon: "none"
        });
      }
      common_vendor.index.showLoading({ mask: true });
      if (type == "univerify" && common_vendor.index.getUniverifyManager) {
        let closeUniverify = function() {
          common_vendor.index.hideLoading();
          univerifyManager.close();
          univerifyManager.offButtonsClick(onButtonsClickFn);
        };
        let univerifyManager = common_vendor.index.getUniverifyManager();
        console.log("\u662F\u65B0\u7248");
        let onButtonsClickFn = async (res2) => {
          console.log("\u70B9\u51FB\u4E86\u7B2C\u4E09\u65B9\u767B\u5F55\uFF0Cprovider\uFF1A", res2, res2.provider, this.univerifyStyle.buttons.list);
          let agree = (await common_vendor.index.getCheckBoxState())[1].state;
          console.log("agree", agree);
          common_vendor.index.$emit("setAgreementsAgree", agree);
          let {
            path
          } = this.univerifyStyle.buttons.list[res2.index];
          console.log("path", path, this.getRoute(1));
          if (path) {
            this.to(path);
            closeUniverify();
          } else {
            if (agree) {
              closeUniverify();
              setTimeout(() => {
                console.log("login_before");
                this.login_before(res2.provider);
              }, 500);
            } else {
              console.log(t("noAgree"));
              common_vendor.index.showToast({
                title: t("noAgree"),
                icon: "none"
              });
            }
          }
        };
        univerifyManager.onButtonsClick(onButtonsClickFn);
        return univerifyManager.login({
          "univerifyStyle": this.univerifyStyle,
          success: (res2) => {
            console.log("login success", res2);
            this.login(res2.authResult, "univerify");
          },
          fail(err) {
            common_vendor.index.showToast({
              title: JSON.stringify(err),
              icon: "none"
            });
          },
          complete(e) {
            common_vendor.index.hideLoading();
            univerifyManager.offButtonsClick(onButtonsClickFn);
          }
        });
      }
      common_vendor.index.login({
        "provider": type,
        "onlyAuthorize": true,
        "univerifyStyle": this.univerifyStyle,
        complete: (e) => {
          console.log(e);
          common_vendor.index.hideLoading();
        },
        success: async (e) => {
          console.log(e);
          if (type == "apple") {
            let res2 = await this.getUserInfo({
              provider: "apple"
            });
            Object.assign(e.authResult, res2.userInfo);
          }
          this.login(type == "weixin" ? e.code : e.authResult, type);
        },
        fail: async (err) => {
          console.log(err);
          if (type == "univerify" && !common_vendor.index.getUniverifyManager) {
            if (err.metadata && err.metadata.error_data) {
              common_vendor.index.showToast({
                title: t("oneClickLogin") + ":" + err.metadata.error_data,
                icon: "none"
              });
            }
            if (err.errMsg) {
              common_vendor.index.showToast({
                title: t("oneClickLogin") + ":" + err.errMsg,
                icon: "none"
              });
            }
            switch (err.errCode) {
              case 30002:
                console.log("\u5728\u4E00\u952E\u767B\u5F55\u754C\u9762\uFF0C\u70B9\u51FB\u5176\u4ED6\u767B\u5F55\u65B9\u5F0F");
                break;
              case 30003:
                console.log("\u5173\u95ED\u4E86\u767B\u5F55");
                if (navigateBack) {
                  common_vendor.index.navigateBack();
                }
                break;
              case 30006:
                common_vendor.index.showModal({
                  title: t("loginErr"),
                  content: err.metadata.error_data,
                  showCancel: false,
                  confirmText: t("gotIt")
                });
                break;
              case "30008":
                console.log("\u70B9\u51FB\u4E86\u7B2C\u4E09\u65B9\u767B\u5F55\uFF0Cprovider\uFF1A", err.provider);
                let agree = (await common_vendor.index.getCheckBoxState())[1].state;
                console.log("agree", agree);
                common_vendor.index.$emit("setAgreementsAgree", agree);
                let {
                  path
                } = this.univerifyStyle.buttons.list[res.index];
                console.log("path", path);
                if (path) {
                  this.to(path);
                } else {
                  setTimeout(() => {
                    console.log("agree", this.agree);
                    this.login_before(err.provider);
                  }, 500);
                }
                break;
              default:
                console.log(err);
                break;
            }
          }
        }
      });
    },
    login(params, type) {
      console.log({
        params,
        type
      });
      let action = "loginBy" + type.trim().toLowerCase().replace(type[0], type[0].toUpperCase());
      common_vendor.Rt.callFunction({
        name: "uni-id-cf",
        data: {
          action,
          params
        },
        success: async ({
          result
        }) => {
          console.log("login-result", result);
          if (result.code === 0) {
            delete result.userInfo.token;
            if (type == "weixin" && !result.userInfo.nickname) {
              return this.$refs.userProfile.open(result.uid);
            }
            if (result.type == "register") {
              result.userInfo._id = result.uid;
            }
            this.setUserInfo(result.userInfo);
            pages_ucenter_loginPage_common_loginSuccess.loginSuccess(result);
          } else {
            common_vendor.index.showModal({
              content: result.msg,
              showCancel: false
            });
          }
        },
        complete: (e) => {
          console.log(e);
          if (type == "univerify") {
            common_vendor.index.closeAuthView();
          }
          common_vendor.index.hideLoading();
        }
      });
    },
    doUserProfileNext() {
      pages_ucenter_loginPage_common_loginSuccess.loginSuccess();
    },
    async getUserInfo(e) {
      return new Promise((resolve, reject) => {
        common_vendor.index.getUserInfo(__spreadProps(__spreadValues({}, e), {
          success: (res2) => {
            resolve(res2);
          },
          fail: (err) => {
            common_vendor.index.showModal({
              content: JSON.stringify(err),
              showCancel: false
            });
            reject(err);
          }
        }));
      });
    }
  })
};
if (!Array) {
  const _easycom_uni_user_profile2 = common_vendor.resolveComponent("uni-user-profile");
  _easycom_uni_user_profile2();
}
const _easycom_uni_user_profile = () => "../uni-user-profile/uni-user-profile.js";
if (!Math) {
  _easycom_uni_user_profile();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.servicesList, (item, index, i0) => {
      return {
        a: item.logo,
        b: common_vendor.t(item.text),
        c: index,
        d: common_vendor.o(($event) => item.path ? $options.to(item.path) : $options.login_before(item.id, false))
      };
    }),
    b: common_vendor.sr("userProfile", "d69f7544-0"),
    c: common_vendor.o($options.doUserProfileNext)
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d69f7544"], ["__file", "C:/Users/22753/Documents/HBuilderProjects/uni-starter/components/uni-quick-login/uni-quick-login.vue"]]);
wx.createComponent(Component);
