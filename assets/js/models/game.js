class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = 700;
        this.canvas.height = 498;
        this.ctx = this.canvas.getContext('2d');

        this.drawIntervalId = undefined;
        this.fps = 1000 / 60

        this.background = new Background(this.ctx);
        this.character = new Character(this.ctx, 15, 410);
        this.enemy = new Enemy(this.ctx, 200, 395, this.character)
    }

    start() {
        if (!this.drawIntervalId) {
            this.drawIntervalId = setInterval(() => {
                this.clear();
                this.move();
                this.draw();
            }, this.fps);
        }
    };

    onKeyEvent(event) {
        this.background.onKeyEvent(event);
        this.character.onKeyEvent(event);
    }

    stop() {
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined;
    };

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    draw() {
        this.background.draw();
        this.character.draw();
        this.enemy.draw(this.character);
    }

    move() {
        if (this.character.x >= this.character.maxX) {
            this.background.move();
          }
        this.character.move();
        this.enemy.move(this.character)
    }
}