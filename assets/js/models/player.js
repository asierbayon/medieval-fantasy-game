class Player extends Character {

    constructor(ctx, x, y, maxX, sprite, horizontalFrames, verticalFrames) {
        super(ctx, x, y, maxX, sprite, horizontalFrames, verticalFrames);

        this.ground = this.y;

        this.movement = {
            up: false,
            right: false,
            left: false,
            attack: false
        };

        this.state = {
          jumping: false,
          attacking: false,
          onAPlatform: false,
          offAPlatform: false
        };

        this.lastMovement = 'right';

        this.platformFloor = 0;
        this.platform = {
          x: undefined,
          y: undefined,
          width: undefined
        };

        this.healthPoints = CHARACTER_HEALTH;

        this.attackAnimation = false;
        this.justAttacked = false;
    }

    onKeyEvent(event) {
        const state = event.type === 'keydown';
        switch (event.keyCode) {
            case KEY_RIGHT:
                this.movement.right = state;
                break;
            case KEY_LEFT:
                this.movement.left = state;
                break;
            case KEY_UP:
                this.movement.up = state;
                break;
            case SPACE:
            // FIX: Si no estoy atacando y pulso space, entonces
            // Change justAttacked = ya he quitado vida al enemigo
                this.movement.attack = state;
                this.justAttacked = false;
                break;
        }
    }

    move() { 
        this.attack();
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
            // this.vy = 0;
        }
    }

    animate() {
      if (this.attackAnimation) {
        this.animateSprite(6, 9, 12, 10);
      }   else if (this.state.jumping && this.lastMovement === 'right') {
              this.animateSprite(4, 4, 11, 18);
        } else if (this.state.jumping && this.lastMovement === 'left') {
              this.animateSprite(5, 4, 11, 18);
        } else if (this.movement.right) {
              this.animateSprite(2, 0, 7, 10);
              this.lastMovement = 'right';
        } else if (this.movement.left) {
              this.animateSprite(3, 0, 7, 10);
              this.lastMovement = 'left';
        } else if (this.lastMovement === 'left') {
              this.animateSprite(1, 0, 14, 5);
        } else {
              this.animateSprite(0, 0, 14, 5);
        }
    }

    attack() {
      if (this.movement.attack) {
        this.attackAnimation = true;
      } else if (this.sprite.verticalFrameIndex === this.sprite.initialVerticalIndex && this.sprite.horizontalFrameIndex === this.sprite.maxHorizontalIndex) {
          this.attackAnimation = false;
          this.movement.attack = false;
        }
    }

    onPlatformChecker(element) {
      if (this.x < element.x + element.width &&
        this.x + this.width > element.x &&
        this.y + this.height < element.y) {
          this.platform = element
          this.state.onAPlatform = true;
          this.platformFloor = element.y;
        } 
      if (this.state.onAPlatform && (this.x > this.platform.x + this.platform.width || this.x + this.width < this.platform.x)) {
          this.state.onAPlatform = false;
          this.state.offAPlatform = true;
        }
  }
}