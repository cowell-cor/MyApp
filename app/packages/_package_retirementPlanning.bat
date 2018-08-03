SETLOCAL EnableDelayedExpansion

for /f "skip=1 tokens=1-6 delims= " %%a in ('wmic path Win32_LocalTime Get Day^,Hour^,Minute^,Month^,Second^,Year /Format:table') do (
	IF NOT "%%~f"=="" (
		set /a FormattedDate=%%a + 100 * %%d + 10000 * %%f
		set FormattedDate=!FormattedDate:~-8,4!-!FormattedDate:~-4,2!-!FormattedDate:~-2,2!
	)
)
xcopy ..\export\retirementTool.html meri001_retirementPlanning_%FormattedDate%\ /Y
xcopy ..\export\assets\css\retirementTool.doc.css meri001_retirementPlanning_%FormattedDate%\assets\css\ /Y
xcopy ..\export\assets\css\retirementTool.css meri001_retirementPlanning_%FormattedDate%\assets\css\ /Y
xcopy ..\export\assets\js\retirementTool.js meri001_retirementPlanning_%FormattedDate%\assets\js\ /Y

xcopy ..\export\vendors\js\* meri001_retirementPlanning_%FormattedDate%\vendors\js\ /S /Y /EXCLUDE:exclude_list.txt

xcopy ..\export\assets\config\dataConfig.js meri001_retirementPlanning_%FormattedDate%\assets\config\ /Y
xcopy ..\export\assets\config\rscConfig.js meri001_retirementPlanning_%FormattedDate%\assets\config\ /Y

xcopy ..\export\assets\js\rates.js meri001_retirementPlanning_%FormattedDate%\assets\js\ /Y
xcopy ..\export\assets\js\jquery-cmsj-no-conflict.js meri001_retirementPlanning_%FormattedDate%\assets\js\ /Y

xcopy ..\export\app\retirementSavingsCalculator\* meri001_retirementPlanning_%FormattedDate%\app\retirementSavingsCalculator\ /S /Y /EXCLUDE:exclude_list.txt

xcopy ..\export\assets\fonts\* meri001_retirementPlanning_%FormattedDate%\assets\fonts\ /S /Y /EXCLUDE:exclude_list.txt
xcopy ..\export\assets\img\* meri001_retirementPlanning_%FormattedDate%\assets\img\ /S /Y /EXCLUDE:exclude_list.txt

echo Retirement Planning package complete.
@pause