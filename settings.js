 /************************************************************
	settings.js v1.0
	
	скрипт содержит функционал окна настроек гаджета

************************************************************/
var pairs = [
	'first',
	'second',
	'third',
	'fourth',
	'fifth',
	'sixth',
	'seventh',
	'eight',
	'ningth'
];

// обработчик события закрытия окна настроек
function settingsClosing(event) 
{
    if (event.closeAction == event.Action.commit) 
	{	
		if(!event.cancel) 
		{
			// сохранить все заданные настройки
			saveSettings();
		}
    }
}

// выбор дня недели из списка
$('#slctDay').change( function() {
	var selectedDay = $(this).val();		
});



// сохранение информации о парах для какого-либо дня недели
function savePairs(dayOfWeek)
{
	for (i=1; i<=6; i++)
	{
		System.Gadget.Settings.writeString(dayOfWeek + i, document.getElementById(dayOfWeek + i).value);
		System.Gadget.Settings.writeString(dayOfWeek + i + "o", document.getElementById(dayOfWeek + i + "o").value);
	}
}

// восстановление информаци о парах для какого-либо дня недели
function restorePairs(dayOfWeek)
{
	for (i=1; i<=6; i++)
	{
		document.getElementById(dayOfWeek + i).value = System.Gadget.Settings.readString(dayOfWeek + i);
		document.getElementById(dayOfWeek + i + "o").value = System.Gadget.Settings.readString(dayOfWeek + i + "o");
	}
}

// сохранение настроек гаджета (информация о парах и четности недели)
function saveSettings()
{
	savePairs('mon');
	savePairs('tue');
	savePairs('wed');
	savePairs('thu');
	savePairs('fri');
	savePairs('sat');

	// сохранить состояние четности недели
	System.Gadget.Settings.writeString("evenWeek", document.getElementById("evenWeek").checked.toString());
}

// восстановление настроек гаджета (информация о парах и четности недели)
function getSettings()
{
	// восстановить информацию о парах
	restorePairs('mon');
	restorePairs('tue');
	restorePairs('wed');
	restorePairs('thu');
	restorePairs('fri');
	restorePairs('sat');
	
	// восстановить состояние четности недели
	document.getElementById("evenWeek").checked = (System.Gadget.Settings.readString("evenWeek") == "true") ? true : false;
}

// главная функция окна настроек
$(document).ready( function() {
	debugger;
	System.Gadget.onSettingsClosing = settingsClosing;
	//getSettings();		
	$('.more').click( function() {
		debugger;
		var nextDayIndex = Number($('.lastPair').attr('id')) + 1;
		var labelLocale = strings[pairs[nextDayIndex]];
		var fieldCode = '<label for="' + nextDayIndex + '">' + labelLocale + '</label><br>' +
						'<input id="' + nextDayIndex + '" type="text" class="lastPair" /><br><br>';
		$('.lastPair').removeClass('lastPair');
		$(this).parent().siblings().append(fieldCode);
		return false;
	});
});