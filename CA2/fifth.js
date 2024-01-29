const container = document.querySelector(".container")
const startBtn = document.querySelector(".startBtn")
const cursor = document.querySelector(".cursor");
const sparkle = document.querySelector(".sparkle")




const dementors = document.createElement("img");
dementors.setAttribute("class", "dementors");
dementors.setAttribute("src", "./pics/dem.png");
const contHeight = container.offsetHeight;
const contWidth = container.offsetWidth;
setInterval(() => {
    const randTop = Math.random() * (contHeight - 300);
    const randLeft = Math.random() * (contWidth - 300);

    dementors.style.position = "absolute";
    dementors.style.top = randTop + "px";
    dementors.style.left = randLeft + "px";
}, 600);

let score = 0;

startBtn.addEventListener("click", () => {
    container.appendChild(dementors);
    startBtn.innerText = "SCORE:" + score;
});

window.addEventListener("click", (e) => {
    sparkle.style.top = e.pageY + "px";
    sparkle.style.left = e.pageX + "px";

    sparkle.classList.add("visible");
    setTimeout(() => {
        sparkle.classList.remove("visible");
    }, 200);

    if (e.target === dementors)
    {score++;
    startBtn.innerText = "SCORE:" + score;
} 
});
window.addEventListener("mousemove", (e) =>{
    cursor.style.top = e.pageY + "px";
    cursor.style.left = e.pageX + "px";
});


var time=30;
var timer=document.getElementById("timer");
var timerId;

function startTimer() {
    let time = 30;
    timer.innerHTML = time;
    timerId = setInterval(() => {
        time--;
        if (time == 0) {
            clearInterval(timerId);
            endGame();
        }
        timer.innerHTML = time;
    }, 600);
localStorage.setItem("score",score);
}


function resetTime(intervalId) {
    clearInterval(intervalId);
    startTimer();
}

startBtn.addEventListener("click", startTimer);

function endGame() {
    localStorage.setItem("score", score);
    window.location.href = "sixth.html?score=" + score;
}