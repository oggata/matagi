//
//  Animal.js
//  Yagidan
//
//  Created by Fumitoshi Ogata on 10/10/15.
//  Copyright (c) 2015 http://oggata.github.io All rights reserved.
//

var Bullet = cc.Node.extend(
{
    ctor : function (game,launchTank) 
    {
        this._super();
        this.game = game;
        this.direction = launchTank.direction;
        this.tankId = launchTank.tankId;
        this.effect = new Effect(this.game);
        this.effect.setScale(0.5,0.5);
        this.addChild(this.effect);
        this.launchObject = null;
        this.effectTime = 0;
    },
    init : function () { },

    update : function () 
    {
        this.effectTime++;
        if(this.effectTime >= 30){
            return false;
        }
        if(0 <= this.effectTime && this.effectTime < 8){
            this.effect.setVisible(false);
        }else if(8 <= this.effectTime && this.effectTime < 20){
            this.effect.setVisible(true);
        }

        if(this.direction == "moveToRightDown"){
            this.setPosition(
                this.getPosition().x + this.game.baseWidth/30 ,
                this.getPosition().y - this.game.baseTopHeight/30
            );
        }
        if(this.direction == "moveToLeftDown"){
            this.setPosition(
                this.getPosition().x - this.game.baseWidth/30 ,
                this.getPosition().y - this.game.baseTopHeight/30
            );
        }
        if(this.direction == "moveToLeftUp"){
            this.setPosition(
                this.getPosition().x - this.game.baseWidth/30 ,
                this.getPosition().y + this.game.baseTopHeight/30
            );
        }
        if(this.direction == "moveToRightUp"){
            this.setPosition(
                this.getPosition().x + this.game.baseWidth/30 ,
                this.getPosition().y + this.game.baseTopHeight/30
            );
        }
        return true;
    },
    remove : function () 
    {
        this.removeChild(this.sprite);
    },
    getDirection : function ()
    {
        return this.direction;
    },
});