class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = 700;
        this.canvas.height = 498;
        this.ctx = this.canvas.getContext('2d');

        this.drawIntervalId = undefined;
        this.fps = 1000 / 60;

        this.level = [
            new LevelOne(this.ctx, this.canvas, this.fps),
            new LevelOne(this.ctx, this.canvas, this.fps)
        ];

    }
    
    start() {
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
        console.log(this.level)
        this.currentLevel().onKeyEvent(event);
        if (this.level[0].nextLevelAvailable) {
            this.stop();
            this.level.shift();
            this.start();
        }
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