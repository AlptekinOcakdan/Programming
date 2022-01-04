//AJAX , callback, http requests

class Request {
    constructor() {
        this.xhr = new XMLHttpRequest();
    }

    // Get Request

    /*
    //hata alınıyor , arrow function ile de çözülebilir.
    get(url){
        this.xhr.open("GET",url);//Bağlantı açık
        this.xhr.onload = function () {
            if (this.xhr.status===200){
                console.log(this.xhr.responseText);
            }
        }
        this.xhr.send();
    }
    */
    get(url, callback) {
        this.xhr.open("GET", url);//Bağlantı açık

        this.xhr.onload = function () {
            if (this.xhr.status === 200) {
                callback(null, this.xhr.responseText);//İsteğimiz bitti

            } else {
                //hata durumu
                callback("Get request: bir hata oluştu.", null);
            }
        }.bind(this);
        this.xhr.send();
    }

    post(url, data, callback) {
        this.xhr.open("POST", url);
        this.xhr.setRequestHeader("Content-type", "application/json");//JSON verisi
        this.xhr.onload = () => {
            if (this.xhr.status===201){
                //başarılı
                callback(null,this.xhr.responseText);
            }
            else {
                callback("Post request: bir hata oluştu",null);
            }
        }
        this.xhr.send(JSON.stringify(data));
    }
    put(url, data, callback) {
        this.xhr.open("PUT", url);
        this.xhr.setRequestHeader("Content-type", "application/json");//JSON verisi
        this.xhr.onload = () => {
            if (this.xhr.status===200){
                //başarılı
                callback(null,this.xhr.responseText);
            }
            else {
                callback("Put request: bir hata oluştu",null);
            }
        }
        this.xhr.send(JSON.stringify(data));
    }
    delete(url, callback) {
        this.xhr.open("DELETE", url);//Bağlantı açık

        this.xhr.onload = function () {
            if (this.xhr.status === 200) {
                callback(null, "Veri silme işlemi başarılı.");//İsteğimiz bitti

            } else {
                //hata durumu
                callback("Delete request: bir hata oluştu.", null);
            }
        }.bind(this);
        this.xhr.send();
    }
}

const request = new Request();
/*
request.get("https://jsonplaceholder.typicode.com/albums",function (err,response) {
    if (err===null){
        console.log(response);
    }
    else {
        console.log(err);
    }
});
*/
/*
request.get("https://jsonplaceholder.typicode.com/albums/51", function (err, response) {
    if (err === null) {
        console.log(response);
    } else {
        console.log(err);
    }
});
*/
/*
request.post("https://jsonplaceholder.typicode.com/albums",{userId:2,title:"Thriller"},function (err, album) {
    if (err===null){
        console.log(album);
    }
    else {
        //Hata
        console.log(err);
    }
})
*/
/*
request.put("https://jsonplaceholder.typicode.com/albums/10",{userId:143,title:"Tarkan Karma"},function (err, album) {
    if (err===null){
        console.log(album);
    }
    else {
        //Hata
        console.log(err);
    }
})
*/
request.delete("https://jsonplaceholder.typicode.com/albums/10",function (err,response) {
    if (err===null){
        console.log(response);
    }
    else {
        console.log(err);
    }
});
