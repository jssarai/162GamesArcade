
//Get html element
const cells = document.querySelectorAll('.cell');
let streak = 0;
let cellNums = []

//Get values of both difficulty options
function getDifficulty() {
	let diffArr = []
    let radios = document.getElementsByName('boarddifficulty');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            diffArr[0] = radios[i].value;
        }
    }
	radios = document.getElementsByName('timedifficulty');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            diffArr[1] = radios[i].value;
        }
    }
	return diffArr
}

//Handle guess on cell
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
	
	//Correct cell
	if (cellNums[streak] == clickedCellIndex) {
		clickedCell.classList.add("correct")
		clickedCell.innerHTML = String(streak+1)
		streak += 1
		if (streak == cellNums.length) {
			unhideCells()
		}
	} else {
		clickedCell.classList.add("incorrect")
		gameActive = false
		unhideCells()
	}
}

//hide numbers function used after memorization period over
function hideCells() {
	cells.forEach(cell => cell.classList.remove("empty"));
	cells.forEach(cell => cell.innerHTML = null);
	cells.forEach(cell => cell.disabled = false);
	cells.forEach(cell => cell.addEventListener('click', handleCellClick));
}

//Clears all output from game
function handleClear() {
	cells.forEach(cell => cell.className = "cell");
	cells.forEach(cell => cell.innerHTML = null);
	cells.forEach(cell => cell.disabled = true);
}

//Reveals cells once game complete
function unhideCells() {
	for (let i = streak; i<cellNums.length; i++) {
		cells[cellNums[i]].innerHTML = String(i+1)
	}
	cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
}

//Initialize game
function startGame() {
	streak = 0
	cellNums = []
	cells.forEach(cell => cell.innerHTML = null);
	cells.forEach(cell => cell.className = "cell");

	//Get difficulty settings
	let diffArr = getDifficulty()
	boardDiff = diffArr[0]
	timeDiff = diffArr[1]

	let nums = 25
	let time = 3000
	if (boardDiff == "easy") {
		nums = 5
	} else if (boardDiff == "medium") {
		nums = 10
	} else {
		nums = 25
	}


	if (timeDiff == "easy") {
		time = 10000
	} else if (timeDiff == "medium") {
		time = 5000
	} else {
		time = 3000
	}

	//Randomly place numbers in cells
	let placed = []
	let cell = null
	let j = null
	for (let i = 1; i<=nums; i++) {
		j = Math.floor(Math.random() * 25)
		while (placed.includes(j)) {
			j = Math.floor(Math.random() * 25)
		}
		cell = cells[j]
		cell.innerHTML = String(i)
		cellNums.push(j)
		placed.push(j)
	}

	//Show numbers
	//Set timer for memorization period
	cells.forEach(cell => cell.classList.add("empty"));
	setTimeout(hideCells, time)
}