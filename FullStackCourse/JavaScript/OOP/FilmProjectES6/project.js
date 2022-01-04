const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");

//Tüm eventleri Yükleme

eventListeners();

function eventListeners() {
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function () {
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    })
    cardBody.addEventListener("click", deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}

function addFilm(e) {
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === "") {
        //Hata
        UI.displayMessages("Tüm alanları doldurun...", "danger");

    } else {
        const newFilm = new Film(title, director, url);
        UI.addFilmToUI(newFilm);//arayüze film ekleme
        Storage.addFilmToStorage(newFilm)//storage film ekleme
        UI.displayMessages("Film başarıyla eklendi...", "success");
    }
    UI.clearInputs(titleElement, urlElement, directorElement);


    e.preventDefault();
}

function deleteFilm(e) {
    if (e.target.id === "delete-film") {
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent)
        UI.displayMessages("Silme işlemi başarılı...", "success");
    }
}
function clearAllFilms(){
    if (confirm("Emin misiniz?")){
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage();
    }

}