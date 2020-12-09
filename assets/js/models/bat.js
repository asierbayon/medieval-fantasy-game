class Bat extends Enemy {
    constructor (ctx, x, y) {
        super (ctx, x, y, 'bat');

        this.sprite.horizontalFrames = 10;
        this.sprite.verticalFrames = 6;
        this.healthPoints = 1;
        this.healthPoints = BAT_HEALTH;
        this.damagePoints = BAT_DAMAGE;
        this.speed = BAT_SPEED;
    }

    animate() {
        if (this.state.dead && !this.deadAnimated && this.position.left) {
            this.oneTimeAnimation(3, 0, 8, 10);
        } else if (this.state.dead && !this.deadAnimated && this.position.right) {
            this.oneTimeAnimation(3, 0, 8, 10);
        } else if (this.state.dead && this.deadAnimated) {
            this.animateSprite(2, 8, 8, 0)
        } else if (this.state.nextToCharacter && this.position.left) {
            this.animateSprite(4, 0, 9, 10);
        }  else if (this.state.nextToCharacter && this.position.right) {
            this.animateSprite(5, 0, 9, 10);
        } else if (this.position.left) {
            this.animateSprite(0, 0, 7, 4);
        } else if (this.position.right) {
            this.animateSprite(1, 0, 7, 4);
        }
      }
}