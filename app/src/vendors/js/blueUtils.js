(function (){/**
 * ...
 * @author Emz
 * @version 3.0.0
 * @date 2015-11-18
 * @company Bluerush
 * @codeReview -
 */

(function(){
	"use strict";
	/* We look if the utils object exist. If not, we simply create it */

	if(!window.BU){
		window.BU = {};
	}

	var cssTestElem,
		settings = {cssSupport:{}};

	window.BU = window.blueUtils = {

		getWindowLanguage:function(){
			var lang = window.lang||window.language,
				defaultLang = 'en';
			if(!lang){
				lang = document.documentElement.lang;
			}
			if(lang){
				var langSp = lang.split("_");
				lang = langSp[langSp.length-1];
			}
			return (lang||defaultLang).toLowerCase();
		},

		getTypeOf:function(p_value){
		var t = typeof p_value;
			if(t === 'object'&&p_value.push !== undefined){
				return 'array';
			}
		return t;
		},
		/* method that determine if a object is empty */
		isEmpty:function(obj) {
			var key;
		    // null and undefined are "empty"
		    if (obj=== null||obj===undefined){ 
		    	return true;
		    }
		    // Assume if it has a length property with a non-zero value
		    // that that property is correct.
		    if (obj.length > 0){
		    	return false;
		    }
		    if (obj.length === 0) {
		    	return true;
		    }
		    // Otherwise, does it have any properties of its own?
		    // Note that this doesn't handle
		    // toString and valueOf enumeration bugs in IE < 9
		    for (key in obj) {
		        if (obj.hasOwnProperty(key)){
		        	return false;
		        }
		    }
		    return true;
		},
		
		clone:function (obj) {
			return typeof obj === 'undefined' ? this : (this.clone.prototype = Object(obj), new this.clone());
		},	

		checkForAbsolutePath:function(p_url){
			/* TODO */
			/* Check for // at pos 0 + file:// at pos 0 + ws:// + wss:// */
			//return (p_url && p_url.substring(0, 4) === 'http') ? true : false;
			//var rx=/^((https?|wss?|file):)?[\/\\\\]{2,}(.*?)$/gmi;
			if (typeof p_url === "string")
			{
				var p = p_url.substring(0, 6);
				if (p.indexOf('http:')===0 || p.indexOf('https:')===0 || p.indexOf('ftp:') ===0 || p.indexOf('file:') === 0 || p.indexOf('ws:') === 0 || p.indexOf('wss:') === 0 || p.indexOf('//') === 0) { return true; 
				}
			}
			return false;
		},

		formatTime :function(p_seconds){
		var seconds = Math.round(p_seconds),
			minutes = Math.floor(seconds / 60);
			minutes = (minutes >= 10) ? minutes : '0' + minutes;
			seconds = Math.floor(seconds % 60);
			seconds = (seconds >= 10) ? seconds : '0' + seconds;
			return minutes + ':' + seconds;
		},

		blockTextSelection:function(){
			document.body.focus();
			document.onselectstart = function () { return false; };
		},

		unblockTextSelection:function(){
			document.onselectstart = function () { return true; };
		},

		importJS:function(src,async){
			var n="script",
				g=document.createElement(n),
				s=document.getElementsByTagName(n)[0];
			g.type="text/javascript";
			if(async){
				g.async=true;
			}

			g.src=src;
			s.parentNode.insertBefore(g,s);
		},

		getExtension:function(url){
			if(typeof url === "string"){
				return url.substr(url.lastIndexOf('.') + 1);
			}
			return false;
		},

		setCookie:function(c_name,value,exdays,domain){
			var expire;
			if(exdays !== undefined && exdays === 0){
				expire = "0";///will create session cookie
			}else{
				var exdate=new Date();
				exdate.setDate(exdate.getDate() + exdays);
				expire = exdate.toUTCString();
			}
			var c_value=escape(value) + ((exdays===null) ? "" : "; expires="+expire),
				path = "; path=/";
			if(domain !== undefined){
				if(domain.substring(0) === "/") path = "; path=";
				path+=domain;
			}

			/* todo - to test */
		var secure = "";
		/* check for https ; if yes, add "; secure" at the end of the cookie */
		if(window.location.protocol === "https"){
			secure = "; secure";
		}
		document.cookie=c_name + "=" + c_value + path + secure;
		},

		getUrlVars:function(p_var,p_var2) {
			var vars = {},
				isUrlParam = BU.isUrl(p_var),
				varToUse = isUrlParam ? p_var2 : p_var,
				url = isUrlParam ? p_var : window.location.href;

			url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
				var sp = value.split("#");
				if(sp.length > 1) value = sp[0];
				vars[key] = value;
			});
			if(varToUse !== undefined){
				return vars[varToUse];
			}
			return vars;
		},

		isUrl:function(str) {
			var pattern = /^(((([A-Za-z]{3,9}:(?:\/\/)?)|(\/\/))(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
  				return pattern.test(str);
		},

		getHashVars:function(p_var) {
			var vars = {},
				hash;
			if(BU.temporaryHash !== undefined){
				hash = BU.temporaryHash;
				delete BU.temporaryHash;
			}else{
				hash = window.location.hash;
			}
			var a = hash.split("&"),
				l = a.length;
			for(var x=0;x<l;x++){
				var v = a[x];
				v = v.replace(/#/g,'');
				a[x]=v;
				var va = v.split("=");
				if(va.length >= 1 && va[0] !== undefined && va[0] !== "") vars[va[0]] = va[1] || "EMPTY-HASH";
			}
		if(p_var !== undefined){
			return vars[p_var];
		}
			return vars;
		},

		setHashVars:function(p_var,p_value,p_remove) {
			var varType = BU.getTypeOf(p_var),
				valueType = BU.getTypeOf(p_value);

			if(varType === "string" && p_value === undefined){
				valueType = "string";
			}

			if(varType !== "array" && varType!== "string"){
				return;
			}

			if(varType === "string"){
				p_var = [p_var];
				p_value = [p_value];
			}
			var len = p_var.length;
			if(p_remove !== undefined){
					BU.blockSetHashFunction = true;
					BU.removeHashVars(p_remove);
					BU.blockSetHashFunction = false;
			}
				var varObj = BU.getHashVars();
			for(var x=0;x<len;x++){
				var val = p_value[x];
				if(val === undefined) val = "EMPTY-HASH";
				var variable = p_var[x];
				if(varObj[variable] !== val){
					varObj[variable] = val;
				}
			}

			if(len){
				setHash(varObj);
			}
		},

		removeHashVars:function(p_var) {
			var type = BU.getTypeOf(p_var);
			if(type === "boolean"){
				setHash({});
				return;
			}
			if(type !== "array" && type!== "string") return;
			if(type === "string") p_var = [p_var];
				var varObj = BU.getHashVars(), l = p_var.length;
			for(var x=0;x<l;x++) delete varObj[p_var[x]];
			setHash(varObj);
		},

		getCookie:function(c_name){
			var i,x,y,ARRcookies=document.cookie.split(";");
			for (i=0;i<ARRcookies.length;i++)
			{
				x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
				y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
				x=x.replace(/^\s+|\s+$/g,"");
				if (x===c_name) return unescape(y);
			}
		},

		deleteCookie:function(c_name){
			var date = new Date();
			date.setDate(date.getDate() -1);
			document.cookie = escape(c_name) + '=;expires=' + date;
		},

		toNumber:function(p_value){
			var val = p_value;
			if(isNaN(val)){
				if(window.language === "fr"){
					val = val.replace(/[^0-9,\.]/g,'');
					val = val.replace(',','.');
				}
				else val = val.replace(/[^0-9\.]/g,'');
				if(val.split('.').length>2) val =val.replace(/\.+$/,"");
			}
			val *= 1;
			return val;
		},

		formatTimeStringToNumber:function(p_time){
			var timeArray = p_time.split(":"),
				l = timeArray.length,
				sec = 0,
				min = 0;
			if(l - 1 >= 0) sec = BU.toNumber(timeArray[l - 1]);
			if(l - 2 >= 0) min = BU.toNumber(timeArray[l - 2]);
			return  min * 60 + sec;
		},

		getDocumentPath:function(){
			if(!settings.documentPath){
				var documentUrl = window.location.href || '',
					pos = documentUrl.lastIndexOf('/'),
					documentPath = pos < 0 ? documentUrl : documentUrl.slice(0,pos);

				documentPath = documentPath + '/';

				settings.documentPath = documentPath;
			}
			return settings.documentPath;
		},

		checkForUnprefixedPath:function(path){
			if(typeof path !== "string"){
				return false;
			}
			var isAbs = BU.checkForAbsolutePath(path),
				isExplicitRel = path.indexOf("./") === 0 || path.indexOf(".\\") === 0,
				isRoot = !BU.detect.isLocal() && (path.indexOf("/") === 0 || path.indexOf("\\") === 0);
			if(isAbs || isExplicitRel || isRoot){
				return true;
			}
			return false;
		},

		adjustPath:function(url,prefix){
			prefix = prefix||"";

			var prefixAbsolute = BU.checkForUnprefixedPath(prefix),
				docPath=BU.detect.isLocal() ? BU.getDocumentPath() || '' : '',
				isAbs = BU.checkForUnprefixedPath(url);
			
			if(!prefixAbsolute && prefix.indexOf("/") === 0){
				prefix = prefix.substr(1);
			}

			url = isAbs ? url : prefixAbsolute ? prefix + url : docPath + prefix + url;
			if(isAbs){
				var httpIndex = url.indexOf('http');
				if(httpIndex > -1){
					// var isCloudFront = url.indexOf('cloudfront.net') > -1;
					var isLimelight = url.indexOf('llnwd.net') > -1;
					if(isLimelight){
						if(me.settings.isSSL){
							url = url.replace('vo.llnwd.net','hs.llnwd.net');
						}else{
							url = url.replace('hs.llnwd.net','vo.llnwd.net');
						}
					}
					// if(me.settings.isSSL === true){
					// 	url = url.replace('http://','https://');
					// }else{
					// 	url = url.replace('https://','http://');
					// }
				}
			}
			

			/* If the url is absolte and start with //, we need to add the protocol. We do */
			if(url.indexOf('//') === 0){
				/* Generally, the double slashed url will come from the outside, this is why we are going to add http: instead of file:. Like this, the local testing are going to work */
				if(BU.detect.isLocal()){
					url = "http:"+url;
				}else if(window.location.protocol){
					url = window.location.protocol+url;
					
				}
			}
			return url;
		}
	};

	function setHash(varObj){
		var newHash = "",
			isFirst = true;
		for(var x in varObj){
			var add = isFirst ? "" : "&";
			if(isFirst) isFirst = false;
			var v = varObj[x];
			if(v === "EMPTY-HASH" || v === "") newHash+=add + x;
			else newHash+=add + x+"="+v;
		}
		if(newHash.length > 0) newHash = "#"+newHash;
		if(BU.blockSetHashFunction === undefined || BU.blockSetHashFunction === false) window.location.hash = newHash;
		else BU.temporaryHash = newHash;
		var z = "",
		t = document.title || window.title || z;
		// Fix IE repeat hash bug
		// IE678 (title to infinite if not using Fred fixed version)
		if (t && (t.indexOf("#") >= 0)) document.title = t.replace(/\#(.*?)$/, z);
	}

	/* IE9 and less console.log fixe to avoid script error on closed console pannel */
	if(!window.console){
		window.console = {log:function(){}};
	}else if(!window.console.log){
		window.console.log = function(){};
	}

}());
/**
 * ...
 * @author Emz
 * @version 3.0.0
 * @date 2015-11-18
 * @company Bluerush
 * @codeReview -
 */
(function(){
	"use strict";

	/* We look if the utils object exist. If not, we simply create it */
	if(!window.BU){
		window.BU = {};
	}

	var cache = {},
		detect,
		//CONSTANTS
		FIREFOX_BROWSER='Firefox',
		IE_BROWSER='IE',
		EDGE_BROWSER='Edge',
		CHROME_BROWSER='Chrome',
		OPERA_BROWSER='Opera',
		SAFARI_BROWSER='Safari',
		NATIVE_BROWSER='Native',
		UNKNOWN_BROWSER='Unknown',
		///OS LIST
		IOS_OS='iOS',
		BLACKBERRY_OS='Blackberry',
		ANDROID_OS='Android',
		WINDOWS_OS='Windows',
		MAC_OS='Mac',
		LINUX_OS='Linux',
		UNIX_OS='UNIX',
		PLAYBOOK_OS='PlayBook',
		UNKNOWN_OS='Unknown';
			
	BU.detect = detect = {
		/* Method that return a simple JSON Object with many information from the browser, like the name, the version, etc */
		getBrowserInfo:function(){
			var browserInfo = cache.browserInfo,
				nVer,
				nAgt,
				browserName,
				fullVersion = 0,
				majorVersion = 0,
				minorVersion = 0,
				releaseVersion = 0,
				revisionVersion = 0,
				nameOffset,verOffset,ix,
				isIe = false,
				arr,
				naGTS,
				regex,
				rv;

			if(browserInfo === undefined){
				browserInfo = {};
				nVer = navigator.appVersion;
				nAgt = navigator.userAgent;
				browserName  = navigator.appName;
				fullVersion  = ''+parseFloat(nVer);
				majorVersion = parseInt(nVer,10);

				/* Microsoft Edge detection */
				if ((verOffset=nAgt.indexOf("Edge/"))!==-1) {
					browserName = EDGE_BROWSER;
					naGTS = nAgt.split("Edge/");
					fullVersion = naGTS[1] || "12.0";
					majorVersion = parseInt(''+fullVersion,10);
					minorVersion = fullVersion.split(".")[1] || 0;
					minorVersion = parseInt(minorVersion,10);
				}
				/* Opera Browser detection */
				// In Opera, the true version is after "Opera" or after "Version"
				else if ((verOffset=nAgt.indexOf("Opera"))!==-1) {
					browserName = OPERA_BROWSER;
					fullVersion = nAgt.substring(verOffset+6);
					if ((verOffset=nAgt.indexOf("Version"))!=-1){
						fullVersion = nAgt.substring(verOffset+8);
					}
				}
				/* Internet explorer 10 detection */
				// In MSIE, the true version is after "MSIE" in userAgent
				else if ((verOffset=nAgt.indexOf("MSIE"))!==-1) {
					browserName = IE_BROWSER;
					fullVersion = nAgt.substring(verOffset+5);
					majorVersion = parseInt(''+fullVersion,10);
					isIe = true;
				}
				/* Internet explorer 11+ detection */
				else if ((verOffset=nAgt.indexOf("Trident/"))!==-1) {
					browserName = IE_BROWSER;
					regex  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
				    rv = 11;
				    if (regex.exec(nAgt) !== null){
				    	rv = parseFloat( RegExp.$1 );
				    }
					fullVersion = rv+ '.0';
					majorVersion = rv;
					isIe = true;
				}
				/* Google Chrome detection */
				else if ((verOffset=nAgt.indexOf("Chrome"))!==-1) {
					browserName = CHROME_BROWSER;
					fullVersion = nAgt.substring(verOffset+7);
					arr = fullVersion.split(".");
					majorVersion = parseInt(arr[0],10) || 0;
					minorVersion = parseInt(arr[1],10) || 0;
					releaseVersion = parseInt(arr[2],10) || 0;
					revisionVersion = parseInt(arr[3],10) || 0;
				}
				/* Apple Safari detection */
				// In Safari, the true version is after "Safari" or after "Version"
				else if ((verOffset=nAgt.indexOf("Safari"))!==-1) {
					if(detect.isAndroidOS){
						browserName = NATIVE_BROWSER;	
					}else if((verOffset=nAgt.indexOf("CriOS"))!==-1){
						browserName = CHROME_BROWSER;	
					}else{
						browserName = SAFARI_BROWSER;	
					}
					fullVersion = nAgt.substring(verOffset+7);
					if ((verOffset=nAgt.indexOf("Version"))!==-1){
						fullVersion = nAgt.substring(verOffset+8);
					}
				}
				/* Mozilla Firefox detection */
				/* In Firefox, the true version is after "Firefox" */
				else if ((verOffset=nAgt.indexOf("Firefox"))!==-1) {
					browserName = FIREFOX_BROWSER;
					fullVersion = nAgt.substring(verOffset+8);
					arr = fullVersion.split(".");
					majorVersion = parseInt(arr[0],10) || 0;
					minorVersion = parseInt(arr[1],10) || 0;
					releaseVersion = parseInt(arr[2],10) || 0;
					revisionVersion = parseInt(arr[3],10) || 0;
				}
				// In most other browsers, "name/version" is at the end of userAgent
				else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')) ){
					browserName = nAgt.substring(nameOffset,verOffset);
					fullVersion = nAgt.substring(verOffset+1);
					if (browserName.toLowerCase()===browserName.toUpperCase()) {
						browserName = navigator.appName;
					}
				}
				// trim the fullVersion string at semicolon/space if present
				if ((ix=fullVersion.indexOf(";"))!=-1){
					fullVersion=fullVersion.substring(0,ix);	
				}

				if ((ix=fullVersion.indexOf(" "))!=-1){
					fullVersion=fullVersion.substring(0,ix);
				}

				majorVersion = parseInt(''+fullVersion,10);
				if (isNaN(majorVersion)) {
					fullVersion  = ''+parseFloat(nVer);
					majorVersion = parseInt(nVer,10);
				}
				/* WEIRD CASE TO DETECT IE9 version */
				if(isIe){
					if(nAgt.indexOf("Trident/5.0")!==-1 && majorVersion === 7){
						majorVersion = 9;
						fullVersion = 9;
					}
				}

				browserInfo.nVer = nVer;	
				browserInfo.nAgt = nAgt;
				browserInfo.browserName = browserName || 0;
				browserInfo.fullVersion = fullVersion || 0;
				browserInfo.majorVersion = majorVersion || 0;
				browserInfo.minorVersion = minorVersion || 0;
				browserInfo.releaseVersion = releaseVersion || 0;
				browserInfo.revisionVersion = revisionVersion || 0;
				browserInfo.verOffset = verOffset || 0;
				if(nameOffset){
					browserInfo.nameOffset = nameOffset;
				}
				if(ix){
					browserInfo.ix = ix;
				}

				cache.browserInfo = browserInfo;
			}
			return browserInfo;
		},

		isFirefoxBrowser:function(){
			return detect.getBrowserInfo().browserName === FIREFOX_BROWSER;
		},

		isIEBrowser:function(){
			return detect.getBrowserInfo().browserName === IE_BROWSER;
		},

		isEdgeBrowser:function(){
			return detect.getBrowserInfo().browserName === EDGE_BROWSER;
		},

		isChromeBrowser:function(){
			return detect.getBrowserInfo().browserName === CHROME_BROWSER;
		},

		isOperaBrowser:function(){
			return detect.getBrowserInfo().browserName === OPERA_BROWSER;
		},

		isSafariBrowser:function(){
			return detect.getBrowserInfo().browserName === SAFARI_BROWSER;
		},

		isAndroidNativeBrowser:function(){
			return detect.getBrowserInfo().browserName === NATIVE_BROWSER;
		},

		getOSInfo:function(){
			var osInfo,
				ua,
				d, dv, r, wVM, wV, oscpu,
				version,
				versionArr,
				osName;

	/* 	CODE REVIEW
			Style: GOOD
			Logic: WARNING
			Other: NONE
			Summary: 
				1.	cache n'est pas validé avant sa méthode
			Comments: 
				1.	cache est un objet publique qui peux etre ré-écrit.
						S'il devient autre chose qu'un objet le script va arrêter.
	*/
			if(cache.osInfo === undefined){
				osInfo = cache.osInfo = {};
				ua = window.navigator.userAgent;
				d = ua.match(/([\(][^\(\)]*[\)])/g);
				dv = d && d[0] ? d[0] : '';
				r = dv.match(/[0-9.,]*[0-9.,]/g);
				wVM = ua.match(/Windows[^;]*/gi);
				wV = wVM && wVM[0] ? wVM[0] : false;
				oscpu = window.navigator.oscpu;
				
				if(!oscpu){
					if(wV){
						oscpu = wV;
					}else if(r && r.length){
						oscpu = r.join('.');
					}else if(dv){
						oscpu = dv[0];
					}else{
						oscpu = "Unknown";
					}
				}
				
				version = oscpu.match(/[0-9.,]*[0-9.,]/g)[0];
				if(!version){
					version = "0";
				}
				
				versionArr = version.split('.');

				osInfo.majorVersion = parseInt(versionArr[0],10) || 0;
				osInfo.minorVersion = parseInt(versionArr[1],10) || 0;
				osInfo.version = (osInfo.majorVersion + '.' + osInfo.minorVersion) * 1;
				osInfo.releaseVersion = parseInt(versionArr[2],10) || 0;

				if (dv.indexOf('Android')>-1){ 
					osName = ANDROID_OS;
				}else if (dv.indexOf('iPad')>-1){ 
					osName = IOS_OS;
				}else if (dv.indexOf('iPhone')>-1){ 
					osName = IOS_OS;
				}else if (dv.indexOf('PlayBook')>-1 ){ 
					osName = PLAYBOOK_OS;
				}else if (dv.indexOf('BlackBerry')>-1){ 
					osName = BLACKBERRY_OS;
				}else if (dv.indexOf('BB')>-1){ 
					osName = BLACKBERRY_OS;
				}else if (dv.indexOf('Win')>-1){ 
					osName = WINDOWS_OS;
				}else if (dv.indexOf('Mac')>-1){ 
					osName = MAC_OS;
				}else if (dv.indexOf('Linux')>-1){ 
					osName = LINUX_OS;
				}else if (dv.indexOf('X11')>-1){ 
					osName = UNIX_OS;
				}else { 
					osName = UNKNOWN_OS; 
				}
				osInfo.osName = osName;

			}
			return cache.osInfo;
		},

		isAndroidOS:function(){
			return detect.getOSInfo().osName === ANDROID_OS;
		},

		isIOSOS:function(){
			return detect.getOSInfo().osName === IOS_OS;
		},

		isBlackberryOS:function(){
			return detect.getOSInfo().osName === BLACKBERRY_OS;
		},

		isWindowsOS:function(){
			return detect.getOSInfo().osName === WINDOWS_OS;
		},

		isMacOS:function(){
			return detect.getOSInfo().osName === MAC_OS;
		},

		isLinuxOS:function(){
			return detect.getOSInfo().osName === MAC_OS;
		},

		isUnixOS:function(){
			return detect.getOSInfo().osName === UNIX_OS;
		},

		isPlaybookOS:function(){
			return detect.getOSInfo().osName === PLAYBOOK_OS;
		},

		/* Method that indicates if we are on a mobile device */
		isMobileBrowser:function(){
			var userAgent, ua, rmobile;

			if(cache.isMobile === undefined){
				if(detect.isTabletBrowser()){
					cache.isMobile = false;
					return cache.isMobile;
				}

				userAgent = navigator.userAgent;
				ua = userAgent.toLowerCase();

				if(ua.indexOf("trident/") > -1 && ua.indexOf("tablet pc") > -1){
					cache.isMobile = false;
					return cache.isMobile;
				}

				if( /\b(msie)\b/.test(ua) ) { /// If you are Internet Explorer
					/// If you are windows phone
					if( /\b(iemobile)\b/.test(ua) ){
						cache.isMobile = true;
					}else{
						cache.isMobile = false;
					}
					return cache.isMobile;
				}
				// NO BOUNDARY check \b ?
				// [mini]mum == isMobile = true
				// Droid should be mobile
				rmobile = /(iPhone|a?n?droid|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|iPod|pie|tablet|up\.browser|up\.link|webos|wos)/;
				cache.isMobile = ( rmobile.exec( ua ) );
				cache.isMobile = cache.isMobile === null ? false : true;
			}
			return cache.isMobile;
		},

		/* Method that indicates if we are on a tablet device */
		isTabletBrowser:function(ua0){
			var ua, tablet, tabletOther, android, firefox, mobile, r;
			if(cache.isTablet === undefined || ua0){
				ua=(ua0||navigator.userAgent||'').toLowerCase();

				if( /\b(msie)\b/.test(ua)){
					cache.isTablet = false;
					return cache.isTablet;
				}

				/* detect ie11 */
				if(ua.indexOf("trident/") > -1 && ua.indexOf("tablet pc") > -1){
					cache.isTablet = false;
					return cache.isTablet;
				}

				tablet=/\b((ipad)|(playbook)|(tablet)|(kindle))\b/.test(ua);
				if(tablet){
					cache.isTablet = true;
					return cache.isTablet;
				}
				tabletOther=/\b((xoom)|(sch-i800))\b/.test(ua);
				android=/\b(a?n?droid)\b/.test(ua);
				firefox=/\b(firefox)\b/.test(ua);
				mobile=/\b(mobile)\b/.test(ua);

				if(firefox && android){
					cache.isTablet = false;
					return cache.isTablet;
				}
				r=tablet||tabletOther||android&&!mobile||firefox&&mobile;
				if(ua0){
					return r;
				}else{
					cache.isTablet = r;
				}
			}
			return cache.isTablet;
		},

		/* Method that indicates if we are on a desktop device */
		isDesktopBrowser:function(){
			if(cache.isDesktop === undefined){
					cache.isDesktop = !detect.isTabletBrowser() && !detect.isMobileBrowser();
			}
			return cache.isDesktop;
		},

		/* Method that indicates if the http live streaming is supported by the current device */
		isHLSSupported:function(){
			var bInfo,osInfo;
			if(cache.hLSSupported === undefined){
				bInfo = detect.getBrowserInfo();
				osInfo = detect.getOSInfo();
				if(detect.isDesktopBrowser()){
					//SAFARI 6 MAC SUPPORT HLS, OTHER DESKTOP DOESN'T SUPPORT HLS
					if(detect.isMacOS() && detect.isSafariBrowser() && bInfo.majorVersion >= 6){
						cache.hLSSupported = true;
					}else{
						cache.hLSSupported = false;
					}
				}else{
					if(detect.isIOSOS() && detect.isSafariBrowser() && bInfo.majorVersion >= 5){
						cache.hLSSupported = true;
					}else if(detect.isAndroidOS() && detect.isChromeBrowser() && bInfo.majorVersion >= 30){
						cache.hLSSupported = true;
					}else if(detect.isAndroidOS() && osInfo.version >= 4.1 && detect.isAndroidNativeBrowser()){
						cache.hLSSupported = true;
					}else{
						cache.hLSSupported = false;
					}
				}
			}
			return cache.hLSSupported;
		},

		isFullScreenEnable:function(){
			var v;
			if(cache.fullScreenEnable === undefined){
				v = document.createElement('video');
				cache.fullScreenEnable = (v) ? (v.requestFullScreen || v.mozRequestFullScreen || v.webkitRequestFullScreen || v.webkitEnterFullscreen || v.msRequestFullscreen) ? true : false : false;
			}
			return cache.fullScreenEnable;
		},

		/* Method that indicate if the current browser can read H264 medias */
		isH264Player:function(){
			var v,r;
			if(cache.isH264 === undefined){
				v=document.createElement('video'),
				r=(v&&v.canPlayType&&v.canPlayType('video/mp4')||'').replace(/non?e?/gmi,'');
				cache.isH264 = !!r;
			}
			return cache.isH264;
		},

		isVideoSupported:function(){
			var v;
			if(cache.useVideo === undefined){
				v = document.createElement('video');
				cache.useVideo = v ? true : false;
			}
			return cache.useVideo;
		},

		isAudioSupported:function(){
			if(cache.isAudioSupported === undefined){
				cache.isAudioSupported = !!document.createElement('audio').canPlayType;
			}
			return cache.isAudioSupported;
		},

		isSVGSupported:function(){
			var bInfo;
			if(cache.isSVGSupported === undefined){
				bInfo = detect.getBrowserInfo();
				if(bInfo.browserName === IE_BROWSER && bInfo.majorVersion < 9){
					cache.isSVGSupported = false;
				}else if(bInfo.browserName === FIREFOX_BROWSER && bInfo.majorVersion < 4){
					cache.isSVGSupported = false;
				}else if(bInfo.browserName === OPERA_BROWSER && bInfo.majorVersion < 9){
					cache.isSVGSupported = false;
				}else{
					cache.isSVGSupported = true;
				}
			}
			return cache.isSVGSupported;
		},

		isMp3Player:function(){
			var browserI, browserName, majorVersion, minorVersion;
			if(cache.isMp3 === undefined){
				cache.isMp3 = isSupportedAudio([
					{browserName:FIREFOX_BROWSER,majorVersion:22},
					{browserName:OPERA_BROWSER,majorVersion:15},
					{browserName:SAFARI_BROWSER,majorVersion:4},
					{browserName:IE_BROWSER,majorVersion:9},
					{browserName:EDGE_BROWSER,majorVersion:12},
					{browserName:NATIVE_BROWSER,majorVersion:4},
					{browserName:CHROME_BROWSER}
				]);
			}
			return cache.isMp3;
		},

		isOggPlayer:function(){
			var browserI, browserName, majorVersion, minorVersion;
			if(cache.isOgg === undefined){
				cache.isOgg = isSupportedAudio([
					{browserName:FIREFOX_BROWSER,majorVersion:3,minorVersion:5},
					{browserName:OPERA_BROWSER,majorVersion:11,minorVersion:50},
					{browserName:CHROME_BROWSER}
				]);
			}
			return cache.isOgg;
		},

		/* Method that return a boolean to tell if the .opus is supported by the current browser */
		/* Firefox 15 and Chrome 27 support the .opus format */
		isOpusPlayer:function(){
			var browserI, browserName, majorVersion, minorVersion;
			if(cache.isOpus === undefined){
				cache.isOpus = isSupportedAudio([
					{browserName:FIREFOX_BROWSER,majorVersion:15},
					{browserName:OPERA_BROWSER,majorVersion:20},
					{browserName:CHROME_BROWSER,majorVersion:33}
				]);
			}
			return cache.isOpus;
		},

		/* Method that return a boolean to tell if the .opus is supported by the current browser */
		/* Firefox 3.5 and all Chrome support the .wav format */
		isWavPlayer:function(){
			var browserI, browserName, majorVersion, minorVersion;
			if(cache.isWav === undefined){
				cache.isWav = isSupportedAudio([
					{browserName:FIREFOX_BROWSER,majorVersion:3,minorVersion:5},
					{browserName:OPERA_BROWSER,majorVersion:11,minorVersion:50},
					{browserName:SAFARI_BROWSER,majorVersion:4},
					{browserName:EDGE_BROWSER,majorVersion:12},
					{browserName:NATIVE_BROWSER,majorVersion:4},
					{browserName:CHROME_BROWSER,majorVersion:8}
				]);
			}
			return cache.isWav;
		},

		isWebMPlayer:function(){
			var browserI, browserName, majorVersion, minorVersion;
			if(cache.isWebM === undefined){
				cache.isWebM = isSupportedAudio([
					{browserName:FIREFOX_BROWSER,majorVersion:4},
					{browserName:OPERA_BROWSER,majorVersion:11,minorVersion:50},
					{browserName:CHROME_BROWSER,majorVersion:6}
				]);
			}
			return cache.isWebM;
		},

		is3GPPlayer:function(){
			if(cache.is3GP === undefined){
				cache.is3GP = detect.isMobileBrowser() && !detect.isH264Player();
			}
			return cache.is3GP;
		},

		isLocal:function(){
			if(cache.isLocal === undefined){
				switch(window.location.protocol) {
					case 'http:':
					case 'https:':
						cache.isLocal = false;
						break;
					case 'file:':
						cache.isLocal = true;
						break;
					default:
						cache.isLocal = false;
				}
			}
			return cache.isLocal;
		},

		getFlashPlayerInfo:function(){
			detect.hasFlashPlayer();
			return cache.flashPlayerInfo;
		},

		/* Method that indicates if we the flash player plugin is availlaible */
		hasFlashPlayer:function(){
			var a,b,c,e,f,g,h,url,urlParam;
			if(cache.flashPlayer === undefined){
				cache.flashPlayerInfo = {};
				cache.flashPlayerInfo.majorVersion = 0;
				cache.flashPlayerInfo.minorVersion = 0;
				cache.flashPlayerInfo.releaseVersion = 0;
				cache.flashPlayerInfo.fullVersion = 0;
				a=!1;
				b="";
				url=(window.location.href||b).toLowerCase();
				c = function(d) {
					d = d.match(/[\d]+/g);
					d.length = 3;
					cache.flashPlayerInfo = {};
					cache.flashPlayerInfo.majorVersion = d[0] !== undefined ? d[0] : 0;
					cache.flashPlayerInfo.minorVersion = d[1] !== undefined ? d[1] : 0;
					cache.flashPlayerInfo.releaseVersion = d[2] !== undefined ? d[2] : 0;
					cache.flashPlayerInfo.fullVersion  = (cache.flashPlayerInfo.majorVersion + "." + cache.flashPlayerInfo.minorVersion) * 1;
					return d.join(".");
				};
				if (navigator.plugins && navigator.plugins.length) {
					e = navigator.plugins["Shockwave Flash"];
					e && (a = !0, e.description && (b = c(e.description)));
					navigator.plugins["Shockwave Flash 2.0"] && (a = !0, b = "2.0.0.11");
				} else {
					if (navigator.mimeTypes && navigator.mimeTypes.length) {
						f = navigator.mimeTypes["application/x-shockwave-flash"];
						(a = f && f.enabledPlugin) && (b = c(f.enabledPlugin.description));
					} else {
						try {
							g = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");a = !0;b = c(g.GetVariable("$version"));
						} catch (h) {
							try {
								g = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");a = !0;b = "6.0.21";
							} catch (i) {
								try {
									g = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");a = !0;b = c(g.GetVariable("$version"));
								} catch (j) {}
							}
						}
					}
				}

				urlParam = url.indexOf("noflash")>0 ? 'noFlash' : urlParam; 
				urlParam = url.indexOf("ishtml")>0 ? 'isHtml' : urlParam; 
				urlParam = url.indexOf("ismobile")>0 ? 'isMobile' : urlParam; 

				if(urlParam){
					cache.flashPlayer = false;
					cache.flashPlayerInfo.blocked = true;
				}else{
					cache.flashPlayerInfo.blocked = false;
					cache.flashPlayer = a;
				}
			}
			return cache.flashPlayer;
		}

	};

	function isSupportedAudio(obj){
		var browserI = detect.getBrowserInfo(),
			browserName = browserI.browserName,
			majorVersion = browserI.majorVersion,
			minorVersion = browserI.minorVersion,
			supported = false,
			x=0,
			len = obj&&obj.length||0,
			b,
			bMajorVersion,
			bMinorVersion;
		for(;x<len;x++){
			b = obj[x];
			if(b.browserName === browserName){
				bMajorVersion = b.majorVersion;
				bMinorVersion = b.minorVersion;
				if(bMajorVersion === undefined){
					return true;
				}else if(majorVersion > bMajorVersion){
					return true;
				}else if(majorVersion === bMajorVersion && minorVersion >= bMinorVersion){
					return true;
				}else{
					return false;
				}
			}
		}
		return false;
	}
}());}());