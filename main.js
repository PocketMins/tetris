// myTable.onmouseover = function(){
//     myTable.setAttribute("align","center");
//     myTable.setAttribute("border","1px solid");
//     myTable.setAttribute("bgcolor","#FF0000");
//   };
//   var MyTable = document.getElementById('myTable');
// var rows = MyTable.getElementsByTagName('tr');
// for (var i = 0; i < rows.length; i++) {
//     rows[i].onmouseover = function() {
//         this.style.backgroundColor = '#ff0000';
//     }
//     rows[i].onmouseout = function() {
//         this.style.backgroundColor = '#ffffff';
//     }
// }

const tetrisBoard = new Array(20);
for (let i = 0; i < tetrisBoard.length; i++) {
    tetrisBoard[i] = new Array(10).fill(false);
}

document.addEventListener('DOMContentLoaded', () => {
    const tetrisTable = document.getElementById('TetrisTable');
    let table = '';
    tetrisBoard[19][9] = true;
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
    document.getElementById("TetrisTable").innerHTML = table; // '<tr></tr><tr></tr>.....</tr>'
    // const rows = tetrisBoard.map(row => {
    //     return '<tr>'
    //         + row.map(cell => cell === true ? '<td style="background-color: lightblue;"></td>' : '<td></td>').join('')
    //         + '</tr>';
    //     });
    // tetrisTable.innerHTML = rows.join('');
});

const clearRow = (rowNumber) => {
    const row = tetrisBoard[rowNumber];
    for (let i = 0; i < row.length; i++) {
        row[i] = false;
    }
}

const fillRow = (rowNumber) => {
    const row = tetrisBoard[rowNumber];
    for (let i = 0; i < row.length; i++) {
        row[i] = true;
    }
}