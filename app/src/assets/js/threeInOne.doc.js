(function($,jQuery){
/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=83a1b08d92567891d73b0c972d9be656)
 * Config saved to config.json and https://gist.github.com/83a1b08d92567891d73b0c972d9be656
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(t){"use strict";var e=t.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1==e[0]&&9==e[1]&&e[2]<1||e[0]>3)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")}(jQuery),+function(t){"use strict";function e(e,i){return this.each(function(){var n=t(this),s=n.data("bs.modal"),r=t.extend({},o.DEFAULTS,n.data(),"object"==typeof e&&e);s||n.data("bs.modal",s=new o(this,r)),"string"==typeof e?s[e](i):r.show&&s.show(i)})}var o=function(e,o){this.options=o,this.$body=t(document.body),this.$element=t(e),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,t.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};o.VERSION="3.3.7",o.TRANSITION_DURATION=300,o.BACKDROP_TRANSITION_DURATION=150,o.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},o.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},o.prototype.show=function(e){var i=this,n=t.Event("show.bs.modal",{relatedTarget:e});this.$element.trigger(n),this.isShown||n.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',t.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){i.$element.one("mouseup.dismiss.bs.modal",function(e){t(e.target).is(i.$element)&&(i.ignoreBackdropClick=!0)})}),this.backdrop(function(){var n=t.support.transition&&i.$element.hasClass("fade");i.$element.parent().length||i.$element.appendTo(i.$body),i.$element.show().scrollTop(0),i.adjustDialog(),n&&i.$element[0].offsetWidth,i.$element.addClass("in"),i.enforceFocus();var s=t.Event("shown.bs.modal",{relatedTarget:e});n?i.$dialog.one("bsTransitionEnd",function(){i.$element.trigger("focus").trigger(s)}).emulateTransitionEnd(o.TRANSITION_DURATION):i.$element.trigger("focus").trigger(s)}))},o.prototype.hide=function(e){e&&e.preventDefault(),e=t.Event("hide.bs.modal"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),t(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),t.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",t.proxy(this.hideModal,this)).emulateTransitionEnd(o.TRANSITION_DURATION):this.hideModal())},o.prototype.enforceFocus=function(){t(document).off("focusin.bs.modal").on("focusin.bs.modal",t.proxy(function(t){document===t.target||this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")},this))},o.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",t.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},o.prototype.resize=function(){this.isShown?t(window).on("resize.bs.modal",t.proxy(this.handleUpdate,this)):t(window).off("resize.bs.modal")},o.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.$body.removeClass("modal-open"),t.resetAdjustments(),t.resetScrollbar(),t.$element.trigger("hidden.bs.modal")})},o.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},o.prototype.backdrop=function(e){var i=this,n=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var s=t.support.transition&&n;if(this.$backdrop=t(document.createElement("div")).addClass("modal-backdrop "+n).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",t.proxy(function(t){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),s&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!e)return;s?this.$backdrop.one("bsTransitionEnd",e).emulateTransitionEnd(o.BACKDROP_TRANSITION_DURATION):e()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var r=function(){i.removeBackdrop(),e&&e()};t.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",r).emulateTransitionEnd(o.BACKDROP_TRANSITION_DURATION):r()}else e&&e()},o.prototype.handleUpdate=function(){this.adjustDialog()},o.prototype.adjustDialog=function(){var t=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:""})},o.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},o.prototype.checkScrollbar=function(){var t=window.innerWidth;if(!t){var e=document.documentElement.getBoundingClientRect();t=e.right-Math.abs(e.left)}this.bodyIsOverflowing=document.body.clientWidth<t,this.scrollbarWidth=this.measureScrollbar()},o.prototype.setScrollbar=function(){var t=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",t+this.scrollbarWidth)},o.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},o.prototype.measureScrollbar=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",this.$body.append(t);var e=t.offsetWidth-t.clientWidth;return this.$body[0].removeChild(t),e};var i=t.fn.modal;t.fn.modal=e,t.fn.modal.Constructor=o,t.fn.modal.noConflict=function(){return t.fn.modal=i,this},t(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(o){var i=t(this),n=i.attr("href"),s=t(i.attr("data-target")||n&&n.replace(/.*(?=#[^\s]+$)/,"")),r=s.data("bs.modal")?"toggle":t.extend({remote:!/#/.test(n)&&n},s.data(),i.data());i.is("a")&&o.preventDefault(),s.one("show.bs.modal",function(t){t.isDefaultPrevented()||s.one("hidden.bs.modal",function(){i.is(":visible")&&i.trigger("focus")})}),e.call(s,r,this)})}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var i=t(this),n=i.data("bs.tooltip"),s="object"==typeof e&&e;!n&&/destroy|hide/.test(e)||(n||i.data("bs.tooltip",n=new o(this,s)),"string"==typeof e&&n[e]())})}var o=function(t,e){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",t,e)};o.VERSION="3.3.7",o.TRANSITION_DURATION=150,o.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},o.prototype.init=function(e,o,i){if(this.enabled=!0,this.type=e,this.$element=t(o),this.options=this.getOptions(i),this.$viewport=this.options.viewport&&t(t.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var n=this.options.trigger.split(" "),s=n.length;s--;){var r=n[s];if("click"==r)this.$element.on("click."+this.type,this.options.selector,t.proxy(this.toggle,this));else if("manual"!=r){var a="hover"==r?"mouseenter":"focusin",l="hover"==r?"mouseleave":"focusout";this.$element.on(a+"."+this.type,this.options.selector,t.proxy(this.enter,this)),this.$element.on(l+"."+this.type,this.options.selector,t.proxy(this.leave,this))}}this.options.selector?this._options=t.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},o.prototype.getDefaults=function(){return o.DEFAULTS},o.prototype.getOptions=function(e){return e=t.extend({},this.getDefaults(),this.$element.data(),e),e.delay&&"number"==typeof e.delay&&(e.delay={show:e.delay,hide:e.delay}),e},o.prototype.getDelegateOptions=function(){var e={},o=this.getDefaults();return this._options&&t.each(this._options,function(t,i){o[t]!=i&&(e[t]=i)}),e},o.prototype.enter=function(e){var o=e instanceof this.constructor?e:t(e.currentTarget).data("bs."+this.type);return o||(o=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,o)),e instanceof t.Event&&(o.inState["focusin"==e.type?"focus":"hover"]=!0),o.tip().hasClass("in")||"in"==o.hoverState?void(o.hoverState="in"):(clearTimeout(o.timeout),o.hoverState="in",o.options.delay&&o.options.delay.show?void(o.timeout=setTimeout(function(){"in"==o.hoverState&&o.show()},o.options.delay.show)):o.show())},o.prototype.isInStateTrue=function(){for(var t in this.inState)if(this.inState[t])return!0;return!1},o.prototype.leave=function(e){var o=e instanceof this.constructor?e:t(e.currentTarget).data("bs."+this.type);return o||(o=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,o)),e instanceof t.Event&&(o.inState["focusout"==e.type?"focus":"hover"]=!1),o.isInStateTrue()?void 0:(clearTimeout(o.timeout),o.hoverState="out",o.options.delay&&o.options.delay.hide?void(o.timeout=setTimeout(function(){"out"==o.hoverState&&o.hide()},o.options.delay.hide)):o.hide())},o.prototype.show=function(){var e=t.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(e);var i=t.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(e.isDefaultPrevented()||!i)return;var n=this,s=this.tip(),r=this.getUID(this.type);this.setContent(),s.attr("id",r),this.$element.attr("aria-describedby",r),this.options.animation&&s.addClass("fade");var a="function"==typeof this.options.placement?this.options.placement.call(this,s[0],this.$element[0]):this.options.placement,l=/\s?auto?\s?/i,h=l.test(a);h&&(a=a.replace(l,"")||"top"),s.detach().css({top:0,left:0,display:"block"}).addClass(a).data("bs."+this.type,this),this.options.container?s.appendTo(this.options.container):s.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var p=this.getPosition(),d=s[0].offsetWidth,c=s[0].offsetHeight;if(h){var f=a,u=this.getPosition(this.$viewport);a="bottom"==a&&p.bottom+c>u.bottom?"top":"top"==a&&p.top-c<u.top?"bottom":"right"==a&&p.right+d>u.width?"left":"left"==a&&p.left-d<u.left?"right":a,s.removeClass(f).addClass(a)}var m=this.getCalculatedOffset(a,p,d,c);this.applyPlacement(m,a);var g=function(){var t=n.hoverState;n.$element.trigger("shown.bs."+n.type),n.hoverState=null,"out"==t&&n.leave(n)};t.support.transition&&this.$tip.hasClass("fade")?s.one("bsTransitionEnd",g).emulateTransitionEnd(o.TRANSITION_DURATION):g()}},o.prototype.applyPlacement=function(e,o){var i=this.tip(),n=i[0].offsetWidth,s=i[0].offsetHeight,r=parseInt(i.css("margin-top"),10),a=parseInt(i.css("margin-left"),10);isNaN(r)&&(r=0),isNaN(a)&&(a=0),e.top+=r,e.left+=a,t.offset.setOffset(i[0],t.extend({using:function(t){i.css({top:Math.round(t.top),left:Math.round(t.left)})}},e),0),i.addClass("in");var l=i[0].offsetWidth,h=i[0].offsetHeight;"top"==o&&h!=s&&(e.top=e.top+s-h);var p=this.getViewportAdjustedDelta(o,e,l,h);p.left?e.left+=p.left:e.top+=p.top;var d=/top|bottom/.test(o),c=d?2*p.left-n+l:2*p.top-s+h,f=d?"offsetWidth":"offsetHeight";i.offset(e),this.replaceArrow(c,i[0][f],d)},o.prototype.replaceArrow=function(t,e,o){this.arrow().css(o?"left":"top",50*(1-t/e)+"%").css(o?"top":"left","")},o.prototype.setContent=function(){var t=this.tip(),e=this.getTitle();t.find(".tooltip-inner")[this.options.html?"html":"text"](e),t.removeClass("fade in top bottom left right")},o.prototype.hide=function(e){function i(){"in"!=n.hoverState&&s.detach(),n.$element&&n.$element.removeAttr("aria-describedby").trigger("hidden.bs."+n.type),e&&e()}var n=this,s=t(this.$tip),r=t.Event("hide.bs."+this.type);return this.$element.trigger(r),r.isDefaultPrevented()?void 0:(s.removeClass("in"),t.support.transition&&s.hasClass("fade")?s.one("bsTransitionEnd",i).emulateTransitionEnd(o.TRANSITION_DURATION):i(),this.hoverState=null,this)},o.prototype.fixTitle=function(){var t=this.$element;(t.attr("title")||"string"!=typeof t.attr("data-original-title"))&&t.attr("data-original-title",t.attr("title")||"").attr("title","")},o.prototype.hasContent=function(){return this.getTitle()},o.prototype.getPosition=function(e){e=e||this.$element;var o=e[0],i="BODY"==o.tagName,n=o.getBoundingClientRect();null==n.width&&(n=t.extend({},n,{width:n.right-n.left,height:n.bottom-n.top}));var s=window.SVGElement&&o instanceof window.SVGElement,r=i?{top:0,left:0}:s?null:e.offset(),a={scroll:i?document.documentElement.scrollTop||document.body.scrollTop:e.scrollTop()},l=i?{width:t(window).width(),height:t(window).height()}:null;return t.extend({},n,a,l,r)},o.prototype.getCalculatedOffset=function(t,e,o,i){return"bottom"==t?{top:e.top+e.height,left:e.left+e.width/2-o/2}:"top"==t?{top:e.top-i,left:e.left+e.width/2-o/2}:"left"==t?{top:e.top+e.height/2-i/2,left:e.left-o}:{top:e.top+e.height/2-i/2,left:e.left+e.width}},o.prototype.getViewportAdjustedDelta=function(t,e,o,i){var n={top:0,left:0};if(!this.$viewport)return n;var s=this.options.viewport&&this.options.viewport.padding||0,r=this.getPosition(this.$viewport);if(/right|left/.test(t)){var a=e.top-s-r.scroll,l=e.top+s-r.scroll+i;a<r.top?n.top=r.top-a:l>r.top+r.height&&(n.top=r.top+r.height-l)}else{var h=e.left-s,p=e.left+s+o;h<r.left?n.left=r.left-h:p>r.right&&(n.left=r.left+r.width-p)}return n},o.prototype.getTitle=function(){var t,e=this.$element,o=this.options;return t=e.attr("data-original-title")||("function"==typeof o.title?o.title.call(e[0]):o.title)},o.prototype.getUID=function(t){do t+=~~(1e6*Math.random());while(document.getElementById(t));return t},o.prototype.tip=function(){if(!this.$tip&&(this.$tip=t(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},o.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},o.prototype.enable=function(){this.enabled=!0},o.prototype.disable=function(){this.enabled=!1},o.prototype.toggleEnabled=function(){this.enabled=!this.enabled},o.prototype.toggle=function(e){var o=this;e&&(o=t(e.currentTarget).data("bs."+this.type),o||(o=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,o))),e?(o.inState.click=!o.inState.click,o.isInStateTrue()?o.enter(o):o.leave(o)):o.tip().hasClass("in")?o.leave(o):o.enter(o)},o.prototype.destroy=function(){var t=this;clearTimeout(this.timeout),this.hide(function(){t.$element.off("."+t.type).removeData("bs."+t.type),t.$tip&&t.$tip.detach(),t.$tip=null,t.$arrow=null,t.$viewport=null,t.$element=null})};var i=t.fn.tooltip;t.fn.tooltip=e,t.fn.tooltip.Constructor=o,t.fn.tooltip.noConflict=function(){return t.fn.tooltip=i,this}}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var i=t(this),n=i.data("bs.popover"),s="object"==typeof e&&e;!n&&/destroy|hide/.test(e)||(n||i.data("bs.popover",n=new o(this,s)),"string"==typeof e&&n[e]())})}var o=function(t,e){this.init("popover",t,e)};if(!t.fn.tooltip)throw new Error("Popover requires tooltip.js");o.VERSION="3.3.7",o.DEFAULTS=t.extend({},t.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),o.prototype=t.extend({},t.fn.tooltip.Constructor.prototype),o.prototype.constructor=o,o.prototype.getDefaults=function(){return o.DEFAULTS},o.prototype.setContent=function(){var t=this.tip(),e=this.getTitle(),o=this.getContent();t.find(".popover-title")[this.options.html?"html":"text"](e),t.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof o?"html":"append":"text"](o),t.removeClass("fade top bottom left right in"),t.find(".popover-title").html()||t.find(".popover-title").hide()},o.prototype.hasContent=function(){return this.getTitle()||this.getContent()},o.prototype.getContent=function(){var t=this.$element,e=this.options;return t.attr("data-content")||("function"==typeof e.content?e.content.call(t[0]):e.content)},o.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var i=t.fn.popover;t.fn.popover=e,t.fn.popover.Constructor=o,t.fn.popover.noConflict=function(){return t.fn.popover=i,this}}(jQuery);
})($cmsj,$cmsj);
/*
 AngularJS v1.5.7
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(R,C){'use strict';function Aa(a,b,c){if(!a)throw Ma("areq",b||"?",c||"required");return a}function Ba(a,b){if(!a&&!b)return"";if(!a)return b;if(!b)return a;ca(a)&&(a=a.join(" "));ca(b)&&(b=b.join(" "));return a+" "+b}function Na(a){var b={};a&&(a.to||a.from)&&(b.to=a.to,b.from=a.from);return b}function Y(a,b,c){var d="";a=ca(a)?a:a&&O(a)&&a.length?a.split(/\s+/):[];s(a,function(a,l){a&&0<a.length&&(d+=0<l?" ":"",d+=c?b+a:a+b)});return d}function Oa(a){if(a instanceof G)switch(a.length){case 0:return a;
case 1:if(1===a[0].nodeType)return a;break;default:return G(da(a))}if(1===a.nodeType)return G(a)}function da(a){if(!a[0])return a;for(var b=0;b<a.length;b++){var c=a[b];if(1==c.nodeType)return c}}function Pa(a,b,c){s(b,function(b){a.addClass(b,c)})}function Qa(a,b,c){s(b,function(b){a.removeClass(b,c)})}function V(a){return function(b,c){c.addClass&&(Pa(a,b,c.addClass),c.addClass=null);c.removeClass&&(Qa(a,b,c.removeClass),c.removeClass=null)}}function oa(a){a=a||{};if(!a.$$prepared){var b=a.domOperation||
Q;a.domOperation=function(){a.$$domOperationFired=!0;b();b=Q};a.$$prepared=!0}return a}function ha(a,b){Ca(a,b);Da(a,b)}function Ca(a,b){b.from&&(a.css(b.from),b.from=null)}function Da(a,b){b.to&&(a.css(b.to),b.to=null)}function W(a,b,c){var d=b.options||{};c=c.options||{};var e=(d.addClass||"")+" "+(c.addClass||""),l=(d.removeClass||"")+" "+(c.removeClass||"");a=Ra(a.attr("class"),e,l);c.preparationClasses&&(d.preparationClasses=Z(c.preparationClasses,d.preparationClasses),delete c.preparationClasses);
e=d.domOperation!==Q?d.domOperation:null;Ea(d,c);e&&(d.domOperation=e);d.addClass=a.addClass?a.addClass:null;d.removeClass=a.removeClass?a.removeClass:null;b.addClass=d.addClass;b.removeClass=d.removeClass;return d}function Ra(a,b,c){function d(a){O(a)&&(a=a.split(" "));var b={};s(a,function(a){a.length&&(b[a]=!0)});return b}var e={};a=d(a);b=d(b);s(b,function(a,b){e[b]=1});c=d(c);s(c,function(a,b){e[b]=1===e[b]?null:-1});var l={addClass:"",removeClass:""};s(e,function(b,c){var d,e;1===b?(d="addClass",
e=!a[c]):-1===b&&(d="removeClass",e=a[c]);e&&(l[d].length&&(l[d]+=" "),l[d]+=c)});return l}function z(a){return a instanceof C.element?a[0]:a}function Sa(a,b,c){var d="";b&&(d=Y(b,"ng-",!0));c.addClass&&(d=Z(d,Y(c.addClass,"-add")));c.removeClass&&(d=Z(d,Y(c.removeClass,"-remove")));d.length&&(c.preparationClasses=d,a.addClass(d))}function pa(a,b){var c=b?"-"+b+"s":"";la(a,[ma,c]);return[ma,c]}function ta(a,b){var c=b?"paused":"",d=$+"PlayState";la(a,[d,c]);return[d,c]}function la(a,b){a.style[b[0]]=
b[1]}function Z(a,b){return a?b?a+" "+b:a:b}function Fa(a,b,c){var d=Object.create(null),e=a.getComputedStyle(b)||{};s(c,function(a,b){var c=e[a];if(c){var g=c.charAt(0);if("-"===g||"+"===g||0<=g)c=Ta(c);0===c&&(c=null);d[b]=c}});return d}function Ta(a){var b=0;a=a.split(/\s*,\s*/);s(a,function(a){"s"==a.charAt(a.length-1)&&(a=a.substring(0,a.length-1));a=parseFloat(a)||0;b=b?Math.max(a,b):a});return b}function ua(a){return 0===a||null!=a}function Ga(a,b){var c=S,d=a+"s";b?c+="Duration":d+=" linear all";
return[c,d]}function Ha(){var a=Object.create(null);return{flush:function(){a=Object.create(null)},count:function(b){return(b=a[b])?b.total:0},get:function(b){return(b=a[b])&&b.value},put:function(b,c){a[b]?a[b].total++:a[b]={total:1,value:c}}}}function Ia(a,b,c){s(c,function(c){a[c]=ea(a[c])?a[c]:b.style.getPropertyValue(c)})}var Q=C.noop,Ja=C.copy,Ea=C.extend,G=C.element,s=C.forEach,ca=C.isArray,O=C.isString,va=C.isObject,I=C.isUndefined,ea=C.isDefined,Ka=C.isFunction,wa=C.isElement,S,xa,$,ya;I(R.ontransitionend)&&
ea(R.onwebkittransitionend)?(S="WebkitTransition",xa="webkitTransitionEnd transitionend"):(S="transition",xa="transitionend");I(R.onanimationend)&&ea(R.onwebkitanimationend)?($="WebkitAnimation",ya="webkitAnimationEnd animationend"):($="animation",ya="animationend");var qa=$+"Delay",za=$+"Duration",ma=S+"Delay",La=S+"Duration",Ma=C.$$minErr("ng"),Ua={transitionDuration:La,transitionDelay:ma,transitionProperty:S+"Property",animationDuration:za,animationDelay:qa,animationIterationCount:$+"IterationCount"},
Va={transitionDuration:La,transitionDelay:ma,animationDuration:za,animationDelay:qa};C.module("ngAnimate",[]).directive("ngAnimateSwap",["$animate","$rootScope",function(a,b){return{restrict:"A",transclude:"element",terminal:!0,priority:600,link:function(b,d,e,l,n){var H,g;b.$watchCollection(e.ngAnimateSwap||e["for"],function(e){H&&a.leave(H);g&&(g.$destroy(),g=null);if(e||0===e)g=b.$new(),n(g,function(b){H=b;a.enter(b,null,d)})})}}}]).directive("ngAnimateChildren",["$interpolate",function(a){return{link:function(b,
c,d){function e(a){c.data("$$ngAnimateChildren","on"===a||"true"===a)}var l=d.ngAnimateChildren;C.isString(l)&&0===l.length?c.data("$$ngAnimateChildren",!0):(e(a(l)(b)),d.$observe("ngAnimateChildren",e))}}}]).factory("$$rAFScheduler",["$$rAF",function(a){function b(a){d=d.concat(a);c()}function c(){if(d.length){for(var b=d.shift(),n=0;n<b.length;n++)b[n]();e||a(function(){e||c()})}}var d,e;d=b.queue=[];b.waitUntilQuiet=function(b){e&&e();e=a(function(){e=null;b();c()})};return b}]).provider("$$animateQueue",
["$animateProvider",function(a){function b(a){if(!a)return null;a=a.split(" ");var b=Object.create(null);s(a,function(a){b[a]=!0});return b}function c(a,c){if(a&&c){var d=b(c);return a.split(" ").some(function(a){return d[a]})}}function d(a,b,c,d){return l[a].some(function(a){return a(b,c,d)})}function e(a,b){var c=0<(a.addClass||"").length,d=0<(a.removeClass||"").length;return b?c&&d:c||d}var l=this.rules={skip:[],cancel:[],join:[]};l.join.push(function(a,b,c){return!b.structural&&e(b)});l.skip.push(function(a,
b,c){return!b.structural&&!e(b)});l.skip.push(function(a,b,c){return"leave"==c.event&&b.structural});l.skip.push(function(a,b,c){return c.structural&&2===c.state&&!b.structural});l.cancel.push(function(a,b,c){return c.structural&&b.structural});l.cancel.push(function(a,b,c){return 2===c.state&&b.structural});l.cancel.push(function(a,b,d){if(d.structural)return!1;a=b.addClass;b=b.removeClass;var e=d.addClass;d=d.removeClass;return I(a)&&I(b)||I(e)&&I(d)?!1:c(a,d)||c(b,e)});this.$get=["$$rAF","$rootScope",
"$rootElement","$document","$$HashMap","$$animation","$$AnimateRunner","$templateRequest","$$jqLite","$$forceReflow",function(b,c,g,l,v,Wa,P,t,F,T){function J(){var a=!1;return function(b){a?b():c.$$postDigest(function(){a=!0;b()})}}function y(a,b,c){var f=z(b),d=z(a),N=[];(a=h[c])&&s(a,function(a){x.call(a.node,f)?N.push(a.callback):"leave"===c&&x.call(a.node,d)&&N.push(a.callback)});return N}function r(a,b,c){var f=da(b);return a.filter(function(a){return!(a.node===f&&(!c||a.callback===c))})}function p(a,
h,w){function r(c,f,d,h){sa(function(){var c=y(T,a,f);c.length?b(function(){s(c,function(b){b(a,d,h)});"close"!==d||a[0].parentNode||ra.off(a)}):"close"!==d||a[0].parentNode||ra.off(a)});c.progress(f,d,h)}function k(b){var c=a,f=m;f.preparationClasses&&(c.removeClass(f.preparationClasses),f.preparationClasses=null);f.activeClasses&&(c.removeClass(f.activeClasses),f.activeClasses=null);E(a,m);ha(a,m);m.domOperation();B.complete(!b)}var m=Ja(w),p,T;if(a=Oa(a))p=z(a),T=a.parent();var m=oa(m),B=new P,
sa=J();ca(m.addClass)&&(m.addClass=m.addClass.join(" "));m.addClass&&!O(m.addClass)&&(m.addClass=null);ca(m.removeClass)&&(m.removeClass=m.removeClass.join(" "));m.removeClass&&!O(m.removeClass)&&(m.removeClass=null);m.from&&!va(m.from)&&(m.from=null);m.to&&!va(m.to)&&(m.to=null);if(!p)return k(),B;w=[p.className,m.addClass,m.removeClass].join(" ");if(!Xa(w))return k(),B;var g=0<=["enter","move","leave"].indexOf(h),x=l[0].hidden,t=!f||x||N.get(p);w=!t&&A.get(p)||{};var F=!!w.state;t||F&&1==w.state||
(t=!M(a,T,h));if(t)return x&&r(B,h,"start"),k(),x&&r(B,h,"close"),B;g&&K(a);x={structural:g,element:a,event:h,addClass:m.addClass,removeClass:m.removeClass,close:k,options:m,runner:B};if(F){if(d("skip",a,x,w)){if(2===w.state)return k(),B;W(a,w,x);return w.runner}if(d("cancel",a,x,w))if(2===w.state)w.runner.end();else if(w.structural)w.close();else return W(a,w,x),w.runner;else if(d("join",a,x,w))if(2===w.state)W(a,x,{});else return Sa(a,g?h:null,m),h=x.event=w.event,m=W(a,w,x),w.runner}else W(a,x,
{});(F=x.structural)||(F="animate"===x.event&&0<Object.keys(x.options.to||{}).length||e(x));if(!F)return k(),ka(a),B;var v=(w.counter||0)+1;x.counter=v;L(a,1,x);c.$$postDigest(function(){var b=A.get(p),c=!b,b=b||{},f=0<(a.parent()||[]).length&&("animate"===b.event||b.structural||e(b));if(c||b.counter!==v||!f){c&&(E(a,m),ha(a,m));if(c||g&&b.event!==h)m.domOperation(),B.end();f||ka(a)}else h=!b.structural&&e(b,!0)?"setClass":b.event,L(a,2),b=Wa(a,h,b.options),B.setHost(b),r(B,h,"start",{}),b.done(function(b){k(!b);
(b=A.get(p))&&b.counter===v&&ka(z(a));r(B,h,"close",{})})});return B}function K(a){a=z(a).querySelectorAll("[data-ng-animate]");s(a,function(a){var b=parseInt(a.getAttribute("data-ng-animate")),c=A.get(a);if(c)switch(b){case 2:c.runner.end();case 1:A.remove(a)}})}function ka(a){a=z(a);a.removeAttribute("data-ng-animate");A.remove(a)}function k(a,b){return z(a)===z(b)}function M(a,b,c){c=G(l[0].body);var f=k(a,c)||"HTML"===a[0].nodeName,d=k(a,g),h=!1,r,e=N.get(z(a));(a=G.data(a[0],"$ngAnimatePin"))&&
(b=a);for(b=z(b);b;){d||(d=k(b,g));if(1!==b.nodeType)break;a=A.get(b)||{};if(!h){var p=N.get(b);if(!0===p&&!1!==e){e=!0;break}else!1===p&&(e=!1);h=a.structural}if(I(r)||!0===r)a=G.data(b,"$$ngAnimateChildren"),ea(a)&&(r=a);if(h&&!1===r)break;f||(f=k(b,c));if(f&&d)break;if(!d&&(a=G.data(b,"$ngAnimatePin"))){b=z(a);continue}b=b.parentNode}return(!h||r)&&!0!==e&&d&&f}function L(a,b,c){c=c||{};c.state=b;a=z(a);a.setAttribute("data-ng-animate",b);c=(b=A.get(a))?Ea(b,c):c;A.put(a,c)}var A=new v,N=new v,
f=null,B=c.$watch(function(){return 0===t.totalPendingRequests},function(a){a&&(B(),c.$$postDigest(function(){c.$$postDigest(function(){null===f&&(f=!0)})}))}),h={},sa=a.classNameFilter(),Xa=sa?function(a){return sa.test(a)}:function(){return!0},E=V(F),x=R.Node.prototype.contains||function(a){return this===a||!!(this.compareDocumentPosition(a)&16)},ra={on:function(a,b,c){var f=da(b);h[a]=h[a]||[];h[a].push({node:f,callback:c});G(b).on("$destroy",function(){A.get(f)||ra.off(a,b,c)})},off:function(a,
b,c){if(1!==arguments.length||C.isString(arguments[0])){var f=h[a];f&&(h[a]=1===arguments.length?null:r(f,b,c))}else for(f in b=arguments[0],h)h[f]=r(h[f],b)},pin:function(a,b){Aa(wa(a),"element","not an element");Aa(wa(b),"parentElement","not an element");a.data("$ngAnimatePin",b)},push:function(a,b,c,f){c=c||{};c.domOperation=f;return p(a,b,c)},enabled:function(a,b){var c=arguments.length;if(0===c)b=!!f;else if(wa(a)){var d=z(a),h=N.get(d);1===c?b=!h:N.put(d,!b)}else b=f=!!a;return b}};return ra}]}]).provider("$$animation",
["$animateProvider",function(a){var b=this.drivers=[];this.$get=["$$jqLite","$rootScope","$injector","$$AnimateRunner","$$HashMap","$$rAFScheduler",function(a,d,e,l,n,H){function g(a){function b(a){if(a.processed)return a;a.processed=!0;var d=a.domNode,p=d.parentNode;e.put(d,a);for(var K;p;){if(K=e.get(p)){K.processed||(K=b(K));break}p=p.parentNode}(K||c).children.push(a);return a}var c={children:[]},d,e=new n;for(d=0;d<a.length;d++){var g=a[d];e.put(g.domNode,a[d]={domNode:g.domNode,fn:g.fn,children:[]})}for(d=
0;d<a.length;d++)b(a[d]);return function(a){var b=[],c=[],d;for(d=0;d<a.children.length;d++)c.push(a.children[d]);a=c.length;var e=0,k=[];for(d=0;d<c.length;d++){var g=c[d];0>=a&&(a=e,e=0,b.push(k),k=[]);k.push(g.fn);g.children.forEach(function(a){e++;c.push(a)});a--}k.length&&b.push(k);return b}(c)}var u=[],v=V(a);return function(n,P,t){function F(a){a=a.hasAttribute("ng-animate-ref")?[a]:a.querySelectorAll("[ng-animate-ref]");var b=[];s(a,function(a){var c=a.getAttribute("ng-animate-ref");c&&c.length&&
b.push(a)});return b}function T(a){var b=[],c={};s(a,function(a,d){var h=z(a.element),e=0<=["enter","move"].indexOf(a.event),h=a.structural?F(h):[];if(h.length){var k=e?"to":"from";s(h,function(a){var b=a.getAttribute("ng-animate-ref");c[b]=c[b]||{};c[b][k]={animationID:d,element:G(a)}})}else b.push(a)});var d={},e={};s(c,function(c,k){var r=c.from,p=c.to;if(r&&p){var A=a[r.animationID],g=a[p.animationID],B=r.animationID.toString();if(!e[B]){var n=e[B]={structural:!0,beforeStart:function(){A.beforeStart();
g.beforeStart()},close:function(){A.close();g.close()},classes:J(A.classes,g.classes),from:A,to:g,anchors:[]};n.classes.length?b.push(n):(b.push(A),b.push(g))}e[B].anchors.push({out:r.element,"in":p.element})}else r=r?r.animationID:p.animationID,p=r.toString(),d[p]||(d[p]=!0,b.push(a[r]))});return b}function J(a,b){a=a.split(" ");b=b.split(" ");for(var c=[],d=0;d<a.length;d++){var e=a[d];if("ng-"!==e.substring(0,3))for(var r=0;r<b.length;r++)if(e===b[r]){c.push(e);break}}return c.join(" ")}function y(a){for(var c=
b.length-1;0<=c;c--){var d=e.get(b[c])(a);if(d)return d}}function r(a,b){function c(a){(a=a.data("$$animationRunner"))&&a.setHost(b)}a.from&&a.to?(c(a.from.element),c(a.to.element)):c(a.element)}function p(){var a=n.data("$$animationRunner");!a||"leave"===P&&t.$$domOperationFired||a.end()}function K(b){n.off("$destroy",p);n.removeData("$$animationRunner");v(n,t);ha(n,t);t.domOperation();L&&a.removeClass(n,L);n.removeClass("ng-animate");k.complete(!b)}t=oa(t);var ka=0<=["enter","move","leave"].indexOf(P),
k=new l({end:function(){K()},cancel:function(){K(!0)}});if(!b.length)return K(),k;n.data("$$animationRunner",k);var M=Ba(n.attr("class"),Ba(t.addClass,t.removeClass)),L=t.tempClasses;L&&(M+=" "+L,t.tempClasses=null);var A;ka&&(A="ng-"+P+"-prepare",a.addClass(n,A));u.push({element:n,classes:M,event:P,structural:ka,options:t,beforeStart:function(){n.addClass("ng-animate");L&&a.addClass(n,L);A&&(a.removeClass(n,A),A=null)},close:K});n.on("$destroy",p);if(1<u.length)return k;d.$$postDigest(function(){var a=
[];s(u,function(b){b.element.data("$$animationRunner")?a.push(b):b.close()});u.length=0;var b=T(a),c=[];s(b,function(a){c.push({domNode:z(a.from?a.from.element:a.element),fn:function(){a.beforeStart();var b,c=a.close;if((a.anchors?a.from.element||a.to.element:a.element).data("$$animationRunner")){var d=y(a);d&&(b=d.start)}b?(b=b(),b.done(function(a){c(!a)}),r(a,b)):c()}})});H(g(c))});return k}}]}]).provider("$animateCss",["$animateProvider",function(a){var b=Ha(),c=Ha();this.$get=["$window","$$jqLite",
"$$AnimateRunner","$timeout","$$forceReflow","$sniffer","$$rAFScheduler","$$animateQueue",function(a,e,l,n,H,g,u,v){function C(a,b){var c=a.parentNode;return(c.$$ngAnimateParentKey||(c.$$ngAnimateParentKey=++J))+"-"+a.getAttribute("class")+"-"+b}function P(r,p,g,n){var k;0<b.count(g)&&(k=c.get(g),k||(p=Y(p,"-stagger"),e.addClass(r,p),k=Fa(a,r,n),k.animationDuration=Math.max(k.animationDuration,0),k.transitionDuration=Math.max(k.transitionDuration,0),e.removeClass(r,p),c.put(g,k)));return k||{}}function t(a){y.push(a);
u.waitUntilQuiet(function(){b.flush();c.flush();for(var a=H(),d=0;d<y.length;d++)y[d](a);y.length=0})}function F(c,e,g){e=b.get(g);e||(e=Fa(a,c,Ua),"infinite"===e.animationIterationCount&&(e.animationIterationCount=1));b.put(g,e);c=e;g=c.animationDelay;e=c.transitionDelay;c.maxDelay=g&&e?Math.max(g,e):g||e;c.maxDuration=Math.max(c.animationDuration*c.animationIterationCount,c.transitionDuration);return c}var T=V(e),J=0,y=[];return function(a,c){function d(){k()}function u(){k(!0)}function k(b){if(!(x||
G&&J)){x=!0;J=!1;f.$$skipPreparationClasses||e.removeClass(a,ga);e.removeClass(a,ea);ta(h,!1);pa(h,!1);s(y,function(a){h.style[a[0]]=""});T(a,f);ha(a,f);Object.keys(B).length&&s(B,function(a,b){a?h.style.setProperty(b,a):h.style.removeProperty(b)});if(f.onDone)f.onDone();fa&&fa.length&&a.off(fa.join(" "),A);var c=a.data("$$animateCss");c&&(n.cancel(c[0].timer),a.removeData("$$animateCss"));I&&I.complete(!b)}}function M(a){q.blockTransition&&pa(h,a);q.blockKeyframeAnimation&&ta(h,!!a)}function L(){I=
new l({end:d,cancel:u});t(Q);k();return{$$willAnimate:!1,start:function(){return I},end:d}}function A(a){a.stopPropagation();var b=a.originalEvent||a;a=b.$manualTimeStamp||Date.now();b=parseFloat(b.elapsedTime.toFixed(3));Math.max(a-W,0)>=R&&b>=m&&(G=!0,k())}function N(){function b(){if(!x){M(!1);s(y,function(a){h.style[a[0]]=a[1]});T(a,f);e.addClass(a,ea);if(q.recalculateTimingStyles){na=h.className+" "+ga;ia=C(h,na);D=F(h,na,ia);aa=D.maxDelay;O=Math.max(aa,0);m=D.maxDuration;if(0===m){k();return}q.hasTransitions=
0<D.transitionDuration;q.hasAnimations=0<D.animationDuration}q.applyAnimationDelay&&(aa="boolean"!==typeof f.delay&&ua(f.delay)?parseFloat(f.delay):aa,O=Math.max(aa,0),D.animationDelay=aa,ba=[qa,aa+"s"],y.push(ba),h.style[ba[0]]=ba[1]);R=1E3*O;V=1E3*m;if(f.easing){var d,g=f.easing;q.hasTransitions&&(d=S+"TimingFunction",y.push([d,g]),h.style[d]=g);q.hasAnimations&&(d=$+"TimingFunction",y.push([d,g]),h.style[d]=g)}D.transitionDuration&&fa.push(xa);D.animationDuration&&fa.push(ya);W=Date.now();var p=
R+1.5*V;d=W+p;var g=a.data("$$animateCss")||[],N=!0;if(g.length){var l=g[0];(N=d>l.expectedEndTime)?n.cancel(l.timer):g.push(k)}N&&(p=n(c,p,!1),g[0]={timer:p,expectedEndTime:d},g.push(k),a.data("$$animateCss",g));if(fa.length)a.on(fa.join(" "),A);f.to&&(f.cleanupStyles&&Ia(B,h,Object.keys(f.to)),Da(a,f))}}function c(){var b=a.data("$$animateCss");if(b){for(var d=1;d<b.length;d++)b[d]();a.removeData("$$animateCss")}}if(!x)if(h.parentNode){var d=function(a){if(G)J&&a&&(J=!1,k());else if(J=!a,D.animationDuration)if(a=
ta(h,J),J)y.push(a);else{var b=y,c=b.indexOf(a);0<=a&&b.splice(c,1)}},g=0<da&&(D.transitionDuration&&0===X.transitionDuration||D.animationDuration&&0===X.animationDuration)&&Math.max(X.animationDelay,X.transitionDelay);g?n(b,Math.floor(g*da*1E3),!1):b();w.resume=function(){d(!0)};w.pause=function(){d(!1)}}else k()}var f=c||{};f.$$prepared||(f=oa(Ja(f)));var B={},h=z(a);if(!h||!h.parentNode||!v.enabled())return L();var y=[],H=a.attr("class"),E=Na(f),x,J,G,I,w,O,R,m,V,W,fa=[];if(0===f.duration||!g.animations&&
!g.transitions)return L();var ja=f.event&&ca(f.event)?f.event.join(" "):f.event,Z="",U="";ja&&f.structural?Z=Y(ja,"ng-",!0):ja&&(Z=ja);f.addClass&&(U+=Y(f.addClass,"-add"));f.removeClass&&(U.length&&(U+=" "),U+=Y(f.removeClass,"-remove"));f.applyClassesEarly&&U.length&&T(a,f);var ga=[Z,U].join(" ").trim(),na=H+" "+ga,ea=Y(ga,"-active"),H=E.to&&0<Object.keys(E.to).length;if(!(0<(f.keyframeStyle||"").length||H||ga))return L();var ia,X;0<f.stagger?(E=parseFloat(f.stagger),X={transitionDelay:E,animationDelay:E,
transitionDuration:0,animationDuration:0}):(ia=C(h,na),X=P(h,ga,ia,Va));f.$$skipPreparationClasses||e.addClass(a,ga);f.transitionStyle&&(E=[S,f.transitionStyle],la(h,E),y.push(E));0<=f.duration&&(E=0<h.style[S].length,E=Ga(f.duration,E),la(h,E),y.push(E));f.keyframeStyle&&(E=[$,f.keyframeStyle],la(h,E),y.push(E));var da=X?0<=f.staggerIndex?f.staggerIndex:b.count(ia):0;(ja=0===da)&&!f.skipBlocking&&pa(h,9999);var D=F(h,na,ia),aa=D.maxDelay;O=Math.max(aa,0);m=D.maxDuration;var q={};q.hasTransitions=
0<D.transitionDuration;q.hasAnimations=0<D.animationDuration;q.hasTransitionAll=q.hasTransitions&&"all"==D.transitionProperty;q.applyTransitionDuration=H&&(q.hasTransitions&&!q.hasTransitionAll||q.hasAnimations&&!q.hasTransitions);q.applyAnimationDuration=f.duration&&q.hasAnimations;q.applyTransitionDelay=ua(f.delay)&&(q.applyTransitionDuration||q.hasTransitions);q.applyAnimationDelay=ua(f.delay)&&q.hasAnimations;q.recalculateTimingStyles=0<U.length;if(q.applyTransitionDuration||q.applyAnimationDuration)m=
f.duration?parseFloat(f.duration):m,q.applyTransitionDuration&&(q.hasTransitions=!0,D.transitionDuration=m,E=0<h.style[S+"Property"].length,y.push(Ga(m,E))),q.applyAnimationDuration&&(q.hasAnimations=!0,D.animationDuration=m,y.push([za,m+"s"]));if(0===m&&!q.recalculateTimingStyles)return L();if(null!=f.delay){var ba;"boolean"!==typeof f.delay&&(ba=parseFloat(f.delay),O=Math.max(ba,0));q.applyTransitionDelay&&y.push([ma,ba+"s"]);q.applyAnimationDelay&&y.push([qa,ba+"s"])}null==f.duration&&0<D.transitionDuration&&
(q.recalculateTimingStyles=q.recalculateTimingStyles||ja);R=1E3*O;V=1E3*m;f.skipBlocking||(q.blockTransition=0<D.transitionDuration,q.blockKeyframeAnimation=0<D.animationDuration&&0<X.animationDelay&&0===X.animationDuration);f.from&&(f.cleanupStyles&&Ia(B,h,Object.keys(f.from)),Ca(a,f));q.blockTransition||q.blockKeyframeAnimation?M(m):f.skipBlocking||pa(h,!1);return{$$willAnimate:!0,end:d,start:function(){if(!x)return w={end:d,cancel:u,resume:null,pause:null},I=new l(w),t(N),I}}}}]}]).provider("$$animateCssDriver",
["$$animationProvider",function(a){a.drivers.push("$$animateCssDriver");this.$get=["$animateCss","$rootScope","$$AnimateRunner","$rootElement","$sniffer","$$jqLite","$document",function(a,c,d,e,l,n,H){function g(a){return a.replace(/\bng-\S+\b/g,"")}function u(a,b){O(a)&&(a=a.split(" "));O(b)&&(b=b.split(" "));return a.filter(function(a){return-1===b.indexOf(a)}).join(" ")}function v(c,e,n){function l(a){var b={},c=z(a).getBoundingClientRect();s(["width","height","top","left"],function(a){var d=c[a];
switch(a){case "top":d+=t.scrollTop;break;case "left":d+=t.scrollLeft}b[a]=Math.floor(d)+"px"});return b}function p(){var c=g(n.attr("class")||""),d=u(c,k),c=u(k,c),d=a(v,{to:l(n),addClass:"ng-anchor-in "+d,removeClass:"ng-anchor-out "+c,delay:!0});return d.$$willAnimate?d:null}function H(){v.remove();e.removeClass("ng-animate-shim");n.removeClass("ng-animate-shim")}var v=G(z(e).cloneNode(!0)),k=g(v.attr("class")||"");e.addClass("ng-animate-shim");n.addClass("ng-animate-shim");v.addClass("ng-anchor");
F.append(v);var M;c=function(){var c=a(v,{addClass:"ng-anchor-out",delay:!0,from:l(e)});return c.$$willAnimate?c:null}();if(!c&&(M=p(),!M))return H();var L=c||M;return{start:function(){function a(){c&&c.end()}var b,c=L.start();c.done(function(){c=null;if(!M&&(M=p()))return c=M.start(),c.done(function(){c=null;H();b.complete()}),c;H();b.complete()});return b=new d({end:a,cancel:a})}}}function C(a,b,c,e){var g=P(a,Q),n=P(b,Q),l=[];s(e,function(a){(a=v(c,a.out,a["in"]))&&l.push(a)});if(g||n||0!==l.length)return{start:function(){function a(){s(b,
function(a){a.end()})}var b=[];g&&b.push(g.start());n&&b.push(n.start());s(l,function(a){b.push(a.start())});var c=new d({end:a,cancel:a});d.all(b,function(a){c.complete(a)});return c}}}function P(c){var d=c.element,e=c.options||{};c.structural&&(e.event=c.event,e.structural=!0,e.applyClassesEarly=!0,"leave"===c.event&&(e.onDone=e.domOperation));e.preparationClasses&&(e.event=Z(e.event,e.preparationClasses));c=a(d,e);return c.$$willAnimate?c:null}if(!l.animations&&!l.transitions)return Q;var t=H[0].body;
c=z(e);var F=G(c.parentNode&&11===c.parentNode.nodeType||t.contains(c)?c:t);V(n);return function(a){return a.from&&a.to?C(a.from,a.to,a.classes,a.anchors):P(a)}}]}]).provider("$$animateJs",["$animateProvider",function(a){this.$get=["$injector","$$AnimateRunner","$$jqLite",function(b,c,d){function e(c){c=ca(c)?c:c.split(" ");for(var d=[],e={},l=0;l<c.length;l++){var v=c[l],s=a.$$registeredAnimations[v];s&&!e[v]&&(d.push(b.get(s)),e[v]=!0)}return d}var l=V(d);return function(a,b,d,u){function v(){u.domOperation();
l(a,u)}function C(a,b,d,e,f){switch(d){case "animate":b=[b,e.from,e.to,f];break;case "setClass":b=[b,G,J,f];break;case "addClass":b=[b,G,f];break;case "removeClass":b=[b,J,f];break;default:b=[b,f]}b.push(e);if(a=a.apply(a,b))if(Ka(a.start)&&(a=a.start()),a instanceof c)a.done(f);else if(Ka(a))return a;return Q}function z(a,b,d,e,f){var g=[];s(e,function(e){var k=e[f];k&&g.push(function(){var e,f,g=!1,h=function(a){g||(g=!0,(f||Q)(a),e.complete(!a))};e=new c({end:function(){h()},cancel:function(){h(!0)}});
f=C(k,a,b,d,function(a){h(!1===a)});return e})});return g}function t(a,b,d,e,f){var g=z(a,b,d,e,f);if(0===g.length){var h,k;"beforeSetClass"===f?(h=z(a,"removeClass",d,e,"beforeRemoveClass"),k=z(a,"addClass",d,e,"beforeAddClass")):"setClass"===f&&(h=z(a,"removeClass",d,e,"removeClass"),k=z(a,"addClass",d,e,"addClass"));h&&(g=g.concat(h));k&&(g=g.concat(k))}if(0!==g.length)return function(a){var b=[];g.length&&s(g,function(a){b.push(a())});b.length?c.all(b,a):a();return function(a){s(b,function(b){a?
b.cancel():b.end()})}}}var F=!1;3===arguments.length&&va(d)&&(u=d,d=null);u=oa(u);d||(d=a.attr("class")||"",u.addClass&&(d+=" "+u.addClass),u.removeClass&&(d+=" "+u.removeClass));var G=u.addClass,J=u.removeClass,y=e(d),r,p;if(y.length){var K,I;"leave"==b?(I="leave",K="afterLeave"):(I="before"+b.charAt(0).toUpperCase()+b.substr(1),K=b);"enter"!==b&&"move"!==b&&(r=t(a,b,u,y,I));p=t(a,b,u,y,K)}if(r||p){var k;return{$$willAnimate:!0,end:function(){k?k.end():(F=!0,v(),ha(a,u),k=new c,k.complete(!0));return k},
start:function(){function b(c){F=!0;v();ha(a,u);k.complete(c)}if(k)return k;k=new c;var d,e=[];r&&e.push(function(a){d=r(a)});e.length?e.push(function(a){v();a(!0)}):v();p&&e.push(function(a){d=p(a)});k.setHost({end:function(){F||((d||Q)(void 0),b(void 0))},cancel:function(){F||((d||Q)(!0),b(!0))}});c.chain(e,b);return k}}}}}]}]).provider("$$animateJsDriver",["$$animationProvider",function(a){a.drivers.push("$$animateJsDriver");this.$get=["$$animateJs","$$AnimateRunner",function(a,c){function d(c){return a(c.element,
c.event,c.classes,c.options)}return function(a){if(a.from&&a.to){var b=d(a.from),n=d(a.to);if(b||n)return{start:function(){function a(){return function(){s(d,function(a){a.end()})}}var d=[];b&&d.push(b.start());n&&d.push(n.start());c.all(d,function(a){e.complete(a)});var e=new c({end:a(),cancel:a()});return e}}}else return d(a)}}]}])})(window,window.angular);
//# sourceMappingURL=angular-animate.min.js.map

!function(a){"use strict";var b=a.module("angular-bind-html-compile",[]);b.directive("bindHtmlCompile",["$compile",function(a){return{restrict:"A",link:function(b,c,d){b.$watch(function(){return b.$eval(d.bindHtmlCompile)},function(e){c.html(e&&e.toString());var f=b;d.bindHtmlScope&&(f=b.$eval(d.bindHtmlScope)),a(c.contents())(f)})}}}])}(window.angular);
/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 2.1.3 - 2016-08-25
 * License: MIT
 */angular.module("ui.bootstrap",["ui.bootstrap.tpls","ui.bootstrap.collapse","ui.bootstrap.tabindex","ui.bootstrap.accordion","ui.bootstrap.alert","ui.bootstrap.buttons","ui.bootstrap.carousel","ui.bootstrap.dateparser","ui.bootstrap.isClass","ui.bootstrap.datepicker","ui.bootstrap.position","ui.bootstrap.datepickerPopup","ui.bootstrap.debounce","ui.bootstrap.dropdown","ui.bootstrap.stackedMap","ui.bootstrap.modal","ui.bootstrap.paging","ui.bootstrap.pager","ui.bootstrap.pagination","ui.bootstrap.tooltip","ui.bootstrap.popover","ui.bootstrap.progressbar","ui.bootstrap.rating","ui.bootstrap.tabs","ui.bootstrap.timepicker","ui.bootstrap.typeahead"]),angular.module("ui.bootstrap.tpls",["uib/template/accordion/accordion-group.html","uib/template/accordion/accordion.html","uib/template/alert/alert.html","uib/template/carousel/carousel.html","uib/template/carousel/slide.html","uib/template/datepicker/datepicker.html","uib/template/datepicker/day.html","uib/template/datepicker/month.html","uib/template/datepicker/year.html","uib/template/datepickerPopup/popup.html","uib/template/modal/window.html","uib/template/pager/pager.html","uib/template/pagination/pagination.html","uib/template/tooltip/tooltip-html-popup.html","uib/template/tooltip/tooltip-popup.html","uib/template/tooltip/tooltip-template-popup.html","uib/template/popover/popover-html.html","uib/template/popover/popover-template.html","uib/template/popover/popover.html","uib/template/progressbar/bar.html","uib/template/progressbar/progress.html","uib/template/progressbar/progressbar.html","uib/template/rating/rating.html","uib/template/tabs/tab.html","uib/template/tabs/tabset.html","uib/template/timepicker/timepicker.html","uib/template/typeahead/typeahead-match.html","uib/template/typeahead/typeahead-popup.html"]),angular.module("ui.bootstrap.collapse",[]).directive("uibCollapse",["$animate","$q","$parse","$injector",function(a,b,c,d){var e=d.has("$animateCss")?d.get("$animateCss"):null;return{link:function(d,f,g){function h(){r=!!("horizontal"in g),r?(s={width:""},t={width:"0"}):(s={height:""},t={height:"0"}),d.$eval(g.uibCollapse)||f.addClass("in").addClass("collapse").attr("aria-expanded",!0).attr("aria-hidden",!1).css(s)}function i(a){return r?{width:a.scrollWidth+"px"}:{height:a.scrollHeight+"px"}}function j(){f.hasClass("collapse")&&f.hasClass("in")||b.resolve(n(d)).then(function(){f.removeClass("collapse").addClass("collapsing").attr("aria-expanded",!0).attr("aria-hidden",!1),e?e(f,{addClass:"in",easing:"ease",css:{overflow:"hidden"},to:i(f[0])}).start()["finally"](k):a.addClass(f,"in",{css:{overflow:"hidden"},to:i(f[0])}).then(k)})}function k(){f.removeClass("collapsing").addClass("collapse").css(s),o(d)}function l(){return f.hasClass("collapse")||f.hasClass("in")?void b.resolve(p(d)).then(function(){f.css(i(f[0])).removeClass("collapse").addClass("collapsing").attr("aria-expanded",!1).attr("aria-hidden",!0),e?e(f,{removeClass:"in",to:t}).start()["finally"](m):a.removeClass(f,"in",{to:t}).then(m)}):m()}function m(){f.css(t),f.removeClass("collapsing").addClass("collapse"),q(d)}var n=c(g.expanding),o=c(g.expanded),p=c(g.collapsing),q=c(g.collapsed),r=!1,s={},t={};h(),d.$watch(g.uibCollapse,function(a){a?l():j()})}}}]),angular.module("ui.bootstrap.tabindex",[]).directive("uibTabindexToggle",function(){return{restrict:"A",link:function(a,b,c){c.$observe("disabled",function(a){c.$set("tabindex",a?-1:null)})}}}),angular.module("ui.bootstrap.accordion",["ui.bootstrap.collapse","ui.bootstrap.tabindex"]).constant("uibAccordionConfig",{closeOthers:!0}).controller("UibAccordionController",["$scope","$attrs","uibAccordionConfig",function(a,b,c){this.groups=[],this.closeOthers=function(d){var e=angular.isDefined(b.closeOthers)?a.$eval(b.closeOthers):c.closeOthers;e&&angular.forEach(this.groups,function(a){a!==d&&(a.isOpen=!1)})},this.addGroup=function(a){var b=this;this.groups.push(a),a.$on("$destroy",function(c){b.removeGroup(a)})},this.removeGroup=function(a){var b=this.groups.indexOf(a);-1!==b&&this.groups.splice(b,1)}}]).directive("uibAccordion",function(){return{controller:"UibAccordionController",controllerAs:"accordion",transclude:!0,templateUrl:function(a,b){return b.templateUrl||"uib/template/accordion/accordion.html"}}}).directive("uibAccordionGroup",function(){return{require:"^uibAccordion",transclude:!0,restrict:"A",templateUrl:function(a,b){return b.templateUrl||"uib/template/accordion/accordion-group.html"},scope:{heading:"@",panelClass:"@?",isOpen:"=?",isDisabled:"=?"},controller:function(){this.setHeading=function(a){this.heading=a}},link:function(a,b,c,d){b.addClass("panel"),d.addGroup(a),a.openClass=c.openClass||"panel-open",a.panelClass=c.panelClass||"panel-default",a.$watch("isOpen",function(c){b.toggleClass(a.openClass,!!c),c&&d.closeOthers(a)}),a.toggleOpen=function(b){a.isDisabled||b&&32!==b.which||(a.isOpen=!a.isOpen)};var e="accordiongroup-"+a.$id+"-"+Math.floor(1e4*Math.random());a.headingId=e+"-tab",a.panelId=e+"-panel"}}}).directive("uibAccordionHeading",function(){return{transclude:!0,template:"",replace:!0,require:"^uibAccordionGroup",link:function(a,b,c,d,e){d.setHeading(e(a,angular.noop))}}}).directive("uibAccordionTransclude",function(){function a(){return"uib-accordion-header,data-uib-accordion-header,x-uib-accordion-header,uib\\:accordion-header,[uib-accordion-header],[data-uib-accordion-header],[x-uib-accordion-header]"}return{require:"^uibAccordionGroup",link:function(b,c,d,e){b.$watch(function(){return e[d.uibAccordionTransclude]},function(b){if(b){var d=angular.element(c[0].querySelector(a()));d.html(""),d.append(b)}})}}}),angular.module("ui.bootstrap.alert",[]).controller("UibAlertController",["$scope","$element","$attrs","$interpolate","$timeout",function(a,b,c,d,e){a.closeable=!!c.close,b.addClass("alert"),c.$set("role","alert"),a.closeable&&b.addClass("alert-dismissible");var f=angular.isDefined(c.dismissOnTimeout)?d(c.dismissOnTimeout)(a.$parent):null;f&&e(function(){a.close()},parseInt(f,10))}]).directive("uibAlert",function(){return{controller:"UibAlertController",controllerAs:"alert",restrict:"A",templateUrl:function(a,b){return b.templateUrl||"uib/template/alert/alert.html"},transclude:!0,scope:{close:"&"}}}),angular.module("ui.bootstrap.buttons",[]).constant("uibButtonConfig",{activeClass:"active",toggleEvent:"click"}).controller("UibButtonsController",["uibButtonConfig",function(a){this.activeClass=a.activeClass||"active",this.toggleEvent=a.toggleEvent||"click"}]).directive("uibBtnRadio",["$parse",function(a){return{require:["uibBtnRadio","ngModel"],controller:"UibButtonsController",controllerAs:"buttons",link:function(b,c,d,e){var f=e[0],g=e[1],h=a(d.uibUncheckable);c.find("input").css({display:"none"}),g.$render=function(){c.toggleClass(f.activeClass,angular.equals(g.$modelValue,b.$eval(d.uibBtnRadio)))},c.on(f.toggleEvent,function(){if(!d.disabled){var a=c.hasClass(f.activeClass);a&&!angular.isDefined(d.uncheckable)||b.$apply(function(){g.$setViewValue(a?null:b.$eval(d.uibBtnRadio)),g.$render()})}}),d.uibUncheckable&&b.$watch(h,function(a){d.$set("uncheckable",a?"":void 0)})}}}]).directive("uibBtnCheckbox",function(){return{require:["uibBtnCheckbox","ngModel"],controller:"UibButtonsController",controllerAs:"button",link:function(a,b,c,d){function e(){return g(c.btnCheckboxTrue,!0)}function f(){return g(c.btnCheckboxFalse,!1)}function g(b,c){return angular.isDefined(b)?a.$eval(b):c}var h=d[0],i=d[1];b.find("input").css({display:"none"}),i.$render=function(){b.toggleClass(h.activeClass,angular.equals(i.$modelValue,e()))},b.on(h.toggleEvent,function(){c.disabled||a.$apply(function(){i.$setViewValue(b.hasClass(h.activeClass)?f():e()),i.$render()})})}}}),angular.module("ui.bootstrap.carousel",[]).controller("UibCarouselController",["$scope","$element","$interval","$timeout","$animate",function(a,b,c,d,e){function f(){for(;t.length;)t.shift()}function g(a){for(var b=0;b<q.length;b++)q[b].slide.active=b===a}function h(c,d,i){if(!u){if(angular.extend(c,{direction:i}),angular.extend(q[s].slide||{},{direction:i}),e.enabled(b)&&!a.$currentTransition&&q[d].element&&p.slides.length>1){q[d].element.data(r,c.direction);var j=p.getCurrentIndex();angular.isNumber(j)&&q[j].element&&q[j].element.data(r,c.direction),a.$currentTransition=!0,e.on("addClass",q[d].element,function(b,c){if("close"===c&&(a.$currentTransition=null,e.off("addClass",b),t.length)){var d=t.pop().slide,g=d.index,i=g>p.getCurrentIndex()?"next":"prev";f(),h(d,g,i)}})}a.active=c.index,s=c.index,g(d),l()}}function i(a){for(var b=0;b<q.length;b++)if(q[b].slide===a)return b}function j(){n&&(c.cancel(n),n=null)}function k(b){b.length||(a.$currentTransition=null,f())}function l(){j();var b=+a.interval;!isNaN(b)&&b>0&&(n=c(m,b))}function m(){var b=+a.interval;o&&!isNaN(b)&&b>0&&q.length?a.next():a.pause()}var n,o,p=this,q=p.slides=a.slides=[],r="uib-slideDirection",s=a.active,t=[],u=!1;b.addClass("carousel"),p.addSlide=function(b,c){q.push({slide:b,element:c}),q.sort(function(a,b){return+a.slide.index-+b.slide.index}),(b.index===a.active||1===q.length&&!angular.isNumber(a.active))&&(a.$currentTransition&&(a.$currentTransition=null),s=b.index,a.active=b.index,g(s),p.select(q[i(b)]),1===q.length&&a.play())},p.getCurrentIndex=function(){for(var a=0;a<q.length;a++)if(q[a].slide.index===s)return a},p.next=a.next=function(){var b=(p.getCurrentIndex()+1)%q.length;return 0===b&&a.noWrap()?void a.pause():p.select(q[b],"next")},p.prev=a.prev=function(){var b=p.getCurrentIndex()-1<0?q.length-1:p.getCurrentIndex()-1;return a.noWrap()&&b===q.length-1?void a.pause():p.select(q[b],"prev")},p.removeSlide=function(b){var c=i(b),d=t.indexOf(q[c]);-1!==d&&t.splice(d,1),q.splice(c,1),q.length>0&&s===c?c>=q.length?(s=q.length-1,a.active=s,g(s),p.select(q[q.length-1])):(s=c,a.active=s,g(s),p.select(q[c])):s>c&&(s--,a.active=s),0===q.length&&(s=null,a.active=null,f())},p.select=a.select=function(b,c){var d=i(b.slide);void 0===c&&(c=d>p.getCurrentIndex()?"next":"prev"),b.slide.index===s||a.$currentTransition?b&&b.slide.index!==s&&a.$currentTransition&&t.push(q[d]):h(b.slide,d,c)},a.indexOfSlide=function(a){return+a.slide.index},a.isActive=function(b){return a.active===b.slide.index},a.isPrevDisabled=function(){return 0===a.active&&a.noWrap()},a.isNextDisabled=function(){return a.active===q.length-1&&a.noWrap()},a.pause=function(){a.noPause||(o=!1,j())},a.play=function(){o||(o=!0,l())},b.on("mouseenter",a.pause),b.on("mouseleave",a.play),a.$on("$destroy",function(){u=!0,j()}),a.$watch("noTransition",function(a){e.enabled(b,!a)}),a.$watch("interval",l),a.$watchCollection("slides",k),a.$watch("active",function(a){if(angular.isNumber(a)&&s!==a){for(var b=0;b<q.length;b++)if(q[b].slide.index===a){a=b;break}var c=q[a];c&&(g(a),p.select(q[a]),s=a)}})}]).directive("uibCarousel",function(){return{transclude:!0,controller:"UibCarouselController",controllerAs:"carousel",restrict:"A",templateUrl:function(a,b){return b.templateUrl||"uib/template/carousel/carousel.html"},scope:{active:"=",interval:"=",noTransition:"=",noPause:"=",noWrap:"&"}}}).directive("uibSlide",["$animate",function(a){return{require:"^uibCarousel",restrict:"A",transclude:!0,templateUrl:function(a,b){return b.templateUrl||"uib/template/carousel/slide.html"},scope:{actual:"=?",index:"=?"},link:function(b,c,d,e){c.addClass("item"),e.addSlide(b,c),b.$on("$destroy",function(){e.removeSlide(b)}),b.$watch("active",function(b){a[b?"addClass":"removeClass"](c,"active")})}}}]).animation(".item",["$animateCss",function(a){function b(a,b,c){a.removeClass(b),c&&c()}var c="uib-slideDirection";return{beforeAddClass:function(d,e,f){if("active"===e){var g=!1,h=d.data(c),i="next"===h?"left":"right",j=b.bind(this,d,i+" "+h,f);return d.addClass(h),a(d,{addClass:i}).start().done(j),function(){g=!0}}f()},beforeRemoveClass:function(d,e,f){if("active"===e){var g=!1,h=d.data(c),i="next"===h?"left":"right",j=b.bind(this,d,i,f);return a(d,{addClass:i}).start().done(j),function(){g=!0}}f()}}}]),angular.module("ui.bootstrap.dateparser",[]).service("uibDateParser",["$log","$locale","dateFilter","orderByFilter",function(a,b,c,d){function e(a){var b=[],c=a.split(""),e=a.indexOf("'");if(e>-1){var f=!1;a=a.split("");for(var g=e;g<a.length;g++)f?("'"===a[g]&&(g+1<a.length&&"'"===a[g+1]?(a[g+1]="$",c[g+1]=""):(c[g]="",f=!1)),a[g]="$"):"'"===a[g]&&(a[g]="$",c[g]="",f=!0);a=a.join("")}return angular.forEach(q,function(d){var e=a.indexOf(d.key);if(e>-1){a=a.split(""),c[e]="("+d.regex+")",a[e]="$";for(var f=e+1,g=e+d.key.length;g>f;f++)c[f]="",a[f]="$";a=a.join(""),b.push({index:e,key:d.key,apply:d.apply,matcher:d.regex})}}),{regex:new RegExp("^"+c.join("")+"$"),map:d(b,"index")}}function f(a){for(var b,c,d=[],e=0;e<a.length;)if(angular.isNumber(c)){if("'"===a.charAt(e))(e+1>=a.length||"'"!==a.charAt(e+1))&&(d.push(g(a,c,e)),c=null);else if(e===a.length)for(;c<a.length;)b=h(a,c),d.push(b),c=b.endIdx;e++}else"'"!==a.charAt(e)?(b=h(a,e),d.push(b.parser),e=b.endIdx):(c=e,e++);return d}function g(a,b,c){return function(){return a.substr(b+1,c-b-1)}}function h(a,b){for(var c=a.substr(b),d=0;d<q.length;d++)if(new RegExp("^"+q[d].key).test(c)){var e=q[d];return{endIdx:b+e.key.length,parser:e.formatter}}return{endIdx:b+1,parser:function(){return c.charAt(0)}}}function i(a,b,c){return 1>c?!1:1===b&&c>28?29===c&&(a%4===0&&a%100!==0||a%400===0):3===b||5===b||8===b||10===b?31>c:!0}function j(a){return parseInt(a,10)}function k(a,b){return a&&b?o(a,b):a}function l(a,b){return a&&b?o(a,b,!0):a}function m(a,b){a=a.replace(/:/g,"");var c=Date.parse("Jan 01, 1970 00:00:00 "+a)/6e4;return isNaN(c)?b:c}function n(a,b){return a=new Date(a.getTime()),a.setMinutes(a.getMinutes()+b),a}function o(a,b,c){c=c?-1:1;var d=a.getTimezoneOffset(),e=m(b,d);return n(a,c*(e-d))}var p,q,r=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;this.init=function(){p=b.id,this.parsers={},this.formatters={},q=[{key:"yyyy",regex:"\\d{4}",apply:function(a){this.year=+a},formatter:function(a){var b=new Date;return b.setFullYear(Math.abs(a.getFullYear())),c(b,"yyyy")}},{key:"yy",regex:"\\d{2}",apply:function(a){a=+a,this.year=69>a?a+2e3:a+1900},formatter:function(a){var b=new Date;return b.setFullYear(Math.abs(a.getFullYear())),c(b,"yy")}},{key:"y",regex:"\\d{1,4}",apply:function(a){this.year=+a},formatter:function(a){var b=new Date;return b.setFullYear(Math.abs(a.getFullYear())),c(b,"y")}},{key:"M!",regex:"0?[1-9]|1[0-2]",apply:function(a){this.month=a-1},formatter:function(a){var b=a.getMonth();return/^[0-9]$/.test(b)?c(a,"MM"):c(a,"M")}},{key:"MMMM",regex:b.DATETIME_FORMATS.MONTH.join("|"),apply:function(a){this.month=b.DATETIME_FORMATS.MONTH.indexOf(a)},formatter:function(a){return c(a,"MMMM")}},{key:"MMM",regex:b.DATETIME_FORMATS.SHORTMONTH.join("|"),apply:function(a){this.month=b.DATETIME_FORMATS.SHORTMONTH.indexOf(a)},formatter:function(a){return c(a,"MMM")}},{key:"MM",regex:"0[1-9]|1[0-2]",apply:function(a){this.month=a-1},formatter:function(a){return c(a,"MM")}},{key:"M",regex:"[1-9]|1[0-2]",apply:function(a){this.month=a-1},formatter:function(a){return c(a,"M")}},{key:"d!",regex:"[0-2]?[0-9]{1}|3[0-1]{1}",apply:function(a){this.date=+a},formatter:function(a){var b=a.getDate();return/^[1-9]$/.test(b)?c(a,"dd"):c(a,"d")}},{key:"dd",regex:"[0-2][0-9]{1}|3[0-1]{1}",apply:function(a){this.date=+a},formatter:function(a){return c(a,"dd")}},{key:"d",regex:"[1-2]?[0-9]{1}|3[0-1]{1}",apply:function(a){this.date=+a},formatter:function(a){return c(a,"d")}},{key:"EEEE",regex:b.DATETIME_FORMATS.DAY.join("|"),formatter:function(a){return c(a,"EEEE")}},{key:"EEE",regex:b.DATETIME_FORMATS.SHORTDAY.join("|"),formatter:function(a){return c(a,"EEE")}},{key:"HH",regex:"(?:0|1)[0-9]|2[0-3]",apply:function(a){this.hours=+a},formatter:function(a){return c(a,"HH")}},{key:"hh",regex:"0[0-9]|1[0-2]",apply:function(a){this.hours=+a},formatter:function(a){return c(a,"hh")}},{key:"H",regex:"1?[0-9]|2[0-3]",apply:function(a){this.hours=+a},formatter:function(a){return c(a,"H")}},{key:"h",regex:"[0-9]|1[0-2]",apply:function(a){this.hours=+a},formatter:function(a){return c(a,"h")}},{key:"mm",regex:"[0-5][0-9]",apply:function(a){this.minutes=+a},formatter:function(a){return c(a,"mm")}},{key:"m",regex:"[0-9]|[1-5][0-9]",apply:function(a){this.minutes=+a},formatter:function(a){return c(a,"m")}},{key:"sss",regex:"[0-9][0-9][0-9]",apply:function(a){this.milliseconds=+a},formatter:function(a){return c(a,"sss")}},{key:"ss",regex:"[0-5][0-9]",apply:function(a){this.seconds=+a},formatter:function(a){return c(a,"ss")}},{key:"s",regex:"[0-9]|[1-5][0-9]",apply:function(a){this.seconds=+a},formatter:function(a){return c(a,"s")}},{key:"a",regex:b.DATETIME_FORMATS.AMPMS.join("|"),apply:function(a){12===this.hours&&(this.hours=0),"PM"===a&&(this.hours+=12)},formatter:function(a){return c(a,"a")}},{key:"Z",regex:"[+-]\\d{4}",apply:function(a){var b=a.match(/([+-])(\d{2})(\d{2})/),c=b[1],d=b[2],e=b[3];this.hours+=j(c+d),this.minutes+=j(c+e)},formatter:function(a){return c(a,"Z")}},{key:"ww",regex:"[0-4][0-9]|5[0-3]",formatter:function(a){return c(a,"ww")}},{key:"w",regex:"[0-9]|[1-4][0-9]|5[0-3]",formatter:function(a){return c(a,"w")}},{key:"GGGG",regex:b.DATETIME_FORMATS.ERANAMES.join("|").replace(/\s/g,"\\s"),formatter:function(a){return c(a,"GGGG")}},{key:"GGG",regex:b.DATETIME_FORMATS.ERAS.join("|"),formatter:function(a){return c(a,"GGG")}},{key:"GG",regex:b.DATETIME_FORMATS.ERAS.join("|"),formatter:function(a){return c(a,"GG")}},{key:"G",regex:b.DATETIME_FORMATS.ERAS.join("|"),formatter:function(a){return c(a,"G")}}]},this.init(),this.filter=function(a,c){if(!angular.isDate(a)||isNaN(a)||!c)return"";c=b.DATETIME_FORMATS[c]||c,b.id!==p&&this.init(),this.formatters[c]||(this.formatters[c]=f(c));var d=this.formatters[c];return d.reduce(function(b,c){return b+c(a)},"")},this.parse=function(c,d,f){if(!angular.isString(c)||!d)return c;d=b.DATETIME_FORMATS[d]||d,d=d.replace(r,"\\$&"),b.id!==p&&this.init(),this.parsers[d]||(this.parsers[d]=e(d,"apply"));var g=this.parsers[d],h=g.regex,j=g.map,k=c.match(h),l=!1;if(k&&k.length){var m,n;angular.isDate(f)&&!isNaN(f.getTime())?m={year:f.getFullYear(),month:f.getMonth(),date:f.getDate(),hours:f.getHours(),minutes:f.getMinutes(),seconds:f.getSeconds(),milliseconds:f.getMilliseconds()}:(f&&a.warn("dateparser:","baseDate is not a valid date"),m={year:1900,month:0,date:1,hours:0,minutes:0,seconds:0,milliseconds:0});for(var o=1,q=k.length;q>o;o++){var s=j[o-1];"Z"===s.matcher&&(l=!0),s.apply&&s.apply.call(m,k[o])}var t=l?Date.prototype.setUTCFullYear:Date.prototype.setFullYear,u=l?Date.prototype.setUTCHours:Date.prototype.setHours;return i(m.year,m.month,m.date)&&(!angular.isDate(f)||isNaN(f.getTime())||l?(n=new Date(0),t.call(n,m.year,m.month,m.date),u.call(n,m.hours||0,m.minutes||0,m.seconds||0,m.milliseconds||0)):(n=new Date(f),t.call(n,m.year,m.month,m.date),u.call(n,m.hours,m.minutes,m.seconds,m.milliseconds))),n}},this.toTimezone=k,this.fromTimezone=l,this.timezoneToOffset=m,this.addDateMinutes=n,this.convertTimezoneToLocal=o}]),angular.module("ui.bootstrap.isClass",[]).directive("uibIsClass",["$animate",function(a){var b=/^\s*([\s\S]+?)\s+on\s+([\s\S]+?)\s*$/,c=/^\s*([\s\S]+?)\s+for\s+([\s\S]+?)\s*$/;return{restrict:"A",compile:function(d,e){function f(a,b,c){i.push(a),j.push({scope:a,element:b}),o.forEach(function(b,c){g(b,a)}),a.$on("$destroy",h)}function g(b,d){var e=b.match(c),f=d.$eval(e[1]),g=e[2],h=k[b];if(!h){var i=function(b){var c=null;j.some(function(a){var d=a.scope.$eval(m);return d===b?(c=a,!0):void 0}),h.lastActivated!==c&&(h.lastActivated&&a.removeClass(h.lastActivated.element,f),c&&a.addClass(c.element,f),h.lastActivated=c)};k[b]=h={lastActivated:null,scope:d,watchFn:i,compareWithExp:g,watcher:d.$watch(g,i)}}h.watchFn(d.$eval(g))}function h(a){var b=a.targetScope,c=i.indexOf(b);if(i.splice(c,1),j.splice(c,1),i.length){var d=i[0];angular.forEach(k,function(a){a.scope===b&&(a.watcher=d.$watch(a.compareWithExp,a.watchFn),a.scope=d)})}else k={}}var i=[],j=[],k={},l=e.uibIsClass.match(b),m=l[2],n=l[1],o=n.split(",");return f}}}]),angular.module("ui.bootstrap.datepicker",["ui.bootstrap.dateparser","ui.bootstrap.isClass"]).value("$datepickerSuppressError",!1).value("$datepickerLiteralWarning",!0).constant("uibDatepickerConfig",{datepickerMode:"day",formatDay:"dd",formatMonth:"MMMM",formatYear:"yyyy",formatDayHeader:"EEE",formatDayTitle:"MMMM yyyy",formatMonthTitle:"yyyy",maxDate:null,maxMode:"year",minDate:null,minMode:"day",monthColumns:3,ngModelOptions:{},shortcutPropagation:!1,showWeeks:!0,yearColumns:5,yearRows:4}).controller("UibDatepickerController",["$scope","$element","$attrs","$parse","$interpolate","$locale","$log","dateFilter","uibDatepickerConfig","$datepickerLiteralWarning","$datepickerSuppressError","uibDateParser",function(a,b,c,d,e,f,g,h,i,j,k,l){function m(b){a.datepickerMode=b,a.datepickerOptions.datepickerMode=b}var n=this,o={$setViewValue:angular.noop},p={},q=[];b.addClass("uib-datepicker"),c.$set("role","application"),a.datepickerOptions||(a.datepickerOptions={}),this.modes=["day","month","year"],["customClass","dateDisabled","datepickerMode","formatDay","formatDayHeader","formatDayTitle","formatMonth","formatMonthTitle","formatYear","maxDate","maxMode","minDate","minMode","monthColumns","showWeeks","shortcutPropagation","startingDay","yearColumns","yearRows"].forEach(function(b){switch(b){case"customClass":case"dateDisabled":a[b]=a.datepickerOptions[b]||angular.noop;break;case"datepickerMode":a.datepickerMode=angular.isDefined(a.datepickerOptions.datepickerMode)?a.datepickerOptions.datepickerMode:i.datepickerMode;break;case"formatDay":case"formatDayHeader":case"formatDayTitle":case"formatMonth":case"formatMonthTitle":case"formatYear":n[b]=angular.isDefined(a.datepickerOptions[b])?e(a.datepickerOptions[b])(a.$parent):i[b];break;case"monthColumns":case"showWeeks":case"shortcutPropagation":case"yearColumns":case"yearRows":n[b]=angular.isDefined(a.datepickerOptions[b])?a.datepickerOptions[b]:i[b];break;case"startingDay":angular.isDefined(a.datepickerOptions.startingDay)?n.startingDay=a.datepickerOptions.startingDay:angular.isNumber(i.startingDay)?n.startingDay=i.startingDay:n.startingDay=(f.DATETIME_FORMATS.FIRSTDAYOFWEEK+8)%7;break;case"maxDate":case"minDate":a.$watch("datepickerOptions."+b,function(a){a?angular.isDate(a)?n[b]=l.fromTimezone(new Date(a),p.timezone):(j&&g.warn("Literal date support has been deprecated, please switch to date object usage"),n[b]=new Date(h(a,"medium"))):n[b]=i[b]?l.fromTimezone(new Date(i[b]),p.timezone):null,n.refreshView()});break;case"maxMode":case"minMode":a.datepickerOptions[b]?a.$watch(function(){return a.datepickerOptions[b]},function(c){n[b]=a[b]=angular.isDefined(c)?c:a.datepickerOptions[b],("minMode"===b&&n.modes.indexOf(a.datepickerOptions.datepickerMode)<n.modes.indexOf(n[b])||"maxMode"===b&&n.modes.indexOf(a.datepickerOptions.datepickerMode)>n.modes.indexOf(n[b]))&&(a.datepickerMode=n[b],a.datepickerOptions.datepickerMode=n[b])}):n[b]=a[b]=i[b]||null}}),a.uniqueId="datepicker-"+a.$id+"-"+Math.floor(1e4*Math.random()),a.disabled=angular.isDefined(c.disabled)||!1,angular.isDefined(c.ngDisabled)&&q.push(a.$parent.$watch(c.ngDisabled,function(b){a.disabled=b,n.refreshView()})),a.isActive=function(b){return 0===n.compare(b.date,n.activeDate)?(a.activeDateId=b.uid,!0):!1},this.init=function(b){o=b,p=b.$options||a.datepickerOptions.ngModelOptions||i.ngModelOptions,a.datepickerOptions.initDate?(n.activeDate=l.fromTimezone(a.datepickerOptions.initDate,p.timezone)||new Date,a.$watch("datepickerOptions.initDate",function(a){a&&(o.$isEmpty(o.$modelValue)||o.$invalid)&&(n.activeDate=l.fromTimezone(a,p.timezone),n.refreshView())})):n.activeDate=new Date;var c=o.$modelValue?new Date(o.$modelValue):new Date;this.activeDate=isNaN(c)?l.fromTimezone(new Date,p.timezone):l.fromTimezone(c,p.timezone),o.$render=function(){n.render()}},this.render=function(){if(o.$viewValue){var a=new Date(o.$viewValue),b=!isNaN(a);b?this.activeDate=l.fromTimezone(a,p.timezone):k||g.error('Datepicker directive: "ng-model" value must be a Date object')}this.refreshView()},this.refreshView=function(){if(this.element){a.selectedDt=null,this._refreshView(),a.activeDt&&(a.activeDateId=a.activeDt.uid);var b=o.$viewValue?new Date(o.$viewValue):null;b=l.fromTimezone(b,p.timezone),o.$setValidity("dateDisabled",!b||this.element&&!this.isDisabled(b))}},this.createDateObject=function(b,c){var d=o.$viewValue?new Date(o.$viewValue):null;d=l.fromTimezone(d,p.timezone);var e=new Date;e=l.fromTimezone(e,p.timezone);var f=this.compare(b,e),g={date:b,label:l.filter(b,c),selected:d&&0===this.compare(b,d),disabled:this.isDisabled(b),past:0>f,current:0===f,future:f>0,customClass:this.customClass(b)||null};return d&&0===this.compare(b,d)&&(a.selectedDt=g),n.activeDate&&0===this.compare(g.date,n.activeDate)&&(a.activeDt=g),g},this.isDisabled=function(b){return a.disabled||this.minDate&&this.compare(b,this.minDate)<0||this.maxDate&&this.compare(b,this.maxDate)>0||a.dateDisabled&&a.dateDisabled({date:b,mode:a.datepickerMode})},this.customClass=function(b){return a.customClass({date:b,mode:a.datepickerMode})},this.split=function(a,b){for(var c=[];a.length>0;)c.push(a.splice(0,b));return c},a.select=function(b){if(a.datepickerMode===n.minMode){var c=o.$viewValue?l.fromTimezone(new Date(o.$viewValue),p.timezone):new Date(0,0,0,0,0,0,0);c.setFullYear(b.getFullYear(),b.getMonth(),b.getDate()),c=l.toTimezone(c,p.timezone),o.$setViewValue(c),o.$render()}else n.activeDate=b,m(n.modes[n.modes.indexOf(a.datepickerMode)-1]),a.$emit("uib:datepicker.mode");a.$broadcast("uib:datepicker.focus")},a.move=function(a){var b=n.activeDate.getFullYear()+a*(n.step.years||0),c=n.activeDate.getMonth()+a*(n.step.months||0);n.activeDate.setFullYear(b,c,1),n.refreshView()},a.toggleMode=function(b){b=b||1,a.datepickerMode===n.maxMode&&1===b||a.datepickerMode===n.minMode&&-1===b||(m(n.modes[n.modes.indexOf(a.datepickerMode)+b]),a.$emit("uib:datepicker.mode"))},a.keys={13:"enter",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down"};var r=function(){n.element[0].focus()};a.$on("uib:datepicker.focus",r),a.keydown=function(b){var c=a.keys[b.which];if(c&&!b.shiftKey&&!b.altKey&&!a.disabled)if(b.preventDefault(),n.shortcutPropagation||b.stopPropagation(),"enter"===c||"space"===c){if(n.isDisabled(n.activeDate))return;a.select(n.activeDate)}else!b.ctrlKey||"up"!==c&&"down"!==c?(n.handleKeyDown(c,b),n.refreshView()):a.toggleMode("up"===c?1:-1)},b.on("keydown",function(b){a.$apply(function(){a.keydown(b)})}),a.$on("$destroy",function(){for(;q.length;)q.shift()()})}]).controller("UibDaypickerController",["$scope","$element","dateFilter",function(a,b,c){function d(a,b){return 1!==b||a%4!==0||a%100===0&&a%400!==0?f[b]:29}function e(a){var b=new Date(a);b.setDate(b.getDate()+4-(b.getDay()||7));var c=b.getTime();return b.setMonth(0),b.setDate(1),Math.floor(Math.round((c-b)/864e5)/7)+1}var f=[31,28,31,30,31,30,31,31,30,31,30,31];this.step={months:1},this.element=b,this.init=function(b){angular.extend(b,this),a.showWeeks=b.showWeeks,b.refreshView()},this.getDates=function(a,b){for(var c,d=new Array(b),e=new Date(a),f=0;b>f;)c=new Date(e),d[f++]=c,e.setDate(e.getDate()+1);return d},this._refreshView=function(){var b=this.activeDate.getFullYear(),d=this.activeDate.getMonth(),f=new Date(this.activeDate);f.setFullYear(b,d,1);var g=this.startingDay-f.getDay(),h=g>0?7-g:-g,i=new Date(f);h>0&&i.setDate(-h+1);for(var j=this.getDates(i,42),k=0;42>k;k++)j[k]=angular.extend(this.createDateObject(j[k],this.formatDay),{secondary:j[k].getMonth()!==d,uid:a.uniqueId+"-"+k});a.labels=new Array(7);for(var l=0;7>l;l++)a.labels[l]={abbr:c(j[l].date,this.formatDayHeader),full:c(j[l].date,"EEEE")};if(a.title=c(this.activeDate,this.formatDayTitle),a.rows=this.split(j,7),a.showWeeks){a.weekNumbers=[];for(var m=(11-this.startingDay)%7,n=a.rows.length,o=0;n>o;o++)a.weekNumbers.push(e(a.rows[o][m].date))}},this.compare=function(a,b){var c=new Date(a.getFullYear(),a.getMonth(),a.getDate()),d=new Date(b.getFullYear(),b.getMonth(),b.getDate());return c.setFullYear(a.getFullYear()),d.setFullYear(b.getFullYear()),c-d},this.handleKeyDown=function(a,b){var c=this.activeDate.getDate();if("left"===a)c-=1;else if("up"===a)c-=7;else if("right"===a)c+=1;else if("down"===a)c+=7;else if("pageup"===a||"pagedown"===a){var e=this.activeDate.getMonth()+("pageup"===a?-1:1);this.activeDate.setMonth(e,1),c=Math.min(d(this.activeDate.getFullYear(),this.activeDate.getMonth()),c)}else"home"===a?c=1:"end"===a&&(c=d(this.activeDate.getFullYear(),this.activeDate.getMonth()));this.activeDate.setDate(c)}}]).controller("UibMonthpickerController",["$scope","$element","dateFilter",function(a,b,c){this.step={years:1},this.element=b,this.init=function(a){angular.extend(a,this),a.refreshView()},this._refreshView=function(){for(var b,d=new Array(12),e=this.activeDate.getFullYear(),f=0;12>f;f++)b=new Date(this.activeDate),b.setFullYear(e,f,1),d[f]=angular.extend(this.createDateObject(b,this.formatMonth),{uid:a.uniqueId+"-"+f});a.title=c(this.activeDate,this.formatMonthTitle),a.rows=this.split(d,this.monthColumns),a.yearHeaderColspan=this.monthColumns>3?this.monthColumns-2:1},this.compare=function(a,b){var c=new Date(a.getFullYear(),a.getMonth()),d=new Date(b.getFullYear(),b.getMonth());return c.setFullYear(a.getFullYear()),d.setFullYear(b.getFullYear()),c-d},this.handleKeyDown=function(a,b){var c=this.activeDate.getMonth();if("left"===a)c-=1;else if("up"===a)c-=this.monthColumns;else if("right"===a)c+=1;else if("down"===a)c+=this.monthColumns;else if("pageup"===a||"pagedown"===a){var d=this.activeDate.getFullYear()+("pageup"===a?-1:1);this.activeDate.setFullYear(d)}else"home"===a?c=0:"end"===a&&(c=11);this.activeDate.setMonth(c)}}]).controller("UibYearpickerController",["$scope","$element","dateFilter",function(a,b,c){function d(a){return parseInt((a-1)/f,10)*f+1}var e,f;this.element=b,this.yearpickerInit=function(){e=this.yearColumns,f=this.yearRows*e,this.step={years:f}},this._refreshView=function(){for(var b,c=new Array(f),g=0,h=d(this.activeDate.getFullYear());f>g;g++)b=new Date(this.activeDate),b.setFullYear(h+g,0,1),c[g]=angular.extend(this.createDateObject(b,this.formatYear),{uid:a.uniqueId+"-"+g});a.title=[c[0].label,c[f-1].label].join(" - "),a.rows=this.split(c,e),a.columns=e},this.compare=function(a,b){return a.getFullYear()-b.getFullYear()},this.handleKeyDown=function(a,b){var c=this.activeDate.getFullYear();"left"===a?c-=1:"up"===a?c-=e:"right"===a?c+=1:"down"===a?c+=e:"pageup"===a||"pagedown"===a?c+=("pageup"===a?-1:1)*f:"home"===a?c=d(this.activeDate.getFullYear()):"end"===a&&(c=d(this.activeDate.getFullYear())+f-1),this.activeDate.setFullYear(c)}}]).directive("uibDatepicker",function(){return{templateUrl:function(a,b){return b.templateUrl||"uib/template/datepicker/datepicker.html"},scope:{datepickerOptions:"=?"},require:["uibDatepicker","^ngModel"],restrict:"A",controller:"UibDatepickerController",controllerAs:"datepicker",link:function(a,b,c,d){var e=d[0],f=d[1];e.init(f)}}}).directive("uibDaypicker",function(){return{templateUrl:function(a,b){return b.templateUrl||"uib/template/datepicker/day.html"},require:["^uibDatepicker","uibDaypicker"],restrict:"A",controller:"UibDaypickerController",link:function(a,b,c,d){var e=d[0],f=d[1];f.init(e)}}}).directive("uibMonthpicker",function(){return{templateUrl:function(a,b){return b.templateUrl||"uib/template/datepicker/month.html"},require:["^uibDatepicker","uibMonthpicker"],restrict:"A",controller:"UibMonthpickerController",link:function(a,b,c,d){var e=d[0],f=d[1];f.init(e)}}}).directive("uibYearpicker",function(){return{templateUrl:function(a,b){return b.templateUrl||"uib/template/datepicker/year.html"},require:["^uibDatepicker","uibYearpicker"],restrict:"A",controller:"UibYearpickerController",link:function(a,b,c,d){var e=d[0];angular.extend(e,d[1]),e.yearpickerInit(),e.refreshView()}}}),angular.module("ui.bootstrap.position",[]).factory("$uibPosition",["$document","$window",function(a,b){var c,d,e={normal:/(auto|scroll)/,
hidden:/(auto|scroll|hidden)/},f={auto:/\s?auto?\s?/i,primary:/^(top|bottom|left|right)$/,secondary:/^(top|bottom|left|right|center)$/,vertical:/^(top|bottom)$/},g=/(HTML|BODY)/;return{getRawNode:function(a){return a.nodeName?a:a[0]||a},parseStyle:function(a){return a=parseFloat(a),isFinite(a)?a:0},offsetParent:function(c){function d(a){return"static"===(b.getComputedStyle(a).position||"static")}c=this.getRawNode(c);for(var e=c.offsetParent||a[0].documentElement;e&&e!==a[0].documentElement&&d(e);)e=e.offsetParent;return e||a[0].documentElement},scrollbarWidth:function(e){if(e){if(angular.isUndefined(d)){var f=a.find("body");f.addClass("uib-position-body-scrollbar-measure"),d=b.innerWidth-f[0].clientWidth,d=isFinite(d)?d:0,f.removeClass("uib-position-body-scrollbar-measure")}return d}if(angular.isUndefined(c)){var g=angular.element('<div class="uib-position-scrollbar-measure"></div>');a.find("body").append(g),c=g[0].offsetWidth-g[0].clientWidth,c=isFinite(c)?c:0,g.remove()}return c},scrollbarPadding:function(a){a=this.getRawNode(a);var c=b.getComputedStyle(a),d=this.parseStyle(c.paddingRight),e=this.parseStyle(c.paddingBottom),f=this.scrollParent(a,!1,!0),h=this.scrollbarWidth(f,g.test(f.tagName));return{scrollbarWidth:h,widthOverflow:f.scrollWidth>f.clientWidth,right:d+h,originalRight:d,heightOverflow:f.scrollHeight>f.clientHeight,bottom:e+h,originalBottom:e}},isScrollable:function(a,c){a=this.getRawNode(a);var d=c?e.hidden:e.normal,f=b.getComputedStyle(a);return d.test(f.overflow+f.overflowY+f.overflowX)},scrollParent:function(c,d,f){c=this.getRawNode(c);var g=d?e.hidden:e.normal,h=a[0].documentElement,i=b.getComputedStyle(c);if(f&&g.test(i.overflow+i.overflowY+i.overflowX))return c;var j="absolute"===i.position,k=c.parentElement||h;if(k===h||"fixed"===i.position)return h;for(;k.parentElement&&k!==h;){var l=b.getComputedStyle(k);if(j&&"static"!==l.position&&(j=!1),!j&&g.test(l.overflow+l.overflowY+l.overflowX))break;k=k.parentElement}return k},position:function(c,d){c=this.getRawNode(c);var e=this.offset(c);if(d){var f=b.getComputedStyle(c);e.top-=this.parseStyle(f.marginTop),e.left-=this.parseStyle(f.marginLeft)}var g=this.offsetParent(c),h={top:0,left:0};return g!==a[0].documentElement&&(h=this.offset(g),h.top+=g.clientTop-g.scrollTop,h.left+=g.clientLeft-g.scrollLeft),{width:Math.round(angular.isNumber(e.width)?e.width:c.offsetWidth),height:Math.round(angular.isNumber(e.height)?e.height:c.offsetHeight),top:Math.round(e.top-h.top),left:Math.round(e.left-h.left)}},offset:function(c){c=this.getRawNode(c);var d=c.getBoundingClientRect();return{width:Math.round(angular.isNumber(d.width)?d.width:c.offsetWidth),height:Math.round(angular.isNumber(d.height)?d.height:c.offsetHeight),top:Math.round(d.top+(b.pageYOffset||a[0].documentElement.scrollTop)),left:Math.round(d.left+(b.pageXOffset||a[0].documentElement.scrollLeft))}},viewportOffset:function(c,d,e){c=this.getRawNode(c),e=e!==!1;var f=c.getBoundingClientRect(),g={top:0,left:0,bottom:0,right:0},h=d?a[0].documentElement:this.scrollParent(c),i=h.getBoundingClientRect();if(g.top=i.top+h.clientTop,g.left=i.left+h.clientLeft,h===a[0].documentElement&&(g.top+=b.pageYOffset,g.left+=b.pageXOffset),g.bottom=g.top+h.clientHeight,g.right=g.left+h.clientWidth,e){var j=b.getComputedStyle(h);g.top+=this.parseStyle(j.paddingTop),g.bottom-=this.parseStyle(j.paddingBottom),g.left+=this.parseStyle(j.paddingLeft),g.right-=this.parseStyle(j.paddingRight)}return{top:Math.round(f.top-g.top),bottom:Math.round(g.bottom-f.bottom),left:Math.round(f.left-g.left),right:Math.round(g.right-f.right)}},parsePlacement:function(a){var b=f.auto.test(a);return b&&(a=a.replace(f.auto,"")),a=a.split("-"),a[0]=a[0]||"top",f.primary.test(a[0])||(a[0]="top"),a[1]=a[1]||"center",f.secondary.test(a[1])||(a[1]="center"),b?a[2]=!0:a[2]=!1,a},positionElements:function(a,c,d,e){a=this.getRawNode(a),c=this.getRawNode(c);var g=angular.isDefined(c.offsetWidth)?c.offsetWidth:c.prop("offsetWidth"),h=angular.isDefined(c.offsetHeight)?c.offsetHeight:c.prop("offsetHeight");d=this.parsePlacement(d);var i=e?this.offset(a):this.position(a),j={top:0,left:0,placement:""};if(d[2]){var k=this.viewportOffset(a,e),l=b.getComputedStyle(c),m={width:g+Math.round(Math.abs(this.parseStyle(l.marginLeft)+this.parseStyle(l.marginRight))),height:h+Math.round(Math.abs(this.parseStyle(l.marginTop)+this.parseStyle(l.marginBottom)))};if(d[0]="top"===d[0]&&m.height>k.top&&m.height<=k.bottom?"bottom":"bottom"===d[0]&&m.height>k.bottom&&m.height<=k.top?"top":"left"===d[0]&&m.width>k.left&&m.width<=k.right?"right":"right"===d[0]&&m.width>k.right&&m.width<=k.left?"left":d[0],d[1]="top"===d[1]&&m.height-i.height>k.bottom&&m.height-i.height<=k.top?"bottom":"bottom"===d[1]&&m.height-i.height>k.top&&m.height-i.height<=k.bottom?"top":"left"===d[1]&&m.width-i.width>k.right&&m.width-i.width<=k.left?"right":"right"===d[1]&&m.width-i.width>k.left&&m.width-i.width<=k.right?"left":d[1],"center"===d[1])if(f.vertical.test(d[0])){var n=i.width/2-g/2;k.left+n<0&&m.width-i.width<=k.right?d[1]="left":k.right+n<0&&m.width-i.width<=k.left&&(d[1]="right")}else{var o=i.height/2-m.height/2;k.top+o<0&&m.height-i.height<=k.bottom?d[1]="top":k.bottom+o<0&&m.height-i.height<=k.top&&(d[1]="bottom")}}switch(d[0]){case"top":j.top=i.top-h;break;case"bottom":j.top=i.top+i.height;break;case"left":j.left=i.left-g;break;case"right":j.left=i.left+i.width}switch(d[1]){case"top":j.top=i.top;break;case"bottom":j.top=i.top+i.height-h;break;case"left":j.left=i.left;break;case"right":j.left=i.left+i.width-g;break;case"center":f.vertical.test(d[0])?j.left=i.left+i.width/2-g/2:j.top=i.top+i.height/2-h/2}return j.top=Math.round(j.top),j.left=Math.round(j.left),j.placement="center"===d[1]?d[0]:d[0]+"-"+d[1],j},adjustTop:function(a,b,c,d){return-1!==a.indexOf("top")&&c!==d?{top:b.top-d+"px"}:void 0},positionArrow:function(a,c){a=this.getRawNode(a);var d=a.querySelector(".tooltip-inner, .popover-inner");if(d){var e=angular.element(d).hasClass("tooltip-inner"),g=e?a.querySelector(".tooltip-arrow"):a.querySelector(".arrow");if(g){var h={top:"",bottom:"",left:"",right:""};if(c=this.parsePlacement(c),"center"===c[1])return void angular.element(g).css(h);var i="border-"+c[0]+"-width",j=b.getComputedStyle(g)[i],k="border-";k+=f.vertical.test(c[0])?c[0]+"-"+c[1]:c[1]+"-"+c[0],k+="-radius";var l=b.getComputedStyle(e?d:a)[k];switch(c[0]){case"top":h.bottom=e?"0":"-"+j;break;case"bottom":h.top=e?"0":"-"+j;break;case"left":h.right=e?"0":"-"+j;break;case"right":h.left=e?"0":"-"+j}h[c[1]]=l,angular.element(g).css(h)}}}}}]),angular.module("ui.bootstrap.datepickerPopup",["ui.bootstrap.datepicker","ui.bootstrap.position"]).value("$datepickerPopupLiteralWarning",!0).constant("uibDatepickerPopupConfig",{altInputFormats:[],appendToBody:!1,clearText:"Clear",closeOnDateSelection:!0,closeText:"Done",currentText:"Today",datepickerPopup:"yyyy-MM-dd",datepickerPopupTemplateUrl:"uib/template/datepickerPopup/popup.html",datepickerTemplateUrl:"uib/template/datepicker/datepicker.html",html5Types:{date:"yyyy-MM-dd","datetime-local":"yyyy-MM-ddTHH:mm:ss.sss",month:"yyyy-MM"},onOpenFocus:!0,showButtonBar:!0,placement:"auto bottom-left"}).controller("UibDatepickerPopupController",["$scope","$element","$attrs","$compile","$log","$parse","$window","$document","$rootScope","$uibPosition","dateFilter","uibDateParser","uibDatepickerPopupConfig","$timeout","uibDatepickerConfig","$datepickerPopupLiteralWarning",function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){function q(b){var c=l.parse(b,w,a.date);if(isNaN(c))for(var d=0;d<I.length;d++)if(c=l.parse(b,I[d],a.date),!isNaN(c))return c;return c}function r(a){if(angular.isNumber(a)&&(a=new Date(a)),!a)return null;if(angular.isDate(a)&&!isNaN(a))return a;if(angular.isString(a)){var b=q(a);if(!isNaN(b))return l.fromTimezone(b,G.timezone)}return F.$options&&F.$options.allowInvalid?a:void 0}function s(a,b){var d=a||b;return c.ngRequired||d?(angular.isNumber(d)&&(d=new Date(d)),d?angular.isDate(d)&&!isNaN(d)?!0:angular.isString(d)?!isNaN(q(d)):!1:!0):!0}function t(c){if(a.isOpen||!a.disabled){var d=H[0],e=b[0].contains(c.target),f=void 0!==d.contains&&d.contains(c.target);!a.isOpen||e||f||a.$apply(function(){a.isOpen=!1})}}function u(c){27===c.which&&a.isOpen?(c.preventDefault(),c.stopPropagation(),a.$apply(function(){a.isOpen=!1}),b[0].focus()):40!==c.which||a.isOpen||(c.preventDefault(),c.stopPropagation(),a.$apply(function(){a.isOpen=!0}))}function v(){if(a.isOpen){var d=angular.element(H[0].querySelector(".uib-datepicker-popup")),e=c.popupPlacement?c.popupPlacement:m.placement,f=j.positionElements(b,d,e,y);d.css({top:f.top+"px",left:f.left+"px"}),d.hasClass("uib-position-measure")&&d.removeClass("uib-position-measure")}}var w,x,y,z,A,B,C,D,E,F,G,H,I,J=!1,K=[];this.init=function(e){if(F=e,G=angular.isObject(e.$options)?e.$options:{timezone:null},x=angular.isDefined(c.closeOnDateSelection)?a.$parent.$eval(c.closeOnDateSelection):m.closeOnDateSelection,y=angular.isDefined(c.datepickerAppendToBody)?a.$parent.$eval(c.datepickerAppendToBody):m.appendToBody,z=angular.isDefined(c.onOpenFocus)?a.$parent.$eval(c.onOpenFocus):m.onOpenFocus,A=angular.isDefined(c.datepickerPopupTemplateUrl)?c.datepickerPopupTemplateUrl:m.datepickerPopupTemplateUrl,B=angular.isDefined(c.datepickerTemplateUrl)?c.datepickerTemplateUrl:m.datepickerTemplateUrl,I=angular.isDefined(c.altInputFormats)?a.$parent.$eval(c.altInputFormats):m.altInputFormats,a.showButtonBar=angular.isDefined(c.showButtonBar)?a.$parent.$eval(c.showButtonBar):m.showButtonBar,m.html5Types[c.type]?(w=m.html5Types[c.type],J=!0):(w=c.uibDatepickerPopup||m.datepickerPopup,c.$observe("uibDatepickerPopup",function(a,b){var c=a||m.datepickerPopup;if(c!==w&&(w=c,F.$modelValue=null,!w))throw new Error("uibDatepickerPopup must have a date format specified.")})),!w)throw new Error("uibDatepickerPopup must have a date format specified.");if(J&&c.uibDatepickerPopup)throw new Error("HTML5 date input types do not support custom formats.");C=angular.element("<div uib-datepicker-popup-wrap><div uib-datepicker></div></div>"),C.attr({"ng-model":"date","ng-change":"dateSelection(date)","template-url":A}),D=angular.element(C.children()[0]),D.attr("template-url",B),a.datepickerOptions||(a.datepickerOptions={}),J&&"month"===c.type&&(a.datepickerOptions.datepickerMode="month",a.datepickerOptions.minMode="month"),D.attr("datepicker-options","datepickerOptions"),J?F.$formatters.push(function(b){return a.date=l.fromTimezone(b,G.timezone),b}):(F.$$parserName="date",F.$validators.date=s,F.$parsers.unshift(r),F.$formatters.push(function(b){return F.$isEmpty(b)?(a.date=b,b):(angular.isNumber(b)&&(b=new Date(b)),a.date=l.fromTimezone(b,G.timezone),l.filter(a.date,w))})),F.$viewChangeListeners.push(function(){a.date=q(F.$viewValue)}),b.on("keydown",u),H=d(C)(a),C.remove(),y?h.find("body").append(H):b.after(H),a.$on("$destroy",function(){for(a.isOpen===!0&&(i.$$phase||a.$apply(function(){a.isOpen=!1})),H.remove(),b.off("keydown",u),h.off("click",t),E&&E.off("scroll",v),angular.element(g).off("resize",v);K.length;)K.shift()()})},a.getText=function(b){return a[b+"Text"]||m[b+"Text"]},a.isDisabled=function(b){"today"===b&&(b=l.fromTimezone(new Date,G.timezone));var c={};return angular.forEach(["minDate","maxDate"],function(b){a.datepickerOptions[b]?angular.isDate(a.datepickerOptions[b])?c[b]=new Date(a.datepickerOptions[b]):(p&&e.warn("Literal date support has been deprecated, please switch to date object usage"),c[b]=new Date(k(a.datepickerOptions[b],"medium"))):c[b]=null}),a.datepickerOptions&&c.minDate&&a.compare(b,c.minDate)<0||c.maxDate&&a.compare(b,c.maxDate)>0},a.compare=function(a,b){return new Date(a.getFullYear(),a.getMonth(),a.getDate())-new Date(b.getFullYear(),b.getMonth(),b.getDate())},a.dateSelection=function(c){a.date=c;var d=a.date?l.filter(a.date,w):null;b.val(d),F.$setViewValue(d),x&&(a.isOpen=!1,b[0].focus())},a.keydown=function(c){27===c.which&&(c.stopPropagation(),a.isOpen=!1,b[0].focus())},a.select=function(b,c){if(c.stopPropagation(),"today"===b){var d=new Date;angular.isDate(a.date)?(b=new Date(a.date),b.setFullYear(d.getFullYear(),d.getMonth(),d.getDate())):(b=l.fromTimezone(d,G.timezone),b.setHours(0,0,0,0))}a.dateSelection(b)},a.close=function(c){c.stopPropagation(),a.isOpen=!1,b[0].focus()},a.disabled=angular.isDefined(c.disabled)||!1,c.ngDisabled&&K.push(a.$parent.$watch(f(c.ngDisabled),function(b){a.disabled=b})),a.$watch("isOpen",function(d){d?a.disabled?a.isOpen=!1:n(function(){v(),z&&a.$broadcast("uib:datepicker.focus"),h.on("click",t);var d=c.popupPlacement?c.popupPlacement:m.placement;y||j.parsePlacement(d)[2]?(E=E||angular.element(j.scrollParent(b)),E&&E.on("scroll",v)):E=null,angular.element(g).on("resize",v)},0,!1):(h.off("click",t),E&&E.off("scroll",v),angular.element(g).off("resize",v))}),a.$on("uib:datepicker.mode",function(){n(v,0,!1)})}]).directive("uibDatepickerPopup",function(){return{require:["ngModel","uibDatepickerPopup"],controller:"UibDatepickerPopupController",scope:{datepickerOptions:"=?",isOpen:"=?",currentText:"@",clearText:"@",closeText:"@"},link:function(a,b,c,d){var e=d[0],f=d[1];f.init(e)}}}).directive("uibDatepickerPopupWrap",function(){return{restrict:"A",transclude:!0,templateUrl:function(a,b){return b.templateUrl||"uib/template/datepickerPopup/popup.html"}}}),angular.module("ui.bootstrap.debounce",[]).factory("$$debounce",["$timeout",function(a){return function(b,c){var d;return function(){var e=this,f=Array.prototype.slice.call(arguments);d&&a.cancel(d),d=a(function(){b.apply(e,f)},c)}}}]),angular.module("ui.bootstrap.dropdown",["ui.bootstrap.position"]).constant("uibDropdownConfig",{appendToOpenClass:"uib-dropdown-open",openClass:"open"}).service("uibDropdownService",["$document","$rootScope",function(a,b){var c=null;this.open=function(b,e){c||a.on("click",d),c&&c!==b&&(c.isOpen=!1),c=b},this.close=function(b,e){c===b&&(c=null,a.off("click",d),a.off("keydown",this.keybindFilter))};var d=function(a){if(c&&!(a&&"disabled"===c.getAutoClose()||a&&3===a.which)){var d=c.getToggleElement();if(!(a&&d&&d[0].contains(a.target))){var e=c.getDropdownElement();a&&"outsideClick"===c.getAutoClose()&&e&&e[0].contains(a.target)||(c.isOpen=!1,c.focusToggleElement(),b.$$phase||c.$apply())}}};this.keybindFilter=function(a){var b=c.getDropdownElement(),e=c.getToggleElement(),f=b&&b[0].contains(a.target),g=e&&e[0].contains(a.target);27===a.which?(a.stopPropagation(),c.focusToggleElement(),d()):c.isKeynavEnabled()&&-1!==[38,40].indexOf(a.which)&&c.isOpen&&(f||g)&&(a.preventDefault(),a.stopPropagation(),c.focusDropdownEntry(a.which))}}]).controller("UibDropdownController",["$scope","$element","$attrs","$parse","uibDropdownConfig","uibDropdownService","$animate","$uibPosition","$document","$compile","$templateRequest",function(a,b,c,d,e,f,g,h,i,j,k){var l,m,n=this,o=a.$new(),p=e.appendToOpenClass,q=e.openClass,r=angular.noop,s=c.onToggle?d(c.onToggle):angular.noop,t=!1,u=null,v=!1,w=i.find("body");b.addClass("dropdown"),this.init=function(){if(c.isOpen&&(m=d(c.isOpen),r=m.assign,a.$watch(m,function(a){o.isOpen=!!a})),angular.isDefined(c.dropdownAppendTo)){var e=d(c.dropdownAppendTo)(o);e&&(u=angular.element(e))}t=angular.isDefined(c.dropdownAppendToBody),v=angular.isDefined(c.keyboardNav),t&&!u&&(u=w),u&&n.dropdownMenu&&(u.append(n.dropdownMenu),b.on("$destroy",function(){n.dropdownMenu.remove()}))},this.toggle=function(a){return o.isOpen=arguments.length?!!a:!o.isOpen,angular.isFunction(r)&&r(o,o.isOpen),o.isOpen},this.isOpen=function(){return o.isOpen},o.getToggleElement=function(){return n.toggleElement},o.getAutoClose=function(){return c.autoClose||"always"},o.getElement=function(){return b},o.isKeynavEnabled=function(){return v},o.focusDropdownEntry=function(a){var c=n.dropdownMenu?angular.element(n.dropdownMenu).find("a"):b.find("ul").eq(0).find("a");switch(a){case 40:angular.isNumber(n.selectedOption)?n.selectedOption=n.selectedOption===c.length-1?n.selectedOption:n.selectedOption+1:n.selectedOption=0;break;case 38:angular.isNumber(n.selectedOption)?n.selectedOption=0===n.selectedOption?0:n.selectedOption-1:n.selectedOption=c.length-1}c[n.selectedOption].focus()},o.getDropdownElement=function(){return n.dropdownMenu},o.focusToggleElement=function(){n.toggleElement&&n.toggleElement[0].focus()},o.$watch("isOpen",function(c,d){if(u&&n.dropdownMenu){var e,m,v,w=h.positionElements(b,n.dropdownMenu,"bottom-left",!0),x=0;if(e={top:w.top+"px",display:c?"block":"none"},m=n.dropdownMenu.hasClass("dropdown-menu-right"),m?(e.left="auto",v=h.scrollbarPadding(u),v.heightOverflow&&v.scrollbarWidth&&(x=v.scrollbarWidth),e.right=window.innerWidth-x-(w.left+b.prop("offsetWidth"))+"px"):(e.left=w.left+"px",e.right="auto"),!t){var y=h.offset(u);e.top=w.top-y.top+"px",m?e.right=window.innerWidth-(w.left-y.left+b.prop("offsetWidth"))+"px":e.left=w.left-y.left+"px"}n.dropdownMenu.css(e)}var z=u?u:b,A=z.hasClass(u?p:q);if(A===!c&&g[c?"addClass":"removeClass"](z,u?p:q).then(function(){angular.isDefined(c)&&c!==d&&s(a,{open:!!c})}),c)n.dropdownMenuTemplateUrl?k(n.dropdownMenuTemplateUrl).then(function(a){l=o.$new(),j(a.trim())(l,function(a){var b=a;n.dropdownMenu.replaceWith(b),n.dropdownMenu=b,i.on("keydown",f.keybindFilter)})}):i.on("keydown",f.keybindFilter),o.focusToggleElement(),f.open(o,b);else{if(f.close(o,b),n.dropdownMenuTemplateUrl){l&&l.$destroy();var B=angular.element('<ul class="dropdown-menu"></ul>');n.dropdownMenu.replaceWith(B),n.dropdownMenu=B}n.selectedOption=null}angular.isFunction(r)&&r(a,c)})}]).directive("uibDropdown",function(){return{controller:"UibDropdownController",link:function(a,b,c,d){d.init()}}}).directive("uibDropdownMenu",function(){return{restrict:"A",require:"?^uibDropdown",link:function(a,b,c,d){if(d&&!angular.isDefined(c.dropdownNested)){b.addClass("dropdown-menu");var e=c.templateUrl;e&&(d.dropdownMenuTemplateUrl=e),d.dropdownMenu||(d.dropdownMenu=b)}}}}).directive("uibDropdownToggle",function(){return{require:"?^uibDropdown",link:function(a,b,c,d){if(d){b.addClass("dropdown-toggle"),d.toggleElement=b;var e=function(e){e.preventDefault(),b.hasClass("disabled")||c.disabled||a.$apply(function(){d.toggle()})};b.bind("click",e),b.attr({"aria-haspopup":!0,"aria-expanded":!1}),a.$watch(d.isOpen,function(a){b.attr("aria-expanded",!!a)}),a.$on("$destroy",function(){b.unbind("click",e)})}}}}),angular.module("ui.bootstrap.stackedMap",[]).factory("$$stackedMap",function(){return{createNew:function(){var a=[];return{add:function(b,c){a.push({key:b,value:c})},get:function(b){for(var c=0;c<a.length;c++)if(b===a[c].key)return a[c]},keys:function(){for(var b=[],c=0;c<a.length;c++)b.push(a[c].key);return b},top:function(){return a[a.length-1]},remove:function(b){for(var c=-1,d=0;d<a.length;d++)if(b===a[d].key){c=d;break}return a.splice(c,1)[0]},removeTop:function(){return a.pop()},length:function(){return a.length}}}}}),angular.module("ui.bootstrap.modal",["ui.bootstrap.stackedMap","ui.bootstrap.position"]).factory("$$multiMap",function(){return{createNew:function(){var a={};return{entries:function(){return Object.keys(a).map(function(b){return{key:b,value:a[b]}})},get:function(b){return a[b]},hasKey:function(b){return!!a[b]},keys:function(){return Object.keys(a)},put:function(b,c){a[b]||(a[b]=[]),a[b].push(c)},remove:function(b,c){var d=a[b];if(d){var e=d.indexOf(c);-1!==e&&d.splice(e,1),d.length||delete a[b]}}}}}}).provider("$uibResolve",function(){var a=this;this.resolver=null,this.setResolver=function(a){this.resolver=a},this.$get=["$injector","$q",function(b,c){var d=a.resolver?b.get(a.resolver):null;return{resolve:function(a,e,f,g){if(d)return d.resolve(a,e,f,g);var h=[];return angular.forEach(a,function(a){angular.isFunction(a)||angular.isArray(a)?h.push(c.resolve(b.invoke(a))):angular.isString(a)?h.push(c.resolve(b.get(a))):h.push(c.resolve(a))}),c.all(h).then(function(b){var c={},d=0;return angular.forEach(a,function(a,e){c[e]=b[d++]}),c})}}}]}).directive("uibModalBackdrop",["$animate","$injector","$uibModalStack",function(a,b,c){function d(b,d,e){e.modalInClass&&(a.addClass(d,e.modalInClass),b.$on(c.NOW_CLOSING_EVENT,function(c,f){var g=f();b.modalOptions.animation?a.removeClass(d,e.modalInClass).then(g):g()}))}return{restrict:"A",compile:function(a,b){return a.addClass(b.backdropClass),d}}}]).directive("uibModalWindow",["$uibModalStack","$q","$animateCss","$document",function(a,b,c,d){return{scope:{index:"@"},restrict:"A",transclude:!0,templateUrl:function(a,b){return b.templateUrl||"uib/template/modal/window.html"},link:function(e,f,g){f.addClass(g.windowTopClass||""),e.size=g.size,e.close=function(b){var c=a.getTop();c&&c.value.backdrop&&"static"!==c.value.backdrop&&b.target===b.currentTarget&&(b.preventDefault(),b.stopPropagation(),a.dismiss(c.key,"backdrop click"))},f.on("click",e.close),e.$isRendered=!0;var h=b.defer();e.$$postDigest(function(){h.resolve()}),h.promise.then(function(){var h=null;g.modalInClass&&(h=c(f,{addClass:g.modalInClass}).start(),e.$on(a.NOW_CLOSING_EVENT,function(a,b){var d=b();c(f,{removeClass:g.modalInClass}).start().then(d)})),b.when(h).then(function(){var b=a.getTop();if(b&&a.modalRendered(b.key),!d[0].activeElement||!f[0].contains(d[0].activeElement)){var c=f[0].querySelector("[autofocus]");c?c.focus():f[0].focus()}})})}}}]).directive("uibModalAnimationClass",function(){return{compile:function(a,b){b.modalAnimation&&a.addClass(b.uibModalAnimationClass)}}}).directive("uibModalTransclude",["$animate",function(a){return{link:function(b,c,d,e,f){f(b.$parent,function(b){c.empty(),a.enter(b,c)})}}}]).factory("$uibModalStack",["$animate","$animateCss","$document","$compile","$rootScope","$q","$$multiMap","$$stackedMap","$uibPosition",function(a,b,c,d,e,f,g,h,i){function j(a){var b="-";return a.replace(C,function(a,c){return(c?b:"")+a.toLowerCase()})}function k(a){return!!(a.offsetWidth||a.offsetHeight||a.getClientRects().length)}function l(){for(var a=-1,b=w.keys(),c=0;c<b.length;c++)w.get(b[c]).value.backdrop&&(a=c);return a>-1&&z>a&&(a=z),a}function m(a,b){var c=w.get(a).value,d=c.appendTo;w.remove(a),A=w.top(),A&&(z=parseInt(A.value.modalDomEl.attr("index"),10)),p(c.modalDomEl,c.modalScope,function(){var b=c.openedClass||v;x.remove(b,a);var e=x.hasKey(b);d.toggleClass(b,e),!e&&u&&u.heightOverflow&&u.scrollbarWidth&&(u.originalRight?d.css({paddingRight:u.originalRight+"px"}):d.css({paddingRight:""}),u=null),n(!0)},c.closedDeferred),o(),b&&b.focus?b.focus():d.focus&&d.focus()}function n(a){var b;w.length()>0&&(b=w.top().value,b.modalDomEl.toggleClass(b.windowTopClass||"",a))}function o(){if(s&&-1===l()){var a=t;p(s,t,function(){a=null}),s=void 0,t=void 0}}function p(b,c,d,e){function g(){g.done||(g.done=!0,a.leave(b).then(function(){d&&d(),b.remove(),e&&e.resolve()}),c.$destroy())}var h,i=null,j=function(){return h||(h=f.defer(),i=h.promise),function(){h.resolve()}};return c.$broadcast(y.NOW_CLOSING_EVENT,j),f.when(i).then(g)}function q(a){if(a.isDefaultPrevented())return a;var b=w.top();if(b)switch(a.which){case 27:b.value.keyboard&&(a.preventDefault(),e.$apply(function(){y.dismiss(b.key,"escape key press")}));break;case 9:var c=y.loadFocusElementList(b),d=!1;a.shiftKey?(y.isFocusInFirstItem(a,c)||y.isModalFocused(a,b))&&(d=y.focusLastFocusableElement(c)):y.isFocusInLastItem(a,c)&&(d=y.focusFirstFocusableElement(c)),d&&(a.preventDefault(),a.stopPropagation())}}function r(a,b,c){return!a.value.modalScope.$broadcast("modal.closing",b,c).defaultPrevented}var s,t,u,v="modal-open",w=h.createNew(),x=g.createNew(),y={NOW_CLOSING_EVENT:"modal.stack.now-closing"},z=0,A=null,B="a[href], area[href], input:not([disabled]):not([tabindex='-1']), button:not([disabled]):not([tabindex='-1']),select:not([disabled]):not([tabindex='-1']), textarea:not([disabled]):not([tabindex='-1']), iframe, object, embed, *[tabindex]:not([tabindex='-1']), *[contenteditable=true]",C=/[A-Z]/g;return e.$watch(l,function(a){t&&(t.index=a)}),c.on("keydown",q),e.$on("$destroy",function(){c.off("keydown",q)}),y.open=function(b,f){var g=c[0].activeElement,h=f.openedClass||v;n(!1),A=w.top(),w.add(b,{deferred:f.deferred,renderDeferred:f.renderDeferred,closedDeferred:f.closedDeferred,modalScope:f.scope,backdrop:f.backdrop,keyboard:f.keyboard,openedClass:f.openedClass,windowTopClass:f.windowTopClass,animation:f.animation,appendTo:f.appendTo}),x.put(h,b);var k=f.appendTo,m=l();if(!k.length)throw new Error("appendTo element not found. Make sure that the element passed is in DOM.");m>=0&&!s&&(t=e.$new(!0),t.modalOptions=f,t.index=m,s=angular.element('<div uib-modal-backdrop="modal-backdrop"></div>'),s.attr({"class":"modal-backdrop","ng-style":"{'z-index': 1040 + (index && 1 || 0) + index*10}","uib-modal-animation-class":"fade","modal-in-class":"in"}),f.backdropClass&&s.addClass(f.backdropClass),f.animation&&s.attr("modal-animation","true"),d(s)(t),a.enter(s,k),i.isScrollable(k)&&(u=i.scrollbarPadding(k),u.heightOverflow&&u.scrollbarWidth&&k.css({paddingRight:u.right+"px"})));var o;f.component?(o=document.createElement(j(f.component.name)),o=angular.element(o),o.attr({resolve:"$resolve","modal-instance":"$uibModalInstance",close:"$close($value)",dismiss:"$dismiss($value)"})):o=f.content,z=A?parseInt(A.value.modalDomEl.attr("index"),10)+1:0;var p=angular.element('<div uib-modal-window="modal-window"></div>');p.attr({"class":"modal","template-url":f.windowTemplateUrl,"window-top-class":f.windowTopClass,role:"dialog","aria-labelledby":f.ariaLabelledBy,"aria-describedby":f.ariaDescribedBy,size:f.size,index:z,animate:"animate","ng-style":"{'z-index': 1050 + $$topModalIndex*10, display: 'block'}",tabindex:-1,"uib-modal-animation-class":"fade","modal-in-class":"in"}).append(o),f.windowClass&&p.addClass(f.windowClass),f.animation&&p.attr("modal-animation","true"),k.addClass(h),f.scope&&(f.scope.$$topModalIndex=z),a.enter(d(p)(f.scope),k),w.top().value.modalDomEl=p,w.top().value.modalOpener=g},y.close=function(a,b){var c=w.get(a);return c&&r(c,b,!0)?(c.value.modalScope.$$uibDestructionScheduled=!0,c.value.deferred.resolve(b),m(a,c.value.modalOpener),!0):!c},y.dismiss=function(a,b){var c=w.get(a);return c&&r(c,b,!1)?(c.value.modalScope.$$uibDestructionScheduled=!0,c.value.deferred.reject(b),m(a,c.value.modalOpener),!0):!c},y.dismissAll=function(a){for(var b=this.getTop();b&&this.dismiss(b.key,a);)b=this.getTop()},y.getTop=function(){return w.top()},y.modalRendered=function(a){var b=w.get(a);b&&b.value.renderDeferred.resolve()},y.focusFirstFocusableElement=function(a){return a.length>0?(a[0].focus(),!0):!1},y.focusLastFocusableElement=function(a){return a.length>0?(a[a.length-1].focus(),!0):!1},y.isModalFocused=function(a,b){if(a&&b){var c=b.value.modalDomEl;if(c&&c.length)return(a.target||a.srcElement)===c[0]}return!1},y.isFocusInFirstItem=function(a,b){return b.length>0?(a.target||a.srcElement)===b[0]:!1},y.isFocusInLastItem=function(a,b){return b.length>0?(a.target||a.srcElement)===b[b.length-1]:!1},y.loadFocusElementList=function(a){if(a){var b=a.value.modalDomEl;if(b&&b.length){var c=b[0].querySelectorAll(B);return c?Array.prototype.filter.call(c,function(a){return k(a)}):c}}},y}]).provider("$uibModal",function(){var a={options:{animation:!0,backdrop:!0,keyboard:!0},$get:["$rootScope","$q","$document","$templateRequest","$controller","$uibResolve","$uibModalStack",function(b,c,d,e,f,g,h){function i(a){return a.template?c.when(a.template):e(angular.isFunction(a.templateUrl)?a.templateUrl():a.templateUrl)}var j={},k=null;return j.getPromiseChain=function(){return k},j.open=function(e){function j(){return q}var l=c.defer(),m=c.defer(),n=c.defer(),o=c.defer(),p={result:l.promise,opened:m.promise,closed:n.promise,rendered:o.promise,close:function(a){return h.close(p,a)},dismiss:function(a){return h.dismiss(p,a)}};if(e=angular.extend({},a.options,e),e.resolve=e.resolve||{},e.appendTo=e.appendTo||d.find("body").eq(0),!e.component&&!e.template&&!e.templateUrl)throw new Error("One of component or template or templateUrl options is required.");var q;q=e.component?c.when(g.resolve(e.resolve,{},null,null)):c.all([i(e),g.resolve(e.resolve,{},null,null)]);var r;return r=k=c.all([k]).then(j,j).then(function(a){function c(b,c,d,e){b.$scope=g,b.$scope.$resolve={},d?b.$scope.$uibModalInstance=p:b.$uibModalInstance=p;var f=c?a[1]:a;angular.forEach(f,function(a,c){e&&(b[c]=a),b.$scope.$resolve[c]=a})}var d=e.scope||b,g=d.$new();g.$close=p.close,g.$dismiss=p.dismiss,g.$on("$destroy",function(){g.$$uibDestructionScheduled||g.$dismiss("$uibUnscheduledDestruction")});var i,j,k={scope:g,deferred:l,renderDeferred:o,closedDeferred:n,animation:e.animation,backdrop:e.backdrop,keyboard:e.keyboard,backdropClass:e.backdropClass,windowTopClass:e.windowTopClass,windowClass:e.windowClass,windowTemplateUrl:e.windowTemplateUrl,ariaLabelledBy:e.ariaLabelledBy,ariaDescribedBy:e.ariaDescribedBy,size:e.size,openedClass:e.openedClass,appendTo:e.appendTo},q={},r={};e.component?(c(q,!1,!0,!1),q.name=e.component,k.component=q):e.controller&&(c(r,!0,!1,!0),j=f(e.controller,r,!0,e.controllerAs),e.controllerAs&&e.bindToController&&(i=j.instance,i.$close=g.$close,i.$dismiss=g.$dismiss,angular.extend(i,{$resolve:r.$scope.$resolve},d)),i=j(),angular.isFunction(i.$onInit)&&i.$onInit()),e.component||(k.content=a[0]),h.open(p,k),m.resolve(!0)},function(a){m.reject(a),l.reject(a)})["finally"](function(){k===r&&(k=null)}),p},j}]};return a}),angular.module("ui.bootstrap.paging",[]).factory("uibPaging",["$parse",function(a){return{create:function(b,c,d){b.setNumPages=d.numPages?a(d.numPages).assign:angular.noop,b.ngModelCtrl={$setViewValue:angular.noop},b._watchers=[],b.init=function(a,e){b.ngModelCtrl=a,b.config=e,a.$render=function(){b.render()},d.itemsPerPage?b._watchers.push(c.$parent.$watch(d.itemsPerPage,function(a){b.itemsPerPage=parseInt(a,10),c.totalPages=b.calculateTotalPages(),b.updatePage()})):b.itemsPerPage=e.itemsPerPage,c.$watch("totalItems",function(a,d){(angular.isDefined(a)||a!==d)&&(c.totalPages=b.calculateTotalPages(),b.updatePage())})},b.calculateTotalPages=function(){var a=b.itemsPerPage<1?1:Math.ceil(c.totalItems/b.itemsPerPage);return Math.max(a||0,1)},b.render=function(){c.page=parseInt(b.ngModelCtrl.$viewValue,10)||1},c.selectPage=function(a,d){d&&d.preventDefault();var e=!c.ngDisabled||!d;e&&c.page!==a&&a>0&&a<=c.totalPages&&(d&&d.target&&d.target.blur(),b.ngModelCtrl.$setViewValue(a),b.ngModelCtrl.$render())},c.getText=function(a){return c[a+"Text"]||b.config[a+"Text"]},c.noPrevious=function(){return 1===c.page},c.noNext=function(){return c.page===c.totalPages},b.updatePage=function(){b.setNumPages(c.$parent,c.totalPages),c.page>c.totalPages?c.selectPage(c.totalPages):b.ngModelCtrl.$render()},c.$on("$destroy",function(){for(;b._watchers.length;)b._watchers.shift()()})}}}]),angular.module("ui.bootstrap.pager",["ui.bootstrap.paging","ui.bootstrap.tabindex"]).controller("UibPagerController",["$scope","$attrs","uibPaging","uibPagerConfig",function(a,b,c,d){a.align=angular.isDefined(b.align)?a.$parent.$eval(b.align):d.align,c.create(this,a,b)}]).constant("uibPagerConfig",{itemsPerPage:10,previousText:"« Previous",nextText:"Next »",align:!0}).directive("uibPager",["uibPagerConfig",function(a){return{scope:{totalItems:"=",previousText:"@",nextText:"@",ngDisabled:"="},require:["uibPager","?ngModel"],restrict:"A",controller:"UibPagerController",controllerAs:"pager",templateUrl:function(a,b){return b.templateUrl||"uib/template/pager/pager.html"},link:function(b,c,d,e){c.addClass("pager");var f=e[0],g=e[1];g&&f.init(g,a)}}}]),angular.module("ui.bootstrap.pagination",["ui.bootstrap.paging","ui.bootstrap.tabindex"]).controller("UibPaginationController",["$scope","$attrs","$parse","uibPaging","uibPaginationConfig",function(a,b,c,d,e){function f(a,b,c){return{number:a,text:b,active:c}}function g(a,b){var c=[],d=1,e=b,g=angular.isDefined(i)&&b>i;g&&(j?(d=Math.max(a-Math.floor(i/2),1),e=d+i-1,e>b&&(e=b,d=e-i+1)):(d=(Math.ceil(a/i)-1)*i+1,e=Math.min(d+i-1,b)));for(var h=d;e>=h;h++){var n=f(h,m(h),h===a);c.push(n)}if(g&&i>0&&(!j||k||l)){if(d>1){if(!l||d>3){var o=f(d-1,"...",!1);c.unshift(o);
}if(l){if(3===d){var p=f(2,"2",!1);c.unshift(p)}var q=f(1,"1",!1);c.unshift(q)}}if(b>e){if(!l||b-2>e){var r=f(e+1,"...",!1);c.push(r)}if(l){if(e===b-2){var s=f(b-1,b-1,!1);c.push(s)}var t=f(b,b,!1);c.push(t)}}}return c}var h=this,i=angular.isDefined(b.maxSize)?a.$parent.$eval(b.maxSize):e.maxSize,j=angular.isDefined(b.rotate)?a.$parent.$eval(b.rotate):e.rotate,k=angular.isDefined(b.forceEllipses)?a.$parent.$eval(b.forceEllipses):e.forceEllipses,l=angular.isDefined(b.boundaryLinkNumbers)?a.$parent.$eval(b.boundaryLinkNumbers):e.boundaryLinkNumbers,m=angular.isDefined(b.pageLabel)?function(c){return a.$parent.$eval(b.pageLabel,{$page:c})}:angular.identity;a.boundaryLinks=angular.isDefined(b.boundaryLinks)?a.$parent.$eval(b.boundaryLinks):e.boundaryLinks,a.directionLinks=angular.isDefined(b.directionLinks)?a.$parent.$eval(b.directionLinks):e.directionLinks,d.create(this,a,b),b.maxSize&&h._watchers.push(a.$parent.$watch(c(b.maxSize),function(a){i=parseInt(a,10),h.render()}));var n=this.render;this.render=function(){n(),a.page>0&&a.page<=a.totalPages&&(a.pages=g(a.page,a.totalPages))}}]).constant("uibPaginationConfig",{itemsPerPage:10,boundaryLinks:!1,boundaryLinkNumbers:!1,directionLinks:!0,firstText:"First",previousText:"Previous",nextText:"Next",lastText:"Last",rotate:!0,forceEllipses:!1}).directive("uibPagination",["$parse","uibPaginationConfig",function(a,b){return{scope:{totalItems:"=",firstText:"@",previousText:"@",nextText:"@",lastText:"@",ngDisabled:"="},require:["uibPagination","?ngModel"],restrict:"A",controller:"UibPaginationController",controllerAs:"pagination",templateUrl:function(a,b){return b.templateUrl||"uib/template/pagination/pagination.html"},link:function(a,c,d,e){c.addClass("pagination");var f=e[0],g=e[1];g&&f.init(g,b)}}}]),angular.module("ui.bootstrap.tooltip",["ui.bootstrap.position","ui.bootstrap.stackedMap"]).provider("$uibTooltip",function(){function a(a){var b=/[A-Z]/g,c="-";return a.replace(b,function(a,b){return(b?c:"")+a.toLowerCase()})}var b={placement:"top",placementClassPrefix:"",animation:!0,popupDelay:0,popupCloseDelay:0,useContentExp:!1},c={mouseenter:"mouseleave",click:"click",outsideClick:"outsideClick",focus:"blur",none:""},d={};this.options=function(a){angular.extend(d,a)},this.setTriggers=function(a){angular.extend(c,a)},this.$get=["$window","$compile","$timeout","$document","$uibPosition","$interpolate","$rootScope","$parse","$$stackedMap",function(e,f,g,h,i,j,k,l,m){function n(a){if(27===a.which){var b=o.top();b&&(b.value.close(),b=null)}}var o=m.createNew();return h.on("keyup",n),k.$on("$destroy",function(){h.off("keyup",n)}),function(e,k,m,n){function p(a){var b=(a||n.trigger||m).split(" "),d=b.map(function(a){return c[a]||a});return{show:b,hide:d}}n=angular.extend({},b,d,n);var q=a(e),r=j.startSymbol(),s=j.endSymbol(),t="<div "+q+'-popup uib-title="'+r+"title"+s+'" '+(n.useContentExp?'content-exp="contentExp()" ':'content="'+r+"content"+s+'" ')+'origin-scope="origScope" class="uib-position-measure '+k+'" tooltip-animation-class="fade"uib-tooltip-classes ng-class="{ in: isOpen }" ></div>';return{compile:function(a,b){var c=f(t);return function(a,b,d,f){function j(){N.isOpen?q():m()}function m(){M&&!a.$eval(d[k+"Enable"])||(u(),x(),N.popupDelay?G||(G=g(r,N.popupDelay,!1)):r())}function q(){s(),N.popupCloseDelay?H||(H=g(t,N.popupCloseDelay,!1)):t()}function r(){return s(),u(),N.content?(v(),void N.$evalAsync(function(){N.isOpen=!0,y(!0),S()})):angular.noop}function s(){G&&(g.cancel(G),G=null),I&&(g.cancel(I),I=null)}function t(){N&&N.$evalAsync(function(){N&&(N.isOpen=!1,y(!1),N.animation?F||(F=g(w,150,!1)):w())})}function u(){H&&(g.cancel(H),H=null),F&&(g.cancel(F),F=null)}function v(){D||(E=N.$new(),D=c(E,function(a){K?h.find("body").append(a):b.after(a)}),o.add(N,{close:t}),z())}function w(){s(),u(),A(),D&&(D.remove(),D=null),o.remove(N),E&&(E.$destroy(),E=null)}function x(){N.title=d[k+"Title"],Q?N.content=Q(a):N.content=d[e],N.popupClass=d[k+"Class"],N.placement=angular.isDefined(d[k+"Placement"])?d[k+"Placement"]:n.placement;var b=i.parsePlacement(N.placement);J=b[1]?b[0]+"-"+b[1]:b[0];var c=parseInt(d[k+"PopupDelay"],10),f=parseInt(d[k+"PopupCloseDelay"],10);N.popupDelay=isNaN(c)?n.popupDelay:c,N.popupCloseDelay=isNaN(f)?n.popupCloseDelay:f}function y(b){P&&angular.isFunction(P.assign)&&P.assign(a,b)}function z(){R.length=0,Q?(R.push(a.$watch(Q,function(a){N.content=a,!a&&N.isOpen&&t()})),R.push(E.$watch(function(){O||(O=!0,E.$$postDigest(function(){O=!1,N&&N.isOpen&&S()}))}))):R.push(d.$observe(e,function(a){N.content=a,!a&&N.isOpen?t():S()})),R.push(d.$observe(k+"Title",function(a){N.title=a,N.isOpen&&S()})),R.push(d.$observe(k+"Placement",function(a){N.placement=a?a:n.placement,N.isOpen&&S()}))}function A(){R.length&&(angular.forEach(R,function(a){a()}),R.length=0)}function B(a){N&&N.isOpen&&D&&(b[0].contains(a.target)||D[0].contains(a.target)||q())}function C(){var c=[],e=[],f=a.$eval(d[k+"Trigger"]);T(),angular.isObject(f)?(Object.keys(f).forEach(function(a){c.push(a),e.push(f[a])}),L={show:c,hide:e}):L=p(f),"none"!==L.show&&L.show.forEach(function(a,c){"outsideClick"===a?(b.on("click",j),h.on("click",B)):a===L.hide[c]?b.on(a,j):a&&(b.on(a,m),b.on(L.hide[c],q)),b.on("keypress",function(a){27===a.which&&q()})})}var D,E,F,G,H,I,J,K=angular.isDefined(n.appendToBody)?n.appendToBody:!1,L=p(void 0),M=angular.isDefined(d[k+"Enable"]),N=a.$new(!0),O=!1,P=angular.isDefined(d[k+"IsOpen"])?l(d[k+"IsOpen"]):!1,Q=n.useContentExp?l(d[e]):!1,R=[],S=function(){D&&D.html()&&(I||(I=g(function(){var a=i.positionElements(b,D,N.placement,K),c=angular.isDefined(D.offsetHeight)?D.offsetHeight:D.prop("offsetHeight"),d=K?i.offset(b):i.position(b);D.css({top:a.top+"px",left:a.left+"px"});var e=a.placement.split("-");D.hasClass(e[0])||(D.removeClass(J.split("-")[0]),D.addClass(e[0])),D.hasClass(n.placementClassPrefix+a.placement)||(D.removeClass(n.placementClassPrefix+J),D.addClass(n.placementClassPrefix+a.placement)),g(function(){var a=angular.isDefined(D.offsetHeight)?D.offsetHeight:D.prop("offsetHeight"),b=i.adjustTop(e,d,c,a);b&&D.css(b)},0,!1),D.hasClass("uib-position-measure")?(i.positionArrow(D,a.placement),D.removeClass("uib-position-measure")):J!==a.placement&&i.positionArrow(D,a.placement),J=a.placement,I=null},0,!1)))};N.origScope=a,N.isOpen=!1,N.contentExp=function(){return N.content},d.$observe("disabled",function(a){a&&s(),a&&N.isOpen&&t()}),P&&a.$watch(P,function(a){N&&!a===N.isOpen&&j()});var T=function(){L.show.forEach(function(a){"outsideClick"===a?b.off("click",j):(b.off(a,m),b.off(a,j))}),L.hide.forEach(function(a){"outsideClick"===a?h.off("click",B):b.off(a,q)})};C();var U=a.$eval(d[k+"Animation"]);N.animation=angular.isDefined(U)?!!U:n.animation;var V,W=k+"AppendToBody";V=W in d&&void 0===d[W]?!0:a.$eval(d[W]),K=angular.isDefined(V)?V:K,a.$on("$destroy",function(){T(),w(),N=null})}}}}}]}).directive("uibTooltipTemplateTransclude",["$animate","$sce","$compile","$templateRequest",function(a,b,c,d){return{link:function(e,f,g){var h,i,j,k=e.$eval(g.tooltipTemplateTranscludeScope),l=0,m=function(){i&&(i.remove(),i=null),h&&(h.$destroy(),h=null),j&&(a.leave(j).then(function(){i=null}),i=j,j=null)};e.$watch(b.parseAsResourceUrl(g.uibTooltipTemplateTransclude),function(b){var g=++l;b?(d(b,!0).then(function(d){if(g===l){var e=k.$new(),i=d,n=c(i)(e,function(b){m(),a.enter(b,f)});h=e,j=n,h.$emit("$includeContentLoaded",b)}},function(){g===l&&(m(),e.$emit("$includeContentError",b))}),e.$emit("$includeContentRequested",b)):m()}),e.$on("$destroy",m)}}}]).directive("uibTooltipClasses",["$uibPosition",function(a){return{restrict:"A",link:function(b,c,d){if(b.placement){var e=a.parsePlacement(b.placement);c.addClass(e[0])}b.popupClass&&c.addClass(b.popupClass),b.animation&&c.addClass(d.tooltipAnimationClass)}}}]).directive("uibTooltipPopup",function(){return{restrict:"A",scope:{content:"@"},templateUrl:"uib/template/tooltip/tooltip-popup.html"}}).directive("uibTooltip",["$uibTooltip",function(a){return a("uibTooltip","tooltip","mouseenter")}]).directive("uibTooltipTemplatePopup",function(){return{restrict:"A",scope:{contentExp:"&",originScope:"&"},templateUrl:"uib/template/tooltip/tooltip-template-popup.html"}}).directive("uibTooltipTemplate",["$uibTooltip",function(a){return a("uibTooltipTemplate","tooltip","mouseenter",{useContentExp:!0})}]).directive("uibTooltipHtmlPopup",function(){return{restrict:"A",scope:{contentExp:"&"},templateUrl:"uib/template/tooltip/tooltip-html-popup.html"}}).directive("uibTooltipHtml",["$uibTooltip",function(a){return a("uibTooltipHtml","tooltip","mouseenter",{useContentExp:!0})}]),angular.module("ui.bootstrap.popover",["ui.bootstrap.tooltip"]).directive("uibPopoverTemplatePopup",function(){return{restrict:"A",scope:{uibTitle:"@",contentExp:"&",originScope:"&"},templateUrl:"uib/template/popover/popover-template.html"}}).directive("uibPopoverTemplate",["$uibTooltip",function(a){return a("uibPopoverTemplate","popover","click",{useContentExp:!0})}]).directive("uibPopoverHtmlPopup",function(){return{restrict:"A",scope:{contentExp:"&",uibTitle:"@"},templateUrl:"uib/template/popover/popover-html.html"}}).directive("uibPopoverHtml",["$uibTooltip",function(a){return a("uibPopoverHtml","popover","click",{useContentExp:!0})}]).directive("uibPopoverPopup",function(){return{restrict:"A",scope:{uibTitle:"@",content:"@"},templateUrl:"uib/template/popover/popover.html"}}).directive("uibPopover",["$uibTooltip",function(a){return a("uibPopover","popover","click")}]),angular.module("ui.bootstrap.progressbar",[]).constant("uibProgressConfig",{animate:!0,max:100}).controller("UibProgressController",["$scope","$attrs","uibProgressConfig",function(a,b,c){function d(){return angular.isDefined(a.maxParam)?a.maxParam:c.max}var e=this,f=angular.isDefined(b.animate)?a.$parent.$eval(b.animate):c.animate;this.bars=[],a.max=d(),this.addBar=function(a,b,c){f||b.css({transition:"none"}),this.bars.push(a),a.max=d(),a.title=c&&angular.isDefined(c.title)?c.title:"progressbar",a.$watch("value",function(b){a.recalculatePercentage()}),a.recalculatePercentage=function(){var b=e.bars.reduce(function(a,b){return b.percent=+(100*b.value/b.max).toFixed(2),a+b.percent},0);b>100&&(a.percent-=b-100)},a.$on("$destroy",function(){b=null,e.removeBar(a)})},this.removeBar=function(a){this.bars.splice(this.bars.indexOf(a),1),this.bars.forEach(function(a){a.recalculatePercentage()})},a.$watch("maxParam",function(a){e.bars.forEach(function(a){a.max=d(),a.recalculatePercentage()})})}]).directive("uibProgress",function(){return{replace:!0,transclude:!0,controller:"UibProgressController",require:"uibProgress",scope:{maxParam:"=?max"},templateUrl:"uib/template/progressbar/progress.html"}}).directive("uibBar",function(){return{replace:!0,transclude:!0,require:"^uibProgress",scope:{value:"=",type:"@"},templateUrl:"uib/template/progressbar/bar.html",link:function(a,b,c,d){d.addBar(a,b,c)}}}).directive("uibProgressbar",function(){return{replace:!0,transclude:!0,controller:"UibProgressController",scope:{value:"=",maxParam:"=?max",type:"@"},templateUrl:"uib/template/progressbar/progressbar.html",link:function(a,b,c,d){d.addBar(a,angular.element(b.children()[0]),{title:c.title})}}}),angular.module("ui.bootstrap.rating",[]).constant("uibRatingConfig",{max:5,stateOn:null,stateOff:null,enableReset:!0,titles:["one","two","three","four","five"]}).controller("UibRatingController",["$scope","$attrs","uibRatingConfig",function(a,b,c){var d={$setViewValue:angular.noop},e=this;this.init=function(e){d=e,d.$render=this.render,d.$formatters.push(function(a){return angular.isNumber(a)&&a<<0!==a&&(a=Math.round(a)),a}),this.stateOn=angular.isDefined(b.stateOn)?a.$parent.$eval(b.stateOn):c.stateOn,this.stateOff=angular.isDefined(b.stateOff)?a.$parent.$eval(b.stateOff):c.stateOff,this.enableReset=angular.isDefined(b.enableReset)?a.$parent.$eval(b.enableReset):c.enableReset;var f=angular.isDefined(b.titles)?a.$parent.$eval(b.titles):c.titles;this.titles=angular.isArray(f)&&f.length>0?f:c.titles;var g=angular.isDefined(b.ratingStates)?a.$parent.$eval(b.ratingStates):new Array(angular.isDefined(b.max)?a.$parent.$eval(b.max):c.max);a.range=this.buildTemplateObjects(g)},this.buildTemplateObjects=function(a){for(var b=0,c=a.length;c>b;b++)a[b]=angular.extend({index:b},{stateOn:this.stateOn,stateOff:this.stateOff,title:this.getTitle(b)},a[b]);return a},this.getTitle=function(a){return a>=this.titles.length?a+1:this.titles[a]},a.rate=function(b){if(!a.readonly&&b>=0&&b<=a.range.length){var c=e.enableReset&&d.$viewValue===b?0:b;d.$setViewValue(c),d.$render()}},a.enter=function(b){a.readonly||(a.value=b),a.onHover({value:b})},a.reset=function(){a.value=d.$viewValue,a.onLeave()},a.onKeydown=function(b){/(37|38|39|40)/.test(b.which)&&(b.preventDefault(),b.stopPropagation(),a.rate(a.value+(38===b.which||39===b.which?1:-1)))},this.render=function(){a.value=d.$viewValue,a.title=e.getTitle(a.value-1)}}]).directive("uibRating",function(){return{require:["uibRating","ngModel"],restrict:"A",scope:{readonly:"=?readOnly",onHover:"&",onLeave:"&"},controller:"UibRatingController",templateUrl:"uib/template/rating/rating.html",link:function(a,b,c,d){var e=d[0],f=d[1];e.init(f)}}}),angular.module("ui.bootstrap.tabs",[]).controller("UibTabsetController",["$scope",function(a){function b(a){for(var b=0;b<d.tabs.length;b++)if(d.tabs[b].index===a)return b}var c,d=this;d.tabs=[],d.select=function(a,f){if(!e){var g=b(c),h=d.tabs[g];if(h){if(h.tab.onDeselect({$event:f,$selectedIndex:a}),f&&f.isDefaultPrevented())return;h.tab.active=!1}var i=d.tabs[a];i?(i.tab.onSelect({$event:f}),i.tab.active=!0,d.active=i.index,c=i.index):!i&&angular.isDefined(c)&&(d.active=null,c=null)}},d.addTab=function(a){if(d.tabs.push({tab:a,index:a.index}),d.tabs.sort(function(a,b){return a.index>b.index?1:a.index<b.index?-1:0}),a.index===d.active||!angular.isDefined(d.active)&&1===d.tabs.length){var c=b(a.index);d.select(c)}},d.removeTab=function(a){for(var b,c=0;c<d.tabs.length;c++)if(d.tabs[c].tab===a){b=c;break}if(d.tabs[b].index===d.active){var e=b===d.tabs.length-1?b-1:b+1%d.tabs.length;d.select(e)}d.tabs.splice(b,1)},a.$watch("tabset.active",function(a){angular.isDefined(a)&&a!==c&&d.select(b(a))});var e;a.$on("$destroy",function(){e=!0})}]).directive("uibTabset",function(){return{transclude:!0,replace:!0,scope:{},bindToController:{active:"=?",type:"@"},controller:"UibTabsetController",controllerAs:"tabset",templateUrl:function(a,b){return b.templateUrl||"uib/template/tabs/tabset.html"},link:function(a,b,c){a.vertical=angular.isDefined(c.vertical)?a.$parent.$eval(c.vertical):!1,a.justified=angular.isDefined(c.justified)?a.$parent.$eval(c.justified):!1}}}).directive("uibTab",["$parse",function(a){return{require:"^uibTabset",replace:!0,templateUrl:function(a,b){return b.templateUrl||"uib/template/tabs/tab.html"},transclude:!0,scope:{heading:"@",index:"=?",classes:"@?",onSelect:"&select",onDeselect:"&deselect"},controller:function(){},controllerAs:"tab",link:function(b,c,d,e,f){b.disabled=!1,d.disable&&b.$parent.$watch(a(d.disable),function(a){b.disabled=!!a}),angular.isUndefined(d.index)&&(e.tabs&&e.tabs.length?b.index=Math.max.apply(null,e.tabs.map(function(a){return a.index}))+1:b.index=0),angular.isUndefined(d.classes)&&(b.classes=""),b.select=function(a){if(!b.disabled){for(var c,d=0;d<e.tabs.length;d++)if(e.tabs[d].tab===b){c=d;break}e.select(c,a)}},e.addTab(b),b.$on("$destroy",function(){e.removeTab(b)}),b.$transcludeFn=f}}}]).directive("uibTabHeadingTransclude",function(){return{restrict:"A",require:"^uibTab",link:function(a,b){a.$watch("headingElement",function(a){a&&(b.html(""),b.append(a))})}}}).directive("uibTabContentTransclude",function(){function a(a){return a.tagName&&(a.hasAttribute("uib-tab-heading")||a.hasAttribute("data-uib-tab-heading")||a.hasAttribute("x-uib-tab-heading")||"uib-tab-heading"===a.tagName.toLowerCase()||"data-uib-tab-heading"===a.tagName.toLowerCase()||"x-uib-tab-heading"===a.tagName.toLowerCase()||"uib:tab-heading"===a.tagName.toLowerCase())}return{restrict:"A",require:"^uibTabset",link:function(b,c,d){var e=b.$eval(d.uibTabContentTransclude).tab;e.$transcludeFn(e.$parent,function(b){angular.forEach(b,function(b){a(b)?e.headingElement=b:c.append(b)})})}}}),angular.module("ui.bootstrap.timepicker",[]).constant("uibTimepickerConfig",{hourStep:1,minuteStep:1,secondStep:1,showMeridian:!0,showSeconds:!1,meridians:null,readonlyInput:!1,mousewheel:!0,arrowkeys:!0,showSpinners:!0,templateUrl:"uib/template/timepicker/timepicker.html"}).controller("UibTimepickerController",["$scope","$element","$attrs","$parse","$log","$locale","uibTimepickerConfig",function(a,b,c,d,e,f,g){function h(){var b=+a.hours,c=a.showMeridian?b>0&&13>b:b>=0&&24>b;return c&&""!==a.hours?(a.showMeridian&&(12===b&&(b=0),a.meridian===v[1]&&(b+=12)),b):void 0}function i(){var b=+a.minutes,c=b>=0&&60>b;return c&&""!==a.minutes?b:void 0}function j(){var b=+a.seconds;return b>=0&&60>b?b:void 0}function k(a,b){return null===a?"":angular.isDefined(a)&&a.toString().length<2&&!b?"0"+a:a.toString()}function l(a){m(),u.$setViewValue(new Date(s)),n(a)}function m(){u.$setValidity("time",!0),a.invalidHours=!1,a.invalidMinutes=!1,a.invalidSeconds=!1}function n(b){if(u.$modelValue){var c=s.getHours(),d=s.getMinutes(),e=s.getSeconds();a.showMeridian&&(c=0===c||12===c?12:c%12),a.hours="h"===b?c:k(c,!w),"m"!==b&&(a.minutes=k(d)),a.meridian=s.getHours()<12?v[0]:v[1],"s"!==b&&(a.seconds=k(e)),a.meridian=s.getHours()<12?v[0]:v[1]}else a.hours=null,a.minutes=null,a.seconds=null,a.meridian=v[0]}function o(a){s=q(s,a),l()}function p(a,b){return q(a,60*b)}function q(a,b){var c=new Date(a.getTime()+1e3*b),d=new Date(a);return d.setHours(c.getHours(),c.getMinutes(),c.getSeconds()),d}function r(){return(null===a.hours||""===a.hours)&&(null===a.minutes||""===a.minutes)&&(!a.showSeconds||a.showSeconds&&(null===a.seconds||""===a.seconds))}var s=new Date,t=[],u={$setViewValue:angular.noop},v=angular.isDefined(c.meridians)?a.$parent.$eval(c.meridians):g.meridians||f.DATETIME_FORMATS.AMPMS,w=angular.isDefined(c.padHours)?a.$parent.$eval(c.padHours):!0;a.tabindex=angular.isDefined(c.tabindex)?c.tabindex:0,b.removeAttr("tabindex"),this.init=function(b,d){u=b,u.$render=this.render,u.$formatters.unshift(function(a){return a?new Date(a):null});var e=d.eq(0),f=d.eq(1),h=d.eq(2),i=angular.isDefined(c.mousewheel)?a.$parent.$eval(c.mousewheel):g.mousewheel;i&&this.setupMousewheelEvents(e,f,h);var j=angular.isDefined(c.arrowkeys)?a.$parent.$eval(c.arrowkeys):g.arrowkeys;j&&this.setupArrowkeyEvents(e,f,h),a.readonlyInput=angular.isDefined(c.readonlyInput)?a.$parent.$eval(c.readonlyInput):g.readonlyInput,this.setupInputEvents(e,f,h)};var x=g.hourStep;c.hourStep&&t.push(a.$parent.$watch(d(c.hourStep),function(a){x=+a}));var y=g.minuteStep;c.minuteStep&&t.push(a.$parent.$watch(d(c.minuteStep),function(a){y=+a}));var z;t.push(a.$parent.$watch(d(c.min),function(a){var b=new Date(a);z=isNaN(b)?void 0:b}));var A;t.push(a.$parent.$watch(d(c.max),function(a){var b=new Date(a);A=isNaN(b)?void 0:b}));var B=!1;c.ngDisabled&&t.push(a.$parent.$watch(d(c.ngDisabled),function(a){B=a})),a.noIncrementHours=function(){var a=p(s,60*x);return B||a>A||s>a&&z>a},a.noDecrementHours=function(){var a=p(s,60*-x);return B||z>a||a>s&&a>A},a.noIncrementMinutes=function(){var a=p(s,y);return B||a>A||s>a&&z>a},a.noDecrementMinutes=function(){var a=p(s,-y);return B||z>a||a>s&&a>A},a.noIncrementSeconds=function(){var a=q(s,C);return B||a>A||s>a&&z>a},a.noDecrementSeconds=function(){var a=q(s,-C);return B||z>a||a>s&&a>A},a.noToggleMeridian=function(){return s.getHours()<12?B||p(s,720)>A:B||p(s,-720)<z};var C=g.secondStep;c.secondStep&&t.push(a.$parent.$watch(d(c.secondStep),function(a){C=+a})),a.showSeconds=g.showSeconds,c.showSeconds&&t.push(a.$parent.$watch(d(c.showSeconds),function(b){a.showSeconds=!!b})),a.showMeridian=g.showMeridian,c.showMeridian&&t.push(a.$parent.$watch(d(c.showMeridian),function(b){if(a.showMeridian=!!b,u.$error.time){var c=h(),d=i();angular.isDefined(c)&&angular.isDefined(d)&&(s.setHours(c),l())}else n()})),this.setupMousewheelEvents=function(b,c,d){var e=function(a){a.originalEvent&&(a=a.originalEvent);var b=a.wheelDelta?a.wheelDelta:-a.deltaY;return a.detail||b>0};b.bind("mousewheel wheel",function(b){B||a.$apply(e(b)?a.incrementHours():a.decrementHours()),b.preventDefault()}),c.bind("mousewheel wheel",function(b){B||a.$apply(e(b)?a.incrementMinutes():a.decrementMinutes()),b.preventDefault()}),d.bind("mousewheel wheel",function(b){B||a.$apply(e(b)?a.incrementSeconds():a.decrementSeconds()),b.preventDefault()})},this.setupArrowkeyEvents=function(b,c,d){b.bind("keydown",function(b){B||(38===b.which?(b.preventDefault(),a.incrementHours(),a.$apply()):40===b.which&&(b.preventDefault(),a.decrementHours(),a.$apply()))}),c.bind("keydown",function(b){B||(38===b.which?(b.preventDefault(),a.incrementMinutes(),a.$apply()):40===b.which&&(b.preventDefault(),a.decrementMinutes(),a.$apply()))}),d.bind("keydown",function(b){B||(38===b.which?(b.preventDefault(),a.incrementSeconds(),a.$apply()):40===b.which&&(b.preventDefault(),a.decrementSeconds(),a.$apply()))})},this.setupInputEvents=function(b,c,d){if(a.readonlyInput)return a.updateHours=angular.noop,a.updateMinutes=angular.noop,void(a.updateSeconds=angular.noop);var e=function(b,c,d){u.$setViewValue(null),u.$setValidity("time",!1),angular.isDefined(b)&&(a.invalidHours=b),angular.isDefined(c)&&(a.invalidMinutes=c),angular.isDefined(d)&&(a.invalidSeconds=d)};a.updateHours=function(){var a=h(),b=i();u.$setDirty(),angular.isDefined(a)&&angular.isDefined(b)?(s.setHours(a),s.setMinutes(b),z>s||s>A?e(!0):l("h")):e(!0)},b.bind("blur",function(b){u.$setTouched(),r()?m():null===a.hours||""===a.hours?e(!0):!a.invalidHours&&a.hours<10&&a.$apply(function(){a.hours=k(a.hours,!w)})}),a.updateMinutes=function(){var a=i(),b=h();u.$setDirty(),angular.isDefined(a)&&angular.isDefined(b)?(s.setHours(b),s.setMinutes(a),z>s||s>A?e(void 0,!0):l("m")):e(void 0,!0)},c.bind("blur",function(b){u.$setTouched(),r()?m():null===a.minutes?e(void 0,!0):!a.invalidMinutes&&a.minutes<10&&a.$apply(function(){a.minutes=k(a.minutes)})}),a.updateSeconds=function(){var a=j();u.$setDirty(),angular.isDefined(a)?(s.setSeconds(a),l("s")):e(void 0,void 0,!0)},d.bind("blur",function(b){r()?m():!a.invalidSeconds&&a.seconds<10&&a.$apply(function(){a.seconds=k(a.seconds)})})},this.render=function(){var b=u.$viewValue;isNaN(b)?(u.$setValidity("time",!1),e.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')):(b&&(s=b),z>s||s>A?(u.$setValidity("time",!1),a.invalidHours=!0,a.invalidMinutes=!0):m(),n())},a.showSpinners=angular.isDefined(c.showSpinners)?a.$parent.$eval(c.showSpinners):g.showSpinners,a.incrementHours=function(){a.noIncrementHours()||o(60*x*60)},a.decrementHours=function(){a.noDecrementHours()||o(60*-x*60)},a.incrementMinutes=function(){a.noIncrementMinutes()||o(60*y)},a.decrementMinutes=function(){a.noDecrementMinutes()||o(60*-y)},a.incrementSeconds=function(){a.noIncrementSeconds()||o(C)},a.decrementSeconds=function(){a.noDecrementSeconds()||o(-C)},a.toggleMeridian=function(){var b=i(),c=h();a.noToggleMeridian()||(angular.isDefined(b)&&angular.isDefined(c)?o(720*(s.getHours()<12?60:-60)):a.meridian=a.meridian===v[0]?v[1]:v[0])},a.blur=function(){u.$setTouched()},a.$on("$destroy",function(){for(;t.length;)t.shift()()})}]).directive("uibTimepicker",["uibTimepickerConfig",function(a){return{require:["uibTimepicker","?^ngModel"],restrict:"A",controller:"UibTimepickerController",controllerAs:"timepicker",scope:{},templateUrl:function(b,c){return c.templateUrl||a.templateUrl},link:function(a,b,c,d){var e=d[0],f=d[1];f&&e.init(f,b.find("input"))}}}]),angular.module("ui.bootstrap.typeahead",["ui.bootstrap.debounce","ui.bootstrap.position"]).factory("uibTypeaheadParser",["$parse",function(a){var b=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;return{parse:function(c){var d=c.match(b);if(!d)throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "'+c+'".');return{itemName:d[3],source:a(d[4]),viewMapper:a(d[2]||d[1]),modelMapper:a(d[1])}}}}]).controller("UibTypeaheadController",["$scope","$element","$attrs","$compile","$parse","$q","$timeout","$document","$window","$rootScope","$$debounce","$uibPosition","uibTypeaheadParser",function(a,b,c,d,e,f,g,h,i,j,k,l,m){function n(){O.moveInProgress||(O.moveInProgress=!0,O.$digest()),Z()}function o(){O.position=E?l.offset(b):l.position(b),O.position.top+=b.prop("offsetHeight")}var p,q,r=[9,13,27,38,40],s=200,t=a.$eval(c.typeaheadMinLength);t||0===t||(t=1),a.$watch(c.typeaheadMinLength,function(a){t=a||0===a?a:1});var u=a.$eval(c.typeaheadWaitMs)||0,v=a.$eval(c.typeaheadEditable)!==!1;a.$watch(c.typeaheadEditable,function(a){v=a!==!1});var w,x,y=e(c.typeaheadLoading).assign||angular.noop,z=c.typeaheadShouldSelect?e(c.typeaheadShouldSelect):function(a,b){var c=b.$event;return 13===c.which||9===c.which},A=e(c.typeaheadOnSelect),B=angular.isDefined(c.typeaheadSelectOnBlur)?a.$eval(c.typeaheadSelectOnBlur):!1,C=e(c.typeaheadNoResults).assign||angular.noop,D=c.typeaheadInputFormatter?e(c.typeaheadInputFormatter):void 0,E=c.typeaheadAppendToBody?a.$eval(c.typeaheadAppendToBody):!1,F=c.typeaheadAppendTo?a.$eval(c.typeaheadAppendTo):null,G=a.$eval(c.typeaheadFocusFirst)!==!1,H=c.typeaheadSelectOnExact?a.$eval(c.typeaheadSelectOnExact):!1,I=e(c.typeaheadIsOpen).assign||angular.noop,J=a.$eval(c.typeaheadShowHint)||!1,K=e(c.ngModel),L=e(c.ngModel+"($$$p)"),M=function(b,c){return angular.isFunction(K(a))&&q&&q.$options&&q.$options.getterSetter?L(b,{$$$p:c}):K.assign(b,c)},N=m.parse(c.uibTypeahead),O=a.$new(),P=a.$on("$destroy",function(){O.$destroy()});O.$on("$destroy",P);var Q="typeahead-"+O.$id+"-"+Math.floor(1e4*Math.random());b.attr({"aria-autocomplete":"list","aria-expanded":!1,"aria-owns":Q});var R,S;J&&(R=angular.element("<div></div>"),R.css("position","relative"),b.after(R),S=b.clone(),S.attr("placeholder",""),S.attr("tabindex","-1"),S.val(""),S.css({position:"absolute",top:"0px",left:"0px","border-color":"transparent","box-shadow":"none",opacity:1,background:"none 0% 0% / auto repeat scroll padding-box border-box rgb(255, 255, 255)",color:"#999"}),b.css({position:"relative","vertical-align":"top","background-color":"transparent"}),S.attr("id")&&S.removeAttr("id"),R.append(S),S.after(b));var T=angular.element("<div uib-typeahead-popup></div>");T.attr({id:Q,matches:"matches",active:"activeIdx",select:"select(activeIdx, evt)","move-in-progress":"moveInProgress",query:"query",position:"position","assign-is-open":"assignIsOpen(isOpen)",debounce:"debounceUpdate"}),angular.isDefined(c.typeaheadTemplateUrl)&&T.attr("template-url",c.typeaheadTemplateUrl),angular.isDefined(c.typeaheadPopupTemplateUrl)&&T.attr("popup-template-url",c.typeaheadPopupTemplateUrl);var U=function(){J&&S.val("")},V=function(){O.matches=[],O.activeIdx=-1,b.attr("aria-expanded",!1),U()},W=function(a){return Q+"-option-"+a};O.$watch("activeIdx",function(a){0>a?b.removeAttr("aria-activedescendant"):b.attr("aria-activedescendant",W(a))});var X=function(a,b){return O.matches.length>b&&a?a.toUpperCase()===O.matches[b].label.toUpperCase():!1},Y=function(c,d){var e={$viewValue:c};y(a,!0),C(a,!1),f.when(N.source(a,e)).then(function(f){var g=c===p.$viewValue;if(g&&w)if(f&&f.length>0){O.activeIdx=G?0:-1,C(a,!1),O.matches.length=0;for(var h=0;h<f.length;h++)e[N.itemName]=f[h],O.matches.push({id:W(h),label:N.viewMapper(O,e),model:f[h]});if(O.query=c,o(),b.attr("aria-expanded",!0),H&&1===O.matches.length&&X(c,0)&&(angular.isNumber(O.debounceUpdate)||angular.isObject(O.debounceUpdate)?k(function(){O.select(0,d)},angular.isNumber(O.debounceUpdate)?O.debounceUpdate:O.debounceUpdate["default"]):O.select(0,d)),J){var i=O.matches[0].label;angular.isString(c)&&c.length>0&&i.slice(0,c.length).toUpperCase()===c.toUpperCase()?S.val(c+i.slice(c.length)):S.val("")}}else V(),C(a,!0);g&&y(a,!1)},function(){V(),y(a,!1),C(a,!0)})};E&&(angular.element(i).on("resize",n),h.find("body").on("scroll",n));var Z=k(function(){O.matches.length&&o(),O.moveInProgress=!1},s);O.moveInProgress=!1,O.query=void 0;var $,_=function(a){$=g(function(){Y(a)},u)},aa=function(){$&&g.cancel($)};V(),O.assignIsOpen=function(b){I(a,b)},O.select=function(d,e){var f,h,i={};x=!0,i[N.itemName]=h=O.matches[d].model,f=N.modelMapper(a,i),M(a,f),p.$setValidity("editable",!0),p.$setValidity("parse",!0),A(a,{$item:h,$model:f,$label:N.viewMapper(a,i),$event:e}),V(),O.$eval(c.typeaheadFocusOnSelect)!==!1&&g(function(){b[0].focus()},0,!1)},b.on("keydown",function(b){if(0!==O.matches.length&&-1!==r.indexOf(b.which)){var c=z(a,{$event:b});if(-1===O.activeIdx&&c||9===b.which&&b.shiftKey)return V(),void O.$digest();b.preventDefault();var d;switch(b.which){case 27:b.stopPropagation(),V(),a.$digest();break;case 38:O.activeIdx=(O.activeIdx>0?O.activeIdx:O.matches.length)-1,O.$digest(),d=T[0].querySelectorAll(".uib-typeahead-match")[O.activeIdx],d.parentNode.scrollTop=d.offsetTop;break;case 40:O.activeIdx=(O.activeIdx+1)%O.matches.length,O.$digest(),d=T[0].querySelectorAll(".uib-typeahead-match")[O.activeIdx],d.parentNode.scrollTop=d.offsetTop;break;default:c&&O.$apply(function(){angular.isNumber(O.debounceUpdate)||angular.isObject(O.debounceUpdate)?k(function(){O.select(O.activeIdx,b)},angular.isNumber(O.debounceUpdate)?O.debounceUpdate:O.debounceUpdate["default"]):O.select(O.activeIdx,b)})}}}),b.bind("focus",function(a){w=!0,0!==t||p.$viewValue||g(function(){Y(p.$viewValue,a)},0)}),b.bind("blur",function(a){B&&O.matches.length&&-1!==O.activeIdx&&!x&&(x=!0,O.$apply(function(){angular.isObject(O.debounceUpdate)&&angular.isNumber(O.debounceUpdate.blur)?k(function(){O.select(O.activeIdx,a)},O.debounceUpdate.blur):O.select(O.activeIdx,a)})),!v&&p.$error.editable&&(p.$setViewValue(),O.$apply(function(){p.$setValidity("editable",!0),p.$setValidity("parse",!0)}),b.val("")),w=!1,x=!1});var ba=function(c){b[0]!==c.target&&3!==c.which&&0!==O.matches.length&&(V(),j.$$phase||a.$digest())};h.on("click",ba),a.$on("$destroy",function(){h.off("click",ba),(E||F)&&ca.remove(),E&&(angular.element(i).off("resize",n),h.find("body").off("scroll",n)),T.remove(),J&&R.remove()});var ca=d(T)(O);E?h.find("body").append(ca):F?angular.element(F).eq(0).append(ca):b.after(ca),this.init=function(b,c){p=b,q=c,O.debounceUpdate=p.$options&&e(p.$options.debounce)(a),p.$parsers.unshift(function(b){return w=!0,0===t||b&&b.length>=t?u>0?(aa(),_(b)):Y(b):(y(a,!1),aa(),V()),v?b:b?void p.$setValidity("editable",!1):(p.$setValidity("editable",!0),null)}),p.$formatters.push(function(b){var c,d,e={};return v||p.$setValidity("editable",!0),D?(e.$model=b,D(a,e)):(e[N.itemName]=b,c=N.viewMapper(a,e),e[N.itemName]=void 0,d=N.viewMapper(a,e),c!==d?c:b)})}}]).directive("uibTypeahead",function(){return{controller:"UibTypeaheadController",require:["ngModel","^?ngModelOptions","uibTypeahead"],link:function(a,b,c,d){d[2].init(d[0],d[1])}}}).directive("uibTypeaheadPopup",["$$debounce",function(a){return{scope:{matches:"=",query:"=",active:"=",position:"&",moveInProgress:"=",select:"&",assignIsOpen:"&",debounce:"&"},replace:!0,templateUrl:function(a,b){return b.popupTemplateUrl||"uib/template/typeahead/typeahead-popup.html"},link:function(b,c,d){b.templateUrl=d.templateUrl,b.isOpen=function(){var a=b.matches.length>0;return b.assignIsOpen({isOpen:a}),a},b.isActive=function(a){return b.active===a},b.selectActive=function(a){b.active=a},b.selectMatch=function(c,d){var e=b.debounce();angular.isNumber(e)||angular.isObject(e)?a(function(){b.select({activeIdx:c,evt:d})},angular.isNumber(e)?e:e["default"]):b.select({activeIdx:c,evt:d})}}}}]).directive("uibTypeaheadMatch",["$templateRequest","$compile","$parse",function(a,b,c){return{scope:{index:"=",match:"=",query:"="},link:function(d,e,f){var g=c(f.templateUrl)(d.$parent)||"uib/template/typeahead/typeahead-match.html";
a(g).then(function(a){var c=angular.element(a.trim());e.replaceWith(c),b(c)(d)})}}}]).filter("uibTypeaheadHighlight",["$sce","$injector","$log",function(a,b,c){function d(a){return a.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")}function e(a){return/<.*>/g.test(a)}var f;return f=b.has("$sanitize"),function(b,g){return!f&&e(b)&&c.warn("Unsafe use of typeahead please use ngSanitize"),b=g?(""+b).replace(new RegExp(d(g),"gi"),"<strong>$&</strong>"):b,f||(b=a.trustAsHtml(b)),b}}]),angular.module("uib/template/accordion/accordion-group.html",[]).run(["$templateCache",function(a){a.put("uib/template/accordion/accordion-group.html",'<div role="tab" id="{{::headingId}}" aria-selected="{{isOpen}}" class="panel-heading" ng-keypress="toggleOpen($event)">\n  <h4 class="panel-title">\n    <a role="button" data-toggle="collapse" href aria-expanded="{{isOpen}}" aria-controls="{{::panelId}}" tabindex="0" class="accordion-toggle" ng-click="toggleOpen()" uib-accordion-transclude="heading" ng-disabled="isDisabled" uib-tabindex-toggle><span uib-accordion-header ng-class="{\'text-muted\': isDisabled}">{{heading}}</span></a>\n  </h4>\n</div>\n<div id="{{::panelId}}" aria-labelledby="{{::headingId}}" aria-hidden="{{!isOpen}}" role="tabpanel" class="panel-collapse collapse" uib-collapse="!isOpen">\n  <div class="panel-body" ng-transclude></div>\n</div>\n')}]),angular.module("uib/template/accordion/accordion.html",[]).run(["$templateCache",function(a){a.put("uib/template/accordion/accordion.html",'<div role="tablist" class="panel-group" ng-transclude></div>')}]),angular.module("uib/template/alert/alert.html",[]).run(["$templateCache",function(a){a.put("uib/template/alert/alert.html",'<button ng-show="closeable" type="button" class="close" ng-click="close({$event: $event})">\n  <span aria-hidden="true">&times;</span>\n  <span class="sr-only">Close</span>\n</button>\n<div ng-transclude></div>\n')}]),angular.module("uib/template/carousel/carousel.html",[]).run(["$templateCache",function(a){a.put("uib/template/carousel/carousel.html",'<div class="carousel-inner" ng-transclude></div>\n<a role="button" href class="left carousel-control" ng-click="prev()" ng-class="{ disabled: isPrevDisabled() }" ng-show="slides.length > 1">\n  <span aria-hidden="true" class="glyphicon glyphicon-chevron-left"></span>\n  <span class="sr-only">previous</span>\n</a>\n<a role="button" href class="right carousel-control" ng-click="next()" ng-class="{ disabled: isNextDisabled() }" ng-show="slides.length > 1">\n  <span aria-hidden="true" class="glyphicon glyphicon-chevron-right"></span>\n  <span class="sr-only">next</span>\n</a>\n<ol class="carousel-indicators" ng-show="slides.length > 1">\n  <li ng-repeat="slide in slides | orderBy:indexOfSlide track by $index" ng-class="{ active: isActive(slide) }" ng-click="select(slide)">\n    <span class="sr-only">slide {{ $index + 1 }} of {{ slides.length }}<span ng-if="isActive(slide)">, currently active</span></span>\n  </li>\n</ol>\n')}]),angular.module("uib/template/carousel/slide.html",[]).run(["$templateCache",function(a){a.put("uib/template/carousel/slide.html",'<div class="text-center" ng-transclude></div>\n')}]),angular.module("uib/template/datepicker/datepicker.html",[]).run(["$templateCache",function(a){a.put("uib/template/datepicker/datepicker.html",'<div ng-switch="datepickerMode">\n  <div uib-daypicker ng-switch-when="day" tabindex="0" class="uib-daypicker"></div>\n  <div uib-monthpicker ng-switch-when="month" tabindex="0" class="uib-monthpicker"></div>\n  <div uib-yearpicker ng-switch-when="year" tabindex="0" class="uib-yearpicker"></div>\n</div>\n')}]),angular.module("uib/template/datepicker/day.html",[]).run(["$templateCache",function(a){a.put("uib/template/datepicker/day.html",'<table role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left uib-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="{{::5 + showWeeks}}"><button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm uib-title" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right uib-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n    <tr>\n      <th ng-if="showWeeks" class="text-center"></th>\n      <th ng-repeat="label in ::labels track by $index" class="text-center"><small aria-label="{{::label.full}}">{{::label.abbr}}</small></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr class="uib-weeks" ng-repeat="row in rows track by $index" role="row">\n      <td ng-if="showWeeks" class="text-center h6"><em>{{ weekNumbers[$index] }}</em></td>\n      <td ng-repeat="dt in row" class="uib-day text-center" role="gridcell"\n        id="{{::dt.uid}}"\n        ng-class="::dt.customClass">\n        <button type="button" class="btn btn-default btn-sm"\n          uib-is-class="\n            \'btn-info\' for selectedDt,\n            \'active\' for activeDt\n            on dt"\n          ng-click="select(dt.date)"\n          ng-disabled="::dt.disabled"\n          tabindex="-1"><span ng-class="::{\'text-muted\': dt.secondary, \'text-info\': dt.current}">{{::dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')}]),angular.module("uib/template/datepicker/month.html",[]).run(["$templateCache",function(a){a.put("uib/template/datepicker/month.html",'<table role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left uib-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="{{::yearHeaderColspan}}"><button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm uib-title" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right uib-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr class="uib-months" ng-repeat="row in rows track by $index" role="row">\n      <td ng-repeat="dt in row" class="uib-month text-center" role="gridcell"\n        id="{{::dt.uid}}"\n        ng-class="::dt.customClass">\n        <button type="button" class="btn btn-default"\n          uib-is-class="\n            \'btn-info\' for selectedDt,\n            \'active\' for activeDt\n            on dt"\n          ng-click="select(dt.date)"\n          ng-disabled="::dt.disabled"\n          tabindex="-1"><span ng-class="::{\'text-info\': dt.current}">{{::dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')}]),angular.module("uib/template/datepicker/year.html",[]).run(["$templateCache",function(a){a.put("uib/template/datepicker/year.html",'<table role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left uib-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="{{::columns - 2}}"><button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm uib-title" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right uib-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr class="uib-years" ng-repeat="row in rows track by $index" role="row">\n      <td ng-repeat="dt in row" class="uib-year text-center" role="gridcell"\n        id="{{::dt.uid}}"\n        ng-class="::dt.customClass">\n        <button type="button" class="btn btn-default"\n          uib-is-class="\n            \'btn-info\' for selectedDt,\n            \'active\' for activeDt\n            on dt"\n          ng-click="select(dt.date)"\n          ng-disabled="::dt.disabled"\n          tabindex="-1"><span ng-class="::{\'text-info\': dt.current}">{{::dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')}]),angular.module("uib/template/datepickerPopup/popup.html",[]).run(["$templateCache",function(a){a.put("uib/template/datepickerPopup/popup.html",'<ul class="uib-datepicker-popup dropdown-menu uib-position-measure" dropdown-nested ng-if="isOpen" ng-keydown="keydown($event)" ng-click="$event.stopPropagation()">\n  <li ng-transclude></li>\n  <li ng-if="showButtonBar" class="uib-button-bar">\n    <span class="btn-group pull-left">\n      <button type="button" class="btn btn-sm btn-info uib-datepicker-current" ng-click="select(\'today\', $event)" ng-disabled="isDisabled(\'today\')">{{ getText(\'current\') }}</button>\n      <button type="button" class="btn btn-sm btn-danger uib-clear" ng-click="select(null, $event)">{{ getText(\'clear\') }}</button>\n    </span>\n    <button type="button" class="btn btn-sm btn-success pull-right uib-close" ng-click="close($event)">{{ getText(\'close\') }}</button>\n  </li>\n</ul>\n')}]),angular.module("uib/template/modal/window.html",[]).run(["$templateCache",function(a){a.put("uib/template/modal/window.html","<div class=\"modal-dialog {{size ? 'modal-' + size : ''}}\"><div class=\"modal-content\" uib-modal-transclude></div></div>\n")}]),angular.module("uib/template/pager/pager.html",[]).run(["$templateCache",function(a){a.put("uib/template/pager/pager.html",'<li ng-class="{disabled: noPrevious()||ngDisabled, previous: align}"><a href ng-click="selectPage(page - 1, $event)" ng-disabled="noPrevious()||ngDisabled" uib-tabindex-toggle>{{::getText(\'previous\')}}</a></li>\n<li ng-class="{disabled: noNext()||ngDisabled, next: align}"><a href ng-click="selectPage(page + 1, $event)" ng-disabled="noNext()||ngDisabled" uib-tabindex-toggle>{{::getText(\'next\')}}</a></li>\n')}]),angular.module("uib/template/pagination/pagination.html",[]).run(["$templateCache",function(a){a.put("uib/template/pagination/pagination.html",'<li ng-if="::boundaryLinks" ng-class="{disabled: noPrevious()||ngDisabled}" class="pagination-first"><a href ng-click="selectPage(1, $event)" ng-disabled="noPrevious()||ngDisabled" uib-tabindex-toggle>{{::getText(\'first\')}}</a></li>\n<li ng-if="::directionLinks" ng-class="{disabled: noPrevious()||ngDisabled}" class="pagination-prev"><a href ng-click="selectPage(page - 1, $event)" ng-disabled="noPrevious()||ngDisabled" uib-tabindex-toggle>{{::getText(\'previous\')}}</a></li>\n<li ng-repeat="page in pages track by $index" ng-class="{active: page.active,disabled: ngDisabled&&!page.active}" class="pagination-page"><a href ng-click="selectPage(page.number, $event)" ng-disabled="ngDisabled&&!page.active" uib-tabindex-toggle>{{page.text}}</a></li>\n<li ng-if="::directionLinks" ng-class="{disabled: noNext()||ngDisabled}" class="pagination-next"><a href ng-click="selectPage(page + 1, $event)" ng-disabled="noNext()||ngDisabled" uib-tabindex-toggle>{{::getText(\'next\')}}</a></li>\n<li ng-if="::boundaryLinks" ng-class="{disabled: noNext()||ngDisabled}" class="pagination-last"><a href ng-click="selectPage(totalPages, $event)" ng-disabled="noNext()||ngDisabled" uib-tabindex-toggle>{{::getText(\'last\')}}</a></li>\n')}]),angular.module("uib/template/tooltip/tooltip-html-popup.html",[]).run(["$templateCache",function(a){a.put("uib/template/tooltip/tooltip-html-popup.html",'<div class="tooltip-arrow"></div>\n<div class="tooltip-inner" ng-bind-html="contentExp()"></div>\n')}]),angular.module("uib/template/tooltip/tooltip-popup.html",[]).run(["$templateCache",function(a){a.put("uib/template/tooltip/tooltip-popup.html",'<div class="tooltip-arrow"></div>\n<div class="tooltip-inner" ng-bind="content"></div>\n')}]),angular.module("uib/template/tooltip/tooltip-template-popup.html",[]).run(["$templateCache",function(a){a.put("uib/template/tooltip/tooltip-template-popup.html",'<div class="tooltip-arrow"></div>\n<div class="tooltip-inner"\n  uib-tooltip-template-transclude="contentExp()"\n  tooltip-template-transclude-scope="originScope()"></div>\n')}]),angular.module("uib/template/popover/popover-html.html",[]).run(["$templateCache",function(a){a.put("uib/template/popover/popover-html.html",'<div class="arrow"></div>\n\n<div class="popover-inner">\n    <h3 class="popover-title" ng-bind="uibTitle" ng-if="uibTitle"></h3>\n    <div class="popover-content" ng-bind-html="contentExp()"></div>\n</div>\n')}]),angular.module("uib/template/popover/popover-template.html",[]).run(["$templateCache",function(a){a.put("uib/template/popover/popover-template.html",'<div class="arrow"></div>\n\n<div class="popover-inner">\n    <h3 class="popover-title" ng-bind="uibTitle" ng-if="uibTitle"></h3>\n    <div class="popover-content"\n      uib-tooltip-template-transclude="contentExp()"\n      tooltip-template-transclude-scope="originScope()"></div>\n</div>\n')}]),angular.module("uib/template/popover/popover.html",[]).run(["$templateCache",function(a){a.put("uib/template/popover/popover.html",'<div class="arrow"></div>\n\n<div class="popover-inner">\n    <h3 class="popover-title" ng-bind="uibTitle" ng-if="uibTitle"></h3>\n    <div class="popover-content" ng-bind="content"></div>\n</div>\n')}]),angular.module("uib/template/progressbar/bar.html",[]).run(["$templateCache",function(a){a.put("uib/template/progressbar/bar.html",'<div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: (percent < 100 ? percent : 100) + \'%\'}" aria-valuetext="{{percent | number:0}}%" aria-labelledby="{{::title}}" ng-transclude></div>\n')}]),angular.module("uib/template/progressbar/progress.html",[]).run(["$templateCache",function(a){a.put("uib/template/progressbar/progress.html",'<div class="progress" ng-transclude aria-labelledby="{{::title}}"></div>')}]),angular.module("uib/template/progressbar/progressbar.html",[]).run(["$templateCache",function(a){a.put("uib/template/progressbar/progressbar.html",'<div class="progress">\n  <div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: (percent < 100 ? percent : 100) + \'%\'}" aria-valuetext="{{percent | number:0}}%" aria-labelledby="{{::title}}" ng-transclude></div>\n</div>\n')}]),angular.module("uib/template/rating/rating.html",[]).run(["$templateCache",function(a){a.put("uib/template/rating/rating.html",'<span ng-mouseleave="reset()" ng-keydown="onKeydown($event)" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="{{range.length}}" aria-valuenow="{{value}}" aria-valuetext="{{title}}">\n    <span ng-repeat-start="r in range track by $index" class="sr-only">({{ $index < value ? \'*\' : \' \' }})</span>\n    <i ng-repeat-end ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" class="glyphicon" ng-class="$index < value && (r.stateOn || \'glyphicon-star\') || (r.stateOff || \'glyphicon-star-empty\')" ng-attr-title="{{r.title}}"></i>\n</span>\n')}]),angular.module("uib/template/tabs/tab.html",[]).run(["$templateCache",function(a){a.put("uib/template/tabs/tab.html",'<li ng-class="[{active: active, disabled: disabled}, classes]" class="uib-tab nav-item">\n  <a href ng-click="select($event)" class="nav-link" uib-tab-heading-transclude>{{heading}}</a>\n</li>\n')}]),angular.module("uib/template/tabs/tabset.html",[]).run(["$templateCache",function(a){a.put("uib/template/tabs/tabset.html",'<div>\n  <ul class="nav nav-{{tabset.type || \'tabs\'}}" ng-class="{\'nav-stacked\': vertical, \'nav-justified\': justified}" ng-transclude></ul>\n  <div class="tab-content">\n    <div class="tab-pane"\n         ng-repeat="tab in tabset.tabs"\n         ng-class="{active: tabset.active === tab.index}"\n         uib-tab-content-transclude="tab">\n    </div>\n  </div>\n</div>\n')}]),angular.module("uib/template/timepicker/timepicker.html",[]).run(["$templateCache",function(a){a.put("uib/template/timepicker/timepicker.html",'<table class="uib-timepicker">\n  <tbody>\n    <tr class="text-center" ng-show="::showSpinners">\n      <td class="uib-increment hours"><a ng-click="incrementHours()" ng-class="{disabled: noIncrementHours()}" class="btn btn-link" ng-disabled="noIncrementHours()" tabindex="-1"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n      <td>&nbsp;</td>\n      <td class="uib-increment minutes"><a ng-click="incrementMinutes()" ng-class="{disabled: noIncrementMinutes()}" class="btn btn-link" ng-disabled="noIncrementMinutes()" tabindex="-1"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n      <td ng-show="showSeconds">&nbsp;</td>\n      <td ng-show="showSeconds" class="uib-increment seconds"><a ng-click="incrementSeconds()" ng-class="{disabled: noIncrementSeconds()}" class="btn btn-link" ng-disabled="noIncrementSeconds()" tabindex="-1"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n      <td ng-show="showMeridian"></td>\n    </tr>\n    <tr>\n      <td class="form-group uib-time hours" ng-class="{\'has-error\': invalidHours}">\n        <input type="text" placeholder="HH" ng-model="hours" ng-change="updateHours()" class="form-control text-center" ng-readonly="::readonlyInput" maxlength="2" tabindex="{{::tabindex}}" ng-disabled="noIncrementHours()" ng-blur="blur()">\n      </td>\n      <td class="uib-separator">:</td>\n      <td class="form-group uib-time minutes" ng-class="{\'has-error\': invalidMinutes}">\n        <input type="text" placeholder="MM" ng-model="minutes" ng-change="updateMinutes()" class="form-control text-center" ng-readonly="::readonlyInput" maxlength="2" tabindex="{{::tabindex}}" ng-disabled="noIncrementMinutes()" ng-blur="blur()">\n      </td>\n      <td ng-show="showSeconds" class="uib-separator">:</td>\n      <td class="form-group uib-time seconds" ng-class="{\'has-error\': invalidSeconds}" ng-show="showSeconds">\n        <input type="text" placeholder="SS" ng-model="seconds" ng-change="updateSeconds()" class="form-control text-center" ng-readonly="readonlyInput" maxlength="2" tabindex="{{::tabindex}}" ng-disabled="noIncrementSeconds()" ng-blur="blur()">\n      </td>\n      <td ng-show="showMeridian" class="uib-time am-pm"><button type="button" ng-class="{disabled: noToggleMeridian()}" class="btn btn-default text-center" ng-click="toggleMeridian()" ng-disabled="noToggleMeridian()" tabindex="{{::tabindex}}">{{meridian}}</button></td>\n    </tr>\n    <tr class="text-center" ng-show="::showSpinners">\n      <td class="uib-decrement hours"><a ng-click="decrementHours()" ng-class="{disabled: noDecrementHours()}" class="btn btn-link" ng-disabled="noDecrementHours()" tabindex="-1"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n      <td>&nbsp;</td>\n      <td class="uib-decrement minutes"><a ng-click="decrementMinutes()" ng-class="{disabled: noDecrementMinutes()}" class="btn btn-link" ng-disabled="noDecrementMinutes()" tabindex="-1"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n      <td ng-show="showSeconds">&nbsp;</td>\n      <td ng-show="showSeconds" class="uib-decrement seconds"><a ng-click="decrementSeconds()" ng-class="{disabled: noDecrementSeconds()}" class="btn btn-link" ng-disabled="noDecrementSeconds()" tabindex="-1"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n      <td ng-show="showMeridian"></td>\n    </tr>\n  </tbody>\n</table>\n')}]),angular.module("uib/template/typeahead/typeahead-match.html",[]).run(["$templateCache",function(a){a.put("uib/template/typeahead/typeahead-match.html",'<a href\n   tabindex="-1"\n   ng-bind-html="match.label | uibTypeaheadHighlight:query"\n   ng-attr-title="{{match.label}}"></a>\n')}]),angular.module("uib/template/typeahead/typeahead-popup.html",[]).run(["$templateCache",function(a){a.put("uib/template/typeahead/typeahead-popup.html",'<ul class="dropdown-menu" ng-show="isOpen() && !moveInProgress" ng-style="{top: position().top+\'px\', left: position().left+\'px\'}" role="listbox" aria-hidden="{{!isOpen()}}">\n    <li class="uib-typeahead-match" ng-repeat="match in matches track by $index" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index, $event)" role="option" id="{{::match.id}}">\n        <div uib-typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>\n    </li>\n</ul>\n')}]),angular.module("ui.bootstrap.carousel").run(function(){!angular.$$csp().noInlineStyle&&!angular.$$uibCarouselCss&&angular.element(document).find("head").prepend('<style type="text/css">.ng-animate.item:not(.left):not(.right){-webkit-transition:0s ease-in-out left;transition:0s ease-in-out left}</style>'),angular.$$uibCarouselCss=!0}),angular.module("ui.bootstrap.datepicker").run(function(){!angular.$$csp().noInlineStyle&&!angular.$$uibDatepickerCss&&angular.element(document).find("head").prepend('<style type="text/css">.uib-datepicker .uib-title{width:100%;}.uib-day button,.uib-month button,.uib-year button{min-width:100%;}.uib-left,.uib-right{width:100%}</style>'),angular.$$uibDatepickerCss=!0}),angular.module("ui.bootstrap.position").run(function(){!angular.$$csp().noInlineStyle&&!angular.$$uibPositionCss&&angular.element(document).find("head").prepend('<style type="text/css">.uib-position-measure{display:block !important;visibility:hidden !important;position:absolute !important;top:-9999px !important;left:-9999px !important;}.uib-position-scrollbar-measure{position:absolute !important;top:-9999px !important;width:50px !important;height:50px !important;overflow:scroll !important;}.uib-position-body-scrollbar-measure{overflow:scroll !important;}</style>'),angular.$$uibPositionCss=!0}),angular.module("ui.bootstrap.datepickerPopup").run(function(){!angular.$$csp().noInlineStyle&&!angular.$$uibDatepickerpopupCss&&angular.element(document).find("head").prepend('<style type="text/css">.uib-datepicker-popup.dropdown-menu{display:block;float:none;margin:0;}.uib-button-bar{padding:10px 9px 2px;}</style>'),angular.$$uibDatepickerpopupCss=!0}),angular.module("ui.bootstrap.tooltip").run(function(){!angular.$$csp().noInlineStyle&&!angular.$$uibTooltipCss&&angular.element(document).find("head").prepend('<style type="text/css">[uib-tooltip-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-popup].tooltip.right-bottom > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.right-bottom > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.right-bottom > .tooltip-arrow,[uib-popover-popup].popover.top-left > .arrow,[uib-popover-popup].popover.top-right > .arrow,[uib-popover-popup].popover.bottom-left > .arrow,[uib-popover-popup].popover.bottom-right > .arrow,[uib-popover-popup].popover.left-top > .arrow,[uib-popover-popup].popover.left-bottom > .arrow,[uib-popover-popup].popover.right-top > .arrow,[uib-popover-popup].popover.right-bottom > .arrow,[uib-popover-html-popup].popover.top-left > .arrow,[uib-popover-html-popup].popover.top-right > .arrow,[uib-popover-html-popup].popover.bottom-left > .arrow,[uib-popover-html-popup].popover.bottom-right > .arrow,[uib-popover-html-popup].popover.left-top > .arrow,[uib-popover-html-popup].popover.left-bottom > .arrow,[uib-popover-html-popup].popover.right-top > .arrow,[uib-popover-html-popup].popover.right-bottom > .arrow,[uib-popover-template-popup].popover.top-left > .arrow,[uib-popover-template-popup].popover.top-right > .arrow,[uib-popover-template-popup].popover.bottom-left > .arrow,[uib-popover-template-popup].popover.bottom-right > .arrow,[uib-popover-template-popup].popover.left-top > .arrow,[uib-popover-template-popup].popover.left-bottom > .arrow,[uib-popover-template-popup].popover.right-top > .arrow,[uib-popover-template-popup].popover.right-bottom > .arrow{top:auto;bottom:auto;left:auto;right:auto;margin:0;}[uib-popover-popup].popover,[uib-popover-html-popup].popover,[uib-popover-template-popup].popover{display:block !important;}</style>'),angular.$$uibTooltipCss=!0}),angular.module("ui.bootstrap.timepicker").run(function(){!angular.$$csp().noInlineStyle&&!angular.$$uibTimepickerCss&&angular.element(document).find("head").prepend('<style type="text/css">.uib-time input{width:50px;}</style>'),angular.$$uibTimepickerCss=!0}),angular.module("ui.bootstrap.typeahead").run(function(){!angular.$$csp().noInlineStyle&&!angular.$$uibTypeaheadCss&&angular.element(document).find("head").prepend('<style type="text/css">[uib-typeahead-popup].dropdown-menu{display:block;}</style>'),angular.$$uibTypeaheadCss=!0});
window.Formula = {};

Formula.ARGSCONCAT = function (args) {
  var result = [];
  for (var i = 0; i < args.length; i++) {
    result = result.concat(args[i]);
  }
  return result;
};

//En: PMT, Fr: VPM
Formula.PMT = function (rate, periods, present, future, type) {
  // Credits: algorithm inspired by Apache OpenOffice

  // Initialize type
  type = (typeof type === 'undefined') ? 0 : type;

  // Evaluate rate and periods (TODO: replace with secure expression evaluator)
  rate = eval(rate);
  periods = eval(periods);

  // Return payment
  var result;
  if (rate === 0) {
    result = (present + future) / periods;
  } else {
    var term = Math.pow(1 + rate, periods);
    if (type === 1) {
      result = (future * rate / (term - 1) + present * rate / (1 - 1 / term)) / (1 + rate);
    } else {
      result = future * rate / (term - 1) + present * rate / (1 - 1 / term);
    }
  }
  return -result;
};

Formula.MIN = function () {
  var range = Formula.ARGSCONCAT(arguments);
  var n = range.length;
  var min = (n > 0) ? range[0] : 0;
  for (var i = 0; i < n; i++) {
    min = (range[i] < min && (range[i] !== true) && (range[i] !== false)) ? range[i] : min;
  }
  return min;
};

Formula.MAX = function () {
  var range = Formula.ARGSCONCAT(arguments);
  var n = range.length;
  var max = (n > 0) ? range[0] : 0;
  for (var i = 0; i < n; i++) {
    max = (range[i] > max && (range[i] !== true) && (range[i] !== false)) ? range[i] : max;
  }
  return max;
};

//En: POWER, Fr: PUISSANCE
Formula.POWER = function (number, power) {
  return Math.pow(number, power);
};

//En: PV, Fr: VA
Formula.PV = function (rate, periods, payment, future, type) {
  // Initialize type
  type = (typeof type === 'undefined') ? 0 : type;

  // Evaluate rate and periods (TODO: replace with secure expression evaluator)
  rate = eval(rate);
  periods = eval(periods);

  // Return present value
  if (rate === 0) {
    return -payment * periods - future;
  } else {
    return (((1 - Math.pow(1 + rate, periods)) / rate) * payment * (1 + rate * type) - future) / Math.pow(1 + rate, periods);
  }
};

Formula.ROUND = function (number, digits) {
  return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits);
};

Formula.ROUNDDOWN = function (number, digits) {
  var sign = (number > 0) ? 1 : -1;
  return sign * (Math.floor(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
};

Formula.ROUNDUP = function (number, digits) {
  var sign = (number > 0) ? 1 : -1;
  return sign * (Math.ceil(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
};

Formula.FV = function (rate, periods, payment, value, type) {
  // Credits: algorithm inspired by Apache OpenOffice

  // Initialize type
  type = (typeof type === 'undefined') ? 0 : type;

  // Evaluate rate (TODO: replace with secure expression evaluator)
  rate = eval(rate);

  // Return future value
  var result;
  if (rate === 0) {
      result = value + payment * periods;
  } else {
      var term = Math.pow(1 + rate, periods);
      if (type === 1) {
          result = value * term + payment * (1 + rate) * (term - 1.0) / rate;
      } else {
          result = value * term + payment * (term - 1) / rate;
      }
  }
  return (-1)*result;
};

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
(function ($, jQuery) {

	window.cachedLang = false;

	window.getLanguage = function () {
		var htmlLang = $('html').attr('lang'),
			splLang,
			winLang;
		if (window.cachedLang) {
			return window.cachedLang;
		} else if (htmlLang) {
			splLang = htmlLang.split("-")[0];
			window.cachedLang = splLang;
			return splLang;
		} else {
			winLang = window.lang || window.lg || window.language;
			if (typeof winLang === "string") {
				window.cachedLang = winLang;
				return winLang;
			}
		}
		window.cachedLang = 'en';
		return window.cachedLang;
	};

	window.getSelectOption = function (optionsArray, value, prop) {
		prop = prop || 'value';
		if (typeof optionsArray === 'object' && optionsArray.length) {
			optionsArray = optionsArray.filter(function (option) {
				return option[prop] === value;
			});
			if (optionsArray.length) return optionsArray[0];
			// else return value;
		}
	};

	window.getItemAtPath = function (path, scope) {
		scope = scope || window;
		if (path) {
			path = path.split('.');
			do {
				if (scope[path[0]] !== undefined) scope = scope[path.shift()];
				else break;
			} while (path.length);

			return scope;
		}
		return undefined;
	};

	// Backward compatible trim function
	window.trimString = function (x) {
		return x.replace(/^\s+|\s+$/gm, '');
	};

	window.cleanValue = function (value) {
		if (typeof value === "string") {
			value = value.replaceAll("\\$").replaceAll("%").replaceAll(",");
		}
		return value;
	};

	window.brCalc = angular.module('br-calc', ['ui.bootstrap', 'ngAnimate', 'angular-bind-html-compile'])

		.service("contentManager", function () {
			var me = this,

				originalContent = {}, // will never be transcluded
				originalConfig = {}, // will never be transcluded

				locContent = {},

				content = {},
				config = {},

				GENERAL = 'general',
				CONTENT_MODEL = 'contentModel',
				CONFIG_MODEL = 'configModel',

				getLanguage = window.getLanguage,
				getLanguage = getLanguage,
				// getLanguage = getLanguage,

				language = getLanguage();
			///////////////////////////
			// LOCAL general methods //
			///////////////////////////
			function getItemAtPath(path, scope) {
				scope = scope || window;
				if (path) {
					path = path.split('.');
					do {
						scope = scope[path.shift()];
					} while (path.length && scope !== undefined);

					return scope;
				}
				return undefined;
			}
			// Go though a config and fetch the models to replace in config
			function transcludeModels(config, scope, modelKey, deepCopy) {
				config = config || {};
				modelKey = modelKey || 'model';
				var isNull = config === null,
					isObject = !isNull && typeof config === 'object',
					isArray = isObject && config.length !== undefined,
					key,
					model,
					prop,
					value,
					potentialPath,
					i = 0;

				if (isObject) {
					if (deepCopy) {

						if (isArray) {
							config = $.merge([], config);
						} else {
							config = $.extend(true, {}, config);
						}
					}
					for (key in config) {
						value = config[key];
						if (value !== null) {
							if (typeof value === 'object') {
								config[key] = transcludeModels(value, scope, modelKey, deepCopy);
							} else if (key === modelKey) {

								value = value.split(',');
								for (; i < value.length; i++) {

									potentialPath = trimString(value[i]);
									if (potentialPath.indexOf(':') !== -1) {
										prop = potentialPath.split(':').shift();
										potentialPath = potentialPath.split(':').pop();
									} else {
										prop = false;
									}

									model = getItemAtPath(potentialPath, scope);

									if (model !== undefined) {
										if (typeof model === 'object') {
											transcludeModels(model, scope, modelKey, deepCopy);
											if (prop) {
												config[prop] = $.extend({}, model);
											} else {
												config = $.extend(true, {}, model, config);
											}
										} else {
											config[prop || potentialPath.split('.').pop()] = model;
										}
									}
								}
								delete config[modelKey]; // cleanup
								prop = undefined;
							}
						}
					}
				}
				return config;
			}

			function getName(name) {
				return typeof name === 'string' && name !== '' && name || GENERAL;
			}
			///////////////////////////
			// LOCAL content methods //
			///////////////////////////
			function getLocalisedContent(contentObject, deepCopy) {
				contentObject = contentObject || {};
				if (deepCopy) {
					contentObject = $.extend(true, {}, contentObject);
				}
				return contentObject[language] || {};
			}

			// Should be used any time config is changed
			// 	-> transclude config's contentModel with content.general (assuming content.general has already been transcluded at set)
			// 	-> transclude config's configModel with itself
			// 	-> transclude content.general contentConfig with its localized version
			// 	-> for each level of content (excluding 'general'):
			// 		-> transclude content's contentModel with its localized version
			// 	-> transclude content's configModel with config
			// function transcludeAllContent(name) {
			function transcludeContent(name) {
				if (name && name !== GENERAL) {
					if (content[name]) {
						transcludeModels(locContent[name], content || {}, CONTENT_MODEL);
						transcludeModels($.extend(true, content[name], locContent[name]), config, CONFIG_MODEL);
					}
				} else {
					locContent.general = getLocalisedContent(originalContent.general, true);
					$.extend(true, content, transcludeModels(locContent.general, content || {}, CONTENT_MODEL));

					for (name in locContent) {
						if (name !== GENERAL) {
							locContent[name] = getLocalisedContent(originalContent[name], true);
							$.extend(true, content[name], transcludeModels(locContent[name], content || {}, CONTENT_MODEL));
						}
					}
					// CONFIG transclude all content's config
					transcludeModels(content, config, CONFIG_MODEL);
				}
			}
			/**
			 * setContent (LOCAL)
			 * 	Extracts the appropriate localized (language sensitive) part of the config and store it
			 * 	Create a content entry using the localized content config
			 * 	Transclude the new content
			 * @param {object} contentObject Full content config, where the first layer refers to language description. Ex: {en:{...},fr:{...}}
			 * @param {string} name          Name given to the content config.
			 */
			function setContent(name) {
				// Get localised content AND create deep copy of originalContent
				locContent[name] = getLocalisedContent(originalContent[name], true);
				// New content entry
				if (name !== GENERAL) {
					if (content[name] === undefined) {
						content[name] = $.extend(true, {}, locContent[name]);
					} else {
						$.extend(true, content[name], locContent[name]);
					}
				} else {
					$.extend(true, content, locContent[name]);
				}
				// Transclude this content entry
				transcludeContent(name);
				transcludeConfig();
			}
			/////////////////////////////
			// INTERNAL config methods //
			/////////////////////////////
			function transcludeConfig() {
				$.extend(true, config, getTranscludedConfig());
			}

			function getTranscludedConfig() {
				var transcludedConfig = transcludeModels(originalConfig, content || {}, CONTENT_MODEL, true);
				transcludeModels(transcludedConfig, $.extend(true, {}, config, transcludedConfig), CONFIG_MODEL);

				return transcludedConfig;
			}
			////////////////////
			// PUBLIC methods //
			////////////////////
			this.setContent = function (contentObject, name) {
				// Provided object should at least have English language
				if (contentObject && contentObject.en) {
					name = getName(name);
					originalContent[name] = $.extend(true, originalContent[name] || {}, contentObject); // merge with existing object
					setContent(name);
				}
				// me.setConfig();
				return me;
			};
			this.setConfig = function (configObject) {
				// config shouldn't be localised (possess language attributes)
				$.extend(true, originalConfig, configObject || {}); // merge with existing object
				transcludeConfig();
				transcludeContent(); // Transclude ALL content
				return me;
			};
			this.getContent = function (name) {
				if (getName(name) !== GENERAL) {
					return content[getName(name)];
				}
				return content;
			};
			this.getConfig = function (path, clone) {

				if (typeof path === 'boolean') {
					clone = path;
					path = undefined;
				}
				if (clone === true) {
					return path && $.extend(true, {}, getItemAtPath(path, config)) || $.extend(true, {}, config);
				} else {
					return path && getItemAtPath(path, config) || config;
				}
			};
			// Gives out a clone of the originalConfig object in order to prevent changes to the configs by reference
			this.getOriginalConfig = function () {
				return $.extend(true, {}, originalConfig);
			};
			this.getHighchartConfig = function (name) {
				return config.highchart && config.highchart[name] || {};
			};
		})
		////////////////
		// CONTROLLER //
		////////////////
		.controller('br-calc', ['$scope', '$location', 'tabData', 'contentManager', '$uibModal', function ($scope, $location, tabData, contentManager, $uibModal) {
			var versionCaching = 'r=' + new Date().getTime(); // Force clear cache of HTML partials

			var dispellAllFocus = function (e) {
					// data.ignore -> any other focusable elements we wouldn't like to prevent a focus to be transfered to
					var ignore = e && e.data && e.data.ignore && $(e.data.ignore) || $(''),
						currentActiveField = e && e.data && e.data.originalEvent && $(e.data.originalEvent.currentTarget) || $(e.currentTarget);

					if (e.type !== 'keydown' && $(e.target).not(ignore).length === 0) return;
					currentActiveField.blur();

				},
				focusOnNextField = function (e) {
					var self = $(e.currentTarget),
						body = $('body [ng-app="br-calc"]'),
						focusable, next;

					focusable = body.find('input,select,textarea').filter(':visible');
					next = focusable.eq(focusable.index(e.currentTarget) + 1);
					if (next.length) {
						next.focus();
					} else {
						if (focusable.length !== 1) {
							focusable.eq(0).focus();
						} else {
							self.blur();
						}
					}
				},
				interceptEnterKey = function (callback) {
					return function (e) {
						if (e.keyCode === 13 && e.which === 13) {
							callback(e);
							return false;
						}
					};
				},
				// Interdependant events to select input field texts
				addSelectText = function (e) {
					$(e.currentTarget).on('focus', selectText);
				},
				selectText = function (e) {
					if (e.target && e.target.type === 'range') return;
					e.currentTarget.setSelectionRange(0, e.currentTarget.value.length);
					$(e.currentTarget).on('blur', removeSelectText);
				},
				removeSelectText = function (e) {
					$(e.currentTarget)
						.off('focus', selectText)
						.off('blur', removeSelectText);
				};

			// $scope.openModal = function (templateUrl) {
			// 	var modalInstance = $uibModal.open({
			// 		animation: true,
			// 		ariaLabelledBy: 'modal-title',
			// 		ariaDescribedBy: 'modal-body',
			// 		templateUrl: templateUrl/*,
			// 		// controller: 'ModalInstanceCtrl',
			// 		// controllerAs: '$ctrl',
			// 		size: size,
			// 		resolve: {
			// 		items: function () {
			// 		return $ctrl.items;
			// 		}
			// 		}*/
			// 	});
			// };

			$scope.tabData = tabData;
			$scope.isMobile = window.BU && BU.detect.isMobileBrowser() || false;
			$('body')
				// Listen on popover close event
				.on('click', '[ng-app="br-calc"] .popover .close', function (e) {
					$(e.currentTarget).parents('.popover').popover('hide');
				})

				.on('click', '[ng-app="br-calc"] button', function (e) {
					return false;
				})

				// ENTER key behaviour
				.on('keydown', '[ng-app="br-calc"] input, [ng-app="br-calc"] select, [ng-app="br-calc"] textarea', interceptEnterKey(dispellAllFocus))
				// .on('keydown', 'input, select, textarea', interceptEnterKey(focusOnNextField))

				// Mousedown while a field :focus automatically BLUR the field
				.on('focus', '[ng-app="br-calc"] input, [ng-app="br-calc"] select, [ng-app="br-calc"] textarea', function (e) {
					$('body').on('mousedown', {
						ignore: 'input, select, option, textarea',
						originalEvent: e
					}, dispellAllFocus);
				})
				.on('focus', '[ng-app="br-calc"] input', addSelectText)
				.on('blur', '[ng-app="br-calc"] input, [ng-app="br-calc"] select, [ng-app="br-calc"] textarea', function () {
					$('body').off('mousedown', dispellAllFocus);
				});

			// Close visible popovers and tooltip on resize
			// This fixes resize and orientationchange positionning issues.
			$(window).on('resize orientationchange', function ( /*e*/ ) {
				var tooltip = $('[ng-app="br-calc"] [tooltip]+.tooltip:visible');
				if(tooltip.length > 0){
					$('[ng-app="br-calc"] [tooltip]+.tooltip:visible').tooltip('hide');
					$('[ng-app="br-calc"] [popover]+.popover:visible').popover('hide');
				}
			});

			$scope.module = {
				investmentSelector: 'app/investmentSelector/investmentSelector.html?' + versionCaching,
				affordabilityCalculator: 'app/affordabilityCalculator/affordabilityCalculator.html?' + versionCaching,

				lineOfCreditCalculator: 'app/lineOfCreditCalculator/lineOfCreditCalculator.html?' + versionCaching,
				lineOfCreditCalculatorScenario: 'app/lineOfCreditCalculator/scenario/lineOfCreditScenario.html?' + versionCaching,
				lineOfCreditCalculatorScenarioDetails: 'app/lineOfCreditCalculator/scenario/lineOfCreditScenarioDetails.html?' + versionCaching,
				lineOfCreditCalculatorScenarioReport: 'app/lineOfCreditCalculator/scenarioReport/lineOfCreditScenarioReport.html?' + versionCaching,

				retirementSavingsCalculator: 'app/retirementSavingsCalculator/retirementSavingsCalculator.html?' + versionCaching,
				retirementSavingsCalculatorScenario: 'app/retirementSavingsCalculator/scenario/retirementSavingsScenario.html?' + versionCaching,
				retirementSavingsCalculatorScenarioResults: 'app/retirementSavingsCalculator/scenarioResults/retirementSavingsScenarioResults.html?' + versionCaching,
				retirementSavingsCalculatorScenarioDetails: 'app/retirementSavingsCalculator/scenario/retirementSavingsScenarioDetails.html?' + versionCaching,
				retirementSavingsCalculatorScenarioReport: 'app/retirementSavingsCalculator/scenarioReport/retirementSavingsScenarioReport.html?' + versionCaching,

				mortgagePaymentCalculator: 'app/mortgagePaymentCalculator/mortgagePaymentCalculator.html?' + versionCaching,
				mortgagePaymentCalculatorScenario: 'app/mortgagePaymentCalculator/scenario/mortgagePaymentScenario.html?' + versionCaching,
				mortgagePaymentCalculatorScenarioDetails: 'app/mortgagePaymentCalculator/scenario/mortgagePaymentScenarioDetails.html?' + versionCaching,
				mortgagePaymentCalculatorScenarioResults: 'app/mortgagePaymentCalculator/scenarioResults/mortgagePaymentScenarioResults.html?' + versionCaching,
				mortgagePaymentCalculatorScenarioReport: 'app/mortgagePaymentCalculator/scenarioReport/mortgagePaymentScenarioReport.html?' + versionCaching,


				hisaCalculator: 'app/hisaCalculator/hisaCalculator.html?' + versionCaching,
				hisaCalculatorScenario: 'app/hisaCalculator/scenario/hisaScenario.html?' + versionCaching,
				hisaCalculatorScenarioResults: 'app/hisaCalculator/scenario/hisaScenarioResults.html?' + versionCaching,
				hisaCalculatorScenarioReport: 'app/hisaCalculator/scenarioReport/hisaScenarioReport.html?' + versionCaching,
				hisaBoostSavings: 'app/hisaCalculator/scenario/boostSavings.html?' + versionCaching,
			};

			contentManager.setContent(defaultBRCalcDataContent);
			contentManager.setConfig(defaultBRCalcDataConfig);

			$scope.content = contentManager.getContent();

			$scope.config = contentManager.getConfig();

			$scope.round = function (value) {
				return Math.round(value);
			};

			$scope.sortable = function (object) {
				var results = object ? Object.keys($.extend({}, object)) : [],
					i = 0;
				for (; i < results.length; i++) {
					results[i] = object[results[i]];
				}
				return results;
			};

			// replace the config's own model with language selected:
			/*var tempConfig = $.extend(true,{},meridianDataConfig);
			delete tempConfig.content;
			tempConfig = $scope.getContent(tempConfig,$scope.content);
			meridianDataConfig = $.extend(true,meridianDataConfig,tempConfig);*/

		}])
		////////////////
		// DIRECTIVES //
		////////////////
		///
		// Modal
		// 	Call a partial using bootstrap's modal
		.directive("modal", function () {
			var directiveDefinitionObject = {
				restrict: 'E',
				scope: {
					isOpen: '=',
					name: '@',
					header: '<',
					close: '<'
				},
				transclude: true,
				replace: true,
				templateUrl: 'app/partials/modal.html',
				controller: function ($scope, $element, $attrs) {
					$scope.isOpen = $scope.isOpen === true;

					var isChangeFromModal = false,
						openModal = function () {
							$element.modal('show');
						},
						closeModal = function () {
							$element.modal('hide');
						};

					$element
						.modal({
							show: false
						})
						.on('show.bs.modal', function () {
							$scope.isOpen = true;
						})
						.on('hide.bs.modal', function () {
							$scope.isOpen = false;
							$scope.$applyAsync();
						});

					$scope.$watch('isOpen', function (newValue, oldValue) {
						if (newValue !== oldValue) {
							if (isChangeFromModal === true) {
								isChangeFromModal = false;
							} else {
								if (oldValue === true) closeModal();
								else openModal();
							}
						}
					});
				}
			};
			return directiveDefinitionObject;
		})
		// tooltip
		// 	Init Bootstrap tooltip elements
		// .directive("tooltip",function(){
		// 	return {
		// 		restrict:"A",
		// 		link: function (scope,element/*,attrs*/) { element.tooltip(); /*console.log('Defined tooltip - directive')*/ }
		// 	};
		// })
		// collapse
		// 	Init Bootstrap collapse elements
		// .directive("collapse",function(){
		// 	return {
		// 		restrict:"A",
		// 		link: function (scope,element/*,attrs*/) { console.log('sdlfkhsldfsjkdf"');element.collapse(); }
		// 	};
		// })
		// popover
		// 	Init Bootstrap popover elements
		.directive("popover", ['$compile', function ($compile) {

			return {
				restrict: "E",
				transclude: true,
				replace: true,
				controller: function ($scope, $element, $attrs, $transclude) {
					// console.log('$element.html()',$element.html(),$element);
					// Replace <transclude-content> element with content inserted in meri-select
					$transclude(function (clone, scope) {
						if (clone.length) {
							// console.log('clone.html()',clone.html());
							$scope.popContent = clone.html();
						}
					});
				},
				compile: function compile( /*tElement, tAttrs*/ ) {

					return {
						// Before Link compile
						pre: function preLink( /*scope, elem, attrs, ctrl*/ ) {},
						// After Link compile
						// Attach events here
						post: function postLink(scope, elem, attrs /*, ctrl*/ ) {
							var content = scope.popContent || attrs.content || '';

							elem.popover({
									template: '<div class="popover"><div class="popover-content"></div><a href="javascript:void(0)" class="close">X</a></div>',
									trigger: 'click'
								})
								.on('hidden.bs.popover', function (e) {
									$(e.target).data("bs.popover").inState.click = false;
								});
						}
					};
				},
				template: '<a href="javascript:void(0)" class="br-icon" data-toggle="popover" data-placement="top" popover>&nbsp;</a>'
			};
		}])
		// slider
		.directive("slider", function (contentManager) {
			return {
				restrict: 'A',
				link: function (scope, ele, attr) {
					var config,
						configName,
						slider,
						update = function (number, event) {
							number = number === undefined || isNaN(number) ? 0 : number;
							setDataToScope(attr.slider, scope, stringToNumber(number));
							if (!event || event === 'change') {
								slider.set(number);
							}
						},
						generalUpdateMethod = function (eventType) {
							return function (number) {
								update(number, eventType);
							};
						};
					if (contentManager.getConfig().slider && noUiSlider) {
						configName = attr.config || "";
						config = contentManager.getConfig().slider[configName];
						if (config) {

							config.start = getDataAtScope(attr.slider, scope) || (config.start !== undefined ? config.start : undefined);
							slider = noUiSlider.create(ele[0], config);

							slider.on('change.meri', generalUpdateMethod('change'));
							slider.on('update.meri', generalUpdateMethod('update'));
							scope.$watch(attr.slider, function (value) {
								slider.off('.meri');
								slider.set(value);
								slider.on('change.meri', generalUpdateMethod('change'));
								slider.on('update.meri', generalUpdateMethod('update'));
							});
						}
					}
				}
			};
		})

		.directive("ngFlag", function ($injector) {
			return {
				restrict: 'A',
				link: function (scope, ele, attr) {
					ele.on("click", function () {
						var flagKey = attr.ngFlag,
							flagValue = attr.ngFlagValue;

						if (flagValue === "true") {
							flagValue = true;
						} else if (flagValue === "false") {
							flagValue = false;
						}
						setDataToScope(flagKey, scope, flagValue, $injector);
					});
				}
			};
		})

		.directive("boolean", function () {
			return {
				restrict: 'A',
				require: 'ngModel',
				link: function (scope, ele, attr, ctrl) {

					var formatter = function (value) {
							return value ? 'true' : 'false';
						},
						parser = function (value /*,e*/ ) {
							return value !== 'false' && value !== '0';
						};

					ctrl.$formatters.unshift(formatter);
					ctrl.$parsers.unshift(parser);
				}
			};
		})

		.directive("number", function ($filter /*,$compile, $locale, $window*/ ) {
			return {
				restrict: 'A',
				require: '?ngModel',
				link: function (scope, ele, attr, ctrl) {
					if (attr.ngModel) {
						var precision = parseFloat(attr.precision),
							type = attr.number || 'number',
							percentModifier = 1,
							filter,
							parser,
							formatter,
							min,
							max,
							forceRange,
							removeFormat,
							applyFormat,
							resolveDataPercent = function (value) {
								return value / percentModifier;
							},
							resolveViewPercent = function (value) {
								return value * percentModifier;
							};

						if (!$filter(type)) {
							type = 'number';
						} else if (type === 'percent') {
							percentModifier = 100;
						}

						filter = $filter(type);

						if (isNaN(precision)) {
							precision = undefined;
						}

						// Where formattedValue = 3.00%
						// 	return: 3.00 (plainValue)
						removeFormat = function (formattedValue) {
							return $filter("naturalNumber")(formattedValue, precision);
						};

						// Where plainValue = 3.00 for 0.03 (3%)
						// 	return: %3.00 (formattedValue)
						applyFormat = function (plainValue) {
							// remove anything NOT a number
							plainValue = $filter('naturalNumber')(plainValue, precision);
							plainValue = resolveDataPercent(plainValue);
							return filter(plainValue, precision);
						};

						// Where value = modelValue 0.03 (for 3%)
						ctrl.$render = function (value) {
							// console.log('RENDER');
							// Take entered value and apply the format
							value = value || ctrl.$modelValue;
							// applyFormat() will divide by 100; filter('percent') already does *100
							// But $formatters will only use applyFormat
							value = resolveViewPercent(value);
							ctrl.$viewValue = applyFormat(value);
							ele.val(ctrl.$viewValue);
						};

						// Executes when model data changed and view must be updated
						formatter = function (value) {
							// console.log('FORMATTER');
							return applyFormat(value);
						};

						parser = function (value) {
							// console.log('PARSER');
							value = cleanValue(value);
							value = stringToNumber(value, precision);
							value = resolveDataPercent(value);

							// if meriValid is present, let it take care of min-max validation
							if (!attr.meriValid) {
								min = attr.min && attr.min !== '' ? stringToNumber(attr.min, precision) : undefined;
								max = attr.max && attr.max !== '' ? stringToNumber(attr.max, precision) : undefined;
								forceRange = attr.forceRange === "false" ? false : true;

								if (forceRange) {
									if (min !== undefined) {
										value = Math.max(min, value);
									}
									if (max !== undefined) {
										value = Math.min(max, value);
									}
								}
							}
							return value;
						};

						ctrl.$formatters.unshift(formatter);
						ctrl.$parsers.unshift(parser);

						ele.on("focus", function ( /*e*/ ) {
							// console.log('focus...');
							// Get and modify model value before raw display
							var value = resolveViewPercent(ctrl.$modelValue);
							// Set new view value
							ctrl.$setViewValue($filter("naturalNumber")(value, precision));
							// Update field element display
							ele.val(ctrl.$viewValue);
						});

						ele.on("blur", function ( /*e*/ ) {
							// console.log('blur...');
							// Set view value to formatted current view value
							// !! WARNING This value hasn't gone through parsers or validation yet
							ctrl.$setViewValue(applyFormat(ctrl.$viewValue));
							// Update field element display
							ele.val(ctrl.$viewValue);
						});
					}
				}
			};
		})

		/* Directive used on select html tag. It forces the select to keep their options values in string format but to save the selected value in number into the data object. */
		/* For example : We used this directive on payment frequency select. The value of the monthly option is : "1".But we want to have 1 in the data. We also use this directive on the product and term select field. */
		.directive("selectNumber", function ( /*$filter,$locale, $window*/ ) {

			function parser(value) {
				return stringToNumber(value);
			}

			function formatter(value) {
				return value + "";
			}

			return {
				restrict: 'A',
				require: 'ngModel',
				link: function (scope, ele, attr, ctrl) {
					ctrl.$formatters.unshift(formatter);
					ctrl.$parsers.unshift(parser);
				}
			};
		})
		/* Directive that permit to control the tabData service */
		/* This directive should be put on a A html element */
		/* The tabValue will */
		.directive("tabDefaultValue", function (tabData) {
			return {
				restrict: 'A',
				link: function (scope, ele, attr /*, ctrl*/ ) {
					var tabValue = attr.tabDefaultValue || "",
						tabValueSp = tabValue.split(":"),
						tabGroupName,
						tabGroupValue;

					if (tabValueSp.length == 2) {
						tabGroupName = tabValueSp[0];
						tabGroupValue = tabValueSp[1];

						tabData.setCurrentTab(tabGroupName, tabGroupValue);
					}

				}
			};
		})
		/* Directive that permit to control the tabData service */
		/* This directive should be put on a A html element */
		/* the tab-group determine which group value will be set by clicking on this elem */
		.directive("tabGroup", function (tabData) {
			return {
				restrict: 'A',
				link: function (scope, ele, attr /*, ctrl*/ ) {
					var tabName = attr.href || attr.tabValue,
						tabGroup = attr.tabGroup,
						storedValue = getStoredData(tabGroup + '-tab');

					if (typeof tabGroup === "string" && typeof tabName === "string") {
						tabName = tabName.replaceAll("#", "");
						if (attr.tabDefault && attr.tabDefault === "true" && !storedValue || storedValue === tabName) {
							tabData.setCurrentTab(tabGroup, tabName);
						}
					}

					ele.on('click', function (e) {
						e.preventDefault();
						e.stopPropagation();

						tabData.setCurrentTab(attr.tabGroup, tabName);
						scope.$apply();
					});
				}
			};
		})
		/* Directive that permit to save the current element ngModel value into the localStorage */
		/* The directive will also get back the value from the localStorage and inject it onto the ngModel */
		.directive('ngStorage', function () {
			return {
				restrict: 'A',
				require: 'ngModel',
				link: function ($scope, $element, $attrs /*, ngModel*/ ) {

					var ngModelStr = $attrs.ngModel,
						ngModelStrSplit = ngModelStr.split("."),
						x = 0,
						len = ngModelStrSplit.length,
						obj = $scope,
						last = len - 1,
						key;

					for (; x < len; x++) {
						key = ngModelStrSplit[x];

						if (x === last) {
							obj[key] = getStoredData($attrs.ngModel);
						} else {
							if (obj[key]) {
								obj = obj[key];
							} else {
								obj = obj[key] = {};
							}
						}
					}

					$scope.$watch($attrs.ngModel, function (value) {
						setStoredData($attrs.ngModel, value);
					});

				}
			};
		})

		//Range Slider which accepts min,max,default value
		.directive('meriRangeSlider', function ($rootScope) {
			var tpl = "<div class='slider-cont form-group'>" +
				"<div class='slider-container'><div class='slider-content'>" +
				"<input id='{{sliderId}}' class='slider' type='range' min='{{min}}' max='{{max}}' step='{{step}}' value='{{defaultVal}}' ng-model='defaultVal' />" +
				"<div class='slider-label'><span>{{displayMin || min}}</span>" +
				"<span>{{displayMax||max}}<span></div></div>" +
				"<div class='slider-text'><input id='{{sliderTextId}}' ng-model=defaultVal  /></div></div></div>";

			return {
				restrict: 'E',
				template: tpl,
				scope: {
					min: '=',
					max: '=',
					savingDuration:'=',
					defaultVal: '=defaultVal',
					step: '=',
					sliderId: '=',
					displayMin: '=',
					displayMax: '=',
					sliderTextId: '='
				},
				link: function ($scope, $elm) {
					$elm.on('change', function () {
						var inputVal = parseInt(document.getElementById($scope.sliderTextId).value);
						if(isInputValid(inputVal)){
							updateSlider();
						}else{
							//add switch statement to handle other range slider's as well
							$rootScope.$broadcast('setDefaultVal', $scope.sliderId);
							updateSlider();
						}
					});
					// change value from inputbox
					$elm.on('keyup', function (event) {
						var inputVal = parseInt(document.getElementById($scope.sliderTextId).value);
						var parentElem = $elm[0].children[0];
						var errElm = parentElem.getElementsByClassName('error-message');
						if(isInputValid(inputVal)){
							updateSlider(inputVal);
							$(errElm).remove();
							parentElem.classList.remove('error');
						}else{
							$rootScope.$broadcast('setDefaultVal', $scope.sliderId);
							updateSlider();
							if(errElm.length === 0){
								var errorElem = '<span>Value entered has been adjusted to the minimum or maximum value allowed.</span>';
								var span = document.createElement('div');
								span.classList.add("error-message");
								span.innerHTML = errorElem;
								parentElem.appendChild(span);
							}
							parentElem.classList.add('error');
						}	
					});
					// change value from inputbox
					// $elm.on('blur', function (event) {
					// 	var inputVal = parseInt(document.getElementById($scope.sliderTextId).value);
					// 	document.getElementById($scope.sliderTextId).value = inputVal+'%';
					// });

					$scope.$on('resetSlider', function (e, slider) {
						var sliderElm = $('#' + slider.sliderId)[0];
						var outputVal = ((slider.defaultVal - slider.min) / (slider.max - slider.min));
						sliderElm.style.backgroundImage = '-webkit-gradient(linear, left top, right top, ' +
							'color-stop(' + outputVal + ', #39709A), ' +
							'color-stop(' + outputVal + ', #fff)' +
							')';
						if (slider.callback) {
							slider.callback(slider.defaultVal);
						}
					});

					function isInputValid(inputVal){
						if((inputVal >= $scope.min) && (inputVal<= $scope.max)){
							return true;
						}
						return false;
					}
					

					function updateSlider(inputValue) {
						var slider = $('#' + $scope.sliderId)[0];
						var sliderValue = inputValue || slider.value;
						var outputVal = ((sliderValue - $scope.min) / ($scope.max - $scope.min));
						slider.style.backgroundImage = '-webkit-gradient(linear, left top, right top, ' +
							'color-stop(' + outputVal + ', #39709A), ' +
							'color-stop(' + outputVal + ', #fff)' +
							')';
					}
				},

			};
		})

		.directive('meriSelect', function ($compile) {

			var directiveDefinitionObject = {
				restrict: 'E',
				// transclude: true,
				transclude: false,
				scope: {
					fieldSpecs: '<'
				},
				replace: true,
				controller: function ($scope, $element, $attrs /*,$transclude*/ ) {

					var excludeAttrTransfer = {
							fieldSpecs: true,
							fieldValidation: true,
							binding: true,
							label: true
						},
						addAttributes = [],
						filterDirective,
						binding = $attrs.binding,
						fieldSpecs = $scope.fieldSpecs || {};


					// // Replace <transclude-content> element with content inserted in meri-select
					// $transclude(function(clone, scope) {
					// 	$element.find('transcluded-content').replaceWith(clone);
					// 	// transcludedContent = clone;
					// 	// transclusionScope = scope;
					// });

					$scope.options = fieldSpecs.options || [];

					$scope.label = fieldSpecs.label || '';

					switch (fieldSpecs.directive) {
						case 'boolean':
							filterDirective = 'boolean';
							break;
						case 'year':
						case 'percent':
						case 'currency':
						case 'number':
							filterDirective = 'select-number';
							break;
						default:
							filterDirective = false;
					}

					addAttributes.push({
						attr: 'ng-model',
						value: binding
					});

					$scope.label = fieldSpecs.label || $attrs.label || "";

					if (filterDirective) addAttributes.push({
						attr: filterDirective,
						value: fieldSpecs.directive
					});
					if (fieldSpecs.precision !== undefined) addAttributes.push({
						attr: 'data-precision',
						value: fieldSpecs.precision
					});
					// if ($attrs.fieldValidation) addAttributes.push({attr: 'meri-valid', value: $attrs.fieldValidation });
					if ($attrs.fieldValidation) addAttributes.push({
						attr: 'meri-form-valid',
						value: $attrs.fieldValidation
					});

					for (prop in $attrs.$attr) {
						if (excludeAttrTransfer[prop] === undefined) {
							addAttributes.push({
								attr: $attrs.$attr[prop],
								value: $attrs[prop]
							});
						}
					}

					$scope.selectAttributes = addAttributes;
				},
				compile: function compile( /*tElement, tAttrs*/ ) {

					return {
						// Before Link compile
						pre: function preLink(scope, elem /*, attrs, ctrl*/ ) {
							var i = 0,
								len = scope.selectAttributes.length,
								prop,
								select = elem.find('select');
							for (; i < len; i++) {
								if (scope.selectAttributes[i].attr === 'class') {
									select.addClass(scope.selectAttributes[i].value || '');
								} else {
									select.attr(scope.selectAttributes[i].attr, scope.selectAttributes[i].value !== undefined ? scope.selectAttributes[i].value : '');
								}
							}

							select.on('keyup', function (e) {
								var eKey = e.which || e.key,
									selected = select.find("option:selected");
								if ((eKey === 38) || (eKey === 40)) {
									select.change();

									// console.log('KEY UP, current now',selected.val());
									return false;
								}


							});

							// select.on('keydown',function(e){
							// 	var eKey = e.which || e.key,
							// 		selected = select.find("option:selected"),
							// 		next = selected.next(); // previous
							// // 	if ( (eKey === 38 && !selected.is(":first-child")) || (eKey === 40 && !selected.is(":last-child")) ) {    //    up arrow
							// // 		// console.log('----- KEYDOWN value:',selected.val(),select);
							// // 		console.log('----- KEYDOWN value:',selected.val(),select);
							// // 		select.change();
							// // 		return false;
							// // 	}

							// 	// console.log('KEY DOWN, current, next',selected.val(),next.val());
							// 	return false;
							// });
						},
						// After Link compile
						// Attach events here
						post: function postLink(scope, elem /*, attrs, ctrl*/ ) {
							$compile(elem.contents())(scope.$parent);
						}
					};
				},

				template: function (element, attr) {
					return '<div class="form-group">' +
						'<label for="{{ name }}">{{ label }}</label>' +
						'<select id="{{ name }}" class="form-control">' +
						'<option ng-repeat="option in options" value="{{ option.value }}">{{ option.label }}</option>' +
						'</select>' +
						// '<transcluded-content></transcluded-content>' +
						'<span class="clearfix"></span>' +
						'</div>';
				}
			};

			return directiveDefinitionObject;
		})

		.directive('meriTooltipWithHeader', function ($compile) {
			var template = {
					tooltip: '<a href="javascript:void(0)" class="br-icon" uib-tooltip="{{ getMeriTooltipContent() }}">&nbsp;</a>'
				},

				directiveDefinitionObject = {
					restrict: 'E',
					transclude: false,
					scope: {
						parent: '=',
						message: '='
					},
					replace: true,
					controller: function ($scope, $element, $attrs, $interpolate) {
						$scope.getMeriTooltipContent = function () {
							if (typeof $scope.message === 'string') {
								return $interpolate($scope.message)($scope.parent || $scope.$parent);
							} else {
								return '';
							}
						};
					},
					compile: function compile(tElement, tAttrs) {
						return {
							// Before Link compile
							pre: function preLink( /*scope, elem, attrs, ctrl*/ ) {},
							// After Link compile
							// Attach events here
							post: function postLink( /*scope, elem, attrs, ctrl*/ ) {}
						};
					},

					template: function (element, attr) {
						return template.tooltip;
					}
				};

			return directiveDefinitionObject;
		})

		.directive('meriTooltip', function ($compile) {
			var template = {
					tooltip: '<a href="javascript:void(0)" class="br-icon" uib-tooltip="{{ getMeriTooltipContent() }}">&nbsp;</a>'
				},

				directiveDefinitionObject = {
					restrict: 'E',
					transclude: false,
					scope: {
						parent: '=',
						message: '='
					},
					replace: true,
					controller: function ($scope, $element, $attrs, $interpolate) {
						$scope.getMeriTooltipContent = function () {
							if (typeof $scope.message.getMessage) {
								return $interpolate($scope.message.getMessage())($scope.parent || $scope.$parent);
							} else if (typeof $scope.message === 'string') {
								return $interpolate($scope.message)($scope.parent || $scope.$parent);
							} else {
								return '';
							}
						};
					},
					compile: function compile(tElement, tAttrs) {
						return {
							// Before Link compile
							pre: function preLink( /*scope, elem, attrs, ctrl*/ ) {},
							// After Link compile
							// Attach events here
							post: function postLink( /*scope, elem, attrs, ctrl*/ ) {}
						};
					},

					template: function (element, attr) {
						return template.tooltip;
					}
				};

			return directiveDefinitionObject;
		})

		.directive('meriInput', function ($compile, $interpolate) {

			var template = {
					meriTooltip: '<meri-tooltip parent="parent" message="tooltip"></meri-tooltip>',
					// unbreakable:{open:'<span class="unbreakable">',close:'</span>'}
					unbreakable: '<span class="unbreakable"></span>'
				},

				// 
				directiveDefinitionObject = {
					restrict: 'E',
					// transclude: true,
					transclude: false,
					scope: {
						fieldSpecs: '<',
						value: '=binding'
					},
					replace: true,
					controller: function ($scope, $element, $attrs /*,$transclude*/ ) {
						var excludeAttrTransfer = {
								fieldSpecs: true,
								fieldValidation: true,
								binding: true,
								label: true
							},
							inputAttributes = [],
							filterDirective,
							fieldSpecs = $scope.fieldSpecs || {},
							binding = $attrs.binding,
							prop;

						$scope.parent = $scope.$parent;

						// // Replace <transclude-content> element with content inserted in meri-input
						// $transclude(function(clone, scope) {
						// 	$element.find('transcluded-content').replaceWith(clone);
						// 	// transcludedContent = clone;
						// 	// transclusionScope = scope;
						// });

						if ($attrs.fieldSpecs && $attrs.fieldSpecs !== '' && $attrs.fieldSpecs.split('.').length > 1) {
							$scope.name = 'meri-' + $attrs.fieldSpecs.split('.').slice(1).join('-');
						} else {
							$scope.name = 'meri-' + ($attrs.fieldSpecs || '');
						}

						$scope.id = $scope.$parent.$eval($attrs.id) || $attrs.id || '';

						switch (fieldSpecs.directive) {
							case 'boolean':
								filterDirective = 'boolean';
								break;
							case 'year':
							case 'percent':
							case 'currency':
								$scope.filter = fieldSpecs.directive;
								$scope.fieldType = 'number';
								// CAN remove:
								filterDirective = 'number';
								break;
							default:
								filterDirective = false;
						}



						inputAttributes.push({
							attr: 'ng-model',
							value: binding
						});

						$scope.binding = binding;
						$scope.label = fieldSpecs.label || $attrs.label || "";

						if (filterDirective) {
							// CAN upgrade:
							inputAttributes.push({
								attr: filterDirective,
								value: fieldSpecs.directive
							});
						}
						if (fieldSpecs.precision !== undefined) {
							$scope.filterOption = fieldSpecs.precision;
							// CAN remove:
							inputAttributes.push({
								attr: 'data-precision',
								value: fieldSpecs.precision
							});
						}
						if ($attrs.fieldValidation) inputAttributes.push({
							attr: 'meri-form-valid',
							value: $attrs.fieldValidation
						});
						if (fieldSpecs.tooltip) {

							$scope.tooltip = customMessageFactory(fieldSpecs.tooltip);
							// TEMPORARY!!!
							// Create function to get a parse-safe string from $attrs.tooltipCustoms
							if ($attrs.tooltipCustoms) {
								$scope.tooltip.setCustom(JSON.parse($attrs.tooltipCustoms.split("'").join('"')));
							}
						}

						for (prop in $attrs.$attr) {
							if (excludeAttrTransfer[prop] === undefined) {
								inputAttributes.push({
									attr: $attrs.$attr[prop],
									value: $attrs[prop]
								});
							}
						}

						$scope.inputAttributes = inputAttributes;
					},
					compile: function compile(tElement, tAttrs) {

						return {
							// Before Link compile
							pre: function preLink(scope, elem /*, attrs, ctrl*/ ) {
								var i = 0,
									len = scope.inputAttributes.length,
									prop,
									input = elem.find('input'),
									label = elem.find('label'),
									labelText,
									labelLastWord;
								for (; i < len; i++) {
									if (scope.inputAttributes[i].attr === 'class') {
										input.addClass(scope.inputAttributes[i].value || '');
										elem.removeClass(scope.inputAttributes[i].value || '');
									} else {
										input.attr(scope.inputAttributes[i].attr, scope.inputAttributes[i].value !== undefined ? scope.inputAttributes[i].value : '');
									}
								}

								if (scope.tooltip) {
									labelText = scope.label.split(' ');
									labelLastWord = labelText.pop();


									scope.label = labelText.join(' ') + ' ';
									prop = $(template.unbreakable).text(labelLastWord).append($compile(template.meriTooltip)(scope));

									labelText = label.text('{{ label }} ').append(prop);
								}
							},
							// After Link compile
							// Attach events here
							post: function postLink(scope, elem /*, attrs, ctrl*/ ) {
								$compile(elem.contents())(scope.$parent);
							}
						};
					},

					template: function (element, attr) {
						return '<div class="form-group">' +
							'<label for="{{ id }}">{{ label }}</label>' +
							'<input id="{{ id }}" name="{{ id }}" class="form-control" type="text" ng-model-options="\{ updateOn: \'blur\',allowInvalid: \'true\' \}"/>' +
							// '<input id="{{ id }}" name="{{ id }}" class="form-control" type="{{ fieldType }}" ng-model-options="\{ updateOn: \'blur\',allowInvalid: \'true\' \}"/>' +
							// '<span class="view-value" ng-if="filter===\'currency\'">{{ value | currency:filterOption }}</span>'+
							// '<span class="view-value" ng-if="filter===\'percent\'">{{ value | percent:filterOption }}</span>'+
							// '<span class="view-value" ng-if="filter===\'year\'">{{ value | year:filterOption }}</span>'+
							'<span class="clearfix"></span>' +
							'</div>';
					}
				};

			return directiveDefinitionObject;
		})

		.directive('chart', function () {
			return {
				restrict: 'E',
				require: '?ngModel',
				transclude: true,
				scope: {
					value: '=ngModel',
					highchart: '=highchart'
				},
				link: function (scope, elem, attrs, ngModel) {
					if (!ngModel || !window.Highcharts) return;
					var isChartHISA = elem.hasClass('chartHISA');
					if (isChartHISA) {
						//window.Highcharts.wrap(window.Highcharts.Tooltip.prototype, 'hide', function (defaultCallback) {});
						/**
						 * Override the reset function, we don't need to hide the tooltips and crosshairs.
						 */
						window.Highcharts.Pointer.prototype.reset = function () {
							return undefined;
						};
					}

					ngModel.$render = function () {
						scope.value = ngModel.$modelValue;

						if (scope.value) {

							elem.highcharts(scope.value);

							if (attrs.highchart) {
								scope.highchart = elem.highcharts();
							}

							var count = 0,
								countMax = 10,
								tmFunc = function () {
									++count;
									if (elem.is(':visible')) {
										if (count !== 1) {
											elem.highcharts().reflow();
											elem.highcharts().redraw();
										}
									} else if (count < countMax) {
										setTimeout(tmFunc, 100);
									}
								};
							tmFunc();
						}
					};
				}
			};
		})

		.directive("meriFormValid", function ($compile) {

			var validStr = 'validation',
				directiveDefinitionObject = {
					restrict: 'A',
					require: '?ngModel',
					scope: true,

					link: function (scope, elem, attrs, ngModelCtrl) {

						var parentElem = elem.parents('.form-group'),
							validator = function (value) {
								return value;
							},
							errorElem, v;

						v = scope.$parent.$eval(attrs.meriFormValid) || {} /*validationConfig[validStr][propName] = factoryValidation( specs )*/ ;

						if (!parentElem.length) parentElem = elem.parent();
						if (parentElem.length > 1) parentElem = parentElem.eq(0);

						if (v && typeof v.validate === 'function') {

							// This will allow the validation object to trigger the ngModel validator
							v.setModel(ngModelCtrl);

							if (!parentElem.find('.error-message').length) parentElem.append('<span class="error-message"></span>');

							errorElem = parentElem.find('.error-message');

							// parentElem.append('<span class="error-message"></span>');

							// errorElem = parentElem.find('.error-message');

							if (elem[0].tagName === 'INPUT') {

								validator = function (value) {
									// console.log('validate value',value,ngModelCtrl.$modelValue,ngModelCtrl);
									var valid;

									if (v && typeof v.validate === 'function') {

										valid = v.validate(value);
										if (valid !== true) {
											// set error message
											errorElem.text(valid.message);
											$compile(errorElem.contents())(scope.$parent);
											// Make error visible
											parentElem.addClass('error');

											value = valid.value;
											// Update view value with validated value (will format value)
											// Render function from "number" also updates $modelValue
											ngModelCtrl.$viewValue = value;
											ngModelCtrl.$render(value);
											// ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
											// elem.val(ngModelCtrl.$viewValue);
											// Commit view value to the actual model (and corrects any unsynchronised data between view/model)
											// This step will recommit the value through the $parsers & $validators pipelines
											ngModelCtrl.$commitViewValue();
										}
									}

									// console.log('VALIDATOR value',value,ngModelCtrl.$pending);
									return value;
								};
							} else if (elem[0].tagName === 'SELECT') {

								validator = function (value) {
									var valid;

									if (v && typeof v.validate === 'function') {
										valid = v.validate(value);
										if (valid !== true) {

											value = valid.value;
											// Update view value with validated value (will format value)
											// Render function from "number" also updates $modelValue
											ngModelCtrl.$viewValue = value;
											ngModelCtrl.$render(value);
											elem.val(ngModelCtrl.$viewValue);
											elem.find('option[value="' + value + '"]').eq(0).prop('selected', true);
											ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
											// Commit view value to the actual model (and corrects any unsynchronised data between view/model)
											// This step will recommit the value through the $parsers & $validators pipelines
											ngModelCtrl.$commitViewValue();

											// set error message
											errorElem.text(valid.message);
											$compile(errorElem.contents())(scope.$parent);
											// Make error visible
											parentElem.addClass('error');
										}
									}
									return value;
								};
							}

							ngModelCtrl.$validators.meriValid = validator;

							// Errors are always removed from element onBlur
							// Event order:
							// 	focus
							// 	blur
							// 	parsers
							// 	validators
							// If errors remain, validator will reset error
							elem.on('blur', function ( /*event*/ ) {
								parentElem.removeClass('error');
								errorElem.text('');
							});
						}
					}
				};
			return directiveDefinitionObject;
		})

		/////////////
		// FILTERS //
		/////////////
		// html
		// 	Allow ng-bind-html to render html tags
		// 	To enable render expression, use bind-html-compile directive (plug-in)
		.filter('html', ['$sce', /*'$compile',*/ function ($sce /*,$compile*/ ) {

			return function (text) {
				return $sce.trustAsHtml(text);
			};
		}])
		// number
		// 	Filter to convert a displayed value into numeral string
		.filter('number', function () {
			return function (val, precision, round, natural) {
				var hasPrecision,
					roundFct = Formula.ROUND
				/*,
								indexStart,
						  		len,
						  		supposeLen*/
				;
				if (typeof precision === "string") {
					precision = stringToNumber(precision);
				}
				hasPrecision = typeof precision === "number";
				val = stringToNumber(val);
				round = stringToNumber(round);

				if (round < 0) {
					roundFct = Formula.ROUNDDOWN;
				} else if (round > 0) {
					roundFct = Formula.ROUNDUP;
				}

				if (hasPrecision) {

					val = roundFct(val, precision);

					if (!natural) {
						// WARNING toLocaleString() is not compatible with IE9
						// val = val.toLocaleString(getLanguage());
						val = formatGeneral(val, precision, getLanguage());
					}
				}
				return val + "";
			};
		})

		.filter('naturalNumber', function ($filter) {
			return function (val, precision, round) {
				val = $filter('number')(val, precision, round, true);
				return val;
			};
		})
		// percent
		// 	Filter to convert a displayed value into numeral percentage string
		.filter('percent', function ($filter) {
			return function (val, precision, round) {
				val = stringToNumber(val);
				val *= 100;
				val = $filter('number')(val, precision, round);
				return val + "%";
			};
		})
		//year
		.filter('year', function ($filter) {
			return function (val, precision, round) {
				var lg = getLanguage(),
					word;

				if (lg === 'en') {
					word = 'year';
				} else if (lg === 'fr') {
					word = 'an';
				}

				if (word) {
					val = $filter('number')(val, precision, round);
					val = val + " " + plurializeWordWithNumber(word, val);
				}

				return val;
			};
		})
		.filter('month', function ($filter) {
			return function (val, precision, round) {

				var lg = getLanguage(),
					word;

				if (lg === 'en') {
					word = 'month';
				} else if (lg === 'fr') {
					word = 'mois';
				}

				if (word) {
					val = val * 365.25 / (365.25 / 12);
					val = $filter('number')(val, precision, round);
					val = val + " " + (lg !== 'fr' ? plurializeWordWithNumber(word, val) : word);
				}
				return val;
			};
		})
		.filter('day', function ($filter) {
			return function (val, precision, round) {

				var lg = getLanguage(),
					word;

				if (lg === 'en') {
					word = 'day';
				} else if (lg === 'fr') {
					word = 'jour';
				}

				if (word) {
					val = val * 365.25;
					val = $filter('number')(val, precision, round);
					val = val + " " + plurializeWordWithNumber(word, val);
				}
				return val;
			};
		})
		.filter("moreThanAYear", function ($filter) {
			return function (val, precision, round) {

				val = $filter('number')(val, precision, round);

				if (val < 1) {
					return "< " + $filter('year')(1, precision, round);
				}
				return $filter('year')(val, precision, round);
			};
		})
		//currency
		.filter('currency', function ($filter) {
			return function (val, precision, round) {
				var lg = getLanguage();
				val = $filter('number')(val, precision, round);

				if (lg === 'en') {
					val = "$" + val;
				} else if (lg === 'fr') {
					val = val + "$";
				}
				return val;

			};
		})
		/////////////
		// SERVICE //
		/////////////

		.service("tabData", function () {
			var data = {
				tabList: {

				}
			};

			this.setCurrentTab = function (tabGroupName, tabName) {
				if (typeof tabGroupName === "string" && typeof tabName === "string") {
					tabName = tabName.replaceAll("#", "");
					data.tabList[tabGroupName] = tabName;
					setStoredData(tabGroupName + '-tab', tabName);
					var tabGroupElem = $('[ng-app="br-calc"] [tab-group=' + tabGroupName + ']'),
						currentTabGroupElem = tabGroupElem.filter("[href='#" + tabName + "']"),
						otherTabGroupElem = tabGroupElem.not(currentTabGroupElem);

					currentTabGroupElem.addClass('br-selected');
					otherTabGroupElem.removeClass('br-selected');
				}
			};

			this.getCurrentTab = function (tabGroupName) {
				return data.tabList[tabGroupName];
			};
		})
		// TODO: Remove validation responsibility from scenarios
		// TODO: Replace all older meri input with NEW optimised meri-input
		.service("scenarios", ['contentManager', function (contentManager) {

			var me = this,
				// appScenariosConfig = contentManager.getConfig('scenarios',true);
				appScenariosConfig = contentManager.getConfig('scenarios');

			this.scenarios = {
				model: {

					data: {
						scenarios: [],
						scenarioModel: {
							data: {},
							results: {},
							validation: {},

							validate: validateScenario
						}
					},

					results: {},

					validation: {},

					getScenario: getScenario
				}
			};

			this.getScenario = function (name, index) {
				return me.getScenarios(name).getScenario(index);
			};

			this.getScenarios = function (name) {

				var scenarioFamily = name && me.scenarios[name];
				if (!scenarioFamily) {
					if (name !== undefined && name !== '') {

						if (!me.scenarios[name] && appScenariosConfig[name]) {
							// scenarioFamily = me.scenarios[name] = $.extend(true,{},me.scenarios.model,appScenariosConfig[name]);
							scenarioFamily = me.scenarios[name] = $.extend(true, appScenariosConfig[name], me.scenarios.model);
							createDefaultValidation(scenarioFamily);
						}
					}
				}
				scenarioFamily = me.scenarios[name] = scenarioFamily || $.extend(true, {}, me.scenarios.model);
				return scenarioFamily;
			};

			// Internal methods
			// This => reference to the element from which it is called
			function getScenario(index) {
				var scenario = this.data.scenarios[index];
				if (!scenario) {
					scenario = this.data.scenarios[index] = newScenario(this.data.scenarioModel);
					scenario.data.index = index;
				}
				return scenario;
			}

			function newScenario(model, overridingModel) {

				var scenario = $.extend(true, {}, model || {}, overridingModel || {});
				createDefaultValidation(scenario);

				scenario.resetScenario = getDefaultResetFunction(scenario);

				return scenario;
			}

			function getDefaultResetFunction(defaultModel) {
				var defaultScenario = $.extend(true, {}, defaultModel);
				return function () {
					$.extend(true, this, defaultScenario);
				};
			}

			function resetScenario() {

				var scenario = this.data.scenarios[index];
				if (scenario) {
					scenario = this.data.scenarios[index] = newScenario(this.data.scenarios[index], this.data.scenarioModel);
					scenario.data.index = index;
				}
				return scenario;
			}

			function createDefaultValidation(scenario) {
				var prop;
				// Remains for now in order to be backward compatible.
				// REMOVE when other cals config is modified
				for (prop in scenario.validation) {
					scenario.validation[prop] = factoryValidation(scenario.validation[prop]);
					// scenario.validation[prop].setValue(scenario.data[prop]);
				}
			}

			function validateScenario() {
				var prop;
				for (prop in this.validation) {
					this.validation[prop].triggerValidation();
				}
			}
		}]);

	// {
	// 	currentAge:'sce.data.currentAge',
	// 	8:88,
	// 	'lala':97,
	// 	"yup":[2,4,'trevor',"another"],
	// 	last:{
	// 		currentAge:'sce.data.currentAge',
	// 		8:88,
	// 		'lala':97,
	// 		"yup":[2,4,'trevor',"another"]
	// 	}
	// }
	// 
	// var TESTING = "{currentAge:'sce.data.currentAge',8:88,'lala':97,\"yup\":[2,4,'trevor',\"another\"],last:{currentAge:'sce.data.currentAge',8:88,'lala':97,\"yup\":[2,4,'trevor',\"another\"]}}";

	// function getParseFriendlyString (str,recurrent) {
	// 	var parseFriendlyStr='',
	// 		allSplit = str.split(':'),
	// 		i=0,
	// 		allLen=allSplit.length,
	// 		isProp=true,
	// 		// isValue=false,
	// 		isOpenQuote=false;

	// 	for (;i<allLen;i++) {

	// 	}

	// 	if (!recurrent) {
	// 		parseFriendlyStr = '"' + parseFriendlyStr + '"';
	// 	}

	// 	return parseFriendlyStr;
	// }

	// console.log(getParseFriendlyString(TESTING));

	function customMessageFactory(options) {
		var me = typeof options === 'string' ? {
				message: options
			} : options || {},
			renderedMessage = me.message || '';

		me.message = renderedMessage;
		me.custom = me.custom || {};

		function generateMessage() {
			var m = me.message,
				prop;
			for (prop in me.custom) {
				if (m.indexOf('[' + prop + ']') !== -1) m = m.split('[' + prop + ']').join(me.custom[prop]);
			}
			return m;
		}

		function updateRenderedMessage() {
			renderedMessage = generateMessage();
		}

		function updateCustoms(customs) {
			customs = typeof customs === 'object' && customs !== null && customs || {};
			$.extend(true, me.custom, customs);
		}

		return {
			getMessage: function () {
				return renderedMessage;
			},
			setCustom: function (options) {
				updateCustoms(options);
				updateRenderedMessage();
				return this;
			}
		};
	}


	var factoryValidation = function (c) {
		// Even undefined validation config should get a validation object, as a blank slate for future setup
		var validationConfig = $.extend(true, {
				rules: []
			}, c || {}),
			defaultIsValid = true,
			currentValue,
			rulesDictionnary = {
				readjust: {
					name: 'readjust',
					validate: function (value, validationObject) {
						var bustMin = validationObject.min !== undefined && value < validationObject.min,
							bustMax = validationObject.max !== undefined && value > validationObject.max;
						if (bustMin || bustMax) {
							if (bustMin) this.correctedValue = validationObject.min;
							if (bustMax) this.correctedValue = validationObject.max;
						}

						return !(bustMin || bustMax);
					},
					message: '{{ content.errors.readjust }}'
				},
				default: {
					name: 'default',
					validate: function () {
						return defaultIsValid;
					},
					message: '{{ content.errors.default }}',
					priority: 0 // 0 = no rule priority, 1 = highest priority, 2 = lower priority, etc.
				}
			},
			ngModelCtrl; // needed in order to programatically trigger ngModel validator

		function generateError(value, validationObject) {
			return {
				name: validationObject.currentRule.name,
				message: customizeMessage(validationObject, validationObject.currentRule),
				value: currentValue
			};
		}

		function customizeMessage(validationObject, rule) {
			var message = rule.message,
				customize = rule.customize,
				key,
				prop;

			if (customize) {
				for (prop in customize) {
					key = '[' + prop + ']';
					message = message.split(key).join(getItemAtPath(customize[prop], validationObject) + '');
				}
			}
			return message;
		}

		// Validate and set default values
		function validateRulesConfig() {

			var i = 0,
				len = validationConfig.rules && validationConfig.rules.length || 0,
				rule,
				dictRule;

			if (!len && c.validation !== false) {
				// When setting validation rules, if no rule is set AND validation=false not specified,
				// assume default validation readjust
				// validationConfig.rules.push('readjust');
				validationConfig.rules.push(rulesDictionnary.readjust);
				len = 1;
			} else if (c.validation === false) {
				validationConfig.rules.push(rulesDictionnary.default);
				len = 1;
			}

			for (; i < len; i++) {
				rule = validationConfig.rules[i];

				dictRule = rulesDictionnary[rule.name || ''];
				// Validate function && name
				if (typeof rule === 'string' && rulesDictionnary[rule]) {
					rule = validationConfig.rules[i] = rulesDictionnary[rule];
				} else if (typeof rule.validate === 'string' && rulesDictionnary[rule.validate]) {
					if (rule.name === undefined) {
						rule.name = rulesDictionnary[rule.validate].name;
					}
					if (rule.priority === undefined) {
						rule.priority = rulesDictionnary[rule.validate].priority || rulesDictionnary.default.priority;
					}
					if (rule.message === undefined) {
						rule.message = rulesDictionnary[rule.validate].message || rulesDictionnary.default.message;
					}
					rule.validate = rulesDictionnary[rule.validate].validate;
				} else if (!rule.validate || typeof rule.validate !== 'function') {
					rule.validate = dictRule && dictRule.validate || rulesDictionnary.default.validate;
				}
				// Priority
				if (rule.priority === undefined) {
					rule.priority = rulesDictionnary.default.priority;
				} else if (typeof rule.priority !== 'number') {
					if (typeof rule.priority !== 'string') {
						rule.priority = rulesDictionnary.default.priority;
					} else {
						rule.priority = stringToNumber(rule.priority);
					}
				}
				// Message
				if (rule.message === undefined) {
					rule.message = dictRule && dictRule.message || rulesDictionnary.default.message;
				} else {
					rule.message = rule.message + '';
				}
				// Autocorrect
				if (rule.autocorrect === undefined) {
					rule.autocorrect = true;
				}
			}
		}

		// Validation filters
		function organiseByPriority() {
			validationConfig.rules = validationConfig.rules.sort(function (a, b) {
				return (a.priority || 9999999) - (b.priority || 9999999);
			});
		}

		function removeRule(name) {
			validationConfig.rules = validationConfig.rules.filter(function (a) {
				return a.name !== name;
			});
		}

		function getRuleByName(name) {
			return validationConfig.rules.filter(function (a) {
				return a.name === name;
			})[0];
		}

		// Refresh
		function refresh() {
			validateRulesConfig();
			organiseByPriority();
		}

		function setModel(modelCtrl) {
			if (modelCtrl && modelCtrl.$setDirty) {
				ngModelCtrl = modelCtrl;
			}
		}

		function setValue(value) {
			currentValue = value;
		}

		function addRule(rule) {
			var i = 0;
			if (rule && rule.name) {
				for (; i < validationConfig.rules.length; i++) {
					if (validationConfig.rules[i].name === rule.name) {
						$.extend(true, validationConfig.rules[i], rule);
						return;
					}
				}
			}
			validationConfig.rules.push(rule);
		}

		refresh();

		return {
			triggerValidation: function () {
				if (ngModelCtrl && ngModelCtrl.$validate && currentValue !== undefined) {

					// Because validating an unchanged field "invalidates" the value from angular's point of view,
					// modelValue sent back to the data is "undefined".
					// In order to prevent this, ng-model-options allowInvalid must be set to "true".
					// meri-input elements are set to support this.
					if (ngModelCtrl.$options === null || ngModelCtrl.$options === undefined) {
						ngModelCtrl.$options = {};
					}
					if (!ngModelCtrl.$options.allowInvalid) ngModelCtrl.$options.allowInvalid = true;

					ngModelCtrl.$validate();
				}
				return this;
			},

			setModel: function (modelCtrl) {
				setModel(modelCtrl);
				return this;
			},

			setValue: function (value) {
				setValue(value);
				return this;
			},

			set: function (propName, value, revalidate) {
				propName = propName !== undefined && propName !== 'rules' && propName + '' || '';
				validationConfig[propName] = value;
				if (revalidate === true) {
					return this.validate(currentValue);
				} else {
					return this;
				}
			},

			validate: function (value) {
				// console.log('validate', value, validationConfig.rules);
				var i = 0,
					len = validationConfig.rules.length,
					rule,
					isValid = true,
					reducedValidationConfig;

				this.setValue(value);

				for (; i < len; i++) {
					rule = validationConfig.rules[i];
					reducedValidationConfig = $.extend(true, {}, validationConfig, {
						currentRule: rule
					});
					// Autocorrect state is set to the whole validation object
					reducedValidationConfig.autocorrect = rule.autocorrect;

					isValid = rule.validate(currentValue, reducedValidationConfig);
					if (isValid !== true) {
						if (rule.autocorrect) setValue(rule.correctedValue !== undefined ? rule.correctedValue : value);
						isValid = generateError(currentValue, reducedValidationConfig);
						break;
					}
				}
				return isValid;
			},

			addRule: function (rule) {
				// console.log('addRule',rule);
				addRule(rule);
				refresh();
				// console.log('after addRule',validationConfig.rules);
				return this;
			},

			removeRule: function (name) {
				if (name && typeof name === 'string' && name !== '') removeRule(name);
				return this;
			},

			refresh: function () {
				refresh();
				return this;
			},

			hasRule: function (name) {
				return name !== undefined && getRuleByName(name).length || false;
			},

			// get : function (prop) {
			// 	return validationConfig[prop];
			// },

			trace: function () {
				console.log('DEBUG VALIDATOR', rulesDictionnary.readjust.rand);
				console.log('validationConfig', $.extend(true, {}, validationConfig));
				console.log('rules', $.extend(true, {}, validationConfig).rules);
				console.log('END DEBUG VALIDATOR', currentValue);

				return rulesDictionnary.readjust.rand;
			}
		};
	};

	window.getChangedPropertyName = function (oldData, newData) {
		var prop,
			changedValueProp;
		for (prop in newData) {
			if (typeof newData[prop] === 'object' && typeof oldData[prop] === 'object') {
				changedValueProp = getChangedPropertyName(oldData[prop], newData[prop]);
				if (typeof changedValueProp === 'string') return changedValueProp;
			} else if (oldData[prop] === undefined || oldData[prop] !== newData[prop]) {
				return prop;
			}
		}
		return false;
	};

	window.formatGeneral = function (v, p, lang) {
		p = p >> 0;
		var s1 = '',
			s2 = '',
			nbr = String.fromCharCode(160),
			t = lang == 'fr' ? nbr : ',',
			c = lang == 'fr' ? ',' : '.';

		v = isNaN(v = parseFloat("" + v)) ? 0 : v;
		v = v.toFixed(p !== undefined ? p : 2).split('.');
		v[0] = v[0].replace(/(\d)(?=(\d{3})+\b)/g, '$1' + t);

		return (s1 || '') + v.join(c) + (s2 || '');
	};

	window.plurializeWordWithNumber = function (word, num) {
		var lg = getLanguage();
		num = typeof num !== 'number' ? stringToNumber(num) : num;
		if (lg === 'fr' && num > 1) word = word + "s";
		else if (lg === 'en' && num !== 1) word = word + "s";
		return word;
	};

	window.setStoredData = function (key, val) {
		if (window.localStorage) window.localStorage.setItem(key, val);
	};

	window.getStoredData = function (key) {
		return window.localStorage && window.localStorage.getItem(key);
	};

	/* Extension od the string class */
	/* Method that replace all the found string by another one */
	// String.prototype.replaceAll = function (find, replace) {
	//     var str = this;
	//     return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&amp;'), 'g'), replace);
	// };

	String.prototype.replaceAll = function (search, replacement) {
		var target = this;
		replacement = replacement || "";
		return target.replace(new RegExp(search, 'g'), replacement);
	};

	String.prototype.toCamelCase = function (str) {
		return (str || this)
			.replaceAll("-", " ")
			.replaceAll("_", " ")
			.replace(/\s(.)/g, function ($1) {
				return $1.toUpperCase();
			})
			.replace(/\s/g, '')
			.replace(/^(.)/, function ($1) {
				return $1.toLowerCase();
			});
	};

	window.getCurrentPrefix = function (url) {
		var prefix = url.split('/');
		if (prefix.length > 1) {
			prefix.pop();
		}
		prefix = prefix.join('/').split('\\');
		if (prefix.length > 1) {
			prefix.pop();
		}
		prefix = prefix.join('\\');
		return prefix;
	};

	window.stringToStringNumber = function (value) {
		if (typeof value === "string") {
			value = value.replaceAll("%", "");
			value = value.replaceAll("$", "");
			value = value.replaceAll(" ", "");
		}
		return value;
	};

	/* Method that convert a string into a valid number */
	window.stringToNumber = function (value) {
		var parsed = parseFloat(value);
		if (!isNaN(parsed)) {
			if (typeof value === 'string') {
				value = parseFloat(value.split(',').join(''));
			} else {
				value = parsed;
			}
		} else {
			value = 0;
		}
		return value;
	};

	/* Filter method to use with arrays */
	window.onlyUnique = function (value, index, self) {
		return self.indexOf(value) === index;
	};

	window.getDataAtScope = function (ngModel, scope) {
		var ngModelSplitted,
			len,
			count = 0,
			obj = scope,
			key,
			isLast,
			value;

		ngModel = ngModel || "";
		if (ngModel) {
			ngModelSplitted = ngModel.split(".");
			len = ngModelSplitted.length;
			for (; count < len; count++) {
				isLast = count + 1 === len;
				key = ngModelSplitted[count];
				if (isLast && obj) {
					value = obj[key];
					break;
				}
				if (obj) {
					obj = obj[key];
				}
			}
		}
		return value;
	};

	window.setDataToScope = function (ngModel, scope, value, $injector) {
		var ngModelSplitted,
			len,
			count = 0,
			obj = scope,
			key,
			isLast,
			prev,
			service;

		ngModel = ngModel || "";
		if (ngModel) {

			ngModelSplitted = ngModel.split(".");
			len = ngModelSplitted.length;
			if ($injector) {
				service = $injector.get(ngModelSplitted[0]);
				if (service) {
					obj = service;
					count++;
				}
			}

			for (; count < len; count++) {

				isLast = count + 1 === len;
				key = ngModelSplitted[count];

				if (isLast && obj) {

					obj[key] = value;

					if (!scope.$$phase) {
						scope.$apply();
					}
				}
				if (obj) {
					obj = obj[key] || {};
				}
				prev = key;
			}
		}
	};
})($cmsj, $cmsj);
(function($,jQuery){
brCalc.controller('mortgagePaymentCalculatorCtrl', function($scope,scenarios,contentManager) {
	// Get the scenarios reference, including data, results and validation objects
	this.mortgagePaymentData = scenarios.getScenarios('mortgagePaymentData');
	// Set the content for the tool (language-dependant content found in config)
	this.content = contentManager.setContent(threeInOneDataContent.mortgagePayment,'mortgagePayment').getContent('mortgagePayment');
	// Get the fieldspecs from the config
	// (HAS to be fetched AFTER setting all the content; fieldspecs have content to be updated)
	this.specs = contentManager.getConfig('fieldspecs.mortgagePayment');
});
})($cmsj,$cmsj);
(function($,jQuery){
brCalc.controller('mortgagePaymentScenarioCtrl', function($scope,scenarios,$attrs,$filter,contentManager) {
	var me = this,
		scenario = $scope.mpc.mortgagePaymentData.getScenario($attrs.scenarioIndex),
		content = $scope.mpc.content,

		paymentFrequencyGlobals = contentManager.getConfig('globals.paymentFrequency'),

		specs = $scope.config.fieldspecs.mortgagePayment,
		paymentFrequencyOptions = specs.paymentFrequency.options,
		extraPaymentFrequencyOptions = specs.extraPaymentFrequency.options,
		productAndTypeOptions = specs.productAndType.options;

	this.data = scenario.data;

	this.data.scenarioIndex = $attrs.scenarioIndex;
	this.results = scenario.results;
	this.validation = scenario.validation;

	initChartMPC();

	initValidation();

	$scope.$watchCollection("sce.data",startCalculate,true);
	
	$scope.toggleExtraPayments = function(){
		me.data.showExtra = !(me.data.showExtra===true);
	};

	// Is this used somewhere?/////
	// me.getCurrent = function(){
	// 	return scenario.results.current;
	// };
	///////////////////////////////
	
	// Set custom validation
	function initValidation () {
		if (me.validation===undefined) return;

		var matchPaymentFrequencyValidation = {
			name:'matchPaymentFrequency',
			validate:function(value,validationObject){

				validationObject.matchingValue = validationObject.matchingValue || 'paymentFrequency';

				if (validationObject.matchingValue === 'paymentFrequency') {
					if (value === 'annual' || value === 'oneTime') return true;

					this.correctedValue = me.data.paymentFrequency;
					return me.data.paymentFrequency === value;
				}
				else if (validationObject.matchingValue === 'extraPaymentFrequency') {
					if (me.data.extraPaymentFrequency === 'annual' || me.data.extraPaymentFrequency === 'oneTime') return true;

					this.correctedValue = me.data.extraPaymentFrequency;
					return me.data.extraPaymentFrequency === value;
				}
			},
			message:'{{ content.errors.mortgage_matchPaymentFrequency }}',
			priority:1
		};

		// B11 part 3
		me.validation.extraPaymentAmount.addRule({
			name: 'prePaymentIncreaseOver20Percent',
			validate: function (value, validationObject) {
				if (me.data.extraPaymentFrequency !== 'annual') {
					if (value > me.results.current.mortgagePayment * 0.2) {
						this.correctedValue = me.results.current.mortgagePayment * 0.2;
						return false;
					}
				}
				return true;
			},
			message: content.errorMessages.prePaymentIncreaseOver20Percent,
			priority: 1
		});
		me.validation.mortgageAmount.addRule({
			name: 'mortgagePaymentTooLowForPrePayment',
			validate: function (value, validationObject) {
				var annuityFactor = getAnnuityFactor(me.data),
				// getMortgagePayment( data, results ) -> fake/calculate minimal data & results because actual results haven't been updated yet.
					paymentAmount = getMortgagePayment({mortgageAmount:value},{annuityFactor:annuityFactor});

				if (me.data.extraPaymentFrequency !== 'annual') {
					if (me.data.extraPaymentAmount > paymentAmount * 0.2) {
						this.correctedValue = getMortgageAmountFromPayment({mortgagePayment: me.data.extraPaymentAmount / 0.2, annuityFactor:annuityFactor});
						return false;
					}
				}
				return true;
			},
			message: content.errorMessages.mortgagePaymentTooLowForPrePayment,
			priority: 1
		});

		// B11 part 2
		me.validation.extraPaymentAmount.addRule({
			name:'annualPrePaymentOver20Percent',
			validate: function (value, validationObject) {

				var annualPrincipalPrepayment = getAnnualPrincipalPrepayment(value),
					paymentFrequencyNumber;

				if (annualPrincipalPrepayment > me.data.mortgageAmount * 0.2) {
					annualPrincipalPrepayment = me.data.mortgageAmount * 0.2;
					paymentFrequencyNumber = getPaymentFrequencyDetails(extraPaymentFrequencyOptions, me.data.extraPaymentFrequency).frequencyNumber_365;
					
					this.correctedValue = annualPrincipalPrepayment/paymentFrequencyNumber;

					return false;
				}
				return true;
			},
			message: content.errorMessages.annualPrePaymentOver20Percent,
			priority:1
		});
		me.validation.mortgageAmount.addRule({
			name:'mortgageAmountTooLowForAnnualPrePayment',
			validate: function (value, validationObject) {

				var annualPrincipalPrepayment = getAnnualPrincipalPrepayment(me.data.extraPaymentAmount);

				if (annualPrincipalPrepayment > value * 0.2) {
					this.correctedValue = annualPrincipalPrepayment / 0.2;
					return false;
				}
				return true;
			},
			message: content.errorMessages.mortgageAmountTooLowForAnnualPrePayment,
			priority:1
		});
		// B11 part 1
		me.validation.extraPaymentFrequency.set('matchingValue','paymentFrequency').addRule(matchPaymentFrequencyValidation);
		me.validation.paymentFrequency.set('matchingValue','extraPaymentFrequency').addRule(matchPaymentFrequencyValidation);

	}

	function startCalculate(newData,oldData,scope){

		var changedDataName = getChangedPropertyName(oldData,newData);
		
		if (changedDataName==='productAndType') {
			// update interestRate field
			// TODO: Update this to match Meridian Rates.getAll();
			// 	waiting on Meridian to give us the associated rates
			me.data.interestRate = getSelectOption(productAndTypeOptions,stringToNumber(me.data.productAndType)).defaultInterestRate;
		}

		else if (changedDataName==='paymentFrequency') {
			// update interestRate field
			// TODO: Update this to match Meridian Rates.getAll();
			// 	waiting on Meridian to give us the associated rates
			me.validation.extraPaymentFrequency.set('matchingValue',newData.paymentFrequency);
		}

		// Do NOT invalidate fields the user is not currently working on.
		// Instead, create rules on the current field which invalidates the out-of-focus field, and create the error there instead.
		// scenario.validate();

		calculate();
	}

	// C17 - OPTIONAL extraPaymentAmount
	function getAnnualPrincipalPrepayment (extraPaymentAmount) {
		var paymentFrequencyNumber = getPaymentFrequencyDetails(extraPaymentFrequencyOptions, me.data.extraPaymentFrequency).frequencyNumber_365;
		return (extraPaymentAmount || me.data.extraPaymentAmount) * paymentFrequencyNumber;
	}

	function getPaymentFrequencyDetails (options,paymentFrequency) {
		return getSelectOption(options, paymentFrequency);
	}
	
	function calculate(p){
		// console.log('calculate');
		var results = {},
			data = me.data;

		results.productAndTypeYears = getSelectOption(productAndTypeOptions,stringToNumber(data.productAndType)).termYears;

		//=SI(B6="Monthly";12;(SI(B6="Semi Monthly";24;SI(B6="Bi-Weekly";365/14;SI(B6="Weekly";365/7;SI(B6="Accel BiWeekly";365/14;SI(B6="Accel Weekly";365/7)))))))
		
		results.paymentFrequency = p !== undefined ? p : getPaymentFrequencyDetails(paymentFrequencyOptions, data.paymentFrequency);

		results.paymentFrequencyLabel = results.paymentFrequency.label;
		results.extraPaymentFrequencyLabel = getSelectOption(extraPaymentFrequencyOptions,data.extraPaymentFrequency).label;

		results.oneTimePrepayment = data.extraPaymentFrequency === paymentFrequencyGlobals.ONE_TIME ? data.extraPaymentAmount : 0;
		results.annualPrepayment = data.extraPaymentFrequency === paymentFrequencyGlobals.ANNUAL ? data.extraPaymentAmount : 0;
		results.increasePaymentBy = data.extraPaymentFrequency !== paymentFrequencyGlobals.ONE_TIME && data.extraPaymentFrequency !== paymentFrequencyGlobals.ANNUAL ? data.extraPaymentAmount : 0;

		//=((1-((1+(B5/2))^(2/(365/7)) )^(-(365/7)*B4))/((1+(B5/2))^(2/(365/7)) -1))
		//=((1-(opp1^opp2)^(-(results.paymentFrequencyNumber)*data.amortization))/(opp1^opp2 -1))
		
		results.annuityFactor = getAnnuityFactor(data, results.paymentFrequency);

		// B22 - hard coded in Excel
		results.paymentTopUps = false;
		// B23 - hard coded in Excel
		results.paymentTopUpsAmount = 0;

		results.includePromotion = false;//?who set that?
		results.promotionInterestRate = 0.02;//?who set that?
		results.promotionExtraPayment = 0;//?who set that?

		results.mortgagePayment = getMortgagePayment(data,results);

		results.numberOfPaymentTerms = results.productAndTypeYears * results.paymentFrequency.frequencyNumber_365 ;

		results.monthlyMortgagePayment = results.mortgagePayment * results.paymentFrequency.frequencyNumber_365 / 12;
		
		//=((1+(B5/2))^(2/(C6))-1)
		results.paymentInterestRate = Math.pow(1+(data.interestRate/2),2/results.paymentFrequency.frequencyNumber_365)-1;

		results.paymentList = [];
		results.annualPaymentList = [];
		results.termPaymentList = [];

		results.amortizationInterest = 0;
		results.amortizationPrincipal = 0;
		results.amortizationInterestAndPrincipal = 0;
			
		results.termInterest = 0;
		results.termPrincipal = 0;
		results.termInterestAndPrincipal = 0;
		results.balanceAtEndOfTerm = 0;
			
		var balanceLeft = data.mortgageAmount,
			maxItt = 11111,
			count = 1,
			obj,
			yearObj,
			prevObj,
			termCompleted = false;

		while(maxItt !== 0 && balanceLeft > 0){
			maxItt--;

			obj = {};
			results.paymentList.push(obj);

			obj.term = count;
			obj.year = parseInt((obj.term-1)/results.paymentFrequency.frequencyNumber_365,10);
			obj.interestRate = results.paymentInterestRate;
			//=SI(M3<J3;M3+K4;J3)
			if(prevObj){
				obj.interest = prevObj.balance < 0 ? 0 : prevObj.balance * obj.interestRate;

				obj.payment = prevObj.balance < prevObj.payment ? prevObj.balance + obj.interest : prevObj.payment;
				
			}else{
				obj.payment = results.mortgagePayment;
				obj.interest = data.mortgageAmount * obj.interestRate;
			}
			obj.principal = obj.payment - obj.interest;
			
			//=B10+SI(Z2="Yes";Z4;0)
			
			//=SI(F3=1;0;SI(C$9=1;SI(G4-G3>0;B$10;0);SI(C$9=2;0;B$10)))

			if(!prevObj){
				if(results.includePromotion){
					obj.extraPayment += results.promotionExtraPayment;
				}
				obj.extraPayment = data.extraPaymentAmount;
			}else if(obj.paidOff){
				obj.extraPayment = 0;
			}else{
				if(data.extraPaymentFrequency === paymentFrequencyGlobals.ANNUAL){
					if(obj.year > prevObj.year){
						obj.extraPayment = data.extraPaymentAmount;
					}else{
						obj.extraPayment = 0;
					}
					
				}else if(data.extraPaymentFrequency === paymentFrequencyGlobals.ONE_TIME){

					obj.extraPayment = 0;
				}else{
					obj.extraPayment = data.extraPaymentAmount;
				}
			}
			

			balanceLeft = obj.balance = balanceLeft - obj.principal - obj.extraPayment;

			obj.termCompleted = obj.term >= results.numberOfPaymentTerms;
			obj.paidOff = obj.balance === 0;

			
			results.amortizationInterest += obj.interest;
			/* ERROR - the following is a little bit off */
			results.amortizationPrincipal += obj.principal;
			results.amortizationInterestAndPrincipal = results.amortizationInterest + results.amortizationPrincipal;
			
			if(!obj.termCompleted){
				results.termInterest = results.amortizationInterest ;
				results.termPrincipal = results.amortizationPrincipal ;
				results.termInterestAndPrincipal = results.termInterest + results.termPrincipal;
				results.balanceAtEndOfTerm = obj.balance;
			}

			/* year obj */
			if(prevObj){
				if(prevObj.year !== obj.year){
					yearObj = $.extend(true,{},obj);
					results.annualPaymentList.push(yearObj);
					if(!obj.termCompleted){
						results.termPaymentList.push(yearObj);
					}
				}else{
					yearObj.payment+=obj.payment;
					yearObj.interest+=obj.interest;
					yearObj.principal+=obj.principal;
					yearObj.extraPayment+=obj.extraPayment;
					yearObj.balance=obj.balance;
				}
			}else{
				yearObj = $.extend(true,{},obj);
				results.annualPaymentList.push(yearObj);
				if(!obj.termCompleted){
					results.termPaymentList.push(yearObj);
				}
			}
			count++;
			prevObj = obj;
		}

		results.amortizationInterestSavings = 0;

		results.paymentAmortization = results.annualPaymentList.length;

		me.results.resultsByPaymentOption[results.paymentFrequency.value] = results;

		/* Here we are doing the calculation for all the payment options */
		var pOptLoop = 0,
			pOptLen = paymentFrequencyOptions.length,
			pOpt,
			otherResult,
			monthlyResult,
			currentResults,
			x;
		if(p===undefined){
			me.results.current = results;

			for (; pOptLoop < pOptLen; pOptLoop++) {
				pOpt = paymentFrequencyOptions[pOptLoop];
				if(pOpt.value!==results.paymentFrequency.value){
					otherResults = calculate(pOpt);
				}
			}

			monthlyResult = me.results.resultsByPaymentOption.monthly;

			for (x in me.results.resultsByPaymentOption) {
				currentResults = me.results.resultsByPaymentOption[x];

				currentResults.amortizationInterestSavings = monthlyResult.amortizationInterest - currentResults.amortizationInterest;
			}
			
			if (results.paymentFrequency.value !== paymentFrequencyGlobals.MONTHLY) {
				updateHighchart([getSelectOption(paymentFrequencyOptions,paymentFrequencyGlobals.MONTHLY),results.paymentFrequency]);
			}
			else {
				updateHighchart([getSelectOption(paymentFrequencyOptions,paymentFrequencyGlobals.ACCELERATED_WEEKLY),results.paymentFrequency]);
			}
			
		}
		return results;
	}

	function updateHighchart(compareList){
		var data = me.data,
			results = me.results,
			config = $.extend(true,{},me.results.chartMPC),
			categories = [],
			series = [],
			i=0,
			j=0,
			paymentOptions = results.resultsByPaymentOption,
			val;

		for(;i<data.amortization;i++){

			for (j=0;j<compareList.length;j++) {

				if (!series[j]) {
					series[j] = {
						name:compareList[j].label,
						data:[],
						annualPaymentList:paymentOptions[compareList[j].value]&&paymentOptions[compareList[j].value].annualPaymentList
					};
				}
				val = series[j].annualPaymentList[i]&&series[j].annualPaymentList[i].balance||0;
				series[j].data.push(val);

				if ( i+1>=data.amortization ) {
					delete series[j].annualPaymentList;
				}
			}
			categories[i] = i + 1;
		}
		
		config.xAxis.categories = categories;
		config.series = series;
		
		me.results.chartMPC = config;
	}

	// chartMPC - Custom formatting
	function initChartMPC () {
		me.results.chartMPC = (function(){
			var config = contentManager.getHighchartConfig('chartMPC');
			// Tooltip formatting
			config.tooltip.formatter = function(){
				var str=$scope.content.units.year,
					i=0,
					pts=this.points,
					len=pts.length;

				str = '<strong>'+str[0].toUpperCase()+str.slice(1);
				str += ' '+this.x+'</strong><br/>';
				for (;i<len;i++) {
					str+='<strong>'+pts[i].series.name+'</strong>: '+$filter('currency')(pts[i].y,2)+'<br/>';
				}
				return str;
			};
			return config;
		})();
	}

	// B17
	// =ROUND(IF(B22="YES";(B2/B16)+B23;(B2/B16));2)
	function getMortgagePayment(data,results){
		var mortgagePayment = data.mortgageAmount/ results.annuityFactor;
		if(results.paymentTopUps){
			mortgagePayment += results.paymentTopUpsAmount;
		}
		return Formula.ROUND(mortgagePayment,2);
	}
	// B17 - Reverse engineer mortgageAmount (for validation correction)
	// =ROUND(IF(B22="YES";(B2/B16)+B23;(B2/B16));2)
	function getMortgageAmountFromPayment(results){
		var mortgagePayment = results.mortgagePayment;
		if(results.paymentTopUps){
			mortgagePayment -= results.paymentTopUpsAmount;
		}
		return Formula.ROUND(mortgagePayment * results.annuityFactor,2);
	}

	function getAnnuityFactor(data,paymentFrequency){
		paymentFrequency = paymentFrequency!==undefined ? paymentFrequency : getSelectOption(paymentFrequencyOptions,data.paymentFrequency);

		var multiplier = 1,
			opp1,opp2,pow1;

		if(paymentFrequency.value === paymentFrequencyGlobals.ACCELERATED_BI_WEEKLY){
			multiplier = 2;
			paymentFrequency = getSelectOption(paymentFrequencyOptions,paymentFrequencyGlobals.MONTHLY);
		}else if(paymentFrequency.value === paymentFrequencyGlobals.ACCELERATED_WEEKLY){
			multiplier = 4;
			paymentFrequency = getSelectOption(paymentFrequencyOptions,paymentFrequencyGlobals.MONTHLY);
		}

		opp1 = 1+(data.interestRate/2);
		opp2 = 2/paymentFrequency.frequencyNumber_365;
		pow1 = Math.pow(opp1,opp2);

		return ((1-Math.pow(pow1,(-(paymentFrequency.frequencyNumber_365)*data.amortization)))/(pow1 -1)) * multiplier;
	}
});
})($cmsj,$cmsj);
(function($,jQuery){
brCalc.controller('mortgagePaymentScenarioResultsCtrl', function($scope,scenarios,$attrs) {
	var scenario = scenarios.getScenario('mortgagePaymentData',$attrs.scenarioIndex);

	this.data = scenario.data;
	this.data.scenarioIndex = $attrs.scenarioIndex;
	this.results = scenario.results;
});
})($cmsj,$cmsj);
(function($,jQuery){
brCalc.controller('mortgagePaymentScenarioReportCtrl', function($scope,scenarios,$attrs,$filter,contentManager) {
	var me = this,
		scenariosData = scenarios.getScenarios('mortgagePaymentData');
	this.scenarios = scenariosData.data.scenarios;
	this.results = scenariosData.results;

	initChart();
	updateHighchart();

	function initChart() {
		me.results.compareGraphConfig = (function(){
			var config = contentManager.getHighchartConfig('chartCompareMPC');
			
			// Tooltip formatting
			config.tooltip.formatter = function(){
				var str=$scope.content.units.year,
					i=0,
					pts=this.points,
					len=pts.length;

				str = '<strong>'+str[0].toUpperCase()+str.slice(1);
				str += ' '+this.x+'</strong><br/>' 
				for (;i<len;i++) {
					str+='<strong>'+pts[i].series.name+'</strong>: '+$filter('currency')(pts[i].y,2)+'<br/>';
				}
				return str;
			};

			return config;

		})();
	}

	function updateHighchart(){
		var scenarios = me.scenarios,
			len = scenarios.length,
			scResults = [],
			maxAmortization = 0,
			config = angular.extend({},me.results.compareGraphConfig),
			categories = [],
			series = [],
			i=0,
			j=0,
			val;

		for (;i<len;i++) {
			scResults.push(scenarios[i].results.current);
			maxAmortization = maxAmortization<scResults[i].paymentAmortization?scResults[i].paymentAmortization:maxAmortization;
		}

		for(i=0;i<maxAmortization;i++){

			for (j=0;j<scResults.length;j++) {

				if (!series[j]) {
					series[j] = {
						name:$scope.mpc.content.compareScenarios['scenario_'+j].name,
						color:$scope.mpc.content.compareScenarios['scenario_'+j].color,
						data:[],
						annualPaymentList:scResults[j].annualPaymentList
					};
				}
				val = series[j].annualPaymentList[i]&&series[j].annualPaymentList[i].balance||0;
				series[j].data.push(val);

				if ( !(i+1<maxAmortization) ) {
					delete series[j].annualPaymentList;
				}
			}
			categories[i] = i + 1;
		}
		
		config.xAxis.categories = categories;
		config.series = series;
		
		me.results.compareGraphConfig = config;
	}

});
})($cmsj,$cmsj);
(function($,jQuery){
brCalc.controller('lineOfCreditCalculatorCtrl', function($scope, scenarios, contentManager) {
	// Get the scenarios reference, including data, results and validation objects
	this.lineOfCreditData = scenarios.getScenarios('lineOfCreditData');
	// Set the content for the tool (language-dependant content found in config)
	this.content = contentManager.setContent(threeInOneDataContent.lineOfCredit,'lineOfCredit').getContent('lineOfCredit');
	// Get the fieldspecs from the config
	// (HAS to be fetched AFTER setting all the content; fieldspecs have content to be updated)
	this.specs = contentManager.getConfig('fieldspecs.lineOfCredit');

	this.isOpenAmortizationTable = false;

});
})($cmsj,$cmsj);
(function($,jQuery){
brCalc.controller('lineOfCreditScenarioCtrl', function($scope,$attrs,scenarios,$filter,contentManager) {
		var me = this,
			scenario = $scope.loc.lineOfCreditData.getScenario($attrs.scenarioIndex),

			PERSONAL_LOAN = 'personalLoan',
			LINE_OF_CREDIT = 'lineOfCredit',

			BORROW_REASON = 'borrowReason',

			content = $scope.loc.content,

			specs = $scope.config.fieldspecs.lineOfCredit,

			paymentFrequencyOptions = specs.paymentFrequency.options;

		this.data = scenario.data;
		this.data.scenarioIndex = $attrs.scenarioIndex;
		this.results = scenario.results;
		this.validation = scenario.validation;

		this.highcharts = {};

		initChart();

		$scope.$watchCollection("sce.data",preProcessWatch,true);
		$scope.showModal = false;

		function preProcessWatch ( newData, oldData, scope ) {

			var changedDataName = getChangedPropertyName(oldData,newData);

			if (changedDataName==='repaymentDetails') {

				// if borrow reasons are different between personalLoan and lineOfCredit switch
				if (newData[BORROW_REASON+'_'+PERSONAL_LOAN] !== newData[BORROW_REASON+'_'+LINE_OF_CREDIT]) {
					// AND if the previous borrow reason exists in the new personalLoan/lineOfCredit
					if ( getSelectOption(specs[BORROW_REASON+'_'+newData.repaymentDetails].options, oldData[BORROW_REASON+'_'+oldData.repaymentDetails]) ) {
						// change borrowReason(personalLoan/lineOfCredit) to match
						me.data[BORROW_REASON+'_'+newData.repaymentDetails] = me.data[BORROW_REASON+'_'+oldData.repaymentDetails]
					}

				}
			}

			calculate();
		}
		
		function calculate(){
			var results = {},
				data = me.data;
			
			/* calculation of the minimum monthly payment */

			results.paymentFrequency = getSelectOption(paymentFrequencyOptions,data.paymentFrequency);
			results.periods = data.amortization * results.paymentFrequency.frequencyNumber;

			// TEXT RESULTS for display
			results.borrowReason = getSelectOption(specs[BORROW_REASON+'_'+data.repaymentDetails].options, data[BORROW_REASON+'_'+data.repaymentDetails]);

			if(data.repaymentDetails === PERSONAL_LOAN){

				results.scenarioName = content.scenarioTypes.personalLoan.name;

				results.minimumMonthlyPayment = Formula.PMT(data.interestRate / results.paymentFrequency.frequencyNumber, results.periods,-data.borrowAmount,0,0);
				
				results.interestCostForTurn = Formula.ROUND(results.minimumMonthlyPayment,2) * results.paymentFrequency.frequencyNumber * data.amortization - data.borrowAmount;
			}
			else if(data.repaymentDetails === LINE_OF_CREDIT){

				results.scenarioName = content.scenarioTypes.lineOfCredit.name;

				results.minimumMonthlyPayment = data.borrowAmount * data.interestRate / 12;
				
			}
			
			results.paymentList = [];
			results.annualPaymentList = [];

			var balanceLeft = data.borrowAmount,
				maxItt = 11111,
				count = 1,
				obj,
				yearObj,
				prevObj,
				termCompleted = false;

			while(maxItt !== 0 && balanceLeft > 0){
				maxItt--;

				obj = {};
				results.paymentList.push(obj);

				obj.term = count;
				obj.year = parseInt((obj.term-1)/results.paymentFrequency.frequencyNumber,10);

				obj.payment = results.minimumMonthlyPayment;

				obj.interest = balanceLeft * data.interestRate / results.paymentFrequency.frequencyNumber;
				obj.principal = obj.payment - obj.interest;
				balanceLeft -= obj.principal;
				obj.balance = balanceLeft;
				//console.log("obj",obj);

				if(prevObj){
					if(prevObj.year !== obj.year){
						yearObj = $.extend(true,{},obj);
						results.annualPaymentList.push(yearObj);
					}else{
						yearObj.payment+=obj.payment;
						yearObj.interest+=obj.interest;
						yearObj.principal+=obj.principal;
						yearObj.balance=obj.balance;
					}
				}else{
					yearObj = $.extend(true,{},obj);
					results.annualPaymentList.push(yearObj);
				}

				count++;
				prevObj = obj;
			}

			me.results.current = results;
			
			updateHighchart();

			return results;
		}

		function initChart() {
			me.results.chartLOC = (function(){

				var config = contentManager.getHighchartConfig('chartLOC');

				// Tooltip formatting
				config.tooltip.formatter = function(){
					// console.log(this);
					var str=$scope.content.units.year,
						i=0,
						pts=this.points,
						len=pts.length;

					str = '<strong>'+str[0].toUpperCase()+str.slice(1);
					str += ' '+this.x+'</strong><br/>';
					for (;i<len;i++) {
						str+='<strong>'+pts[i].series.name+'</strong>: '+$filter('currency')(pts[i].y,2)+'<br/>';
					}
					return str;
				};

				return config;
			})();
		}

		function updateHighchart(){
			var annualPaymentList = me.results.current.annualPaymentList,
				i=0,
				len=annualPaymentList.length,
				data=[],
				categories=[],
				config = angular.extend({},me.results.chartLOC);

			for (;i<len;i++) {
				categories.push(i+1);
				data.push(annualPaymentList[i].balance);
			}

			config.xAxis.categories = categories;
			config.series[0].data = data;

			me.results.chartLOC = config;
		}
	});
})($cmsj,$cmsj);
(function($,jQuery){
brCalc.controller('lineOfCreditScenarioReportCtrl', function($scope,scenarios,$attrs,$filter) {
	var me = this,
		scenariosData = scenarios.getScenarios('lineOfCreditData');
	this.scenarios = scenariosData.data.scenarios;
	this.results = scenariosData.results;
});
})($cmsj,$cmsj);
(function($,jQuery){
brCalc.controller('lineOfCreditScenarioResultsCtrl', function($scope,$attrs,scenarios) {
	var scenario = scenarios.getScenario('lineOfCreditData',$attrs.scenarioIndex);

	this.data = scenario.data;
	this.data.scenarioIndex = $attrs.scenarioIndex;
	this.results = scenario.results;
});
})($cmsj,$cmsj);
(function($,jQuery){
brCalc.controller('affordabilityCalculatorCtrl', function($scope,$filter,scenarios,contentManager) {

	var me = this,
		// Get the scenarios reference, including data, results and validation objects
		affordabilityData = scenarios.getScenarios('affordability'),
		sce = affordabilityData.getScenario(0),

		updatingTotalDebts = false;
	// Set the content for the tool (language-dependant content found in config)
	this.content = contentManager.setContent(threeInOneDataContent.affordability,'affordability').getContent('affordability');

	this.data = sce.data;

	// Get the fieldspecs from the config
	// (HAS to be fetched AFTER setting all the content; fieldspecs have content to be updated)
	this.specs = contentManager.getConfig('fieldspecs.affordability');

	this.validation = sce.validation;

	$scope.collapse = {
		debtsDetails:true
	};
	
	this.getContent = function(key){
		var lbl="",
			cObj = me.content&&me.content[key];
		if(cObj&&cObj.label){
			lbl = cObj.label;
		}
		return lbl;
	};

	this.results = sce.results;

	this.rates = { };

	this.clearScenario = function(id) {
		sce.resetScenario();
	};

	initChart();

	/* Master watch */
	$scope.$watch('aff.data.totalOtherDebt',function(){
		if (updatingTotalDebts===true) {
			updatingTotalDebts = false;
		}
		else {
			$scope.collapse.debtsDetails = true;
			updateTotalOtherDebtData();
		}
	});

	$scope.$watch('aff.data.otherDebt',function(){
		if (!$scope.collapse.debtsDetails) {
			updatingTotalDebts = true;
			updateDebtData();
		}
	},true);

	$scope.$watchCollection("aff.data", function(d) {
		calculate();
	});

	/* This method will return the rates from the feed */
	function getLoanToValueRates(){
		return [
			{ltv:0.85,mortgageInsurance:0.018},
			{ltv:0.9,mortgageInsurance:0.024},
			{ltv:1,mortgageInsurance:0.036}
		]
	}

	function updateDebtData () {
		var total = 0, x;
		for(x in me.data.otherDebt){
			me.data.otherDebt[x] = stringToNumber(me.data.otherDebt[x]);
			total+=me.data.otherDebt[x];
		}
		me.data.totalOtherDebt = total;
	}

	function updateTotalOtherDebtData () {
		var x;
		for(x in me.data.otherDebt){
			me.data.otherDebt[x] = 0;
		}
	}

	function getInsuranceAmount(percentage, amount){
		var insuranceAmount,
			ratesObj,
			x,
			loanToValueRates = getLoanToValueRates();
		if(percentage <= 0.8){
			insuranceAmount = 0;
		}else{
			for(x in loanToValueRates){
				ratesObj = loanToValueRates[x];
				percent = ratesObj.ltv;
				mortgageInsurance = ratesObj.mortgageInsurance;
				
				if(percentage < percent || percent === 1){
					insuranceAmount = mortgageInsurance * amount;
					break;
				}
			}
		}

		return insuranceAmount;
	}

	// Affordability highchart - Custom formatting
	function initChart () {

		me.results.pieChart = (function(){
			var config = contentManager.getHighchartConfig('affordability');
			// Tooltip formatting
			config.tooltip.formatter = function(){
				return this.key + ': <strong>' + $filter('percent')(this.point.percentage/100,1) + '</strong>';
			};
			return config;
		})();
	}

	function calculate(){
		//console.log("calculate");
		var results = me.results,
			data = me.data,
			ratesObj,
			percent,
			downPaymentPart;


		//=F6/12
		results.monthlyIncome = data.annualIncome/12;

		//=F6/12*0,32-F7-F8-(F9*0,5)
		results.piBasedOnGDSR = results.monthlyIncome * 0.32 - data.propertyTaxes - data.heatingCosts - (data.condoFees * 0.5);

		//=F6/12*0,4-F7-F8-(F9*0,5)-F10
		results.piBasedOnTDSR = results.monthlyIncome * 0.4 - data.propertyTaxes - data.heatingCosts - (data.condoFees * 0.5) - data.totalOtherDebt;
		//=MIN(F16:F17)
		results.piToBeUsed = Formula.MIN(results.piBasedOnGDSR,results.piBasedOnTDSR);

		/* Step 2 */
		
		results.monthlyEquivalentRateFactor = Formula.POWER(1+(data.interestRate/2),1/6)-1;

		/* Step 3 */

		results.amortizationPeriod = data.amortization*12;

		//=VA(F20;F12*12;-F18;0;0)
		results.mortgageAmountBasedOnPI = Formula.PV(results.monthlyEquivalentRateFactor,results.amortizationPeriod,-results.piToBeUsed,0,0);
		
		//LTV -> =F24/(F24+F13)
		results.mortgageAmountBasedOnPIPercentage = results.mortgageAmountBasedOnPI / (results.mortgageAmountBasedOnPI + data.downPaymentAmount);

		if(me.data.downPaymentAmount < 25000){
			downPaymentPart = data.downPaymentAmount/0.05;
		}else{
			downPaymentPart = 500000 + (data.downPaymentAmount - 25000) / 0.1;
		}

		//=ARRONDI.INF(MAX(MIN(SI(F13<25000;F13/0,05;500000+(F13-25000)/0,1);999999,99);F13/0,2);0)
		results.mortgageAmountBasedDownPayment = Formula.ROUNDDOWN(Formula.MAX(Formula.MIN(downPaymentPart,999999.99),data.downPaymentAmount/0.2),0);

		results.mortgageAmountBasedDownPaymentPercentage = (results.mortgageAmountBasedDownPayment - data.downPaymentAmount) / results.mortgageAmountBasedDownPayment;

		results.mortgageAmountToBeUsed = Formula.MIN(results.mortgageAmountBasedOnPI,results.mortgageAmountBasedDownPayment);
		
		/* Step 4 */

		results.insuranceAmountBasedOnPI = getInsuranceAmount(results.mortgageAmountBasedOnPIPercentage,results.mortgageAmountBasedOnPI);
		
		results.insuranceAmountBasedOnDownPayment = getInsuranceAmount(results.mortgageAmountBasedDownPaymentPercentage ,results.mortgageAmountBasedDownPayment-data.downPaymentAmount);

		results.insuranceAmountToBeUsed =Formula.MIN(results.insuranceAmountBasedOnPI,results.insuranceAmountBasedOnDownPayment);

		//=F16+VPM(F21;F12*12;-F29)
		results.piBasedWithInsuranceOnGDSR = results.piBasedOnGDSR + Formula.PMT(results.monthlyEquivalentRateFactor,results.amortizationPeriod,-results.insuranceAmountBasedOnPI,0,0);
		//=F17+VPM(F21;F12*12;-F30)
		results.piBasedWithInsuranceOnTDSR = results.piBasedOnTDSR + Formula.PMT(results.monthlyEquivalentRateFactor,results.amortizationPeriod,-results.insuranceAmountBasedOnDownPayment,0,0);

		/* Step 4 */
		
		if(results.mortgageAmountToBeUsed === results.mortgageAmountBasedDownPayment){
			results.maximumPurchasePrice = results.mortgageAmountToBeUsed;
			results.totalPrincipalYouCanAfford = results.mortgageAmountToBeUsed - data.downPaymentAmount;
		}else{
			results.maximumPurchasePrice = results.mortgageAmountToBeUsed + data.downPaymentAmount;
			results.totalPrincipalYouCanAfford = results.mortgageAmountToBeUsed;
		}

		results.downPaymentPercentage =  data.downPaymentAmount/results.maximumPurchasePrice;
		
		results.totalDownPaymentAmount = data.downPaymentAmount;
		results.totalInsuranceAmount = results.insuranceAmountToBeUsed;

		results.totalMortgageYouCanAfford = results.totalPrincipalYouCanAfford + results.totalInsuranceAmount;
		
		//=SI(F18=F32;MIN(F16:F17);SI(F26=F25;VPM($F$21;F12*12;-F40);MIN(F32:F33)))
		if(results.piToBeUsed === results.piBasedWithInsuranceOnGDSR){
			results.totalMonthlyMortgageYouCanAfford = results.piToBeUsed
		}else if(results.mortgageAmountToBeUsed === results.mortgageAmountBasedDownPayment){
			results.totalMonthlyMortgageYouCanAfford = Formula.PMT(results.monthlyEquivalentRateFactor,results.amortizationPeriod,-results.totalMortgageYouCanAfford,0,0);
		}else{
			results.totalMonthlyMortgageYouCanAfford = Formula.MIN(results.piBasedWithInsuranceOnGDSR,results.piBasedWithInsuranceOnTDSR);
		}

		results.totalMonthlyExpenses = results.totalMonthlyMortgageYouCanAfford + me.data.heatingCosts + me.data.propertyTaxes + me.data.condoFees + me.data.totalOtherDebt;

		updateHighchart()
		
	}

	function updateHighchart(){
		var seriesData,
			x = 0,
			len,
			item,
			config = angular.extend({},me.results.pieChart);

		/* Add data into series */
		seriesData = config.series&&config.series[0]&&config.series[0].data;
		if(seriesData){
			len = seriesData.length;
			for(;x<len;x++){
				item = seriesData[x];
				if(item.dataKey){
					item.y = getDataAtScope(item.dataKey,me);
				}
				if(item.contentKey){
					item.name = me.getContent(item.contentKey);
				}
			}
			config.series = [{data:seriesData}];
			me.results.graphSeries = seriesData; // for html legend
			me.results.pieChart = config; // Update highchart data
		}
	}
});
})($cmsj,$cmsj);