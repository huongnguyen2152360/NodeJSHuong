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
        console.log(this.ten);
        console.log(`
        ID: ${this.id},
        Tên khóa học: ${this.ten},
        Độ dài khóa học: ${this.dodai} tiếng.
        `);
    }
    test2() {
        console.log(this.ten);
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
khoa08.test2();