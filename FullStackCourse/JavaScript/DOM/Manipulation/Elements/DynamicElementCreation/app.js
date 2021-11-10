// Yeni element Oluşturma

//<a id = "clear-todos" class="btn btn-dark" href="#">Tüm Taskları Temizleyin</a>

const newLink=document.createElement("a");
const cardBody=document.getElementsByClassName("card-body")[1];

newLink.id="clear-todos";
newLink.className="btn btn-danger";
newLink.href="https://www.google.com.tr";
newLink.target="_blank";

newLink.appendChild(document.createTextNode("Farklı Sayfaya Git"));

cardBody.appendChild(newLink);

//Text Content

// newLink.textContent="Farklı Bir Sayfaya Git";

//İçerideki bütün diğer yazıları ortadan kaldırır.
// cardBody.textContent="sadasdas";

//Text Node

// const text=document.createTextNode("Naber");
// cardBody.appendChild(text);

console.log(newLink);