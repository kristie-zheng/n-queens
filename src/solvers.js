/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var rooksOnBoard = 0;

  var board = new Board({'n': n});
  // console.log('board instantiated', board)
  if (n === 0) {
    //return board.rows(); 
    return [];
  }
  var innerRecursive = function(currentBoard) {
    if (rooksOnBoard === n) {
      // return board.rows(); 
      return board.rows();
    } else {
      for (var row = 0; row < n; row++) {
        for (var column = 0; column < n; column++) {
          if (board.get(row)[column] !== 1) {
            board.togglePiece(row, column);
            // console.log('currentboard', board)
            rooksOnBoard++;
            if (board.hasAnyRowConflicts() === false && board.hasAnyColConflicts() === false) {
              return innerRecursive(board);
            } else {
              board.togglePiece(row, column);
              rooksOnBoard--;
            }
          }
        }
      }
    }
  };

  innerRecursive(board);
  // console.log('this is whats returned by findNRooks', board.rows());
  return board.rows();
};

/*
input: an integer representing a board length and number of rooks to place
output: an array containing arrays that represent a nxn board with n rooks
constraints: none
edge cases: none

this function should: add n rooks to the board and return the first board where there are no horizontal and vertical conflicts

for var row = 0; row < n; row++ //this allows us to place the first piece anywhere on the nxn board
  for var column = 0; col < n; col++
    if there is not a piece at (row, col)
      add a piece
        call the func recursively on the board that now has a piece ONLY if it has no vertical or horizntal conflicts
  stop recursion when num of rooks on the board is equal to n
if array()



//declare counter = n
//1)iterate each spot of the board while placing the piece  
  //leave the piece at the first spot without conflicts//item
  //n - 1
//2)recurse to step 1)
//stops when n moves are placed 
//or when reaching end of the board with <n moves places 
//return the solution 

*/

window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var rooksOnBoard = 0;
  var board = new Board({'n': n});
  var history = {};
  // if (n === 2) {  
  //   debugger;
  // }
  var innerRecursive = function() {
    if (history[JSON.stringify(board.rows())] !== undefined) {
      return;
    }

    if (rooksOnBoard === n) {
      solutionCount++;
      history[JSON.stringify(board.rows())] = 1;
      return;
    }

    for (var row = 0; row < n; row++) {
      // console.log('')
      for (var column = 0; column < n; column++) {
        if (board.get(row)[column] !== 1) {
          board.togglePiece(row, column);
          if (board.hasAnyRowConflicts() === false && board.hasAnyColConflicts() === false) {
            rooksOnBoard++;
            innerRecursive();
            rooksOnBoard--;
          }
          
          history[JSON.stringify(board.rows())] = 1;
          board.togglePiece(row, column);
        }
      }
    }
  };
  innerRecursive();

  // solutionCount = Object.keys(history).length;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({'n': n});
  if (n === 0 || n === 2 || n === 3) {
    return null;
  } else if (n === 1) {
    return [[1]];
  }
  var checkFuturePlacements = function(board, colToStart) {
    var result;
    if (colToStart >= n) {
      return board.rows();
    }
    for (var row = 0; row < n; row++) {
      board.togglePiece(row, colToStart);
      if (anyConflicts(board) === false) {
        result = checkFuturePlacements(board, colToStart + 1);
        if (result !== undefined) {
          return result;
        }
      }
      board.togglePiece(row, colToStart);
    }
  };
  var anyConflicts = function(board) {
    var hasConflict = false;
    if (board.hasAnyColConflicts() === true || board.hasAnyRowConflicts() === true || board.hasAnyMinorDiagonalConflicts() === true || board.hasAnyMajorDiagonalConflicts() === true) {
      hasConflict = true;
    }
    return hasConflict;
  };

  for (var i = 0; i < n; i++) {
    board.togglePiece(i, 0);
    var result = checkFuturePlacements(board, 1);
    if (result !== undefined) {
      return result;
    } else {
      board.togglePiece(i, 0);
    }
    

  }

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var queensOnBoard = 0;
  var board = new Board({'n': n});
  var history = {};
  var innerRecursive = function() {
    if (history[JSON.stringify(board.rows())] !== undefined) {
      return;
    }
    if (queensOnBoard === n) {
      solutionCount++;
      history[JSON.stringify(board.rows())] = 1;
      return;
    }
    for (var row = 0; row < n; row++) {
      // console.log('')
      for (var column = 0; column < n; column++) {
        if (board.get(row)[column] !== 1) {
          board.togglePiece(row, column);
          if (board.hasAnyRowConflicts() === false && board.hasAnyColConflicts() === false && board.hasAnyMinorDiagonalConflicts() === false && board.hasAnyMajorDiagonalConflicts() === false) {
            queensOnBoard++;
            innerRecursive();
            queensOnBoard--;
          }
          history[JSON.stringify(board.rows())] = 1;
          board.togglePiece(row, column);
        }
      }
    }
  };
  innerRecursive();
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};
