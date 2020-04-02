var stage = {
	isWin: '',
	line: [],
	width: 0,
	height: 0,
	board: [],
	key: 'X'
}
var loop = 0;
function choose(){
	var [x,y] = this.dataset.col.split(':');
	if(stage.board[x][y] != ''){
		alert('Ô đã được chọn')
	}else{
		stage.board[x][y] = stage.key;
		
		this.innerHTML = stage.key;
		stage.key = stage.key == 'X' ? 'O' : 'X';
		// checkOverBoard(x,y);
		if(CheckWin()){
			var col = document.querySelectorAll('[data-col]');
			col.forEach(c => {
				var [x,y] = c.dataset.col.split(':');
				let bool = stage.line.findIndex((i, index) => {
					if(i.x == x && i.y == y){
						return true;
					}
				})
				if(bool != -1){
					c.style.background = 'yellow';
				}
			})
			document.getElementById('notification').innerHTML = `Win is ${stage.isWin}`;
			// alert(`Win is ${stage.isWin}`)
		}
	}
}

function mouseover(){
	var [x,y] = this.dataset.col.split(':');
	if(stage.board[x][y] == ''){
		this.innerHTML = stage.key;
		this.style.background = stage.key == 'X' ? '#ffbe76' : '#ff7979';
	}
}

function mouseout(){
	var [x,y] = this.dataset.col.split(':');
	if(stage.board[x][y] == ''){
		this.innerHTML = '';
		this.style.background = 'white';
	}
}

function drawBoard(width, height){
	document.getElementById('board').innerHTML = '';
	for(let i = 0; i < width; i++){
		var row = document.createElement('div');
		row.classList.add('row');
		for(let j = 0; j < height; j++){
			let col = document.createElement('div');
			col.classList.add('col');
			col.getAttribute('data-col');
			col.setAttribute('data-col', `${j}:${i}`);
			col.addEventListener("click", choose);
			col.addEventListener("mouseover", mouseover);
			col.addEventListener("mouseout", mouseout);
			row.appendChild(col);
			stage.board[j][i] = '';
		}
		document.getElementById('board').appendChild(row);
	}
}

function checkOverBoard(x, y){
	
	if(y >= stage.width - 1){
		updateBooard('incWidth+');
		console.log('incWidth+');
	}

	if(x >= stage.height - 1){
		
		updateBooard('incHeight+');
		console.log('incHeight+');
	}
}

function updateBooard(key){
	// tăng chiều ngang
	if(key == 'incWidth+'){
		for(let i = 0; i < 5; i++){
			var row = document.createElement('div');
			row.classList.add('row');
			for(let j = 0; j < stage.height; j++){
				let col = document.createElement('div');
				col.classList.add('col');
				col.getAttribute('data-col');
				col.setAttribute('data-col', `${j}:${stage.width + i}`);
				col.addEventListener("click", choose);
				col.addEventListener("mouseover", mouseover);
				col.addEventListener("mouseout", mouseout);
				row.appendChild(col);
				stage.board[j] = stage.board[j].concat('');
			}
			document.getElementById('board').appendChild(row);
		}
		stage.width += 5;
	}
	
	// tăng chiều cao
	if(key == 'incHeight+'){
		var row = document.getElementsByClassName('row');
		for(let i = 0; i < 5; i++){
			var arrNew = new Array(stage.width);
			for(let j = 0; j < stage.width; j++){
				let col = document.createElement('div');
				col.classList.add('col');
				col.getAttribute('data-col');
				col.setAttribute('data-col', `${stage.height + i}:${j}`);
				col.addEventListener("click", choose);
				col.addEventListener("mouseover", mouseover);
				col.addEventListener("mouseout", mouseout);
				row[j].appendChild(col);
				arrNew[j] = '';
			}
			stage.board.push(arrNew);
		}
		stage.height += 5;
	}
}

function CheckWin(){
	// kiểm tra theo hàng
	if(CheckAlongRow('X')){
		stage.isWin = 'X';
		return true;
	}

	if(CheckAlongRow('O')){
		stage.isWin = 'O';
		return true;
	}

	if(CheckAlongCol('X')){
		stage.isWin = 'X';
		return true;
	}

	if(CheckAlongCol('O')){
		stage.isWin = 'O';
		return true;
	}

	if(CheckAlong1('X')){
		stage.isWin = 'X';
		return true;
	}

	if(CheckAlong1('O')){
		stage.isWin = 'O';
		return true;
	}

	if(CheckAlong2('X')){
		stage.isWin = 'X';
		return true;
	}

	if(CheckAlong2('O')){
		stage.isWin = 'O';
		return true;
	}
}

function CheckAlongRow(key){
	for(let i = 0; i < stage.height; i++){
		for(let j = 0; j < stage.width; j++){
			if(stage.board[i][j] == key){
				let flag = true;
				stage.line.push({x: i, y: j});
				for(let k = 1; k < loop; k++){
					if(stage.board[i][j + k] == undefined|| stage.board[i][j + k] == '' || stage.board[i][j + k] != key){
						flag = false;
						stage.line.length = 0;
						break;
					}
					stage.line.push({x: i, y: j + k})
				}
				if(flag) return true;
				
			}
		}
	}
	return false;
}

function CheckAlongCol(key){
	for(let i = 0; i < stage.width; i++){
		for(let j = 0; j < stage.height; j++){
			if(stage.board[j][i] == key){
				let flag = true;
				stage.line.push({x: j, y: i});
				for(let k = 1; k < loop; k++){
					if(stage.board[j + k] == undefined || stage.board[j + k][i] == '' || stage.board[j + k][i] != key){
						flag = false;
						stage.line.length = 0;
						break;
					}
					stage.line.push({x: j + k, y: i});
				}
				if(flag) return true;
				
			}
		}
	}
	return false;
}

function CheckAlong1(key){
	for(let i = 0; i < stage.height; i++){
		for(let j = 0; j < stage.width; j++){
			if(stage.board[i][j] == key){
				let flag = true;
				stage.line.push({x: i, y: j});
				for(let k = 1; k < loop; k++){
					if(stage.board[i + k] == undefined || stage.board[i + k][j + k] == '' || stage.board[i + k][j + k] != key){
						flag = false;
						stage.line.length = 0;
						break;
					}else{
						stage.line.push({x: i + k, y: j + k});
					}
					
				}
				if(flag) return true;
				
			}
		}
	}
	return false;
}

function CheckAlong2(key){
	for(let i = 0; i < stage.height; i++){
		for(let j = 0; j < stage.width; j++){
			if(stage.board[i][j] == key){
				let flag = true;
				stage.line.push({x: i, y: j});
				for(let k = 1; k < loop; k++){
					if(stage.board[i + k] == undefined || stage.board[i + k][j - k] == '' || stage.board[i + k][j - k] != key){
						flag = false;
						stage.line.length = 0;
						break;
					}else{
						stage.line.push({x: i + k, y: j - k});
					}
					
				}
				if(flag) return true;
				
			}
		}
	}
	return false;
}

function load(n){
	stage.width = n;
	stage.height = n;
	init();
	drawBoard(stage.width,stage.height);
}


function mySubmit(){
	var n = document.getElementById('n').value;
	var m = document.getElementById('m').value;
	
	loop = parseInt(m);
	load(parseInt(n));
}

function reset(){
	stage = {
		isWin: '',
		line: [],
		width: 0,
		height: 0,
		board: [],
		key: 'X'
	}
	document.getElementById('n').value = '';
	document.getElementById('m').value = '';
	document.getElementById('notification').innerHTML = '';
	load();
}

function init(){
	var board = new Array(stage.height);
	for(let i = 0; i < stage.height; i++){
		stage.board[i] = new Array(stage.width);
	}
}
