class Potion extends Obstacle {

    constructor(ctx, x, y) {
        super(ctx, x, y, `potion`, 2);

        this.healPoints = POTION_HEALPOINTS;

        this.state.empty = false;
    }    

    animate() {
        if (!this.state.empty) {
            this.sprite.horizontalFrameIndex = 0
        } else {
            this.sprite.horizontalFrameIndex = 1;
        }
    }
}