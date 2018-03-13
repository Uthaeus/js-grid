function grid(){
  var container = document.createElement("div");
  container.id = "main";
  container.className = "container";
  document.body.appendChild(container);
  var main = document.getElementById('main');
  for (var i=0; i<16; i++) {
      var row = document.createElement("div");
      row.className = "row";
      row.id = "row" + i;
      main.appendChild(row);
      var roww = document.getElementById('row'+i);
      for (var j=0; j<16; j++) {
          var box = document.createElement("div");
          box.className = "box";
          roww.appendChild(box);
      }
  }
}
window.onload = grid();
//******************************
//******************************

const gridSize = document.getElementById('pixel-size-list');
let gridX = gridSize.value;
let gridY = gridSize.value;
let canvas = document.getElementById('canvas');

// Create Grid
function createGrid(x, y) {
  for (let i = 1; i <= x*y; i++) {
    let div = document.createElement('div');
    div.className = 'grid-item';
    canvas.appendChild(div);
  }
}

// Print to Canvas
function printCanvas(event) {
  if (event.target.classList.contains('grid-item')) {
    event.target.classList.add('colored');
  }
}

// Clear Grid
function clearGrid(elem) {
  let pixelSize = Number(elem.value);
  let gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach(gridItem => {
     gridItem.remove();
  });

  createGrid(pixelSize, pixelSize);
}

// Resize Grid
function resizeGrid(elem) {
  let pixelSize = Number(elem.value);
  let gridItems = document.querySelectorAll('.grid-item');

  if (pixelSize === 16) {
    gridItems.forEach(gridItem => {
      gridItem.style.width = '30px';
      gridItem.style.height = '30px';
    });
  }

  if (pixelSize === 64) {
    gridItems.forEach(gridItem => {
      gridItem.style.width = '15px';
      gridItem.style.height = '15px';
    });
  }

  if (pixelSize === 100) {
    gridItems.forEach(gridItem => {
      gridItem.style.width = '7px';
      gridItem.style.height = '7px';
    });
  }
}

// Create Grid default on page load
createGrid(gridX, gridY);

// Event listeners
canvas.addEventListener('mousemove', printCanvas);
document.getElementById('clear').addEventListener('click', () => {
  clearGrid(gridSize);
  resizeGrid(gridSize);
});
gridSize.addEventListener('change', () => {
  clearGrid(event.target);
  resizeGrid(event.target);
});

// ***************************************
// ***************************************

// Grid2

const container = document.querySelector('#container');

createGrid(16); //initial grid
draw();

const clearButton = document.querySelector('#clear');
const randomButton = document.querySelector('#random');
const rainbowButton = document.querySelector('#rainbow');
const pencilButton = document.querySelector('#pencil');
const eraserButton = document.querySelector('#eraser');
const generateButton = document.querySelector('#newGrid');

generateButton.addEventListener('click', (e)=>{
	deleteGrid();
	let num = +document.querySelector('input').value;
	if(isNaN(num) || num > 200){
		alert("Please Enter a Number Less Than 200");
		document.querySelector('input').value = "16";
		createGrid(16);
		draw("black");
	}else{
		createGrid(num);
		draw("black");
	}
});

clearButton.addEventListener('click', (e) => {
	let gridSquares = document.querySelectorAll('.content');
	gridSquares.forEach((square) =>{
		square.style.backgroundColor = ' #f8f9f9';
	})
	draw("black"); 
});

eraserButton.addEventListener('click', (e) =>{
	draw("#f8f9f9");
});

randomButton.addEventListener('click', (e)=>{
	let randomColor = getRandomColor();
	draw(randomColor);
});

rainbowButton.addEventListener('click', (e) =>{
	let gridSquares = document.querySelectorAll('.content');
	gridSquares.forEach((square) =>{
		square.addEventListener('mouseenter', (e)=>{
			square.style.backgroundColor = getRandomColor();
		})
	})
});

pencilButton.addEventListener('click', (e)=>{
	let gridSquares = document.querySelectorAll('.content');
	gridSquares.forEach((square) =>{
		let opacity = 0;
		square.addEventListener('mouseenter', (e)=>{
			if(opacity != 0){
				square.style.backgroundColor = `rgba(30, 30, 30, ${opacity/10})`;
				opacity ++;
			}
			else{ //first time mouse passes over
				square.style.backgroundColor = 'rgba(30, 30, 30, 0.05)';
				opacity++;
			}
		})
	})
});

function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function draw(colorName){
	let gridSquares = document.querySelectorAll('.content');
	gridSquares.forEach((square) => {

		square.addEventListener('mouseenter', (e) =>{
			if(colorName == undefined){
				square.style.backgroundColor = 'black';
			}else{
				square.style.backgroundColor = colorName;
			}
		})
	});
}

function createGrid(num){
	if (num == undefined) return;
	for(let i = 0; i < num; i++){
		createRow(num);
	}
}

function createRow(num){
	let width = 600 / num;
	for(let i = 0; i < num; i++){
		const content = document.createElement('div');
		content.classList.add('content');
		content.style.cssText = `width: ${width}px; height: ${width}px`;
		container.appendChild(content);
	}
}

function deleteGrid(){
	while (container.firstChild) {
    	container.removeChild(container.firstChild);
	}
}

// ***********************************************
// ***********************************************

const mainContainer = document.querySelector('main');
const gridSlider = document.querySelector('#grid-slider');
const sizeDisplay = document.querySelector('#size-display');
const resizeButton = document.querySelector('#resize-button');

createGrid();

mainContainer.addEventListener('mouseover', function(event) {
  if (event.target.style.backgroundColor == '') {
    event.target.style.backgroundColor = getRandomColor();
  }
});

gridSlider.addEventListener('change', function() {
  sizeDisplay.innerHTML= ` ${this.value}x${this.value}`;
});
sizeDisplay.innerHTML= ` ${gridSlider.value}x${gridSlider.value}`;

resizeButton.onclick = createGrid;

function createGrid () {
  const size = gridSlider.value;
  mainContainer.innerHTML = '';
  mainContainer.setAttribute("style",
      `grid-template-columns: repeat(${size}, 1fr);`);

  for (var i = 0; i < (size * size); i++) {
    mainContainer.appendChild(document.createElement('div'));
  }
}

function getRandomColor () {
  const hueValue = Math.floor(Math.random() * 360);
  return `hsl(${hueValue}, 50%, 51%)`;
}

// ***********************************
// ***********************************

// Grid 4

const mainGrid = document.querySelector('#grid');
const clearButton = document.querySelector('#clearButton');
const randomColorCheckBox = document.querySelector('#random-colors');
const gridSizeSelector = document.querySelector('#grid-size');
let GRID_SIZE = 16;
let CANVAS_SIZE = 900;



clearButton.addEventListener('click', () => clearGrid());
gridSizeSelector.addEventListener('change', () => changeGridSize(gridSizeSelector.value));

function changeGridSize(size) {
    console.log('Changing grid size');
    GRID_SIZE = size;
    createGrid();
}

function clearGrid() {
    cells = document.querySelectorAll('.cell');
    for(i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = 'white';
    }
}

function createGrid() {
    mainGrid.innerHTML = '';
    for(i = 0; i < GRID_SIZE; i++) {
        let row = document.createElement('div');
        row.setAttribute('style', `height:${CANVAS_SIZE / GRID_SIZE}px`);
        for(j = 0; j < GRID_SIZE; j++) {
            let cell = document.createElement('div');
            cell.style.width = `${CANVAS_SIZE / GRID_SIZE}px`;
            cell.style.height = `${CANVAS_SIZE / GRID_SIZE}px`;
            cell.setAttribute('class', 'cell');
            cell.addEventListener('mouseenter', (e) => changeCellColor(e));
            row.appendChild(cell);
        }
        mainGrid.appendChild(row);
    }
}
function changeCellColor(event) {
    if (randomColorCheckBox.checked) {
        event.target.style.backgroundColor = `#${Math.floor(Math.random()*16777215).toString(16).toUpperCase()}`;
        console.log(Math.floor(Math.random()*16777215).toString(16).toUpperCase());
    } else {
        event.target.style.backgroundColor = 'black';    
    }
}


createGrid();