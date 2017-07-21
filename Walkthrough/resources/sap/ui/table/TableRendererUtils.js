/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control'],function(q,C){"use strict";var T=null;var a={addClass:function(r,c,s){if(c&&(!!s||arguments.length==2)){r.addClass(c);if(T){T.writeClasses=true;}}return a;},addStyle:function(r,n,v,s){if(n&&v&&(!!s||arguments.length==3)){r.addStyle(n,v);if(T){T.writeStyles=true;}}return a;},startElement:function(r,t,c){c=c||{};r.write("<",c.tag||"div");T=c;if(c.furtherSettings){c.furtherSettings(r,t);}if(q.isArray(c.classname)&&c.classname.length){for(var i=0;i<c.classname.length;i++){a.addClass(r,c.classname[i]);}}else if(c.classname){a.addClass(r,c.classname);}if(c.id){r.writeAttribute("id",(c.element||t).getId()+"-"+c.id);}else if(c.element){if(c.element instanceof C){r.writeControlData(c.element);}else{r.writeElementData(c.element);}}if(c.attributes){for(var n in c.attributes){if(c.attributes.hasOwnProperty(n)){r.writeAttribute(n,c.attributes[n]);}}}if(typeof c.tabindex==="number"){r.writeAttribute("tabindex",""+c.tabindex);}if(c.aria){t._getAccRenderExtension().writeAriaAttributesFor(r,t,c.aria,c.ariaconfig);}if(T.writeClasses){r.writeClasses();}if(T.writeStyles){r.writeStyles();}T=null;r.write(">");return a;},endElement:function(r,t){r.write("</",t||"div",">");return a;},renderElement:function(r,t,c){a.startElement(r,t,c);a.endElement(r,c?c.tag:null);return a;}};return a;},true);
