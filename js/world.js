'use strict';

function World (ctx, width, height) {
    var self = this;

    self.width = width;
    self.height = height;
    self.blockColor = 'green';
    self.portalColor = 'blue';

    self.blocks = [];

    //Take in canvas rendering context from Game instance**
    self.ctx = ctx;

    self.init();
}

World.prototype.init = function() {
    var self = this;

    self._createBlocks();
    self._createPortals();
    self.player = new Player(self.ctx, self.width, self.height);    
    self.player.collision = false;
}

World.prototype.update = function () {
    var self = this;

    self._collision();//Could set a range of collision variables true or false

    self.player.update();
}

World.prototype.draw = function () {
    var self = this;

    self.player.draw();
    self.blocks.forEach(function(block) {
        block.draw();
    });  
}

World.prototype._collision = function () {
    var self = this;

    self.player.rightSideLine = self.player.x + self.player.size; 
    self.player.leftSideLine = self.player.x;
    self.player.topSideLine = self.player.y;
    self.player.bottomSideLine = self.player.y + self.player.size;

    self.blocks.forEach(function (blockItem) {
        var blockRightSideLine = blockItem.x + blockItem.width; 
        var blockLeftSideLine = blockItem.x;
        var blockTopSideLine = blockItem.y;
        var blockBottomSideLine = blockItem.y + blockItem.height;
        
        if (self.player.rightSideLine > blockLeftSideLine
            && self.player.leftSideLine < blockLeftSideLine
            && self.player.topSideLine < blockBottomSideLine
            && self.player.bottomSideLine > blockTopSideLine) {
            console.log('RIGHT');
            self.player.rightCollision = true;
        } 
        if (self.player.leftSideLine < blockRightSideLine
            && self.player.rightSideLine > blockRightSideLine
            && self.player.topSideLine < blockBottomSideLine
            && self.player.bottomSideLine > blockTopSideLine) {
            console.log('LEFT');
            self.player.leftCollision = true;
        }
        if (self.player.rightSideLine > blockLeftSideLine
            && self.player.leftSideLine < blockRightSideLine
            && self.player.topSideLine < blockBottomSideLine
            && self.player.bottomSideLine > blockBottomSideLine) {
            console.log('TOP');
            self.player.topCollision = true;
        }
        if (self.player.rightSideLine > blockLeftSideLine
            && self.player.leftSideLine < blockRightSideLine
            && self.player.topSideLine < blockTopSideLine
            && self.player.bottomSideLine > blockTopSideLine) {
            console.log('BOTTOM');
            self.player.bottomCollision = true;
        } 

    });
    
}


World.prototype._createBlocks = function () {
    var self = this;

    //posit_X, posit_Y, width, height, ctx, type
    var newBlock10Percent = new Block(self.width * 0.6, self.height * 0.1, 30, 80, self.ctx, 'red');
    self.blocks.push(newBlock10Percent);

    var newBlock50Percent = new Block(self.width * 0.6, self.height * 0.5, 200, 6, self.ctx, 'black');
    self.blocks.push(newBlock50Percent);

    var fullFloorBlock = new Block(0, 590, 1000, 10, self.ctx, 'green');
    self.blocks.push(fullFloorBlock);

    var rightBoundaryBlock = new Block(400, 400, 50, 50, self.ctx, 'orange');
    self.blocks.push(rightBoundaryBlock);

    // self.ctx.fillStyle = self.blockColor;
    // self.ctx.fillRect(0, 590, 1000, 10);
}

World.prototype._createPortals = function () {
    var self = this // change for create portals

    // self.ctx.fillStyle = self.portalColor;
    // self.ctx.fillRect(0, 400, 26, 26);
}
