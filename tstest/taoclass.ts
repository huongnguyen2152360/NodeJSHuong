class nhanvatgame {
  ten_nhanvat: string;
  slogan: string;
  mau: number;

  // de tao ra instance
  constructor(ten_nhanvat: string, slogan: string, mau: number) {
    this.ten_nhanvat = ten_nhanvat;
    this.slogan = slogan;
    this.mau = mau;
  }

  chay() {};
  chem() {};
  hienthiten() {
      return `Nhân vật: ${this.ten_nhanvat}, Slogan: ${this.slogan}, Chỉ số máu: ${this.mau}`;
  }
}

var nhanvat1 = new nhanvatgame("Irelia","Ý chí của lưỡi kiếm", 697.2);
// console.log(nhanvat1.hienthiten());

class dienthoai {
    ten: string;
    gia: number;
    sao: number;
    mausac: string[];

    constructor( ten: string, gia: number, sao: number,mausac: string[]) {
        this.ten = ten;
        this.gia = gia;
        this.sao = sao;
        this.mausac = mausac;
    }

    showInfo() {
        return `Sản phẩm ${this.ten} có giá ${this.gia} VNĐ. Rate: ${this.sao}. Màu sắc: ${this.mausac}.`;
    }
}

var sp1 = new dienthoai("Samsung S9", 21000, 4.5, ["xanh","ghi","tím"]);
// console.log(sp1.showInfo());

// Tao tuong
class tuong {
    ten: string;
    motatuong: string;
    kynang: string[];

    constructor(ten:string, motatuong: string, kynang: string[]) {
        this.ten = ten;
        this.motatuong = motatuong;
        this.kynang = kynang;
    }
    showThongtin() {
        var skill : string = '';
        for (let i = 0; i < this.kynang.length; i++) {
            skill += this.kynang[i];
            skill += " | ";
        }
        var thongsotuong = `
        Tên tướng: ${this.ten};
        Mô tả tướng: ${this.motatuong};
        Kỹ năng: ${skill};
        `
        console.log(thongsotuong);
    }
}

class SatThu extends tuong {
    donsatthu: string;

    constructor(ten:string, motatuong: string, kynang: string[], donsatthu:string) {
        super(ten,motatuong,kynang);
        this.donsatthu = donsatthu;
    }
    showThongtin():void {
       super.showThongtin() // Sử dụng lại super của class cha
       // nhưng thêm phần của con
       console.log(`        Đòn sát thủ: ${this.donsatthu}`);
    }
}

var ashes = new tuong('Ashes','Cung Băng', ['Skill 1','Skill 2', ' Skill 3']);
ashes.showThongtin();

var ahri = new tuong("Ahri", "Ho li 9 duoi", ['Skill 1','Skill 2', ' Skill 3']);
ahri.showThongtin();

var talon = new SatThu("Talon","Sat thu bong dem", ['Skill 1','Skill 2', ' Skill 3'], "sat thu vo hinh");
talon.showThongtin();