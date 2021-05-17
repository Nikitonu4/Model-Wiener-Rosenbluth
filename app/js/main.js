/* eslint-disable default-case */
"use strict;";

const controlPanel = document.querySelector(".control__panel");
const grid = document.querySelector("#cb4");

// берем основные характеристики
const s = document.querySelector(".s");
const r = document.querySelector(".r");
const h = document.querySelector(".h");
const cellSize = document.querySelector(".cell-size");
const cellsH = document.querySelector(".cellsH");
const cellsW = document.querySelector(".cellsW");
const time = document.querySelector(".time");

const inputs = document.querySelector(".control__panel-inputs");
const radioBox = document.querySelector(".control__panel-radiogroup");

// добавляем оссциляторы или препятствие
const oneOsc = document.querySelector("#oneOsc");
const twoOsc = document.querySelector("#twoOsc");
const obsticle = document.querySelector("#obsticle");

// контрольное управление
const step = document.querySelector(".step");
const start = document.querySelector(".start");
const reset = document.querySelector(".reset");

// создаем основной объект волны
let automat = new CellularAutomaton(
  s.value,
  r.value,
  h.value,
  cellSize.value,
  cellsH.value,
  cellsW.value,
  time.value
);

automat.init(); // инициализируем

chooseReaction();

// выбираем необходимую реакцию
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

obsticle.addEventListener("click", () => {
  automat.isObsticle = obsticle.checked ? true : false;
});

oneOsc.addEventListener("click", () => {
  automat.isOneOsc = oneOsc.checked ? true : false;
});

twoOsc.addEventListener("click", () => {
  automat.isTwoOsc = twoOsc.checked ? true : false;
});

inputs.addEventListener("click", () => {
  automat.s = s.value;
  automat.r = r.value;
  automat.h = h.value;
  automat.cellSize = cellSize.value;
  automat.cellsH = cellsH.value;
  automat.cellsW = cellsW.value;
  automat.time = time.value;
});

radioBox.addEventListener("click", () => {
  start.value = "Запуск";
  automat.isStart = false;
  automat.init();
  chooseReaction();
});

grid.addEventListener("click", () => {
  document.querySelector("#grid").hidden = grid.checked ? false : true;
});

step.addEventListener("click", () => {
  start.value = "Запуск";
  automat.isStart = false;
  automat.step();
});

start.onclick = () => {
  start.value = automat.isStart ? "Запуск" : "Стоп";
  automat.isStart = !automat.isStart;
  automat.s = s.value;
  automat.r = r.value;
  automat.h = h.value;
  automat.cellSize = cellSize.value;
  automat.cellsH = cellsH.value;
  automat.cellsW = cellsW.value;
  automat.time = time.value;
  automat.main();
};

reset.addEventListener("click", () => {
  automat.isStart = false;
  automat.init();
  chooseReaction();
  start.value = "Запуск";
});

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
