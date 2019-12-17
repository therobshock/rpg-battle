var playerHP = 20;
var opponentHP = 20;
var wins = 0;
var losses = 0;

var displayWins = document.getElementById("wins");
var displayPlayerHP = document.getElementById("player-hp");
var displayOppHP = document.getElementById("opponent-hp");

var player = document.getElementById("player");
var opponent = document.getElementById("opponent");

var gameDialog1 = document.getElementById("dialog1");
var gameDialog2 = document.getElementById("dialog2");
var gameDialog3 = document.getElementById("dialog3");
var gameDialog4 = document.getElementById("dialog4");

var actionButtons = document.getElementById("action-buttons");
var startButton = document.getElementById("new-game");

function gameStart() {
    playerHP = 20;
    opponentHP = 20;
    actionButtons.style.display = "block";
    player.style.backgroundColor = "orange";
    opponent.style.backgroundColor = "orange";
    startButton.style.display = "none";
    gameDialog1.innerHTML = "Begin Battle!";
    gameDialog2.innerHTML = "";
    gameDialog3.innerHTML = "";
    gameDialog4.innerHTML = "";
    displayStats();
}

gameStart();

function displayStats() {
    displayWins.innerHTML = `Wins: ${wins} Losses: ${losses}`;
    displayPlayerHP.innerHTML = `Player HP: ${playerHP}`;
    displayOppHP.innerHTML = `Oppenent HP: ${opponentHP}`;
}

function choiceFunction(choice) {
    var playerChoice = parseInt(choice);
    var opponentChoice = Math.floor(Math.random() * 2);
    var buttonOptions = ["Attack", "Defend", "Magic"];
    var actionColors = ["blue", "green", "red"];
    var advantage;
    var bonus = 3;

    console.log(`Player: ${playerChoice} Opponent: ${opponentChoice}`);

    charMove("player");
    charMove();

    gameDialog1.innerHTML = `Player chooses ${buttonOptions[playerChoice]}. Oppenent chooses ${buttonOptions[opponentChoice]}.`;
    player.style.backgroundColor = actionColors[playerChoice];
    opponent.style.backgroundColor = actionColors[opponentChoice];

    console.log(actionColors[playerChoice] + " | " + actionColors[opponentChoice]);

    if (playerChoice === opponentChoice + 1 || playerChoice === opponentChoice - 2) {
        console.log(`Player advantage`);
        gameDialog1.append(" Player Advantage!");
        advantage = "player";
    } else if (opponentChoice === playerChoice) {
        console.log(`Draw`);
        bonus = 0;
    } else {
        console.log(`Opponent advantage`);
        gameDialog1.append(" Oppenent advantage!")
        advantage = "opponent";
    }
    rollForDamage(advantage, bonus);
}

function rollForDamage(mod, bonus) {
    var playerRoll = Math.floor(Math.random() * 6) + 1
    var opponentRoll = Math.floor(Math.random() * 6) + 1
    var damage = 0;
   if (mod) {
       if (mod == "player") {
            playerRoll += bonus;
       } else {
            opponentRoll += bonus;
       }
   }
   console.log(`Player roll: ${playerRoll} Opponent roll: ${opponentRoll}`)
   if (playerRoll > opponentRoll) {
        damage = playerRoll - opponentRoll;
        opponentHP -= damage; 
        console.log("Player deals damage");
        gameDialog2.innerHTML = `Player deals ${damage} damage!`;
   } else if (opponentRoll > playerRoll) {
       damage = opponentRoll - playerRoll;
       playerHP -= damage;
       console.log("Opponent deals damage");
       gameDialog2.innerHTML = `Opponent deals ${damage} damage!`;
   } else {
       gameDialog2.innerHTML = `No damage!`;
   }
    console.log(`Damage: ${damage}`);
    
    if (playerHP <= 0) {
        playerHP = 0;
        gameOver(false);
    }
    if (opponentHP <= 0) {
        opponentHP = 0; 
        gameOver(true);
    }
    displayStats();
}

function gameOver(win) {
    actionButtons.style.display = "none";
    startButton.style.display = "block";
    if (win) {
        wins++;
        console.log("Victory!");
        gameDialog3.innerHTML = "Player is victorious!";
        
    } else {
        losses++;
        console.log("Defeat!");
        gameDialog3.innerHTML = "Player is defeated!";
    }
    displayStats();
    console.log("Play Again");
    gameDialog4.innerHTML = "Play Again?";
}

function charMove(char) {
  var pos = 0;
  var id = setInterval(frame, 5);
  var start = start;

  function frame() {
    if (pos == 250) {
      clearInterval(id);
    } else {
        if (char == "player") {
            pos += 2; 
            player.style.left = pos + "px"; 
        } else {
            pos++; 
            opponent.style.right = pos + "px"; 
        }
    }
  }
}