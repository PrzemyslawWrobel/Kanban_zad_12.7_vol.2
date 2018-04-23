// KLASA KANBAN CARD
function Card(id, name) {
	var self = this;
	
	this.id = id;
	this.name = name || 'No name given';
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardDescription = $('<p class="card-description"></p>');

		var cardReName = $('<button class="card-change">Zmień nazwę</button>');
		
		cardDeleteBtn.click(function(){
			self.removeCard();
		});
		

		cardReName.click(function(){
			var cardName = prompt('Enter new name of the card');
			event.preventDefault();
			$.ajax({
				url: baseUrl + '/card/' + self.id,
				method: 'PUT',
				data: {
					name: cardName,
					bootcamp_kanban_column_id: self.id
				},
				success: function(response) {	
					self.element.children('p').html(cardName);
				}
			});
		});

		card.append(cardReName);
		card.append(cardDeleteBtn);
		cardDescription.text(self.name);
		card.append(cardDescription);
		return card;
	}
}
Card.prototype = {
	removeCard: function() {
	  	var self = this;
	  	$.ajax({
	  		url: baseUrl + '/card/' + self.id,
	  		method: 'DELETE',
	  		success: function(){
	  			self.$element.remove();
	  		}
	  	});
	}
};