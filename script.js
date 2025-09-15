let game = true;
let player = 0;
let grid = [];
const buttons = document.querySelectorAll('.grid-item')
const endGameScreen = document.querySelector('.end-game');
const resultText = document.querySelector('.result');
const resetButton = document.querySelector('.reset');

function createCell(id) {
    const empty = true;
    const content = ' ';

    return { id, empty, content };
}

function resetDOM() {
    buttons.forEach((button) => {
        button.textContent = '';
    });

    endGameScreen.setAttribute('style', 'display: none');
}

function resetGame() {
    game = true;
    player = 0;

    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            grid[i][j].empty = true;
            grid[i][j].content = ' ';
        }
    }

    resetDOM();
}

function checkWin() {
    for (let i = 0; i < 3; ++i) {
        if (
            grid[i][0].content !== ' ' &&
            grid[i][0].content === grid[i][1].content &&
            grid[i][1].content === grid[i][2].content
        ) {
            return 1;
        }
    }

    for (let j = 0; j < 3; ++j) {
        if (
            grid[0][j].content !== ' ' &&
            grid[0][j].content === grid[1][j].content &&
            grid[1][j].content === grid[2][j].content
        ) {
            return 1;
        }
    }

    if (
        grid[0][0].content !== ' ' &&
        grid[0][0].content === grid[1][1].content &&
        grid[1][1].content === grid[2][2].content
    ) {
        return 1;
    }
    if (
        grid[0][2].content !== ' ' &&
        grid[0][2].content === grid[1][1].content &&
        grid[1][1].content === grid[2][0].content
    ) {
        return 1;
    }

    return 0;
}

function playTurn(player, index) {
    let opt, cell, i, j;

    if (player === 0) {
        opt = 'X';
    } else {
        opt = 'O';
    }

    i = Math.floor((index - 1) / 3);
    j = Math.floor((index - 1) % 3);
    cell = grid[i][j];

    if (cell.empty === true) {
        cell.content = opt;
        cell.empty = false;

        return 1;
    }

    return 0;
}

function checkGame() {
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            if (grid[i][j].content === ' ') {
                return 1;
            }
        }
    }

    return 0;
}

function drawGame() {
    resultText.textContent = "The game ended in a draw";
    endGameScreen.setAttribute('style', 'display: flex');
}

function drawWin(opt) {
    resultText.textContent = "The winner of the game was " + opt;
    endGameScreen.setAttribute('style', 'display: flex');
}

function endGame() {
    let opt;

    if (player === 0) {
        opt = 'X';
    } else {
        opt = 'O';
    }

    drawWin(opt);
}

let id = 1;
for (let i = 0; i < 3; ++i) {
    let row = [];
    for (let j = 0; j < 3; ++j) {
        row.push(createCell(id++));
    }
    grid.push(row);
}

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (game) {
            let index = button.value;
            let opt, next;

            if (player === 0) {
                opt = 'X';
                next = 1;
            } else {
                opt = 'O';
                next = 0;
            }

            if (playTurn(player, index)) {
                button.textContent = opt;

                if (checkWin()) {
                    game = false;
                    endGame();
                } else {
                    if (checkGame() === 0) {
                        drawGame();
                    }
                }

                player = next;
            } else {
                alert("Please, choose a valid position.")
            }
        }
    });
});

resetButton.addEventListener('click', () => {
    resetGame();
});