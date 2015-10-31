$(document).ready(function(){

  var currentNumBlocks;
  var $selectedBlock = null;

  restart();

  $('#input-numBlocks').on('input', function() {
    $(numBlocks).text( $(this).val() );
  });

  $('#restart').click(restart);

  $('.area').click(areaClicked);

  $('#solve').click(solve);

  function areaClicked() {
    var areaClicked = this.id;

    if ($selectedBlock) {
      var areaOfSelected = $selectedBlock.parent().attr('id');

      if (areaClicked !== areaOfSelected) {
        var moved = move(areaOfSelected, areaClicked);
        if (moved) toggleSelected( areaClicked );
      } else {
        toggleSelected( areaClicked );
      }
      
    } else {
      toggleSelected( areaClicked );
    }
  }

  function generateBlocks(n) {
    var rainbow = ['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'purple', 'black']
    var areaWidth = +$('#start').css('width').slice(0,-2);
    
    var $blocks = [];

    for (var i = 1; i <= n; i++) {
      var $block = $('<div>');
      $block.attr('id', i);

      var widthPercent = (15 + (i-1) * 75 / (n-1)); // 15% .. 90%
      var widthPixels = 0.01 * widthPercent * areaWidth;
      $block.css('width', widthPercent + '%');
      $block.css('bottom', ((n - i) * 50) + 'px');
      $block.css('left', ((areaWidth - widthPixels) / 2) + 'px');
      $block.css('background-color', rainbow[i - 1]);

      $blocks.push( $block );
    }

    $('#start').append( $blocks );
  }

  // highlight the top block in the specified area
  function toggleSelected(area) {
    var $block = $('#' + area).children().first();
    $block.toggleClass('selected');
    $selectedBlock = $block.hasClass('selected') ? $block : null;
  }

  // move the top block from fromArea to toArea if legal
  function move(fromArea, toArea) {
    var $block = $('#' + fromArea).children().first();
    var highestBlockInDest = $('#' + toArea).children().first().attr('id');
    if (!highestBlockInDest) highestBlockInDest = Infinity;

    if (+$block.attr('id') < +highestBlockInDest) {
      $('#' + toArea).prepend( $block );
      position($block);
      if (isWinState()) $('#winMessage').text('You Win!');
      return true;
    } else {
      return false;
    }
  }

  // correctly position a newly moved block
  function position($block) {
    var nextBlock = $block.next();
    var posOfNext = nextBlock.length ? nextBlock.css('bottom') : '-50px';
    var moveToPos = (+posOfNext.slice(0, -2) + 50) + 'px';
    $block.css('bottom', moveToPos); 
  }

  function isWinState() {
    return $('#1').parent().attr('id') === "goal" &&
      $('#' + currentNumBlocks).parent().attr('id') === "goal";
  }

  function restart() {
    $('#winMessage').empty();
    $('#gameboard .area').empty();
    currentNumBlocks = +$('#input-numBlocks').val();
    generateBlocks( currentNumBlocks );
  }

  function solve() {
    console.log('woot');
  }

});








