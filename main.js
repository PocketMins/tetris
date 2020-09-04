const tetrisBoard = new Array(20);
const framesPerSecond = 30;
let blockX;
let blockY;
let currentFrame = 0;

for (let i = 0; i < tetrisBoard.length; i++) {
  tetrisBoard[i] = new Array(10).fill(false);
}

document.addEventListener('keydown', keyDownHandler, false);

function keyDownHandler(e) {
  if (e.key == 'Left' || e.key == 'ArrowLeft') {
    if (canBlockMoveLeft()) {
      moveBlockLeft();
    }
  } else if (e.key == 'Right' || e.key == 'ArrowRight') {
    if (canBlockMoveRight()) {
      moveBlockRight();
    }
  } else if (e.key == 'Down' || e.key == 'ArrowDown') {
    moveBlockDown();
  }
}

const moveBlockLeft = () => {
  setBlock(false);
  blockX = blockX - 1;
  setBlock(true);
};

const moveBlockRight = () => {
  setBlock(false);
  blockX = blockX + 1;
  setBlock(true);
};

const canBlockMoveRight = () => {
  return blockX < 9 && !tetrisBoard[blockY][blockX + 1];
};

const canBlockMoveLeft = () => {
  return blockX > 0 && !tetrisBoard[blockY][blockX - 1];
};

document.addEventListener('DOMContentLoaded', () => {
  createNewBlock();
  setInterval(function() {
    currentFrame++;
    if (currentFrame === 30) {
      currentFrame = 0;
      moveBlockDown();
    }
    clearCompletedRows();
    drawBoard();
  }, 1000 / framesPerSecond);
});

const isBlockAtBottom = () => {
  return blockY === 19 || tetrisBoard[blockY + 1][blockX];
};

function drawBoard() {
  const tetrisTable = document.getElementById('TetrisTable');
  let table = '';
  for (let i = 0; i < tetrisBoard.length; i++) {
    table = table + '<tr>';
    for (let j = 0; j < tetrisBoard[i].length; j++) {
      if (tetrisBoard[i][j] === true) {
        table = table + '<td style="background-color: blue;"></td>';
      } else {
        table = table + '<td></td>';
      }
    }
    table = table + '</tr>';
  }
  tetrisTable.innerHTML = table;
}

function moveBlockDown() {
  if (isBlockAtBottom()) {
    createNewBlock();
  } else {
    setBlock(false);
    blockY = blockY + 1;
    setBlock(true);
  }
}

const createNewBlock = () => {
  blockX = 3;
  blockY = 0;
  setBlock(true);
  currentFrame = 0;
};

const setBlock = value => {
  tetrisBoard[blockY][blockX] = value;
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
  tetrisBoard.splice(rowNumber, 1);
  tetrisBoard.unshift(new Array(10).fill(false));
};
