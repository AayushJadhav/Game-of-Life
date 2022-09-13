const Canvas = document.querySelector('canvas');
Canvas.width = innerWidth;
Canvas.height = innerHeight;
const c = Canvas.getContext('2d');

const w = 40;
const cols = Math.floor(Canvas.width / w);
const rows = Math.floor(Canvas.height / w);

function createGrid() {
	return new Array(cols).fill(null)
		.map(()=>new Array(rows).fill(null)
			.map(()=>Math.round(Math.random())));
}

let grid = createGrid();

requestAnimationFrame(draw);

function draw() {
	grid = simulate(grid);
	renderGrid(grid);

	requestAnimationFrame(draw);
}


function renderGrid(grid) {
	for (let col = 0; col < grid.length; col++) {
		for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];

			c.beginPath();
			c.rect(col * w, row * w, w, w);
			c.fillStyle = cell ? "black" : "white";
			c.fill();
		}
	}
}

function simulate(grid) {
	const nextGen = grid.map(array => [...array]);

	for (let col = 0; col < grid.length; col++) {
		for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];
			var numOfNeighbours = 0;

			for (var i = -1; i < 2; i++) {
				for (var j = -1; j < 2; j++) {
					if (i === 0 && j === 0) {
						continue;
					}

					var x = col + i;
					var y = row + j;

					if (x >= 0 && y >= 0 && x < cols && y < rows) {
						var currentNeighbour = grid[x][y];
						numOfNeighbours += currentNeighbour;
					}
				}
			}

			if (cell === 1 && numOfNeighbours < 2) {
				nextGen[col][row] = 0;
			} else if (cell === 1 && numOfNeighbours > 3) {
				nextGen[col][row] = 0;
			} else if (cell === 0 && numOfNeighbours === 3) {
				nextGen[col][row] = 1;
			}
		}
	}

	return nextGen;
}
