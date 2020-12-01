class Background {
    constructor(ctx) {
        this.ctx = ctx;

        this.x = 0;
        this.footerX = 0;
        this.y = 0;
        this.h = this.ctx.canvas.height;
        this.w = this.ctx.canvas.width;
        this.footerH = this.h * 0.1;
        this.footerY = this.h - this.footerH;

        this.vx = -2;

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
				this.w,
				this.h
            );
            this.ctx.drawImage(
				this.bgImg,
				this.x + this.w,
				this.y,
				this.w,
				this.h
            );
            this.ctx.drawImage(
				this.footerImg,
				this.footerX,
				this.footerY,
				this.w,
				this.footerH
            );
            this.ctx.drawImage(
				this.footerImg,
				this.footerX + this.w,
				this.footerY,
				this.w,
				this.footerH
            );
	    }
    }

    move() {
        if (this.movements.right) {
            this.x += this.vx;
            this.footerX += this.vx;
            if (this.x + this.w <= 0) {
              this.x = 0;
              this.footerX = 0;
            }
          }
      }
}