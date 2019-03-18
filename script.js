window.addEventListener('DOMContentLoaded', () => {

	var quads = document.getElementsByClassName('quad'),
		size = quads.length,
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

		if ( !validNums() ) return;

		var result = checkRow();

		if( result === true){
			showAlert('ВЫ ОБОССАЛИ ЭТУ ИГРУ!', 'successful');

		} else showAlert('Ошибка: <br>' + result);

	}

	// Проверка горизонтальных рядов
	function checkRow(){
		let amountRows = Math.sqrt(size);

		for(let i = 0; i < amountRows; i++){
				let cells = document.querySelectorAll(`.row-of-quads .row-${i} .cell`),
					row = [];

			for(let j = 0; j < cells.length; j++){

				row.push( +cells[j].value );

				if (row.length >= size) {
					if ( !findSameNums(row) ) return 'Судоку решено неверно';
					row = [];
				}
			}
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
		showAlert(errors)
		return false
	}
})
