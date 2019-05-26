'use strict'

import { update_perms, filter_perms } from './filter_perms.js';

var codeColors = [
  'blue',
  'red',
  'green',
  'black',
  'yellow',
  'orange'
];

// Change this to select first guess.
var currentCode = ['blue', 'green', 'black', 'red'];

var currentFeedback = [-1, -1, codeToString(currentCode)];

/* utility / conversion */
function codeToString(code) {
  var str = '';
  for (let i = 0; i < code.length; i++) {
    let char = codeColors.indexOf(code[i]);
    str += String.fromCharCode(65+char);
  }
  return str;
}

function stringToCode(str) {
  var code = [];
  for (let i = 0; i < str.length; i++) {
    let ndx = str.charCodeAt(i) - 65;
	code.push(codeColors[ndx]);
  }
  return code;
}


/* display */
function addPeg(color) {
  var el = document.createElement('div');
  el.classList.add('peg');
  el.classList.add(color);
  return el;
}

function promptFeedback() {
  var el = document.getElementById('round');
  el.classList.add('prompt');
}

function displayGuess() {
  var guessEl = document.getElementById('current-guess');
  // Get div elements, and copy collection into array.
  var guessCellColl = guessEl.getElementsByTagName('div');
  var guessCells = [];
  for (let i = 0; i < guessCellColl.length; i++) {
    guessCells[i] = guessCellColl[i];
  }
  for (let i = 0; i < guessCells.length; i++) {
    let color = currentCode[i];
    let peg = addPeg(color);
    guessCells[i].appendChild(peg);
  }
}


// have new set of permutations. pick one, and refresh display.
function chooseNewGuess(permutations) {
  let ndx = Math.floor(Math.random() * permutations.length);
  let new_guess = permutations[ndx];
  console.log('choosing code', new_guess);
  currentCode = stringToCode(new_guess);
  refreshGuess(new_guess);
  displayGuess();
}

// clear guess display (code, feedback buttons), and reset currentFeedback.
function refreshGuess(new_guess) {
  var guessEl = document.getElementById('current-guess');
  var guessCellColl = guessEl.getElementsByTagName('div');
  for (let i = 0; i < guessCellColl.length; i++) {
    let guessNode = guessCellColl[i];
    while (guessNode.firstChild) {
	  guessNode.removeChild(guessNode.firstChild);
	}
  }
  clearFeedbackButtons('right');
  clearFeedbackButtons('wrong');
  currentFeedback = [-1, -1, new_guess];
}



/* event handling */
// handle feedback buttons (right, wrong; count)
function feedbackHandler(e) {
  var el = e.currentTarget;
  var status = el.className, count = 1*el.textContent;
  clearFeedbackButtons(status);
  el.classList.add('selected');
  processFeedback({ status, count });
}

// clear all "right" or "wrong" buttons, preparatory to setting the one just clicked.
function clearFeedbackButtons(status) {
  var els = document.querySelectorAll('span.' + status);
  for (let i = 0; i < els.length; i++) {
    els[i].classList.remove('selected');
  }
}

// once "right" and "wrong" counts are both received,
// apply them to the current set of permutations, and
// get the ones that fit.
function processFeedback(grade) {
  if (grade.status === 'right') {
    currentFeedback[0] = grade.count;
  } else if (grade.status === 'wrong') {
    currentFeedback[1] = grade.count;
  }

  // feedback complete: apply to permutations to get new set. 
  if (currentFeedback[0] > -1 && currentFeedback[1] > -1) {
    console.log('ready to process', currentFeedback);
	let new_permutations = filter_perms(...currentFeedback);
	update_perms(new_permutations);
	chooseNewGuess(new_permutations);
  }
}



// attach click event to feedback buttons
// should happen just once per page load
function attachEvents() {
  var feedbackEl = document.querySelectorAll('.feedback span');
  for (let i = 0; i < feedbackEl.length; i++) {
    feedbackEl[i].addEventListener('click', feedbackHandler);
  }
}


/* entry point */
export default function(row) {
  attachEvents();
  var els = document.getElementsByClassName('cell');
  console.log('function play');
  var cellNdx = (row - 1) * 4;
  for (let i = 0; i < 4; i++) {
    var color = currentCode[i];
    var peg = addPeg(color);
    els[cellNdx + i].appendChild(peg);
  }
  displayGuess();
  promptFeedback();
}
