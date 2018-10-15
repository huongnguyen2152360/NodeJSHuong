var x;
x = 10;
// console.log(x);
var hocvien;
hocvien = ['aa', 'tenso2', 'babieee'];
for (var i = 0; i < hocvien.length; i++) {
    // console.log(hocvien[i]);
}
var numbers = [2, 4, 5, 6, 8, 9];
for (var i_1 = 0; i_1 < numbers.length; i_1++) {
    // console.log(numbers[i]);
}
// kieu enum
var trangthaii;
(function (trangthaii) {
    trangthaii[trangthaii["married"] = 0] = "married";
    trangthaii[trangthaii["single"] = 1] = "single";
    trangthaii[trangthaii["unknown"] = 2] = "unknown";
})(trangthaii || (trangthaii = {}));
;
// console.log(trangthaii);
// kieu tuple
var tuple1 = ['hoten', 31, 'nghenghiep'];
// console.log(tuple1[0]);
// kieu any
var y;
y = {
    dongho: {
        giatien: 1000,
        mausac: 'do',
        xuatxu: 'china'
    }
};
// console.log(y.dongho.xuatxu);
//kieu du lieu void
// function thufunction():void {
//     console.log('kieu du lieu khong tra ve cai gi het, k return')
// }
// ép kiểu, có 2 cách
var epkieu;
epkieu = "Day la 1 vd ve ep kieu!";
// console.log((<string>epkieu).length);
// console.log((epkieu as string).length);
//function
function tinhtongg() {
    return 100 + 200;
}
// console.log(tinhtongg());
function doituong() {
    return {
        ten: "nhanvat",
        tuoi: "30",
        gioitinh: "nu",
        kynang: {
            kn1: "khong biet",
            kn2: "tanghinh"
        }
    };
}
// console.log(doituong().kynang);
function tinhtbc(x, y) {
    var tbc = (x + y) / 2;
    console.log("trung binh cong tai x = " + x + " va y = " + y + " la " + tbc + ".");
}
// tinhtbc(10,12);
// khai bao anonymous function
var z = function gioithieu(x, y) {
    return "Ban la " + y + ", " + x + " tuoi phai khong?";
};
// console.log(z(18,"Teo"));
var g = function (x, y) {
    return "Ban la " + y + ", " + x + " tuoi phai khong?";
};
// console.log(g(21,"Ti"));
// function k can function
var h = function (x) {
    return x + 10;
};
// console.log(h(9));
