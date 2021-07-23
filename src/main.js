/** @type {import("../typings/phaser")} */

/**
Ashwin Gupta, Rocket Patrol Modded, 
 * Track a high score that persists across scenes and display it in the UI                5
 * Implement the 'FIRE' UI text from the original game                                    5
 * Implement the speed increase that happens after 30 seconds in the original game        5
 * Randomize each spaceship's movement direction at the start of each play                5
 * Allow the player to control the Rocket after it's fired                                5
 * Add your own (copyright-free) background music to the Play scene                       5
 * Create a new title screen                                                             10
 * Display the time remaining (in seconds) on the screen                                 10
 * Create 4 new explosion SFX and randomize which one plays on impact                    10
 * -------------------------------------------------------                               60
**/

 let config={
    type:Phaser.CANVAS,
    width:640,
    height:480,
    scene:[Menu,Play],
}

//create new game object
let game=new Phaser.Game(config);


game.settings={

    spaceshipSpeed:3,
    gameTimer:60000
}
let keyF, keyLEFT, keyRIGHT;
