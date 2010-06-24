$(document).ready( function() {
	$('[localize]').each( function(i) {
		var localize = $(this).attr('localize');
		if (localize != '') {
			var list = localize.split(',');
			for (var i = 0, c = list.length; i < c; i++) {
				var namesAndValues = list[i].split(':');
				if (namesAndValues.length == 1) {
					$(this).html(strings[namesAndValues[0]]);
				}
				else {
					$(this).attr(namesAndValues[0], strings[namesAndValues[1]]);
				}
			}
		}
	});
});