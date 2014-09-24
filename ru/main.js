var prevDay = 1;
var curDate = new Date();
var todayDate = new Date();
var evenWeek = false;
var daysOfWeek = ["¬оскресенье", "ѕонедельник", "¬торник", "—реда", "„етверг", "ѕ€тница", "—уббота"];
var months = ["€нвар€", "феврал€", "марта", "апрел€", "ма€", "июн€", "июл€", "августа", "сент€бр€", "окт€бр€", "но€бр€", "декабр€"];

// инициализаци€
function init()
{
	System.Gadget.settingsUI = 'settings.html';
	
	getParity();
	dayOfWeek();
}

// отслеживание смены даты
function dayOfWeek()
{
	// получение сегодн€шней даты и дн€ недели
	todayDate = new Date();
	var today = todayDate.getDay();
	
	if (prevDay != today) // переход между дн€ми
	{
		if ( (prevDay == 0) && (today == 1) )	// переход с воскресень€ на понедельник
		{
			setInverseParity();	// смена четности недели
		}
		prevDay = today;
		curDate = todayDate;
		dayOutput();
	}

	setTimeout(dayOfWeek, 1000);
}

// вывод информации о "текущем" дне
function dayOutput()
{
	// вывод дн€ недели
	document.getElementById("dayweek").innerText = daysOfWeek[curDate.getDay()];
	
	// вывод числа и мес€ца
	document.getElementById("date").innerText = curDate.getDate() + " " + months[curDate.getMonth()];
	
	// вывод четности недели
	document.getElementById("even").innerText = (getParity()) ? "чЄтна€ недел€" : "нечЄтна€ недел€";
	
	// вывод расписани€
	timetableOutput(curDate.getDay());	
}

function timetableOutput(day)
{
	var dayOfWeek;
	var noLectures = false;
	switch (day)
	{
		case 0:
			noLectures = true;
		break;
		case 1:
			dayOfWeek = "mon";
		break;
		case 2:
			dayOfWeek = "tue";
		break;
		case 3:
			dayOfWeek = "wed";
		break;
		case 4:
			dayOfWeek = "thu";
		break;
		case 5:
			dayOfWeek = "fri";
		break;
		case 6:
			dayOfWeek = "sat";
		break;
	}
	
	if (noLectures)
	{
		timetable.innerHTML = "<br>Cегодн€ зан€тий нет";
	}
	else
	{		
		var ev = (evenWeek == true) ? "" : "o";
		
		timetable.innerText = "";
		timetable.innerHTML += "<br>";
		
		for (i=1; i<=8; i++)
		{
			var text = System.Gadget.Settings.readString(dayOfWeek + i + ev);
			timetable.innerHTML += i + ": " + ((text == "") ? "пусто" : text);
			timetable.innerHTML += "<br>";
		}
	}
}

// переход на предыдущий день (листать)
function previous()
{
	// запретить переход на предыдущую неделю
	if (curDate.getDay() != 1)	// если не понедельник
	{
		curDate = new Date(curDate.getYear(), curDate.getMonth(), curDate.getDate() - 1);
		dayOutput();
	}
}

// переход на следующий день (листать)
function next()
{
	// запретить переход на след. неделю
	if (curDate.getDay() != 0)	// если не воскресенье
	{
		curDate = new Date(curDate.getYear(), curDate.getMonth(), curDate.getDate() + 1);
		dayOutput();
	}
}

// получить четность недели из настроек
function getParity()
{
	evenWeek = (System.Gadget.Settings.readString("evenWeek") == "true") ? true : false;
	return evenWeek;
}

// установить четность недели в настройках
function setInverseParity()
{
	System.Gadget.Settings.writeString("evenWeek", (!evenWeek).toString());
	evenWeek = !evenWeek;
	return evenWeek;
}