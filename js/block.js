'use strict'

function Block(ctx, x, y, type) {

    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.type = type;

}

Block.prototype.draw = function () {
    var self = this;

    self.ctx.fillStyle = self.type;
    self.ctx.fillRect(self.x, self.y, 1000, 10);
}

Block.prototype.update = function () {
    var self = this;
    //logic for update self.x and self.y
}
