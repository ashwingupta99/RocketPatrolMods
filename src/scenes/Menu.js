/** @type {import("../../typings/phaser")} */

class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    
    init(data){
        this.highscore=data.highscore;
    }

    preload(){

        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_rocket','./assets/rocket_shot.wav');
        
        //Explosion Audio
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('explosion1','./assets/explosion1.wav');
        this.load.audio('explosion2','./assets/explosion2.wav');
        this.load.audio('explosion3','./assets/explosion3.wav');
        this.load.audio('explosion4','./assets/explosion4.wav');

        //Background Music
        // Music is a clip of Monster Parade by Loyalty Freak Music found at https://freemusicarchive.org/music/Loyalty_Freak_Music/WITCHY_BATTY_SPOOKY_HALLOWEEN_IN_SEPTEMBER_/Monster_Parade
        // Music is used under the CC 1.0 public domain license
        this.load.audio('track','./assets/ingame_track.wav');
    }
    create(){
        let highScoreConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#800080',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 150
        }


        let menuConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#800080',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //if highscore hasn't been initialized yet
        if(typeof(this.highscore)!="number"){
            this.highscore=0;
        }

        this.highDisp = this.add.text(421, 54, "HS: " + this.highscore, highScoreConfig);

        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 32;


        this.add.text(centerX, centerY-textSpacer, 'ROCKET PATROL MODDED:', menuConfig).setOrigin(0.5);
        menuConfig.fontSize='18px'
        this.add.text(centerX, centerY, 'Purple Edition', menuConfig).setOrigin(0.5);
        menuConfig.fontSize='28px'
        this.add.text(centerX, centerY+textSpacer,'Use ← → arrows to move & (F) to Fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(centerX, centerY+75, 'Press ← for Easy or → for Hard', menuConfig).setOrigin(0.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


        

        //this.scene.start("playScene");
    }
    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene",{highscore:this.highscore});
        }

        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            //hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene",{highscore:this.highscore});
        }
    }
}
