// const object= new Object();
// object.name="Alptekin";
// console.log(object);

function Employee(name,age) {
    this.name=name;
    this.age=age;
    this.showInfos=function () {
        console.log("Bilgiler Gösteriliyor...");
    }
}
const emp1=new Employee("Alptein",21);
console.log(emp1.toString());