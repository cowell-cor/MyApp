/*
 Highcharts JS v6.1.4 (2018-09-25)
 Accessibility module

 (c) 2010-2017 Highsoft AS
 Author: Oystein Moseng

 License: www.highcharts.com/license
*/
(function(r){"object"===typeof module&&module.exports?module.exports=r:"function"===typeof define&&define.amd?define(function(){return r}):r(Highcharts)})(function(r){(function(a){function r(a,g){var l=a.indexOf("#each("),m=a.indexOf("#plural("),h=a.indexOf("["),n=a.indexOf("]");if(-1<l){var h=a.slice(l).indexOf(")")+l,k=a.substring(0,l),m=a.substring(h+1),h=a.substring(l+6,h).split(","),l=Number(h[1]);a="";if(g=g[h[0]])for(l=isNaN(l)?g.length:l,l=0>l?g.length+l:Math.min(l,g.length),h=0;h<l;++h)a+=
k+g[h]+m;return a.length?a:""}if(-1<m){k=a.slice(m).indexOf(")")+m;a=a.substring(m+8,k).split(",");switch(Number(g[a[0]])){case 0:a=v(a[4],a[1]);break;case 1:a=v(a[2],a[1]);break;case 2:a=v(a[3],a[1]);break;default:a=a[1]}a?(g=a,g=g.trim&&g.trim()||g.replace(/^\s+|\s+$/g,"")):g="";return g}return-1<h?(m=a.substring(0,h),a=Number(a.substring(h+1,n)),g=g[m],!isNaN(a)&&g&&(0>a?(k=g[g.length+a],void 0===k&&(k=g[0])):(k=g[a],void 0===k&&(k=g[g.length-1]))),void 0!==k?k:""):"{"+a+"}"}var u=a.each,v=a.pick;
a.i18nFormat=function(p,g,l){var m=function(c,a){c=c.slice(a||0);var f=c.indexOf("{"),q=c.indexOf("}");if(-1<f&&q>f)return{statement:c.substring(f+1,q),begin:a+f+1,end:a+q}},h=[],n,k;k=0;do n=m(p,k),k=p.substring(k,n&&n.begin-1),k.length&&h.push({value:k,type:"constant"}),n&&h.push({value:n.statement,type:"statement"}),k=n&&n.end+1;while(n);u(h,function(c){"statement"===c.type&&(c.value=r(c.value,g))});return a.format(a.reduce(h,function(c,a){return c+a.value},""),g,l)};a.Chart.prototype.langFormat=
function(p,g,l){p=p.split(".");for(var m=this.options.lang,h=0;h<p.length;++h)m=m&&m[p[h]];return"string"===typeof m&&a.i18nFormat(m,g,l)};a.setOptions({lang:{accessibility:{screenReaderRegionLabel:"Chart screen reader information.",navigationHint:"Use regions/landmarks to skip ahead to chart {#plural(numSeries, and navigate between data series,)}",defaultChartTitle:"Chart",longDescriptionHeading:"Long description.",noDescription:"No description available.",structureHeading:"Structure.",viewAsDataTable:"View as data table.",
chartHeading:"Chart graphic.",chartContainerLabel:"Interactive chart. {title}. Use up and down arrows to navigate with most screen readers.",rangeSelectorMinInput:"Select start date.",rangeSelectorMaxInput:"Select end date.",tableSummary:"Table representation of chart.",mapZoomIn:"Zoom chart",mapZoomOut:"Zoom out chart",rangeSelectorButton:"Select range {buttonText}",legendItem:"Toggle visibility of series {itemName}",svgContainerTitle:"{chartTitle}",seriesTypeDescriptions:{boxplot:"Box plot charts are typically used to display groups of statistical data. Each data point in the chart can have up to 5 values: minimum, lower quartile, median, upper quartile, and maximum.",
arearange:"Arearange charts are line charts displaying a range between a lower and higher value for each point.",areasplinerange:"These charts are line charts displaying a range between a lower and higher value for each point.",bubble:"Bubble charts are scatter charts where each data point also has a size value.",columnrange:"Columnrange charts are column charts displaying a range between a lower and higher value for each point.",errorbar:"Errorbar series are used to display the variability of the data.",
funnel:"Funnel charts are used to display reduction of data in stages.",pyramid:"Pyramid charts consist of a single pyramid with item heights corresponding to each point value.",waterfall:"A waterfall chart is a column chart where each column contributes towards a total end value."},chartTypes:{emptyChart:"Empty chart",mapTypeDescription:"Map of {mapTitle} with {numSeries} data series.",unknownMap:"Map of unspecified region with {numSeries} data series.",combinationChart:"Combination chart with {numSeries} data series.",
defaultSingle:"Chart with {numPoints} data {#plural(numPoints, points, point)}.",defaultMultiple:"Chart with {numSeries} data series.",splineSingle:"Line chart with {numPoints} data {#plural(numPoints, points, point)}.",splineMultiple:"Line chart with {numSeries} lines.",lineSingle:"Line chart with {numPoints} data {#plural(numPoints, points, point)}.",lineMultiple:"Line chart with {numSeries} lines.",columnSingle:"Bar chart with {numPoints} {#plural(numPoints, bars, bar)}.",columnMultiple:"Bar chart with {numSeries} data series.",
barSingle:"Bar chart with {numPoints} {#plural(numPoints, bars, bar)}.",barMultiple:"Bar chart with {numSeries} data series.",pieSingle:"Pie chart with {numPoints} {#plural(numPoints, slices, slice)}.",pieMultiple:"Pie chart with {numSeries} pies.",scatterSingle:"Scatter chart with {numPoints} {#plural(numPoints, points, point)}.",scatterMultiple:"Scatter chart with {numSeries} data series.",boxplotSingle:"Boxplot with {numPoints} {#plural(numPoints, boxes, box)}.",boxplotMultiple:"Boxplot with {numSeries} data series.",
bubbleSingle:"Bubble chart with {numPoints} {#plural(numPoints, bubbles, bubble)}.",bubbleMultiple:"Bubble chart with {numSeries} data series."},axis:{xAxisDescriptionSingular:"The chart has 1 X axis displaying {names[0]}.",xAxisDescriptionPlural:"The chart has {numAxes} X axes displaying {#each(names, -1) }and {names[-1]}",yAxisDescriptionSingular:"The chart has 1 Y axis displaying {names[0]}.",yAxisDescriptionPlural:"The chart has {numAxes} Y axes displaying {#each(names, -1) }and {names[-1]}"},
exporting:{chartMenuLabel:"Chart export",menuButtonLabel:"View export menu",exportRegionLabel:"Chart export menu"},series:{summary:{default:"{name}, series {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.",defaultCombination:"{name}, series {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.",line:"{name}, line {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.",lineCombination:"{name}, series {ix} of {numSeries}. Line with {numPoints} data {#plural(numPoints, points, point)}.",
spline:"{name}, line {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.",splineCombination:"{name}, series {ix} of {numSeries}. Line with {numPoints} data {#plural(numPoints, points, point)}.",column:"{name}, bar series {ix} of {numSeries} with {numPoints} {#plural(numPoints, bars, bar)}.",columnCombination:"{name}, series {ix} of {numSeries}. Bar series with {numPoints} {#plural(numPoints, bars, bar)}.",bar:"{name}, bar series {ix} of {numSeries} with {numPoints} {#plural(numPoints, bars, bar)}.",
barCombination:"{name}, series {ix} of {numSeries}. Bar series with {numPoints} {#plural(numPoints, bars, bar)}.",pie:"{name}, pie {ix} of {numSeries} with {numPoints} {#plural(numPoints, slices, slice)}.",pieCombination:"{name}, series {ix} of {numSeries}. Pie with {numPoints} {#plural(numPoints, slices, slice)}.",scatter:"{name}, scatter plot {ix} of {numSeries} with {numPoints} {#plural(numPoints, points, point)}.",scatterCombination:"{name}, series {ix} of {numSeries}, scatter plot with {numPoints} {#plural(numPoints, points, point)}.",
boxplot:"{name}, boxplot {ix} of {numSeries} with {numPoints} {#plural(numPoints, boxes, box)}.",boxplotCombination:"{name}, series {ix} of {numSeries}. Boxplot with {numPoints} {#plural(numPoints, boxes, box)}.",bubble:"{name}, bubble series {ix} of {numSeries} with {numPoints} {#plural(numPoints, bubbles, bubble)}.",bubbleCombination:"{name}, series {ix} of {numSeries}. Bubble series with {numPoints} {#plural(numPoints, bubbles, bubble)}.",map:"{name}, map {ix} of {numSeries} with {numPoints} {#plural(numPoints, areas, area)}.",
mapCombination:"{name}, series {ix} of {numSeries}. Map with {numPoints} {#plural(numPoints, areas, area)}.",mapline:"{name}, line {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.",maplineCombination:"{name}, series {ix} of {numSeries}. Line with {numPoints} data {#plural(numPoints, points, point)}.",mapbubble:"{name}, bubble series {ix} of {numSeries} with {numPoints} {#plural(numPoints, bubbles, bubble)}.",mapbubbleCombination:"{name}, series {ix} of {numSeries}. Bubble series with {numPoints} {#plural(numPoints, bubbles, bubble)}."},
description:"{description}",xAxisDescription:"X axis, {name}",yAxisDescription:"Y axis, {name}"}}}})})(r);(function(a){function r(c){return c.replace(/&/g,"\x26amp;").replace(/</g,"\x26lt;").replace(/>/g,"\x26gt;").replace(/"/g,"\x26quot;").replace(/'/g,"\x26#x27;").replace(/\//g,"\x26#x2F;")}function u(c){return"string"===typeof c?c.replace(/<\/?[^>]+(>|$)/g,""):c}function v(c){for(var a=c.childNodes.length;a--;)c.appendChild(c.childNodes[a])}var p=a.win.document,g=a.each,l=a.map,m=a.erase,h=a.addEvent,
n=a.merge,k={position:"absolute",left:"-9999px",top:"auto",width:"1px",height:"1px",overflow:"hidden"};a.Series.prototype.commonKeys="name id category x value y".split(" ");a.Series.prototype.specialKeys="z open high q3 median q1 low close".split(" ");a.seriesTypes.pie&&(a.seriesTypes.pie.prototype.specialKeys=[]);a.setOptions({accessibility:{enabled:!0,pointDescriptionThreshold:!1,screenReaderSectionFormatter:function(c){var a=c.options,e=c.types||[],q={chart:c,numSeries:c.series&&c.series.length},
e=(1===e.length&&"pie"===e[0]||"map"===e[0])&&{}||c.getAxesDescription();return"\x3cdiv\x3e"+c.langFormat("accessibility.navigationHint",q)+"\x3c/div\x3e\x3ch3\x3e"+(a.title.text?r(a.title.text):c.langFormat("accessibility.defaultChartTitle",q))+(a.subtitle&&a.subtitle.text?". "+r(a.subtitle.text):"")+"\x3c/h3\x3e\x3ch4\x3e"+c.langFormat("accessibility.longDescriptionHeading",q)+"\x3c/h4\x3e\x3cdiv\x3e"+(a.chart.description||c.langFormat("accessibility.noDescription",q))+"\x3c/div\x3e\x3ch4\x3e"+
c.langFormat("accessibility.structureHeading",q)+"\x3c/h4\x3e\x3cdiv\x3e"+(a.chart.typeDescription||c.getTypeDescription())+"\x3c/div\x3e"+(e.xAxis?"\x3cdiv\x3e"+e.xAxis+"\x3c/div\x3e":"")+(e.yAxis?"\x3cdiv\x3e"+e.yAxis+"\x3c/div\x3e":"")}}});a.addEvent(a.Series,"afterRender",function(){this.chart.options.accessibility.enabled&&this.setA11yDescription()});a.Series.prototype.setA11yDescription=function(){var c=this.chart.options.accessibility,a=this.points&&this.points.length&&this.points[0].graphic&&
this.points[0].graphic.element,e=a&&a.parentNode||this.graph&&this.graph.element||this.group&&this.group.element;e&&(e.lastChild===a&&v(e),this.points&&(this.points.length<c.pointDescriptionThreshold||!1===c.pointDescriptionThreshold)&&g(this.points,function(a){a.graphic&&(a.graphic.element.setAttribute("role","img"),a.graphic.element.setAttribute("tabindex","-1"),a.graphic.element.setAttribute("aria-label",u(a.series.options.pointDescriptionFormatter&&a.series.options.pointDescriptionFormatter(a)||
c.pointDescriptionFormatter&&c.pointDescriptionFormatter(a)||a.buildPointInfoString())))}),1<this.chart.series.length||c.describeSingleSeries)&&(e.setAttribute("role",this.options.exposeElementToA11y?"img":"region"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-label",u(c.seriesDescriptionFormatter&&c.seriesDescriptionFormatter(this)||this.buildSeriesInfoString())))};a.Series.prototype.buildSeriesInfoString=function(){var a=this.chart,f=this.description||this.options.description,f=f&&a.langFormat("accessibility.series.description",
{description:f,series:this}),e=a.langFormat("accessibility.series.xAxisDescription",{name:this.xAxis&&this.xAxis.getDescription(),series:this}),g=a.langFormat("accessibility.series.yAxisDescription",{name:this.yAxis&&this.yAxis.getDescription(),series:this}),d={name:this.name||"",ix:this.index+1,numSeries:a.series.length,numPoints:this.points.length,series:this},b=1===a.types.length?"":"Combination";return(a.langFormat("accessibility.series.summary."+this.type+b,d)||a.langFormat("accessibility.series.summary.default"+
b,d))+(f?" "+f:"")+(1<a.yAxis.length&&this.yAxis?" "+g:"")+(1<a.xAxis.length&&this.xAxis?" "+e:"")};a.Point.prototype.buildPointInfoString=function(){var c=this,f=c.series,e=f.chart.options.accessibility,q="",d=f.xAxis&&f.xAxis.isDatetimeAxis,e=d&&f.chart.time.dateFormat(e.pointDateFormatter&&e.pointDateFormatter(c)||e.pointDateFormat||a.Tooltip.prototype.getXDateFormat.call({getDateFormat:a.Tooltip.prototype.getDateFormat,chart:f.chart},c,f.chart.options.tooltip,f.xAxis),c.x);a.find(f.specialKeys,
function(b){return void 0!==c[b]})?(d&&(q=e),g(f.commonKeys.concat(f.specialKeys),function(b){void 0===c[b]||d&&"x"===b||(q+=(q?". ":"")+b+", "+c[b])})):q=(this.name||e||this.category||this.id||"x, "+this.x)+", "+(void 0!==this.value?this.value:this.y);return this.index+1+". "+q+"."+(this.description?" "+this.description:"")};a.Axis.prototype.getDescription=function(){return this.userOptions&&this.userOptions.description||this.axisTitle&&this.axisTitle.textStr||this.options.id||this.categories&&"categories"||
this.isDatetimeAxis&&"Time"||"values"};h(a.Series,"afterInit",function(){var a=this.chart;a.options.accessibility.enabled&&(a.types=a.types||[],0>a.types.indexOf(this.type)&&a.types.push(this.type))});h(a.Series,"remove",function(){var a=this.chart,f=this,e=!1;g(a.series,function(c){c!==f&&0>a.types.indexOf(f.type)&&(e=!0)});e||m(a.types,f.type)});a.Chart.prototype.getTypeDescription=function(){var a=this.types&&this.types[0],f=this.series&&this.series[0]||{},e=f.mapTitle,g=this.langFormat("accessibility.seriesTypeDescriptions."+
a,{chart:this}),f={numSeries:this.series.length,numPoints:f.points&&f.points.length,chart:this,mapTitle:e},d=this.series&&1===this.series.length?"Single":"Multiple";if(a){if("map"===a)return e?this.langFormat("accessibility.chartTypes.mapTypeDescription",f):this.langFormat("accessibility.chartTypes.unknownMap",f);if(1<this.types.length)return this.langFormat("accessibility.chartTypes.combinationChart",f)}else return this.langFormat("accessibility.chartTypes.emptyChart",f);return(this.langFormat("accessibility.chartTypes."+
a+d,f)||this.langFormat("accessibility.chartTypes.default"+d,f))+(g?" "+g:"")};a.Chart.prototype.getAxesDescription=function(){var a=this.xAxis.length,f=this.yAxis.length,e={};a&&(e.xAxis=this.langFormat("accessibility.axis.xAxisDescription"+(1<a?"Plural":"Singular"),{chart:this,names:l(this.xAxis,function(a){return a.getDescription()}),numAxes:a}));f&&(e.yAxis=this.langFormat("accessibility.axis.yAxisDescription"+(1<f?"Plural":"Singular"),{chart:this,names:l(this.yAxis,function(a){return a.getDescription()}),
numAxes:f}));return e};a.Chart.prototype.addAccessibleContextMenuAttribs=function(){var a=this.exportDivElements;a&&(g(a,function(a){"DIV"!==a.tagName||a.children&&a.children.length||(a.setAttribute("role","menuitem"),a.setAttribute("tabindex",-1))}),a[0].parentNode.setAttribute("role","menu"),a[0].parentNode.setAttribute("aria-label",this.langFormat("accessibility.exporting.chartMenuLabel",{chart:this})))};a.Chart.prototype.addScreenReaderRegion=function(a,f){var c=this,g=c.screenReaderRegion=p.createElement("div"),
d=p.createElement("h4"),b=p.createElement("a"),t=p.createElement("h4");g.setAttribute("id",a);g.setAttribute("role","region");g.setAttribute("aria-label",c.langFormat("accessibility.screenReaderRegionLabel",{chart:this}));g.innerHTML=c.options.accessibility.screenReaderSectionFormatter(c);c.getCSV&&(b.innerHTML=c.langFormat("accessibility.viewAsDataTable",{chart:c}),b.href="#"+f,b.setAttribute("tabindex","-1"),b.onclick=c.options.accessibility.onTableAnchorClick||function(){c.viewData();p.getElementById(f).focus()},
d.appendChild(b),g.appendChild(d));t.innerHTML=c.langFormat("accessibility.chartHeading",{chart:c});c.renderTo.insertBefore(t,c.renderTo.firstChild);c.renderTo.insertBefore(g,c.renderTo.firstChild);n(!0,t.style,k);n(!0,g.style,k)};a.Chart.prototype.callbacks.push(function(c){var f=c.options;if(f.accessibility.enabled){var e=c.container.getElementsByTagName("desc")[0],h=c.container.getElementsByTagName("text"),d="highcharts-title-"+c.index,b="highcharts-data-table-"+c.index,t="highcharts-information-region-"+
c.index,w=f.title.text||c.langFormat("accessibility.defaultChartTitle",{chart:c}),x=u(c.langFormat("accessibility.svgContainerTitle",{chartTitle:w}));x.length&&(f=p.createElementNS("http://www.w3.org/2000/svg","title"),f.textContent=x,f.id=d,e.parentNode.insertBefore(f,e));c.renderTo.setAttribute("role","region");c.renderTo.setAttribute("aria-label",c.langFormat("accessibility.chartContainerLabel",{title:u(w),chart:c}));if(c.exportSVGElements&&c.exportSVGElements[0]&&c.exportSVGElements[0].element){var e=
c.exportSVGElements[0].element,y=e.onclick;e.onclick=function(){y.apply(this,Array.prototype.slice.call(arguments));c.addAccessibleContextMenuAttribs();c.highlightExportItem(0)};e.setAttribute("role","button");e.setAttribute("aria-label",c.langFormat("accessibility.exporting.menuButtonLabel",{chart:c}));c.exportingGroup.element.setAttribute("role","region");c.exportingGroup.element.setAttribute("aria-label",c.langFormat("accessibility.exporting.exportRegionLabel",{chart:c}))}c.rangeSelector&&g(["minInput",
"maxInput"],function(b,d){c.rangeSelector[b]&&(c.rangeSelector[b].setAttribute("tabindex","-1"),c.rangeSelector[b].setAttribute("role","textbox"),c.rangeSelector[b].setAttribute("aria-label",c.langFormat("accessibility.rangeSelector"+(d?"MaxInput":"MinInput"),{chart:c})))});g(h,function(b){b.setAttribute("aria-hidden","true")});c.addScreenReaderRegion(t,b);a.wrap(c,"getTable",function(d){return d.apply(this,Array.prototype.slice.call(arguments,1)).replace("\x3ctable\x3e",'\x3ctable id\x3d"'+b+'" summary\x3d"'+
c.langFormat("accessibility.tableSummary",{chart:c})+'"\x3e')})}})})(r);(function(a){function r(d){return"string"===typeof d?d.replace(/<\/?[^>]+(>|$)/g,""):d}function u(d){var b=d.index,a=d.series.points,c=a.length;if(a[b]!==d)for(;c--;){if(a[c]===d)return c}else return b}function v(d,b){this.chart=d;this.id=b.id;this.keyCodeMap=b.keyCodeMap;this.validate=b.validate;this.init=b.init;this.terminate=b.terminate}function p(d){var b;d&&d.onclick&&h.createEvent&&(b=h.createEvent("Events"),b.initEvent("click",
!0,!1),d.onclick(b))}function g(d){var b=d.chart.options.accessibility;return d.options.skipKeyboardNavigation||!1===d.options.enableMouseTracking||!d.visible||b.pointDescriptionThreshold&&b.pointDescriptionThreshold<=d.points.length}function l(d){var b=d.series.chart.options.accessibility;return d.isNull&&b.keyboardNavigation.skipNullPoints||!1===d.visible||g(d.series)}var m=a.win,h=m.document,n=a.each,k=a.addEvent,c=a.fireEvent,f=a.merge,e=a.pick,q;a.extend(a.SVGElement.prototype,{addFocusBorder:function(d,
b){this.focusBorder&&this.removeFocusBorder();var a=this.getBBox();d=e(d,3);this.focusBorder=this.renderer.rect(a.x-d,a.y-d,a.width+2*d,a.height+2*d,b&&b.borderRadius).addClass("highcharts-focus-border").attr({stroke:b&&b.stroke,"stroke-width":b&&b.strokeWidth}).attr({zIndex:99}).add(this.parentGroup)},removeFocusBorder:function(){this.focusBorder&&(this.focusBorder.destroy(),delete this.focusBorder)}});a.Series.prototype.keyboardMoveVertical=!0;n(["column","pie"],function(d){a.seriesTypes[d]&&(a.seriesTypes[d].prototype.keyboardMoveVertical=
!1)});a.setOptions({accessibility:{keyboardNavigation:{enabled:!0,focusBorder:{enabled:!0,hideBrowserFocusOutline:!0,style:{color:"#335cad",lineWidth:2,borderRadius:3},margin:2},skipNullPoints:!0}}});v.prototype={run:function(d){var b=this,a=d.which||d.keyCode,c=!1,g=!1;n(this.keyCodeMap,function(t){-1<t[0].indexOf(a)&&(c=!0,g=!1===t[1].call(b,a,d)?!1:!0)});c||9!==a||(g=this.move(d.shiftKey?-1:1));return g},move:function(a){var b=this.chart;this.terminate&&this.terminate(a);b.keyboardNavigationModuleIndex+=
a;var d=b.keyboardNavigationModules[b.keyboardNavigationModuleIndex];b.focusElement&&b.focusElement.removeFocusBorder();if(d){if(d.validate&&!d.validate())return this.move(a);if(d.init)return d.init(a),!0}b.keyboardNavigationModuleIndex=0;0<a?(this.chart.exiting=!0,this.chart.tabExitAnchor.focus()):this.chart.renderTo.focus();return!1}};a.Axis.prototype.panStep=function(a,b){var d=b||3;b=this.getExtremes();var c=(b.max-b.min)/d*a,d=b.max+c,c=b.min+c,g=d-c;0>a&&c<b.dataMin?(c=b.dataMin,d=c+g):0<a&&
d>b.dataMax&&(d=b.dataMax,c=d-g);this.setExtremes(c,d)};a.Chart.prototype.setFocusToElement=function(a,b){var d=this.options.accessibility.keyboardNavigation.focusBorder;b=b||a;b.element&&b.element.focus&&(b.element.focus(),d.hideBrowserFocusOutline&&b.css({outline:"none"}));d.enabled&&(this.focusElement&&this.focusElement.removeFocusBorder(),a.addFocusBorder(d.margin,{stroke:d.style.color,strokeWidth:d.style.lineWidth,borderRadius:d.style.borderRadius}),this.focusElement=a)};a.Point.prototype.highlight=
function(){var a=this.series.chart;if(this.isNull)a.tooltip&&a.tooltip.hide(0);else this.onMouseOver();this.graphic&&a.setFocusToElement(this.graphic);a.highlightedPoint=this;return this};a.Chart.prototype.highlightAdjacentPoint=function(a){var b=this.series,d=this.highlightedPoint,c=d&&u(d)||0,f=d&&d.series.points,e=this.series&&this.series[this.series.length-1],e=e&&e.points&&e.points[e.points.length-1];if(!b[0]||!b[0].points)return!1;if(d){if(b=b[d.series.index+(a?1:-1)],c=f[c+(a?1:-1)],!c&&b&&
(c=b.points[a?0:b.points.length-1]),!c)return!1}else c=a?b[0].points[0]:e;return l(c)?(b=c.series,g(b)?this.highlightedPoint=a?b.points[b.points.length-1]:b.points[0]:this.highlightedPoint=c,this.highlightAdjacentPoint(a)):c.highlight()};a.Series.prototype.highlightFirstValidPoint=function(){var a=this.chart.highlightedPoint,b=(a&&a.series)===this?u(a):0;if(a=this.points){for(var c=b,w=a.length;c<w;++c)if(!l(a[c]))return a[c].highlight();for(;0<=b;--b)if(!l(a[b]))return a[b].highlight()}return!1};
a.Chart.prototype.highlightAdjacentSeries=function(a){var b,d,c=this.highlightedPoint,f=(b=this.series&&this.series[this.series.length-1])&&b.points&&b.points[b.points.length-1];if(!this.highlightedPoint)return b=a?this.series&&this.series[0]:b,(d=a?b&&b.points&&b.points[0]:f)?d.highlight():!1;b=this.series[c.series.index+(a?-1:1)];if(!b)return!1;var f=Infinity,e,h=b.points.length;if(void 0===c.plotX||void 0===c.plotY)d=void 0;else{for(;h--;)e=b.points[h],void 0!==e.plotX&&void 0!==e.plotY&&(e=(c.plotX-
e.plotX)*(c.plotX-e.plotX)*4+(c.plotY-e.plotY)*(c.plotY-e.plotY)*1,e<f&&(f=e,d=h));d=void 0!==d&&b.points[d]}if(!d)return!1;if(g(b))return d.highlight(),a=this.highlightAdjacentSeries(a),a?a:(c.highlight(),!1);d.highlight();return d.series.highlightFirstValidPoint()};a.Chart.prototype.highlightAdjacentPointVertical=function(a){var b=this.highlightedPoint,d=Infinity,c;if(void 0===b.plotX||void 0===b.plotY)return!1;n(this.series,function(t){g(t)||n(t.points,function(e){if(void 0!==e.plotY&&void 0!==
e.plotX&&e!==b){var g=e.plotY-b.plotY,f=Math.abs(e.plotX-b.plotX),f=Math.abs(g)*Math.abs(g)+f*f*4;t.yAxis.reversed&&(g*=-1);!(0>g&&a||0<g&&!a||5>f||l(e))&&f<d&&(d=f,c=e)}})});return c?c.highlight():!1};a.Chart.prototype.showExportMenu=function(){this.exportSVGElements&&this.exportSVGElements[0]&&(this.exportSVGElements[0].element.onclick(),this.highlightExportItem(0))};a.Chart.prototype.hideExportMenu=function(){var a=this.exportDivElements;a&&this.exportContextMenu&&(n(a,function(b){if("highcharts-menu-item"===
b.className&&b.onmouseout)b.onmouseout()}),this.highlightedExportItem=0,this.exportContextMenu.hideMenu(),this.container.focus())};a.Chart.prototype.highlightExportItem=function(a){var b=this.exportDivElements&&this.exportDivElements[a],d=this.exportDivElements&&this.exportDivElements[this.highlightedExportItem];if(b&&"DIV"===b.tagName&&(!b.children||!b.children.length)){b.focus&&q&&b.focus();if(d&&d.onmouseout)d.onmouseout();if(b.onmouseover)b.onmouseover();this.highlightedExportItem=a;return!0}};
a.Chart.prototype.highlightLastExportItem=function(){var a;if(this.exportDivElements)for(a=this.exportDivElements.length;a--&&!this.highlightExportItem(a););};a.Chart.prototype.highlightRangeSelectorButton=function(a){var b=this.rangeSelector.buttons;b[this.highlightedRangeSelectorItemIx]&&b[this.highlightedRangeSelectorItemIx].setState(this.oldRangeSelectorItemState||0);this.highlightedRangeSelectorItemIx=a;return b[a]?(this.setFocusToElement(b[a].box,b[a]),this.oldRangeSelectorItemState=b[a].state,
b[a].setState(2),!0):!1};a.Chart.prototype.highlightLegendItem=function(a){var b=this.legend.allItems,d=this.highlightedLegendItemIx;return b[a]?(b[d]&&c(b[d].legendGroup.element,"mouseout"),void 0!==b[a].pageIx&&b[a].pageIx+1!==this.legend.currentPage&&this.legend.scroll(1+b[a].pageIx-this.legend.currentPage),this.highlightedLegendItemIx=a,this.setFocusToElement(b[a].legendItem,b[a].legendGroup),c(b[a].legendGroup.element,"mouseover"),!0):!1};a.Chart.prototype.addKeyboardNavigationModules=function(){function a(a,
d,c){return new v(b,f({keyCodeMap:d},{id:a},c))}var b=this;b.keyboardNavigationModules=[a("entry",[]),a("points",[[[37,39],function(a){a=39===a;return b.highlightAdjacentPoint(a)?!0:this.init(a?1:-1)}],[[38,40],function(a){a=38!==a;var d=b.options.accessibility.keyboardNavigation;if(d.mode&&"serialize"===d.mode)return b.highlightAdjacentPoint(a)?!0:this.init(a?1:-1);b[b.highlightedPoint&&b.highlightedPoint.series.keyboardMoveVertical?"highlightAdjacentPointVertical":"highlightAdjacentSeries"](a);
return!0}],[[13,32],function(){b.highlightedPoint&&b.highlightedPoint.firePointEvent("click")}]],{init:function(a){var d=b.series.length,c=0<a?0:d;if(0<a)for(delete b.highlightedPoint;c<d;){if(a=b.series[c].highlightFirstValidPoint())return a;++c}else for(;c--;)if(b.highlightedPoint=b.series[c].points[b.series[c].points.length-1],a=b.series[c].highlightFirstValidPoint())return a},terminate:function(){b.tooltip&&b.tooltip.hide(0);delete b.highlightedPoint}}),a("exporting",[[[37,38],function(){for(var a=
b.highlightedExportItem||0,d=!0;a--;)if(b.highlightExportItem(a)){d=!1;break}if(d)return b.highlightLastExportItem(),!0}],[[39,40],function(){for(var a=!0,d=(b.highlightedExportItem||0)+1;d<b.exportDivElements.length;++d)if(b.highlightExportItem(d)){a=!1;break}if(a)return b.highlightExportItem(0),!0}],[[13,32],function(){p(b.exportDivElements[b.highlightedExportItem])}]],{validate:function(){return b.exportChart&&!(b.options.exporting&&!1===b.options.exporting.enabled)},init:function(a){b.highlightedPoint=
null;b.showExportMenu();0>a&&b.highlightLastExportItem()},terminate:function(){b.hideExportMenu()}}),a("mapZoom",[[[38,40,37,39],function(a){b[38===a||40===a?"yAxis":"xAxis"][0].panStep(39>a?-1:1)}],[[9],function(a,d){b.mapNavButtons[b.focusedMapNavButtonIx].setState(0);if(d.shiftKey&&!b.focusedMapNavButtonIx||!d.shiftKey&&b.focusedMapNavButtonIx)return b.mapZoom(),this.move(d.shiftKey?-1:1);b.focusedMapNavButtonIx+=d.shiftKey?-1:1;a=b.mapNavButtons[b.focusedMapNavButtonIx];b.setFocusToElement(a.box,
a);a.setState(2)}],[[13,32],function(){p(b.mapNavButtons[b.focusedMapNavButtonIx].element)}]],{validate:function(){return b.mapZoom&&b.mapNavButtons&&2===b.mapNavButtons.length},init:function(a){var d=b.mapNavButtons[0],c=b.mapNavButtons[1],d=0<a?d:c;n(b.mapNavButtons,function(a,d){a.element.setAttribute("tabindex",-1);a.element.setAttribute("role","button");a.element.setAttribute("aria-label",b.langFormat("accessibility.mapZoom"+(d?"Out":"In"),{chart:b}))});b.setFocusToElement(d.box,d);d.setState(2);
b.focusedMapNavButtonIx=0<a?0:1}}),a("rangeSelector",[[[37,39,38,40],function(a){a=37===a||38===a?-1:1;if(!b.highlightRangeSelectorButton(b.highlightedRangeSelectorItemIx+a))return this.move(a)}],[[13,32],function(){3!==b.oldRangeSelectorItemState&&p(b.rangeSelector.buttons[b.highlightedRangeSelectorItemIx].element)}]],{validate:function(){return b.rangeSelector&&b.rangeSelector.buttons&&b.rangeSelector.buttons.length},init:function(a){n(b.rangeSelector.buttons,function(a){a.element.setAttribute("tabindex",
"-1");a.element.setAttribute("role","button");a.element.setAttribute("aria-label",b.langFormat("accessibility.rangeSelectorButton",{chart:b,buttonText:a.text&&a.text.textStr}))});b.highlightRangeSelectorButton(0<a?0:b.rangeSelector.buttons.length-1)}}),a("rangeSelectorInput",[[[9,38,40],function(a,d){a=9===a&&d.shiftKey||38===a?-1:1;d=b.highlightedInputRangeIx+=a;if(1<d||0>d)return this.move(a);b.rangeSelector[d?"maxInput":"minInput"].focus()}]],{validate:function(){return b.rangeSelector&&b.rangeSelector.inputGroup&&
"hidden"!==b.rangeSelector.inputGroup.element.getAttribute("visibility")&&!1!==b.options.rangeSelector.inputEnabled&&b.rangeSelector.minInput&&b.rangeSelector.maxInput},init:function(a){b.highlightedInputRangeIx=0<a?0:1;b.rangeSelector[b.highlightedInputRangeIx?"maxInput":"minInput"].focus()}}),a("legend",[[[37,39,38,40],function(a){a=37===a||38===a?-1:1;!b.highlightLegendItem(b.highlightedLegendItemIx+a)&&1<b.legend.allItems.length&&this.init(a)}],[[13,32],function(){var a=b.legend.allItems[b.highlightedLegendItemIx].legendItem.element;
p(b.legend.options.useHTML?a:a.parentNode)}]],{validate:function(){return b.legend&&b.legend.allItems&&b.legend.display&&!(b.colorAxis&&b.colorAxis.length)&&!1!==(b.options.legend&&b.options.legend.keyboardNavigation&&b.options.legend.keyboardNavigation.enabled)},init:function(a){n(b.legend.allItems,function(a){a.legendGroup.element.setAttribute("tabindex","-1");a.legendGroup.element.setAttribute("role","button");a.legendGroup.element.setAttribute("aria-label",b.langFormat("accessibility.legendItem",
{chart:b,itemName:r(a.name)}))});b.highlightLegendItem(0<a?0:b.legend.allItems.length-1)}})]};a.Chart.prototype.addExitAnchor=function(){var a=this;a.tabExitAnchor=h.createElement("div");a.tabExitAnchor.setAttribute("tabindex","0");f(!0,a.tabExitAnchor.style,{position:"absolute",left:"-9999px",top:"auto",width:"1px",height:"1px",overflow:"hidden"});a.renderTo.appendChild(a.tabExitAnchor);return k(a.tabExitAnchor,"focus",function(b){b=b||m.event;a.exiting?a.exiting=!1:(a.renderTo.focus(),b.preventDefault(),
a.keyboardNavigationModuleIndex=a.keyboardNavigationModules.length-1,b=a.keyboardNavigationModules[a.keyboardNavigationModuleIndex],b.validate&&!b.validate()?b.move(-1):b.init(-1))})};a.Chart.prototype.resetKeyboardNavigation=function(){var a=this.keyboardNavigationModules&&this.keyboardNavigationModules[this.keyboardNavigationModuleIndex||0];a&&a.terminate&&a.terminate();this.focusElement&&this.focusElement.removeFocusBorder();this.keyboardNavigationModuleIndex=0;this.keyboardReset=!0};a.addEvent(a.Series,
"destroy",function(){var a=this.chart;a.highlightedPoint&&a.highlightedPoint.series===this&&(delete a.highlightedPoint,a.focusElement&&a.focusElement.removeFocusBorder())});a.Chart.prototype.callbacks.push(function(a){var b=a.options.accessibility;b.enabled&&b.keyboardNavigation.enabled&&(q=!!a.renderTo.getElementsByTagName("g")[0].focus,a.addKeyboardNavigationModules(),a.keyboardNavigationModuleIndex=0,a.container.hasAttribute&&!a.container.hasAttribute("tabIndex")&&a.container.setAttribute("tabindex",
"0"),a.tabExitAnchor||(a.unbindExitAnchorFocus=a.addExitAnchor()),a.unbindKeydownHandler=k(a.renderTo,"keydown",function(b){b=b||m.event;var c=a.keyboardNavigationModules[a.keyboardNavigationModuleIndex];a.keyboardReset=!1;c&&c.run(b)&&b.preventDefault()}),a.unbindBlurHandler=k(h,"mouseup",function(){a.keyboardReset||a.pointer&&a.pointer.chartPosition||a.resetKeyboardNavigation()}),k(a,"destroy",function(){a.resetKeyboardNavigation();a.unbindExitAnchorFocus&&a.tabExitAnchor&&a.unbindExitAnchorFocus();
a.unbindKeydownHandler&&a.renderTo&&a.unbindKeydownHandler();a.unbindBlurHandler&&a.unbindBlurHandler()}))})})(r)});
//# sourceMappingURL=accessibility.js.map