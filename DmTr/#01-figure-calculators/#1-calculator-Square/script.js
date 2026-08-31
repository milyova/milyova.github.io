function calc() {
    let a = document.getElementById('inputSide').value;
    let res = a * a;
    document.getElementById('resultCalc').innerText = "Площадь квадрата: " + res + " кв.см";
}