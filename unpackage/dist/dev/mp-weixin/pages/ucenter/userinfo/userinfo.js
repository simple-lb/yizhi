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
const db = common_vendor.Rt.database();
const usersTable = db.collection("uni-id-users");
const _sfc_main = {
  data() {
    return {
      univerifyStyle: {
        authButton: {
          "title": "\u672C\u673A\u53F7\u7801\u4E00\u952E\u7ED1\u5B9A"
        },
        otherLoginButton: {
          "title": "\u5176\u4ED6\u53F7\u7801\u7ED1\u5B9A"
        }
      }
    };
  },
  onLoad() {
    this.univerifyStyle.authButton.title = this.$t("userinfo.bindPhoneNumber");
    this.univerifyStyle.otherLoginButton.title = this.$t("userinfo.bindOtherLogin");
    common_vendor.index.setNavigationBarTitle({
      title: this.$t("userinfo.navigationBarTitle")
    });
  },
  computed: __spreadProps(__spreadValues({}, common_vendor.mapGetters({
    userInfo: "user/info",
    login: "user/hasLogin"
  })), {
    avatar_file() {
      if (this.userInfo.avatar_file && this.userInfo.avatar_file.url) {
        return this.userInfo.avatar_file;
      }
    }
  }),
  methods: __spreadProps(__spreadValues({}, common_vendor.mapMutations({
    setUserInfo: "user/login"
  })), {
    bindMobile() {
      this.$refs["uni-bindMobileByMpWeixin"].open();
    },
    univerify() {
      common_vendor.index.login({
        "provider": "univerify",
        "univerifyStyle": this.univerifyStyle,
        success: async (e) => {
          console.log(e.authResult);
          common_vendor.Rt.callFunction({
            name: "uni-id-cf",
            data: {
              action: "bindMobileByUniverify",
              params: e.authResult
            },
            success: ({
              result
            }) => {
              console.log(result);
              if (result.code === 0) {
                this.setUserInfo({
                  "mobile": result.mobile
                });
                common_vendor.index.closeAuthView();
              } else {
                common_vendor.index.showModal({
                  content: result.msg,
                  showCancel: false,
                  complete() {
                    common_vendor.index.closeAuthView();
                  }
                });
              }
            }
          });
        },
        fail: (err) => {
          console.log(err);
          if (err.code == "30002" || err.code == "30001") {
            this.bindMobileBySmsCode();
          }
        }
      });
    },
    bindMobileBySmsCode() {
      common_vendor.index.navigateTo({
        url: "/pages/ucenter/userinfo/bind-mobile/bind-mobile"
      });
    },
    setNickname(nickname) {
      console.log(nickname);
      if (nickname) {
        usersTable.where("_id==$env.uid").update({
          nickname
        }).then((e) => {
          console.log(e);
          if (e.result.updated) {
            common_vendor.index.showToast({
              title: this.$t("common.updateSucceeded"),
              icon: "none"
            });
            this.setUserInfo({
              nickname
            });
          } else {
            common_vendor.index.showToast({
              title: this.$t("userinfo.noChange"),
              icon: "none"
            });
          }
        });
        this.$refs.dialog.close();
      } else {
        this.$refs.dialog.open();
      }
    },
    setAvatarFile(avatar_file) {
      common_vendor.index.showLoading({
        title: this.$t("userinfo.setting"),
        mask: true
      });
      usersTable.where("_id==$env.uid").update({
        avatar_file
      }).then((res) => {
        console.log(res);
        if (avatar_file) {
          common_vendor.index.showToast({
            icon: "none",
            title: this.$t("userinfo.setSucceeded")
          });
        } else {
          common_vendor.index.showToast({
            icon: "none",
            title: this.$t("userinfo.deleteSucceeded")
          });
        }
        this.setUserInfo({
          avatar_file
        });
      }).catch((err) => {
        common_vendor.index.showModal({
          content: err.message || this.$t("userinfo.requestFail"),
          showCancel: false
        });
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    },
    uploadAvatarImg(res) {
      const crop = {
        quality: 100,
        width: 600,
        height: 600,
        resize: true
      };
      common_vendor.index.chooseImage({
        count: 1,
        crop,
        success: async (res2) => {
          console.log(res2);
          let tempFile = res2.tempFiles[0], avatar_file = {
            extname: tempFile.path.split(".")[tempFile.path.split(".").length - 1]
          }, filePath = res2.tempFilePaths[0];
          filePath = await new Promise((callback) => {
            common_vendor.index.navigateTo({
              url: "/pages/ucenter/userinfo/cropImage?path=" + filePath + `&options=${JSON.stringify(crop)}`,
              animationType: "fade-in",
              events: {
                success: (url) => {
                  callback(url);
                }
              }
            });
          });
          console.log(this.userInfo);
          let cloudPath = this.userInfo._id + "" + Date.now();
          avatar_file.name = cloudPath;
          common_vendor.index.showLoading({
            title: this.$t("userinfo.uploading"),
            mask: true
          });
          let {
            fileID
          } = await common_vendor.Rt.uploadFile({
            filePath,
            cloudPath,
            fileType: "image"
          });
          avatar_file.url = fileID;
          console.log({
            avatar_file
          });
          common_vendor.index.hideLoading();
          this.setAvatarFile(avatar_file);
        }
      });
    }
  })
};
if (!Array) {
  const _easycom_cloud_image2 = common_vendor.resolveComponent("cloud-image");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_bindMobileByMpWeixin2 = common_vendor.resolveComponent("uni-bindMobileByMpWeixin");
  (_easycom_cloud_image2 + _easycom_uni_icons2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_bindMobileByMpWeixin2)();
}
const _easycom_cloud_image = () => "../../../components/cloud-image/cloud-image.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_bindMobileByMpWeixin = () => "../../../components/uni-bindMobileByMpWeixin/uni-bindMobileByMpWeixin.js";
if (!Math) {
  (_easycom_cloud_image + _easycom_uni_icons + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_bindMobileByMpWeixin)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t(_ctx.$t("userinfo.ProfilePhoto")),
    b: $options.avatar_file
  }, $options.avatar_file ? {
    c: common_vendor.o($options.uploadAvatarImg),
    d: common_vendor.p({
      src: $options.avatar_file.url,
      width: "50px",
      height: "50px"
    })
  } : {
    e: common_vendor.o($options.uploadAvatarImg),
    f: common_vendor.p({
      type: "plusempty",
      size: "30",
      color: "#dddddd"
    })
  }, {
    g: common_vendor.o(($event) => $options.setNickname("")),
    h: common_vendor.p({
      title: _ctx.$t("userinfo.nickname"),
      rightText: _ctx.userInfo.nickname || _ctx.$t("userinfo.notSet"),
      link: true
    }),
    i: common_vendor.o($options.bindMobile),
    j: common_vendor.p({
      title: _ctx.$t("userinfo.phoneNumber"),
      rightText: _ctx.userInfo.mobile || _ctx.$t("userinfo.notSpecified"),
      link: true
    }),
    k: common_vendor.o($options.setNickname),
    l: common_vendor.p({
      mode: "input",
      value: _ctx.userInfo.nickname,
      title: _ctx.$t("userinfo.setNickname"),
      placeholder: _ctx.$t("userinfo.setNicknamePlaceholder")
    }),
    m: common_vendor.sr("dialog", "5c7bc061-6"),
    n: common_vendor.p({
      type: "dialog"
    }),
    o: common_vendor.sr("uni-bindMobileByMpWeixin", "5c7bc061-8")
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5c7bc061"], ["__file", "C:/Users/22753/Documents/HBuilderProjects/uni-starter/pages/ucenter/userinfo/userinfo.vue"]]);
wx.createPage(MiniProgramPage);
