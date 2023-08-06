
var buttonColors = ['green','red',"yellow","blue"]; 
var gamePattern = [];

var userClickedPattern = [];

var level=0;
var started= false;



$(document).on("keydown",function(){
    if(!started){
    nextSequence();
    $('h1').html("Level "+level);
    started= true;
}})


$('.btn').on("click",function(){
    var userChosenColor= $(this).attr('id');
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animate(userChosenColor);

    checkAnswer(userClickedPattern.length-1);

})

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        var val='success';

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else{
        var val='wrong';
    }
    if(val === 'wrong'){
        $('h1').html("Game Over, Press Any key to Restart.");
        var volume = new Audio('sounds/wrong.mp3');
        volume.play();

        $('body').addClass('game-over');
        setTimeout(() => {
            $('body').removeClass('game-over');
        },200 );

        startOver();
    }

}

function nextSequence(){

userClickedPattern=[];

level++;
$('h1').html("Level "+level);

var randomNumber=Math.random();
randomNumber= randomNumber*4;
var random= Math.floor(randomNumber);

var randomChosenColor= buttonColors[random];

gamePattern.push(randomChosenColor);
console.log(gamePattern);

var randomChosenColorId= '#'+randomChosenColor;

$(randomChosenColorId).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColor);

}


function playSound(name){

    var sound= new Audio("sounds/"+name+".mp3");
    sound.play();
}

function animate(currentColor){
        $('#'+currentColor).addClass('pressed');

        setTimeout(() => {
            $('#'+currentColor).removeClass('pressed');
        }, 120);
}

function startOver(){

    level=0;
    gamePattern=[];
    userClickedPattern=[];
    started = false;

}






    

