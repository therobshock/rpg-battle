var playerHP = 20;
var opponentHP = 20;
var wins = 0;
var losses = 0;

var displayWins = document.getElementById("wins");
var displayPlayerHP = document.getElementById("player-hp");
var displayOppHP = document.getElementById("opponent-hp");

var player = document.getElementById("player");
var opponent = document.getElementById("opponent");

var characters = document.getElementsByClassName("character");

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
    var opponentChoice = Math.floor(Math.random() * 3);
    var buttonOptions = ["Attack", "Defend", "Magic"];
    var actionColors = ["blue", "green", "red"];
    var advantage;
    var bonus = 3;

    actionButtons.style.display = "none";

    console.log(`Player: ${playerChoice} Opponent: ${opponentChoice}`);

    gameDialog1.innerHTML = `Player chooses ${buttonOptions[playerChoice]}. Oppenent chooses ${buttonOptions[opponentChoice]}.`;
    gameDialog2.innerHTML = "";
    player.style.backgroundColor = actionColors[playerChoice];
    opponent.style.backgroundColor = actionColors[opponentChoice];

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
        animateAttack(player, true, function() {checkScore();});
        animateAttack(opponent, false, function(){
          console.log("Player deals damage");
          gameDialog2.innerHTML = `Player deals ${damage} damage!`;
        }); 
   } else if (opponentRoll > playerRoll) {
       damage = opponentRoll - playerRoll;
       playerHP -= damage;
       animateAttack(opponent, true, function() {checkScore();});
       animateAttack(player, false, function() {
         console.log("Opponent deals damage");
         gameDialog2.innerHTML = `Opponent deals ${damage} damage!`;
       });
   } else {
       animateAttack(player, true, function() {checkScore();});
       animateAttack(opponent, true, function() {
           gameDialog2.innerHTML = `No damage!`;
       });
   }
    console.log(`Damage: ${damage}`);
    
}

function checkScore() {
    if (playerHP <= 0) {
        playerHP = 0;
        gameOver(false);
    } else if (opponentHP <= 0) {
        opponentHP = 0; 
        gameOver(true);
    } else {
        actionButtons.style.display = "block";
        displayStats();
    }

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

function animateAttack(char, success, next) {
    var pos = 0;
    var id = setInterval(frame, 5);
    var end = false;
    var pass = false;
    
    function frame() {
        if (pos === 0 && pass) {
            end = true;
        }
        if (pos === 250) {
            pass = true;
        }
        if (end) {
            clearInterval(id);
            return next();
        } else {
            if (!pass) {
                pos++;

            } else {
                if (success) {
                    pos--;
                } else {
                    pos -= 5;
                }
            }
            if (char === player) {
                char.style.left = pos + "px";
            } else if (char === opponent) {
                char.style.right = pos + "px";
            } 
        }
    }
}