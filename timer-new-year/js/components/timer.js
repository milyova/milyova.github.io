 // ПОЛУЧАЕМ СО СТРАНИЦЫ ЦИФРЫ СЧЕТЧИКА ===========================
 const
     visibleNumDays = document.getElementById('timer-days'),
     visibleNumHours = document.getElementById('timer-hrs'),
     visibleNumMinutes = document.getElementById('timer-min'),
     visibleNumSeconds = document.getElementById('timer-sec');


 // ПОЛУЧАЕМ ТЕКУЩИЙ ГОД И УСТАНАВЛИВАЕМ ЕГО НА СТРАНИЦУ ===========================
 // получаем текущий год
 const currentYear = new Date().getFullYear();
 // прописываем год в логотип и заголовок
 let timerYear = document.querySelectorAll('.timer-year');
 timerYear.forEach((elem) => {
     elem.innerText = currentYear + 1;
 });


 // ЗАДАЕМ ЦЕЛЕВУЮ ДАТУ - ЧИСЛО, МЕСЯЦ, ГОД, ВРЕМЯ ===========================
  const targetDate = new Date(`1 Jan ${currentYear + 1} 00:00:00`);


 // ЗАПУСКАЕМ ТАЙМЕР ОТСЧЕТА ДО ЦЕЛЕВОЙ ДАТЫ ===========================
 timer();
 let timerID = setInterval(timer, 1000);


 // ФУНКЦИЯ - ТАЙМЕР ОТСЧЕТА ДО ЦЕЛЕВОЙ ДАТЫ ===========================
 function timer() {
     // получаем разницу между целевой датой и текущим моментом, в миллисекундах
     const leftTime = targetDate - new Date();

     // переводим разницу между датами в человеко-понятное время
     const
         leftDays = Math.floor(leftTime / 1000 / 60 / 60 / 24),
         leftHour = Math.floor((leftTime / 1000 / 60 / 60) % 24),
         leftMinute = Math.floor((leftTime / 1000 / 60) % 60),
         leftSecond = Math.floor((leftTime / 1000) % 60);

     // меняем цифры счетчика на оставшееся время, еще для одиночных цифр добавляем 0 впереди
     visibleNumDays.textContent = leftDays < 10 ? "0" + leftDays : leftDays;
     visibleNumHours.textContent = leftHour < 10 ? "0" + leftHour : leftHour;
     visibleNumMinutes.textContent = leftMinute < 10 ? "0" + leftMinute : leftMinute;
     visibleNumSeconds.textContent = leftSecond < 10 ? "0" + leftSecond : leftSecond;

     //  условие остановки таймера
     if (leftTime <= 0) {
         // сбрасываем цифры счетчика на 0, чтобы он не уходил в минус
         visibleNumDays.textContent = '00';
         visibleNumHours.textContent = '00';
         visibleNumMinutes.textContent = '00';
         visibleNumSeconds.textContent = '00';
         //  останавливаем таймер
         clearInterval(timerID);
         // Поздравление с Новым годом! - по таймеру, в полночь НГ2026
         let componentTimer = document.querySelector('.info-wrap');
         let componentNYCongratulation = document.querySelector('.happy-new-year__wrap');
         componentTimer.classList.add('hlp--hidden');
         componentNYCongratulation.classList.add('hlp--visible');
     }
 }


 // МЕНЯЕМ ФОН ПО СЕЗОНАМ ===========================

 function seasonsTimerBackground() {
     // Меняется фон по временам года
     // получаем текущий месяц
     const currentMonth = new Date().getMonth();
     if (currentMonth >= 2 && currentMonth <= 4) {
         // фон весна
         document.getElementById('countdown--seasons-bg').style.backgroundImage = "url(../images/bg_spring.jpg)";
     } else if (currentMonth >= 5 && currentMonth <= 7) {
         // фон лето
         document.getElementById('countdown--seasons-bg').style.backgroundImage = "url(../images/bg_summer.jpg)";
     } else if (currentMonth >= 8 && currentMonth <= 10) {
         // фон осень
         document.getElementById('countdown--seasons-bg').style.backgroundImage = "url(../images/bg_autumn.jpg)";
     } else if (currentMonth === 11) {
         // фон декабрь
         document.getElementById('countdown--seasons-bg').style.backgroundImage = "url(../images/bg_forest1.jpg)";
     }
 }
 // Вызываем функцию сезонного фона 1 раз при загрузке страницы 
 seasonsTimerBackground();