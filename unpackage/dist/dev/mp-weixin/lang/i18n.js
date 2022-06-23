"use strict";
var common_vendor = require("../common/vendor.js");
var lang_en = require("./en.js");
var lang_zhHans = require("./zh-Hans.js");
var uniStarter_config = require("../uni-starter.config.js");
const { i18n: { enable: i18nEnable } } = uniStarter_config.config;
const messages = {
  "en": lang_en.langEn,
  "zh-Hans": lang_zhHans.zhHans
};
let currentLang;
if (i18nEnable) {
  currentLang = common_vendor.index.getStorageSync("CURRENT_LANG");
} else {
  currentLang = "zh-Hans";
}
if (!currentLang) {
  if (common_vendor.index.getLocale) {
    console.log("\u83B7\u53D6\u5E94\u7528\u8BED\u8A00:", common_vendor.index.getLocale());
    let language = "en";
    if (common_vendor.index.getLocale() != "en") {
      language = "zh-Hans";
    }
    common_vendor.index.setStorageSync("CURRENT_LANG", language);
    currentLang = language;
  } else {
    common_vendor.index.getSystemInfo({
      success: function(res) {
        console.log("\u83B7\u53D6\u8BBE\u5907\u4FE1\u606F:", res);
        let language = "zh-Hans";
        if (res.language == "en") {
          language = "en";
        }
        common_vendor.index.setStorageSync("CURRENT_LANG", language);
        currentLang = language;
      },
      fail: (err) => {
        console.error(err);
      }
    });
  }
}
let i18nConfig = {
  locale: currentLang,
  messages
};
const i18n = common_vendor.createI18n(i18nConfig);
if (i18nEnable) {
  console.log(`
	\u4F60\u5DF2\u5F00\u542F\u591A\u8BED\u8A00\u56FD\u9645\u5316\uFF0C\u5C06\u81EA\u52A8\u6839\u636E\u8BED\u8A00\u83B7\u53D6\u3010lang/en.js\u3011\u6216\u3010lang/en.js\u3011\u6587\u4EF6\u4E2D\u914D\u7F6E\u7684tabbar\u7684\u503C\uFF0C
	\u8986\u76D6\u4F60\u5728pages.json\u4E2D\u7684tabbar\u7684\u503C
	\u5982\u679C\u4F60\u4E0D\u9700\u8981\u591A\u8BED\u8A00\u56FD\u9645\u5316\uFF0C\u8BF7\u6253\u5F00\u914D\u7F6E\u6587\u4EF6uni-starter.config.js\u627E\u5230 -> i18n -> enable\u628A\u503C\u8BBE\u7F6E\u4E3Afalse
`);
  let initLanguageAfter = () => {
    function $i18n(e) {
      return i18n.global.messages[i18n.global.locale][e];
    }
    setTimeout(function() {
      $i18n("tabbar").split(",").forEach((text, index) => {
        common_vendor.index.setTabBarItem({
          index,
          text,
          complete: (e) => {
          }
        });
      });
    }, 1);
    let agreementsTitle = $i18n("agreementsTitle").split(",");
    let agreements = uniStarter_config.config.about.agreements;
    agreements[0].title = agreementsTitle[0];
    agreements[1].title = agreementsTitle[1];
    uniStarter_config.config.about.agreements = agreements;
  };
  initLanguageAfter();
  common_vendor.index.$on("changeLanguage", (e) => {
    console.log("changeLanguage", e);
    initLanguageAfter();
  });
}
exports.i18n = i18n;
