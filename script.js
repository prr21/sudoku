window.addEventListener('DOMContentLoaded', () => {

	var quads = document.getElementsByClassName('quad'),
		size = quads.length,
		amountRows = Math.sqrt(size),
		numRegEx = new RegExp(`[1-${size}]`),
		box = document.getElementById('box'),
		check = document.getElementById('check'),
		infoTab = document.getElementsByClassName('alert')[0];

	box.addEventListener('keypress', function(e){

		if (e.target.tagName == 'INPUT') {

			if (!numRegEx.test(+e.key)) {
				showAlert('Вводите только цифры, от 1 до ' + size);
				check.attributes;
				e.target.classList.add('error');

			} else {
				e.target.classList.remove('error');
				infoTab.style.opacity = '0';
			}
		}
	});

	function showAlert(text, status = 'error'){
		infoTab.style.opacity = '1'
		infoTab.classList.add(status);
		infoTab.innerHTML = text;
	}

	check.onclick = function() {

		// if ( !validNums() ) return;

		if( /*checkQuad() && checkGorRow() && */ checkVerRow() ){
			showAlert('ВЫ ОБОССАЛИ ЭТУ ИГРУ!', 'successful');

		} else showAlert('К сожалению, судоку решено неверно');

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
			let numCell = curCell;

			for(let j = 0; j <= quads.length; j++){
				let cells = quads[curQuad].querySelectorAll('.cell');

				if( numCell >= cells.length ) {
					curQuad += amountRows; numCell = curCell;

					if( curQuad >= quads.length ) {
						break;}
					cells = quads[curQuad].querySelectorAll('.cell');
				}
				row.push( +cells[numCell].value );
				numCell += amountRows;

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

	function validNums(){
		let cells = document.querySelectorAll('.cell'),
			errors = '';

		cells.forEach( (num, i) => {

			if ( !numRegEx.test( +num.value) || +num.value > size ) {

				cells[i].classList.add('error');
				errors = 'Заполните все поля от 1 до ' + size;
				return;
			}
		});
		// не будет выводит тру
		showAlert(errors)
		return false
	}
})
