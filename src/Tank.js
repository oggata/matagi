//
//  Animal.js
//  Yagidan
//
//  Created by Fumitoshi Ogata on 10/10/15.
//  Copyright (c) 2015 http://oggata.github.io All rights reserved.
//

var Tank = cc.Node.extend({
    ctor: function(game, posX, posY) {
        this._super();
        this.game = game;
        this.hp = 100;
        this.deadCnt = 0;
        this.posX = posX;
        this.posY = posY;
        this.destinationX = this.posX;
        this.destinationY = this.posY;
        this.formerPositionX = this.posX;
        this.formerPositionY = this.posY;
        this.minDistOperation = null;
        this.tankScale = 0.55;
        this.direction = "";
        this.marginY = 70;

        var pos = this.game.getBaseHumanPosition(this.destinationX, this.destinationY);
        var dX = pos[0] - this.getPosition().x;
        var dY = pos[1] + this.marginY - this.getPosition().y;
        this.setPosition(dX, dY);

        var _imageId = this.game.getRandNumberFromRange(1, 3);
        this.image = "res/jk-001.png";
        if (_imageId == 1) {
            this.image = "res/jk-002.png";
        }

        this.imgWidth = 160;
        this.imgHeight = 160;
        this.spriteWidthCnt = 7;


this.image = "res/zombie-A-green.png";
this.imgWidth = 160;
this.imgHeight = 160;
this.spriteWidthCnt = 4;
this.tankScale = 0.7;

        this.tankScale = 0.7;

        this.initializeWalkAnimation();

        this.speed = 5;
        this.launchTime = 0;
        this.rotateCnt = 0;
        this.startCnt = 0;
        this.operation = null;
        this.isGoalCnt = 0;
        this.isHoleCnt = 0;

        this.drawDeepNum = 0;
        /*
                this.rectBase = cc.LayerColor.create(new cc.Color(255,0,0,255),80,80);
                this.rectBase.setPosition(0,0);
                this.addChild(this.rectBase);
        */

        this.mostNearMarker = null;


        this.isCollistion = false;
    },
    init: function() {},
    setOperation: function(operation) {
        //operations
        this.operation = operation;
    },

    move: function() {
        //if (this.deadCnt >= 1) return;
        //tankを動かす
        if (this.destinationX >= 1 && this.destinationY >= 1) {
            var pos = this.game.getBaseHumanPosition(this.destinationX, this.destinationY);
            var dX = pos[0] - this.getPosition().x;
            var dY = pos[1] + this.marginY - this.getPosition().y;
            var rad = Math.atan2(dX, dY);
            var speedX = this.speed * Math.sin(rad);
            var speedY = this.speed * Math.cos(rad);
            var _dist = Math.sqrt((dX * dX) + (dY * dY));
            if (_dist <= 5) {
                this.posX = this.destinationX;
                this.posY = this.destinationY;
                this.formerPositionX = this.posX;
                this.formerPositionY = this.posY;
            } else {
                this.setPosition(
                    this.getPosition().x + speedX,
                    this.getPosition().y + speedY
                );
            }
        }
    },

    getMarkerAndOperation: function() {
        var _marker = null;
        var _operation = null;
        for (var i = 0; i < this.game.markers.length; i++) {
            if (this.game.markers[i].posX == this.posX && this.game.markers[i].posY == this.posY) {
                _marker = this.game.markers[i];
                //cc.log("playerx:" + this.getPosition().x + "y:" + Math.ceil(this.getPosition().y - this.marginY)
                //    + "markerx:" + this.game.markers[i].getPosition().x + "markery:" + this.game.markers[i].getPosition().y);
            }
        }
        for (var i = 0; i < this.game.operations.length; i++) {
            if (this.game.operations[i].posX == this.posX && this.game.operations[i].posY == this.posY) {
                _operation = this.game.operations[i];
            }
        }
        return {
            marker: _marker,
            operation: _operation
        }
    },

    isSetMarker: function(posX, posY) {
        //マーカーに移動可能か確認する
        var _isExistMarker = false;
        for (var i = 0; i < this.game.markers.length; i++) {
            if(this.game.markers[i].markerType == "default" || this.game.markers[i].markerType == "hole" || this.game.markers[i].markerType == "start" || this.game.markers[i].markerType == "goal"){
                var _targetMarker = this.game.markers[i];
                if (_targetMarker.baseData.x == posX && _targetMarker.baseData.y == posY) {
                    _isExistMarker = true;
                }
            }   
        }
        //return _isExistMarker;
        if (_isExistMarker == false) {
            return false;
        }
        /*
                //他のオブジェクトがいないかチェック
                for (var t = 0; t < this.game.tanks.length; t++) {
                    if (this.game.tanks[t].posX == posX && this.game.tanks[t].posY == posY) {
                        return false;
                    }
                    if (this.game.tanks[t].formerPositionX == posX && this.game.tanks[t].formerPositionY == posY) {
                        return false;
                    }
                    if (this.game.tanks[t].destinationX == posX && this.game.tanks[t].destinationY == posY) {
                        return false;
                    }
                }
        */
        return true;
    },

    update: function() {


        /*
                if(this.isGoalCnt >= 1){
                    this.isGoalCnt++;
                    this.setPosition(this.getPosition().x,this.getPosition().y + this.isGoalCnt);
                    if(this.isGoalCnt >= 30 * 1){
                        this.hp = 0;
                    }
                }
        */
        if (this.isHoleCnt >= 1) {
            this.isHoleCnt++;
            this.setPosition(this.getPosition().x, this.getPosition().y - this.isHoleCnt * 2);
            if (this.isHoleCnt >= 30 * 1) {
                this.hp = 0;
            }
        }

cc.log(this.isCollistion);
//if(this.isCollistion == false){
        this.move();
//}




/*
        var _data = this.getMarkerAndOperation();
        if (_data.operation) {
            //右下
            if (_data.operation.operationId == 1) {
                if (this.isSetMarker(this.posX + 1, this.posY + 0)) {
                    this.moveToRightDown();
                    this.destinationX = this.posX + 1;
                    this.destinationY = this.posY + 0;
                }
            }
            //左下
            if (_data.operation.operationId == 2) {
                if (this.isSetMarker(this.posX + 0, this.posY + 1)) {
                    this.moveToLeftDown();
                    this.destinationX = this.posX + 0;
                    this.destinationY = this.posY + 1;
                }
            }
            //左上
            if (_data.operation.operationId == 3) {
                if (this.isSetMarker(this.posX - 1, this.posY + 0)) {
                    this.moveToLeftUp();
                    this.destinationX = this.posX - 1;
                    this.destinationY = this.posY + 0;
                }
            }
            //右上
            if (_data.operation.operationId == 4) {
                if (this.isSetMarker(this.posX + 0, this.posY - 1)) {
                    this.moveToRightUp();
                    this.destinationX = this.posX + 0;
                    this.destinationY = this.posY - 1;
                }
            }
            //通過する
            if (_data.operation.operationId == 5) {
                if (this.direction == "moveToRightDown") {
                    if (this.isSetMarker(this.posX + 1, this.posY + 0)) {
                        this.moveToRightDown();
                        this.destinationX = this.posX + 1;
                        this.destinationY = this.posY + 0;
                    }
                }
                if (this.direction == "moveToLeftDown") {
                    if (this.isSetMarker(this.posX + 0, this.posY + 1)) {
                        this.moveToLeftDown();
                        this.destinationX = this.posX + 0;
                        this.destinationY = this.posY + 1;
                    }
                }
                if (this.direction == "moveToLeftUp") {
                    if (this.isSetMarker(this.posX - 1, this.posY + 0)) {
                        this.moveToLeftUp();
                        this.destinationX = this.posX - 1;
                        this.destinationY = this.posY + 0;
                    }
                }
                if (this.direction == "moveToRightUp") {
                    if (this.isSetMarker(this.posX + 0, this.posY - 1)) {
                        this.moveToRightUp();
                        this.destinationX = this.posX + 0;
                        this.destinationY = this.posY - 1;
                    }
                }
            }
        }
        if (this.hp <= 0) {
            return false;
        }
*/



        return true;
    },

    debugLog: function() {
        var _data = this.getMarkerAndOperation();
        var _posDeepNum = this.posX + this.posY;
        var _destDeepNum = this.destinationX + this.destinationY;
        if (_data.marker) {
            var _markerDeepNum = _data.marker.posX + _data.marker.posY;
            cc.log("player_deep:" + _posDeepNum + "/marker_deep:" + _markerDeepNum);
        } else {
            cc.log("player_deep:" + _posDeepNum);
        }
    },

    remove: function() {
        this.removeChild(this.sprite);
    },
    getDirection: function() {
        return this.direction;
    },
    initializeWalkAnimation: function() {
        var frameSeq = [];
        for (var i = 0; i < this.spriteWidthCnt; i++) {
            var frame = cc.SpriteFrame.create(this.image, cc.rect(this.imgWidth * i, this.imgHeight * 0,
                this.imgWidth, this.imgHeight));
            frameSeq.push(frame);
        }
        this.wa = cc.Animation.create(frameSeq, 0.05);
        this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
        this.sprite = cc.Sprite.create(this.image, cc.rect(0, 0, this.imgWidth, this.imgHeight));
        this.sprite.runAction(this.ra);
        this.addChild(this.sprite);

        this.sprite.setAnchorPoint(0.5, 0);
        this.sprite.setScale(this.tankScale, this.tankScale);
    },
    moveToRightDown: function() {
        if (this.direction != "moveToRightDown") {
            this.direction = "moveToRightDown";
            this.sprite.stopAllActions();
            var frameSeq = [];
            for (var i = 0; i < this.spriteWidthCnt; i++) {
                var frame = cc.SpriteFrame.create(this.image, cc.rect(this.imgWidth * i, this.imgHeight * 0,
                    this.imgWidth, this.imgHeight));
                frameSeq.push(frame);
            }
            this.wa = cc.Animation.create(frameSeq, 0.05);
            this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
            this.sprite.runAction(this.ra);
        }
    },
    moveToLeftDown: function() {
        if (this.direction != "moveToLeftDown") {
            this.direction = "moveToLeftDown";
            this.sprite.stopAllActions();
            var frameSeq = [];
            for (var i = 0; i < this.spriteWidthCnt; i++) {
                var frame = cc.SpriteFrame.create(this.image, cc.rect(this.imgWidth * i, this.imgHeight * 1,
                    this.imgWidth, this.imgHeight));
                frameSeq.push(frame);
            }
            this.wa = cc.Animation.create(frameSeq, 0.05);
            this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
            this.sprite.runAction(this.ra);
        }
    },
    moveToLeftUp: function() {
        if (this.direction != "moveToLeftUp") {
            this.direction = "moveToLeftUp";
            this.sprite.stopAllActions();
            var frameSeq = [];
            for (var i = 0; i < this.spriteWidthCnt; i++) {
                var frame = cc.SpriteFrame.create(this.image, cc.rect(this.imgWidth * i, this.imgHeight * 2,
                    this.imgWidth, this.imgHeight));
                frameSeq.push(frame);
            }
            this.wa = cc.Animation.create(frameSeq, 0.05);
            this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
            this.sprite.runAction(this.ra);
        }
    },
    moveToRightUp: function() {
        if (this.direction != "moveToRightUp") {
            this.direction = "moveToRightUp";
            this.sprite.stopAllActions();
            var frameSeq = [];
            for (var i = 0; i < this.spriteWidthCnt; i++) {
                var frame = cc.SpriteFrame.create(this.image, cc.rect(this.imgWidth * i, this.imgHeight * 3,
                    this.imgWidth, this.imgHeight));
                frameSeq.push(frame);
            }
            this.wa = cc.Animation.create(frameSeq, 0.05);
            this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
            this.sprite.runAction(this.ra);
        }
    },
});