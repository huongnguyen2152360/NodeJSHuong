var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Giống bản nháp mô tả tính năng của class
var dienthoaii = /** @class */ (function () {
    function dienthoaii() {
    }
    return dienthoaii;
}());
// Chính xác hóa bằng tặng 1 class sử dụng bản thiết kế abstract
var android = /** @class */ (function (_super) {
    __extends(android, _super);
    function android() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    android.prototype.guitinnhan = function () {
        console.log("Gui tin nhan trong android");
    };
    android.prototype.goidienthoai = function () {
        return "Goi dien thoai bang android";
    };
    return android;
}(dienthoaii));
var samsung = new android();
samsung.guitinnhan();
console.log(samsung.goidienthoai());
