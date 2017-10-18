//
//  Animal.js
//  Yagidan
//
//  Created by Fumitoshi Ogata on 10/10/15.
//  Copyright (c) 2015 http://oggata.github.io All rights reserved.
//

var Enemy = cc.Node.extend({
    ctor: function(game, posX, posY) {
        this._super();
        this.game = game;
        this.hp = 100;
        this.deadCnt = 0;
        this.posX = posX;
        this.posY = posY;
        this.destinationX = this.posX;
        this.destinationY = this.posX;
        this.formerPositionX = this.posX;
        this.formerPositionY = this.posY;
        this.minDistOperation = null;
        this.tankScale = 0.55;
        this.direction = "";


this.maxPositioningCnt = 1;
this.tankScale = 0.7;
        this.marginY = 70;

        var pos = this.game.getBaseHumanPosition(this.destinationX, this.destinationY);
        var dX = pos[0] - this.getPosition().x;
        var dY = pos[1] + this.marginY - this.getPosition().y;
        //var dY = pos[1] + 160 - this.getPosition().y;
        this.setPosition(dX, dY);

        this.image = "res/zombie-A-green.png";
        this.imgWidth = 160;
        this.imgHeight = 160;
        this.spriteWidthCnt = 4;

        this.initializeWalkAnimation();

        this.speed = 5;
        this.launchTime = 0;
        this.rotateCnt = 0;
        this.startCnt = 0;

        this.operation = null;

        this.brain = new Brain(this.game);

        this.positioningCnt = 0;

/*
        this.rotateLabel = new cc.LabelTTF("", "Arial", 60);
        this.rotateLabel.setFontFillColor(new cc.Color(0, 0, 0, 255));
        this.rotateLabel.setAnchorPoint(1, 0);
        //this.rotateLabel.setPosition(250, 960);
        this.addChild(this.rotateLabel, 5);
*/
        //this.marginY = 140;
        this.mostNearMarker = null;


        this.isHoleCnt = 0;

        this.lastPositionY = this.getPosition().y;
    },

    init: function() {},

    setOperation:function(operation) {
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
            if (_dist <= 3) {
                this.posX = this.destinationX;
                this.posY = this.destinationY;
                this.formerPositionX = this.posX;
                this.formerPositionY = this.posY;
                /*
                for (var i = 0; i < this.game.markers.length; i++) {
                    if (this.game.markers[i].baseData.x == this.posX && this.game.markers[i].baseData.y == this.posY) {
                    }
                }
                */
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
            }
        }
        for (var i = 0; i < this.game.operations.length; i++) {
            if (this.game.operations[i].posX == this.posX && this.game.operations[i].posY == this.posY) {
                _operation = this.game.operations[i];
            }
        }
        return {
            marker : _marker,
            operation : _operation
        }
    },

    getMobableOperation:function(){
        var _tmpOperations = null;
        for (var i = 0; i < this.game.operations.length; i++) {
            /*
            var _targetOperation = this.game.operations[i];
            if (_targetMarker.baseData.x == posX && _targetMarker.baseData.y == posY) {
                _isExistMarker = true;
            }
            */

            if(this.game.operations[i].operationId == 5){
            }else{
                _tmpOperations.push(this.game.operations[i]);
            }
        }

        _tmpOperations.sort(this.game.shuffle);
        return _tmpOperations[0];
    },

    isSetMarker:function(posX,posY){
        var _isExistMarker = false;
        /*
        for (var i = 0; i < this.game.markers.length; i++) {
            var _targetMarker = this.game.markers[i];
            if (_targetMarker.baseData.x == posX && _targetMarker.baseData.y == posY) {
                _isExistMarker = true;
            }
        }
        */
        for (var i = 0; i < this.game.operations.length; i++) {
            if(this.game.operations[i].operationId == 5){}else{
                var _targetOperation = this.game.operations[i];
                if (_targetOperation.posX == posX && _targetOperation.posY == posY) {
                    _isExistMarker = true;
                }
            }
        }

        //return _isExistMarker;
        if(_isExistMarker == false){
            return false;
        }

        //他のenemyオブジェクトがいないかチェック
        for (var t = 0; t < this.game.enemies.length; t++) {
            if (this.game.enemies[t].posX == posX && this.game.enemies[t].posY == posY) {
                return false;
            }
            if (this.game.enemies[t].formerPositionX == posX && this.game.enemies[t].formerPositionY == posY) {
                return false;
            }
            if (this.game.enemies[t].destinationX == posX && this.game.enemies[t].destinationY == posY) {
                return false;
            }
        }

        //startとgoalにもかぶってはダメ

        return true;
    },

    setNextPosition:function(){
        this.positioningCnt++;
        if(this.positioningCnt >= 30 * this.maxPositioningCnt){
            var _operationId = this.game.getRandNumberFromRange(1,5);
            //右下
            if(_operationId == 1){
                if(this.isSetMarker(this.posX + 1,this.posY + 0)){
                    this.moveToRightDown();
                    this.destinationX = this.posX + 1;
                    this.destinationY = this.posY + 0;
                    this.positioningCnt = 0;
                }
            }
            //左下
            if(_operationId == 2){
                if(this.isSetMarker(this.posX + 0,this.posY + 1)){
                    this.moveToLeftDown();
                    this.destinationX = this.posX + 0;
                    this.destinationY = this.posY + 1;
                    this.positioningCnt = 0;
                }
            }
            //左上
            if(_operationId == 3){
                if(this.isSetMarker(this.posX - 1,this.posY + 0)){
                    this.moveToLeftUp();
                    this.destinationX = this.posX - 1;
                    this.destinationY = this.posY + 0;
                    this.positioningCnt = 0;
                }
            }
            //右上
            if(_operationId == 4){
                if(this.isSetMarker(this.posX + 0,this.posY - 1)){
                    this.moveToRightUp();
                    this.destinationX = this.posX + 0;
                    this.destinationY = this.posY - 1;
                    this.positioningCnt = 0;
                }
            }
        }
    },

    update: function() {
        this.move();
        //var _data = this.getMarkerAndOperation();

        this.setNextPosition();


        if (this.isHoleCnt >= 1) {
            if(this.isHoleCnt == 2){
                this.lastPositionY = this.getPosition().y;
            }
            this.isHoleCnt++;
            this.setPosition(this.getPosition().x, this.getPosition().y - this.isHoleCnt * 2);
            if (this.isHoleCnt >= 30 * 1) {
                this.hp = 0;
            }
        }else{
            this.lastPositionY = this.getPosition().y;
        }


        /*
        //右下
        if(_data.operation.operationId == 1){
            if(this.isSetMarker(this.posX + 1,this.posY + 0)){
                this.moveToRightDown();
                this.destinationX = this.posX + 1;
                this.destinationY = this.posY + 0;
            }
        }
        //左下
        if(_data.operation.operationId == 2){
            if(this.isSetMarker(this.posX + 0,this.posY + 1)){
                this.moveToLeftDown();
                this.destinationX = this.posX + 0;
                this.destinationY = this.posY + 1;
            }
        }
        //左上
        if(_data.operation.operationId == 3){
            if(this.isSetMarker(this.posX - 1,this.posY + 0)){
                this.moveToLeftUp();
                this.destinationX = this.posX - 1;
                this.destinationY = this.posY + 0;
            }
        }
        //右上
        if(_data.operation.operationId == 4){
            if(this.isSetMarker(this.posX + 0,this.posY - 1)){
                this.moveToRightUp();
                this.destinationX = this.posX + 0;
                this.destinationY = this.posY - 1;
            }
        }
        */
        if (this.hp <= 0) {
            return false;
        }

        return true;
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
        this.wa = cc.Animation.create(frameSeq, 0.2);
        this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
        this.sprite = cc.Sprite.create(this.image, cc.rect(0, 0, this.imgWidth, this.imgHeight));
        this.sprite.runAction(this.ra);
        this.addChild(this.sprite);
        this.sprite.setScale(this.tankScale, this.tankScale);

        this.sprite.setAnchorPoint(0.5, 0);
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
            this.wa = cc.Animation.create(frameSeq, 0.2);
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
            this.wa = cc.Animation.create(frameSeq, 0.2);
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
            this.wa = cc.Animation.create(frameSeq, 0.2);
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
            this.wa = cc.Animation.create(frameSeq, 0.2);
            this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
            this.sprite.runAction(this.ra);
        }
    },
});