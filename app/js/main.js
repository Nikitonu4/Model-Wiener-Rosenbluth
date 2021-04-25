'use strict;';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// ПОКОЙ, ВОЗБУЖДЕНИЕ, РЕФРАКТЕРНОСТЬ
// Элемент в покое, если y[i][j] == 0
// Рефрактерность - элемент не может возбуждаться, через
const N = 50;
const M = 50;
const s = 13; // через s состояний элемент возвращается в состояние покоя
const r = 6; // Рефрактерность после r состояний(до r - элемент возбужден)
const h = 5; // пороговое значение концентрации активатора, после него элемент возбуждается

// через s шагов после возбуждения элемент возвращается в состояние покоя.
// из s в состояние покоя => концентрация активатора u[i][j] = 0
// s>r !!!!!!!!!!!!

// есть возбужденный сосед => концентрация элемента u[i][j]++
// Если l ближайших соседей возбуждены, то на соот- ветствующем шаге к предыдущему значению концентрации активатора
// прибавляется число возбужденных соседей

let y = [];
let yy = []; // t+1 массив на следующем шаге
let u = []; // массив концентрации активатора
let ii; let jj; let t = 0;
const k = 0;

for (i = 0; i < N + 1; i++) {
  u[i] = [];
  y[i] = [];
  yy[i] = [];
  for (let j = 0; j < M + 1; j++) {
    u[i][j] = 0;
    y[i][j] = 0;
    yy[i][j] = 0;
  }
}
// тут будет начальное распределение
y[25][25] = 1;

// цикл по времени
while (t != 100) {
  t++;
  for (i = 1; i < N; i++) {
    for (j = 1; j < M; j++) {
      if ((y[i][j] > 0) && (y[i][j] < s)) {
        yy[i][j]++;
      }

      if (y[i][j] == s) {
        yy[i][j] = 0;
        u[i][j] = 0;
      }

      if (y[i][j] !== 0) continue;

      for (ii = i - 1; ii < i + 1; ii++) {
        for (jj = j - 1; jj < j + 1; jj++) {
          if ((y[ii][jj] > 0) && (y[ii][jj] <= r)) {
            u[i][j]++;
          }
          if (u[i][j] >= h) {
            yy[i][j] = 1;
          }else{ // этого не было в алгоритме
            yy[i][j] = 0;
          }
        }
      }
    }
  }
  y = yy;
  

  // дальше вывод
  for (i = 0; i <= N; i++) {
    for (j = 0; j <= M; j++) {
      y[i][j] = yy[i][j];

      color = 'Green';
      if (y[i][j] >= 1 && y[i][j] <= r) {
        ctx.beginPath();
        ctx.arc(6 * i - 10, 1000 - 6 * j, 3, 2 * Math.PI, true);
        // ctx.lineWidth = 1;
        ctx.strokeStyle = color;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
      }
      color = 'Red';
      if (y[i][j] > 6 && y[i][j] <= s) {
        ctx.beginPath();
        ctx.arc(6 * i - 10, 1000 - 6 * j, 2, 2 * Math.PI, true);
        // ctx.lineWidth = 1;
        ctx.strokeStyle = color;
        ctx.fill();
        ctx.stroke();
      //  ctx.closePath();
      }
    }
  }
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
