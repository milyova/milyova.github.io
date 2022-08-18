const nav = document.querySelector('#nav');
const navBtn = document.querySelector('#btn_nav');
const navBtnImg = document.querySelector('#btn_nav_img');

navBtn.onclick = () => {
    if (nav.classList.toggle('open')) {
        navBtnImg.src = "../img/signs/nav_close.svg";
    } else {
        navBtnImg.src = "../img/signs/nav_burger.svg";
    }
};

// запуск библиотеки aos
AOS.init({    
    once: true //анимация проигрывается 1 раз    
});