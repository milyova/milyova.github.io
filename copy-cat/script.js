// дублирование кота
$("#redcat").click( function () {
  var cloneCat = $(this).clone();
  $(this).after(cloneCat);
});
