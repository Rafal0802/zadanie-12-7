// KLASA KANBAN CARD
function Card(id, name) {
	var self = this;
	
	this.id = id;
	this.name = name || 'No name given';
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>').attr('data-id', self.id);
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardEditBtn = $('<button class="btn-edit">Edytuj</button>');
		var cardDescription = $('<p class="card-description"></p>').text(self.name);
		
		cardDeleteBtn.click(function(){
			self.removeCard();
		});

		cardEditBtn.click(function() {
			var columnId = $(this).closest('.column').attr('data-id');

			self.name = prompt('Podaj nową nazwę:', self.name);	
			$(this).siblings('.card-description').text(self.name);

			$.ajax({
				url: baseUrl + '/card/' + self.id,
				method: 'PUT',
				data: {
					name: self.name,
					bootcamp_kanban_column_id: columnId
				}
			});
		});
		
		card.append(cardDeleteBtn)
			.append(cardEditBtn)
			.append(cardDescription);

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
				self.element.remove();
			}
		});
	}
};