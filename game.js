var buttonColors=["red","blue","green","yellow"];
var gamepattern=[];
var userClickedPattern=[];
var started= false;
var level= 0;

$(document).on('keypress',function() {
  if(!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started= true;
      
  }
}); 
$(".btn").click(function(){
  var userChosenColor= $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(gamepattern[currentLevel]=== userClickedPattern[currentLevel]){
  
    if (gamepattern.length === userClickedPattern.length) {
      
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  } 
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over , Press any key to Restart!");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 250);
    startOver(); 
  } 
  
}



function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);
  randomNumber= Math.round(Math.random()*3);
  var randomChosenColor= buttonColors[randomNumber];
  gamepattern.push(randomChosenColor);
  $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}



function playSound(name){
  var audio= new Audio("sounds/"+ name+ ".mp3");
  audio.play();
}
function animatePress(currentColor){
    $("#"+ currentColor).addClass("pressed");
    setTimeout(function(){
      $("#"+ currentColor).removeClass("pressed");
    }, 100);
}
function startOver(){
  level=0;
  gamepattern=[];
  started=false;
  
}

