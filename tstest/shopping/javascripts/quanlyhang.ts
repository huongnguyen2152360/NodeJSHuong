import {SanPham} from "./sanpham";

class QuanlyHang {
    private hang = SanPham[] = [];

    constructor() {}

    getCacSanPham() :SanPham[] {
        return [];
    }

    getSanPhambyID() :SanPham {
        var motsanpham = new SanPham(1,"sp1",90000,"mo ta", true, "https://pipe.tikicdn.com/cache/200x200/media/catalog/product/0/_/0.u5395.d20170720.t120412.710696.jpg");
        return motsanpham;
    }

    addSanPham() :void {}

    showSanPham() :string {
        return '';
    }
}