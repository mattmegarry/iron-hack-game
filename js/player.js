'use strict';

function Player (ctx, width, height) {
    var self = this; //SELF NOW REFERS TO THE INSTANCE OF PLAYER

    self.size = 26; //Set player size to x pixels (to allow for collision detection)

    //Take in canvas rendering context from Game instance
    self.ctx = ctx;
    
    //Take in dimensions of our canvas from Game instance 
    self.gameWidth = width;
    self.gameHeight = height;
    
    //Place the player in the top right of the screen
    self.x = 0;
    self.y = 0;
    
    //Leave DIRECTION for now, only needed in the case of user indepenedent movement or WRAP
    self.moveAction = null;

    self.rightCollision = false;
    self.leftCollision = false;
}

Player.prototype.moveLateral = function (moveAction) { // I set things in motion!
    var self = this;
    
    self.moveAction = moveAction;
}

Player.prototype.lateralCollision = function (){
    var self = this;

    self.rightSide = self.x + self.size; 
    self.leftSide = self.x;
    self.topSide = self.y;
    self.bottomSide = self.y + self.size;

    if (self.rightSide > 1000) {
        self.rightCollision = true;
    } 
    else if (self.leftSide < 0) {
        self.leftCollision = true;
    }

    console.log(self.leftSide);
}

Player.prototype.update = function () { // I do things EVERY FRAME!
    var self = this;

if () {    
    //User responsive lateral movement EVERY FRAME
    if (self.moveAction === 'right') {
        self.x += 10;
    } 
    else if (self.moveAction === 'left'){
        self.x -= 10;
    }
}    

    if (self.moveAction === 'stopright'){
        self.x = self.x;
    }
    else if (self.moveAction === 'stopleft'){
        self.x = self.x;
    }
    

    //console.log(self.x);
}

Player.prototype.draw = function () {
    var self = this;
    
    self.ctx.fillStyle = 'red';
    self.ctx.fillRect(self.x, self.y, self.size, self.size);
  }