//랜덤번호지정
//유조가 번호를 입력한다 그리고 go 라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맟췄습니다 !
//랜덤번호가 < 유저번호 donw !
//랜덤번호가 > 유전보호 up !
//reset버튼을 누르면 게임이 리셋된다.
//5번의 기회를 다 쓰면 게임이 끝난다
//유저가 1 ~ 100 범위 밖에 숫자를 입력하면 알려준다. 기회x
//유저가 이미 입력한 숫자를 또 입력하면, 알려준다 기회 x
let startBtn = document.getElementById('start-btn');
let userInput = document.getElementById('user-input');
let userResult = document.getElementById('user-result');
let resetBtn = document.getElementById('reset-btn');
let conutText = document.getElementById('count-text');
let count = 5;
let gameOver = false;
let randomNum = 0;
let history = [];
startBtn.addEventListener('click',play);
resetBtn.addEventListener('click',reset);
userInput.addEventListener('focus',()=>{
    userInput.value = "";
})
function startNum(){
    randomNum = Math.floor(Math.random()* 100+1);
    
    console.log(randomNum);
}
function play(){
    let userValue = userInput.value;
    if(userValue < 1 || userValue > 100){
       userResult.textContent = "잘못된 숫자 범위 입니다.";
        return;
    }
    if(history.includes(userValue)){
        userResult.textContent = "중복된 입력 값 입니다."
        return;
    }
    count --;
    conutText.textContent = `남은기회 : ${count}`;
    if(userValue < randomNum){
        userResult.textContent = 'UP!!!!'; 
    }else if(userValue > randomNum){
        userResult.textContent = 'DOWN!!!!';
    }else{
        userResult.textContent = '정답!!!!';
        gameOver = true;
    } 
    history.push(userValue);
    if(count < 1){
        gameOver = true;
    }
    if(gameOver == true){
        startBtn.disabled = true;
    }
}

function reset(){
    gameOver = false;
    history = []
    if(gameOver == false){
        startBtn.disabled = false;
    }
    //user input 초기화
    count = 5;
    userInput.value= "";
    userResult.textContent = '두근두근!';
    conutText.textContent = `남은기회 : ${count}`

    startNum();
    
    
}
startNum();