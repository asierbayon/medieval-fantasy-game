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
    }


    move(player) {
        
        if (this.state.dead && player.x >= player.maxX && player.movement.right) {
            this.vx = BACKGROUND_SPEED;
        } else if (this.state.dead) {
            this.vx = 0;
        }   else if (player.x >= player.maxX  && player.movement.right && this.position.right && !this.state.moving) {
            this.vx = BACKGROUND_SPEED;
        }   else if (player.x >= player.maxX && player.movement.right && this.position.right && this.state.moving) {
            this.vx = BACKGROUND_SPEED - this.speed;
        }   else if (player.x >= player.maxX && player.movement.right && this.position.left) {
            this.vx = this.speed + BACKGROUND_SPEED;
        }   else if (!this.state.moving) {
            this.vx = 0;
        }  else if (this.position.right && this.state.called) {
            this.vx = - this.speed;
        }  else if (this.position.left && this.state.called) {
            this.vx = this.speed;
        }   else {
            this.vx = 0;
        }
        this.x += this.vx;

        this.checkMovement();
        this.isDead();
      }

      checkMovement() {
          if (this.inline.vertically) this.state.moving = false;
          else if (this.state.called) this.state.moving = true;
          
      }

}