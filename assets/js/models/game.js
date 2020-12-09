class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = 700;
        this.canvas.height = 498;
        this.ctx = this.canvas.getContext('2d');

        this.drawIntervalId = undefined;
        this.fps = 1000 / 60

        this.background = new Background(this.ctx);
        this.player = new Player(this.ctx, 25, 422, 15, 10, 12);
        this.enemy = [
            new Golem(this.ctx, 300, 410),
            new Bat(this.ctx, 600, 392),
            new Wolf(this.ctx, 1000, 422)
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

        this.health.forEach(heart => heart.sprite.horizontalFrameIndex = 0);
    }

    start() {
        if (!this.drawIntervalId) {
            this.drawIntervalId = setInterval(() => {
                this.clear();
                this.move();
                this.draw();
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
        this.enemy.forEach(enemy => enemy.move(this.player));
    }

    checkHealth() {
        this.player.isDead();
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

    collisionChecker() {
        this.platform.forEach(platform => this.player.onPlatformChecker(platform));
        this.enemy.forEach(enemy => this.callEnemy(enemy));
        this.enemy.forEach(enemy => this.nextToCharacter());
    }

    callEnemy(enemy) {
        if (this.player.x > enemy.x - ACTION_RADIUS && this.player.x < enemy.x + ACTION_RADIUS && enemy.inline.horizontally) {
            enemy.state.called = true;
        }
    }

    nextToCharacter() {
        this.sideOfPlayerIsEnemyOn();
        this.inlineChecker();
        this.enemy.forEach(enemy => {
            if (enemy.inline.vertically && enemy.inline.horizontally) {
            enemy.state.nextToCharacter = true;
            } else {
            enemy.state.nextToCharacter = false;
            }
        })
    }

    inlineChecker() {
        const enemiesOnScreen = this.enemy.filter(enemy => enemy.x <= this.canvas.width && enemy.x + enemy.width >= 0);
        enemiesOnScreen.forEach(enemy => {
            if (enemy.y + enemy.height / 2 >= this.player.y && enemy.y + enemy.height / 2 <= this.player.y + this.player.height) {
                enemy.inline.horizontally = true;
            } else {
                enemy.inline.horizontally = false;
            }

            if ((enemy.x >= this.player.x && enemy.x <= this.player.x + this.player.width / 2) || (enemy.x + enemy.width >= this.player.x + this.player.width / 2 && enemy.x <= this.player.x + this.player.width / 2)) {
                enemy.inline.vertically = true;
            } else {
                enemy.inline.vertically = false;
            }
        })
        
    }

    sideOfPlayerIsEnemyOn() {
        this.enemy.forEach(enemy => {
            if (enemy.x > this.player.x) {
              enemy.position.left = false;
              enemy.position.right = true;
          } else {
              enemy.position.left = true;
              enemy.position.right = false;
          }
        });
    }

    

    attack() {
        const closeEnemies = this.enemy.filter(enemy => !enemy.state.dead && enemy.state.nextToCharacter);
        const enemiesFighting = closeEnemies.filter(enemy => this.lookingAtEnemy(enemy))
        if (!this.player.alreadyTakenLifeFromOpponent && this.player.state.attacking && enemiesFighting.length > 0) {
            this.setTarget().healthPoints -= this.player.damagePoints;
            this.player.alreadyTakenLifeFromOpponent = true;
        };

        closeEnemies.forEach(enemy => {
            if (enemy.sprite.horizontalFrameIndex === enemy.sprite.maxHorizontalIndex && !enemy.alreadyTakenLifeFromOpponent && !enemy.state.dead && !this.player.state.dead) {
                this.player.healthPoints -= enemy.damagePoints;
                enemy.alreadyTakenLifeFromOpponent = true;
            } else if (enemy.sprite.horizontalFrameIndex === enemy.sprite.initialHorizontalIndex) {
                enemy.alreadyTakenLifeFromOpponent = false;
            }
        });

    }

    setTarget() {
        const calledEnemies = this.enemy.filter(enemy => enemy.state.called && !enemy.state.dead);
        const calledRight = calledEnemies.filter(enemy => enemy.position.right);
        const calledLeft = calledEnemies.filter(enemy => enemy.position.left);
        if (calledEnemies.length > 0) {
            if (this.player.lastMovement.right) {
                if (calledRight.length > 0) {
                    return this.closestEnemy(calledRight);
                }   
            } else {
                return this.closestEnemy(calledLeft);
            }
        }
    }

    lookingAtEnemy(enemy) {
        return this.player.lastMovement.right && enemy.position.right || this.player.lastMovement.left && enemy.position.left;
    }

    closestEnemy(enemies) {
        return enemies.reduce((a, b) => {
            return Math.abs(b.x - this.player.x + this.player.width / 2) < Math.abs(a.x - this.player.x + this.player.width/2) ? b : a;
        })
    }
}