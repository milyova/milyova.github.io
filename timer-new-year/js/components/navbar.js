// получаем кнопки из документа
let btnBgSpring = document.getElementById('timer-seasons-bg--spring');
let btnBgSummer = document.getElementById('timer-seasons-bg--summer');
let btnBgAutumn = document.getElementById('timer-seasons-bg--autumn');
let btnBgWinter = document.getElementById('timer-seasons-bg--winter');
let btnBgDecember = document.getElementById('timer-seasons-bg--december');
let btnNewYear = document.getElementById('timer-seasons-bg--new-year');

// смена фона по клику - Фон весна
btnBgSpring.addEventListener('click', function () {
    document.getElementById('countdown--seasons-bg').style.backgroundImage = "url(./images/bg_spring.jpg)";
});
// смена фона по клику - Фон лето
btnBgSummer.addEventListener('click', function () {
    document.getElementById('countdown--seasons-bg').style.backgroundImage = "url(./images/bg_summer.jpg)";
});
// смена фона по клику - Фон осень
btnBgAutumn.addEventListener('click', function () {
    document.getElementById('countdown--seasons-bg').style.backgroundImage = "url(./images/bg_autumn.jpg)";
});
// смена фона по клику - Фон зима
btnBgWinter.addEventListener('click', function () {
    document.getElementById('countdown--seasons-bg').style.backgroundImage = "url(./images/bg_winter.jpg)";
});
// смена фона по клику - Фон декабрь
btnBgDecember.addEventListener('click', function () {
    document.getElementById('countdown--seasons-bg').style.backgroundImage = "url(./images/bg_forest1.jpg)";
});
// для всех кнопок, кроме новогодней ночи, переключение с поздравления на обратный отсчет
let menuButtonsOnTimer = [btnBgSpring, btnBgSummer, btnBgAutumn, btnBgWinter, btnBgDecember];
menuButtonsOnTimer.forEach((elem) => {
    elem.addEventListener('click', function () {
        let componentTimer = document.querySelector('.info-wrap');
        let componentNYCongratulation = document.querySelector('.happy-new-year__wrap');
        componentTimer.classList.remove('hlp--hidden');
        componentNYCongratulation.classList.remove('hlp--visible');

    });
});
// Поздравление с Новым годом! - по клику
btnNewYear.addEventListener('click', function () {
    let componentTimer = document.querySelector('.info-wrap');
    let componentNYCongratulation = document.querySelector('.happy-new-year__wrap');
    componentTimer.classList.add('hlp--hidden');
    componentNYCongratulation.classList.add('hlp--visible');
});
