// tabs SCIENCE RESULTS
let tabs = document.querySelectorAll ('.tabs__toggle'),
  contents = document.querySelectorAll('.tabs__content');

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      contents.forEach((content) => {
        content.classList.remove('is-active');
      });
      tabs.forEach((tab) => {
        tab.classList.remove('is-active');
      });
      contents[index].classList.add('is-active');
      tabs[index].classList.add('is-active');
    });
  });
// end tabs SCIENCE RESULTS


// slider TAB DIAGRAM
$(document).ready(function(){
  $('.tab-slider').slick({
    arrows:true,
    dots: false,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    easing: 'ease',    
    swipe: true,
    touchThreshold: 10,
    waitForAnimate: false,
    centerMode: false,
    variableWidth: true,
  });
});
// end slider TAB DIAGRAM

$('.lazy').slick({
  lazyLoad: 'ondemand',
  slidesToShow: 1,
  slidesToScroll: 1
});

$('.tab-slider').slick('setPosition');




