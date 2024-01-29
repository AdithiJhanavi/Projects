
let score = localStorage.getItem("score");

var scoreBoard = document.getElementById("score-board");

var messageBox = document.getElementById("message");

scoreBoard.innerHTML = score;
const messages = [
  `Well, You may not be the<br> Chosen One in this game.`,
  "You must have been Petrified by challenges.",
  `I solemnly swear that <br> your up to good things.`,
  "Mischief managed and success secured!"
];

if (score <= 5) {
  messageIndex = 0;
} else if (score >= 6 && score <= 8) {
  messageIndex = 1;
} else if (score >= 9 && score <= 11) {
  messageIndex = 2;
} else {
  messageIndex = 3;
}

messageBox.innerHTML = messages[messageIndex];
messageBox.style.textAlign = "center";
const button = document.getElementById("btn");

button.onclick = () => {
  location.href = "fourth.html";
};