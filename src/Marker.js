//
//  Marker.js
//
//  Created by Fumitoshi Ogata on 10/10/15.
//  Copyright (c) 2015 http://oggata.github.io All rights reserved.
//

var Marker = cc.Node.extend(
{
    ctor : function (game) 
    {
        this._super();
        this.game = game;


        //this.randId = this.game.getRandNumberFromRange(1,999999999);

        this.base = cc.Sprite.create("res/marker_base.png");
        this.base.setAnchorPoint(0.5, 0);
        this.addChild(this.base);

/*
        this.goalSprite = cc.Sprite.create("res/marker_red.png");
        this.goalSprite.setAnchorPoint(0.5, 0);
        this.addChild(this.goalSprite);

        this.startSprite = cc.Sprite.create("res/marker_blue.png");
        this.startSprite.setAnchorPoint(0.5, 0);
        this.addChild(this.startSprite);

        this.holeSprite = cc.Sprite.create("res/marker_green.png");
        this.holeSprite.setAnchorPoint(0.5, 0);
        this.addChild(this.holeSprite);

        this.mountainSprite = cc.Sprite.create("res/marker_mountainSprite.png");
        this.mountainSprite.setAnchorPoint(0.5, 0);
        this.addChild(this.mountainSprite);

*/
        this.markerType = "default";
/*
        this.rectBase = cc.LayerColor.create(new cc.Color(0,255,0,255),80,80);
        this.rectBase.setPosition(0,0);
        this.addChild(this.rectBase);
*/
    },
    init : function () { },

    changeMarkerType : function () {
        /*
        var _rand = this.game.getRandNumberFromRange(1,4);
        if(_rand == 1){
            this.markerType = "hole";
        }else if(_rand == 2){
            this.markerType = "mountain";
        }else if(_rand == 3){
            this.markerType = "default";
        }
        */
    },

    update : function () 
    {
        /*
        if(this.markerType == "default"){
            this.base.setVisible(true);
            this.goalSprite.setVisible(false);
            this.startSprite.setVisible(false);
            this.holeSprite.setVisible(false);
            this.mountainSprite.setVisible(false);
        }else if(this.markerType == "goalSprite"){
            this.base.setVisible(false);
            this.goalSprite.setVisible(true);
            this.startSprite.setVisible(false);
            this.holeSprite.setVisible(false);
            this.mountainSprite.setVisible(false);
        }else if(this.markerType == "startSprite"){
            this.base.setVisible(false);
            this.goalSprite.setVisible(false);
            this.startSprite.setVisible(true);
            this.holeSprite.setVisible(false);
            this.mountainSprite.setVisible(false);
        }else if(this.markerType == "hole"){
            this.base.setVisible(false);
            this.goalSprite.setVisible(false);
            this.startSprite.setVisible(false);
            this.holeSprite.setVisible(true);
            this.mountainSprite.setVisible(false);
        }else if(this.markerType == "mountain"){
            this.base.setVisible(false);
            this.goalSprite.setVisible(false);
            this.startSprite.setVisible(false);
            this.holeSprite.setVisible(false);
            this.mountainSprite.setVisible(true);
        }
        */
        return true;
    },
});