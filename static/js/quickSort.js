let values = [];
let stats = [];
let i = 0;
let w = 8;

async function setup() {

    let c = document.getElementById("canvas");
    let myCanvas = createCanvas(c.offsetWidth, 600);
    myCanvas.parent("canvas");
    values = new Array(floor(width / w));
    stats = new Array(floor(width / w));
    for (let i = 0; i < values.length; i++) {
        values[i] = random(height);
        stats[i] = -1;
    }

    frameRate(100);
    await quickSort(values, 0, values.length - 1);
    noLoop();
}

async function quickSort(arr, start, end) {
    if (start >= end) {
        return;
    }

    let index = await partition(arr, start, end);
    stats[index] = -1;
    await Promise.all([quickSort(arr, start, index - 1),quickSort(arr, index + 1, end)]);
}

async function partition(arr, start, end) {

    let pivotIndex = start;
    let pivotValue = arr[end];
    stats[pivotIndex] = 0;
    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
            await swap(arr, i, pivotIndex);
            stats[pivotIndex] = -1;
            pivotIndex++;
            stats[pivotIndex] = 0;
        }
    }
    await swap(arr, pivotIndex, end);
    return pivotIndex;
}

function draw() {
    background(51);

    for (let i = 0; i < values.length; i++) {
        stroke(255, 204, 0);
        if (stats[i] !== -1) {
            fill(255, 0, 0);
        }

        else {
            fill(255);
        }
        rect(i * w, height - values[i], w, values[i]);
    }
}

async function swap(arr, a, b) {
    await sleep(50);
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
