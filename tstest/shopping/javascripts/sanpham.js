export class SanPham {
    //id
    get id() {
        return this._id;
    }
    set id(v) {
        this._id = v;
    }
    // ten
    get ten() {
        return this._ten;
    }
    set ten(v) {
        this._ten = v;
    }
    //gia
    get gia() {
        return this._gia;
    }
    set gia(v) {
        this._gia = v;
    }
    //mota
    get mota() {
        return this._mota;
    }
    set mota(v) {
        this._mota = v;
    }
    //tinhtrang
    get tinhtrang() {
        return this._tinhtrang;
    }
    set tinhtrang(v) {
        this._tinhtrang = v;
    }
    //anh
    get anh() {
        return this._anh;
    }
    set anh(v) {
        this._anh = v;
    }
    constructor(id, ten, gia, mota, tinhtrang, anh) {
        this._id = id;
        this._ten = ten;
        this._gia = gia;
        this._mota = mota;
        this._tinhtrang = tinhtrang;
        this._anh = anh;
    }
}
