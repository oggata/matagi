//
//  Marker.js
//
//  Created by Fumitoshi Ogata on 10/10/15.
//  Copyright (c) 2015 http://oggata.github.io All rights reserved.
//

var Operation = cc.Node.extend(
{
    ctor : function (game,operationId) 
    {
        this._super();
        this.game = game;

        this.isMix = false;
        this.mixCnt = 0;
        this.mixRoopCnt = 0;
        this.mixOperationId = 1;
        this.nextOperationId = 1;

        this.operationId = operationId;
        this.operation001 = cc.Sprite.create("res/marker_base.png");
        this.operation001.setAnchorPoint(0.5, 0);
        this.addChild(this.operation001, 999999);

        this.operation002 = cc.Sprite.create("res/marker_sand.png");
        this.operation002.setAnchorPoint(0.5, 0);
        this.addChild(this.operation002, 999999);

        this.operation003 = cc.Sprite.create("res/marker_water.png");
        this.operation003.setAnchorPoint(0.5, 0);
        this.addChild(this.operation003, 999999);

        this.operation004 = cc.Sprite.create("res/marker_stone.png");
        this.operation004.setAnchorPoint(0.5, 0);
        this.addChild(this.operation004, 999999);

        this.operation005 = cc.Sprite.create("res/marker_mountain.png");
        this.operation005.setAnchorPoint(0.5, 0);
        this.addChild(this.operation005, 999999);

        this.operation006 = cc.Sprite.create("res/marker_base.png");
        this.operation006.setAnchorPoint(0.5, 0);
        this.addChild(this.operation006, 999999);

        this.operation007 = cc.Sprite.create("res/marker_base.png");
        this.operation007.setAnchorPoint(0.5, 0);
        this.addChild(this.operation007, 999999);

        this.operation008 = cc.Sprite.create("res/marker_base.png");
        this.operation008.setAnchorPoint(0.5, 0);
        this.addChild(this.operation008, 999999);

        this.operation009 = cc.Sprite.create("res/marker_base.png");
        this.operation009.setAnchorPoint(0.5, 0);
        this.addChild(this.operation009, 999999);

        this.isRemove = false;
        this.isLevelUp = false;
        this.imgScale = 0.5;
        this.startCnt = 0;
    },
    init : function () { },

    update : function () 
    {
        /*
        if(this.isMix == true){
            this.mixCnt+=1;
            if(this.mixCnt>=2){
                this.mixCnt = 0;
                this.mixRoopCnt+=1;
                this.mixOperationId+=1;
                if(this.mixOperationId >= 6){
                    this.mixOperationId = 1;
                }
                this.operationId = this.mixOperationId;
                if(this.mixRoopCnt >= 10){
                    this.isMix = false;
                    this.mixCnt = 0;
                    this.mixRoopCnt = 0;
                    this.nextOperationId = this.game.getRandNumberFromRange(1,5);
                    this.operationId = this.nextOperationId;
                }
            }
        }
        */

        this.operation001.setVisible(false);
        this.operation002.setVisible(false);
        this.operation003.setVisible(false);
        this.operation004.setVisible(false);
        this.operation005.setVisible(false);
        this.operation006.setVisible(false);
        this.operation007.setVisible(false);
        this.operation008.setVisible(false);
        this.operation009.setVisible(false);

        if(this.operationId == 0){

        }else if(this.operationId == 1){
            this.operation001.setVisible(true);
        }else if(this.operationId == 2){
            this.operation002.setVisible(true);
        }else if(this.operationId == 3){
            this.operation003.setVisible(true);
        }else if(this.operationId == 4){
            this.operation004.setVisible(true);
        }else if(this.operationId == 5){
            this.operation005.setVisible(true);
        }else if(this.operationId == 6){
            this.operation006.setVisible(true);
        }else if(this.operationId == 7){
            this.operation007.setVisible(true);
        }else if(this.operationId == 8){
            this.operation008.setVisible(true);
        }else if(this.operationId == 9){
            this.operation009.setVisible(true);
        }

        this.moveMarkerPosition();

        return true;
    },

    moveMarkerPosition: function() {
        //for (var i = 0; i < this.operations.length; i++) {
            var pos = this.game.getBasePosition(this.posX, this.posY);
            var _movePosX = pos[0];
            var _movePosY = pos[1];

            var _currentPosX = this.getPosition().x;
            var _currentPosY = this.getPosition().y;

            var mvPosX = _currentPosX;
            var mvPosY = _currentPosY;

            this.markerSpeed = 30;

            if (_currentPosX < _movePosX) {
                mvPosX = _currentPosX + 1;
            }
            if (_currentPosX > _movePosX) {
                mvPosX = _currentPosX - 1;
            }
            if (_currentPosY < _movePosY) {
                mvPosY = _currentPosY + 1;
            }
            if (_currentPosY > _movePosY) {
                mvPosY = _currentPosY - 1;
            }

            var _dist = Math.sqrt((_movePosX - _currentPosX) * (_movePosX - _currentPosX) + (_movePosY - _currentPosY) * (_movePosY - _currentPosY));
            if (_dist <= 30) {
                
                this.setPosition(
                    _movePosX, _movePosY
                );
                
            } else {
                var dX = _movePosX - _currentPosX;
                var dY = _movePosY - _currentPosY;
                var rad = Math.atan2(dX, dY);
                var speedX = this.markerSpeed * Math.sin(rad);
                var speedY = this.markerSpeed * Math.cos(rad);
                this.setPosition(
                    this.getPosition().x + speedX,
                    this.getPosition().y + speedY
                );
            }
        //}
    },

});