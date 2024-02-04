const colorPicker = document.querySelector(".color-picker_box");
const color = document.querySelector(".color-picker");
const level = document.querySelector(".levels");
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

//converts rgb to hex code
function rgbToHex(rgb) {
  const rgbArray = rgb.split(/\D+/).filter(Boolean);

  const hexValue = rgbArray.reduce((hex, component) => {
    const hexComponent = parseInt(component, 10).toString(16).padStart(2, "0");
    return hex + hexComponent;
  }, "#");

  return hexValue;
}

//prompting message depends on win state
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

//create the color list picking options
function createColorsPick() {
  for (let i = 0; i <= colorsList.length - 1; i++) {
    let colorOption = document.createElement("li");
    colorOption.classList.add("color-picker_box");
    colorOption.style.backgroundColor = colorsList[i];
    color.appendChild(colorOption);
  }
}

createColorsPick();

//init function, gets timer as parameter depends on difficulty
function init(timer) {
  function generateRandom(arr) {
    //create a new array of a randomly generated colors from the colors list
    const shuffledArray = arr.slice().sort(() => Math.random() - 0.5);
    const uniqueColors = shuffledArray.slice(0, 3);

    //loop through the new generated colors array and assign color to each card
    uniqueColors.forEach((color, i) => {
      setTimeout(() => {
        let card = document.querySelectorAll(".card")[i];
        card.style.backgroundColor = color;
      }, timer * i);
    });
    //hide cards after showcasing all three cards
    uniqueColors.forEach((color, i) => {
      setTimeout(() => {
        let card = document.querySelectorAll(".card")[i];
        card.style.backgroundColor = "white";
      }, timer * 3);
    });

    //return the generated guessing colors
    return uniqueColors;
  }

  let generatedColors = generateRandom(colorsList.slice());
  setTimeout(() => {
    color.addEventListener("click", (e) => {
      let card = document.querySelectorAll(".card");

      //converts the picked color from rgb to hex for comparisson
      const clickedColorHex = rgbToHex(e.target.style.backgroundColor);

      if (guesses != 2) {
        if (clickedColorHex != generatedColors[guesses]) {
          //check if picked color is matched for the card
          card[guesses].style.backgroundColor = clickedColorHex;
          setTimeout(() => {
            endGame(isWin); //sends lose prompt
          }, 100);
        } else {
          card[guesses].classList.remove("marked-card");
          card[guesses++].style.backgroundColor = clickedColorHex;
          card[guesses].classList.add("marked-card");
        }
      } else {
        card[guesses].style.backgroundColor = clickedColorHex;
        setTimeout(() => {
          isWin = true;
          endGame(isWin);
        }, 100);
      }
    });
  }, timer);
}

//initialize the game depends on game difficulty
level.addEventListener("click", (e) => {
  if (e.target.classList.contains("easy")) {
    //EASY
    init(1000);
  } else if (e.target.classList.contains("medium")) {
    //MEDIUM
    init(600);
  } else {
    //HARD
    init(200);
  }
});
