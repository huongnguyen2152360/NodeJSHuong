enum state {
    Todo = 10,
    Doing, // 11
    Done // 12
}

class congviec {
    id: number;
    ten: string;
    trangthai: state;

    constructor(id: number, ten: string, trangthai: state) {
        this.id = id;
        this.ten = ten;
        this.trangthai = trangthai;
    }

    showInfo() {
        return `Công việc số ${this.id}: "${this.ten}", trạng thái: "${this.trangthai}".`
    }
}

var cv1 = new congviec("1","Hoan thanh video so 22", state.Doing);
console.log(cv1.showInfo());