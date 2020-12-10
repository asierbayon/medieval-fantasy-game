class LevelThree extends Level {

    constructor (ctx, canvas, fps, lvlNumber) {
        super(ctx, canvas, fps, lvlNumber);

        this.isTheLastLevel = true;

        this.floor = {
            first: 385,
            second: 320
        };

        this.background = new Background(this.ctx, 'assets/img/lvl3_bg.png');

        this.obstacles = [
            new Fireplace(this.ctx, 390, 260, 'fireplace'),
            new Fireplace(this.ctx, 420, 260, 'fireplace_alt'),
            new Fireplace(this.ctx, 730, 320, 'torch'),
            new Fireplace(this.ctx, 760, 320, 'torch'),
            new Fireplace(this.ctx, 790, 320, 'torch'),
            new Fireplace(this.ctx, 820, 320, 'torch'),
        ];

        this.platform = [
            new Platform(this.ctx, 200, this.floor.first, 1, 2/3),
            new Platform(this.ctx, 350, this.floor.second, 1, 2/3),
            new Platform(this.ctx, 750, this.floor.first, 1, 2/3),
            new Platform(this.ctx, 890, this.floor.second, 0, 1/3),
            new Platform(this.ctx, 1050, this.floor.first, 0, 1/3),
        ];

        this.player = new Player(this.ctx, 25, 422, 15, 10, 12);

        this.enemy = [
            new Wolf(this.ctx, 270, 354),
            new Golem(this.ctx, 340, 277),
            new Wolf(this.ctx, 500, 422),
            new Bat(this.ctx, 420, 392),
            new Wolf(this.ctx, 700, 422),
            new Wolf(this.ctx, 800, 422),
            new Wolf(this.ctx, 900, 422),
            new Bat(this.ctx, 1200, 392),
            new Golem(this.ctx, 1250, 410),
            new Golem(this.ctx, 1350, 410),
            new Boss(this.ctx, 1500, 392)
        ];

        this.boss = this.enemy[this.enemy.length -1];

        this.health = [
            new Health(this.ctx, 20, 20),
            new Health(this.ctx, 45, 20),
            new Health(this.ctx, 70, 20)
        ];
        this.health.forEach(heart => heart.sprite.horizontalFrameIndex = 0);

    }

    
}