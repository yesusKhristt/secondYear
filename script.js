const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

let painting = false;
let brushColor = document.getElementById('colorPicker').value;
let brushSize = document.getElementById('brushSize').value;

// Set initial styles
ctx.lineCap = 'round';

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mouseout', endPosition);
canvas.addEventListener('mousemove', draw);

document.getElementById('colorPicker').addEventListener('change', e => {
  brushColor = e.target.value;
});

document.getElementById('brushSize').addEventListener('input', e => {
  brushSize = e.target.value;
});

function startPosition(e) {
  painting = true;
  draw(e); // Draw on click
}

function endPosition() {
  painting = false;
  ctx.beginPath(); // Start a new stroke
}

function draw(e) {
  if (!painting) return;

  const rect = canvas.getBoundingClientRect();
  ctx.lineWidth = brushSize;
  ctx.strokeStyle = brushColor;

  ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function downloadCanvas() {
  const link = document.createElement('a');
  link.download = 'my-drawing.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}
