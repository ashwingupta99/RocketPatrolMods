/** @type {import("../../typings/phaser")} */

class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    init(data){
        //pass highscore from calling scene
        this.highscore=data.highscore;

    }

    preload(){

        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32,
        startFrame: 0, endFrame: 9});


    }

    create(){

        //place tilesprite
        this.starfield = this.add.tileSprite(0,0,640,480,'starfield').setOrigin(0);



        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0, 0);

        this.p1Rocket = new Rocket(this, game.config.width/2431, 'rocket').setScale(0.5).setOrigin(0);
        this.flip=[];
        for (let index = 0; index < 3; index++){
            this.flip.push(Phaser.Math.Between(0,1));
        }

        //add spaceshipsx3
        // if corresponding flip variable is true set the sprite to come from the opposite direction and flip the sprite
        if (this.flip[0]){
            this.spaceShip01 = new Spaceship(this,-192, 260, 'spaceship',0, 30, this.flip[0]).setOrigin(0);
            this.spaceShip01.flipX=true;
        }
        else{
            this.spaceShip01 = new Spaceship(this,game.config.width+192, 260, 'spaceship',0, 30,this.flip[0]).setOrigin(0);
            this.spaceShip01.flipX=false;
        }

        if (this.flip[1]){
            this.spaceShip02 = new Spaceship(this,-96, 196, 'spaceship',0, 20, this.flip[1]).setOrigin(0);
            this.spaceShip02.flipX=true;
        }
        else{
            this.spaceShip02 = new Spaceship(this,game.config.width+96, 196, 'spaceship',0, 20,this.flip[1]).setOrigin(0);
            this.spaceShip02.flipX=false;
        }

        if (this.flip[2]){
            this.spaceShip03 = new Spaceship(this,0, 132, 'spaceship',0, 10, this.flip[2]).setOrigin(0);
            this.spaceShip03.flipX=true;
        }
        else{
            this.spaceShip03 = new Spaceship(this,game.config.width, 132, 'spaceship',0, 10,this.flip[2]).setOrigin(0);
            this.spaceShip03.flipX=false;
        }


        //define keys
        keyF=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.anims.create({
            key: 'explode',
            frames:this.anims.generateFrameNumbers('explosion', {start:0, end:9, first:0}),
            frameRate:30
        });

        //score
        this.p1Score=0;

        //highscore variable
        if(this.highscore==0 || typeof(this.highscore)!="number"){
            this.highscore=0;
        }


        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        let highScoreConfig = {
            fontFamily: 'Arial',
            fontSize: '32px',
            backgroundColor: '#F3B141',
            color: '#800080',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 150
        }
        let fireConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#800080',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        let timeConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#800080',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 50
        }


        //display player score
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);

        //create fire UI and hide it
        this.fire= this.add.text(215, 54, "FIRE", fireConfig).setAlpha(0);

        //display high score
        this.highDisp = this.add.text(421, 54, "HS: " + this.highscore, highScoreConfig);

        this.gameOver = false;

        //60-second play clock
        scoreConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or ← for Menu.', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        this.countdown=(game.settings.gameTimer-this.clock.getElapsed())/1000;

        //display time remaining
        this.timeLeft = this.add.text(368,54, this.countdown.toFixed(0), timeConfig);

        this.speed=game.settings.spaceshipSpeed;

        this.speedup = this.time.delayedCall(30000, () => {
            game.settings.spaceshipSpeed=game.settings.spaceshipSpeed*2;
        }, null, this);

        let musicConfig={
            mute:false,
            rate:1,
            volume:1,
            seek:0,
            detune:0,
            loop:true,
            delay:0
        }

        this.music= this.sound.add('track',musicConfig);
        this.music.play();

    }

    update(){
        this.countdown=(game.settings.gameTimer-this.clock.getElapsed())/1000;
        //check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)){
            game.settings.spaceshipSpeed=this.speed;
            this.music.stop();
            this.scene.restart({score:this.p1Score,highscore:this.highscore});

        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.music.stop();
            this.scene.start("menuScene",{highscore:this.highscore});
        }

        //scroll starfield
        this.starfield.tilePositionX-=4;
        if(!this.gameOver){
            //update rocket
            this.p1Rocket.update();

            // while ship is firing make fire text visible
            if (this.p1Rocket.isFiring){
                this.fire.setAlpha(1);
            }
            else{
                this.fire.setAlpha(0);
            }
            //update spaceships
            this.spaceShip01.update();
            this.spaceShip02.update();
            this.spaceShip03.update();
        }

        if(this.checkCollision(this.p1Rocket,this.spaceShip01)){
            this.p1Rocket.reset();
            this.fire.setAlpha(0);
            this.shipExplode(this.spaceShip01);
        }
        if(this.checkCollision(this.p1Rocket,this.spaceShip02)){
            this.p1Rocket.reset();
            this.fire.setAlpha(0);
            this.shipExplode(this.spaceShip02);
        }
        if(this.checkCollision(this.p1Rocket,this.spaceShip03)){
            this.p1Rocket.reset();
            this.fire.setAlpha(0);
            this.shipExplode(this.spaceShip03);
        }
        if(this.p1Score>this.highscore){
            this.highscore=this.p1Score;
            this.highDisp.text="HS:" + this.highscore;
        }

        this.timeLeft.text=this.countdown.toFixed(0);

    }

    checkCollision(rocket,ship){
        if(rocket.x< ship.x + ship. width &&
           rocket.x + rocket.width > ship.x &&
           rocket.y < ship.y + ship.height &&
           rocket.height + rocket.y > ship.y){
               return true;
        }else{
            return false;
        }

    }

    shipExplode(ship){
        ship.alpha = 0;
        //create explostion sprite at ship's position
        let boom = this.add.sprite(ship.x,ship.y,'explosion').setOrigin(0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        })
        //score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text=this.p1Score;
        let sound=Phaser.Math.Between(1,5);
        switch (sound){
            case 1:
                this.sound.play('sfx_explosion');
                break;
            case 2:
                this.sound.play('explosion1');
                break;
            case 3:
                this.sound.play('explosion2');
                break;
            case 4:
                this.sound.play('explosion3');
                break;
            case 5:
                this.sound.play('explosion4');
                break;
        }

    }
}
