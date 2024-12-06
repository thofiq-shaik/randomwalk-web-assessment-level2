let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameOver = false;
let scoreX = 0;
let scoreO = 0;
function updateScoreboard() {
    document.getElementById("score-x").innerHTML = scoreX;
    document.getElementById("score-o").innerHTML = scoreO;
}
const gameOptions = document.getElementById("game-options");
const newGameButton = document.getElementById("new-game");
const continueGameButton = document.getElementById("continue-game");
function resetGameBoard() {
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    gameOptions.style.display = "none";

    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
    });
}
newGameButton.addEventListener("click", () => {
    scoreX = 0;
    scoreO = 0;
    updateScoreboard();
    resetGameBoard();
});
continueGameButton.addEventListener("click", () => {
    resetGameBoard();
});
boxes.forEach(e => {
    e.innerHTML = "";
    e.addEventListener("click", () => {
        if (!isGameOver && e.innerHTML === "") {
            e.innerHTML = turn;
            cheakWin();
            cheakDraw();
            changeTurn();
        }
    });
});
function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    } else {
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    }
}
function cheakWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < winConditions.length; i++) {
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if (v0 != "" && v0 === v1 && v0 === v2) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = turn + " wins!";
            gameOptions.style.display = "block";

            for (let j = 0; j < 3; j++) {
                boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6";
                boxes[winConditions[i][j]].style.color = "#000";
            }
            if (turn === "X") {
                scoreX++;
            } else {
                scoreO++;
            }
            updateScoreboard();
        }
    }
}
function cheakDraw() {
    if (!isGameOver) {
        let isDraw = true;
        boxes.forEach(e => {
            if (e.innerHTML === "") isDraw = false;
        });
        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "It's a draw!";
            gameOptions.style.display = "block";
        }
    }
}
function showPopup(message) {
    const overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.innerHTML = message;
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.animationDelay = Math.random() * 2 + "s";
        confetti.style.animationDuration = Math.random() * 2 + 3 + "s";
        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
    setTimeout(() => {
        overlay.remove();
    }, 3000);
}
function cheakWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < winConditions.length; i++) {
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if (v0 != "" && v0 === v1 && v0 === v2) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = turn + " wins!";
            gameOptions.style.display = "block";
            for (let j = 0; j < 3; j++) {
                boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6";
                boxes[winConditions[i][j]].style.color = "#000";
            }
            if (turn === "X") {
                scoreX++;
            } else {
                scoreO++;
            }
            updateScoreboard();
            showPopup(`${turn} wins!`);
        }
    }
}
updateScoreboard();
