const cells = document.querySelectorAll(".item");
let currentPlayer;
const currentMove = ["", "", "", "", "", "", "", "", ""];
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



try {
  currentPlayer = prompt("Who starts X or O?");
  if (currentPlayer != `X` && currentPlayer != `O`) {
    throw new Error("invalid letter");
  }
} catch (error) {
  alert(error);
}

const play = (element, index) => {
  element.innerHTML = currentPlayer;
  element.disabled = true;
  currentMove[index] = currentPlayer;
  currentPlayer = currentPlayer == `X` ? `O` : `X`;
  for (let i = 0; i < winCombinations.length; i++) {
    let condition = winCombinations[i];

    let a = currentMove[condition[0]];
    let b = currentMove[condition[1]];
    let c = currentMove[condition[2]];
    if (a == "" || b == "" || c == "") {
      continue;
    }
    if (a == b && a == c) {
      alert(`Player ${a} won`);
      cells.forEach(btn=>btn.disabled=true)
    }
  }
};

cells.forEach((item, index) => {
  item.addEventListener("click", () => play(item, index));
});
