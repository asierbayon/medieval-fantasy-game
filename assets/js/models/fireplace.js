class Fireplace extends Obstacle {

    constructor(ctx, x, y, sprite) {
        super(ctx, x, y, sprite, 1, 6);

        this.damagePoints = 1;
    }

    animate() {
        this.animateSprite(0, 5, 10);
    }
}