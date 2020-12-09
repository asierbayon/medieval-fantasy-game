class Background {
    constructor(ctx) {
        this.ctx = ctx;

        this.x = 0;
        this.footerX = 0;
        this.y = 0;
        this.height = this.ctx.canvas.height;
        this.width = this.ctx.canvas.width;
        this.footerH = this.height * 0.1;
        this.footerY = this.height - this.footerH;

        this.vx = BACKGROUND_SPEED;

        this.bgImg = new Image();
        this.bgImg.src = 'assets/img/background_glacial_mountains.png';

        this.footerImg = new Image();
        this.footerImg.src = 'assets/img/ground.PNG';

        this.bgImg.isReady = false;
        this.footerImg.isReady = false;

        this.bgImg.onload = () => {
            this.bgImg.isReady = true;
        }

        this.footerImg.onload = () => {
            this.footerImg.isReady = true;
        }

        this.movements = {
            right: false
        }


    }

    isReady() {
        return this.bgImg.isReady;
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
        if (this.bgImg.isReady && this.footerImg.isReady) {
			this.ctx.drawImage(
				this.bgImg,
				this.x,
				this.y,
				this.width,
				this.height
            );
            this.ctx.drawImage(
				this.bgImg,
				this.x + this.width,
				this.y,
				this.width,
				this.height
            );
            this.ctx.drawImage(
				this.footerImg,
				this.footerX,
				this.footerY,
				this.width,
				this.footerH
            );
            this.ctx.drawImage(
				this.footerImg,
				this.footerX + this.width,
				this.footerY,
				this.width,
				this.footerH
            );
	    }
    }

    move() {
        if (this.movements.right) {
            this.x += this.vx;
            this.footerX += this.vx;
            if (this.x + this.width <= 0) {
              this.x = 0;
              this.footerX = 0;
            }
          }
      }
}