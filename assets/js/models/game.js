class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = 700;
        this.canvas.height = 498;
        this.ctx = this.canvas.getContext('2d');

        this.drawIntervalId = undefined;
        this.fps = 1000 / 60

        this.background = new Background(this.ctx);
        this.player = new Player(this.ctx, 25, 410, 'knight_sprites.png', 22, 10, 12);
        this.enemy = [
            new Bat(this.ctx, 600, 390, this.player, 'bat_sprites.png'),
            new Bat(this.ctx, 1000, 390,this.player, 'bat_sprites.png')
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
        ];

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
                this.checkHealth();
            }, this.fps);
        }
    };

    onKeyEvent(event) {
        this.background.onKeyEvent(event);
        this.player.onKeyEvent(event);
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
        this.player.draw();
        this.enemy.forEach(enemy => enemy.draw());
        this.health.forEach(heart => heart.draw());
    }

    move() {
        if (this.player.x >= this.player.maxX) {
            this.background.move();
            this.platform.forEach(platform => platform.move());
          }
        this.player.move();
        this.enemy.forEach(enemy => enemy.move());
    }

    checkHealth() {
        const lostHealth = CHARACTER_HEALTH - this.player.healthPoints;
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
        if (this.player.isAttacking) {
            this.enemy.healthPoints = 0;
        }
    }

    collisionChecker() {
        this.platform.forEach(platform => this.player.onPlatformChecker(platform));
        this.enemy.forEach(enemy => this.callEnemy(enemy));
        this.enemy.forEach(enemy => this.nextToCharacter(enemy));
    }

    callEnemy(enemy) {
        if (this.player.x > enemy.x - ACTION_RADIUS && this.player.x < enemy.x + ACTION_RADIUS /* && enemy.y === this.player.y - 15 */) {
            enemy.state.called = true;
        }
    }

    nextToCharacter(enemy) {
        if (enemy.x > this.player.x && enemy.x < this.player.x + this.player.width / 2) {
            enemy.state.nextToCharacter = true;
        } else if (this.player.x < enemy.x + enemy.width / 2 && enemy.x < this.player.x) {
            enemy.state.nextToCharacter = true;
        } else {
            enemy.state.nextToCharacter = false;
        }
    }

    attack() {
        console.log(this.player.healthPoints)
        const closeEnemies = this.enemy.filter(enemy => enemy.state.nextToCharacter);
        if (!this.player.alreadyTakenLifeFromOpponent && this.player.state.attacking && closeEnemies.length > 0) {
            closeEnemies.forEach(enemy => {
                if (enemy.healthPoints > 0) {
                    enemy.healthPoints--;
                }
            });
            this.player.alreadyTakenLifeFromOpponent = true;
        };

        closeEnemies.forEach(enemy => {
            if (enemy.sprite.horizontalFrameIndex === enemy.sprite.maxHorizontalIndex && !enemy.alreadyTakenLifeFromOpponent && this.player.healthPoints > 0) {
                this.player.healthPoints--;
                enemy.alreadyTakenLifeFromOpponent = true;
            } else if (enemy.sprite.horizontalFrameIndex === enemy.sprite.initialHorizontalIndex) {
                enemy.alreadyTakenLifeFromOpponent = false;
            }
        })
    }
}