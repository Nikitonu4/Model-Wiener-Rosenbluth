"use strict;";

// обработка перемещения панели управления
dragElement(document.querySelector(".control__panel"));

function dragElement(el) {
  let pos1 = 0;
  let pos2 = 0;
  let pos3 = 0;
  let pos4 = 0;
  if (document.querySelector(`.${el.className}-header`)) {
    // если присутствует, заголовок - это место, откуда вы перемещаете DIV:
    document.querySelector(
      `.${el.className}-header`
    ).onmousedown = dragMouseDown;
  } else {
    // в противном случае переместите DIV из любого места внутри DIV:
    el.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // получить положение курсора мыши при запуске:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // вызов функции при каждом перемещении курсора:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // вычислить новую позицию курсора:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // установите новое положение элемента:
    el.style.top = `${el.offsetTop - pos2}px`;
    el.style.left = `${el.offsetLeft - pos1}px`;
  }

  function closeDragElement() {
    // остановка перемещения при отпускании кнопки мыши:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
// s шагов до покоя
// r состояний возбуждения
// h пороговая концентрация активатора
// размер клеток
// Количество клеток по вертикали
// Количество клеток по горизонтали
// Интервал шага(в мс)
// Шаг
// запуск/стоп
// сбросить все

// RadioButtonы
/*
1) реакция Белоусова-Жаботинского
2) одиночная волна
3) однорукавная волна
4) двурукавная волна



5) 1 осциллятор
6) 2 осциллятор
7) препятствие - checkbox
*/
new CellularAutomaton();
