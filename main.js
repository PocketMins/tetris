const tetrisBoard = new Array(20);
for (let i = 0; i < tetrisBoard.length; i++) {
    tetrisBoard[i] = new Array(10).fill(false);
}

// const rows = tetrisBoard.map(row => {
//     return '<tr>'
//         + row.map(cell => cell === true ? '<td style="background-color: lightblue;"></td>' : '<td></td>').join('')
//         + '</tr>';
//     });
// tetrisTable.innerHTML = rows.join('');
// });

// const clearRow = (rowNumber) => {
//     const row = tetrisBoard[rowNumber];
//     for (let i = 0; i < row.length; i++) {
//         row[i] = false;
//     }
// }


function checkRow() {
    for (let i = 0; i < 10; i++) {
        if (tetrisBoard[19][0] && tetrisBoard[19][1] && tetrisBoard[19][2] && tetrisBoard[19][3] && tetrisBoard[19][4] && tetrisBoard[19][5] && tetrisBoard[19][6] && tetrisBoard[19][7] && tetrisBoard[19][8] && tetrisBoard[19][9] === true) {
            clearRow(19);
        };
    };
};

function clearRow(rowNumber) {
    const row = tetrisBoard[rowNumber];
    for (let i = 0; i < row.length; i++) {
        row[i] = false;
        for (let j = 0; j < tetrisBoard.length; j++) {
            for (let k = 0; k < tetrisBoard[j].length; k++) {
                tetrisBoard[j][k] = tetrisBoard[j - 1][k]
            };
        };
    };
};
// const fillRow = (rowNumber) => {
//     const row = tetrisBoard[rowNumber];
//     for (let i = 0; i < row.length; i++) {
//         row[i] = true;
//     }
const framesPerSecond = 30
let longBlockX = 3;
let longBlockY = 0;
let currentFrame = 0;
let downPressed = false;
let rightPressed = false;
let leftPressed = false;
let blockMoving = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    else if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    else if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
}

function moveBlock() {
    if (leftPressed && longBlockX > 0 && tetrisBoard[longBlockY][longBlockX - 1] === false) {
        tetrisBoard[longBlockY][longBlockX] = false;
        longBlockX = longBlockX - 1;
    } else if (rightPressed && longBlockX < 9 && tetrisBoard[longBlockY][longBlockX + 1] === false) {
        tetrisBoard[longBlockY][longBlockX] = false;
        longBlockX = longBlockX + 1;
    } else if (downPressed && longBlockY < 19 && tetrisBoard[longBlockY + 1][longBlockX] === false) {
        tetrisBoard[longBlockY][longBlockX] = false;
        longBlockY = longBlockY + 1;
    };
};



document.addEventListener('DOMContentLoaded', () => {
    setInterval(function () {
        // if (currentFrame % 30 === 0) {
        // console.log(dropBlock); }
        createBlock();
        currentFrame++;
        drawBoard()
        moveBlock();
        checkRow();
    }, 1000 / framesPerSecond);
});

function drawBoard() {
    const tetrisTable = document.getElementById('TetrisTable');
    let table = '';
    for (let i = 0; i < tetrisBoard.length; i++) {
        table = table + '<tr>';
        for (let j = 0; j < tetrisBoard[i].length; j++) {
            if (tetrisBoard[i][j] === true) {
                table = table + '<td style="background-color: blue;"></td>'
            }
            else {
                table = table + '<td></td>'
            }
        }
        table = table + '</tr>';
    }
    document.getElementById("TetrisTable").innerHTML = table;
}

function createBlock() {
    dropBlock();
    longBlock();

};

function longBlock() {
    if (longBlockY < 19) {
        tetrisBoard[longBlockY][longBlockX] = true;
    };
};

function dropBlock() {
    if (longBlockY === 19) {
        tetrisBoard[longBlockY][longBlockX] = true;
        longBlockX = 3;
        longBlockY = 0;
    } else if (tetrisBoard[longBlockY + 1][longBlockX] === true) {
        tetrisBoard[longBlockY][longBlockX] = true;
        longBlockX = 3;
        longBlockY = 0;
    } else if (longBlockY < 19) {
        if (currentFrame % 30 === 0) {
        tetrisBoard[longBlockY][longBlockX] = false;
        if (longBlockY <= tetrisBoard.length - 1) {
            longBlockY = longBlockY + 1;
            }
        };
    };
};
