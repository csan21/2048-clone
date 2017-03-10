$(document).ready(function() {
  game = new Game();

  function render_board(){
    array_of_rows = $("table#256_table tr");
    for( var r = 0; r < array_of_rows.length; r++ ){
      for( var c = 0; c < array_of_rows.length; c++){
        $($(array_of_rows[r]).children()[c]).html(game.board[r][c]);
        }
      }
    }
  // hide zeroes on that board
  game.hide_zeros();
  // render the board in the beginning
  render_board();
  // put the zeros on that board
  game.show_zeros();

  Mousetrap.bind('up', function(){
   game.up_key();
   // insert the number
   game.insert_num();
   // hide the zeroes
   game.hide_zeros();
   // show the board
   render_board();
   // puts the zeroes back where they were
   game.show_zeros();
  }, 'keyup');

  Mousetrap.bind('down', function(){
    game.down_key();
    game.insert_num();
    game.hide_zeros();
    render_board();
    game.show_zeros();
  }, 'keyup');

  Mousetrap.bind('left', function(){
    game.left_key();
    game.insert_num();
    game.hide_zeros();
    render_board();
    game.show_zeros();
  }, 'keyup');

  Mousetrap.bind('right', function(){
    game.right_key();
    game.insert_num();
    game.hide_zeros();
    render_board();
    game.show_zeros();
  }, 'keyup');
});
