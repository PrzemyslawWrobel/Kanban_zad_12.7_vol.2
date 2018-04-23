// OGÓLNA FUNKCJA
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
	'X-Client-Id': '3021',
  	'X-Auth-Token': '62718a70d21717c2722bcbbfb7dc4653'
};

$.ajaxSetup ({
	headers: myHeaders
});

$.ajax({
	url: baseUrl + '/board',
	method: 'Get',
	success: function(response) {
		setupColumns(response.columns);
	}
});

function setupColumns(columns) {
	columns.forEach(function (column){
		var col = new Column(column.id, column.name);
		board.createColumn(col);
		setupCards(col, column.cards);
	});
}

function setupCards(col, cards) {
	cards.forEach(function (card) {
		var cardObj = new Card(card.id, card.name, card.boocamp_kanban_column_id);
		col.createCard(cardObj);
	});
}
