'use strict';

function Player (ctx, width, height) {
    var self = this; //SELF NOW REFERS TO THE INSTANCE OF PLAYER

    self.size = 26; //Set player size to x pixels (to allow for collision detection)

    //Take in canvas rendering context from Game instance
    self.ctx = ctx;
    
    //Take in dimensions of our canvas from Game instance 
    self.gameWidth = width;
    self.gameHeight = height;
    
    //Place the player in the center of the screen (conceptually)
    self.x = self.gameWidth / 2;
    self.y = self.gameHeight / 2;

    //Leave DIRECTION for now, only needed in the case of user indepenedent movement or WRAP
    self.moveAction = null;
}

Player.prototype.moveLateral = function (moveAction) { // I set things in motion!
    var self = this;
    
    self.moveAction = moveAction;
}

Player.prototype.update = function () { // I do things EVERY FRAME!
    var self = this;

    //User responsive lateral movement EVERY FRAME
    if (self.moveAction === 'right') {
        self.x += 10;
    } 
    else if (self.moveAction === 'left'){
        self.x -= 10;
    }
    else if (self.moveAction === 'stopright'){
        self.x = self.x;
    }
    else if (self.moveAction === 'stopleft'){
        self.x = self.x;
    }

    //GRAVITY HERE ONCE COLLISION DETECTION

    //console.log(self.x);
}

Player.prototype.draw = function () {
    var self = this;
    
    self.ctx.fillStyle = 'red';
    self.ctx.fillRect(self.x - self.size/2, self.y - self.size/2, self.size, self.size);
  }