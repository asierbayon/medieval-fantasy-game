class LevelTwo extends Level {

    constructor (ctx, canvas, fps, lvlNumber) {
        super(ctx, canvas, fps, lvlNumber);

        this.isTheLastLevel = false;
        
        this.floor = {
            first: 385,
            second: 320,
            third: 275
        };

        this.background = new Background(this.ctx, 'assets/img/lvl2_bg.png');

        this.potion = [
            new Potion(this.ctx, 470, 250),
            new Potion(this.ctx, 910, 294),
            new Potion(this.ctx, 1030, 358)
        ];

        this.fireplace = [
            new Fireplace(this.ctx, 350, 260, 'fireplace'),
            new Fireplace(this.ctx, 500, 390, 'fireplace_alt'),
            new Fireplace(this.ctx, 550, 390, 'fireplace_alt'),
            new Fireplace(this.ctx, 750, 390, 'torch'),
            new Fireplace(this.ctx, 770, 390, 'torch'),
            new Fireplace(this.ctx, 790, 390, 'torch'),
            new Fireplace(this.ctx, 810, 390, 'torch'),
        ];

        this.platform = [
            new Platform(this.ctx, 250, this.floor.first, 0, 1/3),
            new Platform(this.ctx, 350, this.floor.second, 0, 1/3),
            new Platform(this.ctx, 450, this.floor.third, 0, 1/3),
            new Platform(this.ctx, 600, this.floor.first, 1, 2/3),
            new Platform(this.ctx, 890, this.floor.second, 0, 1/3),
            new Platform(this.ctx, 1000, this.floor.first, 1, 2/3),
        ];

        this.player = new Player(this.ctx, 25, 422, 15, 10, 12);

        this.enemy = [
            new Wolf(this.ctx, 270, 354),
            new Bat(this.ctx, 350, 392),
            new Bat(this.ctx, 380, 392),
            new Bat(this.ctx, 410, 392),
            new Bat(this.ctx, 440, 392),
            new Golem(this.ctx, 620, 337),
            new Wolf(this.ctx, 900, 422),
            new Bat(this.ctx, 1200, 392),
            new Boss(this.ctx, 1350, 392)
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