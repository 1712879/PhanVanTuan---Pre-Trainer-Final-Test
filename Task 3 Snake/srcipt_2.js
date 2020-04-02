//=================== Tốc độ của rắn ==================================
var myin = setInterval(run, 500);

var canvas = document.getElementById('board');
var ctx = canvas.getContext("2d");
var board = {
	width: 400,
	height: 400,
	mode: 0
}

var snake = {
	size: 1,
	len: [],
	edge: 20,
	height: 10,
	direction: 'right',
	score: 0
}

var food = {
	x: -1,
	y: -1
}

function drawSnake(){
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0, 0, 400, 400);

	for(let i = 0; i < snake.size; i++){
		drawCol(snake.len[i].x, snake.len[i].y);
	}
}

function drawCol(x, y){
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x + snake.edge, y);
	ctx.stroke();
	ctx.moveTo(x + snake.edge, y);
	ctx.lineTo(x + snake.edge, y + snake.edge);
	ctx.stroke();
	ctx.moveTo(x + snake.edge, y + snake.edge);
	ctx.lineTo(x, y + snake.edge);
	ctx.stroke();
	ctx.moveTo(x, y + snake.edge);
	ctx.lineTo(x, y);
	ctx.stroke();
}

function drawFood(x, y){
	
	ctx.beginPath();
	ctx.arc(x, y, 10, 0, 2 * Math.PI);
	ctx.fillStyle = "red";
	ctx.fill();
	// ctx.stroke();
}

function initFood(){
	let min = 20;
	let max = (board.width - 50);
	let x = Math.floor(Math.random() * (max - min)) + min;
	let y = Math.floor(Math.random() * (max - min)) + min;
	food.x = x;
	food.y = y;
}

function run(){
	if(checkCollisionFood()){
		incSnake();
		snake.size += 1;
		clearInterval(snake.size);
	}

	if(checkCollision()){
		if (confirm(`Score: ${snake.score}\nDo you want to play again?`) == true) {
		    reset();
		} else {
		    clearInterval(myin);
		}
	}

	for(let i = 0; i < snake.size - 1; i++){
		snake.len[i] = snake.len[i + 1];
	}

	goDirection();

	
	drawSnake();
	drawFood(food.x, food.y);
}

function incSnake(){
	var obj = {};
	if(snake.direction == 'down'){
		obj = {x: snake.len[snake.size - 1].x, y: snake.len[snake.size - 1].y + snake.edge};
		
	}else if(snake.direction == 'up'){
		obj = {x: snake.len[snake.size - 1].x, y: snake.len[snake.size - 1].y - snake.edge};
	}
	else if(snake.direction == 'left'){
		obj = {x: snake.len[snake.size - 1].x - snake.edge, y: snake.len[snake.size - 1].y };
	}
	else{
		obj = {x: snake.len[snake.size - 1].x + snake.edge, y : snake.len[snake.size - 1].y};
	}
	snake.len.push(obj);
}

function goDirection(){
	if(snake.direction == 'down'){
		snake.len[snake.size - 1] = {x: snake.len[snake.size - 1].x, y: snake.len[snake.size - 1].y + snake.edge};
		
	}else if(snake.direction == 'up'){
		snake.len[snake.size - 1] = {x: snake.len[snake.size - 1].x, y: snake.len[snake.size - 1].y - snake.edge};
	}
	else if(snake.direction == 'left'){
		snake.len[snake.size - 1] = {x: snake.len[snake.size - 1].x - snake.edge, y: snake.len[snake.size - 1].y };
	}
	else{
		snake.len[snake.size - 1] = {x: snake.len[snake.size - 1].x + snake.edge, y : snake.len[snake.size - 1].y};
	}
}

function checkCollision(){
	let len = snake.len.length;
	let {x, y} = snake.len[len - 1];
	if(board.mode == 0){
		if(x >= board.width || x < - 10	|| y < -10 || y >= board.height){
			console.log('Collision, reset');
			return true;
		}
		// return false;
	}else if(board.mode == 1){
		if(x >= board.width){
			console.log('xuat hien lai ben trai');
			snake.direction = 'right';
			snake.len[snake.size - 1] = {x: 0, y: snake.len[snake.size - 1].y};
		}else if(x < - 10){
			console.log('xuat hien lai ben phải');
			snake.direction = 'left';
			snake.len[snake.size - 1] = {x: board.width, y: snake.len[snake.size - 1].y};
		}else if(y >= board.height){
			console.log('xuat hien lai o tren');
			snake.direction = 'down';
			snake.len[snake.size - 1] = {x: snake.len[snake.size - 1].x, y: 0};
		}else if(y < -10){
			console.log('xuat hien lai o duoi');
			snake.direction = 'up';
			snake.len[snake.size - 1] = {x: snake.len[snake.size - 1].x, y: board.height};
		}
		// return false;
	}

	for(let i = 0; i < snake.size - 1; i++){
		if(x == snake.len[i].x && y == snake.len[i].y){
			alert('Ran tu can minh');
			return true;
		}
	}

	return false;
	
}

function checkCollisionFood(){
	let {x, y} = snake.len[snake.size - 1];
	x += 20;	
	y += 10;

	let distance = Math.sqrt(Math.pow((x - food.x),2) + Math.pow((y - food.y),2));
	if(distance <= 20){
		snake.score += 1;
		document.getElementById('score').innerHTML = `Score: ${snake.score}`;
		initFood();
		return true;
	}
	return false;
}

function load(){
	var mod = prompt("Please enter game mod: ", "A");
	mod = mod.toLowerCase();
	if(mod == 'a' || mod == null){
		board.mode = 0;
	}else if(mod == 'b'){
		board.mode = 1;
	}else{
		board.mode = 0;
	}	
	init();
	initFood();
	drawSnake();
	document.getElementById('score').innerHTML = `Score: ${snake.score}`;
}
load();


function reset(){
	snake = {
		size: 1,
		len: [],
		edge: 20,
		height: 10,
		direction: 'right',
		score: 0
	}
	document.getElementById('score').innerHTML = `Score: ${snake.score}`;
	var mod = prompt("Please enter game mod: ", "A");
	mod = mod.toLowerCase();
	if(mod == 'a' || mod == null){
		board.mode = 0;
	}else if(mod == 'b'){
		board.mode = 1;
	}else{
		board.mode = 0;
	}
	init();
	initFood();
}

function init(){
	for(let i = 0; i < snake.size; i++){
		snake.len.push({x: 200 + i * snake.edge, y: 180})
	}
}

var keydown = [{keyCode: 38, direction: "up"}, {keyCode: 40, direction: "down"},{keyCode: 37, direction: "left"},{keyCode: 39, direction: "right"}]

document.addEventListener("keydown", (e) => {
	keydown.forEach(key => {
		if(key.keyCode == e.keyCode) snake.direction = key.direction;
	})
})