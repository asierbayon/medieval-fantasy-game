class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = 700;
        this.canvas.height = 498;
        this.ctx = this.canvas.getContext('2d');

        this.drawIntervalId = undefined;
        this.fps = 1000 / 60;

        this.level = new LevelOne(this.ctx, this.canvas, this.fps);

    }
    
    start() {
        this.level.start();
        this.clear();
        this.stop();
    }
    
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    stop() {
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined;
    };
    
    onKeyEvent(event) {
        this.level.onKeyEvent(event);
    }
}