class Block {
  x;
  y;
  type;
  rotation;
  board;

  boxPositions = {
    long: [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 }
    ],
    t: [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 }
    ]
  };

  constructor(board, x, y, type = 'long', rotation = 'down') {
    this.board = board;
    this.x = x;
    this.y = y;
    this.type = type;
    this.rotation;
  }

  getAllBoxes() {
    return this.boxPositions[this.type].map(position => ({
      x: this.x + position.x,
      y: this.y + position.y
    }));
  }

  isAtBottom() {
    const boxes = this.getAllBoxes();
    return (
      !!boxes.find(box => box.y === this.board.length - 1) ||
      !!boxes.find(box => this.board[box.y + 1][box.x])
    );
  }

  moveLeft() {
    this.x--;
  }

  moveRight() {
    this.x++;
  }

  moveDown() {
    this.y++;
  }

  canMoveRight() {
    const boxes = this.getAllBoxes();
    return (
      !boxes.find(box => box.x === 9) &&
      !boxes.find(box => this.board[box.y][box.x + 1])
    );
  }

  canMoveLeft() {
    const boxes = this.getAllBoxes();
    return (
      !boxes.find(box => box.x === 0) &&
      !boxes.find(box => this.board[box.y][box.x - 1])
    );
  }

  move(y, x) {
    this.y = y;
    this.x = x;
  }
}

const initBoard = () => {
  const board = new Array(20);
  for (let i = 0; i < board.length; i++) {
    board[i] = new Array(10).fill(false);
  }
  return board;
};

const board = initBoard();
const framesPerSecond = 30;
let currentFrame = 0;
let currentBlock;

document.addEventListener('keydown', keyDownHandler, false);

const addToBoard = block => {
  const boxes = block.getAllBoxes();
  for (let box of boxes) {
    board[box.y][box.x] = true;
  }
};

function keyDownHandler(e) {
  if (e.key == 'Left' || e.key == 'ArrowLeft') {
    if (currentBlock.canMoveLeft()) {
      currentBlock.moveLeft();
    }
  } else if (e.key == 'Right' || e.key == 'ArrowRight') {
    if (currentBlock.canMoveRight()) {
      currentBlock.moveRight();
    }
  } else if (e.key == 'Down' || e.key == 'ArrowDown') {
    moveBlockDown();
  }
}

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

function hasBlock(y, x) {
  const allCurrentBlockBoxes = currentBlock.getAllBoxes();
  return !!allCurrentBlockBoxes.find(box => box.y === y && box.x === x);
}

function drawBoard() {
  const tetrisTable = document.getElementById('TetrisTable');
  let table = '';
  for (let i = 0; i < board.length; i++) {
    table = table + '<tr>';
    for (let j = 0; j < board[i].length; j++) {
      if (hasBlock(i, j)) {
        table = table + '<td style="background-color: red;"></td>';
      } else if (board[i][j] === true) {
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
  if (currentBlock.isAtBottom()) {
    addToBoard(currentBlock);
    createNewBlock();
  } else {
    currentBlock.moveDown();
  }
}

const createNewBlock = () => {
  currentBlock = new Block(board, 3, 0);
  currentFrame = 0;
};

const clearCompletedRows = () => {
  for (let i = 19; i >= 0; i--) {
    if (isRowComplete(i)) {
      shiftRowsAboveDown(i);
    }
  }
};

const isRowComplete = rowNumber => {
  const row = board[rowNumber];
  for (let i = 0; i < row.length; i++) {
    if (!row[i]) {
      return false;
    }
  }
  return true;
};

const shiftRowsAboveDown = rowNumber => {
  board.splice(rowNumber, 1);
  board.unshift(new Array(10).fill(false));
};
