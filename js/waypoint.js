'use strict'

function Waypoint(posit_X, posit_Y, width, height, ctx, type, color) {
    var self = this;

    self.x = posit_X;
    self.y = posit_Y;
    self.width = width;
    self.height = height;
    self.ctx = ctx;
    self.type = type;
    self.color = color;

}

Waypoint.prototype.draw = function () {
    var self = this;


        self.ctx.fillStyle = self.color;
        self.ctx.fillRect(self.x, self.y, self.width, self.height);

    //self.ctx.fillText('Hello world', 10, 50);
    /* Text strategy
    
    
    
    
    */
}

Waypoint.prototype.update = function () {
    var self = this;
    //logic for update self.x and self.y - i.e if a block were to mooooove!
}
