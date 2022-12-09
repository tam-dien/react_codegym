const dv = new Set()

function add_dv(name) {
    dv.add(name)
}

function delete_dv(name) {
    dv.delete(name)
}

function print_dv() {
    dv.forEach((item,index)=>{
        console.log(item)
    })
}

add_dv("Gà")
add_dv("Trâu")
add_dv("Trâu")
add_dv("Bò")
print_dv()
delete_dv("Bò")
print_dv()