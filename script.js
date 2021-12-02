"use strict";

//selecting elements

// const score0El = document.querySelector("#score--0");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const btnRoll = document.querySelector(".btn--roll");
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

let currentScore = 0;
let activePlayer = 0;
let score = [0, 0];
let playing = true;
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
//functionalities of rolling

btnRoll.addEventListener("click", function () {
  if (playing) {
    diceEl.classList.remove("hidden");
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //change to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  playing = true;
  currentScore = 0;
  score = [0, 0];
  //   score[0] = score[1] = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  activePlayer = 0;
  diceEl.classList.add("hidden");
  player0El.classList.add("player--active");
});
