"use strict";
var __defProp = Object.defineProperty;
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
var common_vendor = require("../../common/vendor.js");
const statusBar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar.js";
const _sfc_main = {
  components: {
    statusBar
  },
  data() {
    return {
      gridList: [],
      current: 0,
      swiperDotIndex: 0
    };
  },
  computed: __spreadValues({}, common_vendor.mapGetters({
    hasLogin: "user/hasLogin"
  })),
  onLoad() {
    let gridList = [];
    for (var i = 0; i < 3; i++) {
      gridList.push(this.$t("grid.visibleToAll"));
    }
    for (var i = 0; i < 3; i++) {
      gridList.push(this.$t("grid.invisibleToTourists"));
    }
    for (var i = 0; i < 3; i++) {
      gridList.push(this.$t("grid.adminVisible"));
    }
    this.gridList = gridList;
  },
  methods: {
    change(e) {
      common_vendor.index.showToast({
        title: this.$t("grid.clickTip") + ` ${e.detail.index} ` + this.$t("grid.clickTipGrid"),
        icon: "none"
      });
    },
    onqueryload(data) {
    },
    changeSwiper(e) {
      this.current = e.detail.current;
    },
    clickItem(e) {
      this.swiperDotIndex = e;
    },
    clickBannerItem(item) {
      if (item.open_url) {
        common_vendor.index.navigateTo({
          url: "/pages/common/webview/webview?url=" + item.open_url + "&title=" + item.title,
          success: (res) => {
          },
          fail: () => {
          },
          complete: () => {
          }
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_swiper_dot2 = common_vendor.resolveComponent("uni-swiper-dot");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  (_easycom_uni_swiper_dot2 + _easycom_unicloud_db2 + _easycom_uni_section2 + _easycom_uni_grid_item2 + _easycom_uni_grid2)();
}
const _easycom_uni_swiper_dot = () => "../../uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.js";
const _easycom_unicloud_db = () => "../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
const _easycom_uni_section = () => "../../components/uni-section/uni-section.js";
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
if (!Math) {
  (_easycom_uni_swiper_dot + _easycom_unicloud_db + _easycom_uni_section + _easycom_uni_grid_item + _easycom_uni_grid)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.w(({
      data,
      loading,
      error,
      options
    }, s0, i0) => {
      return common_vendor.e({
        a: !(loading || data.length)
      }, !(loading || data.length) ? {} : {
        b: common_vendor.f(data, (item, index, i1) => {
          return {
            a: item.bannerfile.url,
            b: common_vendor.o(($event) => $options.clickBannerItem(item)),
            c: item._id
          };
        }),
        c: common_vendor.o((...args) => $options.changeSwiper && $options.changeSwiper(...args)),
        d: $data.swiperDotIndex,
        e: common_vendor.o($options.clickItem),
        f: "f4a9ff92-1-" + i0 + ",f4a9ff92-0",
        g: common_vendor.p({
          info: data,
          current: $data.current,
          field: "content"
        })
      }, {
        h: i0,
        i: s0
      });
    }, {
      name: "d",
      path: "a",
      vueId: "f4a9ff92-0"
    }),
    b: common_vendor.sr("bannerdb", "f4a9ff92-0"),
    c: common_vendor.o($options.onqueryload),
    d: common_vendor.p({
      collection: "opendb-banner",
      field: "_id,bannerfile,open_url,title"
    }),
    e: common_vendor.p({
      title: _ctx.$t("grid.grid"),
      type: "line"
    }),
    f: common_vendor.f($data.gridList, (item, i, i0) => {
      return common_vendor.e({
        a: i < 3 || i > 2 && i < 6 && _ctx.hasLogin || i > 5 && _ctx.uniIDHasRole("admin")
      }, i < 3 || i > 2 && i < 6 && _ctx.hasLogin || i > 5 && _ctx.uniIDHasRole("admin") ? {
        b: "/static/grid/c" + (i + 1) + ".png",
        c: common_vendor.t(item),
        d: i,
        e: "f4a9ff92-4-" + i0 + ",f4a9ff92-3",
        f: common_vendor.p({
          index: i
        })
      } : {});
    }),
    g: common_vendor.o($options.change),
    h: common_vendor.p({
      column: 3,
      highlight: true
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/22753/Documents/HBuilderProjects/uni-starter/pages/grid/grid.vue"]]);
wx.createPage(MiniProgramPage);
