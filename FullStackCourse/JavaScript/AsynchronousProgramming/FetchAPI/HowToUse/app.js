function getTextFile() { // Text Dosyası
    fetch("example.txt")
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(err => console.log(err));
}
function getJsonFile() { // Local bir Json dosyasından veri alma
fetch("example.json")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}
function getExternalAPI() {
    fetch("http://api.exchangeratesapi.io/v1/latest?access_key=25d1278d0ac716e81969e99288708ff1&format=1")
        .then(response=>response.json())
        .then(data=> {
            console.log(data.rates.USD);
        })
        .catch(err => console.log(err));
}
// getTextFile();
// getJsonFile();
getExternalAPI();