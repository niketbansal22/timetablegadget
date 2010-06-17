/************************************************************
	settings.js v1.0
	
	скрипт содержит функционал окна настроек гаджета

************************************************************/

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

// скрытие всех полей ввода для всех дней недели
function hideAllFields()
{
	// скрыть все поля ввода для всех дней недели
	// display: none
	mon.style.display = 'none';
	tue.style.display = 'none';
	wed.style.display = 'none';
	thu.style.display = 'none';
	fri.style.display = 'none';
	sat.style.display = 'none';
}

// показ полей для выбранного дня недели
function showFields(selectedDay)
{
	// показать поля ввода для какого-то дня недели
	// display: block
	hideAllFields();
	document.getElementById(selectedDay).style.display = 'block';
}

// выбор дня недели (вызывается при выборе дня из списка)
function selectDay()
{
	showFields(document.getElementById("day").value);
}

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
function restoreSettings()
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
function main() 
{
	// установить обработчик закрытия окна
    System.Gadget.onSettingsClosing = settingsClosing;
	
	// восстановить значения настроек
	restoreSettings();
}