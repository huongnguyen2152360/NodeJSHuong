import { SanPham } from './sanpham';

export class spGioHang {
    private sanpham : SanPham;
    private soluong : number;

    constructor(sanpham: SanPham, soluong:number) {
        this.sanpham = sanpham;
        this.soluong = soluong;
    }
    tinhgiatien():number {   
        return;
    }
    showSanPhamtronggiohang():string {
        return;
    }
}