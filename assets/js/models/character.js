class Character {

    constructor(ctx, x, y, sprite, horizontalFrames, verticalFrames) {
        this.ctx = ctx;
        this.x = x;
        this.vx = 0;
        this.maxX = this.ctx.canvas.width;
        this.minX = 0;

        this.y = y;
        this.vy = 0;
        this.maxY = this.y;

        this.sprite = new Image();
        this.sprite.src = `assets/img/${sprite}_sprites.png`;
        this.sprite.isReady = false;
        this.sprite.horizontalFrames = horizontalFrames;
        this.sprite.verticalFrames = verticalFrames;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.maxHorizontalIndex = this.sprite.horizontalFrames - 1;
        this.sprite.initialVerticalIndex = 0;
        this.sprite.initialHorizontalIndex = 0;
        this.sprite.drawCount = 0;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
            this.width = this.sprite.frameWidth;
            this.height = this.sprite.frameHeight;
        };

        this.state = {
          moving: false,
          attacking: false,
          dead: false
        };

        this.state.onAPlatform = false;
        this.state.offAPlatform = false;
        this.platform = {
          x: undefined,
          y: undefined,
          width: undefined
        };

        this.platformFloor = 0;
        this.ground = this.y;

        this.deadAnimated = false;

        this.alreadyTakenLifeFromOpponent = false;
    }

    isReady() {
        return this.sprite.isReady;
    }

    isMoving() {
      if (this.vx !==0) this.state.moving = true;
      else this.state.moving = false; 
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
          )};
        this.sprite.drawCount++;
        this.animate();        
    }  

    animateSprite(initialVerticalIndex, initialHorizontalIndex, maxHorizontalIndex, frequency) {
        this.sprite.maxHorizontalIndex = maxHorizontalIndex;
        this.sprite.initialVerticalIndex = initialVerticalIndex;
        this.sprite.initialHorizontalIndex = initialHorizontalIndex;
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

    oneTimeAnimation(initialVerticalIndex, initialHorizontalIndex, maxHorizontalIndex, frequency) {
      if (this.sprite.verticalFrameIndex !== initialVerticalIndex) {
        this.sprite.verticalFrameIndex = initialVerticalIndex;
        this.sprite.horizontalFrameIndex = initialHorizontalIndex;
      } else if (this.sprite.drawCount % frequency === 0) {
        if (this.sprite.horizontalFrameIndex < maxHorizontalIndex) {
          this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1);
          this.sprite.drawCount = 0;
        } else if (this.state.attacking) {
          this.state.attacking = false;
        } else {
          this.deadAnimated = true;
        }
      }   
    }

    isDead() {
      if (this.healthPoints <= 0) {
          this.state.dead = true;
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
        this.platform = undefined;
      }
  }

}