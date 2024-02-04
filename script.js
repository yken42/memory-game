const colorPicker = document.querySelector(".color-picker_box");
const color = document.querySelector(".color-picker");
const startBtn = document.querySelector(".start-btn");
let guesses = 0;
let isWin = false;

//All possible colors for the game
const colorsList = [
  "#ff0000",
  "#ffff00",
  "#ff8800",
  "#00ff00",
  "#8d318d",
  "#00ffff",
  "#0000ff",
  "#000000",
  "#557a9f",
  "#ce00ff",
  "#14930a",
  "#0af89d",
];

function generateRandom(arr) {
  //create a new array of a randomly generated colors from the colors array
  const shuffledArray = arr.slice().sort(() => Math.random() - 0.5);
  const uniqueColors = shuffledArray.slice(0, 3);

  //loop through the new generated colors array and assign color to each card with a 1 second delay
  uniqueColors.forEach((color, i) => {
    setTimeout(() => {
      let card = document.querySelectorAll(".card")[i];
      card.style.backgroundColor = color;
    }, 1000 * i);
  });

  //hide cards after showcasing all three cards
  hideCards(uniqueColors);

  return uniqueColors;
}

function hideCards(arr) {
  arr.forEach((color, i) => {
    setTimeout(() => {
      let card = document.querySelectorAll(".card")[i];
      card.style.backgroundColor = "white";
    }, 3000);
  });
}

//converts rgb to hex code
//COPIED
function rgbToHex(rgb) {
  const rgbArray = rgb.split(/\D+/).filter(Boolean);

  const hexValue = rgbArray.reduce((hex, component) => {
    const hexComponent = parseInt(component, 10).toString(16).padStart(2, "0");
    return hex + hexComponent;
  }, "#");

  return hexValue;
}

function endGame(win) {
  let message;

  if (win) {
    message = "Congratulations, you won! \uD83C\uDF8A \nplay again?";
  } else {
    message = "You Lost! \u274C\nplay again?";
  }
  const restartGame = window.confirm(message);
  if (restartGame) {
    window.location.reload();
  } else {
    window.location.href = "http://www.google.com";
  }
}

function createColorsPick() {
  for (let i = 0; i <= colorsList.length - 1; i++) {
    let colorOption = document.createElement("li");
    colorOption.classList.add("color-picker_box");
    colorOption.style.backgroundColor = colorsList[i];
    color.appendChild(colorOption);
  }
}

function init() {
  createColorsPick();
  let generatedColors = generateRandom(colorsList.slice());
  setTimeout(() => {
    color.addEventListener("click", (e) => {
      let card = document.querySelectorAll(".card");
      const clickedColorHex = rgbToHex(e.target.style.backgroundColor);
      if (guesses < 2) {
        if (clickedColorHex != generatedColors[guesses]) {
          card[guesses].style.backgroundColor = clickedColorHex;
          setTimeout(() => {
            endGame(isWin);
          }, 100);
        } else {
          card[guesses].style.backgroundColor = clickedColorHex;
          card[guesses].classList.remove("marked-card");
          guesses++;
          card[guesses].classList.add("marked-card");
        }
      } else {
        if (clickedColorHex != generatedColors[guesses]) {
          card[guesses].style.backgroundColor = clickedColorHex;
          setTimeout(() => {
            isWin = false;
            endGame(isWin);
          }, 100);
        } else {
          card[guesses].style.backgroundColor = clickedColorHex;
          setTimeout(() => {
            isWin = true;
            endGame(isWin);
          }, 100);
        }
      }
    });
  }, 3000);
}

//initialize the game
init();
