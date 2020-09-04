const tetrisBoard = new Array(20);
const framesPerSecond = 30;
let longBlockX = 3;
let longBlockY = 0;
let currentFrame = 0;

for (let i = 0; i < tetrisBoard.length; i++) {
  tetrisBoard[i] = new Array(10).fill(false);
}

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
  if (e.key == "Left" || e.key == "ArrowLeft") {
    if (canBlockMoveLeft()) {
      moveBlockLeft();
    }
  } else if (e.key == "Right" || e.key == "ArrowRight") {
    if (canBlockMoveRight()) {
      moveBlockRight();
    }
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    moveBlockDown();
  }
}

const moveBlockLeft = () => {
  setBlock(false);
  longBlockX = longBlockX - 1;
  setBlock(true);
};

const moveBlockRight = () => {
  setBlock(false);
  longBlockX = longBlockX + 1;
  setBlock(true);
};

const canBlockMoveRight = () => {
  return longBlockX < 9 && !tetrisBoard[longBlockY][longBlockX + 1];
};

const canBlockMoveLeft = () => {
  return longBlockX > 0 && !tetrisBoard[longBlockY][longBlockX - 1];
};

document.addEventListener("DOMContentLoaded", () => {
  setBlock(true);
  setInterval(function() {
    currentFrame++;
    if (currentFrame === 30) {
      currentFrame = 0;
      if (isBlockAtBottom()) {
        createNewBlock();
      } else {
        moveBlockDown();
      }
    }
    clearCompletedRows();
    drawBoard();
  }, 1000 / framesPerSecond);
});

const isBlockAtBottom = () => {
  return longBlockY === 19 || tetrisBoard[longBlockY + 1][longBlockX];
};

function drawBoard() {
  const tetrisTable = document.getElementById("TetrisTable");
  let table = "";
  for (let i = 0; i < tetrisBoard.length; i++) {
    table = table + "<tr>";
    for (let j = 0; j < tetrisBoard[i].length; j++) {
      if (tetrisBoard[i][j] === true) {
        table = table + '<td style="background-color: blue;"></td>';
      } else {
        table = table + "<td></td>";
      }
    }
    table = table + "</tr>";
  }
  tetrisTable.innerHTML = table;
}

function moveBlockDown() {
  if (isBlockAtBottom()) {
    createNewBlock();
  } else {
    setBlock(false);
    longBlockY = longBlockY + 1;
    setBlock(true);
  }
}

const createNewBlock = () => {
  longBlockX = 3;
  longBlockY = 0;
  setBlock(true);
  currentFrame = 0;
};

const setBlock = value => {
  tetrisBoard[longBlockY][longBlockX] = value;
};

const clearCompletedRows = () => {
  for (let i = 19; i >= 0; i--) {
    if (isRowComplete(i)) {
      shiftRowsAboveDown(i);
    }
  }
};

const isRowComplete = rowNumber => {
  const row = tetrisBoard[rowNumber];
  for (let i = 0; i < row.length; i++) {
    if (!row[i]) {
      return false;
    }
  }
  return true;
};

const shiftRowsAboveDown = rowNumber => {
  for (let i = rowNumber; i > 0; i--) {
    tetrisBoard[i] = tetrisBoard[i - 1];
  }
  tetrisBoard[0] = new Array(10).fill(false);
};
