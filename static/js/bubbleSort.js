let values = [];
let i = 0;
let w = 20;

function setup() {
    createCanvas(800,200);
    values = new Array(floor(width / w));
    for (let i = 0; i < values.length; i++) {
        values[i] = random(height);
    }
    frameRate(5);
}

function draw() {
    background(5);

    if (i < values.length) {
        for (let j = 0; j < values.length - i - 1; j++) {
            let a = values[j];
            let b = values[j + 1];
            if (a > b) {
                swap(values, j, j+1);
            }
        }
    } else {
        console.log('finished');
        noLoop();
    }
    i++;

    for (let i = 0; i < values.length; i++) {
        stroke(255, 204, 0);
        fill(255);
        rect(i * w, height - values[i], w, values[i]);
    }
}

function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}