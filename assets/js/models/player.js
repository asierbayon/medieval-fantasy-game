class Player extends Character {

    constructor(ctx, x, y, horizontalFrames, verticalFrames) {
        super(ctx, x, y, 'knight', horizontalFrames, verticalFrames);


        this.ground = this.y;
        this.maxX = this.ctx.canvas.width / 2;
        this.movement = {
            up: false,
            right: false,
            left: false
        };

        this.state.jumping = false;
        this.state.onAPlatform = false;
        this.state.offAPlatform = false;

        this.lastMovement = {
            right: true,
            left: false
        };

        this.platformFloor = 0;
        this.platform = {
          x: undefined,
          y: undefined,
          width: undefined
        };

        this.healthPoints = CHARACTER_HEALTH;
        this.damagePoints = CHARACTER_DAMAGE;

    }

    onKeyEvent(event) {
        const state = event.type === 'keydown';
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


    move() { 
        
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

    animate() {
        if (this.state.attacking) {
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


    onPlatformChecker(element) {
        const characterRealX = this.x + this.width / 3;
        const characterRealXPlusWidth = this.x + this.width * 2/3;
      if (characterRealX < element.x + element.width &&
        characterRealXPlusWidth > element.x &&
        this.y + this.height < element.y) {
          this.platform = element
          this.state.onAPlatform = true;
          this.platformFloor = element.y;
        } 
      if (this.state.onAPlatform && (characterRealX > this.platform.x + this.platform.width || characterRealXPlusWidth < this.platform.x)) {
          this.state.onAPlatform = false;
          this.state.offAPlatform = true;
        }
  }
}