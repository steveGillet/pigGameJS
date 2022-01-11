'use strict';

// Selecting elements

const player1Ele = document.querySelector('.player--0');
const player2Ele = document.querySelector('.player--1');
const score1Ele = document.querySelector('#score--0');
const score2Ele = document.getElementById('score--1');
const current1Ele = document.getElementById('current--0');
const current2Ele = document.getElementById('current--1');
const diceEle = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting Conditions
let scores, currentScore, currentPlayer, playingState;

const initialC = function () {
  scores = [0, 0];
  currentScore = 0;
  currentPlayer = 1;
  playingState = true;
  score1Ele.textContent = 0;
  score2Ele.textContent = 0;
  diceEle.classList.add('hidden');

  player1Ele.classList.remove('player--winner');
  player2Ele.classList.remove('player--winner');
  player1Ele.classList.add('player--active');
  player2Ele.classList.remove('player--active');
  current1Ele.textContent = currentScore;
  current2Ele.textContent = currentScore;
};

initialC();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${currentPlayer - 1}`).textContent =
    currentScore;
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  player1Ele.classList.toggle('player--active');
  player2Ele.classList.toggle('player--active');
};

// rolling dice

btnRoll.addEventListener('click', function () {
  if (playingState) {
    // generate random number 1-6
    let dice = Math.trunc(Math.random() * 6) + 1;
    // display dice
    diceEle.classList.remove('hidden');
    diceEle.src = `dice-${dice}.png`;
    // dice roll = 1
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${currentPlayer - 1}`).textContent =
        currentScore;
    } else {
      // switch players
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playingState) {
    scores[currentPlayer - 1] += currentScore;
    document.getElementById(`score--${currentPlayer - 1}`).textContent =
      scores[currentPlayer - 1];
    if (scores[currentPlayer - 1] >= 100) {
      document
        .querySelector(`.player--${currentPlayer - 1}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currentPlayer - 1}`)
        .classList.remove('player--active');
      playingState = false;
      diceEle.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initialC);
