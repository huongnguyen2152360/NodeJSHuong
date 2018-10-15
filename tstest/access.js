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
var khoahoc = /** @class */ (function () {
    function khoahoc(id, ten, dodai) {
        this.id = id;
        this.ten = ten;
        this.dodai = dodai;
    }
    khoahoc.prototype.xemkhoahoc = function () {
        // console.log(this.ten);
        console.log("\n        ID: " + this.id + ",\n        T\u00EAn kh\u00F3a h\u1ECDc: " + this.ten + ",\n        \u0110\u1ED9 d\u00E0i kh\u00F3a h\u1ECDc: " + this.dodai + " ti\u1EBFng.\n        ");
    };
    khoahoc.prototype.test2 = function () {
        // console.log(this.ten);
    };
    return khoahoc;
}());
var khoalaptrinh = /** @class */ (function (_super) {
    __extends(khoalaptrinh, _super);
    function khoalaptrinh(id, ten, dodai, filedinhkem) {
        var _this = _super.call(this, id, ten, dodai) || this;
        _this.filedinhkem = filedinhkem;
        return _this;
    }
    khoalaptrinh.prototype.xemkhoahoc = function () {
        _super.prototype.xemkhoahoc.call(this);
        console.log("       File \u0111\u00EDnh k\u00E8m: " + this.filedinhkem);
    };
    khoalaptrinh.prototype.test1 = function () {
        // console.log(this.ten);
    };
    return khoalaptrinh;
}(khoahoc));
// test public
// public trong class
var khoa08 = new khoahoc(8, "hoc lam banh", 10);
var khoa09 = new khoalaptrinh(9, "front end co ban", 24, "a.zip");
// khoa09.test1();
// khoa08.test2();
var hero = /** @class */ (function () {
    function hero(_ten) {
        this._ten = _ten;
    }
    Object.defineProperty(hero.prototype, "ten", {
        // Lấy dữ liệu
        get: function () {
            // xử lý bảo mật ...
            // nếu ok thì return
            return this._ten;
        },
        // Thay đổi dữ liệu
        set: function (v) {
            this._ten = v;
        },
        enumerable: true,
        configurable: true
    });
    return hero;
}());
var zeus = new hero("Zeus");
// console.log("Gioi thieu tuong: " + zeus.ten);
zeus.ten = "than Zeus";
// console.log("Ten tuong sau khi doi la: " + zeus.ten);
// Sử dụng mật khẩu vs accessor
var matkhau = "So dien thoai nguoi so 1";
var Nguoi = /** @class */ (function () {
    function Nguoi(_ten) {
        this._ten = _ten;
    }
    Object.defineProperty(Nguoi.prototype, "ten", {
        get: function () {
            if (matkhau == "So dien thoai nguoi so 1") {
                return this._ten;
            }
            else {
                return "Sai mat khau roi em eiii";
            }
        },
        set: function (v) {
            if (matkhau == "So dien thoai nguoi so 1") {
                this._ten = v;
            }
            else {
                this._ten = "Sai mat khau";
            }
        },
        enumerable: true,
        configurable: true
    });
    return Nguoi;
}());
var nguoiso1 = new Nguoi();
// Su dung setter
matkhau = "so dien thoai 2";
nguoiso1.ten = "Heyo";
// Su dung getter
console.log(nguoiso1.ten);
