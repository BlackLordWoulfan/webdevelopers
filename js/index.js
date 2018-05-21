var MYAPP = MYAPP || {
  gameInPlay: false,
  winCombos: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [7, 5, 3]
  ],
  playerOneScore: 0,
  playerTwoScore: 0,
  timeOuts: [],
  initializeVars: function() {
    this.numFilledIn = 0;
    this.currentBoard = {
      1: '',
      2: '',
      3: '',
      4: '',
      5: '',
      6: '',
      7: '',
      8: '',
      9: ''
    };
  },
  initializeGame: function() {
    MYAPP.initializeVars();
    MYAPP.display.drawBoard();
    $('.game-choice button').click(function() {
      MYAPP.secondPlayer = MYAPP.game.gameSelection(this);
      MYAPP.display.hideGameChoice();
      MYAPP.display.showGameStarter(MYAPP.secondPlayer);
      $('.game-starter .choose-x, .game-starter .choose-o').off().click(MYAPP.game.firstGame);

      $('.back-button').on('click', function() {
        MYAPP.display.hideGameStarter();
        MYAPP.display.showGameChoice();
      });
    });
    $('.hard-reset').on('click', MYAPP.game.resetGame);
  }
};

  /*=========================
      Display functions
==========================*/
MYAPP.display = {  
  hideGameStarter: function() {
  $('.game-starter').fadeOut();
},

  showGameStarter: function(isTwoPlayer) {
  var message;
  if (isTwoPlayer) {
    message = "Игрок 1 : Выберите метку"
  }
  else {
    message = "Выберите метку";
  }
  MYAPP.timeOuts.push(
    setTimeout(function() {
      $('.game-starter').fadeIn(500).children('p').text(message);
  }, 700));
},

  showGameChoice: function() {
  $('.game-choice').fadeIn(600);
},

  hideGameChoice: function() {
  $('.game-choice').fadeOut(600);
},

  showPlayerOnePrompt: function() {
  if (MYAPP.secondPlayer) {
    $('.player-one-turn p').text('1 игрок');
  }
  else {
    $('.player-one-turn p').text('Ваш ход');
  }
  $('.player-one-turn').animate({'top': '-50px'}, 500);
},

  hidePlayerOnePrompt: function() {
  $('.player-one-turn').animate({'top': '0'}, 500);
},

  showPlayerTwoPrompt: function() {
  if (MYAPP.secondPlayer) {
    $('.player-two-turn p').text('2 игрок');
  }
  else {
    $('.player-two-turn p').text('Компьютер');
  }
  $('.player-two-turn').animate({'top': '-50px'}, 500);
},

  hidePlayerTwoPrompt: function() {
  $('.player-two-turn').animate({'top': '0'}, 500);
},

  showDrawMessage: function() {
  MYAPP.timeOuts.push(
    setTimeout(function() {
    $('.draw-message').fadeIn(500);
  }, 1500));
},

  hideDrawMessage: function() {
  $('.draw-message').fadeOut(1000);
},

  showLoseMessage: function() {
    MYAPP.timeOuts.push(
      setTimeout(function() {
    $('.lose-message').fadeIn(500);
}, 1500)
    );
},

  hideLoseMessage: function() {
  $('.lose-message').fadeOut(1000);
},

  showWinMessage: function() {
    MYAPP.timeOuts.push(
      setTimeout(function() {
    $('.win-message').fadeIn(500).children('p').text("Игрок " + MYAPP.turn + " выиграл ")
}, 1500));
},

  hideWinMessage: function() {
  $('.win-message').fadeOut(1000);
},

  drawBoard: function() {
    MYAPP.timeOuts.push(setTimeout(function() {
    var c = document.getElementById("myCanvas");
    var canvas = c.getContext("2d");
    canvas.lineWidth = 1;
    canvas.strokeStyle = "#fff";
    //vertical lines
    canvas.beginPath();
    canvas.moveTo(100, 0);
    canvas.lineTo(100, 146.5);
    canvas.closePath();
    canvas.stroke();
    canvas.beginPath();
    canvas.moveTo(200, 0);
    canvas.lineTo(200, 146.5);
    canvas.closePath();
    canvas.stroke();

    // horizontal lines
    canvas.lineWidth = .5;

    canvas.beginPath();
    canvas.moveTo(4, 48.5);
    canvas.lineTo(296, 48.5);
    canvas.closePath();
    canvas.stroke();
      
    canvas.beginPath();
    canvas.moveTo(4, 98.5);
    canvas.lineTo(296, 98.5);
    canvas.closePath();
    canvas.stroke();  
  }, 1500));
},

  resetSquares: function() {
  $('.boxes').html('');
  for (var i = 1; i <= 9; i++) {
    var box = '<li class="' + i + '"><i class="letter"><span></span></i></li>';
    $(box).appendTo($('.boxes'));
  }
},
  
  showScore: function() {
    if (MYAPP.secondPlayer) {
      $('.score-1').children('.name').text('1 игрок'); 
      $('.score-2').children('.name').text('2 игрок'); 
    }
    else {
      $('.score-1').children('.name').text('Вы'); 
      $('.score-2').children('.name').text('Компьютер'); 
    }
    $('.score-1, .score-2').children('.points').text('0');
    $('.score-1,.score-2, .points-divider').fadeIn();
  },
  updateScore: function(turn) {
    var currentScore = turn === 1 ? MYAPP.playerOneScore : MYAPP.playerTwoScore;

    $('.score-' + turn).children('.points').text(currentScore);
  }
};
