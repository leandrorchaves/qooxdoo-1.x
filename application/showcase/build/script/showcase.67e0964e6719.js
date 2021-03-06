qx.$$packageData['789']={"locales":{},"resources":{},"translations":{}};
qx.Part.$$notifyLoad("789", function() {
(function(){var a="qx.ui.window.IWindowManager";
qx.Interface.define(a,{members:{setDesktop:function(b){this.assertInterface(b,qx.ui.window.IDesktop);
},changeActiveWindow:function(c,d){},updateStack:function(){},bringToFront:function(e){this.assertInstance(e,qx.ui.window.Window);
},sendToBack:function(f){this.assertInstance(f,qx.ui.window.Window);
}}});
})();
(function(){var b="__hk",a="qx.ui.window.Manager";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.ui.window.IWindowManager,members:{__hk:null,setDesktop:function(c){this.__hk=c;
this.updateStack();
},getDesktop:function(){return this.__hk;
},changeActiveWindow:function(d,e){if(d){this.bringToFront(d);
d.setActive(true);
}
if(e){e.resetActive();
}},_minZIndex:1e5,updateStack:function(){qx.ui.core.queue.Widget.add(this);
},syncWidget:function(){this.__hk.forceUnblockContent();
var f=this.__hk.getWindows();
var h=this._minZIndex;
var m=h+f.length*2;
var j=h+f.length*4;
var k=null;

for(var i=0,l=f.length;i<l;i++){var g=f[i];
if(!g.isVisible()){continue;
}k=k||g;
if(g.isModal()){g.setZIndex(j);
this.__hk.blockContent(j-1);
j+=2;
k=g;
}else if(g.isAlwaysOnTop()){g.setZIndex(m);
m+=2;
}else{g.setZIndex(h);
h+=2;
}if(!k.isModal()&&g.isActive()||g.getZIndex()>k.getZIndex()){k=g;
}}this.__hk.setActiveWindow(k);
},bringToFront:function(n){var o=this.__hk.getWindows();
var p=qx.lang.Array.remove(o,n);

if(p){o.push(n);
this.updateStack();
}},sendToBack:function(q){var r=this.__hk.getWindows();
var s=qx.lang.Array.remove(r,q);

if(s){r.unshift(q);
this.updateStack();
}}},destruct:function(){this._disposeObjects(b);
}});
})();
(function(){var l="move",k="Boolean",j="mouseup",i="mousedown",h="losecapture",g="qx.ui.core.MMovable",f="__gC",d="mousemove",c="maximized",b="__gB",a="move-frame";
qx.Mixin.define(g,{properties:{movable:{check:k,init:true},useMoveFrame:{check:k,init:false}},members:{__gB:null,__gC:null,__gD:null,__gE:null,__gF:null,__gG:null,__gH:null,__gI:false,__gJ:null,__gK:0,_activateMoveHandle:function(m){if(this.__gB){throw new Error("The move handle could not be redefined!");
}this.__gB=m;
m.addListener(i,this._onMoveMouseDown,this);
m.addListener(j,this._onMoveMouseUp,this);
m.addListener(d,this._onMoveMouseMove,this);
m.addListener(h,this.__gO,this);
},__gL:function(){var n=this.__gC;

if(!n){n=this.__gC=new qx.ui.core.Widget();
n.setAppearance(a);
n.exclude();
qx.core.Init.getApplication().getRoot().add(n);
}return n;
},__gM:function(){var location=this.getContainerLocation();
var p=this.getBounds();
var o=this.__gL();
o.setUserBounds(location.left,location.top,p.width,p.height);
o.show();
o.setZIndex(this.getZIndex()+1);
},__gN:function(e){var r=this.__gD;
var u=Math.max(r.left,Math.min(r.right,e.getDocumentLeft()));
var t=Math.max(r.top,Math.min(r.bottom,e.getDocumentTop()));
var q=this.__gE+u;
var s=this.__gF+t;
return {viewportLeft:q,viewportTop:s,parentLeft:q-this.__gG,parentTop:s-this.__gH};
},_onMoveMouseDown:function(e){if(!this.getMovable()||this.hasState(c)){return;
}var parent=this.getLayoutParent();
var w=parent.getContentLocation();
var x=parent.getBounds();
if(qx.Class.implementsInterface(parent,qx.ui.window.IDesktop)){if(!parent.isContentBlocked()){this.__gJ=parent.getBlockerColor();
this.__gK=parent.getBlockerOpacity();
parent.setBlockerColor(null);
parent.setBlockerOpacity(1);
parent.blockContent(this.getZIndex()-1);
this.__gI=true;
}}this.__gD={left:w.left,top:w.top,right:w.left+x.width,bottom:w.top+x.height};
var v=this.getContainerLocation();
this.__gG=w.left;
this.__gH=w.top;
this.__gE=v.left-e.getDocumentLeft();
this.__gF=v.top-e.getDocumentTop();
this.addState(l);
this.__gB.capture();
if(this.getUseMoveFrame()){this.__gM();
}e.stop();
},_onMoveMouseMove:function(e){if(!this.hasState(l)){return;
}var y=this.__gN(e);

if(this.getUseMoveFrame()){this.__gL().setDomPosition(y.viewportLeft,y.viewportTop);
}else{this.setDomPosition(y.parentLeft,y.parentTop);
}e.stopPropagation();
},_onMoveMouseUp:function(e){if(!this.hasState(l)){return;
}this.removeState(l);
var parent=this.getLayoutParent();

if(qx.Class.implementsInterface(parent,qx.ui.window.IDesktop)){if(this.__gI){parent.unblockContent();
parent.setBlockerColor(this.__gJ);
parent.setBlockerOpacity(this.__gK);
this.__gJ=null;
this.__gK=0;
this.__gI=false;
}}this.__gB.releaseCapture();
var z=this.__gN(e);
this.setLayoutProperties({left:z.parentLeft,top:z.parentTop});
if(this.getUseMoveFrame()){this.__gL().exclude();
}e.stopPropagation();
},__gO:function(e){if(!this.hasState(l)){return;
}this.removeState(l);
if(this.getUseMoveFrame()){this.__gL().exclude();
}}},destruct:function(){this._disposeObjects(f,b);
this.__gD=null;
}});
})();
(function(){var k="Boolean",j="resize",i="mousedown",h="w-resize",g="sw-resize",f="n-resize",d="resizableRight",c="ne-resize",b="se-resize",a="Integer",z="e-resize",y="resizableLeft",x="mousemove",w="move",v="shorthand",u="maximized",t="nw-resize",s="mouseout",r="qx.ui.core.MResizable",q="mouseup",o="losecapture",p="resize-frame",m="resizableBottom",n="s-resize",l="resizableTop";
qx.Mixin.define(r,{construct:function(){var A=this.getContainerElement();
A.addListener(i,this.__hf,this,true);
A.addListener(q,this.__hg,this);
A.addListener(x,this.__hi,this);
A.addListener(s,this.__hj,this);
A.addListener(o,this.__hh,this);
var B=this.getContainerElement().getDomElement();

if(B==null){B=window;
}this.__gR=qx.event.Registration.getManager(B).getHandler(qx.event.handler.DragDrop);
},properties:{resizableTop:{check:k,init:true},resizableRight:{check:k,init:true},resizableBottom:{check:k,init:true},resizableLeft:{check:k,init:true},resizable:{group:[l,d,m,y],mode:v},resizeSensitivity:{check:a,init:5},useResizeFrame:{check:k,init:true}},members:{__gR:null,__gS:null,__gT:null,__gU:null,__gV:null,__gW:null,__gX:null,RESIZE_TOP:1,RESIZE_BOTTOM:2,RESIZE_LEFT:4,RESIZE_RIGHT:8,_getResizeFrame:function(){var C=this.__gS;

if(!C){C=this.__gS=new qx.ui.core.Widget();
C.setAppearance(p);
C.exclude();
qx.core.Init.getApplication().getRoot().add(C);
}return C;
},__gY:function(){var location=this.__hc();
var D=this._getResizeFrame();
D.setUserBounds(location.left,location.top,location.right-location.left,location.bottom-location.top);
D.show();
D.setZIndex(this.getZIndex()+1);
},__ha:function(e){var F=this.__gT;
var G=this.getSizeHint();
var K=this.__gX;
var J=this.__gW;
var E=J.width;
var I=J.height;
var H=J.containerWidth;
var M=J.containerHeight;
var N=J.left;
var top=J.top;
var L;

if((F&this.RESIZE_TOP)||(F&this.RESIZE_BOTTOM)){L=Math.max(K.top,Math.min(K.bottom,e.getDocumentTop()))-this.__gV;

if(F&this.RESIZE_TOP){I-=L;
M-=L;
}else{I+=L;
M+=L;
}
if(M<G.minHeight){I+=(G.minHeight-M);
M=G.minHeight;
}else if(M>G.maxHeight){I-=(M-G.maxHeight);
M=G.maxHeight;
}
if(F&this.RESIZE_TOP){top+=J.containerHeight-M;
}}
if((F&this.RESIZE_LEFT)||(F&this.RESIZE_RIGHT)){L=Math.max(K.left,Math.min(K.right,e.getDocumentLeft()))-this.__gU;

if(F&this.RESIZE_LEFT){E-=L;
H-=L;
}else{E+=L;
H+=L;
}
if(H<G.minWidth){E+=(G.minWidth-H);
H=G.minWidth;
}else if(E>G.maxWidth){E-=(H-G.maxWidth);
H=G.maxWidth;
}
if(F&this.RESIZE_LEFT){N+=J.containerWidth-H;
}}return {viewportLeft:N,viewportTop:top,parentLeft:J.bounds.left+N-J.left,parentTop:J.bounds.top+top-J.top,containerWidth:H,containerHeight:M,width:E,height:I};
},__hb:{1:f,2:n,4:h,8:z,5:t,6:g,9:c,10:b},__hc:function(){var O=this.getDecoratorElement();
if(O&&O.getDomElement()){return qx.bom.element.Location.get(O.getDomElement());
}else{return this.getContentLocation();
}},__hd:function(e){var location=this.__hc();
var P=this.getResizeSensitivity();
var S=e.getDocumentLeft();
var R=e.getDocumentTop();
var Q=this.__he(location,S,R,P);
if(Q>0){Q=Q|this.__he(location,S,R,P*2);
}this.__gT=Q;
},__he:function(location,T,U,V){var W=0;
if(this.getResizableTop()&&Math.abs(location.top-U)<V&&T>location.left-V&&T<location.right+V){W+=this.RESIZE_TOP;
}else if(this.getResizableBottom()&&Math.abs(location.bottom-U)<V&&T>location.left-V&&T<location.right+V){W+=this.RESIZE_BOTTOM;
}if(this.getResizableLeft()&&Math.abs(location.left-T)<V&&U>location.top-V&&U<location.bottom+V){W+=this.RESIZE_LEFT;
}else if(this.getResizableRight()&&Math.abs(location.right-T)<V&&U>location.top-V&&U<location.bottom+V){W+=this.RESIZE_RIGHT;
}return W;
},__hf:function(e){if(!this.__gT){return;
}this.addState(j);
this.__gU=e.getDocumentLeft();
this.__gV=e.getDocumentTop();
var bb=this.getContainerLocation();
var X=this.__hc();
var ba=this.getBounds();
this.__gW={top:X.top,left:X.left,containerWidth:bb.right-bb.left,containerHeight:bb.bottom-bb.top,width:X.right-X.left,height:X.bottom-X.top,bounds:qx.lang.Object.clone(ba)};
var parent=this.getLayoutParent();
var bc=parent.getContentLocation();
var Y=parent.getBounds();
this.__gX={left:bc.left,top:bc.top,right:bc.left+Y.width,bottom:bc.top+Y.height};
if(this.getUseResizeFrame()){this.__gY();
}this.capture();
e.stop();
},__hg:function(e){if(!this.hasState(j)){return;
}if(this.getUseResizeFrame()){this._getResizeFrame().exclude();
}var bd=this.__ha(e);
this.setWidth(bd.containerWidth);
this.setHeight(bd.containerHeight);
if(this.getResizableLeft()||this.getResizableTop()){this.setLayoutProperties({left:bd.parentLeft,top:bd.parentTop});
}this.__gT=0;
this.removeState(j);
this.resetCursor();
this.getApplicationRoot().resetGlobalCursor();
this.releaseCapture();
e.stopPropagation();
},__hh:function(e){if(!this.__gT){return;
}this.resetCursor();
this.getApplicationRoot().resetGlobalCursor();
this.removeState(w);
if(this.getUseResizeFrame()){this._getResizeFrame().exclude();
}},__hi:function(e){if(this.hasState(j)){var bh=this.__ha(e);
if(this.getUseResizeFrame()){var bf=this._getResizeFrame();
bf.setUserBounds(bh.viewportLeft,bh.viewportTop,bh.width,bh.height);
}else{this.setWidth(bh.containerWidth);
this.setHeight(bh.containerHeight);
if(this.getResizableLeft()||this.getResizableTop()){this.setLayoutProperties({left:bh.parentLeft,top:bh.parentTop});
}}e.stopPropagation();
}else if(!this.hasState(u)&&!this.__gR.isSessionActive()){this.__hd(e);
var bi=this.__gT;
var bg=this.getApplicationRoot();

if(bi){var be=this.__hb[bi];
this.setCursor(be);
bg.setGlobalCursor(be);
}else if(this.getCursor()){this.resetCursor();
bg.resetGlobalCursor();
}}},__hj:function(e){if(this.getCursor()&&!this.hasState(j)){this.resetCursor();
this.getApplicationRoot().resetGlobalCursor();
}}},destruct:function(){if(this.__gS!=null&&!qx.core.ObjectRegistry.inShutDown){this.__gS.destroy();
this.__gS=null;
}this.__gR=null;
}});
})();
(function(){var k="Boolean",j="qx.event.type.Event",i="captionbar",h="_applyCaptionBarChange",g="maximize-button",f="restore-button",d="minimize-button",c="close-button",b="maximized",a="execute",S="title",R="icon",Q="showStatusbar",P="pane",O="statusbar",N="statusbar-text",M="String",L="normal",K="active",J="beforeClose",r="beforeMinimize",s="mousedown",p="window-resize-frame",q="changeStatus",n="changeIcon",o="excluded",l="dblclick",m="_applyActive",t="beforeRestore",u="minimize",B="changeModal",z="changeAlwaysOnTop",D="_applyShowStatusbar",C="_applyStatus",F="qx.ui.window.Window",E="changeCaption",w="focusout",I="beforeMaximize",H="maximize",G="restore",v="window",x="close",y="changeActive",A="minimized";
qx.Class.define(F,{extend:qx.ui.core.Widget,include:[qx.ui.core.MRemoteChildrenHandling,qx.ui.core.MRemoteLayoutHandling,qx.ui.core.MResizable,qx.ui.core.MMovable,qx.ui.core.MContentPadding],construct:function(T,U){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.VBox());
this._createChildControl(i);
this._createChildControl(P);
if(U!=null){this.setIcon(U);
}
if(T!=null){this.setCaption(T);
}this._updateCaptionBar();
this.addListener(s,this._onWindowMouseDown,this,true);
this.addListener(w,this._onWindowFocusOut,this);
qx.core.Init.getApplication().getRoot().add(this);
this.initVisibility();
qx.ui.core.FocusHandler.getInstance().addRoot(this);
this._getResizeFrame().setAppearance(p);
},statics:{DEFAULT_MANAGER_CLASS:qx.ui.window.Manager},events:{"beforeClose":j,"close":j,"beforeMinimize":j,"minimize":j,"beforeMaximize":j,"maximize":j,"beforeRestore":j,"restore":j},properties:{appearance:{refine:true,init:v},visibility:{refine:true,init:o},focusable:{refine:true,init:true},active:{check:k,init:false,apply:m,event:y},alwaysOnTop:{check:k,init:false,event:z},modal:{check:k,init:false,event:B},caption:{apply:h,event:E,nullable:true},icon:{check:M,nullable:true,apply:h,event:n,themeable:true},status:{check:M,nullable:true,apply:C,event:q},showClose:{check:k,init:true,apply:h,themeable:true},showMaximize:{check:k,init:true,apply:h,themeable:true},showMinimize:{check:k,init:true,apply:h,themeable:true},allowClose:{check:k,init:true,apply:h},allowMaximize:{check:k,init:true,apply:h},allowMinimize:{check:k,init:true,apply:h},showStatusbar:{check:k,init:false,apply:D}},members:{__gP:null,__gQ:null,getChildrenContainer:function(){return this.getChildControl(P);
},_forwardStates:{active:true,maximized:true,showStatusbar:true},setLayoutParent:function(parent){qx.ui.core.Widget.prototype.setLayoutParent.call(this,parent);
},_createChildControlImpl:function(V,W){var X;

switch(V){case O:X=new qx.ui.container.Composite(new qx.ui.layout.HBox());
this._add(X);
X.add(this.getChildControl(N));
break;
case N:X=new qx.ui.basic.Label();
X.setValue(this.getStatus());
break;
case P:X=new qx.ui.container.Composite();
this._add(X,{flex:1});
break;
case i:var ba=new qx.ui.layout.Grid();
ba.setRowFlex(0,1);
ba.setColumnFlex(1,1);
X=new qx.ui.container.Composite(ba);
this._add(X);
X.addListener(l,this._onCaptionMouseDblClick,this);
this._activateMoveHandle(X);
break;
case R:X=new qx.ui.basic.Image(this.getIcon());
this.getChildControl(i).add(X,{row:0,column:0});
break;
case S:X=new qx.ui.basic.Label(this.getCaption());
X.setWidth(0);
X.setAllowGrowX(true);
var Y=this.getChildControl(i);
Y.add(X,{row:0,column:1});
break;
case d:X=new qx.ui.form.Button();
X.setFocusable(false);
X.addListener(a,this._onMinimizeButtonClick,this);
this.getChildControl(i).add(X,{row:0,column:2});
break;
case f:X=new qx.ui.form.Button();
X.setFocusable(false);
X.addListener(a,this._onRestoreButtonClick,this);
this.getChildControl(i).add(X,{row:0,column:3});
break;
case g:X=new qx.ui.form.Button();
X.setFocusable(false);
X.addListener(a,this._onMaximizeButtonClick,this);
this.getChildControl(i).add(X,{row:0,column:4});
break;
case c:X=new qx.ui.form.Button();
X.setFocusable(false);
X.addListener(a,this._onCloseButtonClick,this);
this.getChildControl(i).add(X,{row:0,column:6});
break;
}return X||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,V);
},_updateCaptionBar:function(){var bc;
var bd=this.getIcon();

if(bd){this.getChildControl(R).setSource(bd);
this._showChildControl(R);
}else{this._excludeChildControl(R);
}var bb=this.getCaption();

if(bb){this.getChildControl(S).setValue(bb);
this._showChildControl(S);
}else{this._excludeChildControl(S);
}
if(this.getShowMinimize()){this._showChildControl(d);
bc=this.getChildControl(d);
this.getAllowMinimize()?bc.resetEnabled():bc.setEnabled(false);
}else{this._excludeChildControl(d);
}
if(this.getShowMaximize()){if(this.isMaximized()){this._showChildControl(f);
this._excludeChildControl(g);
}else{this._showChildControl(g);
this._excludeChildControl(f);
}bc=this.getChildControl(g);
this.getAllowMaximize()?bc.resetEnabled():bc.setEnabled(false);
}else{this._excludeChildControl(g);
this._excludeChildControl(f);
}
if(this.getShowClose()){this._showChildControl(c);
bc=this.getChildControl(c);
this.getAllowClose()?bc.resetEnabled():bc.setEnabled(false);
}else{this._excludeChildControl(c);
}},close:function(){if(!this.isVisible()){return;
}
if(this.fireNonBubblingEvent(J,qx.event.type.Event,[false,true])){this.hide();
this.fireEvent(x);
}},open:function(){this.show();
this.setActive(true);
this.focus();
},center:function(){var parent=this.getLayoutParent();

if(parent){var bf=parent.getBounds();

if(bf){var bg=this.getSizeHint();
var be=Math.round((bf.width-bg.width)/2);
var top=Math.round((bf.height-bg.height)/2);

if(top<0){top=0;
}this.moveTo(be,top);
return;
}}},maximize:function(){if(this.isMaximized()){return;
}var parent=this.getLayoutParent();

if(parent!=null&&parent.supportsMaximize()){if(this.fireNonBubblingEvent(I,qx.event.type.Event,[false,true])){if(!this.isVisible()){this.open();
}var bh=this.getLayoutProperties();
this.__gQ=bh.left===undefined?0:bh.left;
this.__gP=bh.top===undefined?0:bh.top;
this.setLayoutProperties({left:null,top:null,edge:0});
this.addState(b);
this._updateCaptionBar();
this.fireEvent(H);
}}},minimize:function(){if(!this.isVisible()){return;
}
if(this.fireNonBubblingEvent(r,qx.event.type.Event,[false,true])){var bi=this.getLayoutProperties();
this.__gQ=bi.left===undefined?0:bi.left;
this.__gP=bi.top===undefined?0:bi.top;
this.removeState(b);
this.hide();
this.fireEvent(u);
}},restore:function(){if(this.getMode()===L){return;
}
if(this.fireNonBubblingEvent(t,qx.event.type.Event,[false,true])){if(!this.isVisible()){this.open();
}var bj=this.__gQ;
var top=this.__gP;
this.setLayoutProperties({edge:null,left:bj,top:top});
this.removeState(b);
this._updateCaptionBar();
this.fireEvent(G);
}},moveTo:function(bk,top){if(this.isMaximized()){return;
}this.setLayoutProperties({left:bk,top:top});
},isMaximized:function(){return this.hasState(b);
},getMode:function(){if(!this.isVisible()){return A;
}else{if(this.isMaximized()){return b;
}else{return L;
}}},_applyActive:function(bl,bm){if(bm){this.removeState(K);
}else{this.addState(K);
}},_getContentPaddingTarget:function(){return this.getChildControl(P);
},_applyShowStatusbar:function(bn,bo){var bp=this._getResizeFrame();

if(bn){this.addState(Q);
bp.addState(Q);
}else{this.removeState(Q);
bp.removeState(Q);
}
if(bn){this._showChildControl(O);
}else{this._excludeChildControl(O);
}},_applyCaptionBarChange:function(bq,br){this._updateCaptionBar();
},_applyStatus:function(bs,bt){var bu=this.getChildControl(N,true);

if(bu){bu.setValue(bs);
}},_onWindowEventStop:function(e){e.stopPropagation();
},_onWindowMouseDown:function(e){this.setActive(true);
},_onWindowFocusOut:function(e){if(this.getModal()){return;
}var bv=e.getRelatedTarget();

if(bv!=null&&!qx.ui.core.Widget.contains(this,bv)){this.setActive(false);
}},_onCaptionMouseDblClick:function(e){if(this.getAllowMaximize()){this.isMaximized()?this.restore():this.maximize();
}},_onMinimizeButtonClick:function(e){this.minimize();
this.getChildControl(d).reset();
},_onRestoreButtonClick:function(e){this.restore();
this.getChildControl(f).reset();
},_onMaximizeButtonClick:function(e){this.maximize();
this.getChildControl(g).reset();
},_onCloseButtonClick:function(e){this.close();
this.getChildControl(c).reset();
}}});
})();
(function(){var a="qx.ui.window.IDesktop";
qx.Interface.define(a,{members:{setWindowManager:function(b){this.assertInterface(b,qx.ui.window.IWindowManager);
},getWindows:function(){},supportsMaximize:function(){},blockContent:function(c){this.assertInteger(c);
},unblockContent:function(){},isContentBlocked:function(){}}});
})();
(function(){var a="qx.ui.window.Desktop";
qx.Class.define(a,{extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.window.MDesktop,qx.ui.core.MBlocker],implement:qx.ui.window.IDesktop,construct:function(b){qx.ui.core.Widget.call(this);
b=b||new qx.ui.window.Window.DEFAULT_MANAGER_CLASS();
this.getContentElement().disableScrolling();
this._setLayout(new qx.ui.layout.Canvas());
this.setWindowManager(b);
}});
})();
(function(){var a="showcase.page.AbstractDesktopContent";
qx.Class.define(a,{extend:showcase.AbstractContent,construct:function(b){showcase.AbstractContent.call(this,b);
this.setView(this._createView());
},members:{_createView:function(){var d=new qx.ui.window.Desktop(new qx.ui.window.Manager());
var c=new qx.ui.window.Window();
c.set({showClose:false,showMinimize:false,contentPadding:0});
this._addWindowContent(c);
d.add(c);
c.moveTo(30,20);
c.open();
return d;
},_addWindowContent:function(e){throw new Error("Abstract method call!");
}}});
})();

});