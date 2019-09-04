# Classic arcade game revisited

![enter image description here](https://www.antoineparat.com/img/arcade.png)

## Table of Contents

* [Rules](#rules)
* [Instructions](#instructions)
* [How does the game run ?](#How-does-the-game-run-?)
* [Customize the game](#customize-the-game)

## Rules
* Join the river and make the best score as possible, avoiding enemies walking across the screen.

## Instructions
* Choose your player's avatar.
* Join the river avoiding enemies walking across the screen
* Catching heart and star will increase your life and score
* Game ends when you don't have life anymore
* "Game over" screen displays your best score and make you able to start again or to change your player's avatar

## How does the game run ?

* This game is build with vanilla js. 

### Customize the game

* If you find this game is too difficult, you can easily change the enemies speed : open the `app.js`file in the "js" folder and go to line 186 : `let enemy = new Enemy(); 
enemy.speed = 600;  
let enemy2 = new Enemy();  
enemy2.speed = 300;  
let enemy3 = new Enemy();  
enemy3.speed = 500;  
let enemy4 = new Enemy();  
enemy4.speed = 400;`  
* Change `enemy.speed`to modify the enemies' speed ! 
