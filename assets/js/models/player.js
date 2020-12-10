class Player extends Character {

    constructor(ctx, x, y, horizontalFrames, verticalFrames) {
        super(ctx, x, y, 'knight', horizontalFrames, verticalFrames);
        
        this.maxX = this.ctx.canvas.width / 2;
        this.movement = {
            up: false,
            right: false,
            left: false
        };

        this.state.jumping = false;

        this.lastMovement = {
            right: true,
            left: false
        };

        this.healthPoints = CHARACTER_HEALTH;
        this.damagePoints = 50;

    }

    onKeyEvent(event) {
        const state = event.type === 'keydown';
        if (!this.deadAnimated) {
            switch (event.keyCode) {
                case KEY_RIGHT:
                    this.movement.right = state;
                    this.lastMovement.right = true;
                    this.lastMovement.left = false;
                    break;
                case KEY_LEFT:
                    this.movement.left = state;
                    this.lastMovement.right = false;
                    this.lastMovement.left = true;
                    break;
                case KEY_UP:
                    this.movement.up = state;
                    break;
                case !this.state.attacking && SPACE:
                    this.state.attacking = true;
                    this.alreadyTakenLifeFromOpponent = false;
                    break;
            }
        }
    }

    move() {
        if(!this.state.dead) {
            if (this.state.onAPlatform) {
                this.maxY = this.platformFloor - this.height;
            } else if (this.state.offAPlatform && this.y !== this.ground) {
                this.maxY = this.ground;
                this.vy += GRAVITY;
            }
    
            if (this.movement.up && !this.state.jumping) {
                this.state.jumping = true;
                this.vy = -8;
            }   else if (this.state.jumping) {
                this.vy += GRAVITY;
            }
    
            if (this.movement.right) {
                this.vx = SPEED;
            } else if (this.movement.left) {
                this.vx = -SPEED;
            } else {
                this.vx = 0;
            }
            
            this.x += this.vx;
            this.y += this.vy;
        
            if (this.x >= this.maxX) {
                this.x = this.maxX;
            } else if (this.x <= this.minX) {
                this.x = this.minX;
            }

            if (this.y >= this.maxY) {
                this.y = this.maxY;
                this.state.jumping = false;
                this.state.offAPlatform = false;
            }
        }
    }

    animate() {
        if (this.state.dead) {
            if (!this.deadAnimated && this.lastMovement.right) {
                this.oneTimeAnimation(6, 0, 14, 5);
            } else if (this.lastMovement.right) {
                this.oneTimeAnimation(6, 14, 14, 0);
            } else if (!this.deadAnimated) {
                this.oneTimeAnimation(7, 0, 14, 5);
            } else {
                this.oneTimeAnimation(7, 14, 14, 0);
            }
        } else if (this.state.attacking) {
            if (this.lastMovement.right) {
                this.oneTimeAnimation(0, 0, 7, 5);
            } else {
                this.oneTimeAnimation(1, 0, 7, 5);
            }
        } else if (this.state.jumping) {
            if (this.lastMovement.right) {
                this.animateSprite(4, 4, 8, 10);
            } else {
                this.animateSprite(5, 4, 8, 10);
            }
        } else if (this.movement.right) {
              this.animateSprite(8, 0, 7, 5);
        } else if (this.movement.left) {
              this.animateSprite(9, 0, 7, 5);
        } else if (this.lastMovement.left) {
              this.animateSprite(3, 0, 14, 5);
        } else {
              this.animateSprite(2, 0, 14, 5);
        }
    }
}