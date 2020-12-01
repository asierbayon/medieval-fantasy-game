class Platform {
    constructor(ctx, x, y, verticalFrameIndex) {
        this.ctx = ctx;

        this.x = x;
        this.y = y;

        this.vx = -2;

        this.sprite = new Image();
        this.sprite.src = 'assets/img/platform_sprites.png';
        this.sprite.isReady = false;

        this.sprite.horizontalFrames = 1;
        this.sprite.verticalFrames = 3;
        this.sprite.verticalFrameIndex = verticalFrameIndex;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
            this.width = this.sprite.frameWidth;
            this.height = this.sprite.frameHeight;
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
            this.sprite.verticalFrameIndex * this.sprite.frameHeight,
            this.sprite.frameWidth,
            this.sprite.frameHeight,
            this.x,
            this.y,
            this.width,
            this.height
            );

            this.ctx.strokeRect(this.x, this.y, this.sprite.frameWidth, this.sprite.frameHeight)

        }
    }  

        move() {
        if (this.movements.right) {
            this.x += this.vx;
          }
      }

}
