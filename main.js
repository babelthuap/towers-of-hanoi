$(document).ready(function(){


  var $selectedBlock = null;

  $('.area').click(function(e){
    console.log('clicked', this.id);
    var areaClicked = this.id;

    if ($selectedBlock) {
      var areaOfSelected = $selectedBlock.parent().attr('id')

      if (areaClicked !== areaOfSelected) {
        var moved = move(areaOfSelected, areaClicked);
        if (moved) toggleSelected( areaClicked );
      } else {
        toggleSelected( areaClicked );
      }

    } else {
      toggleSelected( areaClicked );
    }
  });


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
      return true;
    } else {
      console.log('invalid move');
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

});
