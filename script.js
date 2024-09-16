"use strict";
let rand1 = Math.trunc(Math.random() * 9);
let rand2 = Math.trunc(Math.random() * 9);
let rand3 = Math.trunc(Math.random() * 9);
let rand4 = Math.trunc(Math.random() * 4) + 1;

let inputDis = document.querySelector(".dis");
let scoreEl = document.querySelector(".score");
let time = document.querySelector(".timer");
let highScoreEl = document.querySelector(".high-score");
let gameNum = Math.trunc(Math.random() * 300) + 10;
const toggleBtn = document.querySelector(".toggle");
const beginBtn = document.querySelector(".begin");
const caculator = document.querySelector(".caculator");
const container = document.querySelector(".container");
const randomDis = document.querySelector(".rand-num");
const allBtns = document.querySelectorAll("input");
const equalBtn = document.querySelector(".equal");

let hiddenBtn1 = document.querySelector(`.btn${rand1}`);
let hiddenBtn2 = document.querySelector(`.btn${rand2}`);
let hiddenBtn3 = document.querySelector(`.btn${rand3}`);
let hiddenOpr = document.querySelector(`.operator${rand4}`);
let hiddenButtons = [hiddenBtn1, hiddenBtn2, hiddenBtn3, hiddenOpr];
let startTiming;
let score = 0;
let highScore = 0;

// FUNCTONS
const hideBtn = function (arr) {
  arr.forEach((el) => {
    el.style.opacity = 0;
    el.closest("input").disabled = true;
  });
};

const showBtn = function (arr) {
  arr.forEach((el) => {
    el.style.opacity = 1;
    el.closest("input").disabled = false;
  });
};

const init = function () {
  const storage = localStorage.getItem("highscore");
  if (storage) highScore = highScoreEl.textContent = JSON.parse(storage);
  hideBtn(hiddenButtons);
  randomDis.value = gameNum;
};
init();

const timer = function () {
  let secs = 20;
  startTiming = setInterval(function () {
    time.innerHTML = secs--;
    if (secs == -1) {
      gameOver();
    }
  }, 1000);
};

const disableBtn = function (disable = true) {
  allBtns.forEach((el) => {
    if (el.type === "button") el.disabled = disable;
    clearInterval(startTiming);
    time.innerHTML = 0;
  });
};

const persistHighscore = function (highScore) {
  localStorage.setItem("highscore", JSON.stringify(highScore));
};

const checkHighscore = function () {
  if (score > highScore) {
    highScore = score;
    persistHighscore(highScore);
  }
  highScoreEl.textContent = highScore;
  score = 0;
  scoreEl.innerHTML = 0;
};

const gameOver = function () {
  randomDis.style.background = "red";
  inputDis.value = "GAME OVER";
  disableBtn();
  checkHighscore();
};

const beginGame = function () {
  showBtn(hiddenButtons);

  rand1 = Math.trunc(Math.random() * 9);
  rand2 = Math.trunc(Math.random() * 9);
  rand3 = Math.trunc(Math.random() * 9);
  rand4 = Math.trunc(Math.random() * 4) + 1;

  hiddenBtn1 = document.querySelector(`.btn${rand1}`);
  hiddenBtn2 = document.querySelector(`.btn${rand2}`);
  hiddenBtn3 = document.querySelector(`.btn${rand3}`);
  hiddenOpr = document.querySelector(`.operator${rand4}`);
  hiddenButtons = [hiddenBtn1, hiddenBtn2, hiddenBtn3, hiddenOpr];

  hideBtn(hiddenButtons);

  gameNum = Math.trunc(Math.random() * 300) + 10;
  randomDis.value = gameNum;
  randomDis.style.background = "none";
  inputDis.value = "";
};

// EVENT LISTENERS

// DARK / LIGHT MODE
toggleBtn.addEventListener("click", function () {
  toggleBtn.classList.toggle("light");
  caculator.classList.toggle("display-light");
  container.classList.toggle("container-light");
});

// START A NEW GAME
beginBtn.addEventListener("click", function () {
  if (startTiming) clearInterval(startTiming);
  hideBtn(hiddenButtons);
  randomDis.value = gameNum;
  disableBtn(false);
  checkHighscore();
  time.innerHTML = 20;

  beginGame();
});

// CHECK ANSWER
equalBtn.addEventListener("click", function () {
  if (startTiming) clearInterval(startTiming);
  const value = eval(inputDis.value);
  inputDis.value = value;

  if (value === gameNum) {
    randomDis.style.background = "green";
    scoreEl.textContent++;
    score++;

    setTimeout(function () {
      showBtn(hiddenButtons);
      beginGame();
      timer();
    }, 3000);
  } else {
    gameOver();
  }
});
