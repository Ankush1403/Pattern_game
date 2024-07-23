
var gamePattern = [];
var userClickedpattern = [];
var buttonColors = ["red","green", "yellow","blue"];
var level = 0;
var time = 1000;


document.addEventListener("keydown",function () {
    if (level===0){
       nextSequence();
    }
})

var allButtons = document.querySelectorAll(".btn");
for (var i=0; i<allButtons.length; i++){
allButtons[i].addEventListener("click",function(event){
    var Id = event.target.id;
    userClickedpattern.push(Id);
    var button = document.querySelector("#"+Id);
    animatePress(button);
    playSound(Id);
    checkAnswer(Id);
   
    // console.log(userClickedpattern);
});
}

function checkAnswer(Id){
    if (Id === gamePattern[userClickedpattern.length-1]){
        if (userClickedpattern.length===gamePattern.length) {
            userClickedpattern = [];
            setTimeout(function(){
                nextSequence();
            },1000);
            
        }
        // console.log("sucess");
    }
    else {
        playSound("wrong");
        document.querySelector("body").classList.add("game-over");
        document.querySelector("h1").innerHTML = "Game Over, Press Any Key to Restart"
        setTimeout(() => {
            document.querySelector("body").classList.remove("game-over"); 
        }, 300);
        startOver();
    }
}

function nextSequence() {
    level++;
    var random = Math.floor(Math.random()*4);
    var randomButtons = buttonColors[random];
    gamePattern.push(randomButtons);
    document.querySelector("h1").innerHTML = "Level "+level;


    for (let index = 0; index < gamePattern.length; index++) {
        setTimeout(() => {
            var selectButton = document.querySelector("#"+gamePattern[index]);
            animatePress(selectButton);
            playSound(gamePattern[index]);
        }, time*index);
    } 

    if (time>10) time -= 100;
    
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
    return true;
    
}

function animatePress(name){
    name.classList.add("pressed");
    setTimeout(function () {
        name.classList.remove("pressed");
       },100)
}

function startOver() {
    level=0;
    time = 1000;
    gamePattern = [];
    userClickedpattern = [];
    
}








