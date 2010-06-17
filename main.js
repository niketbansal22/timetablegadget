var prevDay = 1;
var curDate = new Date();
var todayDate = new Date();
var evenWeek = false;
var daysOfWeek = ["sunday", "monday", "tuesday", "wednsday", "thursday", "friday", "saturday"];
var months = ["january", "february", "march", "april", "may", "june", "jule", "august", "september", "october", "november", "december"];

// �������������
function init()
{
	System.Gadget.settingsUI = 'settings.html';
	
	getParity();
	dayOfWeek();
}

// ������������ ����� ����
function dayOfWeek()
{
	// ��������� ����������� ���� � ��� ������
	todayDate = new Date();
	var today = todayDate.getDay();
	
	if (prevDay != today) // ������� ����� �����
	{
		if ( (prevDay == 0) && (today == 1) )	// ������� � ����������� �� �����������
		{
			setInverseParity();	// ����� �������� ������
		}
		prevDay = today;
		curDate = todayDate;
		dayOutput();
	}

	setTimeout(dayOfWeek, 1000);
}

// ����� ���������� � "�������" ���
function dayOutput()
{
	// ����� ��� ������
	document.getElementById("dayweek").innerText = daysOfWeek[curDate.getDay()];
	
	// ����� ����� � ������
	document.getElementById("date").innerText = curDate.getDate() + " " + months[curDate.getMonth()];
	
	// ����� �������� ������
	document.getElementById("even").innerText = (getParity()) ? "even week" : "odd week";
	
	// ����� ����������
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
		timetable.innerHTML = "<br>There are no lectures today.";
	}
	else
	{		
		var ev = (evenWeek == true) ? "" : "o";
		
		timetable.innerText = "";
		timetable.innerHTML += "<br>";
		
		for (i=1; i<=6; i++)
		{
			var text = System.Gadget.Settings.readString(dayOfWeek + i + ev);
			timetable.innerHTML += i + ": " + ((text == "") ? "empty" : text);
			timetable.innerHTML += "<br>";
		}
	}
}

// ������� �� ���������� ���� (�������)
function previous()
{
	// ��������� ������� �� ���������� ������
	if (curDate.getDay() != 1)	// ���� �� �����������
	{
		curDate = new Date(curDate.getYear(), curDate.getMonth(), curDate.getDate() - 1);
		dayOutput();
	}
}

// ������� �� ��������� ���� (�������)
function next()
{
	// ��������� ������� �� ����. ������
	if (curDate.getDay() != 0)	// ���� �� �����������
	{
		curDate = new Date(curDate.getYear(), curDate.getMonth(), curDate.getDate() + 1);
		dayOutput();
	}
}

// �������� �������� ������ �� ��������
function getParity()
{
	evenWeek = (System.Gadget.Settings.readString("evenWeek") == "true") ? true : false;
	return evenWeek;
}

// ���������� �������� ������ � ����������
function setInverseParity()
{
	System.Gadget.Settings.writeString("evenWeek", (!evenWeek).toString());
	evenWeek = !evenWeek;
	return evenWeek;
}