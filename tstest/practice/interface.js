function xemtt(motnguoi) {
    console.log("Xin chao, toi la " + motnguoi.ten + ", " + motnguoi.tuoi + " tuoi.");
}
var tuong = /** @class */ (function () {
    function tuong() {
    }
    tuong.prototype.xemtuong = function () {
        console.log("xem tuong");
    };
    tuong.prototype.donkynang = function (mau) {
        return "don ky nang";
    };
    tuong.prototype.bienve = function () {
        console.log("bien ve");
    };
    return tuong;
}());
