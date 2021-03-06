"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var search_1 = require("./search");
function CubicBezier(p1x, p1y, p2x, p2y, res) {
    if (res === void 0) { res = 50; }
    var xList = [];
    var tList = [];
    p1y = 1 - p1y;
    p2y = 1 - p2y;
    for (var i = 0; i <= res; i++) {
        var t = i / res;
        xList.push(bezier(t, 0, p1x, p2x, 1));
        tList.push(t);
    }
    return function (x) {
        x = x < 0 ? 0 : x > 1 ? 1 : x;
        var i = search_1.default(xList, res, x);
        var ax = xList[i];
        var bx = xList[i + 1];
        var at = tList[i];
        var bt = tList[i + 1];
        return 1 - bezier(
        //tを計算
        (x - ax) / (bx - ax) * (bt - at) + at, 
        //yを求める
        1, p1y, p2y, 0);
    };
}
module.exports = CubicBezier; module.exports.default = CubicBezier; exports.default = CubicBezier;
// maximaで求めたらこうなったベジェ関数。
function bezier(t, p0, p1, p2, p3) {
    var mt = 1 - t;
    return p3 * t * t * t + 3 * mt * p2 * t * t + 3 * mt * mt * p1 * t + mt * mt * mt * p0;
}
