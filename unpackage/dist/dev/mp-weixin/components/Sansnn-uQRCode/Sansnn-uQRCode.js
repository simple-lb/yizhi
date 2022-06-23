"use strict";
var common_vendor = require("../../common/vendor.js");
var components_SansnnUQRCode_uqrcode = require("./uqrcode.js");
const _sfc_main = {
  props: {
    cid: {
      type: String,
      default() {
        return Date.now() + Math.random() + "";
      }
    },
    text: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: common_vendor.index.upx2px(200)
    },
    margin: {
      type: Number,
      default: 0
    },
    backgroundColor: {
      type: String,
      default: "#ffffff"
    },
    foregroundColor: {
      type: String,
      default: "#000000"
    },
    backgroundImage: {
      type: String
    },
    logo: {
      type: String
    },
    makeOnLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  mounted() {
    if (this.makeOnLoad) {
      this.make();
    }
  },
  methods: {
    async make() {
      var options = {
        canvasId: this.cid,
        componentInstance: this,
        text: this.text,
        size: this.size,
        margin: this.margin,
        backgroundColor: this.backgroundImage ? "rgba(255,255,255,0)" : this.backgroundColor,
        foregroundColor: this.foregroundColor
      };
      var filePath = await this.makeSync(options);
      if (this.backgroundImage) {
        filePath = await this.drawBackgroundImageSync(filePath);
      }
      if (this.logo) {
        filePath = await this.drawLogoSync(filePath);
      }
      this.makeComplete(filePath);
    },
    makeComplete(filePath) {
      this.$emit("makeComplete", filePath);
    },
    drawBackgroundImage(options) {
      var ctx = common_vendor.index.createCanvasContext(this.cid, this);
      ctx.drawImage(this.backgroundImage, 0, 0, this.size, this.size);
      ctx.drawImage(options.filePath, 0, 0, this.size, this.size);
      ctx.draw(false, () => {
        common_vendor.index.canvasToTempFilePath({
          canvasId: this.cid,
          success: (res) => {
            options.success && options.success(res.tempFilePath);
          },
          fail: (error) => {
            options.fail && options.fail(error);
          }
        }, this);
      });
    },
    async drawBackgroundImageSync(filePath) {
      return new Promise((resolve, reject) => {
        this.drawBackgroundImage({
          filePath,
          success: (res) => {
            resolve(res);
          },
          fail: (error) => {
            reject(error);
          }
        });
      });
    },
    fillRoundRect(ctx, r, x, y, w, h) {
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      ctx.arc(w - r, h - r, r, 0, Math.PI / 2);
      ctx.lineTo(r, h);
      ctx.arc(r, h - r, r, Math.PI / 2, Math.PI);
      ctx.lineTo(0, r);
      ctx.arc(r, r, r, Math.PI, Math.PI * 3 / 2);
      ctx.lineTo(w - r, 0);
      ctx.arc(w - r, r, r, Math.PI * 3 / 2, Math.PI * 2);
      ctx.lineTo(w, h - r);
      ctx.closePath();
      ctx.setFillStyle("#ffffff");
      ctx.fill();
      ctx.restore();
    },
    drawLogo(options) {
      var ctx = common_vendor.index.createCanvasContext(this.cid, this);
      ctx.drawImage(options.filePath, 0, 0, this.size, this.size);
      var logoSize = this.size / 4;
      var logoX = this.size / 2 - logoSize / 2;
      var logoY = logoX;
      var borderSize = logoSize + 10;
      var borderX = this.size / 2 - borderSize / 2;
      var borderY = borderX;
      var borderRadius = 5;
      this.fillRoundRect(ctx, borderRadius, borderX, borderY, borderSize, borderSize);
      ctx.drawImage(this.logo, logoX, logoY, logoSize, logoSize);
      ctx.draw(false, () => {
        common_vendor.index.canvasToTempFilePath({
          canvasId: this.cid,
          success: (res) => {
            options.success && options.success(res.tempFilePath);
          },
          fail: (error) => {
            options.fail && options.fail(error);
          }
        }, this);
      });
    },
    async drawLogoSync(filePath) {
      return new Promise((resolve, reject) => {
        this.drawLogo({
          filePath,
          success: (res) => {
            resolve(res);
          },
          fail: (error) => {
            reject(error);
          }
        });
      });
    },
    async makeSync(options) {
      return new Promise((resolve, reject) => {
        components_SansnnUQRCode_uqrcode.uQRCode.make({
          canvasId: options.canvasId,
          componentInstance: options.componentInstance,
          text: options.text,
          size: options.size,
          margin: options.margin,
          backgroundColor: options.backgroundColor,
          foregroundColor: options.foregroundColor,
          success: (res) => {
            resolve(res);
          },
          fail: (error) => {
            reject(error);
          }
        });
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.cid,
    b: $props.cid,
    c: `${$props.size}px`,
    d: `${$props.size}px`
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/22753/Documents/HBuilderProjects/uni-starter/components/Sansnn-uQRCode/Sansnn-uQRCode.vue"]]);
wx.createComponent(Component);
