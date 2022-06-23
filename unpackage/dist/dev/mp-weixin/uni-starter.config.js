"use strict";
var config = {
  "debug": false,
  "h5": {
    "url": "https://uni-starter.dcloud.net.cn"
  },
  "mp": {
    "weixin": {
      "id": "gh_33446d7f7a26"
    }
  },
  "router": {
    "visitor": [
      "/",
      { "pattern": /^\/pages\/list.*/ },
      { "pattern": /^\/pages\/ucenter\/login-page.*/ },
      "/pages/common/webview/webview",
      "/pages/grid/grid",
      "/pages/ucenter/ucenter",
      "/pages/ucenter/about/about",
      "/pages/ucenter/settings/settings"
    ],
    "login": ["weixin", "univerify", "username", "smsCode", "apple"]
  },
  "about": {
    "appName": "uni-starter",
    "logo": "/static/logo.png",
    "company": "\u5317\u4EACxx\u7F51\u7EDC\u6280\u672F\u6709\u9650\u516C\u53F8",
    "slogan": "\u4E91\u7AEF\u4E00\u4F53\u5E94\u7528\u5FEB\u901F\u5F00\u53D1\u6A21\u7248",
    "agreements": [
      {
        "title": "\u7528\u6237\u670D\u52A1\u534F\u8BAE",
        "url": "\u8BF7\u586B\u5199\u7528\u6237\u670D\u52A1\u534F\u8BAE\u94FE\u63A5"
      },
      {
        "title": "\u9690\u79C1\u653F\u7B56",
        "url": "\u8BF7\u586B\u5199\u9690\u79C1\u653F\u7B56\u94FE\u63A5"
      }
    ],
    "download": "",
    "version": "1.0.0"
  },
  "download": {
    "ios": "https://itunes.apple.com/cn/app/hello-uni-app/id1417078253?mt=8",
    "android": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-97fca9f2-41f6-449f-a35e-3f135d4c3875/6d754387-a6c3-48ed-8ad2-e8f39b40fc01.apk"
  },
  "marketId": {
    "ios": "id1417078253",
    "android": "123456"
  },
  "i18n": {
    "enable": false
  }
};
exports.config = config;
