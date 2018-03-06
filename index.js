var playerPicto = ['X', 'O'];
var tour = 0;
var playerOne = 'guest 1';
var playerTwo = 'guest 2';

var players = [];

element(".one-player").addEventListener("click", function() {
    show('.play');
    hide('.control');
})

element(".next").addEventListener("click", function() {
    hide('.play');
    show('#stage');
    let playerOne = element('input[name="user-one"]').value !== '' || playerOne;
    players.push(playerOne);
    element('#message').innerHTML =  'Hello '+ playerOne ;
})

function show(selector) {
    element(selector).style.display = 'block';
}
function hide(selector) {
    element(selector).style.display = 'none';
}

let buttons = document.querySelectorAll("#stage span");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        if(this.innerHTML !=='X' && this.innerHTML !=='O'  && this.innerHTML !==' - ' && searchWinner( playerPicto[tour%2]) === false) {
           
            this.innerHTML = playerPicto[tour];
            if(searchWinner( this.innerHTML)) {
                element('#message').innerHTML = ` Stop Winner is  player ${ this.innerHTML} ! ` ;
                return false;
            }
           ++tour;
           tour= tour%2;
           element('#message').innerHTML ="Joueur " +  playerPicto[tour] + " c'est à vous !";
        }
    })

}

function searchWinner(player) {
    if( (buttons[0].innerHTML === player && buttons[1].innerHTML === player && buttons[2].innerHTML === player)
        || ( buttons[3].innerHTML === player && buttons[4].innerHTML === player && buttons[5].innerHTML === player)
        || ( buttons[6].innerHTML === player && buttons[7].innerHTML === player && buttons[8].innerHTML === player)
        || ( buttons[0].innerHTML === player && buttons[3].innerHTML === player && buttons[6].innerHTML === player)
        || ( buttons[1].innerHTML === player && buttons[4].innerHTML === player && buttons[7].innerHTML === player)
        || ( buttons[2].innerHTML === player && buttons[5].innerHTML === player && buttons[8].innerHTML === player)
        || ( buttons[0].innerHTML === player && buttons[4].innerHTML === player && buttons[8].innerHTML === player)
        || ( buttons[2].innerHTML === player && buttons[4].innerHTML === player && buttons[6].innerHTML === player)
    ) {
        return true;
    }
    return false;
}

var button = element("button[id=reset]");
button.addEventListener("click", function() {
  resetStage()
})

function resetStage() {
    let x = document.querySelectorAll("#stage span"),
        i;
    for (i = 0; i < x.length; i++) {
        x[i].innerHTML  = "&nbsp;"
    }
}

function log(element) {
    console.log(element);
}

function element(selector) {
    return document.querySelector(selector);
}


