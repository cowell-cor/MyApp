gulpfile.js has all the necessary config to:
- Update DEV pages (html with "_dev" suffix, _watch.bat, isProd=false)
- Update PROD pages (html w/o suffix, _compile.bat)

-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

EXPORT

1. Modify gulpfile.js: isProd = true

2. Compile gulp: _compile.bat

3. Enter command 'gulp export'.

4. If not already present, copy from src/vendors/js/ angular.min.js, jquery.min.js and highcharts.js to export/vendors/js/.

Export will be in export folder

-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

PUBLISH to CI or DEV (meridian001.ci.bluerush.ca/)

1. After EXPORT... Commit STABLE Export folder.

2. Update revision number in REVISION.txt

3. Commit REVISION.txt change.

4. On Jenkins (http://mulberry.jenkins2.bluerush.ca/), Build appropriate site (Meridian-001-ci-html5 or Meridian-001-dev-html5). Effect: transfer commited documents in export folder to public site (svnup).

Site is published. Test Build: meridian001.ci.bluerush.ca/ or meridian001.dev.bluerush.ca/

-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

PACKAGE for integration

1. After EXPORT... Go to /packages/

2. Use appropriate batch file for tool.

3. Zip and send.

Don't forget to commit any packages sent to client for future reference.