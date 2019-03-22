window.addEventListener('DOMContentLoaded', () => {

	var quads = document.getElementsByClassName('quad'),
		size = quads.length,
		amountRows = Math.sqrt(size),
		numRegEx = new RegExp(`[1-${size}]`),
		box = document.getElementById('box'),
		check = document.getElementById('check'),
		infoTab = document.getElementsByClassName('alert')[0];

	box.addEventListener('keyup', function(e){
		if (e.target.tagName == 'INPUT') {

			if ( !validNums(e.target) ) {
				return false;

			} else {
				e.target.classList.remove('error', 'mark');
				infoTab.style.opacity = '0';
			}
		}
	});

	box.addEventListener('contextmenu', function(e){
		if ( e.target.tagName == 'INPUT' && !e.target.disabled ) {
			e.preventDefault();
			
			if ( !e.target.classList.contains('mark') ) {
				e.target.classList.add('mark')

			} else e.target.classList.remove('mark');
		}
	});

	function showAlert(text, status = 'error'){
		infoTab.style.opacity = '1'
		infoTab.classList.add(status);
		infoTab.innerHTML = text;
	}

	check.onclick = function() {
		let cells = document.querySelectorAll('.cell'),
			valid = true;

		cells.forEach((elem) => {
			if ( validNums(elem) == false )	valid = false;
		})

		if ( !valid ) return;

		if ( checkQuad() && checkGorRow() && checkVerRow() ){
			showAlert('ВЫ ОБОССАЛИ ЭТУ ИГРУ!', 'successful');

		} else showAlert('К сожалению, судоку решено неверно');
	}

	// Проверка правильности внесеннох значений
	const validNums = function(elem){

		if (elem.value == ''){
			elem.classList.add('error');
			showAlert('Заполните ячейки');
			return false;

		} else if (+elem.value > size) {
			elem.classList.add('error');
			showAlert('Заполняйте поля цифрами от 1 до ' + size);
			return false;

		} else if ( !numRegEx.test(+elem.value) ) {
			elem.classList.add('error');
			showAlert('Вводите только числа');
			return false;
		}
		return true
	}

	// Проверка чисел в каждом квадрате
	function checkQuad(){
		let cells = document.querySelectorAll('.cell'),
			row = [];

		for(let i = 0; i < cells.length; i++){
			row.push( +cells[i].value );

			if (row.length >= size) {
				if ( !findSameNums(row) ) return false;
				row = [];
			}
		}
		return true
	}

	// Проверка горизонтальных рядов
	function checkGorRow(){
		for(let i = 0; i < amountRows; i++){
				let cells = document.querySelectorAll(`.row-of-quads .row-${i} .cell`),
					row = [];

			for(let j = 0; j < cells.length; j++){

				row.push( +cells[j].value );

				if (row.length >= size) {
					if ( !findSameNums(row) ) return false;
					row = [];
				}
			}
		}
		return true
	}

	function checkVerRow() {
		let curQuad = 0, curCell = 0		// Current Quad and Cell
			nextCell = 0;

		for(let i = 0; i < quads.length; i++){
			let row = [];

			if( nextCell >= quads.length ) {
				nextCell %= quads.length - 1;
				curCell = nextCell;
			}
			let cell = curCell;

			for(let j = 0; j <= quads.length; j++){
				let cells = quads[curQuad].querySelectorAll('.cell');

				if( cell >= cells.length ) {
					curQuad += amountRows; cell = curCell;

					if( curQuad >= quads.length ) {
						break;}
					cells = quads[curQuad].querySelectorAll('.cell');
				}
				row.push( +cells[cell].value );
				cell += amountRows;

			}
			if ( !findSameNums(row) ) return false;

			curQuad %= quads.length - 1;
			curQuad == amountRows ? curQuad = 0 : 0;
			nextCell += amountRows;
		}
		return true		
	}

	// Поиск одинаковых цифр в рядах
	function findSameNums(row){
		for(let i = 0; i < row.length; i++){

			if( row.indexOf(row[i], i+1) != -1 ) {
				return false;
			}
		}
		return true;
	}
})
