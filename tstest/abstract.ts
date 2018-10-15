// Giống bản nháp mô tả tính năng của class
abstract class dienthoaii {
  ten: string;

  abstract guitinnhan(): void;

  abstract goidienthoai(): string;
}

// Chính xác hóa bằng tặng 1 class sử dụng bản thiết kế abstract
class android extends dienthoaii {
  guitinnhan() {
    console.log("Gui tin nhan trong android");
  }
  goidienthoai() {
    return "Goi dien thoai bang android";
  }
}

var samsung = new android();
samsung.guitinnhan();
console.log(samsung.goidienthoai());
