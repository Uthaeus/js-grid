
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
  sizeDisplay.innerHTML = ` ${this.value}x${this.value}`;
});
sizeDisplay.innerHTML = ` ${gridSlider.value}x${gridSlider.value}`;

resizeButton.onclick = createGrid;

function createGrid() {
  const size = gridSlider.value;
  mainContainer.innerHTML = '';
  mainContainer.setAttribute('style', `grid-template-columns: repeat(${size}, 1fr);`);

  for (var i = 0; i < (size * size); i++) {
    mainContainer.appendChild(document.createElement('div'));
  }
}

function getRandomColor() {
  const hueValue = Math.floor(Math.random() * 360);
  return `hsl(${hueValue}, 50%, 51%)`;
}