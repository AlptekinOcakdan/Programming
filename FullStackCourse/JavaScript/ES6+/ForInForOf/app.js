const person = {
    name: "Alptekin",
    Age: 25,
    salary: 3000
};

const langs = ["Python", "Java", "C++", "Php"];

const name = "Mustafa";

// for (let prop in person){
//     console.log(prop,person[prop]);
// }

// for (let index in langs){
//     console.log(index,langs[index]);
// }
for (let index of name){
    console.log(index,name[index]);
}