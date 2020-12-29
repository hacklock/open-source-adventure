class Animation{move(e){return new Promise(t=>{const i=window.helper.getTranslateValue(e.target),a=Math.floor(i.y),n=Math.floor(i.x),r=void 0===e.vertical?a:Math.floor(e.vertical),o=void 0===e.horizontal?n:Math.floor(e.horizontal),s=void 0===e.speed?window.player.speed:e.speed,l=void 0===e.easing?"linear":e.easing;e.target.animate([{transform:`translate(${n}px, ${a}px)`},{transform:`translate(${o}px, ${r}px)`}],{duration:s,iterations:1,easing:l,fill:"both"}).onfinish=function(e){t(e)}})}}window.animation=new Animation;class Backpack{}window.backpack=new Backpack;class Camera{center(){const e=window.helper.getTranslateValue(window.interface.elPlayer);this.update(),window.animation.move({target:window.interface.elCamera,vertical:this.centerVertical(e),horizontal:this.centerHorizontal(e),speed:0})}centerHorizontal(e){const t=Number(-e.x+window.interface.elGameWidth/2-window.map.tileSizeHalf);return this.centerLimit(t,this.limit.centerHorizontal)}centerVertical(e){const t=Number(-e.y+window.interface.elGameHeight/2-window.map.tileSizeHalf);return this.centerLimit(t,this.limit.centerVertical)}centerLimit(e,t){return e<t?t:e>0?0:e}move(e){window.player.verifyWalk(e)||window.player.isMoving||(window.player.move(e),this.moveCamera(e))}moveCamera(e){const t=this.limit[e],i=window.helper.capitalize(e),a=window.helper.getTranslateValue(window.interface.elCamera);this[`verifyLimit${i}`]({limit:t,currentPosition:a})||this.moveCameraAnimate({side:e,currentPosition:a})}moveCameraAnimate(e){const t=e.currentPosition.x,i=e.currentPosition.y;let a,n={target:window.interface.elCamera};switch(e.side){case"down":a=Math.round(i-this.distance),Math.abs(window.camera.limit.down)-Math.abs(i)<this.distance&&(a=window.camera.limit.down),n.vertical=a;break;case"left":a=Math.round(t+this.distance),Math.abs(t)<this.distance&&(a=window.camera.limit.left),n.horizontal=a;break;case"up":a=Math.round(i+this.distance),Math.abs(a)<=this.distance&&(a=this.limit.up),n.vertical=a;break;case"right":a=Math.round(t-this.distance),window.interface.elGameWidth/2-this.distance-Math.abs(t)<this.distance&&(a=-1*window.camera.limit.right),n.horizontal=a}window.animation.move(n)}update(){this.distance=window.map.tileSize,this.limit={centerVertical:Number(-(window.map.height-window.interface.elGameHeight)),centerHorizontal:Number(-(window.map.width-window.interface.elGameWidth)),up:0,down:-1*Math.abs(window.map.tileSize*window.map.json.row-window.interface.elGameHeight),left:0,right:window.map.tileSize*window.map.json.column-window.interface.elGameWidth}}verifyLimitDown(e){const t=e.currentPosition.y;return e.limit>t}verifyLimitLeft(e){const t=e.currentPosition.x;return!(e.limit>t)}verifyLimitRight(e){const t=Math.abs(e.currentPosition.x);return e.limit<t}verifyLimitUp(e){const t=e.currentPosition.y;return e.limit<t}}window.camera=new Camera;class Craft{}window.craft=new Craft;class Data{constructor(e){this.api=e,this.apiUrl=`./api/${this.api}/`}loadMap(e){const t={controller:`${this.apiUrl}map-${e}.${this.api}`};window.helper.ajax(t).then(e=>window.map.buildMap(e)).then(()=>this.loadPlayer())}loadPlayer(){window.player.isInitial?(window.player.isInitial=!1,this.loadPlayerInitial()):window.loadingMain.hide()}loadPlayerInitial(){const e={controller:`${this.apiUrl}player.${this.api}`};window.helper.ajax(e).then(e=>window.player.buildPlayer(e))}}window.data=new Data("json");class Enemy{}window.enemy=new Enemy;class Game{initialize(){window.data.loadMap(window.map.current)}}window.game=new Game;class Helper{ajax(e){return new Promise((t,i)=>{let a=new XMLHttpRequest;const n=void 0===e.kind?"GET":e.kind;a.open(n,e.controller,!0),a.setRequestHeader("Content-type","application/x-www-form-urlencoded"),a.onload=(()=>{a.status>=200&&a.status<300?t(a.responseText):i(a.statusText)}),a.onerror=(()=>i(a.statusText)),a.send(e.parameter)})}capitalize(e){return e.charAt(0).toUpperCase()+e.slice(1)}getOffset(e){const t=e.getBoundingClientRect();return{top:t.top,right:t.right,bottom:t.bottom,left:t.left}}getTranslateValue(e){const t=window.getComputedStyle(e).transform;if("none"===t)return{x:0,y:0,z:0};const i=t.includes("3d")?"3d":"2d",a=t.match(/matrix.*\((.+)\)/)[1].split(", ");return"2d"===i?{x:Number(a[4]),y:Number(a[5]),z:0}:"3d"===i?{x:Number(a[12]),y:Number(a[13]),z:Number(a[14])}:void 0}remove(e){null!==e&&e.parentNode.removeChild(e)}}window.helper=new Helper;class Interface{build(){this.update(),this.resize(),this.buildAction(),this.buildDirection()}buildAction(){this.elActionBackpack.onclick=(()=>{window.modal.open("backpack")}),this.elActionCraft.onclick=(()=>{window.modal.open("craft")}),this.elActionPick.onclick=(()=>{window.player.pick()}),this.elActionHit.onclick=(()=>{window.player.hit()})}buildDirection(){this.elDirectionalUp.onclick=(()=>{window.camera.move("up")}),this.elDirectionalDown.onclick=(()=>{window.camera.move("down")}),this.elDirectionalLeft.onclick=(()=>{window.camera.move("left")}),this.elDirectionalRight.onclick=(()=>{window.camera.move("right")})}update(){this.elCamera=document.querySelector("#camera"),this.elGame=document.querySelector("#game"),this.elMap=document.querySelector("#map"),this.elPlayer=document.querySelector("#player"),this.elBarLife=document.querySelector('[data-id="bar-life"]'),this.elBarHunger=document.querySelector('[data-id="bar-hunger"]'),this.elBarThirst=document.querySelector('[data-id="bar-thirst"]'),this.elActionBackpack=document.querySelector('[data-id="action-backpack"]'),this.elActionCraft=document.querySelector('[data-id="action-craft"]'),this.elActionPick=document.querySelector('[data-id="action-pick"]'),this.elActionHit=document.querySelector('[data-id="action-hit"]'),this.elDirectionalUp=document.querySelector('[data-id="directional-up"]'),this.elDirectionalDown=document.querySelector('[data-id="directional-down"]'),this.elDirectionalLeft=document.querySelector('[data-id="directional-left"]'),this.elDirectionalRight=document.querySelector('[data-id="directional-right"]')}updateBar(){this.elBarLife.setAttribute("value",player.lifeCurrent),this.elBarLife.setAttribute("max",player.life),this.elBarHunger.setAttribute("value",player.hungerCurrent),this.elBarHunger.setAttribute("max",player.hunger),this.elBarThirst.setAttribute("value",player.thirstCurrent),this.elBarThirst.setAttribute("max",player.thirst)}resize(){this.elGameWidth=this.elGame.offsetWidth,this.elGameHeight=this.elGame.offsetHeight}}window.interface=new Interface;class Item{}window.item=new Item;class Keyboard{build(){document.addEventListener("keydown",e=>{this.buildAction(e.key)})}buildAction(e){switch(e){case"Up":case"ArrowUp":case"w":window.camera.move("up");break;case"Left":case"ArrowLeft":case"a":window.camera.move("left");break;case"Down":case"ArrowDown":case"s":window.camera.move("down");break;case"Right":case"ArrowRight":case"d":window.camera.move("right");break;case"Escape":window.modal.close()}}}window.keyboard=new Keyboard;class LoadingMain{constructor(){this.cssHide="hide",this.cssAnimation="animate"}update(){this.elWrapper=document.querySelector(".loading-main"),this.elLoading=this.elWrapper.querySelector(".loading")}hide(){this.elWrapper.classList.add(this.cssHide),this.elLoading.classList.remove(this.cssAnimation)}show(){this.elWrapper.classList.remove(this.cssHide),this.elLoading.classList.add(this.cssAnimation)}}window.loadingMain=new LoadingMain;class Map{constructor(){this.current=0,this.json={},this.arr=[],this.arrWalkFalse=[0],this.arrDoor=[2],this.tileSize=50,this.tileSizeHalf=this.tileSize/2,this.tileId=0,this.tileIdPrefix="tile_"}buildMap(e){this.json=JSON.parse(e),this.width=this.tileSize*this.json.column,this.height=this.tileSize*this.json.row,window.camera.update(),this.convertArray(),this.buildHtml(),window.player.isInitial||window.player.position()}buildHtml(){const e=this.buildHtmlRow();window.interface.elMap.style.width=`${this.width}px`,window.interface.elMap.style.height=`${this.height}px`,window.interface.elMap.innerHTML="",window.interface.elMap.insertAdjacentHTML("afterbegin",e)}buildHtmlRow(){let e="";for(let t=0;t<this.json.row;t++)e+=this.buildHtmlColumn(t);return e}buildHtmlColumn(e){let t="";for(let i=0;i<this.json.column;i++){let a=this.arr[e][i].trim();t+=`<div class="tile tile--${a}" data-tile="${a}" id="${this.tileIdPrefix}${this.tileId}"></div>`,this.tileId++}return t}convertArray(){const e=this.json.map,t=Object.keys(e).length;for(let i=0;i<t;i++){let t=e[i].split(",");this.arr[i]=t}}change(){const e=window.player.tileCurrent,t=window.map.json.position;let i,a;window.loadingMain.show();for(let n in t)t.hasOwnProperty(n)&&t[n].tile===e&&(i=t[n].sendToMap,a=t[n].sendToTile);this.update(),window.player.tileCurrent=a,window.data.loadMap(i)}position(e){const t=this.tileIdPrefix+e.position,i=e.target,a=document.querySelector(`#${t}`),n=window.helper.getOffset(a),r=window.helper.getOffset(window.interface.elCamera),o={top:n.top-r.top,left:n.left-r.left};window.animation.move({target:i,vertical:Math.round(o.top),horizontal:Math.round(o.left),speed:0})}verifyDoor(e){return this.verifyTile({tile:e,arr:"arrDoor"})}verifyWalk(e){return this.verifyTile({tile:e,arr:"arrWalkFalse"})}verifyTile(e){const t=document.querySelector(`#${this.tileIdPrefix}${e.tile}`),i=Number(t.getAttribute("data-tile"));return!!this[e.arr].includes(i)}update(){this.tileId=0}}window.map=new Map;class Modal{constructor(){this.cssModal="modal",this.cssClose=`${this.cssModal}--close`,this.cssHide="hide"}build(){this.update(),this.buildAction()}buildAction(){this.elCloseButton.onclick=(()=>{this.close()})}close(){this.hidePage(),this.elModal.classList.add(this.cssClose)}open(e){const t=document.querySelector(`#page_${e}`);this.hidePage(),this.elModal.classList.remove(this.cssClose),t.classList.remove(this.cssHide)}hidePage(){Array.prototype.forEach.call(this.elPage,e=>{e.classList.contains(this.cssHide)||e.classList.add(this.cssHide)})}update(){this.elModal=document.querySelector(`.${this.cssModal}`),this.elContent=document.querySelector(`.${this.cssModal}__content`),this.elPage=this.elContent.querySelectorAll(".page"),this.elCloseButton=document.querySelector("#modal_close")}}window.modal=new Modal;class Player{constructor(){this.speed=0,this.isMoving=!1,this.isInitial=!0}buildPlayer(e){this.buildVariable(e),window.interface.updateBar(),this.position(),window.loadingMain.hide()}buildVariable(e){const t=JSON.parse(e);this.life=t.life,this.lifeCurrent=t.lifeCurrent,this.hunger=t.hunger,this.hungerCurrent=t.hungerCurrent,this.thirst=t.thirst,this.thirstCurrent=t.thirstCurrent,this.tileCurrent=window.map.json.position.player,this.speed=t.speed}hit(){console.log("hit")}move(e){const t=this.moveCoordinates(e);let i,a={target:window.interface.elPlayer};const n=void 0!==t.tileNext?a.tileNext=t.tileNext:void 0;void 0!==t.vertical&&(a.vertical=t.vertical),void 0!==t.horizontal&&(a.horizontal=t.horizontal),this.isMoving||(this.isMoving=!0,(i=window.animation.move(a)).then(()=>this.moveSuccess({tileNext:n,side:e})))}moveSuccess(e){const t=window.map.verifyDoor(e.tileNext);this.updatePosition({tileNext:e.tileNext,side:e}),t&&window.map.change()}moveCoordinates(e){const t=window.map.json.column,i=window.helper.getTranslateValue(window.interface.elPlayer);let a={};switch(e){case"up":a.tileNext=this.tileCurrent-t,a.vertical=i.y-window.camera.distance;break;case"down":a.tileNext=this.tileCurrent+t,a.vertical=i.y+window.camera.distance;break;case"left":a.tileNext=this.tileCurrent-1,a.horizontal=i.x-window.camera.distance;break;case"right":a.tileNext=this.tileCurrent+1,a.horizontal=i.x+window.camera.distance}return a}position(){window.map.position({target:window.interface.elPlayer,position:this.tileCurrent}),window.camera.center()}pick(){console.log("pick")}updatePosition(e){switch(this.isMoving=!1,this.tileCurrent=e.tileNext,e.side){case"up":this.currentVertical-=window.map.tileSize;break;case"down":this.currentVertical+=window.map.tileSize;break;case"left":this.currentHorizontal-=window.map.tileSize;break;case"right":this.currentHorizontal+=window.map.tileSize}}verifyWalk(e){const t=this.moveCoordinates(e);let i={target:window.interface.elPlayer};const a=void 0!==t.tileNext?i.tileNext=t.tileNext:void 0;return window.map.verifyWalk(a)}}window.player=new Player,document.addEventListener("DOMContentLoaded",()=>{window.loadingMain.update(),window.modal.build(),window.map.update(),window.interface.build(),window.keyboard.build(),window.game.initialize()}),window.addEventListener("resize",()=>{window.interface.resize(),window.camera.center()});
