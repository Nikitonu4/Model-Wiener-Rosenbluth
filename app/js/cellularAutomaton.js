/* eslint-disable class-methods-use-this */
class CellularAutomaton {
  constructor(N = 110, M = 90, s = 13, r = 6, h = 5, cellSize = 10) {
    this.N = N;
    this.M = M;
    this.s = s;
    this.r = r;
    this.h = h;
    this.y = [];
    this.yy = [];
    this.u = [];

    this.cells = []; // массив клеток
    this.buffCells = [];
    this.cellSize = cellSize; // размер клетки
    this.grid = document.getElementById('grid').getContext('2d');
    this.canvas = document.getElementById('canvas').getContext('2d');
    // this.grid.translate(0.5, 0.5);

    this.inputHeight = this.inputWidth = 1000;
    this.init();
    this.createNullArrays();
    // this.main()
    for(let i = 0; i< 100; i++){
      this.fillCell(i, 2);
    }
  }

  main() {
    this.y[25][25] = 1;
    this.fillCell(25, 25);
    let t = 0;
    while (t != 1000) {
      console.log(t);
      t++;
      for (let i = 1; i < this.N; i++) {
        for (let j = 1; j < this.M; j++) {
          if ((this.y[i][j] > 0) && (this.y[i][j] < this.s)) {
            this.yy[i][j]++;
          }

          if (this.y[i][j] == this.s) {
            this.yy[i][j] = 0;
            this.u[i][j] = 0;
          }

          if (this.y[i][j] !== 0) continue;

          for (let ii = i - 1; ii < i + 1; ii++) {
            for (let jj = j - 1; jj < j + 1; jj++) {
              if ((this.y[ii][jj] > 0) && (this.y[ii][jj] <= this.r)) {
                this.u[i][j]++;
              }
              if (this.u[i][j] >= this.h) {
                this.yy[i][j] = 1;
              } else { // этого не было в алгоритме
                this.yy[i][j] = 0;
              }
            }
          }
        }
      }
      this.y = this.yy;

      // дальше вывод
      for (let i = 0; i <= this.N; i++) {
        for (let j = 0; j <= this.M; j++) {
          this.y[i][j] = this.yy[i][j];

          // color = 'Green';
          if (this.y[i][j] >= 1 && this.y[i][j] <= this.r) {
            this.fillCell(i,j);
          }
          //   // this.canvas.beginPath();
          //   // this.canvas.arc(6 * i - 10, 1000 - 6 * j, 3, 2 * Math.PI, true);
          //   // this.canvas.strokeStyle = color;
          //   // this.canvas.fill();
          //   // this.canvas.stroke();
          //   // this.canvas.closePath();
          // }
          // // color = 'Red';
          if (this.y[i][j] > 6 && this.y[i][j] <= this.s) {
            this.fillCell(i,j);
            //   // this.fillCell(i, j);
            //   // this.canvas.beginPath();
            //   // this.canvas.arc(6 * i - 10, 1000 - 6 * j, 2, 2 * Math.PI, true);
            //   // this.canvas.strokeStyle = color;
            //   // this.canvas.fill();
            //   // this.canvas.stroke();
            // }
          }
        }
      }
    }
  }

  createNullArrays() {
    for (let i = 0; i < this.N + 1; i++) {
      this.u[i] = [];
      this.y[i] = [];
      this.yy[i] = [];
      for (let j = 0; j < this.M + 1; j++) {
        this.u[i][j] = 0;
        this.y[i][j] = 0;
        this.yy[i][j] = 0;
      }
    }
  }

  init() {
    this.grid.clearRect(0, 0, this.grid.width, this.grid.height);

    /** устанавливаем размеры */
    this.grid.width = this.cellSize * this.inputWidth; // умножаем на this.inputWidth.value
    this.grid.height = this.cellSize * this.inputHeight;

    this.size = { x: this.inputWidth, y: this.inputHeight };
    this.newGridFill();
    this.gridDraw();
  }

  newGridFill() {
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
    const widthCanvas = this.inputWidth * this.cellSize;
    const heightCanvas = this.inputHeight * this.cellSize;

    for (let i = 0; i <= this.size.y; i++) {
      this.grid.moveTo(0, i * this.cellSize + 0.5);
      this.grid.lineWidth = 1;
      this.grid.lineTo(widthCanvas, i * this.cellSize + 0.5);
      this.grid.strokeStyle = 'rgb(50, 50, 50)'; // цвет линии
    }

    for (let i = 0; i <= this.size.x; i++) {
      this.grid.lineWidth = 1;
      this.grid.moveTo(i * this.cellSize + 0.5, 0);
      this.grid.lineTo(i * this.cellSize + 0.5, heightCanvas);
      this.grid.strokeStyle = 'rgb(50, 50, 50)'; // цвет линии
    }

    this.grid.stroke();

    this.grid.beginPath();
    this.grid.fillStyle = '#213b32';
    this.grid.fillRect(this.inputWidth * this.cellSize, 0, 10000, 10000);
    this.grid.fillRect(0, this.inputHeight * this.cellSize, 10000, 10000);

    this.grid.stroke();
  }

  randomFill() {
    /** Заполняем матрицу */
    for (let i = 0; i < this.size.x; i++) {
      for (let j = 0; j < this.size.y; j++) {
        const fill = (Math.random() < 0.5);
        this.cells[i][j] = fill;
      }
    }
    /** Отрисовываем */
    this.fillGrid();
  }

  fillGrid() {
    this.clearGrid();
    for (let i = 0; i < this.size.x; i++) {
      for (let j = 0; j < this.size.y; j++) {
        // if (this.cells[i][j] === true) {
        //   this.fillCell(i, j);
        // }
        if (this.cells[i][j] >= 1) {
          this.fillCell(i, j);
        }
      }
    }
  }

  clearGrid() {
    this.canvas.clearRect(0, 0, this.grid.width, this.grid.height);
  }

  fillCell(x, y) {
    this.canvas.fillStyle = '#324';
    this.canvas.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
  }
}
