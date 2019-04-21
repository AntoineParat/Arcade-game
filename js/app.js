"use strict";

const lifeStock = document.querySelector('.life');
const score = document.querySelector('.score');
const score2 = document.querySelector('.score2');
const win = document.querySelector('.win');
const collision = document.querySelector('.collision');
const money = document.querySelector('.money');
const power = document.querySelector('.power');
const scream = document.querySelector('.scream');
const body = document.querySelector('body');
const startScreen = document.querySelector('.startScreen');
const gameOver = document.querySelector('.gameOverScreen')
const canvas = document.querySelector('canvas');
const charBoy = document.querySelector('.charBoy');
const charPrincess = document.querySelector('.charPrincess');
const pinkGirl = document.querySelector('.pinkGirl');
const hornGirl = document.querySelector('.hornGirl');
const displayBestScore = document.querySelector('.displayBestScore');
const bestScoreString = document.querySelector('.bestScoreString');
 
startMenu () 

var Enemy = function() { // Variables applied to each of our enemies instances go here
    this.sprite = 'images/enemy-bug.png';
    this.position = [60,145,230]; // there is only three y positions possible for enemy
    this.x = Math.round(Math.random() * ((-400) - (-50) +1)) + (-50);// x position is sets randomly between -400 and -50
    this.y = this.position[Math.floor(Math.random()*this.position.length)]; // random only between this.position array's values 
    this.speed = 1//speed will be defined later for each instance
    this.width = 80; // collision detection needs width and height for each instance
    this.height = 60;
};


Enemy.prototype.update = function(dt) { // this method updates enemy position
    this.x += this.speed*dt; // multiplying any movement by the dt parameter will ensure the game runs at the same speed for all computers.
    if (this.x > 515) { //when enemy go out of canvas he goes back to a random starting point
        this.x =Math.round(Math.random() * ((-400) - (-50) +1)) + (-50);
        this.y =this.position[Math.floor(Math.random()*this.position.length)];
    };
    for (let enemy of allEnemies) { //we set collision detection for each instance of enemy
        if (player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.height + player.y > enemy.y) { 
                player.y = 400; // when a collision happened, the player goes back to his starting point
                player.x = 200;   
                player.life-=1;// and loses one life 
                collude (); // a sound is played
                body.style.background="red"; // body color becomes red 
                setTimeout(function(){
                    body.style.background="none";
                },500)
        }
    }
};

Enemy.prototype.render = function() { 
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function () { // now we write our player class
    this.sprite = 'images/char-boy.png'
    this.x = 200; 
    this.y = 400;
    this.speed = 200;
    this.width = 60;
    this.height = 60;
    this.life = 3;
    this.score = 0;
    this.bestScoreArray =[]; // we will push scores in it and sort them to display the best one 
    this.menu = false; // chek if gameOver menu is displayed
}

Player.prototype.update = function() { // this method updates player's position and other features
    if (player.x < life.x + life.width && // we set a collision detection with the heart object
        player.x + player.width > life.x &&
        player.y < life.y + life.height &&
        player.height + player.y > life.y) { 
            powerUp (); // a sound is displayed;
            this.life+=1; // collusion with heart increases life  
            delete life.y; //and makes the heart instance desapear   
    }  

    if (player.x < star.x + star.width && // we set a collision detection with the star object
        player.x + player.width > star.x &&
        player.y < star.y + star.height &&
        player.height + player.y > star.y) { 
            dollars(); // a sound is displayed
            this.score+=5; // sore is increased score   
            delete star.y; //and makes the star instance desapear
            star.x = Math.round(Math.random() * (380 - 0 +1)) + 0; // star is displayed again to new a random x and y position
            star.y = star.position[Math.floor(Math.random()*star.position.length)]; 
    }

    if(this.life ===0){ // when life = 0 game ends
        gameOver.classList.remove('hidden'); // gameOver menu is displayed
        this.menu = true; // we indicate that menu is displayed
        delete player.y; // As game is still runing under the menu's div we disable player to prevent it from unwanted moves
        score2.innerHTML= " " + this.score; // current score is displayed
        this.bestScoreArray.push(this.score); // we push it to the array
        this.bestScoreArray.sort((a, b) => b - a); // sort it 
        displayBestScore.innerHTML = " " +this.bestScoreArray[0]; // and display the best score
        this.life=1; // life is setting >0 to stop the update loop. If not : score would be push infinitely.  
    } 

    if (this.menu === true && // we check that game is ended
        this.bestScoreArray.length > 1 && // that we have already played at least one round
        this.score===this.bestScoreArray[0] && // that my current score is my best score
        this.bestScoreArray[0] != this.bestScoreArray[1]) { // and that i've never done this score before
        displayBestScore.innerHTML="wow this is your best score !!"; // then we display a congratulations message
        bestScoreString.classList.add('hidden'); 
        this.menu = false;// menu is setting to false in order to stop the update loop. If not : instructions would be repeated as long as menu =true.       
    }
     
    score.innerHTML = " " + this.score; // score and life are updataded and displayed during the game;
    lifeStock.innerHTML = " " + this.life;
};

Player.prototype.handleInput = function (x) { // this methods allows player to makes moves on screen
   if (x ==='left' && this.x >0){ // we check if the key value returning by our event listener is equal to "left" and if player is not offscreen
       this.x -= 100; // then player is moved to left
   }
   else if (x ==='right' && this.x <400){
        this.x += 100;
    }
    else if (x ==='up' && this.y <60){ // if player reach water
        makeScore ();// a sound is displayed
        this.x=200; // player comes back to his initial location
        this.y=400; 
        this.score+=1;// score is increased
        score.innerHTML = " " + this.score; // new score is displayed  
    }
    else if (x ==='up' && this.y >0){
        this.y -= 90;
    }   
    else if (x ==='down' && this.y <400){
        this.y += 90;
    }
};

Player.prototype.render = function () { // this method draws player on screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Life = function () { // we write our Life class
    this.sprite = 'images/Heart.png';
    this.position = [60,145];
    this.x = Math.round(Math.random() * (120 - 0 +1)) + 0;
    this.y = this.position[Math.floor(Math.random()*this.position.length)];
    this.width = 80;
    this.height = 60;
}

Life.prototype.render = function() { // this method draws heart on screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Star = function () { // we write our Star class
    this.sprite='images/Star.png';
    this.position = [60,145,230];
    this.x = Math.round(Math.random() * (120 - 0 +1)) + 0;
    this.y = this.position[Math.floor(Math.random()*this.position.length)];
    this.width = 60;
    this.height = 60;
}

Star.prototype.render = function() { // this method draws star on screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

function reStart () { // calling this function will reset player, star and heart location. Reset scores and hide menu. 
   life.x = Math.round(Math.random() * (380 - 0 +1)) + 0;
   life.y = life.position[Math.floor(Math.random()*life.position.length)];
   star.x = Math.round(Math.random() * (380 - 0 + 1)) + 0;
   star.y = star.position[Math.floor(Math.random()*star.position.length)];
   player.x = 200;
   player.y = 400;
   player.life = 3;
   player.score=0;
   score.innerHTML=player.score;
   startScreen.classList.add("hidden");
   displayBestScore.classList.remove("hidden"); 
   bestScoreString.classList.remove('hidden');  
   player.menu = false;
}
// Now we instantiate our enemies objects.
let enemy = new Enemy();
enemy.speed = 600;
let enemy2 = new Enemy();
enemy2.speed = 300;
let enemy3 = new Enemy();
enemy3.speed = 500;
let enemy4 = new Enemy();
enemy4.speed = 400;
let allEnemies = [];
// then place them in an array called allEnemies
function push () {  
    allEnemies.push(enemy,enemy2,enemy3,enemy4); 
}
push();

// we instantiate our player, heart and star objects
let player = new Player ();
let life = new Life();
let star = new Star();

// This listens for key presses and sends the keys to our Player.handleInput() method. 
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        90: 'up',
        81: 'left',
        68: 'right',
        83: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// This listens for click and allow us to select our player avatar
startScreen.addEventListener('click', function(e) {
    if (e.target.innerHTML ==="Princess Girl") { // if "princess Girl" is clicked 
        player.sprite = 'images/char-princess-girl.png';// princess girl image is loaded
        reStart();// then we start the game
    }
    else if (e.target.innerHTML ==="Char Boy") { 
        player.sprite = 'images/char-boy.png';
        reStart();
    }
    else if (e.target.innerHTML ==="Pink Girl") { 
        player.sprite = 'images/char-pink-girl.png';
        reStart();
    }  
    else if (e.target.innerHTML ==="Horn Girl") { 
        player.sprite = "images/char-horn-girl.png";
        reStart();
    }     
});

// // This listens for mouseover and displays animation before to remove it 
startScreen.addEventListener('mouseover', function(e) {
    if (e.target.innerHTML ==="Princess Girl") { 
        charPrincess.classList.add("animated", "bounce");
        setTimeout(function (){
        charPrincess.classList.remove("animated", "bounce");
        },1000);
    }
    else if (e.target.innerHTML ==="Char Boy") { 
        charBoy.classList.add("animated", "bounce");
        setTimeout(function (){
        charBoy.classList.remove("animated", "bounce");
        },1000);
    }

    else if (e.target.innerHTML ==="Pink Girl") { 
        pinkGirl.classList.add("animated", "bounce");
        setTimeout(function (){
        pinkGirl.classList.remove("animated", "bounce");
        },1000);
    }  
    else if (e.target.innerHTML ==="Horn Girl") { 
        hornGirl.classList.add("animated", "bounce");
        setTimeout(function (){
        hornGirl.classList.remove("animated", "bounce");
        },1000);         
    }    
});

// This listens for key presses in gameOver menu 
document.addEventListener("keyup", function (e) {
    if ( gameOver.classList[1] != "hidden" && e.keyCode===13 ) { // check if gameOver menu is visible
       gameOver.classList.add('hidden'); // pressing "enter" will hide gameOver menu
        reStart();// and restart game
    } 

    if ( gameOver.classList[1] != "hidden" && e.keyCode===27 ) {// check if gameOver menu is visible 
       gameOver.classList.add('hidden'); // pressing "esc" will hide gameOver menu
       startMenu ()// display the start menu 
       player.bestScoreArray = [];// and reset scores
    } 
});

//these functions play sounds
function makeScore () {
    win.currentTime=0;
    win.play();
}

function collude () {
    collision.currentTime=0;
    collision.play();
}

function dollars () {
    money.currentTime=0;
    money.play();
}

function powerUp () {
    power.currentTime=0;
    power.play();
}

// this function displays the start menu
function startMenu () {
    startScreen.classList.remove("hidden");    
}