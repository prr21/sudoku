var num = /^[1-9]/,
			box = document.getElementById('box'),
			row = document.getElementsByClassName('row'),
			check = document.getElementById('check');

		box.addEventListener('keypress', function(e){

			if (e.target.tagName == 'INPUT') {

				if (!num.test(+e.key)) {
					console.log('Вводите только цифры, от 1 до 9');
					// check.attributes
					e.target.classList.add('error')

				} else e.target.classList.remove('error')
			}
		});

		check.onclick = function() {
			if(checkRows()){
				alert('ВЫ ОБОССАЛИ ЭТУ ИГРУ!')
			}
		}

		// Проверка горизонтальных рядов
		function checkRows(){
			let objRows = {
						0:[],
						1:[],
						2:[],
						3:[],
						4:[],
						5:[],
						6:[],
						7:[],
						8:[]
					}

			for(let i = 0; i < row.length; i++){
				let cell = row[i].getElementsByClassName('cell');
					objRows[i+row.length] = [];

				for(let j = 0; j < cell.length; j++){

					if (!num.test(+cell[j].value)) {
						cell[j].classList.add('error')
						console.log('Заполните поле')
						return false

					} else {
						cell[j].classList.remove('error')
						objRows[j].push(+cell[j].value);
						objRows[i+row.length].push(+cell[j].value);
						continue;
					}
				}
			}
			return findSameNums(objRows);
		}

		// function checkQuad(){
		// 	let objQuad = {};

		// 	for(let i = 0; i < row.length; i++){
		// 		let cell = row[i].getElementsByClassName('cell');

		// 	}
		// 	console.log(objQuad)
		// }

		// Поиск одинаковых цифр в рядах
		function findSameNums(obj){
			for (key in obj) {
				for(let i = 0; i < 8; i++){

					if(obj[key].indexOf(obj[key][i], i+1) != -1) {
						console.log('Задача решена неверно')
						return false;
					}
				}
			}
			return true;
		}