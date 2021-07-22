/** @type {import("../typings/phaser")} */

class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,texture,frame,pointValue,flipped){
        super(scene,x,y,texture,frame); //pass these values to parent class
        scene.add.existing(this);       //add this to the calling scene
        this.points=pointValue;         //assign how much this instance of Spaceship is worth
        this.flipped=flipped;
    }
    update(){
        if (this.flipped){
            this.x +=game.settings.spaceshipSpeed;
            if(this.x >= game.config.width){
                this.x=0-this.width;
            }
        }
        else{
            this.x -= game.settings.spaceshipSpeed;

            if(this.x <= 0 - this.width){
                this.x = game.config.width;
            }
        }

    }

    reset(){
        if(this.flipped){
            this.x=-96;
        }
        else{
            this.x=game.config.width;
        }

    }
}