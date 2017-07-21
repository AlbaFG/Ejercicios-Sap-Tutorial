/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/Object','sap/ui/Device','./library','./TableUtils'],function(q,B,D,l,T){"use strict";var C=T.CELLTYPES;var S=l.SelectionMode;var M={CTRL:1,SHIFT:2,ALT:4};var I=":sapTabbable, input:sapFocusable, .sapUiTableTreeIcon:not(.sapUiTableTreeIconLeaf)";var H=5;var a="1em";function s(i){if(!(i instanceof window.HTMLInputElement)){return;}i.select();}var b=B.extend("sap.ui.table.TableKeyboardDelegate2",{constructor:function(t){B.call(this);},destroy:function(){B.prototype.destroy.apply(this,arguments);},getInterface:function(){return this;}});b._restoreFocusOnLastFocusedDataCell=function(t,e){var c=T.getFocusedItemInfo(t);var L=t._getKeyboardExtension()._getLastFocusedCellInfo();T.focusItem(t,c.cellInRow+(c.columnCount*L.row),e);};b._setFocusOnColumnHeaderOfLastFocusedDataCell=function(t,e){var c=T.getFocusedItemInfo(t);T.focusItem(t,c.cellInRow,e);};b._forwardFocusToTabDummy=function(t,c){t._getKeyboardExtension()._setSilentFocus(t.$().find("."+c));};b._isKeyCombination=function(e,k,m){if(m==null){m=0;}var c=typeof k==="string"?String.fromCharCode(e.charCode):e.keyCode;var d=0;d|=(D.os.macintosh?e.metaKey:e.ctrlKey)&&k!==q.sap.KeyCodes.CONTROL?M.CTRL:0;d|=e.shiftKey&&k!==q.sap.KeyCodes.SHIFT?M.SHIFT:0;d|=e.altKey&&k!==q.sap.KeyCodes.ALT?M.ALT:0;var v=k==null||c===k;var V=m===d;return v&&V;};b._handleSpaceAndEnter=function(t,e){var c=T.getCellInfo(e.target)||{};if(c.type===C.COLUMNROWHEADER){t._toggleSelectAll();}else if(b._isElementGroupToggler(t,e.target)){T.Grouping.toggleGroupHeaderByRef(t,e.target);}else if(c.type===C.ROWHEADER){T.toggleRowSelection(t,e.target);}else if(c.type===C.DATACELL||c.type===C.ROWACTION){var E=!t.hasListeners("cellClick");if(!t._findAndfireCellEvent(t.fireCellClick,e)){if(T.isRowSelectionAllowed(t)){T.toggleRowSelection(t,e.target);E=false;}}if(E){var i=b._getInteractiveElements(e.target);if(i!==null){t._getKeyboardExtension().setActionMode(true);}}}};b._moveColumn=function(c,n){var t=c.getParent();var v=t._getVisibleColumns();var i=v.indexOf(c);var d;if(n&&i<v.length-1){d=t.indexOfColumn(v[i+1])+1;}else if(!n&&i>0){d=t.indexOfColumn(v[i-1]);}if(d!=null){T.Column.moveColumnTo(c,d);}};b._getVisibleAndGroupedColumns=function(t){return t.getColumns().filter(function(c){return c.getVisible()||c.getGrouped();});};b._getColumnIndexInVisibleAndGroupedColumns=function(t,c){var v=b._getVisibleAndGroupedColumns(t);for(var i=0;i<v.length;i++){var V=v[i];if(V===c){return i;}}return-1;};b._focusRowSelector=function(t,r){t._getKeyboardExtension()._setFocus(t.getDomRef("rowsel"+r));};b._isElementGroupToggler=function(t,e){return T.Grouping.isInGroupingRow(e)||(T.Grouping.isTreeMode(t)&&e.classList.contains("sapUiTableTdFirst")&&(e.querySelector(".sapUiTableTreeIconNodeOpen")!=null||e.querySelector(".sapUiTableTreeIconNodeClosed")!=null))||e.classList.contains("sapUiTableTreeIconNodeOpen")||e.classList.contains("sapUiTableTreeIconNodeClosed");};b._isElementInteractive=function(e){if(e==null){return false;}return q(e).is(I);};b._getInteractiveElements=function(c){if(c==null){return null;}var $=q(c);var o=T.getCellInfo($);if(o!==null&&(o.type===T.CELLTYPES.DATACELL||o.type===T.CELLTYPES.ROWACTION)){var i=$.find(I);if(i.length>0){return i;}}return null;};b._getFirstInteractiveElement=function(r){if(r==null){return null;}var t=r.getParent();var c=r.getCells();var o;var $;var d;for(var i=0;i<c.length;i++){o=c[i].getDomRef();$=T.getCell(t,o);d=this._getInteractiveElements($);if(d!==null){return d.first();}}if(T.hasRowActions(t)){o=r.getAggregation("_rowAction").getDomRef();$=T.getCell(t,o);d=this._getInteractiveElements($);if(d!==null){return d.first();}}return null;};b._getLastInteractiveElement=function(r){if(r==null){return null;}var t=r.getParent();var c=r.getCells();var o;var $;var d;if(T.hasRowActions(t)){o=r.getAggregation("_rowAction").getDomRef();$=T.getParentRowActionCell(t,o);d=this._getInteractiveElements($);if(d!==null){return d.last();}}for(var i=c.length-1;i>=0;i--){o=c[i].getDomRef();$=T.getParentDataCell(t,o);d=this._getInteractiveElements($);if(d!==null){return d.last();}}return null;};b._getPreviousInteractiveElement=function(t,e){if(t==null||e==null){return null;}var E=q(e);if(!this._isElementInteractive(E)){return null;}var d;var r=T.getParentRowActionCell(t,e);var $;var o;var R;var c;var h;var j;var k;if(r!==null){$=this._getInteractiveElements(r);if($[0]!==E[0]){return $.eq($.index(e)-1);}var m=T.getRowActionCellInfo(t,r).rowIndex;R=t.getRows()[m];c=R.getCells();d=T.getParentDataCell(t,c[c.length-1].getDomRef());o=T.getDataCellInfo(t,d);h=t.getColumns()[o.columnIndex];j=b._getColumnIndexInVisibleAndGroupedColumns(t,h);k=j;}else{d=T.getParentDataCell(t,e);o=T.getDataCellInfo(t,d);R=t.getRows()[o.rowIndex];c=R.getCells();h=t.getColumns()[o.columnIndex];j=b._getColumnIndexInVisibleAndGroupedColumns(t,h);k=j-1;$=this._getInteractiveElements(d);if($[0]!==E[0]){return $.eq($.index(e)-1);}}for(var i=k;i>=0;i--){var n=c[i].getDomRef();d=T.getParentDataCell(t,n);$=this._getInteractiveElements(d);if($!==null){return $.last();}}return null;};b._getNextInteractiveElement=function(t,e){if(t==null||e==null){return null;}var E=q(e);if(!this._isElementInteractive(E)){return null;}var d=T.getParentDataCell(t,e);var r=null;var $;if(d!==null){var o=T.getDataCellInfo(t,d);var R=t.getRows()[o.rowIndex];var c=R.getCells();$=this._getInteractiveElements(d);if($.get(-1)!==E[0]){return $.eq($.index(e)+1);}var h=t.getColumns()[o.columnIndex];var j=b._getColumnIndexInVisibleAndGroupedColumns(t,h);for(var i=j+1;i<c.length;i++){var k=c[i].getDomRef();d=T.getParentDataCell(t,k);$=this._getInteractiveElements(d);if($!==null){return $.first();}}if(T.hasRowActions(t)){r=T.getParentRowActionCell(t,R.getAggregation("_rowAction").getDomRef());}}if(T.hasRowActions(t)){if(r===null){r=T.getParentRowActionCell(t,e);}if(r!==null){$=this._getInteractiveElements(r);if($.get(-1)!==E[0]){return $.eq($.index(e)+1);}}}return null;};b.prototype.enterActionMode=function(){var k=this._getKeyboardExtension();var A=document.activeElement;var i=b._getInteractiveElements(A);var P=T.getParentDataCell(this,A);var $=P||T.getParentRowActionCell(this,A);if(i!==null){k._suspendItemNavigation();A.tabIndex=-1;k._setSilentFocus(i[0]);s(i[0]);return true;}else if($!==null){this._getKeyboardExtension()._suspendItemNavigation();return true;}return false;};b.prototype.leaveActionMode=function(){var k=this._getKeyboardExtension();var A=document.activeElement;k._resumeItemNavigation();var P=T.getParentDataCell(this,A);var $=P||T.getParentRowActionCell(this,A);if($!==null){k._setSilentFocus($);}else{A.blur();k._setSilentFocus(A);}};b.prototype.onfocusin=function(e){if(e.isMarked("sapUiTableIgnoreFocusIn")){return;}var t=q(e.target);if(t.hasClass("sapUiTableOuterBefore")||t.hasClass("sapUiTableOuterAfter")||(e.target!=this.getDomRef("overlay")&&this.getShowOverlay())){this.$("overlay").focus();}else if(t.hasClass("sapUiTableCtrlBefore")){var n=T.isNoDataVisible(this);if(!n||n&&this.getColumnHeaderVisible()){b._setFocusOnColumnHeaderOfLastFocusedDataCell(this,e);}else{this._getKeyboardExtension()._setSilentFocus(this.$("noDataCnt"));}}else if(t.hasClass("sapUiTableCtrlAfter")){if(!T.isNoDataVisible(this)){b._restoreFocusOnLastFocusedDataCell(this,e);}}var P=T.getParentDataCell(this,t);var $=P||T.getParentRowActionCell(this,t);var i=$!==null&&b._isElementInteractive(t);if(this._getKeyboardExtension().isInActionMode()){var c=T.getCellInfo(e.target)||{};var d=c.type===C.ROWHEADER&&T.Grouping.isInGroupingRow(e.target);var h=c.type===C.ROWHEADER&&!d&&T.isRowSelectorSelectionAllowed(this);if(!d&&!h&&!i){this._getKeyboardExtension().setActionMode(false);}}else if(i){this._getKeyboardExtension().setActionMode(true);}};b.prototype.onkeydown=function(e){var k=this._getKeyboardExtension();if(b._isKeyCombination(e,q.sap.KeyCodes.F2)){var i=k.isInActionMode();k.setActionMode(!i);return;}else if(b._isKeyCombination(e,q.sap.KeyCodes.F4)&&b._isElementGroupToggler(this,e.target)){T.Grouping.toggleGroupHeaderByRef(this,e.target);return;}if(this._getKeyboardExtension().isInActionMode()){return;}var t=q(e.target);var c=T.getCellInfo(t)||{};if(b._isKeyCombination(e,q.sap.KeyCodes.SHIFT)&&this.getSelectionMode()===S.MultiToggle&&(c.type===C.ROWHEADER&&T.isRowSelectorSelectionAllowed(this)||(c.type===C.DATACELL||c.type===C.ROWACTION)&&T.isRowSelectionAllowed(this))){var F=T.getRowIndexOfFocusedCell(this);var d=this.getRows()[F].getIndex();this._oRangeSelection={startIndex:d,selected:this.isIndexSelected(d)};}else if(b._isKeyCombination(e,q.sap.KeyCodes.A,M.CTRL)){e.preventDefault();if((c.type===C.DATACELL||c.type===C.ROWHEADER||c.type===C.ROWACTION||c.type===C.COLUMNROWHEADER)&&this.getSelectionMode()===S.MultiToggle){this._toggleSelectAll();}}else if(b._isKeyCombination(e,q.sap.KeyCodes.A,M.CTRL+M.SHIFT)){if((c.type===C.DATACELL||c.type===C.ROWHEADER||c.type===C.ROWACTION||c.type===C.COLUMNROWHEADER)){this.clearSelection();}}else if(b._isKeyCombination(e,q.sap.KeyCodes.F4)){if(c.type===C.DATACELL){k.setActionMode(true);}}else if(b._isKeyCombination(e,q.sap.KeyCodes.F10,M.SHIFT)){e.preventDefault();T.Menu.openContextMenu(this,e.target,true);}};b.prototype.onkeypress=function(e){var k=this._getKeyboardExtension();var c=T.getCellInfo(e.target)||{};if(b._isKeyCombination(e,"+")){if(b._isElementGroupToggler(this,e.target)){T.Grouping.toggleGroupHeaderByRef(this,e.target,true);}else if(c.type===C.DATACELL||c.type===C.ROWACTION){k.setActionMode(true);}}else if(b._isKeyCombination(e,"-")){if(b._isElementGroupToggler(this,e.target)){T.Grouping.toggleGroupHeaderByRef(this,e.target,false);}else if(c.type===C.DATACELL||c.type===C.ROWACTION){k.setActionMode(true);}}};b.prototype.oncontextmenu=function(e){if(e.isMarked("handledByPointerExtension")){return;}e.preventDefault();var c=T.getCell(this,e.target);var o=T.getCellInfo(c)||{};if(o.type===C.COLUMNHEADER||o.type===C.DATACELL){T.Menu.openContextMenu(this,e.target,true);}};b.prototype.onkeyup=function(e){var c=T.getCellInfo(e.target)||{};if(b._isKeyCombination(e,q.sap.KeyCodes.SHIFT)){delete this._oRangeSelection;}if(b._isKeyCombination(e,q.sap.KeyCodes.SPACE)){e.preventDefault();if(c.type===C.COLUMNHEADER){T.Menu.openContextMenu(this,e.target,true);}else{b._handleSpaceAndEnter(this,e);}}if(b._isKeyCombination(e,q.sap.KeyCodes.ENTER)){if(c.type===C.COLUMNHEADER){T.Menu.openContextMenu(this,e.target,true);}}};b.prototype.onsaptabnext=function(e){var k=this._getKeyboardExtension();var c=T.getCellInfo(e.target)||{};var $,d;if(k.isInActionMode()){d=T.getParentDataCell(this,e.target);var r=T.getParentRowActionCell(this,e.target);var R;var i=false;var h;if(d===null&&r===null){if(c.type===C.ROWHEADER){$=q(e.target);R=$.data("sap-ui-rowindex");i=true;}else{return;}}else if(d!==null){$=d;R=T.getDataCellInfo(this,d).rowIndex;}else{$=r;R=T.getRowActionCellInfo(this,r).rowIndex;}var o=this.getRows()[R];var L=b._getLastInteractiveElement(o);var j=L===null||L[0]===e.target;if(j){var A=o.getIndex();var m=T.isLastScrollableRow(this,$);var n=this._getRowCount()-1===A;var t=T.isRowSelectorSelectionAllowed(this);var u=false;if(!n&&m){u=this._getScrollExtension().scroll(true,null,true);}if(n){e.preventDefault();k.setActionMode(false);}else if(u){e.preventDefault();this.attachEventOnce("_rowsUpdated",function(){setTimeout(function(){var x=T.Grouping.isGroupingRow(o.getDomRef());if(t||x){b._focusRowSelector(this,R);}else{h=b._getFirstInteractiveElement(o);h.focus();s(h[0]);}}.bind(this),0);}.bind(this));}else{e.preventDefault();var N=R+1;var v=this.getRows()[N];var w=T.Grouping.isGroupingRow(v.getDomRef());if(t||w){b._focusRowSelector(this,N);}else{h=b._getFirstInteractiveElement(v);h.focus();s(h[0]);}}}else if(i){e.preventDefault();h=b._getFirstInteractiveElement(o);h.focus();s(h[0]);}else{e.preventDefault();h=b._getNextInteractiveElement(this,e.target);h.focus();s(h[0]);}}else if(c.type===C.COLUMNHEADER||c.type===C.COLUMNROWHEADER){if(T.isNoDataVisible(this)){this.$("noDataCnt").focus();}else{b._restoreFocusOnLastFocusedDataCell(this,e);}e.preventDefault();}else if(c.type===C.DATACELL||c.type===C.ROWHEADER){b._forwardFocusToTabDummy(this,"sapUiTableCtrlAfter");}else if(e.target===this.getDomRef("overlay")){k._setSilentFocus(this.$().find(".sapUiTableOuterAfter"));}else if(Object.keys(c).length===0){d=T.getParentDataCell(this,e.target);if(d!==null){e.preventDefault();d.focus();}}};b.prototype.onsaptabprevious=function(e){var k=this._getKeyboardExtension();var c=T.getCellInfo(e.target)||{};var $,d;if(k.isInActionMode()){d=T.getParentDataCell(this,e.target);var r=T.getParentRowActionCell(this,e.target);var R;var i=false;var h;if(d===null&&r===null){if(c.type===C.ROWHEADER){$=q(e.target);R=$.data("sap-ui-rowindex");i=true;}else{return;}}else if(d!==null){$=d;R=T.getDataCellInfo(this,d).rowIndex;}else{$=r;R=T.getRowActionCellInfo(this,r).rowIndex;}var o=this.getRows()[R];var A=o.getIndex();var F=b._getFirstInteractiveElement(o);var j=F!==null&&F[0]===e.target;var t=T.isRowSelectorSelectionAllowed(this);var m=T.Grouping.isGroupingRow(o);var n=t||m;if(j&&n){e.preventDefault();b._focusRowSelector(this,R);}else if((j&&!n)||i){var u=T.isFirstScrollableRow(this,$);var v=A===0;var w=false;if(!v&&u){w=this._getScrollExtension().scroll(false,null,true);}if(v){e.preventDefault();k.setActionMode(false);}else if(w){e.preventDefault();this.attachEventOnce("_rowsUpdated",function(){setTimeout(function(){var z=T.Grouping.isGroupingRow(o.getDomRef());if(z){b._focusRowSelector(this,R);}else{h=b._getLastInteractiveElement(o);h.focus();s(h[0]);}}.bind(this),0);}.bind(this));}else{e.preventDefault();var P=R-1;var x=this.getRows()[P];var y=T.Grouping.isGroupingRow(x.getDomRef());if(y){b._focusRowSelector(this,P);}else{h=b._getLastInteractiveElement(x);h.focus();s(h[0]);}}}else{e.preventDefault();h=b._getPreviousInteractiveElement(this,e.target);h.focus();s(h[0]);}}else if(c.type===C.DATACELL||c.type===C.ROWHEADER||e.target===this.getDomRef("noDataCnt")){if(this.getColumnHeaderVisible()){b._setFocusOnColumnHeaderOfLastFocusedDataCell(this,e);e.preventDefault();}else{b._forwardFocusToTabDummy(this,"sapUiTableCtrlBefore");}}else if(e.target===this.getDomRef("overlay")){this._getKeyboardExtension()._setSilentFocus(this.$().find(".sapUiTableOuterBefore"));}else if(Object.keys(c).length===0){d=T.getParentDataCell(this,e.target);if(d!==null){e.preventDefault();d.focus();}}};function g(t,e){var $=T.getCell(t,e);if(!$){return{};}var c=T.getCellInfo($[0])||{};var d;if(c.type===C.ROWHEADER||c.type===C.ROWACTION){c.row=parseInt($.data("sap-ui-rowindex"),10);}else if(c.type===C.DATACELL){d=T.getDataCellInfo(t,$);c.row=d.rowIndex;c.col=d.columnIndex;}else if(c.type===C.COLUMNHEADER){c.col=parseInt($.data("sap-ui-colindex"),10);c.span=parseInt($.attr("colspan")||1,10);}return c;}function f(t,r,c,d,A){var $;function e(){var h=$&&$[0];if(h){var i=(A?b._getInteractiveElements(h)||[]:[])[0];var k=t._getKeyboardExtension();k._actionMode=!!i;k._setSilentFocus(i||h);s(i);}}if(d===C.ROWHEADER){t.$().find('.sapUiTableRowHdr[data-sap-ui-rowindex="'+r+'"]').focus();}else if(d===C.ROWACTION){$=t.$().find('.sapUiTableRowAction[data-sap-ui-rowindex="'+r+'"]');e();}else if(d===C.DATACELL){var o=t.getColumns()[c];$=o?t.$().find('[data-sap-ui-rowindex="'+r+'"] [data-sap-ui-colid="'+o.getId()+'"]'):null;e();}}function p(e,P){e.setMarked("sapUiTableSkipItemNavigation",P!==false);}b.prototype.onsapdown=function(e){if(e.isMarked()){return;}var k=this._getKeyboardExtension();var i=k.isInActionMode();var c=g(this,e.target);var d=false;var t=this;var F=b._isKeyCombination(e,null,M.CTRL)||i;if(c.type===C.DATACELL||c.type===C.ROWHEADER||c.type===C.ROWACTION){p(e);if(T.isLastScrollableRow(this,c.cell[0])){d=this._getScrollExtension().scroll(true,false,true);}if(d){if(F){this.attachEventOnce("_rowsUpdated",function(){setTimeout(function(){f(t,c.row,c.col,c.type,true);e.preventDefault();},0);});}}else{if(c.row===t.getVisibleRowCount()-1){k.setActionMode(false);}else{f(t,c.row+1,c.col,c.type,F);e.preventDefault();}}}else if(c.type===C.COLUMNHEADER||c.type===C.COLUMNROWHEADER){var h=T.getHeaderRowCount(this);if(T.isNoDataVisible(this)){var o=T.getFocusedItemInfo(this);if(o.row-h<=1){p(e);}}else if(c.type===C.COLUMNROWHEADER&&h>1){p(e);T.focusItem(this,h*(T.getVisibleColumnCount(this)+1),e);}}};b.prototype.onsapdownmodifiers=function(e){if(b._isKeyCombination(e,null,M.CTRL)){return b.prototype.onsapdown.call(this,e);}var k=this._getKeyboardExtension();if(b._isKeyCombination(e,null,M.ALT)&&b._isElementGroupToggler(this,e.target)){p(e);T.Grouping.toggleGroupHeaderByRef(this,e.target,true);return;}if(k.isInActionMode()){return;}var c=T.getCellInfo(e.target)||{};if(b._isKeyCombination(e,null,M.SHIFT)){e.preventDefault();if(c.type===C.ROWHEADER||c.type===C.DATACELL||c.type===C.ROWACTION){if(!this._oRangeSelection){p(e);return;}var F=T.getRowIndexOfFocusedCell(this);var d=this.getRows()[F].getIndex();if(d===this._getRowCount()-1){return;}if(T.isLastScrollableRow(this,e.target)){var h=this._getScrollExtension().scroll(true,false,true);if(h){p(e);}}if(this._oRangeSelection.startIndex<=d){d++;if(this._oRangeSelection.selected){T.toggleRowSelection(this,d,true);}else{T.toggleRowSelection(this,d,false);}}else{T.toggleRowSelection(this,d,false);}}else{p(e);}}if(b._isKeyCombination(e,null,M.ALT)){if(c.type===C.DATACELL){k.setActionMode(true);}p(e);}};b.prototype.onsapup=function(e){if(e.isMarked()){return;}var k=this._getKeyboardExtension();var i=k.isInActionMode();var c=g(this,e.target);var d=false;var t=this;var F=b._isKeyCombination(e,null,M.CTRL)||i;if(c.type===C.DATACELL||c.type===C.ROWHEADER||c.type===C.ROWACTION){p(e);if(T.isFirstScrollableRow(this,c.cell[0])){d=this._getScrollExtension().scroll(false,false,true);}if(d){if(F){this.attachEventOnce("_rowsUpdated",function(){setTimeout(function(){f(t,c.row,c.col,c.type,true);e.preventDefault();},0);});}}else if(c.row===0){k.setActionMode(false);p(e,!!F||c.type===C.ROWACTION);}else{f(t,c.row-1,c.col,c.type,F);e.preventDefault();}}};b.prototype.onsapupmodifiers=function(e){var k=this._getKeyboardExtension();if(b._isKeyCombination(e,null,M.CTRL)){return b.prototype.onsapup.call(this,e);}if(b._isKeyCombination(e,null,M.ALT)&&b._isElementGroupToggler(this,e.target)){p(e);T.Grouping.toggleGroupHeaderByRef(this,e.target,false);return;}if(k.isInActionMode()){return;}var c=T.getCellInfo(e.target)||{};if(b._isKeyCombination(e,null,M.SHIFT)){e.preventDefault();if(c.type===C.ROWHEADER||c.type===C.DATACELL||c.type===C.ROWACTION){if(!this._oRangeSelection){p(e);return;}var F=T.getRowIndexOfFocusedCell(this);var d=this.getRows()[F].getIndex();if(d===0){p(e);return;}if(T.isFirstScrollableRow(this,e.target)){var h=this._getScrollExtension().scroll(false,false,true);if(h){p(e);}}if(this._oRangeSelection.startIndex>=d){d--;if(this._oRangeSelection.selected){T.toggleRowSelection(this,d,true);}else{T.toggleRowSelection(this,d,false);}}else{T.toggleRowSelection(this,d,false);}}else{p(e);}}if(b._isKeyCombination(e,null,M.ALT)){if(c.type===C.DATACELL){k.setActionMode(true);}p(e);}};b.prototype.onsapleft=function(e){if(this._getKeyboardExtension().isInActionMode()){return;}var i=sap.ui.getCore().getConfiguration().getRTL();var c=T.getCellInfo(e.target)||{};if(c.type===C.COLUMNHEADER&&i){var F=T.getFocusedItemInfo(this);var d=F.cellInRow-(T.hasRowHeader(this)?1:0);var h=T.getVisibleColumnCount(this);if(T.hasRowActions(this)&&d===h-1){p(e);}}};b.prototype.onsapleftmodifiers=function(e){if(this._getKeyboardExtension().isInActionMode()){return;}var c=T.getCellInfo(e.target)||{};var d=sap.ui.getCore().getConfiguration().getRTL();if(b._isKeyCombination(e,null,M.SHIFT)){e.preventDefault();if(c.type===C.DATACELL){if(!this._oRangeSelection){p(e);return;}var F=T.getFocusedItemInfo(this);var h=T.hasRowHeader(this)&&F.cellInRow===1;if(h&&!T.isRowSelectorSelectionAllowed(this)){p(e);}}else if(c.type===C.ROWACTION){if(!this._oRangeSelection){p(e);}}else if(c.type===C.ROWHEADER&&d){if(!T.isRowSelectionAllowed(this)){p(e);}}else if(c.type===C.COLUMNROWHEADER&&d){p(e);}else if(c.type===C.COLUMNHEADER){var r=-this._CSSSizeToPixel(a);if(d){r=r*-1;}var o=T.getColumnHeaderCellInfo(e.target);var j=0;for(var i=o.index;i<o.index+o.span;i++){j+=T.Column.getColumnWidth(this,i);}T.Column.resizeColumn(this,o.index,j+r,true,o.span);p(e);}}else if(b._isKeyCombination(e,null,M.CTRL)){if(c.type===C.COLUMNHEADER){e.preventDefault();e.stopImmediatePropagation();var k=T.getColumnHeaderCellInfo(e.target).index;var m=this.getColumns()[k];b._moveColumn(m,d);}}};b.prototype.onsaprightmodifiers=function(e){if(this._getKeyboardExtension().isInActionMode()){return;}var c=T.getCellInfo(e.target)||{};var d=sap.ui.getCore().getConfiguration().getRTL();if(b._isKeyCombination(e,null,M.SHIFT)){e.preventDefault();if(c.type===C.DATACELL){if(!this._oRangeSelection){p(e);}}else if(c.type===C.ROWHEADER){if(!T.isRowSelectionAllowed(this)){p(e);}}else if(c.type===C.ROWACTION&&d){if(!this._oRangeSelection){p(e);}}else if(c.type===C.COLUMNHEADER){var r=this._CSSSizeToPixel(a);if(d){r=r*-1;}var o=T.getColumnHeaderCellInfo(e.target);var h=0;for(var i=o.index;i<o.index+o.span;i++){h+=T.Column.getColumnWidth(this,i);}T.Column.resizeColumn(this,o.index,h+r,true,o.span);p(e);}else if(c.type===C.COLUMNROWHEADER){p(e);}}else if(b._isKeyCombination(e,null,M.CTRL)){if(c.type===C.COLUMNHEADER){e.preventDefault();e.stopImmediatePropagation();var j=T.getColumnHeaderCellInfo(e.target).index;var k=this.getColumns()[j];b._moveColumn(k,!d);}}};b.prototype.onsaphome=function(e){if(this._getKeyboardExtension().isInActionMode()){return;}if(T.Grouping.isInGroupingRow(e.target)){p(e);return;}var c=T.getCellInfo(e.target)||{};if(c.type===C.DATACELL||c.type===C.ROWACTION||c.type===C.COLUMNHEADER){var F=T.getFocusedItemInfo(this);var i=F.cell;var d=F.cellInRow;var h=T.hasRowHeader(this);var r=h?1:0;if(T.hasFixedColumns(this)&&d>this.getFixedColumnCount()+r){p(e);T.focusItem(this,i-d+this.getFixedColumnCount()+r,null);}else if(h&&d>1){p(e);T.focusItem(this,i-d+r,null);}}};b.prototype.onsapend=function(e){if(this._getKeyboardExtension().isInActionMode()){return;}if(T.Grouping.isInGroupingRow(e.target)){p(e);return;}var c=T.getCellInfo(e.target)||{};if(c.type===C.DATACELL||c.type===C.ROWHEADER||c.type===C.ROWACTION||c.type===C.COLUMNHEADER||c.type===C.COLUMNROWHEADER){var F=T.getFocusedItemInfo(this);var i=F.cell;var d=F.columnCount;var h=F.cellInRow;var j=T.hasRowHeader(this);var r=j?1:0;var k=false;if(c.type===C.COLUMNHEADER&&T.hasFixedColumns(this)){var m=parseInt(c.cell.attr("colspan")||1,10);if(m>1&&h+m-r===this.getFixedColumnCount()){k=true;}}if(j&&h===0){p(e);T.focusItem(this,i+1,null);}else if(T.hasFixedColumns(this)&&h<this.getFixedColumnCount()-1+r&&!k){p(e);T.focusItem(this,i+this.getFixedColumnCount()-h,null);}else if(T.hasRowActions(this)&&c.type===C.DATACELL&&h<d-2){p(e);T.focusItem(this,i-h+d-2,null);}}};b.prototype.onsaphomemodifiers=function(e){if(this._getKeyboardExtension().isInActionMode()){return;}if(b._isKeyCombination(e,null,M.CTRL)){e.preventDefault();var c=T.getCellInfo(e.target)||{};if(c.type===C.DATACELL||c.type===C.ROWHEADER||c.type===C.ROWACTION||c.type===C.COLUMNHEADER){p(e);var F=T.getFocusedItemInfo(this);var i=F.row;if(i>0){var d=F.cell;var h=F.columnCount;var j=T.getHeaderRowCount(this);if(i<j+this.getFixedRowCount()){if(c.type===C.ROWACTION){T.focusItem(this,d-h*(i-j),e);}else{T.focusItem(this,d-h*i,e);}}else if(i>=j+this.getFixedRowCount()&&i<j+T.getNonEmptyVisibleRowCount(this)-this.getFixedBottomRowCount()){this._getScrollExtension().scrollMax(false,true);if(this.getFixedRowCount()>0||c.type===C.ROWACTION){T.focusItem(this,d-h*(i-j),e);}else{T.focusItem(this,d-h*i,e);}}else{this._getScrollExtension().scrollMax(false,true);T.focusItem(this,d-h*(i-j-this.getFixedRowCount()),e);}}}}};b.prototype.onsapendmodifiers=function(e){if(this._getKeyboardExtension().isInActionMode()){return;}if(b._isKeyCombination(e,null,M.CTRL)){e.preventDefault();var c=T.getCellInfo(e.target)||{};if(c.type===C.DATACELL||c.type===C.ROWHEADER||c.type===C.ROWACTION||c.type===C.COLUMNHEADER||c.type===C.COLUMNROWHEADER){p(e);var F=T.getFocusedItemInfo(this);var i=F.row;var h=T.getHeaderRowCount(this);var n=T.getNonEmptyVisibleRowCount(this);if(this.getFixedBottomRowCount()===0||i<h+n-1||(T.isNoDataVisible(this)&&i<h-1)){var d=F.cell;var j=F.columnCount;if(T.isNoDataVisible(this)){T.focusItem(this,d+j*(h-i-1),e);}else if(i<h){if(this.getFixedRowCount()>0){T.focusItem(this,d+j*(h+this.getFixedRowCount()-i-1),e);}else{this._getScrollExtension().scrollMax(true,true);T.focusItem(this,d+j*(h+n-this.getFixedBottomRowCount()-i-1),e);}}else if(i>=h&&i<h+this.getFixedRowCount()){this._getScrollExtension().scrollMax(true,true);T.focusItem(this,d+j*(h+n-this.getFixedBottomRowCount()-i-1),e);}else if(i>=h+this.getFixedRowCount()&&i<h+n-this.getFixedBottomRowCount()){this._getScrollExtension().scrollMax(true,true);T.focusItem(this,d+j*(h+n-i-1),e);}else{T.focusItem(this,d+j*(h+n-i-1),e);}}}}};b.prototype.onsappageup=function(e){if(this._getKeyboardExtension().isInActionMode()){return;}var c=T.getCellInfo(e.target)||{};if(c.type===C.DATACELL||c.type===C.ROWHEADER||c.type===C.ROWACTION||c.type===C.COLUMNHEADER){var F=T.getFocusedItemInfo(this);var i=F.row;var h=T.getHeaderRowCount(this);if(this.getFixedRowCount()===0&&i>=h||this.getFixedRowCount()>0&&i>h){p(e);var d=F.cell;var j=F.columnCount;if(i<h+this.getFixedRowCount()){T.focusItem(this,d-j*(i-h),e);}else if(i===h+this.getFixedRowCount()){var P=T.getNonEmptyVisibleRowCount(this)-this.getFixedRowCount()-this.getFixedBottomRowCount();var r=this.getFirstVisibleRow();this._getScrollExtension().scroll(false,true,true);if(r<P){if(this.getFixedRowCount()>0||c.type===C.ROWACTION){T.focusItem(this,d-j*(i-h),e);}else{T.focusItem(this,d-j*h,e);}}}else if(i>h+this.getFixedRowCount()&&i<h+T.getNonEmptyVisibleRowCount(this)){T.focusItem(this,d-j*(i-h-this.getFixedRowCount()),e);}else{T.focusItem(this,d-j*(i-h-T.getNonEmptyVisibleRowCount(this)+1),e);}}if(c.type===C.ROWACTION&&i===h&&this.getFixedRowCount()>0){p(e);}}};b.prototype.onsappagedown=function(e){if(this._getKeyboardExtension().isInActionMode()){return;}var c=T.getCellInfo(e.target)||{};if(c.type===C.DATACELL||c.type===C.ROWHEADER||c.type===C.COLUMNHEADER||c.type===C.ROWACTION||c.type===C.COLUMNROWHEADER){p(e);var F=T.getFocusedItemInfo(this);var i=F.row;var h=T.getHeaderRowCount(this);var n=T.getNonEmptyVisibleRowCount(this);if((T.isNoDataVisible(this)&&i<h-1)||this.getFixedBottomRowCount()===0||i<h+n-1){var d=F.cell;var j=F.columnCount;if(i<h-1&&c.type!==C.COLUMNROWHEADER){T.focusItem(this,d+j*(h-i-1),e);}else if(i<h){if(!T.isNoDataVisible(this)){T.focusItem(this,d+j*(h-i),e);}}else if(i>=h&&i<h+n-this.getFixedBottomRowCount()-1){T.focusItem(this,d+j*(h+n-this.getFixedBottomRowCount()-i-1),e);}else if(i===h+n-this.getFixedBottomRowCount()-1){var P=T.getNonEmptyVisibleRowCount(this)-this.getFixedRowCount()-this.getFixedBottomRowCount();var r=this._getRowCount()-this.getFixedBottomRowCount()-this.getFirstVisibleRow()-P*2;this._getScrollExtension().scroll(true,true,true);if(r<P&&this.getFixedBottomRowCount()>0){T.focusItem(this,d+j*(h+n-i-1),e);}}else{T.focusItem(this,d+j*(h+n-i-1),e);}}}};b.prototype.onsappageupmodifiers=function(e){if(this._getKeyboardExtension().isInActionMode()){return;}if(b._isKeyCombination(e,null,M.ALT)){var c=T.getCellInfo(e.target)||{};if(c.type===C.DATACELL||c.type===C.COLUMNHEADER){var F=T.getFocusedItemInfo(this);var i=F.cell;var d=F.cellInRow;var h=T.hasRowHeader(this);var r=h?1:0;var P=H;p(e);if(h&&(T.Grouping.isInGroupingRow(e.target)||d===1)){T.focusItem(this,i-d,null);}else if(d-r<P){T.focusItem(this,i-d+r,null);}else{T.focusItem(this,i-P,null);}}else if(c.type===C.ROWACTION){var F=T.getFocusedItemInfo(this);T.focusItem(this,F.cell-1,null);}}};b.prototype.onsappagedownmodifiers=function(e){if(this._getKeyboardExtension().isInActionMode()){return;}if(b._isKeyCombination(e,null,M.ALT)){var c=T.getCellInfo(e.target)||{};if(c.type===C.DATACELL||c.type===C.ROWHEADER||c.type===C.COLUMNHEADER||c.type===C.COLUMNROWHEADER){var F=T.getFocusedItemInfo(this);var i=F.cellInRow;var h=T.hasRowHeader(this);var r=h?1:0;var v=T.getVisibleColumnCount(this);var d=parseInt(c.cell.attr("colspan")||1,10);p(e);if(i+d-r<v){var j=F.cell;var P=H;if(h&&i===0){T.focusItem(this,j+1,null);}else if(d>P){T.focusItem(this,j+d,null);}else if(i+d-r+P>v){T.focusItem(this,j+v-i-1+r,null);}else if(!T.Grouping.isInGroupingRow(e.target)){T.focusItem(this,j+P,null);}}else if(c.type===C.DATACELL&&T.hasRowActions(this)&&i==F.columnCount-2){T.focusItem(this,F.cell+1,null);}}}};b.prototype.onsapenter=function(e){b._handleSpaceAndEnter(this,e);};return b;});