class Cell {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.alive = true;
    }

    show() {
        if (this.alive) {
            fill(0, 255, 0);
        } else {
            delete this.x
            delete this.y
        }
        rect(this.x, this.y, 10, 10);
    }
}


let cell, cellCount = []
function randomNumberRounded(len) {
    var rand = Math.floor(Math.random() * (len/10)) * 10
    console.log(rand)
    return rand
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(5)
}

function setupGrid() { // creates the grid with 10 pixels in between each cell.
    for(let i = 0; i < windowWidth; i+=10) {
        line(i, 0, i, Math.floor(windowHeight / 10) * 10);
    }
    for(let i = 0; i < windowHeight; i+=10) {       
        line(0, i, Math.floor(windowWidth/10)*10, i);
    }
}
function createCell() {
    if(cellCount < 2000) {     
        for(let i = 0; i < 2000; i++) {
            cellCount[i] = new Cell(randomNumberRounded(windowWidth), randomNumberRounded(windowHeight))
            cellCount[i].show()
        }
    }
}

function moveCell() {
    // This is a KISS implementation of the movement system
    var dir = [-10,10]
    cellCount.forEach(cell => {
        Math.floor(Math.random() * 2) == 0 ? 
            cell.x += dir[Math.floor(Math.random()*2)] : cell.y += dir[Math.floor(Math.random()*2)]

        cell.x = constrain(cell.x, 0, Math.floor(windowWidth/10)*10 - 10)
        cell.y = constrain(cell.y, 0, Math.floor(windowHeight / 10) * 10 - 10)
        cell.show()
    })
}

function countNeighbor() {
    var map = {}
    var neighborCount = 0
    var counter = 0
    cellCount.forEach(cell => {
        map[counter] = cell
        counter++
    })
    for(let i = 0; i < cellCount.length; i++) {
        for(let j = 0; j < cellCount.length; j++) {
            if((map[i].x == map[j].x + 10 && map[i].y == map[j].y + 10) || (map[i].x == map[j].x - 10 && map[i].y == map[j].y - 10) || (map[i].x == map[j].x + 10 && map[i].y == map[j].y - 10) || (map[i].x == map[j].x - 10 && map[i].y == map[j].y + 10)) {
                neighborCount++
            }
        }
        if(!(neighborCount == 3 || neighborCount == 2)) {
            map[i].alive = false
        }
        neighborCount = 0
    }
    map = {}
    counter = 0
}

function draw() {
    background(255);
    strokeWeight(1);
    stroke(0);
    setupGrid()
    createCell()
    moveCell()
    countNeighbor()
}

/*
The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

    Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    Any live cell with two or three live neighbours lives on to the next generation.
    Any live cell with more than three live neighbours dies, as if by overpopulation.
    Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

These rules, which compare the behavior of the automaton to real life, can be condensed into the following:

    Any live cell with two or three live neighbours survives.
    Any dead cell with three live neighbours becomes a live cell.
    All other live cells die in the next generation. Similarly, all other dead cells stay dead.

The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed, live or dead; births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick.[nb 1] Each generation is a pure function of the preceding one. The rules continue to be applied repeatedly to create further generations. 
*/