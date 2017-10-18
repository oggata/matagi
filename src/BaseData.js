var BaseData = cc.Class.extend(
{
    ctor : function () 
    {
        this.baseData = [];
        this.baseWidth = 148;
        this.baseHeight = 149;
        this.baseTopHeight = 90;
        this.blockPosY = 650 + 160;
    },

    shuffle: function() {
        return Math.random() - .5;
    },

    getBasedata: function() {
        var baseObj = {
            x: 1,
            y: 1,
            posX: 320 + this.baseWidth / 2 * 0,
            posY: this.blockPosY - this.baseTopHeight / 2 * 0,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 2,
            y: 1,
            posX: 320 + this.baseWidth / 2 * 1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 1,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 3,
            y: 1,
            posX: 320 + this.baseWidth / 2 * 2,
            posY: this.blockPosY - this.baseTopHeight / 2 * 2,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 4,
            y: 1,
            posX: 320 + this.baseWidth / 2 * 3,
            posY: this.blockPosY - this.baseTopHeight / 2 * 3,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 5,
            y: 1,
            posX: 320 + this.baseWidth / 2 * 4,
            posY: this.blockPosY - this.baseTopHeight / 2 * 4,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 6,
            y: 1,
            posX: 320 + this.baseWidth / 2 * 5,
            posY: this.blockPosY - this.baseTopHeight / 2 * 5,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 7,
            y: 1,
            posX: 320 + this.baseWidth / 2 * 6,
            posY: this.blockPosY - this.baseTopHeight / 2 * 6,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 8,
            y: 1,
            posX: 320 + this.baseWidth / 2 * 7,
            posY: this.blockPosY - this.baseTopHeight / 2 * 7,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        //

        var baseObj = {
            x: 1,
            y: 2,
            posX: 320 + this.baseWidth / 2 * -1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 1,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 2,
            y: 2,
            posX: 320 + this.baseWidth / 2 * 0,
            posY: this.blockPosY - this.baseTopHeight / 2 * 2,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 3,
            y: 2,
            posX: 320 + this.baseWidth / 2 * 1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 3,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 4,
            y: 2,
            posX: 320 + this.baseWidth / 2 * 2,
            posY: this.blockPosY - this.baseTopHeight / 2 * 4,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 5,
            y: 2,
            posX: 320 + this.baseWidth / 2 * 3,
            posY: this.blockPosY - this.baseTopHeight / 2 * 5,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 6,
            y: 2,
            posX: 320 + this.baseWidth / 2 * 4,
            posY: this.blockPosY - this.baseTopHeight / 2 * 6,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 7,
            y: 2,
            posX: 320 + this.baseWidth / 2 * 5,
            posY: this.blockPosY - this.baseTopHeight / 2 * 7,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 8,
            y: 2,
            posX: 320 + this.baseWidth / 2 * 6,
            posY: this.blockPosY - this.baseTopHeight / 2 * 8,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        //

        var baseObj = {
            x: 1,
            y: 3,
            posX: 320 + this.baseWidth / 2 * -2,
            posY: this.blockPosY - this.baseTopHeight / 2 * 2,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 2,
            y: 3,
            posX: 320 + this.baseWidth / 2 * -1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 3,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 3,
            y: 3,
            posX: 320 + this.baseWidth / 2 * 0,
            posY: this.blockPosY - this.baseTopHeight / 2 * 4,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 4,
            y: 3,
            posX: 320 + this.baseWidth / 2 * 1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 5,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 5,
            y: 3,
            posX: 320 + this.baseWidth / 2 * 2,
            posY: this.blockPosY - this.baseTopHeight / 2 * 6,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 6,
            y: 3,
            posX: 320 + this.baseWidth / 2 * 3,
            posY: this.blockPosY - this.baseTopHeight / 2 * 7,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 7,
            y: 3,
            posX: 320 + this.baseWidth / 2 * 4,
            posY: this.blockPosY - this.baseTopHeight / 2 * 8,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 8,
            y: 3,
            posX: 320 + this.baseWidth / 2 * 5,
            posY: this.blockPosY - this.baseTopHeight / 2 * 9,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        //

        var baseObj = {
            x: 1,
            y: 4,
            posX: 320 + this.baseWidth / 2 * -3,
            posY: this.blockPosY - this.baseTopHeight / 2 * 3,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 2,
            y: 4,
            posX: 320 + this.baseWidth / 2 * -2,
            posY: this.blockPosY - this.baseTopHeight / 2 * 4,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 3,
            y: 4,
            posX: 320 + this.baseWidth / 2 * -1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 5,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 4,
            y: 4,
            posX: 320 + this.baseWidth / 2 * 0,
            posY: this.blockPosY - this.baseTopHeight / 2 * 6,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 5,
            y: 4,
            posX: 320 + this.baseWidth / 2 * 1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 7,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 6,
            y: 4,
            posX: 320 + this.baseWidth / 2 * 2,
            posY: this.blockPosY - this.baseTopHeight / 2 * 8,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 7,
            y: 4,
            posX: 320 + this.baseWidth / 2 * 3,
            posY: this.blockPosY - this.baseTopHeight / 2 * 9,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);


        var baseObj = {
            x: 8,
            y: 4,
            posX: 320 + this.baseWidth / 2 * 4,
            posY: this.blockPosY - this.baseTopHeight / 2 * 10,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        //

        var baseObj = {
            x: 1,
            y: 5,
            posX: 320 + this.baseWidth / 2 * -4,
            posY: this.blockPosY - this.baseTopHeight / 2 * 4,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 2,
            y: 5,
            posX: 320 + this.baseWidth / 2 * -3,
            posY: this.blockPosY - this.baseTopHeight / 2 * 5,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 3,
            y: 5,
            posX: 320 + this.baseWidth / 2 * -2,
            posY: this.blockPosY - this.baseTopHeight / 2 * 6,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 4,
            y: 5,
            posX: 320 + this.baseWidth / 2 * -1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 7,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 5,
            y: 5,
            posX: 320 + this.baseWidth / 2 * 0,
            posY: this.blockPosY - this.baseTopHeight / 2 * 8,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 6,
            y: 5,
            posX: 320 + this.baseWidth / 2 * 1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 9,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 7,
            y: 5,
            posX: 320 + this.baseWidth / 2 * 2,
            posY: this.blockPosY - this.baseTopHeight / 2 * 10,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 8,
            y: 5,
            posX: 320 + this.baseWidth / 2 * 3,
            posY: this.blockPosY - this.baseTopHeight / 2 * 11,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        //

        var baseObj = {
            x: 1,
            y: 6,
            posX: 320 + this.baseWidth / 2 * -5,
            posY: this.blockPosY - this.baseTopHeight / 2 * 5,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 2,
            y: 6,
            posX: 320 + this.baseWidth / 2 * -4,
            posY: this.blockPosY - this.baseTopHeight / 2 * 6,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 3,
            y: 6,
            posX: 320 + this.baseWidth / 2 * -3,
            posY: this.blockPosY - this.baseTopHeight / 2 * 7,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 4,
            y: 6,
            posX: 320 + this.baseWidth / 2 * -2,
            posY: this.blockPosY - this.baseTopHeight / 2 * 8,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 5,
            y: 6,
            posX: 320 + this.baseWidth / 2 * -1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 9,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 6,
            y: 6,
            posX: 320 + this.baseWidth / 2 * 0,
            posY: this.blockPosY - this.baseTopHeight / 2 * 10,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 7,
            y: 6,
            posX: 320 + this.baseWidth / 2 * 1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 11,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 8,
            y: 6,
            posX: 320 + this.baseWidth / 2 * 2,
            posY: this.blockPosY - this.baseTopHeight / 2 * 12,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        //
        var baseObj = {
            x: 1,
            y: 7,
            posX: 320 + this.baseWidth / 2 * -6,
            posY: this.blockPosY - this.baseTopHeight / 2 * 6,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 2,
            y: 7,
            posX: 320 + this.baseWidth / 2 * -5,
            posY: this.blockPosY - this.baseTopHeight / 2 * 7,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 3,
            y: 7,
            posX: 320 + this.baseWidth / 2 * -4,
            posY: this.blockPosY - this.baseTopHeight / 2 * 8,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 4,
            y: 7,
            posX: 320 + this.baseWidth / 2 * -3,
            posY: this.blockPosY - this.baseTopHeight / 2 * 9,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 5,
            y: 7,
            posX: 320 + this.baseWidth / 2 * -2,
            posY: this.blockPosY - this.baseTopHeight / 2 * 10,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 6,
            y: 7,
            posX: 320 + this.baseWidth / 2 * -1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 11,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 7,
            y: 7,
            posX: 320 + this.baseWidth / 2 * 0,
            posY: this.blockPosY - this.baseTopHeight / 2 * 12,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 8,
            y: 7,
            posX: 320 + this.baseWidth / 2 * 1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 13,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        //
        var baseObj = {
            x: 1,
            y: 8,
            posX: 320 + this.baseWidth / 2 * -7,
            posY: this.blockPosY - this.baseTopHeight / 2 * 7,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 2,
            y: 8,
            posX: 320 + this.baseWidth / 2 * -6,
            posY: this.blockPosY - this.baseTopHeight / 2 * 8,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 3,
            y: 8,
            posX: 320 + this.baseWidth / 2 * -5,
            posY: this.blockPosY - this.baseTopHeight / 2 * 9,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 4,
            y: 8,
            posX: 320 + this.baseWidth / 2 * -4,
            posY: this.blockPosY - this.baseTopHeight / 2 * 10,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 5,
            y: 8,
            posX: 320 + this.baseWidth / 2 * -3,
            posY: this.blockPosY - this.baseTopHeight / 2 * 11,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 6,
            y: 8,
            posX: 320 + this.baseWidth / 2 * -2,
            posY: this.blockPosY - this.baseTopHeight / 2 * 12,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 7,
            y: 8,
            posX: 320 + this.baseWidth / 2 * -1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 13,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 8,
            y: 8,
            posX: 320 + this.baseWidth / 2 * 0,
            posY: this.blockPosY - this.baseTopHeight / 2 * 14,
            img: 'res/test2.png'
        };
        this.baseData.push(baseObj);



//      this.baseData.sort(this.shuffle);
/*
        for (var i = 0; i < 5; i++) {
            this.baseData.splice(i,1);
        }
*/

        return this.baseData;
    }
});