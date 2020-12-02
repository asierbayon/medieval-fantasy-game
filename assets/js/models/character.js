class Character {

    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.vx = 0;
        this.maxX = this.ctx.canvas.width / 2;
        this.minX = 0;

        this.y = y;
        this.vy = 0;
        this.maxY = this.y;
        this.ground = this.y;

        this.sprite = new Image();
        this.sprite.src = 'assets/img/knight_sprites.png';
        this.sprite.isReady = false;
        this.sprite.horizontalFrames = 22;
        this.sprite.verticalFrames = 10;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrameIndex = 0;
        this.maxHorizontalIndex = this.horizontalFrames;
        this.sprite.drawCount = 0;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
            this.width = this.sprite.frameWidth;
            this.height = this.sprite.frameHeight;
        }

        this.movement = {
            up: false,
            right: false,
            left: false,
            attack: false
        }

        this.isJumping = false;
        this.lastMovement = 'right';
        this.isAttacking = false;

        this.isOnAPlatform = false;
        this.isOffAPlatform = false;
        this.platformFloor = 0;
        this.platform = {
          x: undefined,
          y: undefined,
          width: undefined
        };

        this.healthPoints = CHARACTER_HEALTH;

    }

    isReady() {
        return this.sprite.isReady;
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
                this.movement.attack = state;
                break;
        }
    }

    draw() {
        if (this.sprite.isReady) {
          this.ctx.drawImage(
            this.sprite,
            this.sprite.horizontalFrameIndex * Math.floor(this.sprite.frameWidth),
            this.sprite.verticalFrameIndex * this.sprite.frameHeight,
            this.sprite.frameWidth,
            this.sprite.frameHeight,
            this.x,
            this.y,
            this.width,
            this.height
          );
        }
        this.sprite.drawCount++;
        this.animate();

        this.ctx.strokeRect(this.x, this.y, this.sprite.frameWidth, this.sprite.frameHeight)
        
    }  

    move() { 
      if (this.isOnAPlatform) {
        this.maxY = this.platformFloor - this.height;
      } else if (this.isOffAPlatform && this.y !== this.ground) {
        this.maxY = this.ground;
        this.vy += GRAVITY;
      }

      if (this.movement.attack) {
        this.isAttacking = true;
      }

      
        if (this.movement.up && !this.isJumping) {
            this.isJumping = true;
            this.vy = -8;
        }   else if (this.isJumping) {
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
          this.isJumping = false;
          this.isOffAPlatform = false;
          // this.vy = 0;
        }
      }

      animate() {
        if (this.isAttacking) {
          this.animateSprite(6, 0, 21, 10);
        }   else if (this.isJumping && this.lastMovement === 'right') {
                this.animateSprite(4, 4, 11, 18);
          } else if (this.isJumping && this.lastMovement === 'left') {
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

      animateSprite(initialVerticalIndex, initialHorizontalIndex, maxHorizontalIndex, frequency) {
        if (this.sprite.verticalFrameIndex != initialVerticalIndex) {
            this.sprite.verticalFrameIndex = initialVerticalIndex;
            this.sprite.horizontalFrameIndex = initialHorizontalIndex;
          } else if (this.sprite.drawCount % frequency === 0) {
              if (this.sprite.horizontalFrameIndex < maxHorizontalIndex) {
                this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1);
                this.sprite.drawCount = 0;
              } else {
                this.sprite.horizontalFrameIndex = 0;
                this.sprite.drawCount = 0;
              }
          }
    }

    attack() {
      return this.isAttacking;
    }

    onPlatformChecker(element) {
      if (this.x < element.x + element.width &&
        this.x + this.width > element.x &&
        this.y + this.height < element.y) {
          this.platform = element
          this.isOnAPlatform = true;
          this.platformFloor = element.y;
        } 
      if (this.isOnAPlatform && (this.x > this.platform.x + this.platform.width || this.x + this.width < this.platform.x)) {
          this.isOnAPlatform = false;
          this.isOffAPlatform = true;
        }
  }

    
}