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
  for (var i = 0; i < cells.length; i++) {
    cells[i].style.backgroundColor = 'white';
  }
}

function createGrid() {
  mainGrid.innerHTML = '';
  for (var i = 0; i < GRID_SIZE; i++) {
    let row = document.createElement('div');
    row.setAttribute('style', `height: ${CANVAS_SIZE / GRID_SIZE}px`);
    for ( var j = 0; j < GRID_SIZE; j++) {
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
    event.target.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16).toUpperCase()}`;
    console.log(Math.floor(Math.random() * 16777215).toString(16).toUpperCase());
  } else {
    event.target.style.backgroundColor = 'black';
  }
}

createGrid();