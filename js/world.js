'use strict';

function World (ctx, width, height) {
    var self = this;

    self.width = width;
    self.height = height;
    self.blockColor = 'green';
    self.portalColor = 'blue';

    //Take in canvas rendering context from Game instance**
    self.ctx = ctx;
}

World.prototype.draw = function () {
    var self = this;

    self._createBlocks();
    self._createPortals();    
    
}

World.prototype._createBlocks = function () {
    var self = this

    self.ctx.fillStyle = self.blockColor;
    self.ctx.fillRect(0, 590, 1000, 10);
}

World.prototype._createPortals = function () {
    var self = this

    self.ctx.fillStyle = self.portalColor;
    self.ctx.fillRect(0, 400, 26, 26);
}
