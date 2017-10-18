var Effect = cc.Node.extend({
    ctor: function(game) {
        this._super();
        this.game = game;
        this.image = "res/pipo-btleffect109e.png";
        this.itemWidth = 120;
        this.itemHeight = 120;
        this.widthCount = 5;
        this.heightCount = 3;
        this.effectInterval = 0.05;
        this.initializeWalkAnimation();
        this.effectTime = 0;
    },

    init: function() {},

    update: function() {
        return true;
    },

    initializeWalkAnimation: function() {
        var frameSeq = [];
        for (var i = 1; i < this.heightCount; i++) {
            for (var j = 0; j < this.widthCount; j++) {
                var frame = cc.SpriteFrame.create(this.image, cc.rect(this.itemWidth * j, this.itemHeight * i,this.itemWidth, this.itemHeight));
                frameSeq.push(frame);
            }
        }
        this.wa = cc.Animation.create(frameSeq, this.effectInterval);
        this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
        this.sprite = cc.Sprite.create(this.image, cc.rect(0, 0, this.itemWidth, this.itemHeight));
        this.sprite.runAction(this.ra);
        this.addChild(this.sprite);
    },
});