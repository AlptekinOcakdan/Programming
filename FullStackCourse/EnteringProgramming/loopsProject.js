function makeNumber(upperLimit = 49) {
    return Math.ceil(Math.random() * upperLimit);

}

for (var i = 1; i <= 8; i++) {
    console.log(i+".KOLON")
    for (var j = 1; j <= 6; j++) {
        console.log(makeNumber());
    }

}

