
//Get html elements
const cells = document.querySelectorAll('.cell');
let gameActive = true;
let currTile = 0;

//Wordbank to generaate random word
const wordBank = ['which', 'their', 'there', 'would'
, 'other', 'these', 'about', 'first', 'could', 'after'
, 'those', 'where', 'being', 'under', 'years', 'great'
, 'state', 'world', 'three', 'while', 'found', 'might'
, 'still', 'right', 'place', 'every', 'power', 'since'
, 'given', 'never', 'order', 'water', 'small', 'shall'
, 'large', 'point', 'again', 'often', 'among', 'house'
, 'women', 'group', 'think', 'human', 'later', 'until'
, 'whole', 'early', 'means', 'above'];
let answer = wordBank[Math.floor(Math.random() * 50)];


// Event listeners to handle game start
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('restartButton').addEventListener('click', restartGame);
});


// whenever the user clicks the restart game button,
// we reinitialize the game state
//
function restartGame() {
    if (currTile != 25 & gameActive) {
        return
    }

    //Get new random word
    answer = wordBank[Math.floor(Math.random() * 50)]
    gameActive = true;

    //Reset cells
    cells.forEach(cell => {
        cell.value = "";
        cell.className = 'cell'; // Reset classes
    });
    for (let i=0; i<5; i++) {
        currCell = cells[i]
        currCell.classList.add("current")
        currCell.disabled = false
    }
    cells[0].classList.add("active");
    currTile = 0;
    console.log("Restarted")
}

//Keyboard Input
document.addEventListener("keyup", (e) => {
    if (gameActive == false) {
        return
    }

    let input = String(e.key)
    currCell = cells[currTile]

    //Perform action based on keyboard input
    //Backspace erase character and make previous cell activ cell
    //Enter evaluate guess and move to next row
    //Character fill cell move to next cell if available
    if (input == "Backspace") {
        currCell.value = ""
        if (currTile%5 != 0) {
            currCell.classList.remove('active')
            prevCell = cells[currTile-1]
            prevCell.classList.add("active")
            currTile -= 1
        }
        return

    } else if (input == "Enter") {
        if (currTile%5 == 4){
            currCell.classList.remove('active')
            let numCorrect = 0
            for (let i = 0; i<5; i++) {
                currCell = cells[currTile-i]
                currCell.classList.remove('current')
                currCell.disabled = true
                if (currCell.value == answer[4-i]) {
                    currCell.classList.add("correct")
                    numCorrect += 1
                    if (numCorrect == 5) {
                        gameActive = false
                        return
                    }
                } else if (answer.includes(currCell.value)) {
                    currCell.classList.add("close")
                } else {
                    currCell.classList.add("incorrect")
                }
            }

            currTile += 1
            currCell = cells[currTile]
            currCell.classList.add("active")
            for (let i=0; i<5; i++) {
                currCell = cells[currTile+i]
                currCell.disabled = false
                currCell.classList.add("current")
            }
        }
        if (currTile == 25) {
            gameActive = false
        }
        return
    }

    let regex = /^[a-zA-Z]/;

    if (!input.match(regex)) {
        return
    }
    currCell.value = input
    nextCell = cells[currTile + 1]
    if (nextCell.disabled == true) {
        return
    } else {
        currCell.classList.remove('active')
        nextCell.classList.add('active')
        currTile += 1
    }  
})

