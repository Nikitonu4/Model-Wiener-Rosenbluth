/* eslint-disable class-methods-use-this */
class CellularAutomaton {
  constructor(N = 110, M = 90, s = 13, r = 6, h = 5, cellSize = 6) {
    this.N = N;
    this.M = M;
    this.s = s;
    this.r = r;
    this.h = h;
    this.y = [];
    this.yy = [];
    this.u = [];
    this.k = 60;
    this.cells = []; // массив клеток
    this.buffCells = [];

    this.cellSize = cellSize; // размер клетки
    this.grid = document.getElementById("grid").getContext("2d"); // канвас для сетки
    this.canvas = document.getElementById("canvas").getContext("2d");

    this.numberHeightCells = 1100; // количество клеток по высоте
    this.numberWidthCells = 900; // количество клеток по ширине
    this.init();
    this.createNullArrays();

    this.t = 0;

    for (let i = 0; i < this.size.x; i++) {
      // реакция Белоусова-Жаботинского
      for (let j = 0; j < this.size.y; j++) {
        this.y[i][j] = Math.round(this.getRandomArbitrary(1, 400) / 10);
        if (this.y[i][j] > 15) this.y[i][j] = 0;
      }
    }

    // for (let j = 0; j < this.numberWidthCells; j++) {
    //   for (let i = 0; i < 40; i++) {
    //     this.y[40 + i][j] = i;
    //     if (j > 40) {
    //       this.y[40 + i][j] = 14 - i;
    //     }
    //   }
    // }

    this.main();
    // this.y[50][50] = 1;
    // this.fillCell(50, 50);
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
    console.log(this.t);
    this.t++;
    for (let i = 2; i < this.size.x; i++) {
      for (let j = 2; j < this.size.y; j++) {
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

    // for (let i = 0; i < this.size.x; i++) {
    //   for (let j = 0; j < this.size.y; j++) {
    //     this.y[i][j] = this.yy[i][j];
    //   }
    // }

    this.fillGrid();
  }

  main() {
    this.step();
    setTimeout(() => {
      this.main();
    }, 20);
    // while (t != 1000) {

    // дальше вывод
    // for (let i = 0; i <= this.N; i++) {
    //   for (let j = 0; j <= this.M; j++) {
    //     this.y[i][j] = this.yy[i][j];
    //     if (this.y[i][j] >= 1 && this.y[i][j] <= this.r) {
    //       this.fillCell(i, j);
    //     }
    //     if (this.y[i][j] > 6 && this.y[i][j] <= this.s) {
    //       this.fillCell(i, j);
    //     }
    //   }
    // }
    // }
  }

  init() {
    this.grid.clearRect(0, 0, this.grid.width, this.grid.height);
    /** устанавливаем размеры */
    this.grid.width = this.cellSize * this.numberWidthCells; // умножаем на numberWidthCells.value
    this.grid.height = this.cellSize * this.numberHeightCells;

    this.size = { x: this.numberWidthCells, y: this.numberHeightCells };
    this.newGridFill();
    this.gridDraw();
  }

  newGridFill() {
    // создание новой сетки
    for (let i = 0; i < this.size.x; i++) {
      this.cells[i] = [];
      this.buffCells[i] = [];
      for (let j = 0; j < this.size.y; j++) {
        this.cells[i][j] = false;
        this.buffCells[i][j] = false;
      }
    }
  }

  gridDraw() {
    this.grid.beginPath();
    const widthGrid = this.numberWidthCells * this.cellSize;
    const heightGrid = this.numberHeightCells * this.cellSize;

    /*
    задаю параметры сетки
    */
    this.grid.strokeStyle = "rgb(50, 50, 50)";
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

    // делаем фон
    // this.grid.beginPath();
    // this.grid.fillStyle = "#213b32";
    // this.grid.fillRect(this.numberWidthCells * this.cellSize, 0, 10000, 10000);
    // this.grid.fillRect(0, this.numberHeightCells * this.cellSize, 10000, 10000);

    // this.grid.stroke();
  }

  // randomFill() {
  //   /** Заполняем матрицу */
  //   for (let i = 0; i < this.size.x; i++) {
  //     for (let j = 0; j < this.size.y; j++) {
  //       const fill = Math.random() < 0.5;
  //       this.cells[i][j] = fill;
  //     }
  //   }
  //   /** Отрисовываем */
  //   this.fillGrid();
  // }

  fillGrid() {
    const colors = [
      "Black",
      "Blue",
      "Green",
      "Cyan",
      "Red",
      "#FF00FF",
      "Brown",
      "LightGray",
      "DarkGray",
      "LightBlue",
      "LightGreen",
      "LightCyan",
      "LightRed",
      "LightMagnenta",
      "Yellow",
      "White",
    ];
    this.clearCanvas();
    for (let i = 0; i < this.size.x; i++) {
      for (let j = 0; j < this.size.y; j++) {
        this.y[i][j] = this.yy[i][j];
        let color = "Pink";
        if (this.y[i][j] >= 1 && this.y[i][j] <= this.r) {
          color = "Gray";
          this.fillCell(i, j, color);
        }
        if (this.y[i][j] > 6 && this.y[i][j] <= this.s) {
          this.fillCell(i, j, color);
        }
      }
    }
  }

  clearCanvas() {
    this.canvas.clearRect(0, 0, this.grid.width, this.grid.height);
  }

  fillCell(x, y, color = "black") {
    this.canvas.fillStyle = color;
    this.canvas.fillRect(
      x * this.cellSize,
      y * this.cellSize,
      this.cellSize,
      this.cellSize
    );
  }
}
