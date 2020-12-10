class Level {

    constructor(ctx, canvas, fps, lvlNumber) {
        this.ctx = ctx;

        this.canvas = canvas;
        
        this.fps = fps;

        this.nextLevelAvailable = false;

        this.restartLevel = false;

        this.number = lvlNumber;
        
    }

    start() {
            this.drawIntervalId = setInterval(() => {
                if (!this.nextLevelAvailable && !this.restartLevel) {
                    this.move();
                    this.draw();
                    this.positionChecker();
                    this.collisionChecker();
                    this.attack();
                    this.checkHealth();
                    this.nextLevel();
                    this.restart();
                }
            }, this.fps);
    };

    nextLevel() {
        if (!this.isTheLastLevel) {
            if (this.boss.state.dead && this.boss.sprite.horizontalFrameIndex > this.boss.sprite.maxHorizontalIndex) {
                const img = new Image ();
                img.src = `assets/img/press_any_key.png`;
                this.ctx.drawImage(
                    img,
                    550,
                    20
                );
            }
        } else {
            if (this.boss.state.dead && this.boss.sprite.horizontalFrameIndex > this.boss.sprite.maxHorizontalIndex) {
                const img = new Image ();
                img.src = `assets/img/game_completed.png`;
                this.ctx.drawImage(
                    img,
                    0,
                    0
                );
            }
        }

        if (this.boss.deadAnimated && !this.isTheLastLevel) {
            this.nextLevelAvailable = true;
        }
    }

    onKeyEvent(event) {
        if (!this.player.state.dead) {
            this.background.onKeyEvent(event);
            this.player.onKeyEvent(event);
            this.platform.forEach(platform => platform.onKeyEvent(event));
            this.obstacles.forEach(obstacle => obstacle.onKeyEvent(event));
        }
    };

    restart() {
        if (this.player.deadAnimated) this.restartLevel = true;
    }

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
        } else if (lostHealth > 8 && lostHealth <= 12) {
            this.health[0].sprite.horizontalFrameIndex = lostHealth - 8;  
            this.health[1].sprite.horizontalFrameIndex = 4;
            this.health[2].sprite.horizontalFrameIndex = 4;  
        } else {
            this.health[0].sprite.horizontalFrameIndex = 4;  
            this.health[1].sprite.horizontalFrameIndex = 4;
            this.health[2].sprite.horizontalFrameIndex = 4;  
        }
    };

    positionChecker() {
        this.enemy.forEach(enemy => this.callEnemy(enemy));
        this.enemy.forEach(enemy => this.inlineChecker(enemy));
        this.obstacles.forEach(obstacle => this.inlineChecker(obstacle))
        this.enemy.forEach(enemy => this.sideOfPlayerIsEnemyOn(enemy));
        this.onTheSamePlatform();
    };

    collisionChecker() {
        this.platform.forEach(platform => {
            this.player.onPlatformChecker(platform);
            this.enemy.forEach(enemy => enemy.onPlatformChecker(platform));
            });
        this.enemy.forEach(enemy => this.nextToCharacter(enemy));
        this.obstacles.forEach(obstacle => this.nextToCharacter(obstacle));
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

    nextToCharacter(element) {
            if (element.inline.vertically && element.inline.horizontally) {
                element.state.nextToCharacter = true;
            } else {
                element.state.nextToCharacter = false;
            }
    };

    inlineChecker(element) {
            if (element.y + element.height / 2 >= this.player.y && element.y + element.height / 2 <= this.player.y + this.player.height) {
                element.inline.horizontally = true;
            } else {
                element.inline.horizontally = false;
            }

            if ((element.x >= this.player.x && element.x <= this.player.x + this.player.width / 2) || (element.x + element.width >= this.player.x + this.player.width / 2 && element.x <= this.player.x + this.player.width / 2)) {
                element.inline.vertically = true;
            } else {
                element.inline.vertically = false;
            }
    };

    sideOfPlayerIsEnemyOn(enemy) {
            if (enemy.x > this.player.x) {
              enemy.position.left = false;
              enemy.position.right = true;
          } else {
              enemy.position.left = true;
              enemy.position.right = false;
          }
    };

    

    attack() {
        const closeEnemies = this.enemy.filter(enemy => !enemy.state.dead && enemy.state.nextToCharacter);
        const closeFireplaces = this.obstacles.filter(fireplace => fireplace.state.nextToCharacter);
        const enemiesFighting = closeEnemies.filter(enemy => this.lookingAtEnemy(enemy))
        if (!this.player.alreadyTakenLifeFromOpponent && this.player.state.attacking && enemiesFighting.length > 0) {
            this.setTarget().healthPoints -= this.player.damagePoints;
            this.player.alreadyTakenLifeFromOpponent = true;
        };

        if (!this.boss.state.dead) {
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
            });
        }
    };

    setTarget() {
        const calledInlineEnemies = this.enemy.filter(enemy => enemy.state.called && !enemy.state.dead && enemy.inline.horizontally);
        const calledRight = calledInlineEnemies.filter(enemy => enemy.position.right);
        const calledLeft = calledInlineEnemies.filter(enemy => enemy.position.left);
        if (calledInlineEnemies.length > 0) {
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

    continue() {
        if (this.boss.state.dead) {
            const img = new Image ();
            img.src = `assets/img/press_any_key.png`;
            this.ctx.drawImage(
                img,
                350,
                350
            );
        }
    }

}