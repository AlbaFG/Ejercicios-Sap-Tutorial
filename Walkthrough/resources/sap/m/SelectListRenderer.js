/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var S={};S.CSS_CLASS="sapMSelectList";S.render=function(r,l){this.writeOpenListTag(r,l);this.renderItems(r,l);this.writeCloseListTag(r,l);};S.writeOpenListTag=function(r,l){var C=S.CSS_CLASS;r.write("<ul");r.writeControlData(l);r.addClass(C);if(l.getShowSecondaryValues()){r.addClass(C+"TableLayout");}if(!l.getEnabled()){r.addClass(C+"Disabled");}r.addStyle("width",l.getWidth());r.addStyle("max-width",l.getMaxWidth());r.writeStyles();r.writeClasses();this.writeAccessibilityState(r,l);r.write(">");};S.writeCloseListTag=function(r,l){r.write("</ul>");};S.renderItems=function(r,l){var s=l.getItems().length,o=l.getSelectedItem();for(var i=0,I=l.getItems();i<I.length;i++){this.renderItem(r,l,I[i],{selected:o===I[i],setsize:s,posinset:i+1,elementData:true});}};S.renderItem=function(r,l,i,s){if(!(i instanceof sap.ui.core.Element)){return;}var e=i.getEnabled(),o=l.getSelectedItem(),C=S.CSS_CLASS,t=i.getTooltip_AsString(),b=l.getShowSecondaryValues();r.write("<li");if(s.elementData){r.writeElementData(i);}if(i instanceof sap.ui.core.SeparatorItem){r.addClass(C+"SeparatorItem");if(b){r.addClass(C+"Row");}}else{r.addClass(C+"ItemBase");if(b){r.addClass(C+"Row");}else{r.addClass(C+"Item");}if(i.bVisible===false){r.addClass(C+"ItemBaseInvisible");}if(!e){r.addClass(C+"ItemBaseDisabled");}if(e&&sap.ui.Device.system.desktop){r.addClass(C+"ItemBaseHoverable");}if(i===o){r.addClass(C+"ItemBaseSelected");}if(e){r.writeAttribute("tabindex","0");}}r.writeClasses();if(t){r.writeAttributeEscaped("title",t);}this.writeItemAccessibilityState.apply(this,arguments);r.write(">");if(b){r.write("<span");r.addClass(C+"Cell");r.addClass(C+"FirstCell");r.writeClasses();r.write(">");r.writeEscaped(i.getText());r.write("</span>");r.write("<span");r.addClass(C+"Cell");r.addClass(C+"LastCell");r.writeClasses();r.write(">");if(typeof i.getAdditionalText==="function"){r.writeEscaped(i.getAdditionalText());}r.write("</span>");}else{r.writeEscaped(i.getText());}r.write("</li>");};S.writeAccessibilityState=function(r,l){r.writeAccessibilityState({role:"listbox"});};S.writeItemAccessibilityState=function(r,l,i,s){var R=(i instanceof sap.ui.core.SeparatorItem)?"separator":"option";r.writeAccessibilityState(i,{role:R,selected:s.selected,setsize:s.setsize,posinset:s.posinset});};return S;},true);