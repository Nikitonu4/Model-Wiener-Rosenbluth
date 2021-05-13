"use strict;";

const controlPanel = document.querySelector(".control__panel");
const grid = document.querySelector("#cb4");
const s = document.querySelector(".s");
const r = document.querySelector(".r");
const h = document.querySelector(".h");
const cellSize = document.querySelector(".cell-size");
const cellsH = document.querySelector(".cellsH");
const cellsW = document.querySelector(".cellsW");
const time = document.querySelector(".time");
// const belousov =
const step = document.querySelector(".step");
const start = document.querySelector(".start");
const reset = document.querySelector(".reset");
// обработка перемещения панели управления
function dragElement(el) {
  let pos1 = 0;
  let pos2 = 0;
  let pos3 = 0;
  let pos4 = 0;
  if (document.querySelector(`.${el.className}-header`)) {
    // если присутствует, заголовок - это место, откуда вы перемещаете DIV:
    document.querySelector(`.${el.className}-header`).onmousedown =
      dragMouseDown;
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

dragElement(controlPanel);

grid.addEventListener("click", () => {
  document.querySelector("#grid").hidden = grid.checked ? false : true;
});

start.addEventListener("click", () => {
  automat.clearCanvas();
  automat = new CellularAutomaton(
    s.value,
    r.value,
    h.value,
    cellSize.value,
    cellsH.value,
    cellsW.value,
    time.value
  );
});

let automat = new CellularAutomaton(
  s.value,
  r.value,
  h.value,
  cellSize.value,
  cellsH.value,
  cellsW.value,
  time.value
);
