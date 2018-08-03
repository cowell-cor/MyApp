SETLOCAL EnableDelayedExpansion

for /f "skip=1 tokens=1-6 delims= " %%a in ('wmic path Win32_LocalTime Get Day^,Hour^,Minute^,Month^,Second^,Year /Format:table') do (
	IF NOT "%%~f"=="" (
		set /a FormattedDate=%%a + 100 * %%d + 10000 * %%f
		set FormattedDate=!FormattedDate:~-8,4!-!FormattedDate:~-4,2!-!FormattedDate:~-2,2!
	)
)
xcopy ..\_files\integration_notes\* meri001_integration-notes_%FormattedDate%\ /S /Y

echo Integration Notes package complete.
@pause