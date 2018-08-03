SETLOCAL EnableDelayedExpansion

for /f "skip=1 tokens=1-6 delims= " %%a in ('wmic path Win32_LocalTime Get Day^,Hour^,Minute^,Month^,Second^,Year /Format:table') do (
	IF NOT "%%~f"=="" (
		set /a FormattedDate=%%a + 100 * %%d + 10000 * %%f
		set FormattedDate=!FormattedDate:~-8,4!-!FormattedDate:~-4,2!-!FormattedDate:~-2,2!
	)
)
xcopy ..\export\threeInOne.html meri001_threeInOne_%FormattedDate%\ /Y
xcopy ..\export\assets\css\threeInOne.doc.css meri001_threeInOne_%FormattedDate%\assets\css\ /Y
xcopy ..\export\assets\css\threeInOne.css meri001_threeInOne_%FormattedDate%\assets\css\ /Y
xcopy ..\export\assets\js\threeInOne.js meri001_threeInOne_%FormattedDate%\assets\js\ /Y

xcopy ..\export\vendors\js\* meri001_threeInOne_%FormattedDate%\vendors\js\ /S /Y /EXCLUDE:exclude_list.txt

xcopy ..\export\assets\config\dataConfig.js meri001_threeInOne_%FormattedDate%\assets\config\ /Y
xcopy ..\export\assets\config\threeInOneConfig.js meri001_threeInOne_%FormattedDate%\assets\config\ /Y

xcopy ..\export\assets\js\rates.js meri001_threeInOne_%FormattedDate%\assets\js\ /Y
xcopy ..\export\assets\js\jquery-cmsj-no-conflict.js meri001_threeInOne_%FormattedDate%\assets\js\ /Y

xcopy ..\export\app\partials\modal.html meri001_threeInOne_%FormattedDate%\app\partials\ /Y

xcopy ..\export\app\affordabilityCalculator\* meri001_threeInOne_%FormattedDate%\app\affordabilityCalculator\ /S /Y /EXCLUDE:exclude_list.txt
xcopy ..\export\app\lineOfCreditCalculator\* meri001_threeInOne_%FormattedDate%\app\lineOfCreditCalculator\ /S /Y /EXCLUDE:exclude_list.txt
xcopy ..\export\app\mortgagePaymentCalculator\* meri001_threeInOne_%FormattedDate%\app\mortgagePaymentCalculator\ /S /Y /EXCLUDE:exclude_list.txt

xcopy ..\export\assets\fonts\* meri001_threeInOne_%FormattedDate%\assets\fonts\ /S /Y /EXCLUDE:exclude_list.txt
xcopy ..\export\assets\img\* meri001_threeInOne_%FormattedDate%\assets\img\ /S /Y /EXCLUDE:exclude_list.txt

echo Investment Selector package complete.
@pause