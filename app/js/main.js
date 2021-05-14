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

// const belousov = document.querySelector("#belousov");
// const onewave = document.querySelector("#onewave");
// const singleSlaveWave = document.querySelector("#single-slave-wave");
// const doubleSlaveWave = document.querySelector("#double-slave-wave");

const step = document.querySelector(".step");
const start = document.querySelector(".start");
const reset = document.querySelector(".reset");
let resetFlag = false;

let automat = new CellularAutomaton(
  s.value,
  r.value,
  h.value,
  cellSize.value,
  cellsH.value,
  cellsW.value,
  time.value
);

automat.init();
// automat.wavesBelousovZhabotinsky();

function chooseReaction() {
  let type = +document.querySelector("input[name=radio-cust]:checked").value;
  switch (type) {
    case 1:
      automat.wavesBelousovZhabotinsky();
      break;
    case 2:
      automat.oneWave();
      break;
    case 3:
      automat.singleSleeveWave();
      break;
    case 4:
      automat.doubleSleeveWave();
      break;
  }
}

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

reset.addEventListener("click", () => {
  automat.init();

  automat.isStart = false;
  start.value = "Запуск";
  // automat.main();
});

step.addEventListener("click", () => {
  automat.step();
});

start.onclick = () => {
  start.value = automat.isStart ? "Запуск" : "Стоп";
  automat.isStart = !automat.isStart;
  chooseReaction();
  automat.main();
};
