/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById('canvas');

/**
 * @type {HTMLElement}
 */
const readout = document.getElementById('readout');

const context = canvas.getContext('2d');
const spritesheet = new Image();

/**
 * 
 * @param {HTMLCanvasElement} canvas 
 * @param {number} x 
 * @param {number} y 
 */
function windowToCanvas(canvas, x, y) {
    const bbox = canvas.getBoundingClientRect();
    return {
        x: (x - bbox.left) * (canvas.width / bbox.width),
        y: (y - bbox.top) * (canvas.height / bbox.height),
    }
}

function drawBackground() {
    const VERTICAL_LINE_SPACING = 12;
    let i = canvas.height;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = 'lightgrey';
    context.lineWidth = 0.1;

    while(i > VERTICAL_LINE_SPACING * 4) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(canvas.width, i);
        context.stroke();
        i -= VERTICAL_LINE_SPACING;
    }
}

function drawSpriteSheet() {
    context.drawImage(spritesheet, 0, 0);
}

function drawGuideLine(x, y) {
    context.strokeStyle = 'rgba(0,0,230,0.8)';
    context.lineWidth = 0.5;
    drawVerticalLine(x);
    drawHorizontalLine(y);
}

function drawVerticalLine(x) {
    context.beginPath();
    context.moveTo(x + 0.5, 0);
    context.lineTo(x + 0.5, canvas.height);
    context.stroke();
}

function drawHorizontalLine(y) {
    context.beginPath();
    context.moveTo(0, y + 0.5);
    context.lineTo(canvas.width, y + 0.5);
    context.stroke();
}

function updateReadout(x, y) {
    readout.innerHTML = `(${x}, ${y})`;
}

// Event Handler

/**
 * @param {Event} e
 */
canvas.onmousemove = (e) => {
    const loc = windowToCanvas(canvas, e.clientX, e.clientY);

    drawBackground();
    drawSpriteSheet();
    drawGuideLine(loc.x, loc.y);
    updateReadout(loc.x, loc.y);
}


// Initialization

spritesheet.src = 'running-sprite-sheet.png';
spritesheet.onload = function () {
    drawSpriteSheet();
}
drawBackground();