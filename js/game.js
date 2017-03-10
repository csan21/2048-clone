function Game(){
 this.board = [ [0,0,0,0],
                [2,0,0,0],
                [0,0,0,2],
                [0,0,0,0] ]
}

Game.prototype.hide_zeros = function(){
  var single_array = this.board[0].concat(this.board[1]).concat(this.board[2]).concat(this.board[3]);

  for(var i = 0; i < single_array.length; i++){
    if(single_array[i] === 0){
      single_array[i] = "";
    }
  }
  // turn the single array back into it's original state
  this.board = [];
  for(var j = 0; j < single_array.length; j += 4){
    var sub_array = [];
    var num = (j + 4)
    for(var i = j; i < num; i++){
      sub_array.push(single_array[i])
    }
    this.board.push(sub_array);
  }
}

Game.prototype.show_zeros = function(){
  var single_array = this.board[0].concat(this.board[1]).concat(this.board[2]).concat(this.board[3]);

  for(var i = 0; i < single_array.length; i++){
    if(single_array[i] === ""){
      single_array[i] = 0;
    }
  }
  // turn the single array back into it's original state
  this.board = [];
  for(var j = 0; j < single_array.length; j += 4){
    var sub_array = [];
    var num = (j + 4)
    for(var i = j; i < num; i++){
      sub_array.push(single_array[i])
    }
    this.board.push(sub_array);
  }
}

Game.prototype.insert_num = function(){
  // turn the board into one single array
  var single_array = this.board[0].concat(this.board[1]).concat(this.board[2]).concat(this.board[3]);
  // go through the single array and look for any 0's log their indexes
  var array_of_indexes = [];
  for(var i = 0; i < single_array.length; i++){
    if(single_array[i] === 0){
      array_of_indexes.push(i);
    }
  }
  // if there's any 0's...
  if (array_of_indexes.length > 0 ) {
    if (array_of_indexes.length > 1) {
      var random_index = Math.floor((Math.random() * array_of_indexes.length));
      var actual_index = array_of_indexes[random_index];
      } else {
      var actual_index = array_of_indexes[0];
    }
    single_array[actual_index] = 2;
  }
  // turn the single array back into it's original state
  this.board = [];
  for(var j = 0; j < single_array.length; j += 4){
    var sub_array = [];
    var num = (j + 4);
    for(var i = j; i < num; i++){
      sub_array.push(single_array[i]);
    }
    this.board.push(sub_array);
  }
}

Game.prototype.shift = function(array){
  for(var i = 0; i < array.length; i++){
    if( array[i+1] === 0 ){
      var temp = array[i];
      array[i] = array[i+1];
      array[i+1] = temp;
    }
  }
  return array;
}

Game.prototype.ultimateCompile = function(array){
  for(var i = 0; i < array.length; i++){
    if(array[i] === array[i+1] && array[i+1] === array[i+2] && array[i+2] === array[i+3]){
      temp = array[i+1]+array[i+2];
      array[i]=0;
      array[i+2]=0;
      array[i+1]=temp;
      array[i+3]=temp;
    } else if (array[i] === array[i+1] && array[i+1] === array[i+2]){
      temp = array[i+1]+array[i+2];
      array[i] = 0;
      array[i+2] = temp;
      i += 2;
    } else if( array[i] === array[i+1]){
      temp = array[i]+array[i+1];
      array[i] = 0;
      array[i+1] = temp;
      i += 1;
    }
  }
  return array;
}

Game.prototype.rotateLeft = function(){
  var rotated_board = [];
  for(var c = this.board.length-1 ; c >= 0; c--){
    var temp_array = [];
    for(var r = 0; r < this.board.length; r++){
      temp_array.push(this.board[r][c]);
    }
    rotated_board.push(temp_array);
  }
  this.board = rotated_board;
}

Game.prototype.rotateRight = function(){
  var rotated_board = [];
  for(var c = 0 ; c < this.board.length ; c++){
    var temp_array = [];
    for(var r = this.board.length-1; r >= 0; r--){
      temp_array.push(this.board[r][c]);
    }
    rotated_board.push(temp_array);
  }
  this.board =  rotated_board;
}
// user presses down key, board rotate to the left, shift & compile, board rotate to the right
Game.prototype.down_key = function(){
  this.rotateLeft();
  for(var i=0; i < this.board.length; i++){
    temp  = this.shift(this.board[i]);
    temp  = this.shift(temp);
    temp  = this.ultimateCompile(temp);
    temp  = this.shift(temp);
    this.board[i]  = this.shift(temp);
  }
  this.rotateRight();
}
// user presses up key, board rotate to the right, shift & compile, board rotate to the left
Game.prototype.up_key = function(){
  this.rotateRight();
  for(var i=0; i < this.board.length; i++){
    temp  = this.shift(this.board[i]);
    temp  = this.shift(temp);
    temp  = this.ultimateCompile(temp);
    temp = this.shift(temp); // <-- need to shift one more time...
    this.board[i]  = this.shift(temp);
  }
  this.rotateLeft();
}

Game.prototype.left_key = function(){
  for(var i=0; i< this.board.length; i++){
    temp = this.shift(this.board[i].reverse());
    temp = this.shift(temp);
    temp = this.ultimateCompile(temp);
    temp  = this.shift(temp);
    this.board[i] = this.shift(temp).reverse();
  }
}

Game.prototype.right_key = function(){
  for(var i=0; i<this.board.length; i++){
    temp = this.shift(this.board[i]);
    temp = this.shift(temp);
    temp = this.ultimateCompile(temp);
    temp  = this.shift(temp);
    this.board[i]  = this.shift(temp);
  }
}
