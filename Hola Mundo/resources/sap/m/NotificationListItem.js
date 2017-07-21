/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','./NotificationListBase','sap/ui/core/InvisibleText'],function(q,l,C,N,I){'use strict';var a=N.extend('sap.m.NotificationListItem',{metadata:{library:'sap.m',properties:{description:{type:'string',group:'Appearance',defaultValue:''},truncate:{type:'boolean',group:'Appearance',defaultValue:true},hideShowMoreButton:{type:'boolean',group:'Appearance',defaultValue:false}},aggregations:{processingMessage:{type:'sap.m.MessageStrip',multiple:false},_bodyText:{type:'sap.m.Text',multiple:false,visibility:"hidden"}}}});a.prototype.init=function(){sap.m.NotificationListBase.prototype.init.call(this);var r=sap.ui.getCore().getLibraryResourceBundle('sap.m');this._expandText=r.getText('NOTIFICATION_LIST_ITEM_SHOW_MORE');this._collapseText=r.getText('NOTIFICATION_LIST_ITEM_SHOW_LESS');this._closeText=r.getText('NOTIFICATION_LIST_BASE_CLOSE');this.setType('Active');var _=new sap.m.Button(this.getId()+'-closeButton',{type:sap.m.ButtonType.Transparent,icon:sap.ui.core.IconPool.getIconURI('decline'),tooltip:this._closeText,press:function(){this.close();}.bind(this)});this.setAggregation("_closeButton",_,true);var b=new sap.m.Button({type:sap.m.ButtonType.Transparent,text:this.getTruncate()?this._expandText:this._collapseText,id:this.getId()+'-expandCollapseButton',press:function(){this._deregisterResize();this.setProperty("truncate",!this.getTruncate(),true);b.setText(this.getTruncate()?this._expandText:this._collapseText);this.$().find('.sapMNLI-Header').toggleClass('sapMNLI-TitleWrapper--is-expanded');this.$().find('.sapMNLI-TextWrapper').toggleClass('sapMNLI-TextWrapper--is-expanded',this.getDescription());this._registerResize();}.bind(this)});this.setAggregation("_collapseButton",b,true);this._ariaDetailsText=new I({id:this.getId()+'-info'}).toStatic();};a.prototype.setDescription=function(d){var r=this.setProperty('description',d);this._getDescriptionText().setText(d);return r;};a.prototype.setDatetime=function(d){var r=sap.m.NotificationListBase.prototype.setDatetime.call(this,d);this._updateAriaAdditionalInfo();return r;};a.prototype.setUnread=function(u){var r=this.setProperty('unread',u,true);var t=this.getAggregation('_headerTitle');if(t){t.toggleStyleClass('sapMNLI-Unread',this.getUnread());}return r;};a.prototype.setPriority=function(p,s){var r=this.setProperty('priority',p,s);this._updateAriaAdditionalInfo();return r;};a.prototype.setAuthorPicture=function(b,s){var r=this.setProperty('authorPicture',b,s);this._getAuthorImage().setSrc(b);return r;};a.prototype.clone=function(){return N.prototype.clone.apply(this,arguments);};a.prototype.onBeforeRendering=function(){this._deregisterResize();};a.prototype.onAfterRendering=function(){this._registerResize();};a.prototype.exit=function(){this._deregisterResize();if(this._ariaDetailsText){this._ariaDetailsText.destroy();this._ariaDetailsText=null;}};a.prototype._getDescriptionText=function(){var b=this.getAggregation('_bodyText');if(!b){b=new sap.m.Text({id:this.getId()+'-body',text:this.getDescription(),maxLines:2}).addStyleClass('sapMNLI-Text');this.setAggregation("_bodyText",b,true);}return b;};a.prototype._activeHandling=function(){this.$().toggleClass("sapMNLIActive",this._active);};a.prototype._updateAriaAdditionalInfo=function(){var r=sap.ui.getCore().getLibraryResourceBundle('sap.m');var b=this.getUnread()?r.getText('NOTIFICATION_LIST_ITEM_UNREAD'):r.getText('NOTIFICATION_LIST_ITEM_READ');var d=r.getText('NOTIFICATION_LIST_ITEM_DATETIME_PRIORITY',[this.getDatetime(),this.getPriority()]);var c=this.getAuthorName();var e=b+' ';if(c){e+=r.getText('NOTIFICATION_LIST_ITEM_CREATED_BY')+' '+this.getAuthorName()+' ';}e+=d;this._ariaDetailsText.setText(e);};a.prototype._canTruncate=function(){var t=this.getDomRef('title').offsetHeight;var b=this.getDomRef('title').parentElement.offsetHeight;var c;var d;if(this._getDescriptionText().getText()){c=this.getDomRef("body").offsetHeight;d=this.getDomRef("body").parentElement.offsetHeight;}return c>d||t>b;};a.prototype._showHideTruncateButton=function(){var n=this.getDomRef();if(this._canTruncate()&&(!this.getHideShowMoreButton())){this.getDomRef('expandCollapseButton').classList.remove('sapMNLI-CollapseButtonHide');if(this.getTruncate()){this.getAggregation('_collapseButton').setText(this._expandText);n.querySelector('.sapMNLI-Header').classList.remove('sapMNLI-TitleWrapper--is-expanded');if(this.getDescription()){n.querySelector('.sapMNLI-TextWrapper').classList.remove('sapMNLI-TextWrapper--is-expanded');}}else{this.getAggregation('_collapseButton').setText(this._collapseText);this.$().find('.sapMNLI-TextWrapper').toggleClass('sapMNLI-TextWrapper--is-expanded',this.getDescription());n.querySelector('.sapMNLI-Header').classList.add('sapMNLI-TitleWrapper--is-expanded');}}else{this.getDomRef('expandCollapseButton').classList.add('sapMNLI-CollapseButtonHide');}if(this.getDescription()){n.querySelector('.sapMNLI-TextWrapper').classList.remove('sapMNLI-TextWrapper--initial-overwrite');}if(this.getTitle()){n.querySelector('.sapMNLI-Header').classList.remove('sapMNLI-TitleWrapper--initial-overwrite');}};a.prototype._deregisterResize=function(){if(this._sNotificationResizeHandler){sap.ui.core.ResizeHandler.deregister(this._sNotificationResizeHandler);this._sNotificationResizeHandler=null;}};a.prototype._registerResize=function(){var t=this;var n=this.getDomRef();if(!n){return;}t._resizeNotification();this._sNotificationResizeHandler=sap.ui.core.ResizeHandler.register(n,function(){t._resizeNotification();});};a.prototype._resizeNotification=function(){var n=this.getDomRef();var c=sap.ui.getCore();if(n.offsetWidth>=640){n.classList.add('sapMNLI-LSize');}else{n.classList.remove('sapMNLI-LSize');}if(this._getDescriptionText().getText()){n.querySelector('.sapMNLI-TextWrapper').classList.remove('sapMNLI-TextWrapper--is-expanded');n.querySelector('.sapMNLI-TextWrapper').classList.add('sapMNLI-TextWrapper--initial-overwrite');}n.querySelector('.sapMNLI-Header').classList.remove('sapMNLI-TitleWrapper--is-expanded');n.querySelector('.sapMNLI-Header').classList.add('sapMNLI-TitleWrapper--initial-overwrite');if(c.isThemeApplied()){this._showHideTruncateButton();}else{c.attachThemeChanged(this._showHideTruncateButton,this);}};return a;},true);
