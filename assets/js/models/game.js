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
        this.enemy = [
            new Enemy(this.ctx, 600, 395, this.character),
            new Enemy(this.ctx, 1000, 395, this.character)
        ];
        this.platform = [
            new Platform(this.ctx, 200, 400, 0, 1/3),
            new Platform(this.ctx, 300, 350, 1, 2/3),
            new Platform(this.ctx, 1000, 400, 0, 1/3),
        ];

        this.health = [
            new Health(this.ctx, 20, 20),
            new Health(this.ctx, 45, 20),
            new Health(this.ctx, 70, 20)
        ]

        this.health[0].sprite.horizontalFrameIndex = 0;
        this.health[1].sprite.horizontalFrameIndex = 0;
        this.health[2].sprite.horizontalFrameIndex = 0;
    }

    start() {
        if (!this.drawIntervalId) {
            this.drawIntervalId = setInterval(() => {
                this.clear();
                this.move();
                this.draw();
                this.eliminateEnemies();
                this.collisionChecker();
                this.attack();
            }, this.fps);
        }
    };

    onKeyEvent(event) {
        this.background.onKeyEvent(event);
        this.character.onKeyEvent(event);
        this.platform.forEach(platform => platform.onKeyEvent(event));
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
        this.platform.forEach(platform => platform.draw());
        this.character.draw();
        this.enemy.forEach(enemy => enemy.draw());
        this.health.forEach(heart => heart.draw());
    }

    move() {
        if (this.character.x >= this.character.maxX) {
            this.background.move();
            this.platform.forEach(platform => platform.move());
          }
        this.character.move();
        this.enemy.forEach(enemy => enemy.move());
    }

    checkHealth() {
        const lostHealth = CHARACTER_HEALTH - this.character.healthPoints;
        if (lostHealth <= 4) {
            this.health[2].sprite.horizontalFrameIndex = lostHealth;
        } else if (lostHealth > 4 && lostHealth <= 8) {
            this.health[1].sprite.horizontalFrameIndex = lostHealth - 4;
            this.health[2].sprite.horizontalFrameIndex = 4;        
        } else {
            this.health[0].sprite.horizontalFrameIndex = lostHealth - 8;  
            this.health[1].sprite.horizontalFrameIndex = 4;
            this.health[2].sprite.horizontalFrameIndex = 4;  
        }
    }

    eliminateEnemies() {
        if (this.character.isAttacking) {
            this.enemy.healthPoints = 0;
        }
    }

    collisionChecker() {
        this.platform.forEach(platform => this.character.onPlatformChecker(platform));
        this.enemy.forEach(enemy => this.callEnemy(enemy));
        this.enemy.forEach(enemy => this.nextToCharacter(enemy));
    }

    callEnemy(enemy) {
        if (this.character.x > enemy.x - ACTION_RADIUS && this.character.x < enemy.x + ACTION_RADIUS && enemy.y === this.character.y - 15) {
            enemy.state.called = true;
        }
    }

    nextToCharacter(enemy) {
        if (enemy.x > this.character.x && enemy.x < this.character.x + this.character.width / 2) {
            enemy.state.nextToCharacter = true;
        } else if (this.character.x < enemy.x + enemy.width / 2 && enemy.x < this.character.x) {
            enemy.state.nextToCharacter = true;
        } else {
            enemy.state.nextToCharacter = false;
        }
    }

    attack() {
        if (!this.character.justAttacked && this.character.movement.attack && this.enemy.filter(enemy => enemy.state.nextToCharacter).length > 0) {
            this.enemy[0].healthPoints--;
            this.character.justAttacked = true;
        }
    }
}