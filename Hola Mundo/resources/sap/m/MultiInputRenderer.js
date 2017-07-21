/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./InputRenderer','sap/ui/core/Renderer'],function(q,I,R){"use strict";var M=R.extend(I);M.addOuterClasses=function(r,c){I.addOuterClasses.call(this,r,c);r.addClass("sapMMultiInput");if(c.getEnableMultiLineMode()){r.addClass("sapMMultiInputMultiLine");}if(c.getTokens().length>0){r.addClass("sapMMultiInputNoPlaceholder");}};M.getAriaDescribedBy=function(c){var a=I.getAriaDescribedBy.apply(this,arguments),i=c.getAggregation("_tokensInfo").getId();if(a){a=a+" "+i;}else{a=i;}return a;};M.renderAriaDescribedBy=function(r,c){I.renderAriaDescribedBy.call(this,r,c);r.renderControl(c.getAggregation("_tokensInfo"));};M.openInputTag=function(r,c){r.write('<div id="'+c.getId()+'-border"');r.addClass('sapMMultiInputBorder');if(c.getTokens().length>0){r.addClass("sapMMultiInputNarrowBorder");}if(c.getEnableMultiLineMode()||c._bUseDialog){c._isMultiLineMode=true;if(c.getEditable()){c._showIndicator();}else{c._showAllTokens();}}r.writeClasses();r.write('>');M._renderTokens(r,c);M._renderInput(r,c);};M._renderTokens=function(r,c){r.renderControl(c.getAggregation("tokenizer"));};M._renderInput=function(r,c){r.write("<div class=\"sapMMultiInputInputContainer\">");if(c._isMultiLineMode&&c._bShowIndicator===true){var t=c.getTokens().length;r.write("<span class=\"sapMMultiInputIndicator\">");if(t>1){var m=sap.ui.getCore().getLibraryResourceBundle("sap.m");r.write(m.getText("MULTIINPUT_SHOW_MORE_TOKENS",t-1));}r.write("</span>");}I.openInputTag.call(this,r,c);};M.writeInnerContent=function(r,c){};M.closeInputTag=function(r,c){I.closeInputTag.call(this,r,c);r.write("</div>");I.writeValueHelpIcon(r,c);r.write("</div>");r.write("<div class=\"sapMMultiInputShadowDiv\"></div>");};M.addInnerStyles=function(r,c){if(c._isMultiLineMode&&c._bShowIndicator===true&&c.getTokens().length>1){r.addStyle("opacity",0);}};M.addControlWidth=function(r,c){if(!c.getWidth()||c.getWidth()==="auto"){r.addStyle("width","100%");}else{I.addControlWidth.call(this,r,c);}};return M;},true);
