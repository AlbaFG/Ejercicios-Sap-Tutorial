/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/Device','sap/ui/Global','sap/ui/base/Object','sap/ui/thirdparty/URI','jquery.sap.script'],function(q,D,G,B,U){"use strict";var m=150;var T=B.extend("sap.ui.core.ThemeCheck",{constructor:function(C){this._oCore=C;this._iCount=0;this._CUSTOMCSSCHECK=/\.sapUiThemeDesignerCustomCss/i;this._CUSTOMID="sap-ui-core-customcss";this._customCSSAdded=false;this._themeCheckedForCustom=null;},getInterface:function(){return this;},fireThemeChangedEvent:function(o){c(this);d.apply(this,[true]);if(!o&&!this._sThemeCheckId){this._oCore.fireThemeChanged({theme:this._oCore.getConfiguration().getTheme()});}}});T.themeLoaded=false;T.checkStyle=function(i,l){var s=document.getElementById(i);try{var n=false,L=false,S=false,I=false;n=!s;L=!!(s&&(s.getAttribute("data-sap-ui-ready")==="true"||s.getAttribute("data-sap-ui-ready")==="false"));try{S=!!(s&&s.sheet&&s.sheet.href===s.href&&s.sheet.cssRules&&s.sheet.cssRules.length>0);}catch(e){if(e.name!=='SecurityError'&&e.name!=='InvalidAccessError'){throw e;}}I=!!(s&&s.innerHTML&&s.innerHTML.length>0);var r=n||S||I||L;if(l){q.sap.log.debug("ThemeCheck: "+i+": "+r+" (noLinkElement: "+n+", sheet: "+S+", innerHtml: "+I+", linkElementFinishedLoading: "+L+")");}return r;}catch(e){if(l){q.sap.log.error("ThemeCheck: "+i+": Error during check styles '"+i+"'",e);}}return false;};function c(t){T.themeLoaded=false;if(t._sThemeCheckId){q.sap.clearDelayedCall(t._sThemeCheckId);t._sThemeCheckId=null;t._iCount=0;}}function a(t){var l=t._oCore.getLoadedLibraries();var s=t._oCore.getConfiguration().getTheme();var p=t._oCore._getThemePath("sap.ui.core",s)+"custom.css";var r=true;if(!!t._customCSSAdded&&t._themeCheckedForCustom===s){l[t._CUSTOMID]={};}function e(f){r=r&&T.checkStyle("sap-ui-theme-"+f,true);if(r){if(t._themeCheckedForCustom!=s){if(b(t,f)){var C=p;var L=t._oCore._getLibraryCssQueryParams(l["sap.ui.core"]);if(L){C+=L;}q.sap.includeStyleSheet(C,t._CUSTOMID);t._customCSSAdded=true;q.sap.log.warning("ThemeCheck delivered custom CSS needs to be loaded, Theme not yet applied");t._themeCheckedForCustom=s;r=false;return false;}else{var g=q("LINK[id='"+t._CUSTOMID+"']");if(g.length>0){g.remove();q.sap.log.debug("Custom CSS removed");}t._customCSSAdded=false;}}}}q.each(l,e);if(!r){q.sap.log.warning("ThemeCheck: Theme not yet applied.");}else{t._themeCheckedForCustom=s;}return r;}function b(t,l){var f=q.sap.domById("sap-ui-theme-"+l);if(!f){return false;}var g=window.getComputedStyle(f,':after').getPropertyValue('content');if(!g&&D.browser.safari){var h=document.documentElement;h.classList.add("sapUiThemeDesignerCustomCss");g=window.getComputedStyle(h,":after").getPropertyValue("content");h.classList.remove("sapUiThemeDesignerCustomCss");}if(g&&g!=="none"){try{if(g[0]==="'"||g[0]==='"'){g=g.substring(1,g.length-1);}return g==="true";}catch(e){q.sap.log.error("Custom check: Error parsing JSON string for custom.css indication.",e);}}var r;try{if(f.sheet&&f.sheet.cssRules){r=f.sheet.cssRules;}}catch(e){if(e.name!=='SecurityError'&&e.name!=='InvalidAccessError'){throw e;}}if(!r||r.length==0){q.sap.log.warning("Custom check: Failed retrieving a CSS rule from stylesheet "+l);return false;}for(var i=0;(i<2&&i<r.length);i++){if(t._CUSTOMCSSCHECK.test(r[i].selectorText)){return true;}}return false;}function d(f){this._iCount++;var e=this._iCount>m;if(!a(this)&&!e){var i;if(this._iCount<=100){i=2;}else if(this._iCount<=110){i=500;}else{i=1000;}this._sThemeCheckId=q.sap.delayedCall(i,this,d);}else if(!f){c(this);T.themeLoaded=true;this._oCore.fireThemeChanged({theme:this._oCore.getConfiguration().getTheme()});if(e){q.sap.log.warning("ThemeCheck: max. check cycles reached.");}}else{T.themeLoaded=true;}}return T;});
