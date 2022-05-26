let clearButton;
let canvas;
let doodleClassifier;
let resultDiv;

function setup() {
    canvas = createCanvas(500, 500);
    clearButton = createButton('clear');
    clearButton.mousePressed(clearCanvas);
    background(220);

    doodleClassifier = ml5.imageClassifier('DoodleNet', modelReady);
    resultDiv = createDiv('model loading')
}

function modelReady() {
    console.log('model loaded');
    doodleClassifier.classify(canvas, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
        return;
    }
    console.log(results);
  let content = `${results[0].label} 
                 ${nf(100 * results[0].confidence, 2, 1)}%<br/>
                 ${results[1].label} 
                 ${nf(100 * results[1].confidence, 2, 1)}%`;

    resultDiv.html(content);
    doodleClassifier.classify(canvas, gotResults);
}

function clearCanvas() {
    background(220);
}

function draw() {
    if (mouseIsPressed) {
        strokeWeight(8);
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
}