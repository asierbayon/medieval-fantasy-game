class Obstacle {

    constructor(ctx, x, y, sprite) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;

        this.vx = BACKGROUND_SPEED;
        
        this.sprite = new Image();
        this.sprite.src = `assets/img/${sprite}_sprites.png`;
        this.sprite.isReady = false;
        this.sprite.horizontalFrames = 6;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.maxHorizontalIndex = this.sprite.horizontalFrames;
        this.sprite.initialHorizontalIndex = 0;
        this.sprite.drawCount = 0;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = this.sprite.height;
            this.width = this.sprite.frameWidth;
            this.height = this.sprite.frameHeight;
        }

        this.state = {
            nextToCharacter: false
        }

        this.movements = {
            right: false
        }
    }

    isReady() {
        return this.sprite.isReady;
    }

    onKeyEvent(event) {
        const status = event.type === 'keydown';
        switch (event.keyCode) {
         case KEY_RIGHT:
            this.movements.right = status;
            break;
        }  
    }

    draw() {
        if (this.sprite.isReady) {
          this.ctx.drawImage(
            this.sprite,
            this.sprite.horizontalFrameIndex * Math.floor(this.sprite.frameWidth),
            0,
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

    animateSprite(initialHorizontalIndex, maxHorizontalIndex, frequency) {
        this.sprite.maxHorizontalIndex = maxHorizontalIndex;
        this.sprite.initialHorizontalIndex = initialHorizontalIndex;
        if (this.sprite.drawCount % frequency === 0) {
              if (this.sprite.horizontalFrameIndex < maxHorizontalIndex) {
                this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1);
                this.sprite.drawCount = 0;
              } else {
                this.sprite.horizontalFrameIndex = 0;
                this.sprite.drawCount = 0;
              }
          }
    }

    move() {
        if (this.movements.right) {
            this.x += this.vx;
          }
      }

}