"use strict";
var common_vendor = require("./vendor.js");
var uniStarter_config = require("../uni-starter.config.js");
var store_index = require("../store/index.js");
const db = common_vendor.Rt.database();
async function initApp() {
  let loginConfig = uniStarter_config.config.router.login;
  const debug = uniStarter_config.config.debug;
  loginConfig = loginConfig.filter((item) => {
    return ![
      "univerify",
      "apple"
    ].includes(item);
  });
  uniStarter_config.config.router.login = loginConfig;
  setTimeout(() => {
    getApp({
      allowDefault: true
    }).globalData.config = uniStarter_config.config;
  }, 1);
  function onDBError({
    code,
    message
  }) {
    console.log("onDBError", {
      code,
      message
    });
    console.error(code, message);
    if ([
      "TOKEN_INVALID_INVALID_CLIENTID",
      "TOKEN_INVALID",
      "TOKEN_INVALID_TOKEN_EXPIRED",
      "TOKEN_INVALID_WRONG_TOKEN",
      "TOKEN_INVALID_ANONYMOUS_USER"
    ].includes(code)) {
      common_vendor.index.navigateTo({
        url: "/pages/ucenter/login-page/index/index"
      });
    }
  }
  db.on("error", onDBError);
  db.on("refreshToken", function({
    token,
    tokenExpired
  }) {
    console.log("\u76D1\u542C\u5230clientDB\u7684refreshToken", {
      token,
      tokenExpired
    });
    store_index.store.commit("user/login", {
      token,
      tokenExpired
    });
  });
  common_vendor.index.addInterceptor("setStorage", {
    invoke(args) {
      if (args.data && args.key == "uni_id_token") {
        let oldToken = common_vendor.index.getStorageSync("uni_id_token");
        if (oldToken.length) {
          console.log("\u76D1\u542C\u5230token\u66F4\u65B0\uFF0C\u5C31\u5237\u65B0push_clientid\u7684\u6709\u6548\u671F");
        }
      }
    },
    complete(e) {
    }
  });
  let callFunctionOption;
  common_vendor.Rt.addInterceptor("callFunction", {
    async invoke(option) {
      if (option.name == "uni-id-cf" && (option.data.action == "register" || option.data.action.slice(0, 5) == "login")) {
        option.data.deviceInfo = await getDeviceInfo();
        console.log("\u91CD\u65B0\u767B\u5F55/\u6CE8\u518C\uFF0C\u83B7\u53D6\u8BBE\u5907id", option.data.deviceInfo);
        option.data.inviteCode = await new Promise((callBack) => {
          common_vendor.index.getClipboardData({
            success: function(res) {
              if (res.data.slice(0, 18) == "uniInvitationCode:") {
                let uniInvitationCode = res.data.slice(18, 38);
                console.log("\u5F53\u524D\u7528\u6237\u662F\u5176\u4ED6\u7528\u6237\u63A8\u8350\u4E0B\u8F7D\u7684,\u63A8\u8350\u8005\u7684code\u662F\uFF1A" + uniInvitationCode);
                callBack(uniInvitationCode);
              } else {
                callBack(false);
              }
            },
            fail() {
              callBack(false);
            },
            complete() {
              common_vendor.index.hideToast();
            }
          });
        });
      }
      callFunctionOption = option;
    },
    complete(e) {
    },
    fail(e) {
      console.error("\u7F51\u7EDC\u8BF7\u6C42\u9519\u8BEF\u7801\uFF1A", JSON.stringify(e));
      if (debug) {
        common_vendor.index.showModal({
          content: JSON.stringify(e),
          showCancel: false
        });
        console.error(e);
      } else {
        common_vendor.index.showModal({
          content: "\u7CFB\u7EDF\u9519\u8BEF\u8BF7\u7A0D\u540E\u518D\u8BD5\uFF01",
          showCancel: false,
          confirmText: "\u77E5\u9053\u4E86"
        });
      }
      common_vendor.index.getNetworkType({
        complete: (res) => {
          if (res.networkType == "none") {
            common_vendor.index.showToast({
              title: "\u624B\u673A\u7F51\u7EDC\u5F02\u5E38",
              icon: "none"
            });
            console.log("\u624B\u673A\u7F51\u7EDC\u5F02\u5E38");
            let callBack = (res2) => {
              console.log(res2);
              if (res2.isConnected) {
                common_vendor.index.showToast({
                  title: "\u6062\u590D\u8054\u7F51\u81EA\u52A8\u91CD\u65B0\u6267\u884C",
                  icon: "none"
                });
                console.log(res2.networkType, "\u6062\u590D\u8054\u7F51\u81EA\u52A8\u91CD\u65B0\u6267\u884C");
                common_vendor.index.offNetworkStatusChange((e2) => {
                  console.log("\u79FB\u9664\u76D1\u542C\u6210\u529F", e2);
                });
                common_vendor.Rt.callFunction(callFunctionOption);
                common_vendor.index.offNetworkStatusChange(callBack);
              }
            };
            common_vendor.index.onNetworkStatusChange(callBack);
          }
        }
      });
    },
    success: (e) => {
      const {
        token,
        tokenExpired
      } = e.result;
      if (token && tokenExpired) {
        store_index.store.commit("user/login", {
          token,
          tokenExpired
        });
      }
      switch (e.result.code) {
        case 403:
          common_vendor.index.navigateTo({
            url: "/pages/ucenter/login-page/index/index"
          });
          break;
        case 30203:
          common_vendor.index.navigateTo({
            url: "/pages/ucenter/login-page/index/index"
          });
          break;
        case 50101:
          common_vendor.index.showToast({
            title: e.result.msg,
            icon: "none",
            duration: 2e3
          });
          break;
        default:
          console.log("code\u7684\u503C\u662F\uFF1A" + e.result.code, "\u53EF\u4EE5\u5728\u4E0A\u9762\u6DFB\u52A0case\uFF0C\u81EA\u52A8\u5904\u7406\u54CD\u5E94\u4F53");
          break;
      }
      switch (e.result.errCode) {
        case "uni-id-token-not-exist":
          common_vendor.index.showToast({
            title: "\u767B\u5F55\u4FE1\u606F\u5931\u6548",
            icon: "none"
          });
          common_vendor.index.navigateTo({
            url: "/pages/ucenter/login-page/index/index"
          });
          break;
      }
    }
  });
  const {
    "router": {
      needLogin,
      visitor,
      login
    }
  } = uniStarter_config.config;
  let list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
  list.forEach((item) => {
    common_vendor.index.addInterceptor(item, {
      invoke(e) {
        const token = common_vendor.index.getStorageSync("uni_id_token"), tokenExpired = common_vendor.index.getStorageSync("uni_id_token_expired") < Date.now(), url = e.url.split("?")[0];
        const pages = getCurrentPages();
        if (!pages.length) {
          console.log("\u9996\u9875\u542F\u52A8\u8C03\u7528\u4E86");
          return e;
        }
        const fromUrl = pages[pages.length - 1].route;
        let inLoginPage = fromUrl.split("/")[2] == "login-page";
        if (url == "/pages/ucenter/login-page/index/index" && !inLoginPage) {
          if (login[0] == "username") {
            e.url = "/pages/ucenter/login-page/pwd-login/pwd-login";
          } else {
            if (e.url == url) {
              e.url += "?";
            }
            e.url += "type=" + login[0];
          }
        } else {
          let pass = true;
          if (needLogin) {
            pass = needLogin.every((item2) => {
              if (typeof item2 == "object" && item2.pattern) {
                return !item2.pattern.test(url);
              }
              return url != item2;
            });
          }
          if (visitor) {
            pass = visitor.some((item2) => {
              if (typeof item2 == "object" && item2.pattern) {
                return item2.pattern.test(url);
              }
              return url == item2;
            });
          }
          if (!pass && (token == "" || tokenExpired)) {
            common_vendor.index.showToast({
              title: "\u8BF7\u5148\u767B\u5F55",
              icon: "none"
            });
            common_vendor.index.navigateTo({
              url: "/pages/ucenter/login-page/index/index"
            });
            return false;
          }
        }
        return e;
      },
      fail(err) {
        console.log(err);
        if (debug) {
          console.log(err);
          common_vendor.index.showModal({
            content: JSON.stringify(err),
            showCancel: false
          });
        }
      }
    });
  });
}
async function getDeviceInfo() {
  let deviceInfo = {
    "uuid": "",
    "vendor": "",
    "push_clientid": "",
    "imei": "",
    "oaid": "",
    "idfa": "",
    "model": "",
    "platform": ""
  };
  const {
    model,
    platform
  } = common_vendor.index.getSystemInfoSync();
  Object.assign(deviceInfo, {
    model,
    platform
  });
  return deviceInfo;
}
exports.initApp = initApp;
