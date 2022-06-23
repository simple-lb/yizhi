"use strict";
function callCheckVersion() {
  return new Promise((resolve, reject) => {
    reject({
      message: "\u8BF7\u5728App\u4E2D\u4F7F\u7528"
    });
  });
}
exports.callCheckVersion = callCheckVersion;
