$(document).ready(documentReady);
// получаем из документа контейнер со снегом
var container = $("#snow-animation-container");

function documentReady() {
    var MAX_SNOW = 200;
    var MAX_SNOW_SIZE = 7;
    var MAX_SNOW_SPEED = 1;

    snowStart();

    function snowStart() {
        // получаем текущий момент
        const currentMoment = new Date();
        // определяем текущий месяц
        const currentMonth = currentMoment.getMonth();
        // скрипт запускается только в зимние месяцы
        if (currentMonth === 0 || currentMonth === 1 || currentMonth === 11) {
            // console.log("// Snow animation start");
            createSnows();
        }
    }

    // Запуск и остановка снега из меню =====================================
    // получаем кнопки из документа
    let btnBgSpring = document.getElementById('btn-change-bg--spring');
    let btnBgSummer = document.getElementById('btn-change-bg--summer');
    let btnBgAutumn = document.getElementById('btn-change-bg--autumn');
    let btnBgWinter = document.getElementById('btn-change-bg--winter');
    let btnBgDecember = document.getElementById('btn-change-bg--december');
    // остановка снега
    let menuButtonsOffSnow = [btnBgSpring, btnBgSummer, btnBgAutumn, btnBgWinter, btnBgDecember];
    menuButtonsOffSnow.forEach((elem) => {
        elem.addEventListener('click', function () {
            let componentSnowfall = document.getElementById('snow-animation-container');
            componentSnowfall.classList.add('hlp--remove');
        });
    });
    // запуск снега
    let menuButtonsONSnow = [btnBgWinter, btnBgDecember];
    menuButtonsONSnow.forEach((elem) => {
        elem.addEventListener('click', function () {
            let componentSnowfall = document.getElementById('snow-animation-container');
            componentSnowfall.classList.remove('hlp--remove');
        });
    });
    // end =====================================

    function createSnows() {
        for (var i = 0; i < MAX_SNOW; i++) {
            var appendItem = getRandomItem(i);
            container.append(appendItem);
            var animateItem = $(".snow" + String(i));
            var randomTime = Math.random() * MAX_SNOW_SPEED;
            goAnimate(animateItem, i, randomTime);
            goAnimate2(animateItem);
        };
    }

    function goAnimate(item, id, randomTime) {
        TweenMax.to(item, randomTime, {
            css: {
                marginTop: "+=100"
            },
            ease: Linear.easeNone,
            onComplete: function () {
                var topPosition = item.css("margin-top").replace("px", "");
                if (topPosition > $(window).height()) {
                    changePosition(item);
                    randomTime = Math.random() * MAX_SNOW_SPEED;
                    goAnimate(item, id, randomTime);
                } else {
                    goAnimate(item, id, randomTime);
                }

            }
        });
    }

    function goAnimate2(item) {

        var directionTime = 1 + Math.floor(Math.random() * 5);
        var randomDirection = 1 + Math.floor(Math.random() * 4);
        var delayTime = 1 + Math.floor(Math.random() * 3);

        if (randomDirection == 1) {

            TweenMax.to(item, directionTime, {
                css: {
                    marginLeft: "+=100"
                },
                ease: Linear.easeOut,
                onComplete: function () {

                    TweenMax.to(item, directionTime, {
                        css: {
                            marginLeft: "-=100"
                        },
                        delay: delayTime,
                        ease: Linear.easeOut,
                        onComplete: function () {
                            goAnimate2(item);
                        }
                    });
                }
            });
        } else if (randomDirection == 2) {

            TweenMax.to(item, directionTime, {
                css: {
                    marginLeft: "-=100"
                },
                ease: Linear.easeOut,
                onComplete: function () {
                    TweenMax.to(item, directionTime, {
                        css: {
                            marginLeft: "+=100"
                        },
                        delay: delayTime,
                        ease: Linear.easeOut,
                        onComplete: function () {

                            goAnimate2(item);

                        }
                    });
                }
            });
        } else if (randomDirection == 3) {

            TweenMax.to(item, directionTime, {
                css: {
                    marginLeft: "+=100"
                },
                ease: Linear.easeOut,
                onComplete: function () {
                    goAnimate2(item);
                }
            });
        } else if (randomDirection == 4) {

            TweenMax.to(item, directionTime, {
                css: {
                    marginLeft: "-=100"
                },
                ease: Linear.easeOut,
                onComplete: function () {
                    goAnimate2(item);
                }
            });
        }
    }

    function changePosition(item) {
        var _width = Math.floor(Math.random() * MAX_SNOW_SIZE);
        var _height = _width;
        var _blur = Math.floor(Math.random() * 5 + 2);
        var _left = Math.floor(Math.random() * ($(window).width() - _width));
        var _top = -$(window).height() + Math.floor(Math.random() * ($(window).height() - _height));

        item.css("width", _width);
        item.css("height", _height);
        item.css("margin-left", _left);
        item.css("margin-top", _top);
        item.css("-webkit-filter", "blur(" + String(_blur) + "px)");
        item.css("-moz-filter", "blur(" + String(_blur) + "px)");
        item.css("-o-filter", "blur(" + String(_blur) + "px)");
        item.css("-ms-filter", "blur(" + String(_blur) + "px)");
        item.css("filter", "blur(" + String(_blur) + "px)");
    }

    function getRandomItem(id) {
        var _width = Math.floor(Math.random() * MAX_SNOW_SIZE);
        var _height = _width;
        var _blur = Math.floor(Math.random() * 5 + 2);
        var _left = Math.floor(Math.random() * ($(window).width() - _width));
        var _top = -$(window).height() + Math.floor(Math.random() * ($(window).height() - _height));
        var _id = id;

        return getSmallSnow(_width, _height, _blur, _left, _top, _id);
    }

    function getSmallSnow(width, height, blur, left, top, id) {
        var item = "<div class='snow" + id + "' style='position:absolute; margin-left: " + left + "px; margin-top: " + top + "px; width: " + width + "px; height: " + height + "px; border-radius: 50%; background-color: white; -webkit-filter: blur(" + blur + "px); -moz-filter: blur(" + blur + "px); -o-filter: blur(" + blur + "px); -ms-filter: blur(" + blur + "px); filter: blur(" + blur + "px);'></div>"
        return item;
    }
}