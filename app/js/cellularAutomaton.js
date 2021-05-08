"use strict;";

/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */

// ПОКОЙ, ВОЗБУЖДЕНИЕ, РЕФРАКТЕРНОСТЬ
// Рефрактерность - элемент не может возбуждаться, через
// const s = 13; // через s состояний элемент возвращается в состояние покоя
// const r = 6; // Рефрактерность после r состояний(до r - элемент возбужден)
// const h = 5; // пороговое значение концентрации активатора, после него элемент возбуждается

// через s шагов после возбуждения элемент возвращается в состояние покоя.
// из s в состояние покоя => концентрация активатора u[i][j] = 0
// s>r !!!!!!!!!!!!

// есть возбужденный сосед => концентрация элемента u[i][j]++
// Если l ближайших соседей возбуждены, то на соот
// ветствующем шаге к предыдущему значению концентрации активатора
// прибавляется число возбужденных соседей

class CellularAutomaton {
  constructor(s = 13, r = 6, h = 5, cellSize = 10) {
    this.s = s;
    this.r = r;
    this.h = h;
    this.y = [];
    this.yy = [];
    this.u = [];
    this.cellSize = cellSize;
    this.t = 0;

    this.cellSize = cellSize; // размер клетки
    this.grid = document.getElementById("grid").getContext("2d"); // канвас для сетки
    this.canvas = document.getElementById("canvas").getContext("2d");

    this.numberHeightCells = 100; // количество клеток по высоте
    this.numberWidthCells = 100; // количество клеток по ширине

    this.setSizeCanvases();
    this.init();
    this.createNullArrays();

    // this.oneWave();
    // this.wavesBelousovZhabotinsky();
    this.singleSleeveWave();
    // this.doubleSleeveWave();
    this.main();
  }

  setSizeCanvases() {
    // изменяет размер канваса в зависимости от cellSize
    /** Установили количество ячеек */
    const width = this.div(
      document.querySelector(".cells-wrapper").offsetWidth,
      this.cellSize
    );
    this.numberWidthCells = width;

    const height = this.div(
      document.querySelector(".cells-wrapper").offsetHeight,
      this.cellSize
    );
    this.numberHeightCells = height;

    /** установили новый размер канвасов */
    this.grid.canvas.height = height * this.cellSize;
    this.grid.canvas.width = width * this.cellSize;

    this.canvas.canvas.height = height * this.cellSize;
    this.canvas.canvas.width = width * this.cellSize;
  }

  init() {
    this.grid.clearRect(0, 0, this.grid.width, this.grid.height);
    this.grid.width = this.cellSize * this.numberWidthCells;
    this.grid.height = this.cellSize * this.numberHeightCells;

    this.size = { x: this.numberWidthCells, y: this.numberHeightCells };
    this.gridDraw();
  }

  gridDraw() {
    this.grid.beginPath();
    const widthGrid = this.numberWidthCells * this.cellSize;
    const heightGrid = this.numberHeightCells * this.cellSize;

    /*
    задаю параметры сетки
    */
    this.grid.strokeStyle = "#000";
    this.grid.lineWidth = 1;
    // рисуем сетку
    for (let i = 0; i <= this.size.y; i++) {
      this.grid.moveTo(0, i * this.cellSize + 0.5);
      this.grid.lineTo(widthGrid, i * this.cellSize + 0.5);
    }

    for (let i = 0; i <= this.size.x; i++) {
      this.grid.moveTo(i * this.cellSize + 0.5, 0);
      this.grid.lineTo(i * this.cellSize + 0.5, heightGrid);
    }

    this.grid.stroke();
  }

  fillGrid() {
    this.clearCanvas();
    for (let i = 0; i < this.size.x; i++) {
      for (let j = 0; j < this.size.y; j++) {
        this.y[i][j] = this.yy[i][j];
        let color = "Yellow";
        // let color = colors[this.y[i][j]];
        if (this.y[i][j] >= 1 && this.y[i][j] <= this.r) {
          color = "Gray";
          // color = colors[this.y[i][j]];
          this.fillCell(i, j, color);
        }
        if (this.y[i][j] > 6 && this.y[i][j] <= this.s) {
          this.fillCell(i, j, color);
        }

        if (this.y[i][j] == 0) {
          this.fillCell(i, j, "White");
        }
      }
    }
  }

  clearCanvas() {
    this.canvas.clearRect(0, 0, this.grid.width, this.grid.height);
  }

  fillCell(x, y, color = "Black") {
    this.canvas.fillStyle = color;
    this.canvas.fillRect(
      x * this.cellSize,
      y * this.cellSize,
      this.cellSize,
      this.cellSize
    );
  }

  div(a, b) {
    return (a - (a % b)) / b;
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  createNullArrays() {
    for (let i = 0; i <= this.size.x; i++) {
      this.u[i] = [];
      this.y[i] = [];
      this.yy[i] = [];
      for (let j = 0; j <= this.size.y; j++) {
        this.u[i][j] = 0;
        this.y[i][j] = 0;
        this.yy[i][j] = 0;
      }
    }
  }

  step() {
    this.t++;
    // this.osc1(this.t);
    // this.osc2(this.t);
    for (let i = 1; i < this.size.x; i++) {
      for (let j = 1; j < this.size.y; j++) {
        if (this.y[i][j] > 0 && this.y[i][j] < this.s) {
          this.yy[i][j] = this.y[i][j] + 1;
        }

        if (this.y[i][j] == this.s) {
          this.yy[i][j] = 0;
          this.u[i][j] = 0;
        }

        if (this.y[i][j] !== 0) continue;

        for (let ii = i - 1; ii <= i + 1; ii++) {
          for (let jj = j - 1; jj <= j + 1; jj++) {
            if (this.y[ii][jj] > 0 && this.y[ii][jj] <= this.r) {
              this.u[i][j]++;
            }
            if (this.u[i][j] >= this.h) {
              this.yy[i][j] = 1;
            }
          }
        }
      }
    }

    // this.obstacle();

    this.fillGrid();
  }

  main() {
    this.step();
    setTimeout(() => {
      this.main();
    }, 5);
  }

  // реакция Белоусова-Жаботинского
  wavesBelousovZhabotinsky() {
    for (let i = 0; i < this.size.x; i++) {
      for (let j = 0; j < this.size.y; j++) {
        this.y[i][j] = Math.round(this.getRandomArbitrary(1, 400) / 10);
        if (this.y[i][j] > 15) this.y[i][j] = 0;
      }
    }
  }

  // одиночная волна
  oneWave() {
    this.y[Math.round(this.size.x / 2)][Math.round(this.size.y / 2)] = 1;
  }

  // однорукавная волна
  singleSleeveWave() {
    for (let i = 0; i < this.size.x / 2; i++) {
      for (let j = 0; j < this.s; j++) {
        this.y[Math.round(this.size.x / 2) + j][i] = j;
      }
    }
  }

  // двурукавная волна
  doubleSleeveWave() {
    for (let j = 0; j < this.numberWidthCells; j++) {
      for (let i = 0; i < this.s; i++) {
        this.y[40 + i][j] = i;
        if (j > 40) {
          this.y[40 + i][j] = 14 - i;
        }
      }
    }
  }

  // первый осциллятор
  osc1(t) {
    if (t == Math.round(t / 20) * 20) {
      this.y[30][30] = 1;
    }
  }

  // второй осциллятор
  osc2(t) {
    if (t == Math.round(t / 30) * 30) {
      this.y[20][50] = 1;
    }
  }

  // препятствие
  obstacle() {
    for (let i = 0; i < 70; i++) {
      this.yy[i][60] = 0;
      this.yy[i][61] = 0;
    }
  }
}
