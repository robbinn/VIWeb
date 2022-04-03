let source;
let pieces = [];
let cols = 4;
let rows = 4;
let board = [];
let w,h;


function preload() {
    let pics = ["../../static/asset/sp1.png", "../../static/asset/sp2.png"];
    let pic = Math.floor(Math.random() * 2); // 0 or 1
    source = loadImage(pics[pic]);

    let img = document.getElementById("pic");
    img.setAttribute("src", pics[pic]);

}

function setup() {
    createCanvas(600, 600);

    w = width / cols;
    h = height / rows;

    for (let i=0; i<cols; i++) {
        for (let j=0; j<rows; j++) {
            let x = i * w;
            let y = j * h;
            let img = createImage(w,h);
            img.copy(source, x, y, w, h, 0, 0, w, h);
            let index = i + j * cols;
            board.push(index);
            let piece = new Puzzle_piece(index, img);
            pieces.push(piece);
        }
    }

    pieces.pop();
    board.pop();
    board.push(-1);

    s_shuffle(board);
}

function mousePressed() {
    let i = min(floor(mouseX / w),rows-1);
    let j = min(floor(mouseY / h),cols-1);
    i = max(i,0);
    j = max(j,0);
    move(i, j, board);
}

function touchStarted() {
    let i = min(floor(mouseX / w),rows-1);
    let j = min(floor(mouseY / h),cols-1);
    i = max(i,0);
    j = max(j,0);
    move(i, j, board);
}

function draw() {
    background(0);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let index = i + j * cols;
            let x = i * w;
            let y = j * h;
            let pieceIndex = board[index];

            if (pieceIndex > -1) {
                let img = pieces[pieceIndex].img;
                image(img, x, y);
            }
        }
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * w;
            let y = j * h;
            strokeWeight(2);
            noFill();
            rect(x,y,w,h);
        }
    }

    if (isSolved()) {
        let solve = document.getElementById("solve");
        solve.innerHTML = 'Wow, congratulations!';
        noLoop();
    }
}

function isSolved() {
    for (let i=0; i<board.length-1; i++) {
        if (board[i] !== pieces[i].index) {
            return false;
        }
    }
    return true;
}

function swap (i, j, arr) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function randomMove(arr) {
    let r1 = floor(random(cols));
    let r2 = floor(random(rows));
    move(r1, r2, arr);
}

function s_shuffle(arr) {
    for (let i = 0; i < 1000; i++) {
        randomMove(arr);
    }
}

function move(i,j,arr) {
    let blank = findBlank();
    let blankCol = blank % cols;
    let blankRow = floor(blank / rows);
    if (isNeighbor(i,j,blankCol,blankRow)) {
        swap(blank, i + j * cols, arr);
    }
}

function isNeighbor(i,j,x,y) {
    if (i !== x && j !== y) {
        return false;
    }
    return abs(i - x) === 1 || abs(j - y) === 1;
}

function findBlank() {
    for (let i=0; i<board.length; i++) {
        if (board[i] === -1) return i;
    }
}

class Puzzle_piece {
    constructor(i, img) {
        this.index = i;
        this.img = img;
    }
}