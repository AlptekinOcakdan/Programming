class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    showInfos() {
        console.log("İsim: " + this.name + " Yaş: " + this.age);
    }
}

class Employee extends Person {
    constructor(name, age, salary) {
        super(name, age);
        this.salary = salary;
    }

    showInfos() {
        console.log("İsim: " + this.name + " Yaş: " + this.age + " Maaş: " + this.salary);
    }

    toString() {
        console.log("Employee");
    }

    raiseSalary(amount) {
        this.salary += amount;
    }
}

const emp = new Employee("Mustafa", 25, 4000);
emp.raiseSalary(500);
emp.showInfos();
emp.toString();