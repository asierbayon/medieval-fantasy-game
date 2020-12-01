class Enemy {

    constructor(ctx, x, y, character) {
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
        this.sprite.horizontalFrames = 37;
        this.sprite.verticalFrames = 6;
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

        this.character = character;
        this.isCloseToCharacter = false;

        this.healthPoints = 2;

    }

    isReady() {
        return this.sprite.isReady;
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
        
    }  

    closeness() {
        if (this.x > this.character.x && this.x < this.character.x + this.character.width / 2) {
            this.isCloseToCharacter = true;
        } else if (this.character.x < this.x + this.width / 2 && this.x < this.character.x) {
            this.isCloseToCharacter = true;
        } else {
            this.isCloseToCharacter = false;
        }
    }

    move() {
        this.closeness();
        if (this.character.isAttacking) {
            this.vx = 0;
            if (this.character.x === this.character.maxX && this.character.movement.right) {
            this.vx = -2;
            }
        }  else if (this.character.x === this.character.maxX && this.character.movement.right) {
            this.vx = -1;
        }  else if (this.isCloseToCharacter) {
            this.vx = 0;
        }    else if (this.x > this.character.x) {
            this.vx = -1;
        }  else if (this.x < this.character.x) {
            this.vx = 1;
        }

        this.x += this.vx;
      }

      animate() {
        if (this.healthPoints <= 0) {
            this.animateSprite(5, 0, 36, 10);
        } else if (this.x < this.character.x && !this.isCloseToCharacter) {
        this.animateSprite(2, 0, 7, 10);
        } else if (this.x > this.character.x && !this.isCloseToCharacter) {
            this.animateSprite(3, 0, 7, 10);
        } else if (this.x < this.character.x && this.isCloseToCharacter) {
            this.animateSprite(0, 0, 17, 5);
        } else if (this.x > this.character.x && this.isCloseToCharacter) {
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

}