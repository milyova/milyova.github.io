var elementForChange = $("#hello");

var changeText = function () {
  elementForChange.text("Привет, Колечка :) А я теперь умею вот так!");
}

elementForChange.click(changeText);
