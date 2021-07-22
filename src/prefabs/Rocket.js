/** @type {import("../../typings/phaser")} */
//Rocket Prefab

class Rocket extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //add object to exisiting scene

        scene.add.existing(this);
        
        //track rocket's firing status
        this.isFiring=false;

        this.sfxRocket=scene.sound.add('sfx_rocket');
    }

    update(){


        if(keyLEFT.isDown && this.x>=47){
            this.x-=2;
        }else if(keyRIGHT.isDown && this.x<=578){
            this.x+=2;
        }

        //bullet is fired
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring){
            this.isFiring=true;
            this.sfxRocket.play();

        }
        //if fired move up
        if(this.isFiring && this.y>=108){
            this.y-=2;
        }
        //reset on miss
        if(this.y<=108){
            this.reset();
        }
    }

    reset(){
        this.isFiring=false;
        this.y=431;
    }

    



}
