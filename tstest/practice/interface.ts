// interface co ban
// khai báo interface để tránh sai lệch dữ liệu khi code
// VD: tuoi => Tuoi
interface nguoi {
  tuoi: number;
  ten: string;
}
function xemtt(motnguoi: nguoi): void {
  console.log(`Xin chao, toi la ${motnguoi.ten}, ${motnguoi.tuoi} tuoi.`);
}
// xemtt({tuoi: 15, ten: "Duc"});

// interface class
interface tuongInterface {
  ten: string;
  mau: number;
  satthuong: number;
  mota: string;

  xemtuong(): void;
  donkynang(mau: number): any;
  bienve(): void;
}
class tuong implements tuongInterface {
  ten: string;
  mau: number;
  satthuong: number;
  mota: string;
  mana: number;

  xemtuong(): void {
    console.log("xem tuong");
  }
  donkynang(mau: number): any {
    return "don ky nang";
  }
  bienve(): void {
    console.log("bien ve");
  }
}
