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

}

World.prototype.draw = function () {
    var self = this;

    self.blocks.forEach(function(block) {
        block.draw();
    })  
}

World.prototype.collision = function () {
    
}


World.prototype._createBlocks = function () {
    var self = this;

    var newBlock10Percent = new Block(self.ctx, self.width * 0.6 ,self.height * 0.1, 'red');
    self.blocks.push(newBlock10Percent);

    var newBlock50Percent = new Block(self.ctx, self.width * 0.6 ,self.height * 0.5, 'black');
    self.blocks.push(newBlock50Percent);


    // self.ctx.fillStyle = self.blockColor;
    // self.ctx.fillRect(0, 590, 1000, 10);
}

World.prototype._createPortals = function () {
    var self = this // change for create portals

    // self.ctx.fillStyle = self.portalColor;
    // self.ctx.fillRect(0, 400, 26, 26);
}
