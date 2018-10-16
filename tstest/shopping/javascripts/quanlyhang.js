"use strict";
exports.__esModule = true;
var sanpham_1 = require("./sanpham");
var QuanlyHang = /** @class */ (function () {
    function QuanlyHang() {
        this.hang = sanpham_1.SanPham[] = [];
    }
    QuanlyHang.prototype.getCacSanPham = function () {
        return [];
    };
    QuanlyHang.prototype.getSanPhambyID = function () {
        var motsanpham = new sanpham_1.SanPham(1, "sp1", 90000, "mo ta", true, "https://pipe.tikicdn.com/cache/200x200/media/catalog/product/0/_/0.u5395.d20170720.t120412.710696.jpg");
        return motsanpham;
    };
    QuanlyHang.prototype.addSanPham = function () { };
    QuanlyHang.prototype.showSanPham = function () {
        return '';
    };
    return QuanlyHang;
}());
