"use strict";
var common_vendor = require("../../common/vendor.js");
function debounce(func, wait) {
  let timer;
  wait = wait || 500;
  return function() {
    let context = this;
    let args = arguments;
    if (timer)
      clearTimeout(timer);
    let callNow = !timer;
    timer = setTimeout(() => {
      timer = null;
    }, wait);
    if (callNow)
      func.apply(context, args);
  };
}
const _sfc_main = {
  name: "uni-send-sms-code",
  props: {
    count: {
      type: [String, Number],
      default: 60
    },
    phone: {
      type: [String, Number],
      default: ""
    },
    codeType: {
      type: String,
      default() {
        return "login";
      }
    }
  },
  data() {
    return {
      reverseNumber: 0,
      reverseTimer: null
    };
  },
  computed: {
    innerText() {
      if (this.reverseNumber == 0)
        return this.$t("common.getVerifyCode");
      return this.$t("smsCode.resendVerifyCode") + "(" + this.reverseNumber + "s)";
    }
  },
  created() {
    this.initClick();
  },
  methods: {
    initClick() {
      this.start = debounce(() => {
        if (this.reverseNumber != 0)
          return;
        this.sendMsg();
      });
    },
    sendMsg() {
      let reg_phone = /^1\d{10}$/;
      if (!reg_phone.test(this.phone))
        return common_vendor.index.showToast({
          title: this.$t("smsCode.phoneErrTip"),
          icon: "none"
        });
      common_vendor.Rt.callFunction({
        name: "uni-id-cf",
        data: {
          action: "sendSmsCode",
          params: {
            "mobile": this.phone,
            "type": this.codeType
          }
        },
        success: ({ result }) => {
          console.log(result);
          if (result.code === 0) {
            common_vendor.index.showToast({
              title: this.$t("smsCode.sendSuccessTip"),
              icon: "none"
            });
            this.reverseNumber = Number(this.count);
            this.getCode();
            this.$emit("getCode");
          } else {
            common_vendor.index.showModal({
              content: result.msg,
              showCancel: false
            });
          }
        }
      });
    },
    getCode() {
      if (this.reverseNumber == 0) {
        clearTimeout(this.reverseTimer);
        this.reverseTimer = null;
        return;
      }
      this.reverseNumber--;
      this.reverseTimer = setTimeout(() => {
        this.getCode();
      }, 1e3);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($options.innerText),
    b: common_vendor.n($data.reverseNumber == 0 ? "inner-text-active" : ""),
    c: common_vendor.o((...args) => _ctx.start && _ctx.start(...args))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6e7445d8"], ["__file", "C:/Users/22753/Documents/HBuilderProjects/uni-starter/components/uni-send-sms-code/uni-send-sms-code.vue"]]);
wx.createComponent(Component);
