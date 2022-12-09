class ThongTin {
    constructor(ten,mota) {
        this.ten = ten;
        this.mota = mota;
    }
    tinhtoan(a=1) {
        return a*3;
    }
}

class HinhHoc extends ThongTin {
    constructor(chieudai,mota) {
        super("Hình học",mota);
        this.chieudai = chieudai;
    }
}

hh1 = new HinhHoc(30,"Đây là hình học 1")
hh2 = new HinhHoc(50,"Đây là hình học 2")

console.log(hh1.ten,hh2.ten)
console.log(hh1.chieudai,hh2.chieudai)
console.log(hh1.mota,hh2.mota)
console.log(hh1.tinhtoan())
console.log(hh2.tinhtoan(5))