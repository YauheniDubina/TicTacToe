const cells = document.querySelectorAll(".item");
let currentPlayer;
let step = 0;
const currentTurn = document.querySelector(".turn");
const result = document.querySelectorAll("td");
let currentMove = ["", "", "", "", "", "", "", "", ""];
const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// check start
setTimeout(() => {
  try {
    currentPlayer = prompt("Who starts X or O?");
    currentTurn.innerHTML += `Player ${currentPlayer} turn`;
    if (currentPlayer != `X` && currentPlayer != `O`) {
      throw new Error("invalid letter");
    }
  } catch (error) {
    currentPlayer = ``;
    cells.forEach((btn) => (btn.disabled = true));

    alert(error);
    alert(`Page will reload `);
    setTimeout(() => location.reload(), 0);
  }
}, 100);

// game logic
const play = (element, index) => {
  let winner;
  element.innerHTML = currentPlayer;
  element.disabled = true;
  currentMove[index] = currentPlayer;
  currentPlayer = currentPlayer == `X` ? `O` : `X`;
  currentTurn.innerHTML = `Player ${currentPlayer} turn`;
  step++;
  for (let i = 0; i < winCombinations.length; i++) {
    let condition = winCombinations[i];

    let a = currentMove[condition[0]];
    let b = currentMove[condition[1]];
    let c = currentMove[condition[2]];
    if (a == "" || b == "" || c == "") {
      continue;
    }
    if (a == b && a == c) {
      a == `X`
        ? (result.innerHTML = Number(++result[0].innerHTML))
        : (result.innerHTML = Number(++result[2].innerHTML));
      currentTurn.innerHTML = `Player ${a} won`;
      alert(`Player ${a} won`);
      cells.forEach((btn) => (btn.disabled = true));
      winner = a;
      break;
    }
  }

  if (step == 9 && !winner) {
    result.innerHTML = Number(++result[1].innerHTML);
    currentTurn.innerHTML = `DRAW`;
    alert(`Draw`);
  }
  return;
};

cells.forEach((item, index) => {
  item.addEventListener("click", () => play(item, index));
});

//Start again
const resetButton = document.querySelector(".reset");
const reload = () => {
  step = 0;
  currentTurn.innerHTML = `Player ${currentPlayer} turn`;
  cells.forEach((btn) => {
    btn.innerHTML = ``;
    btn.disabled = false;
  });
  currentMove = currentMove.map((item) => (item = ``));
};
resetButton.addEventListener("click", () => reload());
