var playerMax = 20;
var opponentMax = 20;

var playerHP = playerMax;
var opponentHP = opponentMax;
var wins = 0;
var losses = 0;

var scoreboard = document.getElementById("scoreboard");
var displayWins = document.getElementById("wins");

var battlefield = document.getElementById("battlefield");

var displayPlayerHP = document.getElementById("player-hp");
var displayOppHP = document.getElementById("opponent-hp");

var healthBars = document.getElementsByClassName("health-bar");

var playerHealthBar = document.getElementById("player-health");
var opponentHealthBar = document.getElementById("opponent-health");

var player = document.getElementById("player");
var opponent = document.getElementById("opponent");

var gameDialog1 = document.getElementById("dialog1");
var gameDialog2 = document.getElementById("dialog2");

var actionButtons = document.getElementById("action-buttons");
var startButton = document.getElementById("start");

function gameStart() { // start button function
    playerHP = playerMax; // sets health stat
    opponentHP = opponentMax;

    toggleHealthbars("block"); // displays health bars

    actionButtons.style.display = "block"; // displays actionbuttons
    startButton.style.display = "none"; // hides start button
    
    gameDialog1.innerHTML = "Begin Battle!";
    gameDialog2.innerHTML = "Choose Action to Battle!";
    
    displayStats();
}

function toggleHealthbars(toggle) {
    for (var i = 0; i < healthBars.length; i++) {
        healthBars[i].style.display = toggle;
    }
}

function displayStats() { // updates stats
    displayWins.innerHTML = `Wins: ${wins} Losses: ${losses}`;
    displayPlayerHP.innerHTML = `Player HP: ${playerHP}`;
    displayOppHP.innerHTML = `Oppenent HP: ${opponentHP}`;

    player.style.backgroundImage = "url(images/helmet_02c.png)";
    opponent.style.backgroundImage = "url(images/helmet_02e.png)";
    
    updateStatbar(playerHealthBar, playerHP, playerMax);
    updateStatbar(opponentHealthBar, opponentHP, opponentMax);
}

function updateStatbar(bar, stat, max) {
    var multiplier = 100 / max;
    var barSize = stat * multiplier;
    bar.style.width = barSize + "%";
}

function choiceFunction(choice) { // gets action button value
    var playerChoice = parseInt(choice); /* Action button gets value */
    var opponentChoice = Math.floor(Math.random() * 3); /* opponent random value between 0 and 2 */
    var buttonOptions = ["Attack", "Defend", "Magic"]; /* Choices for dialogue */
    var actionImages = ["url(images/sword_02c.png)", "url(images/shield_03b.png)", "url(images/staff_03d.png)"]; /* images for each choice */
    var advantage; /* for RPS comparison */
    var bonus = true; /* bonus to be added if advantage */

    actionButtons.style.display = "none"; /* hide action buttons to avoid reclick before end sequence */

    console.log(`Player: ${playerChoice} Opponent: ${opponentChoice}`);

    gameDialog1.innerHTML = `Player chooses ${buttonOptions[playerChoice]}. Oppenent chooses ${buttonOptions[opponentChoice]}.`;
    gameDialog2.innerHTML = "";
    player.style.backgroundImage = actionImages[playerChoice]; /* image depending on choice */
    opponent.style.backgroundImage = actionImages[opponentChoice];

    // RPS comparison 0 beats 2 beats 1 beats 0
    // if player choice is 1 more or 2 less than oppenent then player advantage
    if (playerChoice === opponentChoice + 1 || playerChoice === opponentChoice - 2) {
        console.log(`Player advantage`);
        gameDialog1.append(" Player Advantage!");
        advantage = "player";
    // if draw then no bonus
    } else if (opponentChoice === playerChoice) {
        console.log(`Draw`);
        bonus = false;
    // else opponent advantage
    } else {
        console.log(`Opponent advantage`);
        gameDialog1.append(" Oppenent advantage!")
        advantage = "opponent";
    }
    rollForDamage(advantage, bonus); /* advantage and bonus passed to roll function */
}

// die roll 1 to 6
function rollForDamage(mod, bonus) {
    var playerRoll = Math.floor(Math.random() * 6) + 1
    var opponentRoll = Math.floor(Math.random() * 6) + 1
    var damage = 0;
   
    if (bonus) { // adds bonus according to modifier
       if (mod == "player") {
            playerRoll += 3;
       } else {
            opponentRoll += 3;
       }   
    }
   
   console.log(`Player roll: ${playerRoll} Opponent roll: ${opponentRoll}`)

   if (playerRoll > opponentRoll) { // reduces HP stat according to difference in roll
        damage = playerRoll - opponentRoll;
        opponentHP -= damage;
        // then animates onscreen characters
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

   } else { // no damage if draw
       animateAttack(player, true, function() {checkScore();});
       animateAttack(opponent, true, function() {
           gameDialog2.innerHTML = `No damage!`;
       });
   }
    console.log(`Damage: ${damage}`);  
}

// checkscore function to determine if game is over
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

// gameover function with win boolean
function gameOver(win) {
    actionButtons.style.display = "none";
    startButton.style.display = "block";

    if (win) {
        wins++;
        displayStats();
        console.log("Victory!");
        gameDialog1.innerHTML = "Player is victorious!";
        opponent.style.backgroundImage = "url(images/death.png)";
    } else {
        losses++;
        displayStats();
        console.log("Defeat!");
        gameDialog1.innerHTML = "Player is defeated!";
        player.style.backgroundImage = "url(images/death.png)";
    }

    console.log("Play Again");
    gameDialog2.innerHTML = "Play Again?";
}

// character animation function according to character, boolean, and a callback function after end
function animateAttack(char, success, next) {
    var pos = 0;
    var id = setInterval(frame, 5);
    var end = false;
    var pass = false;
    
    function frame() {
        if (pos === 0 && pass) {
            end = true;
        }
        if (pos === 150) {
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
