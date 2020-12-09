class Level {

    constructor(ctx, canvas, fps) {
        this.ctx = ctx;

        this.canvas = canvas;
        
        this.fps = fps;
    }

    start() {
        if (!this.drawIntervalId) {
            this.drawIntervalId = setInterval(() => {
                this.move();
                this.draw();
                this.positionChecker();
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
        this.obstacles.forEach(obstacle => obstacle.onKeyEvent(event));
    };

    draw() {
        this.background.draw();
        this.platform.forEach(platform => platform.draw());
        this.player.draw();
        this.enemy.forEach(enemy => enemy.draw());
        this.health.forEach(heart => heart.draw());
        this.obstacles.forEach(obstacle => obstacle.draw());
    };

    move() {
        if (this.player.x >= this.player.maxX) {
            this.background.move();
            this.platform.forEach(platform => platform.move());
            this.obstacles.forEach(obstacle => obstacle.move());
          }
        this.player.move();
        this.enemy.forEach(enemy => enemy.move(this.player));
    };

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
    };

    positionChecker() {
        this.enemy.forEach(enemy => this.callEnemy(enemy));
        this.inlineChecker();
        this.sideOfPlayerIsEnemyOn();
        this.onTheSamePlatform();
    };

    collisionChecker() {
        this.platform.forEach(platform => {
            this.player.onPlatformChecker(platform);
            this.enemy.forEach(enemy => enemy.onPlatformChecker(platform)); //cuidado
            });
        this.enemy.forEach(enemy => this.nextToCharacter());
    };

    onTheSamePlatform() {
        this.enemy.filter(enemy => enemy.state.onAPlatform).forEach(enemy => {
            if (this.player.platform === enemy.platform) {
                enemy.playerOnMyPlatform = true;
            } else {
                enemy.playerOnMyPlatform = false;
            }
        });
    }

    callEnemy(enemy) {
        if (this.player.x > enemy.x - ACTION_RADIUS && this.player.x < enemy.x + ACTION_RADIUS && enemy.inline.horizontally) {
            enemy.state.called = true;
        }
    };

    nextToCharacter() {
        this.enemy.forEach(enemy => {
            if (enemy.inline.vertically && enemy.inline.horizontally) {
            enemy.state.nextToCharacter = true;
            } else {
            enemy.state.nextToCharacter = false;
            }
        });

        this.obstacles.forEach(obstacle => {
            if (obstacle.inline.vertically && obstacle.inline.horizontally) {
            obstacle.state.nextToCharacter = true;
            } else {
            obstacle.state.nextToCharacter = false;
            }
        })
    };

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

        const obstaclesOnScreen = this.obstacles.filter(obstacle => obstacle.x <= this.canvas.width && obstacle.x + obstacle.width >= 0);
        obstaclesOnScreen.forEach(obstacle => {
            if (obstacle.y + obstacle.height / 2 >= this.player.y && obstacle.y + obstacle.height / 2 <= this.player.y + this.player.height) {
                obstacle.inline.horizontally = true;
            } else {
                obstacle.inline.horizontally = false;
            }

            if ((obstacle.x >= this.player.x && obstacle.x <= this.player.x + this.player.width / 2) || (obstacle.x + obstacle.width >= this.player.x + this.player.width / 2 && obstacle.x <= this.player.x + this.player.width / 2)) {
                obstacle.inline.vertically = true;
            } else {
                obstacle.inline.vertically = false;
            }
        })
    };

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
    };

    

    attack() {
        const closeEnemies = this.enemy.filter(enemy => !enemy.state.dead && enemy.state.nextToCharacter);
        const closeFireplaces = this.obstacles.filter(fireplace => fireplace.state.nextToCharacter);
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

        closeFireplaces.forEach(fireplace => {
            if (fireplace.sprite.horizontalFrameIndex === fireplace.sprite.initialHorizontalIndex + 1 && !fireplace.alreadyTakenLifeFromOpponent && !this.player.state.dead) {
                this.player.healthPoints -= fireplace.damagePoints;
                fireplace.alreadyTakenLifeFromOpponent = true;
            } else if (fireplace.sprite.horizontalFrameIndex === fireplace.sprite.initialHorizontalIndex) {
                fireplace.alreadyTakenLifeFromOpponent = false;
            }
        })
    };

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
    };

    lookingAtEnemy(enemy) {
        return this.player.lastMovement.right && enemy.position.right || this.player.lastMovement.left && enemy.position.left;
    };

    closestEnemy(enemies) {
        return enemies.reduce((a, b) => {
            return Math.abs(b.x - this.player.x + this.player.width / 2) < Math.abs(a.x - this.player.x + this.player.width/2) ? b : a;
        })
    };
}