class Enemy {

    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.vx = 0;
        this.maxX = this.ctx.canvas.width;
        this.minX = 0;

        this.y = y;
        this.vy = 0;
        this.maxY = this.y;

        this.sprite = new Image();
        this.sprite.src = 'assets/img/king_sprites.png';
        this.sprite.isReady = false;
        this.sprite.horizontalFrames = 18;
        this.sprite.verticalFrames = 2;
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


    }

    isReady() {
        return this.sprite.isReady;
    }

    draw(character) {
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
        this.animate(character);
        
    }  

    move() { 

      }

      animate(character) {
        if (this.x < character.x) {
            this.animateSprite(0, 0, 17, 5);
        } else {
            this.animateSprite(1, 0, 17, 5);
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

    resetAnimation() {
    
    }
}