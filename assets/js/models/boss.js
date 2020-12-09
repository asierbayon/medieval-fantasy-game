class Boss extends Enemy {

    constructor(ctx, x, y) {
        super(ctx, x, y, 'king');

        this.sprite.horizontalFrames = 37;
        this.sprite.verticalFrames = 8;
        this.healthPoints = 10;
        this.damagePoints = 3; //change this
        this.speed = 1;
    }

    animate() {
        if (this.state.dead && !this.deadAnimated) {
            this.oneTimeAnimation(4, 0, 37, 10);
        } else if (this.state.dead && this.deadAnimated) {
            this.oneTimeAnimation(4, 37, 37, 0)
        }   else if (this.state.nextToCharacter && this.position.left) {
            this.animateSprite(6, 0, 28, 4);
        }  else if (this.state.nextToCharacter && this.position.right) {
            this.animateSprite(7, 0, 28, 7);
        } else if (this.position.left && this.state.moving) {
            this.animateSprite(2, 0, 7, 7);
        } else if (this.position.right && this.state.moving) {
            this.animateSprite(3, 0, 7, 4);
        } else if (this.position.left) {
            this.animateSprite(0, 0, 17, 4);
        } else if (this.position.right) {
            this.animateSprite(1, 0, 17, 4);
        }
      }
}