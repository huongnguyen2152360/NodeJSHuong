class khoahoc {
    public id: number;
    private ten: string;
    public dodai: number;

    constructor(id: number, ten: string, dodai: number) {
        this.id = id;
        this.ten = ten;
        this.dodai = dodai;
    }
    xemkhoahoc() {
        // console.log(this.ten);
        console.log(`
        ID: ${this.id},
        Tên khóa học: ${this.ten},
        Độ dài khóa học: ${this.dodai} tiếng.
        `);
    }
    test2() {
        // console.log(this.ten);
    }
}

class khoalaptrinh extends khoahoc {
    filedinhkem: string;
    
    constructor(id: number, ten: string, dodai: number, filedinhkem: string) {
        super(id,ten,dodai);
        this.filedinhkem = filedinhkem;
    }

    xemkhoahoc() {
        super.xemkhoahoc();
        console.log(`       File đính kèm: ${this.filedinhkem}`);
    }
    test1() {
        // console.log(this.ten);
    }
}

// test public
// public trong class
var khoa08 = new khoahoc(8, "hoc lam banh", 10);
var khoa09 =  new khoalaptrinh(9, "front end co ban", 24, "a.zip");
// khoa09.test1();
// khoa08.test2();

class hero {
    private _ten: string;

    constructor (_ten:string) {
        this._ten = _ten;
    }
    // Lấy dữ liệu
    public get ten() : string {
        // xử lý bảo mật ...
        // nếu ok thì return
        return this._ten;
    }

    // Thay đổi dữ liệu
    public set ten(v : string) {
        this._ten = v;
    }
}
var zeus = new hero ("Zeus");
// console.log("Gioi thieu tuong: " + zeus.ten);

zeus.ten = "than Zeus";
// console.log("Ten tuong sau khi doi la: " + zeus.ten);

// Sử dụng mật khẩu vs accessor
var matkhau : string = "So dien thoai nguoi so 1"

class Nguoi {
    private _ten: string;

    constructor(_ten:string) {
        this._ten= _ten;
    }

    public get ten() : string {
        if (matkhau == "So dien thoai nguoi so 1") {
            return this._ten;
        }
        else {
            return "Sai mat khau roi em eiii"
        } 
    }
    public set ten(v : string) {
        if (matkhau == "So dien thoai nguoi so 1") {
            this._ten = v;
        }
        else {
            this._ten = "Sai mat khau"
        } 
    }
}
var nguoiso1 = new Nguoi();

// Su dung setter
matkhau = "so dien thoai 2"
nguoiso1.ten = "Heyo";

// Su dung getter
console.log(nguoiso1.ten);