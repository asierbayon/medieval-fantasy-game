class Enemy extends Character {

    constructor(ctx, x, y, sprite) {
        super(ctx, x, y, sprite);

        this.state.nextToCharacter = false;
        this.state.called = false;

        this.position = {
            left: false,
            right: true
        }

        this.inline = {
            vertically: false,
            horizontally: true
        }

        this.deadAnimation = false;

        this.playerOnMyPlatform = false;
    }


    move (player) {
        if (!this.state.onAPlatform || this.playerOnMyPlatform) {
            if (this.state.dead && player.x >= player.maxX && player.movement.right) {
                this.vx = BACKGROUND_SPEED;
            }   else if (this.state.dead) {
                this.vx = 0;
            }   else if (player.x >= player.maxX  && player.movement.right && this.position.right && !this.state.moving) {
                this.vx = BACKGROUND_SPEED;
            }   else if (player.x >= player.maxX && player.movement.right && this.position.right && this.state.moving) {
                this.vx = BACKGROUND_SPEED - this.speed;
            }   else if (player.x >= player.maxX && player.movement.right && this.position.left) {
                this.vx = this.speed + BACKGROUND_SPEED;
            }   else if (!this.state.moving) {
                this.vx = 0;
            }   else if (this.position.right && this.state.called) {
                this.vx = - this.speed;
            }   else if (this.position.left && this.state.called) {
                this.vx = this.speed;
            }   else {
                this.vx = 0;
            }
        } else {
            if (this.state.dead && player.x >= player.maxX && player.movement.right) {
                this.vx = BACKGROUND_SPEED;
            }   else if (this.state.dead) {
                this.vx = 0;
            }   else if (player.x >= player.maxX  && player.movement.right) {
                this.vx = BACKGROUND_SPEED;
            }   else if (player.x >= player.maxX && player.movement.right && this.position.right && this.state.moving && this.hasPlatformToWalk.onLeft) {
                this.vx = BACKGROUND_SPEED - this.speed;
            }   else if (player.x >= player.maxX && player.movement.right && this.position.left && this.hasPlatformToWalk.onRight) {
                this.vx = this.speed + BACKGROUND_SPEED;
            }   else {
                this.vx = 0;
            }
            
        }

        this.x += this.vx;

        this.checkMovement();
        this.isDead();
      }

    checkMovement() {
        if (this.state.onAPlatform && !this.playerOnMyPlatform) this.state.moving = false;
        else if (this.inline.vertically) this.state.moving = false;
        else if (this.state.called) this.state.moving = true;
      }

    onPlatformChecker(element) {
        const characterRealX = this.x + this.width / 3;
        const characterRealXPlusWidth = this.x + this.width * 2/3; 
        if (this.y + this.height < MIN_PLATFORM_HEIGHT) {
            if (characterRealX < element.x + element.width &&
            characterRealXPlusWidth > element.x &&
            this.y < element.y) {
            this.platform = element
            this.state.onAPlatform = true;
            } 
        } else {
            this.state.onAPlatform = false;
        }
  }



}