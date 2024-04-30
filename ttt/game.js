const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';

// Create an array of all winning combinations
const WIN_COMBO = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Grab all cells from html
const cellElements = document.querySelectorAll('[data-cell]');

// Grab board from html
const board = document.getElementById('board');

//Grab restart button
const restartButton = document.getElementById('restartButton');

const winMsgElement = document.getElementById('winMsg2');
const winMsgTextElement = document.querySelector('[data-win-msg-text]');

const turnText = document.querySelector('#playerTurn');
const boardText = document.querySelector('#boardAnnouncer');

let circleTurn;

startGame();

function addButtons(e) {
  if (e.key === 'Tab') {
    //if tab is pressed, add buttons to all cells

    cellElements.forEach((cell) => {
      let buttonElement = document.createElement('button');
      let paraElement = document.createElement('p');
      cell.appendChild(buttonElement);
      cell.appendChild(paraElement);
      buttonElement.classList.add('action-button');
      paraElement.classList.add('visually-hidden');
      paraElement.innerHTML = 'empty';
      cell.classList.add('disable-mouseclicks');

      let insideBtns = document.querySelectorAll('.action-button');
      insideBtns.forEach(addName);

      // Add direction from html attributes to button innerHTML
      function addName() {
        buttonElement.setAttribute(
          'vertical',
          buttonElement.parentElement.attributes[1].value
        );
        buttonElement.setAttribute(
          'horizontal',
          buttonElement.parentElement.attributes[2].value
        );
        buttonElement.innerHTML = `${circleTurn ? 'Place O to' : 'Place X to'}
        ${buttonElement.attributes[1].value}
        ${buttonElement.attributes[2].value} `;
      }
    });

    document.removeEventListener('keydown', addButtons);
  }
}

// Add listener to restart button
restartButton.addEventListener('click', startGame);

function startGame() {
  cellElements.forEach((cell) => {
    console.log(cell.innerHTML);
  });
  // Add listener to entire document when tab key is pressed to insert buttons

  document.addEventListener('keydown', addButtons);
  circleTurn = false;
  turnText.innerHTML = 'Player X Turn';

  cellElements.forEach((cell) => {
    if (cell.innerHTML != '') {
      cell.innerHTML = '';
      console.log(cell.innerHTML);
    }
    // resets before game starts again
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', handleClick);

    // add click listener to the cells and once only
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverClass();
  winMsgElement.classList.remove('show');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winMsgTextElement.innerText = 'Draw!';
    winMsgTextElement.setAttribute('aria-live', 'assertive');
  } else {
    winMsgTextElement.innerText = `${circleTurn ? 'O' : 'X'} Wins!`;
    winMsgTextElement.setAttribute('aria-live', 'assertive');
  }

  // Removes all innerBtns before showing endgame UI

  let innerBtns = document.querySelectorAll('.action-button');
  for (var i = 0; i < innerBtns.length; i++) {
    innerBtns[i].remove();
  }

  winMsgElement.classList.add('show');
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function placeMark(cell, currentClass) {
  // remove button element after a symbol is placed using tab
  if (cell.hasChildNodes()) {
    cell.parentNode.classList.add(currentClass);
    cell.parentNode.childNodes[1].innerHTML = currentClass;
    cell.remove();
  } else {
    cell.classList.add(currentClass);
  }
}

function swapTurns() {
  circleTurn = !circleTurn;
  turnText.innerHTML = `${circleTurn ? 'Player O Turn' : 'Player X Turn'}`;

  let cellBtn = document.getElementsByClassName('action-button');
  for (var i = 0; i < cellBtn.length; i++) {
    cellBtn[i].innerHTML = `${circleTurn ? 'Place O to' : 'Place X to'}
        ${cellBtn[i].parentNode.attributes[1].value}
        ${cellBtn[i].parentNode.attributes[2].value} `;
  }
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WIN_COMBO.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function readBoardStatus() {
  let sentence = [
    cellElements[0].attributes[1].value +
      ' ' +
      cellElements[0].attributes[2].value +
      ' is ' +
      cellElements[0].lastChild.innerHTML +
      ',',
    cellElements[1].attributes[1].value +
      ' ' +
      cellElements[1].attributes[2].value +
      ' is ' +
      cellElements[1].lastChild.innerHTML +
      ',',
    cellElements[2].attributes[1].value +
      ' ' +
      cellElements[2].attributes[2].value +
      ' is ' +
      cellElements[2].lastChild.innerHTML +
      ',',
    cellElements[3].attributes[1].value +
      ' ' +
      cellElements[3].attributes[2].value +
      ' is ' +
      cellElements[3].lastChild.innerHTML +
      ',',
    cellElements[4].attributes[1].value +
      ' ' +
      cellElements[4].attributes[2].value +
      ' is ' +
      cellElements[4].lastChild.innerHTML +
      ',',
    cellElements[5].attributes[1].value +
      ' ' +
      cellElements[5].attributes[2].value +
      ' is ' +
      cellElements[5].lastChild.innerHTML +
      ',',
    cellElements[6].attributes[1].value +
      ' ' +
      cellElements[6].attributes[2].value +
      ' is ' +
      cellElements[6].lastChild.innerHTML +
      ',',
    cellElements[7].attributes[1].value +
      ' ' +
      cellElements[7].attributes[2].value +
      ' is ' +
      cellElements[7].lastChild.innerHTML +
      ',',
    cellElements[8].attributes[1].value +
      ' ' +
      cellElements[8].attributes[2].value +
      ' is ' +
      cellElements[8].lastChild.innerHTML +
      ',',
  ];

  boardText.innerHTML =
    sentence[0] +
    ' ' +
    sentence[1] +
    ' ' +
    sentence[2] +
    ' ' +
    sentence[3] +
    ' ' +
    sentence[4] +
    ' ' +
    sentence[5] +
    ' ' +
    sentence[6] +
    ' ' +
    sentence[7] +
    ' ' +
    sentence[8];

  boardText.classList.add('show');

  window.setTimeout(function () {
    boardText.classList.remove('show');
  }, 1000);
}
