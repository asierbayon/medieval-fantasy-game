class Wolf extends Enemy {
    constructor (ctx, x, y) {
        super (ctx, x, y, 'wolf');

        this.sprite.horizontalFrames = 18;
        this.sprite.verticalFrames = 7;
        this.healthPoints = WOLF_HEALTH;
        this.damagePoints = WOLF_DAMAGE;
        this.speed = WOLF_SPEED;
    }

    animate() {
        if (this.state.dead && !this.deadAnimated) {
            this.oneTimeAnimation(6, 0, 17, 10);
        } else if (this.state.dead && this.deadAnimated) {
            this.animateSprite(6, 17, 17, 0)
        }   else if (this.state.nextToCharacter && this.position.left && !this.state.dead) {
            this.animateSprite(4, 0, 7, 7);
        }  else if (this.state.nextToCharacter && this.position.right && !this.state.dead) {
            this.animateSprite(5, 0, 7, 7);
        } else if (this.position.left && this.state.called) {
            this.animateSprite(0, 0, 7, 4);
        } else if (this.position.right && this.state.called) {
            this.animateSprite(1, 0, 7, 4);
        } else if (this.position.left && !this.state.dead) {
            this.animateSprite(2, 0, 11, 4);
        } else if (this.position.right && !this.state.dead) {
            this.animateSprite(3, 0, 11, 4);
        }
      }
}