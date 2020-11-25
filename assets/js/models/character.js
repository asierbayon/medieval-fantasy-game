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

        this.sprite = new Image();
        this.sprite.src = 'assets/img/knight_all.PNG';
        this.sprite.isReady = false;
        this.sprite.horizontalFrames = 22;
        this.sprite.verticalFrames = 5;
        this.sprite.verticalFrameIndex = 3;
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
            left: false
        }

        this.isJumping = false;

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
        }
    }

    draw() {
        if (this.sprite.isReady) {
          this.ctx.drawImage(
            this.sprite,
            this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
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
    }  

    move() { 

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
          this.vy = 0;
        }
      }

      animate() {
        if (this.isJumping) {
            this.animateSprite(1, 0, 6, 20);
          } else if (this.movement.right || this.movement.left) {
              this.animateSprite(4, 0, 7, 10);
          } else {
              this.resetAnimation();
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
           /*  this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % this.sprite.horizontalFrames;
            this.sprite.drawCount = 0; */
          }
    }

    resetAnimation() {
        this.animateSprite(3, 0, 14, 4)
    }
      
}