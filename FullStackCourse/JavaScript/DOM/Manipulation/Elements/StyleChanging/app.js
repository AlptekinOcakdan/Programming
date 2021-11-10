const element = document.querySelector("#clear-todos");


// console.log(element.id);
// console.log(element.className);
// console.log(element.classList);
// console.log(element.classList[1]);
// console.log(element.textContent);
// console.log(element.innerHTML);
// console.log(element.href);
// console.log(element.style);

//Style ve Element özelliklerini değiştirme

/*element.className = "btn btn-danger";
element.style.color="#000";
element.style.marginLeft="10px";
element.href="https://www.google.com.tr";
element.target="_blank";
element.textContent="Silin";
element.innerHTML="<span style='color: green' >Silin</span> "*/

let element2 = document.querySelector("li:first-child");
element2 = document.querySelector("li:nth-child(2)")
element2 = document.querySelectorAll("li:nth-child(odd)");
element2 = document.querySelectorAll("li:nth-child(even)");

element2.forEach(function (el) {
    el.style.background = "#ccc";
    el.style.color = "red";
})


// const elements = document.querySelectorAll(".list-group-item"); //Node List
// elements.forEach(function (el) {
//     el.style.color = "red";
//     el.style.background = "#eee";
// })
// console.log(elements);
console.log(element2)
// console.log(element);
