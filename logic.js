// Initialize variables
let board;
let score = 0;
let rows = 4;
let columns = 4;

function setGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      let num = board[r][c];
      updateTile(tile, num);
      document.getElementById("board").append(tile);
    }
  }
}

function updateTile(tile, num) {
  tile.innerText = "";
  tile.classList.value = "";
  tile.classList.add("tile");
  if (num > 0) {
    tile.innerText = num.toString();
    if (num < 8192) {
      tile.classList.add("x" + num.toString());
    } else {
      tile.classList.add("x8192");
    }
  }
}

window.onload = function () {
  setGame();
}; // call setGame;

function handleSlide(e) {
  console.log(e.code);

  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    if (e.code === "ArrowUp") {
      slideUp();
    } else if (e.code === "ArrowDown") {
      slideDown();
    } else if (e.code === "ArrowLeft") {
      slideLeft();
    } else if (e.code === "ArrowRight") {
      slideRight();
    } else {
      console.log("Wrong key");
    }
  }
}

document.addEventListener("keydown", handleSlide);

function filterZero(row) {
  return row.filter((num) => num != 0);
}

function slide(row) {
  row = filterZero(row);

  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] == row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
    }
  }

  row = filterZero(row);

  while (row.length < columns) {
    row.push(0);
  }

  return row;
}

function slideUp() {
  for (let c = 0; c < columns; c++) {
    let col = [];
    for (let r = 0; r < rows; r++) {
      col.push(board[r][c]);
    }
    col = slide(col);

    for (let r = 0; r < rows; r++) {
      board[r][c] = col[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideDown() {
  for (let c = 0; c < columns; c++) {
    let col = [];
    for (let r = 0; r < rows; r++) {
      col.push(board[r][c]);
    }
    col.reverse();
    col = slide(col);
    col.reverse();

    for (let r = 0; r < rows; r++) {
      board[r][c] = col[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideLeft() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = slide(row);
    board[r] = row;
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row.reverse();
    row = slide(row);
    row.reverse();
    board[r] = row;
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}
