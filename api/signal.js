(function(){
if(document.getElementById('custom-trade-wrap'))return;

const l="https://i.postimg.cc/h4N3KytS/file-000000003fb4820780fa809d8e15a2d6.png";

const s=document.createElement('style');
s.innerHTML=`#custom-trade-wrap{position:fixed;bottom:30px;right:30px;z-index:999999;display:flex;flex-direction:column;align-items:center;touch-action:none;}#btn-box{position:relative;display:inline-block;}.btn-glow{position:absolute;top:50%;left:50%;width:88px;height:88px;margin:-44px 0 0 -44px;border-radius:50%;background:radial-gradient(circle,rgba(34,255,85,.5),rgba(34,255,85,0) 70%);animation:breathe 2s ease-in-out infinite;pointer-events:none;z-index:1;}.orbit{position:absolute;top:50%;left:50%;width:80px;height:80px;margin:-40px 0 0 -40px;border-radius:50%;animation:orbitSpin 2.4s linear infinite;pointer-events:none;z-index:1;}.orbit .dot{position:absolute;top:0;left:50%;width:9px;height:9px;margin-left:-4.5px;border-radius:50%;background:#22ff55;box-shadow:0 0 10px 3px rgba(34,255,85,.9),0 0 22px 7px rgba(34,255,85,.45);}.orbit .dot2{position:absolute;bottom:0;left:50%;width:5px;height:5px;margin-left:-2.5px;border-radius:50%;background:#22ff55;opacity:.6;box-shadow:0 0 8px 2px rgba(34,255,85,.7);}.ring-border{position:absolute;top:50%;left:50%;width:70px;height:70px;margin:-35px 0 0 -35px;border-radius:50%;border:2px solid rgba(34,255,85,.75);box-shadow:0 0 12px 3px rgba(34,255,85,.5);pointer-events:none;z-index:1;}#c-btn{position:relative;width:60px;height:60px;border-radius:50%;background:#1e222d url('${l}') center/cover;border:none;box-shadow:0 4px 15px rgba(0,0,0,.5);cursor:pointer;touch-action:none;z-index:2;transition:transform .12s ease;overflow:hidden;}#c-btn:active{transform:scale(.9);}.tap-ripple{position:absolute;top:50%;left:50%;width:10px;height:10px;margin:-5px 0 0 -5px;border-radius:50%;background:rgba(34,255,85,.55);transform:scale(0);opacity:1;pointer-events:none;z-index:3;animation:rippleAnim .6s ease-out forwards;}@keyframes rippleAnim{to{transform:scale(7);opacity:0;}}#lbl{margin-top:8px;font-size:11px;font-weight:900;letter-spacing:.6px;pointer-events:none;text-align:center;white-space:nowrap;color:#ffffff;background:rgba(0,0,0,.75);padding:4px 10px;border-radius:8px;}@keyframes breathe{0%,100%{opacity:.4;transform:scale(.9);}50%{opacity:1;transform:scale(1.1);}}@keyframes orbitSpin{to{transform:rotate(360deg);}}#scan-overlay{position:fixed;inset:0;z-index:999997;display:none;overflow:hidden;pointer-events:none;backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);}#scan-beam{position:absolute;left:0;width:100%;height:3px;top:0;background:linear-gradient(90deg,transparent,#22ff55 10%,#eafff0 50%,#22ff55 90%,transparent);box-shadow:0 0 26px 6px rgba(34,255,85,.9);}#scan-beam .trail{position:absolute;left:0;right:0;bottom:0;height:190px;background:linear-gradient(to top,rgba(34,255,85,.24),rgba(34,255,85,.06) 65%,transparent);}@keyframes dots{0%{content:'';}25%{content:'.';}50%{content:'..';}75%{content:'...';}100%{content:'';}}`;

document.head.appendChild(s);

const overlay=document.createElement('div');
overlay.id='scan-overlay';
overlay.innerHTML='<div id="scan-beam"><div class="trail"></div></div>';
document.body.appendChild(overlay);

const beam=overlay.querySelector('#scan-beam');

function easeInOut(t){
return t<0.5?2*t*t:-1+(4-2*t)*t;
}

const wrap=document.createElement('div');
wrap.id='custom-trade-wrap';
document.body.appendChild(wrap);

const bBox=document.createElement('div');
bBox.id='btn-box';
wrap.appendChild(bBox);

const glow=document.createElement('div');
glow.className='btn-glow';
bBox.appendChild(glow);

const orbit=document.createElement('div');
orbit.className='orbit';
orbit.innerHTML='<div class="dot"></div><div class="dot2"></div>';
bBox.appendChild(orbit);

const ringBorder=document.createElement('div');
ringBorder.className='ring-border';
bBox.appendChild(ringBorder);

const btn=document.createElement('div');
btn.id='c-btn';
bBox.appendChild(btn);

const lbl=document.createElement('div');
lbl.id='lbl';
lbl.innerText='AEX SABBIR TRADER BOT';
wrap.appendChild(lbl);

let isDrag=false,startX,startY,initX,initY;

const startD=(x,y)=>{
isDrag=false;
startX=x;
startY=y;
initX=wrap.offsetLeft;
initY=wrap.offsetTop;
};

const moveD=(x,y)=>{
if(Math.abs(x-startX)>5||Math.abs(y-startY)>5)isDrag=true;
wrap.style.left=(initX+x-startX)+'px';
wrap.style.top=(initY+y-startY)+'px';
wrap.style.bottom='auto';
wrap.style.right='auto';
};

btn.addEventListener('mousedown',e=>{
startD(e.clientX,e.clientY);
const onMove=e=>moveD(e.clientX,e.clientY);
const onUp=()=>{
document.removeEventListener('mousemove',onMove);
document.removeEventListener('mouseup',onUp);
};
document.addEventListener('mousemove',onMove);
document.addEventListener('mouseup',onUp);
});

btn.addEventListener('touchstart',e=>{
const t=e.touches[0];
startD(t.clientX,t.clientY);
const onMove=e=>{
const t=e.touches[0];
moveD(t.clientX,t.clientY);
};
const onEnd=()=>{
document.removeEventListener('touchmove',onMove);
document.removeEventListener('touchend',onEnd);
};
document.addEventListener('touchmove',onMove);
document.addEventListener('touchend',onEnd);
});

function deepNodes(root,out){
out=out||[];
let list;
try{list=root.querySelectorAll('*');}
catch(e){return out;}
list.forEach(el=>{
out.push(el);
if(el.shadowRoot)deepNodes(el.shadowRoot,out);
});
return out;
}

function allClickable(){
const docs=[document];

try{
document.querySelectorAll('iframe').forEach(f=>{
try{
if(f.contentDocument)docs.push(f.contentDocument);
}catch(e){}
});
}catch(e){}

let nodes=[];
docs.forEach(d=>{
nodes=nodes.concat(deepNodes(d));
});

return nodes.filter(el=>{
const t=el.tagName;
if(t==='SCRIPT'||t==='STYLE'||t==='SVG'||t==='PATH')return false;
if(el.closest&&el.closest('#custom-trade-wrap'))return false;

const r=el.getBoundingClientRect();
if(r.width<28||r.height<20||r.width>900||r.height>400)return false;

const st=(el.ownerDocument.defaultView||window).getComputedStyle(el);
if(st.display==='none'||st.visibility==='hidden'||parseFloat(st.opacity||'1')<0.1)return false;

const cur=st.cursor;
const isBtnish=
el.tagName==='BUTTON'||
el.getAttribute('role')==='button'||
cur==='pointer'||
/btn|button/i.test(el.className&&el.className.toString?el.className.toString():'');

return isBtnish;
});
}

function rgbSum(c){
const m=(c||'').match(/\d+(\.\d+)?/g);
return m?m.slice(0,3).map(Number):null;
}

function greenish(c){
const v=rgbSum(c);
return !!v&&v[1]>90&&v[1]>v[0]+35&&v[1]>v[2]+35;
}

function redish(c){
const v=rgbSum(c);
return !!v&&v[0]>110&&v[0]>v[1]+45&&v[0]>v[2]+25;
}

function scoreBtn(el,up){
let sc=0;
const win=el.ownerDocument.defaultView||window;
const st=win.getComputedStyle(el);

const attr=[
el.className&&el.className.toString?el.className.toString():'',
el.id||'',
el.getAttribute('data-testid')||'',
el.getAttribute('data-test')||'',
el.getAttribute('aria-label')||'',
el.getAttribute('title')||''
].join(' ').toLowerCase();

const txt=(el.innerText||el.textContent||'').trim().toLowerCase().slice(0,40);

const upWords=['up','higher','call','buy','rise'];
const dnWords=['down','lower','put','sell','fall'];

const mine=up?upWords:dnWords;
const other=up?dnWords:upWords;

mine.forEach(w=>{
if(new RegExp('(^|[^a-z])'+w+'([^a-z]|$)').test(txt))sc+=45;
if(attr.indexOf(w)>=0)sc+=35;
});

other.forEach(w=>{
if(new RegExp('(^|[^a-z])'+w+'([^a-z]|$)').test(txt))sc-=60;
if(attr.indexOf(w)>=0)sc-=50;
});

const bg=st.backgroundColor;
const bgi=st.backgroundImage||'';

if(up&&(greenish(bg)||greenish(bgi)))sc+=30;
if(!up&&(redish(bg)||redish(bgi)))sc+=30;
if(up&&(redish(bg)||redish(bgi)))sc-=30;
if(!up&&(greenish(bg)||greenish(bgi)))sc-=30;

const r=el.getBoundingClientRect();

if(r.bottom>win.innerHeight*0.45)sc+=8;
if(el.tagName==='BUTTON')sc+=6;
if(el.querySelectorAll('button,[role=button]').length>0)sc-=25;

return sc;
}

function findTradeBtn(up){
const direct=up?
'[data-testid*="call"],[data-test*="call"],.btn-call,.button-call,.btn-up,.button-up,button[class*="call"]':
'[data-testid*="put"],[data-test*="put"],.btn-put,.button-put,.btn-down,.button-down,button[class*="put"]';

let hit=null;

try{
hit=document.querySelector(direct);
}catch(e){}

if(hit&&hit.getBoundingClientRect().width>10)return hit;

let best=null,bestSc=25;

allClickable().forEach(el=>{
const sc=scoreBtn(el,up);
if(sc>bestSc){
bestSc=sc;
best=el;
}
});

return best;
}

function realClick(el){
try{
const win=el.ownerDocument.defaultView||window;
const r=el.getBoundingClientRect();
const cx=r.left+r.width/2;
const cy=r.top+r.height/2;

const base={
bubbles:true,
cancelable:true,
composed:true,
view:win,
clientX:cx,
clientY:cy,
screenX:cx,
screenY:cy,
button:0,
buttons:1,
detail:1
};

const p=Object.assign({},base,{
pointerId:1,
pointerType:'mouse',
isPrimary:true,
width:1,
height:1,
pressure:0.5
});

try{el.scrollIntoView({block:'center'});}catch(e){}

el.dispatchEvent(new PointerEvent('pointerover',p));
el.dispatchEvent(new MouseEvent('mouseover',base));
el.dispatchEvent(new MouseEvent('mousemove',base));
el.dispatchEvent(new PointerEvent('pointerdown',p));
el.dispatchEvent(new MouseEvent('mousedown',base));
el.dispatchEvent(new PointerEvent('pointerup',Object.assign({},p,{buttons:0,pressure:0})));
el.dispatchEvent(new MouseEvent('mouseup',Object.assign({},base,{buttons:0})));
el.dispatchEvent(new MouseEvent('click',Object.assign({},base,{buttons:0})));

try{el.blur();}catch(e){}

return true;
}catch(e){
return false;
}
}

let scanning=false;

function runScan(){
if(scanning)return;

scanning=true;
overlay.style.display='block';

const dur=2500;
const startT=Date.now();

function tick(){
const raw=Math.min(1,(Date.now()-startT)/dur);
const p=easeInOut(raw);

beam.style.top=(p*100)+'%';

if(raw<1)requestAnimationFrame(tick);
}

requestAnimationFrame(tick);

let traded=false;

const doTrade=()=>{
if(traded)return;

traded=true;

const isCall=Math.random()>0.5;
const target=findTradeBtn(isCall);

if(target){
realClick(target);
}
};

setTimeout(doTrade,Math.max(0,dur-1000));

setTimeout(()=>{
doTrade();
overlay.style.display='none';
scanning=false;
},dur);
}

function spawnRipple(){
const r=document.createElement('div');
r.className='tap-ripple';
btn.appendChild(r);
setTimeout(()=>r.remove(),650);
}

btn.addEventListener('click',()=>{
if(isDrag)return;
spawnRipple();
runScan();
});

})();
