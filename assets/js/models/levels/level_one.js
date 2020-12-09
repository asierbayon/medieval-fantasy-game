class LevelOne extends Level {

    constructor (ctx, canvas, fps) {
        super(ctx, canvas, fps);

        this.background = new Background(this.ctx);

        this.obstacles = [
            new Fireplace(this.ctx, 350, 308, 'fireplace'),
            new Fireplace(this.ctx, 500, 390, 'fireplace_alt'),
            new Fireplace(this.ctx, 750, 390, 'torch'),
        ];

        this.platform = [
            new Platform(this.ctx, 200, 400, 0, 1/3),
            new Platform(this.ctx, 290, 370, 1, 2/3),
            new Platform(this.ctx, 500, 400, 0, 1/3),
            new Platform(this.ctx, 750, 400, 1, 2/3),
            new Platform(this.ctx, 890, 380, 0, 1/3),
        ];

        this.player = new Player(this.ctx, 25, 422, 15, 10, 12);

        this.enemy = [
            // new Bat(this.ctx, 310, 310),
            new Wolf(this.ctx, 320, 340),
            new Bat(this.ctx, 420, 392),
            new Golem(this.ctx, 700, 410),
            new Wolf(this.ctx, 1000, 422),
            new Bat(this.ctx, 1200, 392)
        ];

        this.health = [
            new Health(this.ctx, 20, 20),
            new Health(this.ctx, 45, 20),
            new Health(this.ctx, 70, 20)
        ];
        this.health.forEach(heart => heart.sprite.horizontalFrameIndex = 0);
    }
}