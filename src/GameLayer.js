var item001Cnt = 0;
var isCancelAd = false;
var isFailedAd = false;

var GameLayer = cc.Layer.extend({
    sprite: null,
    ctor: function(storage) {
        this._super();

        //item: 1.全滅 2.goal増える 
        this.turn = "player";

        item001Cnt = 0;
        isCancelAd = false;
        isFailedAd = false;
        this.isAdAvailable = false;

        this.storage = storage;
        //playBGM(this.storage);
        var size = cc.winSize;
        this.status = "gaming";
        this.score = 0;
        this.visibleScore = 0;
        this.operations = [];

        this.blockPosY = 650;
        this.retryCnt = 0;

        this.back = cc.Sprite.create("res/back.png");
        this.back.setAnchorPoint(0, 0);
        this.addChild(this.back);

        this.baseNode = cc.Node.create();
        this.addChild(this.baseNode);

        //baseNodeの設定
        this.baseScale = 0.8;
        this.baseNode.setScale(this.baseScale, this.baseScale);
        this.baseNodePosX = 300;
        this.baseNodePosY = -140;
        this.baseNode.setPosition(this.baseNodePosX, this.baseNodePosY);
        this.baseWidth = 148;
        this.baseHeight = 149;
        this.baseTopHeight = 90;

        //infoad
        this.infoad = cc.Sprite.create("res/info_ad.png");
        this.infoad.setPosition(320, 600);
        this.addChild(this.infoad, 99999999);
        this.infoad.setVisible(false);

        this.players = [];
        this.enemies = [];

        var okButton = new cc.MenuItemImage("res/button_watch_movie.png", "res/button_watch_movie.png", function() {
            this.status = "watch_ad";

            //gameover時に出力するadを表示
            if ('undefined' == typeof(sdkbox)) {
                cc.log('sdkbox is undefined');
                return;
            } else {
                if (sdkbox.PluginAdMob.isAvailable("gameover")) {
                    sdkbox.PluginAdMob.show("gameover");
                } else {
                    cc.log('adMob: admob interstitial ad is not ready');
                }
            }

        }, this);
        okButton.setPosition(320 - 237 / 2 - 80, -70);

        var cancelButton = new cc.MenuItemImage("res/button_watch_movie_cancel.png", "res/button_watch_movie_cancel.png", function() {
            this.status = "gameover";
            this.infoad.setVisible(false);
            this.gameover.setVisible(true);
        }, this);
        cancelButton.setPosition(320 - 237 / 2 - 80 + 240, -70);

        var menu001 = new cc.Menu(okButton, cancelButton);
        menu001.setPosition(0, 0);
        this.infoad.addChild(menu001);

        //gameover
        this.gameover = cc.Sprite.create("res/gameover.png");
        this.gameover.setPosition(320, 560);
        this.addChild(this.gameover, 99999999);
        this.gameover.setVisible(false);

        this.homeButton = new cc.MenuItemImage("res/button_watch_movie.png", "res/button_watch_movie.png", function() {
            this.goToTopLayer();
        }, this);
        this.homeButton.setPosition(500, 65);
        this.menu002 = new cc.Menu(this.homeButton);
        this.menu002.setPosition(0, 0);
        this.gameover.addChild(this.menu002, 999999999);

        //give item
        this.giveItemButton = new cc.MenuItemImage("res/info_ad2.png", "res/info_ad2.png", function() {
            this.giveItemButton.setVisible(false);
            this.mixRandMarkers();
        }, this);
        this.giveItemButton.setPosition(320, 700);
        this.giveItemButton.setVisible(false);
        this.menu003 = new cc.Menu(this.giveItemButton);
        this.menu003.setPosition(0, 0);
        this.addChild(this.menu003, 999999999);

        this.baseData = [];
        this.base = new BaseData();
        this.baseData = this.base.getBasedata();

        this.markers = [];
        for (var i = 0; i < this.baseData.length; i++) {
            this.marker = new Marker(this);
            this.marker.posX = this.baseData[i].x;
            this.marker.posY = this.baseData[i].y;
            this.marker.setPosition(
                this.baseData[i].posX,
                this.baseData[i].posY
            );
            this.marker.baseData = this.baseData[i];
            this.baseNode.addChild(this.marker);
            this.markers.push(this.marker);
        }

        //touch
        this.firstTouchX = 0;
        this.firstTouchY = 0;
        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan: function(touches, event) {
                var location = touches[0].getLocation();
                event.getCurrentTarget().touchStart(touches[0].getLocation());
            },
            onTouchesMoved: function(touches, event) {
                var location = touches[0].getLocation();
                event.getCurrentTarget().touchMove(touches[0].getLocation());
            },
            onTouchesEnded: function(touches, event) {
                event.getCurrentTarget().touchFinish(touches[0].getLocation());
            }
        }), this);

        for (var i = 0; i < this.markers.length; i++) {
            var _operationId = this.getRandNumberFromRange(1,8);
            this.addOperation(
                this.markers[i].baseData.x,
                this.markers[i].baseData.y,
                _operationId
            );
        }

        this.admobInit();
        this.scheduleUpdate();

        this.addPlayerTime = 0;
        this.setGoalTime = 30 * 5;
        this.setStartTime = 30 * 5;
        this.maxPlayerCnt = 0;
        this.maxEnemyCnt = 2;

        this.startMarkerCnt = 1;
        this.goalMarkerCnt = 0;

        this.tappedMarker = null;
        this.tmpTappedMarker = null;

        this.touchStartOperation = null;

        //this.addStartMarker();
        //this.addGoalMarker();

        /*
        this.addPlayer(1, 1);
        this.addPlayer(1, 1);
        this.addPlayer(1, 1);
        */
        return true;
    },

    addPlayer: function(posX, posY) {
        this.tank = new Tank(this, posX, posY);
        this.baseNode.addChild(this.tank, 9999999);
        this.players.push(this.tank);
    },

    addEnemy: function(posX, posY) {
        this.enemy = new Enemy(this, posX, posY);
        this.baseNode.addChild(this.enemy, 9999999);
        this.enemies.push(this.enemy);
    },

    countStartMarker: function() {
        var _cnt = 0;
        for (var i = 0; i < this.markers.length; i++) {
            if (this.markers[i].markerType == "start") {
                _cnt++;
            }
        }
        return _cnt;
    },

    getStartMarker: function() {
        this.markers.sort(this.shuffle);
        for (var i = 0; i < this.markers.length; i++) {
            if (this.markers[i].markerType == "start") {
                //すでにplayerがのっていないかcheckする
                var _isSetPlayer = false;
                for (var j = 0; j < this.players.length; j++) {
                    if (this.markers[i].posX == this.players[j].posX && this.markers[i].posY == this.players[j].posY) {
                        _isSetPlayer = true;
                    }
                }
                if (_isSetPlayer == false) {
                    return this.markers[i];
                }
            }
        }
        return null;
    },

    setStartMarker: function() {
        //1個を戻す
        this.markers.sort(this.shuffle);
        this._startMarkerCnt = 0;
        for (var i = 0; i < this.markers.length; i++) {
            if (this.markers[i].markerType == "start") {
                this._startMarkerCnt++;
                if (this.startMarkerCnt <= this._startMarkerCnt) {
                    this.markers[i].markerType = "default";
                    break;
                }
            }
        }
        var _roopCnt = this.startMarkerCnt - this.countStartMarker();
        if (_roopCnt >= 0) {
            for (var cnt = 0; cnt < _roopCnt; cnt++) {
                this.addStartMarker();
            }
        }
    },

    addStartMarker: function() {
        var _marker = this.getDefaultMarker();
        _marker.markerType = "start";
    },

    getDefaultMarker: function() {
        this.tmpOperations = [];
        for (var i = 0; i < this.operations.length; i++) {
            if (this.operations[i].operationId == 1) {
                this.tmpOperations.push(this.operations[i]);
            }
        }
        this.tmpOperations.sort(this.shuffle);
        return this.tmpOperations[0];
    },

    getCountGoalMarker: function() {
        var _goalMarkerCnt = 0;
        for (var i = 0; i < this.markers.length; i++) {
            if (this.markers[i].markerType == "goal") {
                _goalMarkerCnt++;
            }
        }
        return _goalMarkerCnt;
    },

    setGoalMarker: function() {
        //1個戻す
        this.markers.sort(this.shuffle);
        for (var i = 0; i < this.markers.length; i++) {
            if (this.markers[i].markerType == "goal") {
                this.markers[i].markerType = "default";
                break;
            }
        }
        var _roopCnt = this.goalMarkerCnt - this.getCountGoalMarker();
        if (_roopCnt >= 0) {
            for (var cnt = 0; cnt < _roopCnt; cnt++) {
                this.addGoalMarker();
            }
        }
    },

    addGoalMarker: function() {
        //新しく1個を足す
        this.tmpMarkers = [];
        for (var i = 0; i < this.markers.length; i++) {
            if (this.markers[i].markerType == "default") {
                this.tmpMarkers.push(this.markers[i]);
            }
        }
        this.tmpMarkers.sort(this.shuffle);
        this.tmpMarkers[0].markerType = "goal";
    },

    manageMapScroll: function() {
        if (this.tappedMarker) {
            if (this.tappedMarker.getPosition().x < 320 - 200) {
                this.targetBaseNodePosX = 260;
            } else if (this.tappedMarker.getPosition().x > 320 + 200) {
                this.targetBaseNodePosX = -260;
            } else {
                this.targetBaseNodePosX = 0;
            }
        }

        if (this.targetBaseNodePosX < this.baseNodePosX) {
            if (Math.abs(this.targetBaseNodePosX - this.baseNodePosX) < 10) {
                this.baseNodePosX = this.targetBaseNodePosX;
            } else {
                this.baseNodePosX -= 20;
            }
        }
        if (this.targetBaseNodePosX > this.baseNodePosX) {
            if (Math.abs(this.targetBaseNodePosX - this.baseNodePosX) < 10) {
                this.baseNodePosX = this.targetBaseNodePosX;
            } else {
                this.baseNodePosX += 20;
            }
        }
        this.baseNode.setPosition(this.baseNodePosX, this.baseNodePosY);
    },

    update: function(dt) {
        //スクロール制御
        this.manageMapScroll();

        //Enemyをフィールドに生成する
        if (this.enemies.length < this.maxEnemyCnt) {
            var _defaultMarker = this.getDefaultMarker();
            this.addEnemy(_defaultMarker.posX, _defaultMarker.posY);
        }

        //オペレーションをupdateする
        for (var i = 0; i < this.operations.length; i++) {
            if (this.operations[i].update() == false) {}
        }

        //マーカーを1つどこか変更する


        //プレイヤーGirlを追加する
        this.addPlayerTime++;
        if (this.addPlayerTime >= 30 * 2) {


                this.markers.sort(this.shuffle);
                this.markers[0].changeMarkerType();


            if (this.players.length <= this.maxPlayerCnt) {
                this.addPlayerTime = 0;
                var startMarker = this.getStartMarker();
                if (startMarker) {
                    var _x = startMarker.posX;
                    var _y = startMarker.posY;
                    this.addPlayer(_x, _y);
                }
            }
        }

        //スタートマーカーを移動させる
        this.setStartTime++;
        if (this.setStartTime >= 30 * 20) {
            this.setStartTime = 0;
            this.setStartMarker();
        }

        //ゴールマーカーを移動させる
        if (this.setGoalTime >= 10) {
            this.setGoalTime = 0;
            this.setGoalMarker();
        }
/*
        //落下させる
        for (var j = 0; j < this.players.length; j++) {
            for (var i = 0; i < this.markers.length; i++) {
                if (this.markers[i].markerType == "hole") {
                    if (this.players[j].posX == this.markers[i].posX && this.players[j].posY == this.markers[i].posY) {
                        if (this.players[j].isHoleCnt == 0) {
                            this.players[j].isHoleCnt = 1;
                        }
                    }
                }
            }
        }
*/
        for (var j = 0; j < this.enemies.length; j++) {
            for (var i = 0; i < this.operations.length; i++) {
                if (this.operations[i].operationId == 3) {
                    if (this.enemies[j].posX == this.operations[i].posX && this.enemies[j].posY == this.operations[i].posY) {
                        if (this.enemies[j].isHoleCnt == 0) {
                            this.enemies[j].isHoleCnt = 1;
                        }
                    }
                }
            }
        }
        /*
                for (var j = 0; j < this.players.length; j++) {
                    for (var i = 0; i < this.markers.length; i++) {
                        if(this.markers[i].markerType == "goal"){
                            if(this.players[j].posX == this.markers[i].posX 
                                && this.players[j].posY == this.markers[i].posY){
                                if(this.players[j].isGoalCnt == 0){
                                    this.players[j].isGoalCnt = 1;
                                    this.setGoalTime++;
                                }
                            }
                        }
                    }
                }
        */
        //EnemyとPlayerの当たり判定
        for (var i = 0; i < this.enemies.length; i++) {
            for (var j = 0; j < this.players.length; j++) {
                if (this.enemies[i].posX == this.players[j].posX && this.enemies[i].posY == this.players[j].posY) {
                    this.players[j].hp = 0;
                }
            }
        }

        //プレイヤー同士のコリジョンを指定する
        for (var i = 0; i < this.players.length; i++) {
            for (var j = 0; j < this.players.length; j++) {

//this.players[i].isCollistion = false;
//this.players[j].isCollistion = false;

                var dist = Math.sqrt(
                    (this.players[i].getPosition().x - this.players[j].getPosition().x) * (this.players[i].getPosition().x - this.players[j].getPosition().x) + (this.players[i].getPosition().y - this.players[j].getPosition().y) * (this.players[i].getPosition().y - this.players[j].getPosition().y)
                );

                if (this.players[j].direction == this.players[i].direction) {
                    if (dist <= 30) {
                        
                        var directionX = this.players[j].getPosition().x - this.players[i].getPosition().x;
                        var directionY = this.players[j].getPosition().y - this.players[i].getPosition().y;
                        this.players[j].setPosition(
                            this.players[j].getPosition().x + directionX / 5,
                            this.players[j].getPosition().y + directionY / 5
                        );
                        
                        //this.players[i].isCollistion = true;
                        //this.players[j].isCollistion = true;
                    }
                }
            }
        }
    
        //最も近いマーカーを計算する
        for (var t = 0; t < this.players.length; t++) {
            if (this.players[t].isHoleCnt == 0) {
                var _minDist = 999999999999999999;
                for (var i = 0; i < this.markers.length; i++) {
                    var dist = Math.sqrt(
                        (this.markers[i].getPosition().x - this.players[t].getPosition().x) * (this.markers[i].getPosition().x - this.players[t].getPosition().x) + (this.markers[i].getPosition().y - (this.players[t].getPosition().y - this.players[t].marginY)) * (this.markers[i].getPosition().y - (this.players[t].getPosition().y - this.players[t].marginY))
                    );
                    if (_minDist > dist) {
                        _minDist = dist;
                        this.players[t].mostNearMarker = this.markers[i];
                    }
                }
            }
        }

        for (var t = 0; t < this.enemies.length; t++) {
            if (this.enemies[t].isHoleCnt == 0) {
                var _minDist = 999999999999999999;
                for (var i = 0; i < this.operations.length; i++) {
                    var dist = Math.sqrt(
                        (this.operations[i].getPosition().x - this.enemies[t].getPosition().x) * (this.operations[i].getPosition().x - this.enemies[t].getPosition().x) + (this.operations[i].getPosition().y - (this.enemies[t].getPosition().y - this.enemies[t].marginY)) * (this.operations[i].getPosition().y - (this.enemies[t].getPosition().y - this.enemies[t].marginY))
                    );
                    if (_minDist > dist) {
                        _minDist = dist;
                        this.enemies[t].mostNearMarker = this.operations[i];
                    }
                }
            }
        }

        /*
                for (var i = 0; i < this.markers.length; i++) {
                    for (var t = 0; t < this.players.length; t++) {
                        if(this.players[t].mostNearMarker){
                            if(this.markers[i].randId == this.players[t].mostNearMarker.randId){
                                //cc.log(this.players[t].mostNearMarker.posX + "|" + this.players[t].mostNearMarker.posY);
                                //cc.log(this.markers[i].posX + "-" + this.markers[i].posY + "/" + this.players[t].posX + "-" + this.players[t].posY);
                                //this.markers[i].setVisible(false);
                            }
                        }
                    }
                }
        */

/*
        for (var i = 0; i < this.markers.length; i++) {
            this.baseNode.reorderChild(
                this.markers[i],
                Math.floor(this.markers[i].posX * 10 + this.markers[i].posY * 10)
            );
            this.markers[i].update();
        }
*/

        for (var i = 0; i < this.operations.length; i++) {
            this.operations[i].setScale(1, 1);
            this.baseNode.reorderChild(
                this.operations[i],
                //Math.floor(this.operations[i].posX * 10 + this.operations[i].posY * 10)
                99999 - this.operations[i].getPosition().y
            );
        }

        //enemyをupdateする
        for (var t = 0; t < this.enemies.length; t++) {
            this.reorderChild(
                this.enemies[t],//lastPositionY
                ///Math.floor(99999 - this.enemies[t].getPosition().y + 1)
                Math.floor(99999 - this.enemies[t].lastPositionY + 100)
            );
            if (this.enemies[t].update() == false) {
                this.baseNode.removeChild(this.enemies[t]);
                this.enemies.splice(t, 1);
            }
        }

        //playerをupdateする
        for (var t = 0; t < this.players.length; t++) {
            //戦車に与えられた指示を取得する
            var minDistOperation = null;
            for (var i = 0; i < this.operations.length; i++) {
                if (this.operations[i].posX == this.players[t].posX && this.operations[i].posY == this.players[t].posY) {
                    minDistOperation = this.operations[i];
                }
            }

            if (this.players[t].mostNearMarker) {
                this.baseNode.reorderChild(
                    this.players[t],
                    //Math.floor(this.players[t].destinationX * 10 + this.players[t].destinationY * 10)
                    //Math.floor(this.players[t].mostNearMarker.posX * 10 + this.players[t].mostNearMarker.posY * 10)
                    99999 - this.players[t].mostNearMarker.getPosition().y
                );
            }

            if (this.players[t].update() == false) {
                this.baseNode.removeChild(this.players[t]);
                this.players.splice(t, 1);
            }
        }
    },

    setGameOver: function() {
        //ad(広告)によるretryがまだされていなければリトライ
        if (this.retryCnt == 0 && isFailedAd == false) {
            this.status = "info_ad";
            this.infoad.setVisible(true);
        } else {
            this.status = "gameover";
            this.gameover.setVisible(true);
            this.storage.maxGameScore = this.score;
            this.storage.saveCurrentData();
        }
    },

    shuffle: function() {
        return Math.random() - .5;
    },

    addOperation: function(posX, posY, operationId) {
        this.operation = new Operation(this, operationId);
        this.baseNode.addChild(this.operation, 999999);
        var pos = this.getBasePosition(posX, posY);
        this.operation.posX = posX;
        this.operation.posY = posY;
        this.operation.setPosition(
            pos[0],
            pos[1]
        );
        this.operations.push(this.operation);

        this.baseOnSprite = cc.Sprite.create("res/baseon.png");
        this.baseOnSprite.setAnchorPoint(0.5, 0);
        this.baseNode.addChild(this.baseOnSprite, 999999);

        this.baseOn2Sprite = cc.Sprite.create("res/baseon.png");
        this.baseOn2Sprite.setAnchorPoint(0.5, 0);
        this.baseNode.addChild(this.baseOn2Sprite, 999999);
    },

    getBasePosition: function(x, y) {
        for (var j = 0; j < this.baseData.length; j++) {
            if (this.baseData[j].x == x && this.baseData[j].y == y) {
                return [
                    this.baseData[j].posX,
                    this.baseData[j].posY
                ];
            }
        }
        return [0, 0];
    },

    getBaseHumanPosition: function(x, y) {
        for (var j = 0; j < this.baseData.length; j++) {
            if (this.baseData[j].x == x && this.baseData[j].y == y) {
                return [
                    this.baseData[j].posX,
                    this.baseData[j].posY
                ];
            }
        }
        return [0, 0];
    },

    touchStart: function(location) {
        location.x -= this.baseNodePosX;
        location.y -= this.baseNodePosY;
        this.firstTouchX = location.x;
        this.firstTouchY = location.y;
        this.touchStartOperation = null;
        var minDist = 999999;
        for (var i = 0; i < this.operations.length; i++) {
            var dist = Math.sqrt(
                (this.operations[i].getPosition().x * this.baseScale - location.x) * (this.operations[i].getPosition().x * this.baseScale - location.x) + (this.operations[i].getPosition().y * this.baseScale + this.baseTopHeight * this.baseScale - location.y) * (this.operations[i].getPosition().y * this.baseScale + this.baseTopHeight * this.baseScale - location.y)
            );
            if (minDist > dist) {
                minDist = dist;
                this.touchStartOperation = this.operations[i];
            }
        }

        this.baseOnSprite.setPosition(
            this.touchStartOperation.getPosition().x,
            this.touchStartOperation.getPosition().y
        );

        this.tappedMarker = null;
        var _touchStartMarker = null;
        for (var i = 0; i < this.markers.length; i++) {
            //cc.log(this.markers[i].posX + "|" + this.markers[i].posY);
            if (this.markers[i].posX == this.touchStartOperation.posX && this.markers[i].posY == this.touchStartOperation.posY) {
                _touchStartMarker = this.markers[i];
            }
        }
        this.tmpTappedMarker = _touchStartMarker;
    },

    touchMove: function(location) {
        location.x -= this.baseNodePosX;
        location.y -= this.baseNodePosY;

        this.touchMoveOperation = null;
        var minDist = 999999;
        for (var i = 0; i < this.operations.length; i++) {
            var dist = Math.sqrt(
                (this.operations[i].getPosition().x * this.baseScale - location.x) * (this.operations[i].getPosition().x * this.baseScale - location.x) + (this.operations[i].getPosition().y * this.baseScale + this.baseTopHeight * this.baseScale - location.y) * (this.operations[i].getPosition().y * this.baseScale + this.baseTopHeight * this.baseScale - location.y)
            );
            if (minDist > dist) {
                minDist = dist;
                this.touchMoveOperation = this.operations[i];
            }
        }
        this.touchMoveOperation.setScale(1.2, 1.2);
        this.baseOn2Sprite.setPosition(
            this.touchMoveOperation.getPosition().x,
            this.touchMoveOperation.getPosition().y
        );
    },


    touchFinish: function(location) {
        location.x -= this.baseNodePosX;
        location.y -= this.baseNodePosY;

        //設置したポジションが現在のターンの置き場であるかチェックする
        var touchEndOperation = null;
        var minDist = 999999;
        for (var i = 0; i < this.operations.length; i++) {
            var dist = Math.sqrt(
                (this.operations[i].getPosition().x * this.baseScale - location.x) * (this.operations[i].getPosition().x * this.baseScale - location.x) + (this.operations[i].getPosition().y * this.baseScale + this.baseTopHeight * this.baseScale - location.y) * (this.operations[i].getPosition().y * this.baseScale + this.baseTopHeight * this.baseScale - location.y)
            );
            if (minDist > dist) {
                minDist = dist;
                touchEndOperation = this.operations[i];
            }
        }

        var _touchEndMarker = null;
        for (var i = 0; i < this.markers.length; i++) {
            //cc.log(this.markers[i].posX + "|" + this.markers[i].posY);
            if (this.markers[i].posX == touchEndOperation.posX && this.markers[i].posY == touchEndOperation.posY) {
                _touchEndMarker = this.markers[i];
            }
        }

        if (this.tmpTappedMarker == _touchEndMarker) {
            this.tappedMarker = this.tmpTappedMarker;
        }

        if (_touchEndMarker != null) {
            if (this.turn == "player" && _touchEndMarker.markerType == "enemy") {
                cc.log("error");
            }
            if (this.turn == "enemy" && _touchEndMarker.markerType == "player") {
                cc.log("error");
            }
            if (_touchEndMarker.markerType == "default") {
                cc.log("error");
            }
        }

        var tmpTouchStartOperationPosX = this.touchStartOperation.posX;
        var tmpTouchStartOperationPosY = this.touchStartOperation.posY;
        this.touchStartOperation.posX = touchEndOperation.posX;
        this.touchStartOperation.posY = touchEndOperation.posY;

        touchEndOperation.posX = tmpTouchStartOperationPosX;
        touchEndOperation.posY = tmpTouchStartOperationPosY;
        //touchEndOperation.isMix = true;
    },

    getRandNumberFromRange: function(min, max) {
        var rand = min + Math.floor(Math.random() * (max - min));
        return rand;
    },

    //シーンの切り替え----->
    goToTopLayer: function(pSender) {
        var scene = cc.Scene.create();
        //次のステージへいくためにstorageは必ず受けた渡す
        scene.addChild(TopLayer.create(this.storage));
        cc.director.runScene(cc.TransitionFade.create(1.5, scene));
    },

    showInfo: function(text) {
        console.log(text);
        if (this.infoLabel) {
            var lines = this.infoLabel.string.split('\n');
            var t = '';
            if (lines.length > 0) {
                t = lines[lines.length - 1] + '\n';
            }
            t += text;
            this.infoLabel.string = t;
        }
    },

    admobInit: function() {
        if ('undefined' == typeof(sdkbox)) {
            isFailedAd = true;
            this.showInfo('sdkbox is undefined')
            return;
        }
        if ('undefined' == typeof(sdkbox.PluginAdMob)) {
            isFailedAd = true;
            this.showInfo('sdkbox.PluginAdMob is undefined')
            return;
        }

        var self = this
        sdkbox.PluginAdMob.setListener({
            adViewDidReceiveAd: function(name) {
                self.showInfo('adViewDidReceiveAd name=' + name);
            },
            adViewDidFailToReceiveAdWithError: function(name, msg) {
                self.showInfo('adViewDidFailToReceiveAdWithError name=' + name + ' msg=' + msg);
            },
            adViewWillPresentScreen: function(name) {
                self.showInfo('adViewWillPresentScreen name=' + name);
            },
            adViewDidDismissScreen: function(name) {
                isCancelAd = true;
                self.showInfo('adViewDidDismissScreen name=' + name);
            },
            adViewWillDismissScreen: function(name) {
                self.showInfo('adViewWillDismissScreen=' + name);
            },
            adViewWillLeaveApplication: function(name) {
                self.showInfo('adViewWillLeaveApplication=' + name);
                if (name == "gameover") {
                    sdkbox.PluginAdMob.hide("gameover");
                    item001Cnt = 1;
                }
            }
        });
        sdkbox.PluginAdMob.init();
        // just for test
        var plugin = sdkbox.PluginAdMob
        if ("undefined" != typeof(plugin.deviceid) && plugin.deviceid.length > 0) {
            this.showInfo('deviceid=' + plugin.deviceid);
            // plugin.setTestDevices(plugin.deviceid);
        }
    },
});

GameLayer.create = function(storage) {
    return new GameLayer(storage);
};

var GameLayerScene = cc.Scene.extend({
    onEnter: function(storage) {
        this._super();
        var layer = new GameLayer(storage);
        this.addChild(layer);
    }
});