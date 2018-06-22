window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var rooksOnBoard = 0;
  var board = new Board({'n': n});
  var totalObj = {};
  if (n === 2) {  
    debugger;
  }
  var innerRecursive = function(currentBoard) {
    if (rooksOnBoard === n) {
      totalObj[JSON.stringify(board.rows())] = 1;
    } else {
      for (var row = 0; row < n; row++) {
        // console.log('')
        for (var column = 0; column < n; column++) {
          if (board.get(row)[column] !== 1) {
            board.togglePiece(row, column);
            if (board.hasAnyRowConflicts() === false && board.hasAnyColConflicts() === false) {
              rooksOnBoard++;
              innerRecursive(board);
              rooksOnBoard--;
              board.togglePiece(row, column);
            } else {
              board.togglePiece(row, column);
            }
          }
        }
      }
    }
  };
  innerRecursive(board);

  solutionCount = Object.keys(totalObj).length;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};