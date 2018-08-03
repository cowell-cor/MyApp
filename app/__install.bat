md src\app
md src\assets\js
md src\assets\css
md src\assets\img
md src\assets\json
md src\assets\fonts
md src\assets\media
md src\assets\config
md src\vendors\js
md src\vendors\css
md export
echo cmd /k gulp compile >_compile.bat
echo cmd /k gulp export >_export.bat
echo cmd /k gulp >_watch.bat
pause
cmd /k "npm install -g gulp && npm install --save"
