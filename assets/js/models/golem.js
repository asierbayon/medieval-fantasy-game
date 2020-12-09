class Golem extends Enemy {
    constructor (ctx, x, y) {
        super (ctx, x, y, 'golem');

        this.sprite.horizontalFrames = 28;
        this.sprite.verticalFrames = 8;
        this.healthPoints = GOLEM_HEALTH;
        this.damagePoints = GOLEM_DAMAGE;
        this.speed = GOLEM_SPEED;
    }

    animate() {
        if (this.state.dead && !this.deadAnimated) {
            this.oneTimeAnimation(7, 0, 27, 10);
        } else if (this.state.dead && this.deadAnimated) {
            this.animateSprite(7, 27, 27, 0)
        }   else if (this.state.nextToCharacter && this.position.left) {
            this.animateSprite(4, 0, 16, 7);
        }  else if (this.state.nextToCharacter && this.position.right) {
            this.animateSprite(5, 0, 16, 7);
        } else if (this.position.left && this.state.moving) {
            this.animateSprite(2, 0, 6, 4);
        } else if (this.position.right && this.state.moving) {
            this.animateSprite(3, 0, 6, 4);
        } else if (this.position.left) {
            this.animateSprite(0, 0, 11, 10);
        } else if (this.position.right) {
            this.animateSprite(1, 0, 11, 10);
        }
      }
}