cd "%HOMEDRIVE%%HOMEPATH%\AppData\Local\Microsoft\Windows Sidebar"
%HOMEDRIVE%
rmdir /S /Q ".\Gadgets\timetable.gadget"
find /V /I "timetable.gadget" < Settings.ini  > Settings.ini.temp
copy Settings.ini.temp Settings.ini
del Settings.ini.temp
