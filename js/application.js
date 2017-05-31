$(document).ready(function() {
  game = new Game();

  function renderBoard(){
    arrayOfRows = $("table#256-table tr");
    for(var r = 0; r < arrayOfRows.length; r++ ){
      for(var c = 0; c < arrayOfRows.length; c++){
        $($(arrayOfRows[r]).children()[c]).html(game.board[r][c]);
        }
      }
    }
  // hide zeroes on that board
  game.hideZeros();
  // render the board in the beginning
  renderBoard();
  // put the zeros on that board
  game.showZeros();

  Mousetrap.bind('up', function(){
   game.upKey();
   // insert the number
   game.insertNum();
   // hide the zeroes
   game.hideZeros();
   // show the board
   renderBoard();
   // puts the zeroes back where they were
   game.showZeros();
  }, 'keyup');

  Mousetrap.bind('down', function(){
    game.downKey();
    game.insertNum();
    game.hideZeros();
    renderBoard();
    game.showZeros();
  }, 'keyup');

  Mousetrap.bind('left', function(){
    game.leftKey();
    game.insertNum();
    game.hideZeros();
    renderBoard();
    game.showZeros();
  }, 'keyup');

  Mousetrap.bind('right', function(){
    game.rightKey();
    game.insertNum();
    game.hideZeros();
    renderBoard();
    game.showZeros();
  }, 'keyup');
});
