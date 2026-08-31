function calcAreaSquare() {
    // взять данные пользователя
    let a = document.getElementById('inputSide').value;
    // сделать расчеты
    let res = Number(a) * Number(a);
    // выдать результат
    document.getElementById('resultCalc').textContent = "Площадь квадрата: " + res + " кв.см";
}