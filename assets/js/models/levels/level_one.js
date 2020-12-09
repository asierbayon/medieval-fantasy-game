class LevelOne extends Level {

    constructor (ctx, canvas, fps) {
        super(ctx, canvas, fps);
        this.floor = {
            first: 385,
            second: 320
        };

        this.background = new Background(this.ctx);

        this.obstacles = [
            new Fireplace(this.ctx, 350, 260, 'fireplace'),
            new Fireplace(this.ctx, 500, 390, 'fireplace_alt'),
            new Fireplace(this.ctx, 750, 390, 'torch'),
            new Fireplace(this.ctx, 770, 390, 'torch'),
            new Fireplace(this.ctx, 790, 390, 'torch'),
            new Fireplace(this.ctx, 810, 390, 'torch'),
        ];

        this.platform = [
            new Platform(this.ctx, 200, this.floor.first, 1, 2/3),
            new Platform(this.ctx, 350, this.floor.second, 0, 1/3),
            new Platform(this.ctx, 500, this.floor.first, 0, 1/3),
            new Platform(this.ctx, 750, this.floor.first, 1, 2/3),
            new Platform(this.ctx, 890, this.floor.second, 0, 1/3),
            new Platform(this.ctx, 1050, this.floor.first, 0, 1/3),
        ];

        this.player = new Player(this.ctx, 25, 422, 15, 10, 12);

        this.enemy = [
            new Wolf(this.ctx, 270, 354),
            new Bat(this.ctx, 420, 392),
            new Golem(this.ctx, 700, 410),
            new Golem(this.ctx, 800, 337),
            new Wolf(this.ctx, 900, 422),
            new Bat(this.ctx, 1200, 392),
            new Boss(this.ctx, 350, 392)
        ];

        this.health = [
            new Health(this.ctx, 20, 20),
            new Health(this.ctx, 45, 20),
            new Health(this.ctx, 70, 20)
        ];
        this.health.forEach(heart => heart.sprite.horizontalFrameIndex = 0);
    }
}