SETLOCAL EnableDelayedExpansion

for /f "skip=1 tokens=1-6 delims= " %%a in ('wmic path Win32_LocalTime Get Day^,Hour^,Minute^,Month^,Second^,Year /Format:table') do (
	IF NOT "%%~f"=="" (
		set /a FormattedDate=%%a + 100 * %%d + 10000 * %%f
		set FormattedDate=!FormattedDate:~-8,4!-!FormattedDate:~-4,2!-!FormattedDate:~-2,2!
	)
)
xcopy ..\export\investmentSelector.html meri001_investmentSelector_%FormattedDate%\ /Y
xcopy ..\export\assets\css\investmentSelector.doc.css meri001_investmentSelector_%FormattedDate%\assets\css\ /Y
xcopy ..\export\assets\css\investmentSelector.css meri001_investmentSelector_%FormattedDate%\assets\css\ /Y
xcopy ..\export\assets\js\investmentSelector.js meri001_investmentSelector_%FormattedDate%\assets\js\ /Y

xcopy ..\export\vendors\js\* meri001_investmentSelector_%FormattedDate%\vendors\js\ /S /Y /EXCLUDE:exclude_list.txt

xcopy ..\export\assets\config\dataConfig.js meri001_investmentSelector_%FormattedDate%\assets\config\ /Y
xcopy ..\export\assets\config\istConfig.js meri001_investmentSelector_%FormattedDate%\assets\config\ /Y

xcopy ..\export\assets\js\rates.js meri001_investmentSelector_%FormattedDate%\assets\js\ /Y
xcopy ..\export\assets\js\jquery-cmsj-no-conflict.js meri001_investmentSelector_%FormattedDate%\assets\js\ /Y

xcopy ..\export\app\investmentSelector\* meri001_investmentSelector_%FormattedDate%\app\investmentSelector\ /S /Y /EXCLUDE:exclude_list.txt
xcopy ..\export\assets\fonts\* meri001_investmentSelector_%FormattedDate%\assets\fonts\ /S /Y /EXCLUDE:exclude_list.txt
xcopy ..\export\assets\img\* meri001_investmentSelector_%FormattedDate%\assets\img\ /S /Y /EXCLUDE:exclude_list.txt

echo Investment Selector package complete.
@pause