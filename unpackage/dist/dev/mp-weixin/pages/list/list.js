"use strict";
var common_vendor = require("../../common/vendor.js");
var uni_modules_jsonGps_js_sdk_gps = require("../../uni_modules/json-gps/js_sdk/gps.js");
let cdbRef;
const statusBar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar.js";
const gps = new uni_modules_jsonGps_js_sdk_gps.Gps(), db = common_vendor.Rt.database();
const _sfc_main = {
  components: {
    statusBar
  },
  computed: {
    inputPlaceholder(e) {
      if (common_vendor.index.getStorageSync("CURRENT_LANG") == "en") {
        return "Please enter the search content";
      } else {
        return "\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9";
      }
    },
    colList() {
      return [
        db.collection("opendb-news-articles").where(this.where).field("avatar,title,last_modify_date,user_id").getTemp(),
        db.collection("uni-id-users").field("_id,username").getTemp()
      ];
    }
  },
  data() {
    return {
      where: '"article_status" == 1',
      keyword: "",
      showRefresh: false,
      listHight: 0
    };
  },
  watch: {
    keyword(keyword, oldValue) {
      let where = '"article_status" == 1 ';
      if (keyword) {
        this.where = where + `&& /${keyword}/.test(title)`;
      } else {
        this.where = where;
      }
    }
  },
  async onReady() {
    this.listHight = "auto";
    cdbRef = this.$refs.udb;
  },
  async onShow() {
    this.keyword = getApp().globalData.searchText;
    getApp().globalData.searchText = "";
    let location = await gps.getLocation({
      geocode: true
    });
    console.log(location);
  },
  methods: {
    searchClick(e) {
      common_vendor.index.hideKeyboard();
      common_vendor.index.navigateTo({
        url: "/pages/list/search/search",
        animationType: "fade-in"
      });
    },
    retry() {
      this.refresh();
    },
    refresh() {
      cdbRef.loadData({
        clear: true
      }, () => {
        common_vendor.index.stopPullDownRefresh();
        console.log("end");
      });
      console.log("refresh");
    },
    loadMore() {
      cdbRef.loadMore();
    },
    onqueryerror(e) {
      console.error(e);
    },
    onpullingdown(e) {
      console.log(e);
      this.showRefresh = true;
      if (e.pullingDistance > 100) {
        this.refresh();
      }
    }
  },
  onPullDownRefresh() {
    this.refresh();
  },
  onReachBottom() {
    this.loadMore();
  }
};
if (!Array) {
  const _component_statusBar = common_vendor.resolveComponent("statusBar");
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_swiper_dot2 = common_vendor.resolveComponent("uni-swiper-dot");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_load_state2 = common_vendor.resolveComponent("uni-load-state");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_component_statusBar + _easycom_uni_search_bar2 + _easycom_uni_swiper_dot2 + _easycom_unicloud_db2 + _easycom_uni_card2 + _easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_uni_list_item2 + _easycom_uni_load_state2 + _easycom_uni_list2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_swiper_dot = () => "../../uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.js";
const _easycom_unicloud_db = () => "../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_load_state = () => "../../components/uni-load-state/uni-load-state.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_swiper_dot + _easycom_unicloud_db + _easycom_uni_card + _easycom_uni_icons + _easycom_uni_dateformat + _easycom_uni_list_item + _easycom_uni_load_state + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.sr("searchBar", "2e5f5418-1"),
    b: common_vendor.o(($event) => $data.keyword = $event),
    c: common_vendor.p({
      radius: "100",
      cancelButton: "none",
      disabled: true,
      placeholder: $options.inputPlaceholder,
      modelValue: $data.keyword
    }),
    d: common_vendor.o((...args) => $options.searchClick && $options.searchClick(...args)),
    e: common_vendor.w(({
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
            b: common_vendor.o(($event) => _ctx.clickBannerItem(item)),
            c: item._id
          };
        }),
        c: common_vendor.o((...args) => _ctx.changeSwiper && _ctx.changeSwiper(...args)),
        d: _ctx.swiperDotIndex,
        e: common_vendor.o(_ctx.clickItem),
        f: "2e5f5418-4-" + i0 + ",2e5f5418-3",
        g: common_vendor.p({
          info: data,
          current: _ctx.current,
          field: "content"
        })
      }, {
        h: i0,
        i: s0
      });
    }, {
      name: "d",
      path: "e",
      vueId: "2e5f5418-3,2e5f5418-2"
    }),
    f: common_vendor.sr("bannerdb", "2e5f5418-3,2e5f5418-2"),
    g: common_vendor.o(_ctx.onqueryload),
    h: common_vendor.p({
      collection: "opendb-banner",
      field: "_id,bannerfile,open_url,title"
    }),
    i: common_vendor.p({
      title: "\u57FA\u7840\u5361\u7247",
      extra: "\u989D\u5916\u4FE1\u606F",
      thumbnail: "/static/tabbar/grid_active.png",
      isFull: "true"
    }),
    j: common_vendor.p({
      type: "pengyouquan",
      size: "18",
      color: "#999"
    }),
    k: common_vendor.o(($event) => _ctx.actionsClick("\u5206\u4EAB")),
    l: common_vendor.p({
      type: "heart",
      size: "18",
      color: "#999"
    }),
    m: common_vendor.o(($event) => _ctx.actionsClick("\u70B9\u8D5E")),
    n: common_vendor.p({
      type: "chatbubble",
      size: "18",
      color: "#999"
    }),
    o: common_vendor.o(($event) => _ctx.actionsClick("\u8BC4\u8BBA")),
    p: common_vendor.p({
      cover: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
    }),
    q: common_vendor.w(({
      data,
      pagination,
      hasMore,
      loading,
      error,
      options
    }, s0, i0) => {
      return {
        a: common_vendor.f(data, (item, index, i1) => {
          return {
            a: item.avatar,
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.user_id[0] ? item.user_id[0].username : ""),
            d: "2e5f5418-12-" + i0 + "-" + i1 + "," + ("2e5f5418-11-" + i0 + "-" + i1),
            e: common_vendor.p({
              date: item.last_modify_date,
              format: "yyyy-MM-dd",
              threshold: [6e4, 2592e6]
            }),
            f: index,
            g: "2e5f5418-11-" + i0 + "-" + i1 + "," + ("2e5f5418-10-" + i0),
            h: common_vendor.p({
              to: "/pages/list/detail?id=" + item._id + "&title=" + item.title
            })
          };
        }),
        b: "2e5f5418-13-" + i0 + "," + ("2e5f5418-10-" + i0),
        c: common_vendor.p({
          state: {
            data,
            pagination,
            hasMore,
            loading,
            error
          }
        }),
        d: "2e5f5418-10-" + i0 + ",2e5f5418-9",
        e: i0,
        f: s0
      };
    }, {
      name: "d",
      path: "q",
      vueId: "2e5f5418-9"
    }),
    r: common_vendor.o($options.refresh),
    s: common_vendor.o($options.loadMore),
    t: $data.listHight,
    v: common_vendor.p({
      border: false
    }),
    w: common_vendor.sr("udb", "2e5f5418-9"),
    x: common_vendor.o($options.onqueryerror),
    y: common_vendor.p({
      collection: $options.colList,
      ["page-size"]: 10
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2e5f5418"], ["__file", "C:/Users/22753/Documents/HBuilderProjects/uni-starter/pages/list/list.nvue"]]);
wx.createPage(MiniProgramPage);
