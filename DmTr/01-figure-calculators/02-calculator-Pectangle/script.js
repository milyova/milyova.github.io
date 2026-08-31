function calcAreaRectangle() {
    // взять данные пользователя
    let a = document.getElementById('inputLenghtSide1').value;
    let b = document.getElementById('inputLenghtSide2').value;
    // сделать расчеты
    let res = Number(a) * Number(b);
    // выдать результат
    let currentText = document.getElementById('resultCalc').textContent;
    document.getElementById('resultCalc').textContent = `Площадь прямоугольника: ${res} кв.см`;
}