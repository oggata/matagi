//
//  Effect.js
//  Yamataikoku
//
//  Created by Fumitoshi Ogata on 01/02/16.
//  Copyright (c) 2016 http://oggata.github.io All rights reserved.
//

var Brain = cc.Node.extend({
    ctor: function(game) {
        this._super();
        this.game = game;

        this.brainCnt = 0;
    },

    init: function() {},

    update: function() {
        if(this.game.turn == "enemy"){
            this.brainCnt++;
            if(this.brainCnt>=30*5){
                var _defaultOperation = this.getDefaultOperation();
                var _defaultOperationPosX = _defaultOperation.posX;
                var _defaultOperationPosY = _defaultOperation.posY;
                var _enemyOperation = this.getEnemyOperation();
                var _enemyOperationPosX = _enemyOperation.posX;
                var _enemyOperationPosY = _enemyOperation.posY; 
                _defaultOperation.posX = _enemyOperationPosX;
                _defaultOperation.posY = _enemyOperationPosY;
                _enemyOperation.posX = _defaultOperationPosX;
                _enemyOperation.posY = _defaultOperationPosY;
                _enemyOperation.isMix = true;
                this.game.turn = "player";
                this.brainCnt = 0;
            }
        }else{
            this.brainCnt = 0;
        }
        return true;
    },




    getTankCurrentOperation: function() {
        var operations = [];
        for (var i = 0; i < this.game.operations.length; i++) {
            for (var t = 0; t < this.game.tanks.length; t++) {
                if(this.game.tanks[t].tankId == 2){
                    /*
                    //cc.log(this.game.tanks[t].currentPositionX + "|" + this.game.tanks[t].currentPositionY);
                    if (
                        this.game.operations[i].posX == this.game.tanks[t].currentPositionX && 
                        this.game.operations[i].posY == this.game.tanks[t].currentPositionY
                    ) {
                        //operations.push(this.game.operations[i]);
                    }
                    */
                }
            }
        }
        operations.sort(this.shuffle);
        operations.sort(this.shuffle);
        operations.sort(this.shuffle);
        return operations;
    },


    getEnemyOperation:function(){
        var operations = this.getTankCurrentOperation();
        return operations[0];
    },

    getDefaultOperation:function(){
        var operations = this.getOperationsByMarkerType("default");
        return operations[0];
    },

    getTankCurrentOperation: function() {
        var operations = [];
        for (var i = 0; i < this.game.operations.length; i++) {
            for (var t = 0; t < this.game.tanks.length; t++) {
                if(this.game.tanks[t].tankId == 2){
                    //cc.log(this.game.tanks[t]);
                    cc.log(this.game.tanks[t].currentPositionX + "|" + this.game.tanks[t].currentPositionY);
                    if (
                        this.game.operations[i].posX == this.game.tanks[t].currentPositionX && 
                        this.game.operations[i].posY == this.game.tanks[t].currentPositionY
                    ) {
                        operations.push(this.game.operations[i]);
                    }
                }
            }
        }
        operations.sort(this.shuffle);
        operations.sort(this.shuffle);
        operations.sort(this.shuffle);
        return operations;
    },

    getOperationsByMarkerType: function(markerType) {
        var operations = [];
        for (var i = 0; i < this.game.markers.length; i++) {
            if(this.game.markers[i].markerType == markerType){
                for (var j = 0; j < this.game.operations.length; j++) {
                    if (
                        this.game.operations[j].posX == this.game.markers[i].posX && 
                        this.game.operations[j].posY == this.game.markers[i].posY
                    ) {
                        operations.push(this.game.operations[j]);
                    }
                }
            }
        }
        operations.sort(this.shuffle);
        operations.sort(this.shuffle);
        operations.sort(this.shuffle);
        return operations;
    },

    shuffle: function() {
        return Math.random() - .5;
    },

});