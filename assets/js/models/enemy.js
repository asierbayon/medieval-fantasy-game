class Enemy extends Character {

    constructor(ctx, x, y, maxX, sprite, horizontalFrames, verticalFrames, character, healthPoints) {
        super(ctx, x, y, maxX, sprite, horizontalFrames, verticalFrames, healthPoints)

        this.character = character;
        this.state = {
            nextToCharacter: false,
            called: false
        }
        this.position = {
            left: false,
            right: true
        }
        this.deadAnimation = false;
    }


    move() {
        if (this.state.dead && this.character.x >= this.character.maxX && this.character.movement.right) {
            this.vx = -2;
        } else if (this.state.dead) {
            this.vx = 0;
        }   else if (this.character.x >= this.character.maxX && this.character.movement.right && this.position.left && !this.state.moving) {
            this.vx = -2;
        }   else if (this.character.x >= this.character.maxX && this.character.movement.right && this.position.left && this.state.moving) {
            this.vx = -3;
        }   else if (this.character.x >= this.character.maxX && this.character.movement.right && this.position.right) {
            this.vx = -1;
        }   else if (this.state.nextToCharacter) {
            this.vx = 0;
        }  else if (this.x > this.character.x && this.state.called) {
            this.vx = -1;
        }  else if (this.x < this.character.x && this.state.called) {
            this.vx = 1;
        }   else {
            this.vx = 0;
        }
        this.x += this.vx;

        this.checkMovement();
        this.checkRelativePosition();
        this.isDead();
        this.attack();
      }

      checkRelativePosition() {
          // Where is the character?
          if (this.x < this.character.x) {
              this.position.left = false;
              this.position.right = true;
          } else {
              this.position.left = true;
              this.position.right = false;
          }
      }

      checkMovement() {
          if (this.state.nextToCharacter) this.state.moving = false;
          else if (this.state.called) this.state.moving = true;
          
      }

      animate() {
        if (this.state.dead) {
            this.oneTimeAnimation(5, 0, 36, 10);
        } else if (this.state.dead && !this.deadAnimation) {
            this.animateSprite(5, 36, 36, 0)
        } else if (this.position.right && this.state.moving) {
            this.animateSprite(2, 0, 7, 10);
        } else if (this.position.left && this.state.moving) {
            this.animateSprite(3, 0, 7, 10);
        } else if (this.position.right && !this.state.moving) {
            this.animateSprite(0, 0, 17, 5);
        } else if (this.position.left && !this.state.moving) {
            this.animateSprite(1, 0, 17, 5);
        }
      }



    attack() {
        if (this.state.nextToCharacter) {
            this.state.attacking = true;
        }
    }

}