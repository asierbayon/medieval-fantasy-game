class Bat extends Enemy {
    constructor (ctx, x, y, character, sprite) {
        super (ctx, x, y, character, sprite);

        this.sprite.horizontalFrames = 10;
        this.sprite.verticalFrames = 6;
        this.healthPoints = 1;
    }

    animate() {
        if (this.state.dead && !this.deadAnimated) {
                this.oneTimeAnimation(3, 0, 8, 10);
        } else if (this.state.nextToCharacter && this.position.right) {
            this.animateSprite(4, 0, 9, 10);
        }  else if (this.state.nextToCharacter && this.position.left) {
            this.animateSprite(5, 0, 9, 10);
        } else if (this.position.right) {
            this.animateSprite(0, 0, 7, 4);
        } else if (this.position.left) {
            this.animateSprite(1, 0, 7, 4);
        }
      }
}