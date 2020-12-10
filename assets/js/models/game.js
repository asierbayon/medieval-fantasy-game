class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = 700;
        this.canvas.height = 498;
        this.ctx = this.canvas.getContext('2d');

        this.drawIntervalId = undefined;
        this.fps = 1000 / 60;

        this.level = [
            new LevelOne(this.ctx, this.canvas, this.fps, 1),
            new LevelTwo(this.ctx, this.canvas, this.fps, 2),
            new LevelThree(this.ctx, this.canvas, this.fps, 3)
        ];

        this.originalLevel;

    }
    
    start() {
        console.log(this.originalLevel)
        this.level[0].start();
        this.clear();
        this.stop();
        this.currentLevel();
    }
    
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    stop() {
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined;
    };
    
    onKeyEvent(event) {
        
        if (this.currentLevel()) {
            this.currentLevel().onKeyEvent(event);
            if (this.level[0].nextLevelAvailable) {
                this.stop();
                this.level.shift();
                this.start();
            } else if (this.level[0].restartLevel) {
                if (this.level[0].number === 1) {
                    this.stop();
                    this.level.shift();
                    this.level.unshift(new LevelOne(this.ctx, this.canvas, this.fps, 1));    
                } else if (this.level[0].number === 2) {
                    this.stop();
                    this.level.shift();
                    this.level.unshift(new LevelTwo(this.ctx, this.canvas, this.fps, 1));    
                } else if (this.level[0].number === 3) {
                    this.stop();
                    this.level.shift();
                    this.level.unshift(new LevelThree(this.ctx, this.canvas, this.fps, 1));    
                }
                this.start(); 
            }
        };
        
    }

    currentLevel() {
        for (let i=0; i < this.level.length; i++) {
            if (this.level[i].nextLevelAvailable) {
                return this.level[i+1];
            } else {
                return this.level[0];
            }
        }
    }
}