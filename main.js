const tetrisBoard = new Array(20);
const framesPerSecond = 30;
let blockX;
let blockY;
let currentFrame = 0;
let blockShape;

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
  } else if (e.key == " " || e.key == "Space") {
    instantDown();
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

const instantDown = () => {
  setBlock(false);
  if (canBlockDownInstantly()) {
    for (let i = 0; i < tetrisBoard.length; i++) {
      if (tetrisBoard[blockY + i][blockX]) {
        return (tetrisBoard[i - 1][blockX] = true);
      }
    }
  } else {
    blockY = 19;
  }
  setBlock(true);
  createNewBlock();
};

const canBlockMoveRight = () => {
  return blockX < 9 && !tetrisBoard[blockY][blockX + 1];
};

const canBlockMoveLeft = () => {
  return blockX > 0 && !tetrisBoard[blockY][blockX - 1];
};

const canBlockDownInstantly = () => {
  for (let i = 0; i < tetrisBoard.length; i++) {
    if (tetrisBoard[blockY + i][blockX]) {
      return true;
      // return (let = tetrisBoard[blockY - i][blockX]);
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  createNewBlock();
  setInterval(function () {
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
    blockY = blockY + 1;
    setBlock(true);
  }
}

const createNewBlock = () => {
  // switch (Math.floor(Math.random() * 1)) {
  //   case 0:
  //     blockShape = blockI();
  //     break;
  //   case 1:
  //     blockShape = blockO();
  //     break;
  //   case 2:
  //     blockShape = blockT();
  //     break;
  //   case 3:
  //     blockShape = blockL();
  //     break;
  //   case 4:
  //     blockShape = blockJ();
  //     break;
  //   case 5:
  //     blockShape = blockS();
  //     break;
  //   case 6:
  //     blockShape = blockZ();
  // }
  blockX = 3;
  blockY = 0;
  setBlock(true);
  currentFrame = 0;
};

const setBlock = (value) => {
  tetrisBoard[blockY][blockX] = value;
};

const clearCompletedRows = () => {
  for (let i = 19; i >= 0; i--) {
    if (isRowComplete(i)) {
      shiftRowsAboveDown(i);
    }
  }
};

const isRowComplete = (rowNumber) => {
  const row = tetrisBoard[rowNumber];
  for (let i = 0; i < row.length; i++) {
    if (!row[i]) {
      return false;
    }
  }
  return true;
};

const shiftRowsAboveDown = (rowNumber) => {
  tetrisBoard.splice(rowNumber, 1);
  tetrisBoard.unshift(new Array(10).fill(false));
};

const blockI = (value) => {
  tetrisBoard[blockY][blockX] = value;
  tetrisBoard[blockY + 1][blockX] = value;
  tetrisBoard[blockY + 2][blockX] = value;
  tetrisBoard[blockY + 3][blockX] = value;
};
