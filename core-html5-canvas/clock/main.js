const canvas = createCanvas();
const ctx = canvas.getContext('2d');
const FONT_HEIGHT = 15;
const MARGIN = 35;
const HAND_TRUNCATION = canvas.width / 25;
const HOUR_HAND_TRUNCATION = canvas.width / 10;
const NUMERAL_SPACING = 20;
const RADIUS = canvas.width / 2 - MARGIN;
const HAND_RADIUS = RADIUS + NUMERAL_SPACING;
const CENTER = [canvas.width / 2, canvas.height / 2];

function drawCircle() {
    ctx.beginPath();
    ctx.arc(...CENTER, RADIUS, 0, Math.PI * 2);
    ctx.stroke();
}

function drawCenter() {
    ctx.beginPath();
    ctx.arc(...CENTER, 5, 0, Math.PI * 2, true);
    ctx.fill();
}

function drawNumerals() {
    const numerals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    numerals.forEach((numeral) => {
        const angle = Math.PI / 6 * (numeral - 3);
        const numeralWidth = ctx.measureText(numeral).width;
        ctx.fillText(numeral, 
            canvas.width / 2 + Math.cos(angle) * (HAND_RADIUS) - numeralWidth / 2,
            canvas.height / 2 + Math.sin(angle) * (HAND_RADIUS) + FONT_HEIGHT / 3);
    });
}

function drawHand(loc, isHour) {
    const angle = (Math.PI * 2) * (loc / 60) - Math.PI / 2;
    const handRadius = isHour
        ? RADIUS - HAND_TRUNCATION - HOUR_HAND_TRUNCATION
        : RADIUS - HAND_TRUNCATION;
    ctx.moveTo(canvas.width / 2, canvas.height / 2)
    ctx.lineTo(canvas.width / 2 + Math.cos(angle) * handRadius,
               canvas.height / 2 + Math.sin(angle) * handRadius);
    ctx.stroke();
}

function drawHands() {
    const date = new Date();
    let hour = date.getHours();
    hour = hour > 12 ? hour - 12 : hour;
    // normalise to 0 - 60
    drawHand(hour * 5 + (date.getMinutes() / 60) * 5, true);
    drawHand(date.getMinutes());
    drawHand(date.getSeconds());
}

function drawClock() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle();
    drawCenter();
    drawHands();
    drawNumerals();
}


function createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = 600;
    canvas.height = 600;
    document.body.appendChild(canvas);
    return canvas;
}

// Initialization
ctx.font = FONT_HEIGHT + 'px Arial';
setInterval(drawClock, 1000);