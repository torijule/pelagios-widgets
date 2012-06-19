/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.6.0
*/

YAHOO.util.DragDropMgr||(YAHOO.util.DragDropMgr=function(){var A=YAHOO.util.Event,B=YAHOO.util.Dom;return{useShim:!1,_shimActive:!1,_shimState:!1,_debugShim:!1,_createShim:function(){var C=document.createElement("div");C.id="yui-ddm-shim",document.body.firstChild?document.body.insertBefore(C,document.body.firstChild):document.body.appendChild(C),C.style.display="none",C.style.backgroundColor="red",C.style.position="absolute",C.style.zIndex="99999",B.setStyle(C,"opacity","0"),this._shim=C,A.on(C,"mouseup",this.handleMouseUp,this,!0),A.on(C,"mousemove",this.handleMouseMove,this,!0),A.on(window,"scroll",this._sizeShim,this,!0)},_sizeShim:function(){if(this._shimActive){var C=this._shim;C.style.height=B.getDocumentHeight()+"px",C.style.width=B.getDocumentWidth()+"px",C.style.top="0",C.style.left="0"}},_activateShim:function(){if(this.useShim){this._shim||this._createShim(),this._shimActive=!0;var C=this._shim,D="0";this._debugShim&&(D=".5"),B.setStyle(C,"opacity",D),this._sizeShim(),C.style.display="block"}},_deactivateShim:function(){this._shim.style.display="none",this._shimActive=!1},_shim:null,ids:{},handleIds:{},dragCurrent:null,dragOvers:{},deltaX:0,deltaY:0,preventDefault:!0,stopPropagation:!0,initialized:!1,locked:!1,interactionInfo:null,init:function(){this.initialized=!0},POINT:0,INTERSECT:1,STRICT_INTERSECT:2,mode:0,_execOnAll:function(E,D){for(var F in this.ids)for(var C in this.ids[F]){var G=this.ids[F][C];if(!this.isTypeOfDD(G))continue;G[E].apply(G,D)}},_onLoad:function(){this.init(),A.on(document,"mouseup",this.handleMouseUp,this,!0),A.on(document,"mousemove",this.handleMouseMove,this,!0),A.on(window,"unload",this._onUnload,this,!0),A.on(window,"resize",this._onResize,this,!0)},_onResize:function(C){this._execOnAll("resetConstraints",[])},lock:function(){this.locked=!0},unlock:function(){this.locked=!1},isLocked:function(){return this.locked},locationCache:{},useCache:!0,clickPixelThresh:3,clickTimeThresh:1e3,dragThreshMet:!1,clickTimeout:null,startX:0,startY:0,fromTimeout:!1,regDragDrop:function(D,C){this.initialized||this.init(),this.ids[C]||(this.ids[C]={}),this.ids[C][D.id]=D},removeDDFromGroup:function(E,C){this.ids[C]||(this.ids[C]={});var D=this.ids[C];D&&D[E.id]&&delete D[E.id]},_remove:function(E){for(var D in E.groups)if(D){var C=this.ids[D];C&&C[E.id]&&delete C[E.id]}delete this.handleIds[E.id]},regHandle:function(D,C){this.handleIds[D]||(this.handleIds[D]={}),this.handleIds[D][C]=C},isDragDrop:function(C){return this.getDDById(C)?!0:!1},getRelated:function(H,D){var G=[];for(var F in H.groups)for(var E in this.ids[F]){var C=this.ids[F][E];if(!this.isTypeOfDD(C))continue;if(!D||C.isTarget)G[G.length]=C}return G},isLegalTarget:function(G,F){var D=this.getRelated(G,!0);for(var E=0,C=D.length;E<C;++E)if(D[E].id==F.id)return!0;return!1},isTypeOfDD:function(C){return C&&C.__ygDragDrop},isHandle:function(D,C){return this.handleIds[D]&&this.handleIds[D][C]},getDDById:function(D){for(var C in this.ids)if(this.ids[C][D])return this.ids[C][D];return null},handleMouseDown:function(E,D){this.currentTarget=YAHOO.util.Event.getTarget(E),this.dragCurrent=D;var C=D.getEl();this.startX=YAHOO.util.Event.getPageX(E),this.startY=YAHOO.util.Event.getPageY(E),this.deltaX=this.startX-C.offsetLeft,this.deltaY=this.startY-C.offsetTop,this.dragThreshMet=!1,this.clickTimeout=setTimeout(function(){var F=YAHOO.util.DDM;F.startDrag(F.startX,F.startY),F.fromTimeout=!0},this.clickTimeThresh)},startDrag:function(C,E){this.dragCurrent&&this.dragCurrent.useShim&&(this._shimState=this.useShim,this.useShim=!0),this._activateShim(),clearTimeout(this.clickTimeout);var D=this.dragCurrent;D&&D.events.b4StartDrag&&(D.b4StartDrag(C,E),D.fireEvent("b4StartDragEvent",{x:C,y:E})),D&&D.events.startDrag&&(D.startDrag(C,E),D.fireEvent("startDragEvent",{x:C,y:E})),this.dragThreshMet=!0},handleMouseUp:function(C){this.dragCurrent&&(clearTimeout(this.clickTimeout),this.dragThreshMet&&(this.fromTimeout&&(this.fromTimeout=!1,this.handleMouseMove(C)),this.fromTimeout=!1,this.fireEvents(C,!0)),this.stopDrag(C),this.stopEvent(C))},stopEvent:function(C){this.stopPropagation&&YAHOO.util.Event.stopPropagation(C),this.preventDefault&&YAHOO.util.Event.preventDefault(C)},stopDrag:function(E,D){var C=this.dragCurrent;C&&!D&&(this.dragThreshMet&&(C.events.b4EndDrag&&(C.b4EndDrag(E),C.fireEvent("b4EndDragEvent",{e:E})),C.events.endDrag&&(C.endDrag(E),C.fireEvent("endDragEvent",{e:E}))),C.events.mouseUp&&(C.onMouseUp(E),C.fireEvent("mouseUpEvent",{e:E}))),this._shimActive&&(this._deactivateShim(),this.dragCurrent&&this.dragCurrent.useShim&&(this.useShim=this._shimState,this._shimState=!1)),this.dragCurrent=null,this.dragOvers={}},handleMouseMove:function(F){var C=this.dragCurrent;if(C){if(YAHOO.util.Event.isIE&&!F.button)return this.stopEvent(F),this.handleMouseUp(F);!(F.clientX<0||F.clientY<0);if(!this.dragThreshMet){var E=Math.abs(this.startX-YAHOO.util.Event.getPageX(F)),D=Math.abs(this.startY-YAHOO.util.Event.getPageY(F));(E>this.clickPixelThresh||D>this.clickPixelThresh)&&this.startDrag(this.startX,this.startY)}this.dragThreshMet&&(C&&C.events.b4Drag&&(C.b4Drag(F),C.fireEvent("b4DragEvent",{e:F})),C&&C.events.drag&&(C.onDrag(F),C.fireEvent("dragEvent",{e:F})),C&&this.fireEvents(F,!1)),this.stopEvent(F)}},fireEvents:function(V,L){var a=this.dragCurrent;if(!a||a.isLocked()||a.dragOnly)return;var N=YAHOO.util.Event.getPageX(V),M=YAHOO.util.Event.getPageY(V),P=new YAHOO.util.Point(N,M),K=a.getTargetCoord(P.x,P.y),F=a.getDragEl(),E=["out","over","drop","enter"],U=new YAHOO.util.Region(K.y,K.x+F.offsetWidth,K.y+F.offsetHeight,K.x),I=[],D={},Q=[],c={outEvts:[],overEvts:[],dropEvts:[],enterEvts:[]};for(var S in this.dragOvers){var d=this.dragOvers[S];if(!this.isTypeOfDD(d))continue;this.isOverTarget(P,d,this.mode,U)||c.outEvts.push(d),I[S]=!0,delete this.dragOvers[S]}for(var R in a.groups){if("string"!=typeof R)continue;for(S in this.ids[R]){var G=this.ids[R][S];if(!this.isTypeOfDD(G))continue;G.isTarget&&!G.isLocked()&&G!=a&&this.isOverTarget(P,G,this.mode,U)&&(D[R]=!0,L?c.dropEvts.push(G):(I[G.id]?c.overEvts.push(G):c.enterEvts.push(G),this.dragOvers[G.id]=G))}}this.interactionInfo={out:c.outEvts,enter:c.enterEvts,over:c.overEvts,drop:c.dropEvts,point:P,draggedRegion:U,sourceRegion:this.locationCache[a.id],validDrop:L};for(var C in D)Q.push(C);L&&!c.dropEvts.length&&(this.interactionInfo.validDrop=!1,a.events.invalidDrop&&(a.onInvalidDrop(V),a.fireEvent("invalidDropEvent",{e:V})));for(S=0;S<E.length;S++){var Y=null;c[E[S]+"Evts"]&&(Y=c[E[S]+"Evts"]);if(Y&&Y.length){var H=E[S].charAt(0).toUpperCase()+E[S].substr(1),X="onDrag"+H,J="b4Drag"+H,O="drag"+H+"Event",W="drag"+H;if(this.mode)a.events[J]&&(a[J](V,Y,Q),a.fireEvent(J+"Event",{event:V,info:Y,group:Q})),a.events[W]&&(a[X](V,Y,Q),a.fireEvent(O,{event:V,info:Y,group:Q}));else for(var Z=0,T=Y.length;Z<T;++Z)a.events[J]&&(a[J](V,Y[Z].id,Q[0]),a.fireEvent(J+"Event",{event:V,info:Y[Z].id,group:Q[0]})),a.events[W]&&(a[X](V,Y[Z].id,Q[0]),a.fireEvent(O,{event:V,info:Y[Z].id,group:Q[0]}))}}},getBestMatch:function(E){var G=null,D=E.length;if(D==1)G=E[0];else for(var F=0;F<D;++F){var C=E[F];if(this.mode==this.INTERSECT&&C.cursorIsOver){G=C;break}if(!G||!G.overlap||C.overlap&&G.overlap.getArea()<C.overlap.getArea())G=C}return G},refreshCache:function(D){var F=D||this.ids;for(var C in F){if("string"!=typeof C)continue;for(var E in this.ids[C]){var G=this.ids[C][E];if(this.isTypeOfDD(G)){var H=this.getLocation(G);H?this.locationCache[G.id]=H:delete this.locationCache[G.id]}}}},verifyEl:function(D){try{if(D){var C=D.offsetParent;if(C)return!0}}catch(E){}return!1},getLocation:function(H){if(!this.isTypeOfDD(H))return null;var F=H.getEl(),K,E,D,M,L,N,C,J,G;try{K=YAHOO.util.Dom.getXY(F)}catch(I){}return K?(E=K[0],D=E+F.offsetWidth,M=K[1],L=M+F.offsetHeight,N=M-H.padding[0],C=D+H.padding[1],J=L+H.padding[2],G=E-H.padding[3],new YAHOO.util.Region(N,C,J,G)):null},isOverTarget:function(K,C,E,F){var G=this.locationCache[C.id];if(!G||!this.useCache)G=this.getLocation(C),this.locationCache[C.id]=G;if(!G)return!1;C.cursorIsOver=G.contains(K);var J=this.dragCurrent;if(!J||!E&&!J.constrainX&&!J.constrainY)return C.cursorIsOver;C.overlap=null;if(!F){var H=J.getTargetCoord(K.x,K.y),D=J.getDragEl();F=new YAHOO.util.Region(H.y,H.x+D.offsetWidth,H.y+D.offsetHeight,H.x)}var I=F.intersect(G);return I?(C.overlap=I,E?!0:C.cursorIsOver):!1},_onUnload:function(D,C){this.unregAll()},unregAll:function(){this.dragCurrent&&(this.stopDrag(),this.dragCurrent=null),this._execOnAll("unreg",[]),this.ids={}},elementCache:{},getElWrapper:function(D){var C=this.elementCache[D];if(!C||!C.el)C=this.elementCache[D]=new this.ElementWrapper(YAHOO.util.Dom.get(D));return C},getElement:function(C){return YAHOO.util.Dom.get(C)},getCss:function(D){var C=YAHOO.util.Dom.get(D);return C?C.style:null},ElementWrapper:function(C){this.el=C||null,this.id=this.el&&C.id,this.css=this.el&&C.style},getPosX:function(C){return YAHOO.util.Dom.getX(C)},getPosY:function(C){return YAHOO.util.Dom.getY(C)},swapNode:function(E,C){if(E.swapNode)E.swapNode(C);else{var F=C.parentNode,D=C.nextSibling;D==E?F.insertBefore(E,C):C==E.nextSibling?F.insertBefore(C,E):(E.parentNode.replaceChild(C,E),F.insertBefore(E,D))}},getScroll:function(){var E,C,F=document.documentElement,D=document.body;return F&&(F.scrollTop||F.scrollLeft)?(E=F.scrollTop,C=F.scrollLeft):D&&(E=D.scrollTop,C=D.scrollLeft),{top:E,left:C}},getStyle:function(D,C){return YAHOO.util.Dom.getStyle(D,C)},getScrollTop:function(){return this.getScroll().top},getScrollLeft:function(){return this.getScroll().left},moveToEl:function(C,E){var D=YAHOO.util.Dom.getXY(E);YAHOO.util.Dom.setXY(C,D)},getClientHeight:function(){return YAHOO.util.Dom.getViewportHeight()},getClientWidth:function(){return YAHOO.util.Dom.getViewportWidth()},numericSort:function(D,C){return D-C},_timeoutCount:0,_addListeners:function(){var C=YAHOO.util.DDM;YAHOO.util.Event&&document?C._onLoad():C._timeoutCount>2e3||(setTimeout(C._addListeners,10),document&&document.body&&(C._timeoutCount+=1))},handleWasClicked:function(C,E){if(this.isHandle(E,C.id))return!0;var D=C.parentNode;while(D){if(this.isHandle(E,D.id))return!0;D=D.parentNode}return!1}}}(),YAHOO.util.DDM=YAHOO.util.DragDropMgr,YAHOO.util.DDM._addListeners()),function(){var A=YAHOO.util.Event,B=YAHOO.util.Dom;YAHOO.util.DragDrop=function(E,C,D){E&&this.init(E,C,D)},YAHOO.util.DragDrop.prototype={events:null,on:function(){this.subscribe.apply(this,arguments)},id:null,config:null,dragElId:null,handleElId:null,invalidHandleTypes:null,invalidHandleIds:null,invalidHandleClasses:null,startPageX:0,startPageY:0,groups:null,locked:!1,lock:function(){this.locked=!0},unlock:function(){this.locked=!1},isTarget:!0,padding:null,dragOnly:!1,useShim:!1,_domRef:null,__ygDragDrop:!0,constrainX:!1,constrainY:!1,minX:0,maxX:0,minY:0,maxY:0,deltaX:0,deltaY:0,maintainOffset:!1,xTicks:null,yTicks:null,primaryButtonOnly:!0,available:!1,hasOuterHandles:!1,cursorIsOver:!1,overlap:null,b4StartDrag:function(C,D){},startDrag:function(C,D){},b4Drag:function(C){},onDrag:function(C){},onDragEnter:function(C,D){},b4DragOver:function(C){},onDragOver:function(C,D){},b4DragOut:function(C){},onDragOut:function(C,D){},b4DragDrop:function(C){},onDragDrop:function(C,D){},onInvalidDrop:function(C){},b4EndDrag:function(C){},endDrag:function(C){},b4MouseDown:function(C){},onMouseDown:function(C){},onMouseUp:function(C){},onAvailable:function(){},getEl:function(){return this._domRef||(this._domRef=B.get(this.id)),this._domRef},getDragEl:function(){return B.get(this.dragElId)},init:function(F,C,D){this.initTarget(F,C,D),A.on(this._domRef||this.id,"mousedown",this.handleMouseDown,this,!0);for(var E in this.events)this.createEvent(E+"Event")},initTarget:function(E,C,D){this.config=D||{},this.events={},this.DDM=YAHOO.util.DDM,this.groups={},typeof E!="string"&&(this._domRef=E,E=B.generateId(E)),this.id=E,this.addToGroup(C?C:"default"),this.handleElId=E,A.onAvailable(E,this.handleOnAvailable,this,!0),this.setDragElId(E),this.invalidHandleTypes={A:"A"},this.invalidHandleIds={},this.invalidHandleClasses=[],this.applyConfig()},applyConfig:function(){this.events={mouseDown:!0,b4MouseDown:!0,mouseUp:!0,b4StartDrag:!0,startDrag:!0,b4EndDrag:!0,endDrag:!0,drag:!0,b4Drag:!0,invalidDrop:!0,b4DragOut:!0,dragOut:!0,dragEnter:!0,b4DragOver:!0,dragOver:!0,b4DragDrop:!0,dragDrop:!0};if(this.config.events)for(var C in this.config.events)this.config.events[C]===!1&&(this.events[C]=!1);this.padding=this.config.padding||[0,0,0,0],this.isTarget=this.config.isTarget!==!1,this.maintainOffset=this.config.maintainOffset,this.primaryButtonOnly=this.config.primaryButtonOnly!==!1,this.dragOnly=this.config.dragOnly===!0?!0:!1,this.useShim=this.config.useShim===!0?!0:!1},handleOnAvailable:function(){this.available=!0,this.resetConstraints(),this.onAvailable()},setPadding:function(E,C,F,D){!C&&0!==C?this.padding=[E,E,E,E]:!F&&0!==F?this.padding=[E,C,E,C]:this.padding=[E,C,F,D]},setInitPosition:function(F,E){var G=this.getEl();if(!this.DDM.verifyEl(G)){!G||!G.style||G.style.display!="none";return}var D=F||0,C=E||0,H=B.getXY(G);this.initPageX=H[0]-D,this.initPageY=H[1]-C,this.lastPageX=H[0],this.lastPageY=H[1],this.setStartPosition(H)},setStartPosition:function(D){var C=D||B.getXY(this.getEl());this.deltaSetXY=null,this.startPageX=C[0],this.startPageY=C[1]},addToGroup:function(C){this.groups[C]=!0,this.DDM.regDragDrop(this,C)},removeFromGroup:function(C){this.groups[C]&&delete this.groups[C],this.DDM.removeDDFromGroup(this,C)},setDragElId:function(C){this.dragElId=C},setHandleElId:function(C){typeof C!="string"&&(C=B.generateId(C)),this.handleElId=C,this.DDM.regHandle(this.id,C)},setOuterHandleElId:function(C){typeof C!="string"&&(C=B.generateId(C)),A.on(C,"mousedown",this.handleMouseDown,this,!0),this.setHandleElId(C),this.hasOuterHandles=!0},unreg:function(){A.removeListener(this.id,"mousedown",this.handleMouseDown),this._domRef=null,this.DDM._remove(this)},isLocked:function(){return this.DDM.isLocked()||this.locked},handleMouseDown:function(J,I){var D=J.which||J.button;if(this.primaryButtonOnly&&D>1)return;if(this.isLocked())return;var C=this.b4MouseDown(J),F=!0;this.events.b4MouseDown&&(F=this.fireEvent("b4MouseDownEvent",J));var E=this.onMouseDown(J),H=!0;this.events.mouseDown&&(H=this.fireEvent("mouseDownEvent",J));if(C===!1||E===!1||F===!1||H===!1)return;this.DDM.refreshCache(this.groups);var G=new YAHOO.util.Point(A.getPageX(J),A.getPageY(J));(!!this.hasOuterHandles||!!this.DDM.isOverTarget(G,this))&&this.clickValidator(J)&&(this.setStartPosition(),this.DDM.handleMouseDown(J,this),this.DDM.stopEvent(J))},clickValidator:function(D){var C=YAHOO.util.Event.getTarget(D);return this.isValidHandleChild(C)&&(this.id==this.handleElId||this.DDM.handleWasClicked(C,this.id))},getTargetCoord:function(E,D){var C=E-this.deltaX,F=D-this.deltaY;return this.constrainX&&(C<this.minX&&(C=this.minX),C>this.maxX&&(C=this.maxX)),this.constrainY&&(F<this.minY&&(F=this.minY),F>this.maxY&&(F=this.maxY)),C=this.getTick(C,this.xTicks),F=this.getTick(F,this.yTicks),{x:C,y:F}},addInvalidHandleType:function(C){var D=C.toUpperCase();this.invalidHandleTypes[D]=D},addInvalidHandleId:function(C){typeof C!="string"&&(C=B.generateId(C)),this.invalidHandleIds[C]=C},addInvalidHandleClass:function(C){this.invalidHandleClasses.push(C)},removeInvalidHandleType:function(C){var D=C.toUpperCase();delete this.invalidHandleTypes[D]},removeInvalidHandleId:function(C){typeof C!="string"&&(C=B.generateId(C)),delete this.invalidHandleIds[C]},removeInvalidHandleClass:function(D){for(var E=0,C=this.invalidHandleClasses.length;E<C;++E)this.invalidHandleClasses[E]==D&&delete this.invalidHandleClasses[E]},isValidHandleChild:function(F){var E=!0,H;try{H=F.nodeName.toUpperCase()}catch(G){H=F.nodeName}E=E&&!this.invalidHandleTypes[H],E=E&&!this.invalidHandleIds[F.id];for(var D=0,C=this.invalidHandleClasses.length;E&&D<C;++D)E=!B.hasClass(F,this.invalidHandleClasses[D]);return E},setXTicks:function(F,C){this.xTicks=[],this.xTickSize=C;var E={};for(var D=this.initPageX;D>=this.minX;D-=C)E[D]||(this.xTicks[this.xTicks.length]=D,E[D]=!0);for(D=this.initPageX;D<=this.maxX;D+=C)E[D]||(this.xTicks[this.xTicks.length]=D,E[D]=!0);this.xTicks.sort(this.DDM.numericSort)},setYTicks:function(F,C){this.yTicks=[],this.yTickSize=C;var E={};for(var D=this.initPageY;D>=this.minY;D-=C)E[D]||(this.yTicks[this.yTicks.length]=D,E[D]=!0);for(D=this.initPageY;D<=this.maxY;D+=C)E[D]||(this.yTicks[this.yTicks.length]=D,E[D]=!0);this.yTicks.sort(this.DDM.numericSort)},setXConstraint:function(E,D,C){this.leftConstraint=parseInt(E,10),this.rightConstraint=parseInt(D,10),this.minX=this.initPageX-this.leftConstraint,this.maxX=this.initPageX+this.rightConstraint,C&&this.setXTicks(this.initPageX,C),this.constrainX=!0},clearConstraints:function(){this.constrainX=!1,this.constrainY=!1,this.clearTicks()},clearTicks:function(){this.xTicks=null,this.yTicks=null,this.xTickSize=0,this.yTickSize=0},setYConstraint:function(C,E,D){this.topConstraint=parseInt(C,10),this.bottomConstraint=parseInt(E,10),this.minY=this.initPageY-this.topConstraint,this.maxY=this.initPageY+this.bottomConstraint,D&&this.setYTicks(this.initPageY,D),this.constrainY=!0},resetConstraints:function(){if(this.initPageX||this.initPageX===0){var D=this.maintainOffset?this.lastPageX-this.initPageX:0,C=this.maintainOffset?this.lastPageY-this.initPageY:0;this.setInitPosition(D,C)}else this.setInitPosition();this.constrainX&&this.setXConstraint(this.leftConstraint,this.rightConstraint,this.xTickSize),this.constrainY&&this.setYConstraint(this.topConstraint,this.bottomConstraint,this.yTickSize)},getTick:function(I,F){if(!F)return I;if(F[0]>=I)return F[0];for(var D=0,C=F.length;D<C;++D){var E=D+1;if(F[E]&&F[E]>=I){var H=I-F[D],G=F[E]-I;return G>H?F[D]:F[E]}}return F[F.length-1]},toString:function(){return"DragDrop "+this.id}},YAHOO.augment(YAHOO.util.DragDrop,YAHOO.util.EventProvider)}(),YAHOO.util.DD=function(C,A,B){C&&this.init(C,A,B)},YAHOO.extend(YAHOO.util.DD,YAHOO.util.DragDrop,{scroll:!0,autoOffset:function(C,B){var A=C-this.startPageX,D=B-this.startPageY;this.setDelta(A,D)},setDelta:function(B,A){this.deltaX=B,this.deltaY=A},setDragElPos:function(C,B){var A=this.getDragEl();this.alignElWithMouse(A,C,B)},alignElWithMouse:function(C,G,F){var E=this.getTargetCoord(G,F);if(!this.deltaSetXY){var H=[E.x,E.y];YAHOO.util.Dom.setXY(C,H);var D=parseInt(YAHOO.util.Dom.getStyle(C,"left"),10),B=parseInt(YAHOO.util.Dom.getStyle(C,"top"),10);this.deltaSetXY=[D-E.x,B-E.y]}else YAHOO.util.Dom.setStyle(C,"left",E.x+this.deltaSetXY[0]+"px"),YAHOO.util.Dom.setStyle(C,"top",E.y+this.deltaSetXY[1]+"px");this.cachePosition(E.x,E.y);var A=this;setTimeout(function(){A.autoScroll.call(A,E.x,E.y,C.offsetHeight,C.offsetWidth)},0)},cachePosition:function(B,A){if(B)this.lastPageX=B,this.lastPageY=A;else{var C=YAHOO.util.Dom.getXY(this.getEl());this.lastPageX=C[0],this.lastPageY=C[1]}},autoScroll:function(J,I,E,K){if(this.scroll){var L=this.DDM.getClientHeight(),B=this.DDM.getClientWidth(),N=this.DDM.getScrollTop(),D=this.DDM.getScrollLeft(),H=E+I,M=K+J,G=L+N-I-this.deltaY,F=B+D-J-this.deltaX,C=40,A=document.all?80:30;H>L&&G<C&&window.scrollTo(D,N+A),I<N&&N>0&&I-N<C&&window.scrollTo(D,N-A),M>B&&F<C&&window.scrollTo(D+A,N),J<D&&D>0&&J-D<C&&window.scrollTo(D-A,N)}},applyConfig:function(){YAHOO.util.DD.superclass.applyConfig.call(this),this.scroll=this.config.scroll!==!1},b4MouseDown:function(A){this.setStartPosition(),this.autoOffset(YAHOO.util.Event.getPageX(A),YAHOO.util.Event.getPageY(A))},b4Drag:function(A){this.setDragElPos(YAHOO.util.Event.getPageX(A),YAHOO.util.Event.getPageY(A))},toString:function(){return"DD "+this.id}}),YAHOO.util.DDProxy=function(C,A,B){C&&(this.init(C,A,B),this.initFrame())},YAHOO.util.DDProxy.dragElId="ygddfdiv",YAHOO.extend(YAHOO.util.DDProxy,YAHOO.util.DD,{resizeFrame:!0,centerFrame:!1,createFrame:function(){var B=this,A=document.body;if(!A||!A.firstChild){setTimeout(function(){B.createFrame()},50);return}var G=this.getDragEl(),E=YAHOO.util.Dom;if(!G){G=document.createElement("div"),G.id=this.dragElId;var D=G.style;D.position="absolute",D.visibility="hidden",D.cursor="move",D.border="2px solid #aaa",D.zIndex=999,D.height="25px",D.width="25px";var C=document.createElement("div");E.setStyle(C,"height","100%"),E.setStyle(C,"width","100%"),E.setStyle(C,"background-color","#ccc"),E.setStyle(C,"opacity","0"),G.appendChild(C);if(YAHOO.env.ua.ie){var F=document.createElement("iframe");F.setAttribute("src","javascript: false;"),F.setAttribute("scrolling","no"),F.setAttribute("frameborder","0"),G.insertBefore(F,G.firstChild),E.setStyle(F,"height","100%"),E.setStyle(F,"width","100%"),E.setStyle(F,"position","absolute"),E.setStyle(F,"top","0"),E.setStyle(F,"left","0"),E.setStyle(F,"opacity","0"),E.setStyle(F,"zIndex","-1"),E.setStyle(F.nextSibling,"zIndex","2")}A.insertBefore(G,A.firstChild)}},initFrame:function(){this.createFrame()},applyConfig:function(){YAHOO.util.DDProxy.superclass.applyConfig.call(this),this.resizeFrame=this.config.resizeFrame!==!1,this.centerFrame=this.config.centerFrame,this.setDragElId(this.config.dragElId||YAHOO.util.DDProxy.dragElId)},showFrame:function(E,D){var C=this.getEl(),A=this.getDragEl(),B=A.style;this._resizeProxy(),this.centerFrame&&this.setDelta(Math.round(parseInt(B.width,10)/2),Math.round(parseInt(B.height,10)/2)),this.setDragElPos(E,D),YAHOO.util.Dom.setStyle(A,"visibility","visible")},_resizeProxy:function(){if(this.resizeFrame){var H=YAHOO.util.Dom,B=this.getEl(),C=this.getDragEl(),G=parseInt(H.getStyle(C,"borderTopWidth"),10),I=parseInt(H.getStyle(C,"borderRightWidth"),10),F=parseInt(H.getStyle(C,"borderBottomWidth"),10),D=parseInt(H.getStyle(C,"borderLeftWidth"),10);isNaN(G)&&(G=0),isNaN(I)&&(I=0),isNaN(F)&&(F=0),isNaN(D)&&(D=0);var E=Math.max(0,B.offsetWidth-I-D),A=Math.max(0,B.offsetHeight-G-F);H.setStyle(C,"width",E+"px"),H.setStyle(C,"height",A+"px")}},b4MouseDown:function(B){this.setStartPosition();var A=YAHOO.util.Event.getPageX(B),C=YAHOO.util.Event.getPageY(B);this.autoOffset(A,C)},b4StartDrag:function(A,B){this.showFrame(A,B)},b4EndDrag:function(A){YAHOO.util.Dom.setStyle(this.getDragEl(),"visibility","hidden")},endDrag:function(D){var C=YAHOO.util.Dom,B=this.getEl(),A=this.getDragEl();C.setStyle(A,"visibility",""),C.setStyle(B,"visibility","hidden"),YAHOO.util.DDM.moveToEl(B,A),C.setStyle(A,"visibility","hidden"),C.setStyle(B,"visibility","")},toString:function(){return"DDProxy "+this.id}}),YAHOO.util.DDTarget=function(C,A,B){C&&this.initTarget(C,A,B)},YAHOO.extend(YAHOO.util.DDTarget,YAHOO.util.DragDrop,{toString:function(){return"DDTarget "+this.id}}),YAHOO.register("dragdrop",YAHOO.util.DragDropMgr,{version:"2.6.0",build:"1321"})