//랜덤번호지정
//유조가 번호를 입력한다 그리고 go 라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맟췄습니다 !
//랜덤번호가 < 유저번호 donw !
//랜덤번호가 > 유전보호 up !
//reset버튼을 누르면 게임이 리셋된다.
//5번의 기회를 다 쓰면 게임이 끝난다
//유저가 1 ~ 100 범위 밖에 숫자를 입력하면 알려준다. 기회x
//유저가 이미 입력한 숫자를 또 입력하면, 알려준다 기회 x
let startBtn = document.getElementById("start-btn");
let userInput = document.getElementById("user-input");
let userResult = document.getElementById("user-result");
let resetBtn = document.getElementById("reset-btn");
let conutText = document.getElementById("count-text");
let countImg = document.querySelectorAll("#count-img");
let resetImg = document.querySelector(".count-img");
let countBox = document.querySelector(".count-box");
let tocomon = document.querySelector(".tocomon");
let agumon = document.querySelector(".agumon");
let greymon = document.querySelector(".greymon");
let bgmBtn = document.getElementById("bgm-btn");
let bgmStop = document.getElementById("bgm-stop-btn");
let gameOver = false;
let randomNum = 0;
let history = [];
let life = [];
clickCheck = 0;
startBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);
bgmBtn.addEventListener('click',()=>{
  let bgm = document.getElementById("bgm");
  bgm.loop =true;
  bgm.play()
})
bgmStop.addEventListener("click",()=>{
  let bgm = document.getElementById("bgm");
  bgm.loop =false;
  bgm.pause();
})
userInput.addEventListener("focus", () => {
  userInput.value = "";
});
function startNum() {
  randomNum = Math.floor(Math.random() * 10 + 1);
  for (let img of countImg) {
    if (life.length < 5) {
      life.push(img);
      console.log(life);
    }
  }
  clickCheck = 0;
  console.log(countImg);
  console.log(randomNum);
}

function play() {
  let userValue = userInput.value;
  if (userValue < 1 || userValue > 100) {
    userResult.textContent = "잘못된 숫자 범위 입니다.";
    return;
  }
  if (history.includes(userValue)) {
    userResult.textContent = "중복된 입력 값 입니다.";
    return;
  }
  if (userValue < randomNum) {
    life.pop();
    clickCheck++;
    countBox.removeChild(countBox.firstElementChild);
    userResult.textContent = "UP!!!!";
  } else if (userValue > randomNum) {
    userResult.textContent = "DOWN!!!!";
    life.pop();
    clickCheck++;
    countBox.removeChild(countBox.firstElementChild);
  } else {
    userResult.textContent = "진화 성공!";
    gameOver = true;
    agumon.classList.add("d-none");
    greymon.classList.remove("d-none");
  }
  history.push(userValue);
  if (life.length < 1) {
    gameOver = true;
  }
  if (gameOver == true) {
    startBtn.disabled = true;
  }
  if (life.length == 0) {
    userResult.textContent = "진화 실패!";
    agumon.classList.add("d-none");
    tocomon.classList.remove("d-none");
  }
  console.log(clickCheck);
  // console.log(life.length)
}

function reset() {
  gameOver = false;
  history = [];
  life.length = 5 - clickCheck;
  console.log(life.length);
  if (gameOver == false) {
    startBtn.disabled = false;
  }
  //user input 초기화
  userInput.value = "";
  userResult.textContent = "힌트를 알려줄게";
  tocomon.classList.add("d-none");
  agumon.classList.remove("d-none");
  greymon.classList.add("d-none");
  for (let i = 0; i < clickCheck; i++) {
    let img = document.createElement("img");
    img.setAttribute("src", "../img/count.png"); // 이미지 주소 설정
    img.setAttribute("alt", "기회");
    img.classList.add("count-img");
    countBox.appendChild(img);
    life.push(img);
  }
  console.log(life.length);
  console.log(life.length);
  startNum();
}
startNum();
