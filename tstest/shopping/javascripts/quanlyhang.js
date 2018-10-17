import { SanPham } from "./sanpham";
export class QuanlyHang {
    constructor() {
        this.hang = []; //đùng để hứng dữ liệu từ API
        // vì k có PHP nên tạo chay
        var sp1 = new SanPham(1, "Ốp IPhone", 40000, "Ốp cho IPhone", true, "https://pipe.tikicdn.com/cache/200x200/ts/product/1a/f0/a2/0978d091d83849160e6d31945ce9ae08.jpg");
        this.addSanPham(sp1);
    }
    getCacSanPham() {
        return [];
    }
    getSanPhambyID() {
        var motsanpham = new SanPham(1, "sp1", 90000, "mo ta", true, "https://pipe.tikicdn.com/cache/200x200/media/catalog/product/0/_/0.u5395.d20170720.t120412.710696.jpg");
        return motsanpham;
    }
    addSanPham() {
        // dùng để đẩy dữ liệu hứng từ API vào mảng hang = SanPham[]
        this.hang.push(sp);
        console.log(this.hang);
    }
    showSanPham() {
        return '';
    }
}
