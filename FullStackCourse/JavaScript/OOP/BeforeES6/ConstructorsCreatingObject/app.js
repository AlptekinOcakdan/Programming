// const emp1={
//     name:"Alptekin",
//     age:21
// };
// const emp2={
//     name:"Ahmet",
//     age:25
// };
// emp1.salary=4000;

function Employee(name,age,salary) {//constructor
    this.name=name;
    this.age=age;
    this.salary=salary;

    this.showInfos=function (){
        console.log(this.name,this.age,this.salary);
    }
}

// const emp1=new Employee();
// console.log(emp1);

const emp1=new Employee("Alptekin",21,4000);
emp1.showInfos();
console.log(emp1);