const max = 1000;
const min = 1;
var n, m;
var array = [];
function mySubmit(){
	array = [];
	document.getElementById('tr').innerHTML = '';
	document.getElementById('tbody').innerHTML = '';
	n = document.getElementById('n').value;
	m = document.getElementById('m').value;
	if(n == '') n = 0;
	if(m == '') m = 0;
	n = parseInt(n);
	m = parseInt(m);
	
	var header = document.querySelector('#header tr');
	var newThNodeEmpty = document.createElement('th');
	newThNodeEmpty.classList.add('celi');
	header.appendChild(newThNodeEmpty);
	for(let i = 0; i < m; i++){
		var newThNode = document.createElement('th');
		newThNode.innerHTML = `${i}`;
		newThNode.classList.add('celi');
		header.appendChild(newThNode);
	}
	addRow(0, n, m);
	var headers = document.querySelectorAll('#tr th');
	var arr = [...headers];
	arr.shift();
	arr.forEach(i => {
		i.addEventListener('click', sort);
	})
}

function randomCeli(min, max) {
  	return Math.floor(Math.random() * (max - min) ) + min;
}

function addRow(offset, n, m){
	var tbody = document.getElementById('tbody'); 
	for(let i = offset; i < n; i++){
		let a = [];
		var newTrNode = document.createElement('tr');
		var newTdNodeStt = document.createElement('td');
		newTdNodeStt.innerHTML = `${i}`;
		newTdNodeStt.classList.add('celi');
		newTdNodeStt.classList.add('stt');
		newTrNode.appendChild(newTdNodeStt);

		for(let j = 0; j < m; j++){
			var newTdNode = document.createElement('td');
			var nums = randomCeli(min, max);
			newTdNode.innerHTML = `${nums}`;
			newTdNode.classList.add('celi');
			newTrNode.appendChild(newTdNode);
			a[j] = nums;
		}
		array.push(a);
		tbody.appendChild(newTrNode);
	}
}
var table = document.querySelector('#tbody');
table.addEventListener('scroll', function() {
	
 	var height = table.scrollHeight;
    var offset = table.scrollTop + table.clientHeight;
    if (offset >= height) { 
      	console.log('over');
      	let offset = n;
      	n = n + 100;

      	addRow(offset, n, m);
    }
});

window.addEventListener('scroll', function(){
	var header = document.querySelector('#header');
	var form = document.querySelector('.form');
	if(window.pageYOffset >= header.offsetTop) {
		console.log('add');
	    form.classList.add("none");
	    header.classList.add("fixed");
	}else {
	    form.classList.remove("none");
	    header.classList.remove("fixed");
	    console.log('remove');
	}
})

function sort(e){
	var headers = document.querySelectorAll('#tr th');
	headers.forEach(h => {
		h.style.background = '#fdcb6e';
	})
	this.style.background = 'yellow';
	var col = parseInt(e.target.innerHTML);
	var a = [];
	for(let i = 0; i < n; i++){
		a.push({row: i, val: array[i][col]});
	}
	a.sort(function(a, b){return a.val - b.val});

	var b = []
	a.forEach(i => {
		b.push(array[i.row]);
	})
	var arrNodes = document.querySelectorAll('#tbody .celi:not(.stt)');
	var pos = 0;
	var cols = m;
	arrNodes.forEach(n => {
		let row = Math.floor(pos / cols);
		let col = pos % cols;
		n.innerHTML = b[row][col]
		pos++;
	})
	for(let i = 0; i < n; i++){
		array[i] = [...b[i]];
	}
}






