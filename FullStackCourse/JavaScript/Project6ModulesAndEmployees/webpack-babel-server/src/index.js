import {Request} from "./request";
//Elementleri Seçme
const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeesList = document.getElementById("employees");
const updateEmployeeButton = document.getElementById("update");

const request = new Request("http://localhost:3000/employees")

/*
request.get()
    .then(employees => console.log(employees))
    .catch(err => console.log(err));
*/
/*
request.post({name:"blah blah",department:"Pazarlama",salary:"6000"})
    .then(employees => console.log(employees))
    .catch(err => console.log(err));
*/
/*
request.put(3,{name:"Alptekin Ocakdan",department:"Bilişim",salary:"6000"})
    .then(employees => console.log(employees))
    .catch(err => console.log(err));
*/
/*
request.delete(4)
    .then(message => console.log(message))
    .catch(err => console.log(err));
*/
