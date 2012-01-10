window.onload = function () {
	var grid = {
		width: 10,
		height: 10
	}

	var canvas = document.getElementById('myCanvas');
	var c = canvas.getContext('2d');

	var tileMap = [];

	var tile = new Image();
	tile.src = "../img/tile.png";

	var building = new Image();
	building.src = "../img/icecream.png";

	canvas.addEventListener('mousedown', handleMouseDown, false);

	draw();

	function handleMouseDown(e) {
		var gridOffsetY = grid.height;
		var gridOffsetX = grid.width;

		// Take into account the offset on the X axis caused by centering the grid horizontally
		gridOffsetX += (canvas.width / 2) - (tile.width / 2);

		var col = (e.clientY - gridOffsetY) * 2;
		col = ((gridOffsetX + col) - e.clientX) / 2;
					
		var row = ((e.clientX + col) - tile.height) - gridOffsetX;

		row = Math.round(row / tile.height);
		col = Math.round(col / tile.height);

		// Check the boundaries!
		if (row >= 0 && 
			col >= 0 && 
			row <= grid.width &&
			col <= grid.height) {

				tileMap[row] = (tileMap[row] === undefined) ? [] : tileMap[row];
							
				tileMap[row][col] = 1;
				draw();
			}
		}
				
		function draw() {
					
			c.clearRect (0, 0, canvas.width, canvas.height);

			for (var row = 0; row < 10; row++) {
			for (var col = 0; col < 10; col++) {

				var tilePositionX = (row - col) * tile.height;

				// Center the grid horizontally
				tilePositionX += (canvas.width / 2) - (tile.width / 2);

				var tilePositionY = (row + col) * (tile.height / 2);

				if (tileMap[row] != null && tileMap[row][col] != null) {
					tilePositionY -= building.height - tile.height;
					tilePositionX -= (building.width / 2) - (tile.width / 2);
					c.drawImage(building, Math.round(tilePositionX), Math.round(tilePositionY), building.width, building.height);
					} else {
						c.drawImage(tile, Math.round(tilePositionX), Math.round(tilePositionY), tile.width, tile.height);	
						}
				}	
			}
			}
		}