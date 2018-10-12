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
var nhanvatgame = /** @class */ (function () {
    // de tao ra instance
    function nhanvatgame(ten_nhanvat, slogan, mau) {
        this.ten_nhanvat = ten_nhanvat;
        this.slogan = slogan;
        this.mau = mau;
    }
    nhanvatgame.prototype.chay = function () { };
    ;
    nhanvatgame.prototype.chem = function () { };
    ;
    nhanvatgame.prototype.hienthiten = function () {
        return "Nh\u00E2n v\u1EADt: " + this.ten_nhanvat + ", Slogan: " + this.slogan + ", Ch\u1EC9 s\u1ED1 m\u00E1u: " + this.mau;
    };
    return nhanvatgame;
}());
var nhanvat1 = new nhanvatgame("Irelia", "Ý chí của lưỡi kiếm", 697.2);
// console.log(nhanvat1.hienthiten());
var dienthoai = /** @class */ (function () {
    function dienthoai(ten, gia, sao, mausac) {
        this.ten = ten;
        this.gia = gia;
        this.sao = sao;
        this.mausac = mausac;
    }
    dienthoai.prototype.showInfo = function () {
        return "S\u1EA3n ph\u1EA9m " + this.ten + " c\u00F3 gi\u00E1 " + this.gia + " VN\u0110. Rate: " + this.sao + ". M\u00E0u s\u1EAFc: " + this.mausac + ".";
    };
    return dienthoai;
}());
var sp1 = new dienthoai("Samsung S9", 21000, 4.5, ["xanh", "ghi", "tím"]);
// console.log(sp1.showInfo());
// Tao tuong
var tuong = /** @class */ (function () {
    function tuong(ten, motatuong, kynang) {
        this.ten = ten;
        this.motatuong = motatuong;
        this.kynang = kynang;
    }
    tuong.prototype.showThongtin = function () {
        var skill = '';
        for (var i = 0; i < this.kynang.length; i++) {
            skill += this.kynang[i];
            skill += " | ";
        }
        var thongsotuong = "\n        T\u00EAn t\u01B0\u1EDBng: " + this.ten + ";\n        M\u00F4 t\u1EA3 t\u01B0\u1EDBng: " + this.motatuong + ";\n        K\u1EF9 n\u0103ng: " + skill + ";\n        ";
        console.log(thongsotuong);
    };
    return tuong;
}());
var SatThu = /** @class */ (function (_super) {
    __extends(SatThu, _super);
    function SatThu(ten, motatuong, kynang, donsatthu) {
        var _this = _super.call(this, ten, motatuong, kynang) || this;
        _this.donsatthu = donsatthu;
        return _this;
    }
    SatThu.prototype.showThongtin = function () {
        _super.prototype.showThongtin.call(this); // Sử dụng lại super của class cha
        // nhưng thêm phần của con
        console.log("        \u0110\u00F2n s\u00E1t th\u1EE7: " + this.donsatthu);
    };
    return SatThu;
}(tuong));
var ashes = new tuong('Ashes', 'Cung Băng', ['Skill 1', 'Skill 2', ' Skill 3']);
ashes.showThongtin();
var ahri = new tuong("Ahri", "Ho li 9 duoi", ['Skill 1', 'Skill 2', ' Skill 3']);
ahri.showThongtin();
var talon = new SatThu("Talon", "Sat thu bong dem", ['Skill 1', 'Skill 2', ' Skill 3'], "sat thu vo hinh");
talon.showThongtin();
