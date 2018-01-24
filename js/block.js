'use strict'

function Block(posit_X, posit_Y, width, height, ctx, type) {
    var self = this;

    self.x = posit_X;
    self.y = posit_Y;
    self.width = width;
    self.height = height;
    self.ctx = ctx;
    self.type = type;

}

Block.prototype.draw = function () {
    var self = this;

    self.ctx.fillStyle = self.type;
    self.ctx.fillRect(self.x, self.y, self.width, self.height);
}

Block.prototype.update = function () {
    var self = this;
    //logic for update self.x and self.y - i.e if a block were to mooooove!
}
