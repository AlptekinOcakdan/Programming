const person = {
    age:25,
    /*tellAge:function () {
        //this - Person
        console.log(this.age);
    }.bind(this)*/
    //bind ile bağlamış gibi olur.
    tellAge: () =>{
        console.log(this.age);
    }
    //this - Window
}
person.tellAge();