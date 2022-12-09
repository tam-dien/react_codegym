class Person {
    constructor(name) {
        this.name = name;
    }
    get get_name() {
        return this.name;
    }
    set set_name(name) {
        this.name = name;
    }
    walk() {
        console.log(this.name,"đang đi!")
    }
}

p1 = new Person("")
p1.set_name = "Điền"
console.log(p1.get_name)
p1.walk()