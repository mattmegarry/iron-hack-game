'use strict';

function World (ctx, width, height) {
    var self = this;

    self.width = width;
    self.height = height;
    self.blockColor = 'green';
    self.portalColor = 'blue';

    self.solids = [];
    self.waypoints = [];

    //Take in canvas rendering context from Game instance**
    self.ctx = ctx;

    self.init();
}

World.prototype.init = function() {
    var self = this;

    self._createSolids();
    self._createWaypoints();
    self.player = new Player(self.ctx, self.width, self.height);    
    self.player.collision = false;
}

World.prototype.update = function () {
    var self = this;

    self._solidCollision();//Could set a range of collision variables true or false

    self.player.update();
}

World.prototype.draw = function () {
    var self = this;
    
    self.waypoints.forEach(function(block) {
        block.draw();
    });

    self.player.draw();

    self.solids.forEach(function(block) {
        block.draw();
    });    
}

World.prototype._solidCollision = function () {
    var self = this;

    //TODO - Change block to 'solid'

    self.player.rightSideLine = self.player.x + self.player.size; 
    self.player.leftSideLine = self.player.x;
    self.player.topSideLine = self.player.y;
    self.player.bottomSideLine = self.player.y + self.player.size;

    self.solids.forEach(function (blockItem) {
        var blockRightSideLine = blockItem.x + blockItem.width; 
        var blockLeftSideLine = blockItem.x;
        var blockTopSideLine = blockItem.y;
        var blockBottomSideLine = blockItem.y + blockItem.height;

        var playerRightOverlap = self.player.rightSideLine > blockLeftSideLine;
        
        if (playerRightOverlap //TODO - make it all like this: could test performance of both in Chrome!
            && self.player.leftSideLine < blockLeftSideLine
            && self.player.topSideLine < blockBottomSideLine
            && self.player.bottomSideLine > blockTopSideLine) {
            //console.log('RIGHT');
            self.player.rightCollision = true;
        } 
        if (self.player.leftSideLine < blockRightSideLine
            && self.player.rightSideLine > blockRightSideLine
            && self.player.topSideLine < blockBottomSideLine
            && self.player.bottomSideLine > blockTopSideLine) {
            //console.log('LEFT');
            self.player.leftCollision = true;
        }
        if (self.player.rightSideLine > blockLeftSideLine
            && self.player.leftSideLine < blockRightSideLine
            && self.player.topSideLine < blockBottomSideLine
            && self.player.bottomSideLine > blockBottomSideLine) {
            //console.log('TOP');
            self.player.topCollision = true;
        }
        if (self.player.rightSideLine > blockLeftSideLine
            && self.player.leftSideLine < blockRightSideLine
            && self.player.topSideLine < blockTopSideLine
            && self.player.bottomSideLine > blockTopSideLine) {
            //console.log('BOTTOM');
            self.player.bottomCollision = true;
        } 

    });
    
}


World.prototype._createSolids = function () {
    var self = this;

    //posit_X, posit_Y, width, height, ctx, type
    var newTopLineSolid = new Block(60, 100, 600, 10, self.ctx, 'solid', 'black');
    self.solids.push(newTopLineSolid);

    var newBlock50Percent = new Block(140, 200, 600, 10, self.ctx, 'solid', 'black');
    self.solids.push(newBlock50Percent);

    var fullFloorBlock = new Block(140, 300, 700, 10, self.ctx, 'solid', 'black');
    self.solids.push(fullFloorBlock);

    var rightBoundaryBlock = new Block(60, 400, 50, 10, self.ctx, 'solid', 'black');
    self.solids.push(rightBoundaryBlock);

    var rightBoundaryBlock = new Block(60, 500, 600, 10, self.ctx, 'solid', 'black');
    self.solids.push(rightBoundaryBlock);

    //Boundary Blocks
    var fullFloorBlock = new Block(0, 595, 1000, 10, self.ctx, 'solid', 'green');
    self.solids.push(fullFloorBlock);

    // self.ctx.fillStyle = self.blockColor;
    // self.ctx.fillRect(0, 590, 1000, 10);
}

World.prototype._createWaypoints = function () {
    var self = this // change for create portals
    
    var newBlock10Percent = new Block(60, 70, 600, 30, self.ctx, 'waypoint', 'pink');
    self.waypoints.push(newBlock10Percent);

    var newBlock50Percent = new Block(140, 170, 600, 30, self.ctx, 'waypoint', 'pink');
    self.waypoints.push(newBlock50Percent);

    var fullFloorBlock = new Block(140, 270, 700, 30, self.ctx, 'waypoint', 'pink');
    self.waypoints.push(fullFloorBlock);

    var rightBoundaryBlock = new Block(60, 370, 50, 30, self.ctx, 'waypoint', 'pink');
    self.waypoints.push(rightBoundaryBlock);

    var rightBoundaryBlock = new Block(60, 470, 600, 30, self.ctx, 'waypoint', 'pink');
    self.waypoints.push(rightBoundaryBlock);
    // self.ctx.fillStyle = self.portalColor;
    // self.ctx.fillRect(0, 400, 26, 26);
}
