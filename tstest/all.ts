var x: number;
x = 10;
// console.log(x);

var hocvien : string[];
hocvien = ['aa','tenso2','babieee'];
for (var i = 0; i < hocvien.length; i++) {
    // console.log(hocvien[i]);
}

var numbers : number[] = [2,4,5,6,8,9]
for (let i = 0; i < numbers.length; i ++) {
    // console.log(numbers[i]);
}

// kieu enum
enum trangthaii {married, single, unknown};
// console.log(trangthaii);

// kieu tuple
var tuple1 : [string,number,string] = ['hoten',31,'nghenghiep'];
// console.log(tuple1[0]);

// kieu any
var y : any;
y = {
    dongho: {
        giatien: 1000,
        mausac: 'do',
        xuatxu: 'china'
    }
}
// console.log(y.dongho.xuatxu);

//kieu du lieu void
// function thufunction():void {
//     console.log('kieu du lieu khong tra ve cai gi het, k return')
// }

// ép kiểu, có 2 cách
var epkieu : any;
epkieu = "Day la 1 vd ve ep kieu!";
// console.log((<string>epkieu).length);
// console.log((epkieu as string).length);

//function
function tinhtongg(): number {
    return 100+200;
}
// console.log(tinhtongg());

function doituong(): any {
    return {
        ten: "nhanvat",
        tuoi: "30",
        gioitinh: "nu",
        kynang: {
            kn1: "khong biet",
            kn2: "tanghinh"
        }
    }
}
// console.log(doituong().kynang);

function tinhtbc(x:number, y:number):void {
    let tbc = (x+y)/2;
    console.log(`trung binh cong tai x = ${x} va y = ${y} la ${tbc}.`);
}
// tinhtbc(10,12);

// khai bao anonymous function
var z = function gioithieu(x:number, y:string) {
    return `Ban la ${y}, ${x} tuoi phai khong?`
}
// console.log(z(18,"Teo"));

var g: (x:number, y:string) => string = function(x,y) {
    return `Ban la ${y}, ${x} tuoi phai khong?`
}
// console.log(g(21,"Ti"));

// function k can function
var h = (x:number) : number => {
    return x+10;
}
// console.log(h(9));
