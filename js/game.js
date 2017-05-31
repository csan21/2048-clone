function Game(){
 this.board = [ [0,0,0,0],
                [2,0,0,0],
                [0,0,0,2],
                [0,0,0,0] ]
}

Game.prototype.hideZeros = function(){
  var singleArray = this.board[0].concat(this.board[1]).concat(this.board[2]).concat(this.board[3]);

  for(var i = 0; i < singleArray.length; i++){
    if (singleArray[i] === 0){
      singleArray[i] = "";
    }
  }
  // turn the single array back into it's original state
  this.board = [];
  for(var j = 0; j < singleArray.length; j += 4){
    var subArray = [];
    var num      = (j + 4)

    for(var i = j; i < num; i++){
      subArray.push(singleArray[i])
    }
    this.board.push(subArray);
  }
}

Game.prototype.showZeros = function(){
  var singleArray = this.board[0].concat(this.board[1]).concat(this.board[2]).concat(this.board[3]);

  for(var i = 0; i < singleArray.length; i++){
    if (singleArray[i] === ""){
      singleArray[i] = 0;
    }
  }
  // turn the single array back into it's original state
  this.board = [];
  for(var j = 0; j < singleArray.length; j += 4){
    var subArray = [];
    var num      = (j + 4)

    for(var i = j; i < num; i++){
      subArray.push(singleArray[i])
    }
    this.board.push(subArray);
  }
}

Game.prototype.insertNum = function(){
  // turn the board into one single array
  // go through the single array and look for any 0's log their indexes
  var singleArray    = this.board[0].concat(this.board[1]).concat(this.board[2]).concat(this.board[3]);
  var arrayOfIndexes = [];

  for(var i = 0; i < singleArray.length; i++){
    if (singleArray[i] === 0){
      arrayOfIndexes.push(i);
    }
  }
  // if there's any 0's...
  if (arrayOfIndexes.length > 0 ) {
    if (arrayOfIndexes.length > 1) {
      var randomIndex = Math.floor((Math.random() * arrayOfIndexes.length));
      var actualIndex = arrayOfIndexes[randomIndex];
      } else {
      var actualIndex = arrayOfIndexes[0];
    }
    singleArray[actualIndex] = 2;
  }
  // turn the single array back into it's original state
  this.board = [];
  for(var j = 0; j < singleArray.length; j += 4){
    var subArray = [];
    var num      = (j + 4);

    for(var i = j; i < num; i++){
      subArray.push(singleArray[i]);
    }
    this.board.push(subArray);
  }
}

Game.prototype.shift = function(array){
  for(var i = 0; i < array.length; i++){
    if (array[i+1] === 0){
      var temp = array[i];
      array[i] = array[i+1];
      array[i+1] = temp;
    }
  }
  return array;
}

Game.prototype.ultimateCompile = function(array){
  for(var i = 0; i < array.length; i++){
    if (array[i] === array[i+1] && array[i+1] === array[i+2] && array[i+2] === array[i+3]){
      temp = array[i+1] + array[i+2];
      array[i] = 0;
      array[i+2] = 0;
      array[i+1] = temp;
      array[i+3] = temp;
    } else if (array[i] === array[i+1] && array[i+1] === array[i+2]){
      temp = array[i+1] + array[i+2];
      array[i]   = 0;
      array[i+2] = temp;
      i += 2;
    } else if (array[i] === array[i+1]){
      temp = array[i] + array[i+1];
      array[i] = 0;
      array[i+1] = temp;
      i += 1;
    }
  }
  return array;
}

Game.prototype.rotateLeft = function(){
  var rotatedBoard = [];

  for(var c = this.board.length-1 ; c >= 0; c--){
    var tempArray = [];

    for(var r = 0; r < this.board.length; r++){
      tempArray.push(this.board[r][c]);
    }
    rotatedBoard.push(tempArray);
  }
  this.board = rotatedBoard;
}

Game.prototype.rotateRight = function(){
  var rotatedBoard = [];

  for(var c = 0; c < this.board.length ; c++){
    var tempArray = [];

    for(var r = this.board.length-1; r >= 0; r--){
      tempArray.push(this.board[r][c]);
    }
    rotatedBoard.push(tempArray);
  }
  this.board = rotatedBoard;
}
// user presses down key, board rotate to the left, shift & compile, board rotate to the right
Game.prototype.downKey = function(){
  this.rotateLeft();
  for(var i = 0; i < this.board.length; i++){
    temp = this.shift(this.board[i]);
    temp = this.shift(temp);
    temp = this.ultimateCompile(temp);
    temp = this.shift(temp);
    this.board[i]  = this.shift(temp);
  }
  this.rotateRight();
}
// user presses up key, board rotate to the right, shift & compile, board rotate to the left
Game.prototype.upKey = function(){
  this.rotateRight();
  for(var i = 0; i < this.board.length; i++){
    temp = this.shift(this.board[i]);
    temp = this.shift(temp);
    temp = this.ultimateCompile(temp);
    temp = this.shift(temp); // <-- need to shift one more time...
    this.board[i]  = this.shift(temp);
  }
  this.rotateLeft();
}

Game.prototype.leftKey = function(){
  for(var i = 0; i < this.board.length; i++){
    temp = this.shift(this.board[i].reverse());
    temp = this.shift(temp);
    temp = this.ultimateCompile(temp);
    temp = this.shift(temp);
    this.board[i] = this.shift(temp).reverse();
  }
}

Game.prototype.rightKey = function(){
  for(var i = 0; i < this.board.length; i++){
    temp = this.shift(this.board[i]);
    temp = this.shift(temp);
    temp = this.ultimateCompile(temp);
    temp = this.shift(temp);
    this.board[i] = this.shift(temp);
  }
}
