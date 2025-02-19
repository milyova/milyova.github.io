// получаем из документа кнопку бургер и панель "меню"
let btnBurger = document.querySelector('.btn-burger');
let panelMenu = document.querySelector('.menu');

btnBurger.addEventListener('click', function(){
    panelMenu.classList.toggle('hlp--visible');
});


// получаем кнопки из документа
let btnBgSpring = document.getElementById('btn-change-bg--spring');
let btnBgSummer = document.getElementById('btn-change-bg--summer');
let btnBgAutumn = document.getElementById('btn-change-bg--autumn');
let btnBgWinter = document.getElementById('btn-change-bg--winter');
let btnBgDecember = document.getElementById('btn-change-bg--december');
let btnNewYear = document.getElementById('btn-new-year-ON');

// смена фона по клику - Фон весна
btnBgSpring.addEventListener('click', function () {
    document.getElementById('section__bg').style.backgroundImage = "url(./images/bg_spring.jpg)";
});
// смена фона по клику - Фон лето
btnBgSummer.addEventListener('click', function () {
    document.getElementById('section__bg').style.backgroundImage = "url(./images/bg_summer.jpg)";
});
// смена фона по клику - Фон осень
btnBgAutumn.addEventListener('click', function () {
    document.getElementById('section__bg').style.backgroundImage = "url(./images/bg_autumn.jpg)";
});
// смена фона по клику - Фон зима
btnBgWinter.addEventListener('click', function () {
    document.getElementById('section__bg').style.backgroundImage = "url(./images/bg_winter.jpg)";
});
// смена фона по клику - Фон декабрь
btnBgDecember.addEventListener('click', function () {
    document.getElementById('section__bg').style.backgroundImage = "url(./images/bg_forest1.jpg)";
});
// для всех кнопок, кроме новогодней ночи, переключение с поздравления на обратный отсчет
let menuButtonsOnTimer = [btnBgSpring, btnBgSummer, btnBgAutumn, btnBgWinter, btnBgDecember];
menuButtonsOnTimer.forEach((elem) => {
    elem.addEventListener('click', function () {
        let componentTimer = document.querySelector('.timer__wrap');
        let componentNYCongratulation = document.querySelector('.new-year-text__wrap');
        componentTimer.classList.remove('hlp--hidden');
        componentNYCongratulation.classList.add('hlp--hidden');
        componentNYCongratulation.classList.remove('hlp--visible');
    });
});
// Поздравление с Новым годом! - по клику
btnNewYear.addEventListener('click', function () {
    let componentTimer = document.querySelector('.timer__wrap');
    let componentNYCongratulation = document.querySelector('.new-year-text__wrap');
    componentTimer.classList.add('hlp--hidden');
    componentNYCongratulation.classList.add('hlp--visible');
});