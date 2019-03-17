var num = /^[1-9]/,
	size = 0,
	valid = false,
	box = document.getElementById('box'),
	check = document.getElementById('check'),
	infoTab = document.getElementsByClassName('alert')[0];

box.addEventListener('keypress', function(e){

	if (e.target.tagName == 'INPUT') {

		if (!num.test(+e.key)) {
			showAlert('Вводите только цифры, от 1 до 9', 'error');
			check.attributes;
			e.target.classList.add('error');
			valid = false;

		} else{
			e.target.classList.remove('error');
			infoTab.style.opacity = '0';
			valid = true;
		}
	}
});

function showAlert(text, status){
	infoTab.style.animation = 'animationShow 2s ease-out 0s 1'
	infoTab.classList.add(status);
	infoTab.textContent = text;
}

check.onclick = function() {

	if (valid) return showAlert('Заполните все поля как нужно', 'error');

	size = document.getElementsByClassName('quad').length;

	if( checkRow() ){
		showAlert('ВЫ ОБОССАЛИ ЭТУ ИГРУ!', 'correct');

	} else showAlert('Задача решена неверно', 'error');

}

function checkRow(){
	let amountRows = Math.sqrt(size);
	for(let i = 0; i < amountRows; i++){
			let cells = document.querySelectorAll(`.row-of-quads .row-${i} .cell`),
				row = [];

		for(let j = 0; j < cells.length; j++){

			if ( !num.test(+cells[j].value) ) {
				cells[j].classList.add('error');
				showAlert('Заполните все поля', 'error');
				return;
			}

			row.push( +cells[j].value );

			if (row.length >= size) {
				if ( !findSameNums(row) ) return false;
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