/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/commons/CalloutBase','sap/ui/core/delegate/ItemNavigation','./ActionBar','./library'],function(q,C,I,A,l){"use strict";var Q=C.extend("sap.ui.ux3.QuickView",{metadata:{library:"sap.ui.ux3",properties:{type:{type:"string",group:"Misc",defaultValue:null},firstTitle:{type:"string",group:"Misc",defaultValue:null},firstTitleHref:{type:"string",group:"Misc",defaultValue:null},secondTitle:{type:"string",group:"Misc",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},showActionBar:{type:"boolean",group:"Misc",defaultValue:true},followState:{type:"sap.ui.ux3.FollowActionState",group:"Misc",defaultValue:sap.ui.ux3.FollowActionState.Default},flagState:{type:"boolean",group:"Misc",defaultValue:false},favoriteState:{type:"boolean",group:"Misc",defaultValue:false},favoriteActionEnabled:{type:"boolean",group:"Misc",defaultValue:true},updateActionEnabled:{type:"boolean",group:"Misc",defaultValue:true},followActionEnabled:{type:"boolean",group:"Misc",defaultValue:true},flagActionEnabled:{type:"boolean",group:"Misc",defaultValue:true},openActionEnabled:{type:"boolean",group:"Misc",defaultValue:true}},aggregations:{content:{type:"sap.ui.core.Element",multiple:true,singularName:"content"},actions:{type:"sap.ui.ux3.ThingAction",multiple:true,singularName:"action"},actionBar:{type:"sap.ui.ux3.ActionBar",multiple:false}},events:{actionSelected:{parameters:{id:{type:"string"},action:{type:"sap.ui.ux3.ThingAction"},newState:{type:"string"}}},feedSubmit:{parameters:{text:{type:"string"}}},navigate:{allowPreventDefault:true,parameters:{href:{type:"string"}}}}}});Q.prototype.init=function(){var a;function o(c){var p=c.getParameters();this.fireActionSelected(p);}function b(c){var p=c.getParameters();this.fireFeedSubmit(p);}C.prototype.init.call(this);if(!this.getActionBar()){a=new A();a.attachActionSelected(q.proxy(o,this));a.attachFeedSubmit(q.proxy(b,this));this.setAggregation("actionBar",a,true);}};Q.prototype.onmouseover=function(e){var p=this._getPopup();if(p.isOpen()&&p.getContent()==this){if(this.sCloseNowTimeout){q.sap.clearDelayedCall(this.sCloseNowTimeout);this.sCloseNowTimeout=null;}return;}sap.ui.core.TooltipBase.prototype.onmouseover.call(this,e);};Q.prototype.onAfterRendering=function(){var f=this.getDomRef(),d=[];var r=this.$("title");d.push(r);r=this.$("link");if(!r.length){r=this.$("name");}if(!r.length){return;}d.push(r);r=this.$("descr");if(r.length){d.push(r);}if(!this.oItemNavigation){this.oItemNavigation=new I(null,null,false);this.addDelegate(this.oItemNavigation);}this.oItemNavigation.setRootDomRef(f);this.oItemNavigation.setItemDomRefs(d);this.oItemNavigation.setCycling(false);this.oItemNavigation.setSelectedIndex(1);this.oItemNavigation.setPageSize(d.length);};Q.prototype.onclick=function(e){var t=e.target;if(!t||!t.hasAttribute("href")){return;}if(!this.fireEvent("navigate",{href:t.href},true,false)){e.preventDefault();}};Q.prototype.exit=function(){if(this.oItemNavigation){this.removeDelegate(this.oItemNavigation);this.oItemNavigation.destroy();delete this.oItemNavigation;}};Q.prototype.insertAction=function(a,i){if(this.getActionBar()){this.getActionBar().insertBusinessAction(a,i);}return this;};Q.prototype.addAction=function(a){if(this.getActionBar()){this.getActionBar().addBusinessAction(a);}return this;};Q.prototype.removeAction=function(a){if(this.getActionBar()){this.getActionBar().removeBusinessAction(a);}return this;};Q.prototype.removeAllActions=function(){if(this.getActionBar()){this.getActionBar().removeAllBusinessActions();}return this;};Q.prototype.getActions=function(){if(this.getActionBar()){this.getActionBar().getBusinessActions();}return this;};Q.prototype.destroyActions=function(){if(this.getActionBar()){this.getActionBar().destroyBusinessActions();}return this;};Q.prototype.setFollowState=function(f){if(this.getActionBar()){this.getActionBar().setFollowState(f);}return this;};Q.prototype.getFollowState=function(){var r=null;if(this.getActionBar()){r=this.getActionBar().getFollowState();}return r;};Q.prototype.setFlagState=function(f){if(this.getActionBar()){this.getActionBar().setFlagState(f);}return this;};Q.prototype.getFlagState=function(){var r=null;if(this.getActionBar()){r=this.getActionBar().getFlagState();}return r;};Q.prototype.setFavoriteState=function(f){if(this.getActionBar()){this.getActionBar().setFavoriteState(f);}return this;};Q.prototype.getFavoriteState=function(){var r=null;if(this.getActionBar()){r=this.getActionBar().getFavoriteState();}return r;};Q.prototype.setFavoriteActionEnabled=function(e){if(this.getActionBar()){this.getActionBar().setShowFavorite(e);}return this;};Q.prototype.getFavoriteActionEnabled=function(){var r;if(this.getActionBar()){r=this.getActionBar().getShowFavorite();}return r;};Q.prototype.setFlagActionEnabled=function(e){if(this.getActionBar()){this.getActionBar().setShowFlag(e);}return this;};Q.prototype.getFlagActionEnabled=function(){var r;if(this.getActionBar()){r=this.getActionBar().getShowFlag();}return r;};Q.prototype.setUpdateActionEnabled=function(e){if(this.getActionBar()){this.getActionBar().setShowUpdate(e);}return this;};Q.prototype.getUpdateActionEnabled=function(){var r;if(this.getActionBar()){r=this.getActionBar().getShowUpdate();}return r;};Q.prototype.setFollowActionEnabled=function(e){if(this.getActionBar()){this.getActionBar().setShowFollow(e);}return this;};Q.prototype.getFollowActionEnabled=function(){var r;if(this.getActionBar()){r=this.getActionBar().getShowFollow();}return r;};Q.prototype.setOpenActionEnabled=function(e){if(this.getActionBar()){this.getActionBar().setShowOpen(e);}return this;};Q.prototype.getOpenActionEnabled=function(){var r;if(this.getActionBar()){r=this.getActionBar().getShowOpen();}return r;};Q.prototype.setIcon=function(i){this.setProperty("icon",i);if(this.getActionBar()){this.getActionBar().setThingIconURI(i);}return this;};Q.prototype.setActionBar=function(a){this.setAggregation("actionBar",a,true);if(this.getIcon()&&this.getActionBar()){this.getActionBar().setThingIconURI(this.getIcon());}return this;};return Q;},true);
