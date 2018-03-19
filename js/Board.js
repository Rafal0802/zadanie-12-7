var board = {
	name: 'Tablica Kanban',
	createColumn: function(column) {
	  this.element.append(column.element);
	  initSortable();
	},
	element: $('#board .column-container')
};

$('.create-column')
    .click(function() {
        var columnName = prompt('Enter a column name');
        $.ajax({
    		url: baseUrl + '/column',
    		method: 'POST',
    		data: {
            	name: columnName
    		},
    		success: function(response){
    			var column = new Column(response.id, columnName);
    			board.createColumn(column);
          	}
        });
});
	
function initSortable() {
    $('.card-list').sortable({
      connectWith: '.card-list',
      placeholder: 'card-placeholder',
      receive: function(event, ui) {
        var columnId = $(event.target).closest('[data-id]').attr('data-id'),
            cardName = $(ui.item[0]).find('.card-description').text(),
            cardId = $(ui.item[0]).attr('data-id');

        $.ajax({
          url: baseUrl + '/card/' + cardId,
          method: 'PUT',
          data: {
            name: cardName,
            bootcamp_kanban_column_id: columnId
          }
        });
      }
    }).disableSelection();
  }