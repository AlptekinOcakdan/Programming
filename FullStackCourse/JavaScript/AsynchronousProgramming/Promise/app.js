/*
function getData(data) {//promise objesi döndüren fonksiyon
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (typeof data === "string") {
                //Olumlu
                resolve(data);
            } else {
                //Olumsuz
                reject(new Error("Lütfen string bir ifade giriniz"));
            }
        }, 5000);
    });

}

getData(24)
    .then(response => console.log("Gelen Değer " + response))
    .catch(err=> console.log(err));
*/
function addTwo(number) {
    return new Promise((resolve, reject) => {
       setTimeout(function () {
           if (typeof number ==="number"){
                resolve(number+2);
           }else {
               reject(new Error("Lütfen bir sayı girin"));
           }
       })
    });
}
addTwo("10")
    .then(response =>{
        console.log(response);
        return response+2;
    }).then(response2 => console.log(response2))
    .catch(err => console.error(err));
