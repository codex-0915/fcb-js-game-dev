// Initialize variables
let board;
let score = 0;
let rows = 4;
let columns = 4;

let is2048Exist = false;
let is4096Exist = false;
let is8192Exist = false;

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

  setRandomTile();
  setRandomTile();
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
      setRandomTile();
    } else if (e.code === "ArrowDown") {
      slideDown();
      setRandomTile();
    } else if (e.code === "ArrowLeft") {
      slideLeft();
      setRandomTile();
    } else if (e.code === "ArrowRight") {
      slideRight();
      setRandomTile();
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

function hasEmptyTile() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] == 0) {
        return true;
      }
    }
  }
  return false;
}

function setRandomTile() {
  if (!hasEmptyTile()) {
    window.alert("Game Over");
  }

  let found = false;

  while (!found) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);
    if (board[r][c] == 0) {
      let randNum = Math.random() < 0.9 ? 2 : 4;
      board[r][c] = randNum;
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      tile.innerText = randNum.toString();
      tile.classList.add("x" + randNum.toString());

      found = true;
    }
  }
}
