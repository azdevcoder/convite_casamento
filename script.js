// Shared JS: index (envelope) + convite (countdown) + galeria (lightbox). Leve por página.
(function(){
function $(id){return document.getElementById(id)}
// Pétalas leves (todas as páginas, 24 partículas)
try{var c=$('petalas');if(c){var x=c.getContext('2d');function rs(){c.width=innerWidth;c.height=innerHeight}rs();addEventListener('resize',rs);var P=[],cores=['#E3AEB2','#F3D9DB','#8CA69B','#C39B4A'];for(var i=0;i<24;i++)P.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:3+Math.random()*5,v:.4+Math.random()*.8,o:Math.random()*6.28,c:cores[i%4]});(function loop(){x.clearRect(0,0,c.width,c.height);P.forEach(function(p){p.y+=p.v;p.o+=.01;p.x+=Math.sin(p.o)*.4;if(p.y>c.height+10){p.y=-10;p.x=Math.random()*c.width}x.save();x.translate(p.x,p.y);x.rotate(p.o);x.globalAlpha=.5;x.fillStyle=p.c;x.beginPath();x.ellipse(0,0,p.r,p.r*.6,0,0,6.29);x.fill();x.restore()});requestAnimationFrame(loop)})()}}catch(e){}
// INDEX: abertura real -> convite.html
var env=$('env'),selo=$('selo');
if(env&&selo){
function burst(){try{var h=$('burst');if(!h||!window.gsap)return;for(var i=0;i<16;i++){var s=document.createElement('span');s.textContent='✦';s.style.cssText='position:absolute;left:50%;top:46%;color:#C39B4A;font-size:'+(8+Math.random()*10)+'px';h.appendChild(s);gsap.to(s,{x:(Math.random()-.5)*260,y:(Math.random()-.6)*220,opacity:0,duration:1.2+Math.random(),ease:'power2.out',onComplete:(function(el){return function(){el.remove()}})(s)})}}catch(e){}}
window.openEnvelope=function(){if(document.body.classList.contains('abrindo'))return;document.body.classList.add('abrindo');var d=$('dica');if(d)d.style.opacity='0';burst();
if(window.gsap){var tl=gsap.timeline({onComplete:function(){setTimeout(function(){location.href='convite.html'},350)}});
tl.to('#barra span',{width:'12%',duration:.4},0);
tl.to('#selo',{scale:1.25,duration:.45,ease:'power2.in'},0);
tl.to('#selo',{scale:.15,opacity:0,duration:.55,ease:'power2.out'},.45);
tl.to('#barra span',{width:'30%',duration:.7},.45);
tl.to('#flap',{rotationX:180,duration:1.8,ease:'power2.inOut',zIndex:1},.8);
tl.to('#barra span',{width:'55%',duration:1.6},.9);
tl.to('#carta',{y:'-62%',duration:1.6,ease:'power2.inOut'},2.3);
tl.to('#barra span',{width:'80%',duration:1.2},2.4);
tl.to('#env',{y:-30,scale:1.05,opacity:0,duration:1,ease:'power2.in'},3.6);
tl.to('#barra span',{width:'100%',duration:.6},3.6);
}else{setTimeout(function(){location.href='convite.html'},1200)}};
selo.addEventListener('click',function(e){e.stopPropagation();openEnvelope()});
env.addEventListener('click',openEnvelope);
env.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();openEnvelope()}});
}
// CONVITE: flip verso(foto)->frente + countdown + reveal
if($('dias')||$('flipConvite')){
var flip=$('flipConvite'),dica=$('flipDica'),autoFeito=false;
function viraParaConvite(auto){if(!flip)return;flip.classList.add('virado');if(dica)dica.textContent='Toque no convite para ver o verso';if(auto)autoFeito=true}
function viraParaFoto(){if(!flip)return;flip.classList.remove('virado');if(dica)dica.textContent='Toque na foto para ver o convite'}
if(flip){flip.addEventListener('click',function(){if(flip.classList.contains('virado'))viraParaFoto();else viraParaConvite(false)});setTimeout(function(){viraParaConvite(true)},5000)}
var t=new Date('2026-11-14T17:00:00-03:00').getTime();
function set(id,v){var el=$(id);if(el&&el.textContent!=String(v))el.textContent=v}
function u(){var d=t-Date.now();if(d<0)d=0;set('dias',Math.floor(d/864e5));set('horas',Math.floor(d/36e5)%24);set('min',Math.floor(d/6e4)%60);set('seg',Math.floor(d/1e3)%60)}
setInterval(u,1000);u();
try{if(window.gsap&&window.ScrollTrigger){gsap.registerPlugin(ScrollTrigger);gsap.utils.toArray('.reveal').forEach(function(el){gsap.fromTo(el,{y:30,opacity:0},{y:0,opacity:1,duration:.85,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 88%'}})})}else{throw 0}}catch(e){var o=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('visivel');o.unobserve(en.target)}})},{threshold:.12});document.querySelectorAll('.reveal').forEach(function(s){o.observe(s)})}
}
// GALERIA: lightbox com swipe + teclado
var grid=$('grade');
if(grid){var imgs=Array.prototype.slice.call(grid.querySelectorAll('img')),idx=0,lb=$('lightbox'),lbImg=$('lbImg');
function show(i){idx=(i+imgs.length)%imgs.length;lbImg.src=imgs[idx].src;lb.classList.add('show')}
imgs.forEach(function(im,i){im.addEventListener('click',function(){show(i)})});
document.querySelector('.lb-fechar').addEventListener('click',function(){lb.classList.remove('show')});
document.querySelector('.lb-nav.esq').addEventListener('click',function(e){e.stopPropagation();show(idx-1)});
document.querySelector('.lb-nav.dir').addEventListener('click',function(e){e.stopPropagation();show(idx+1)});
lb.addEventListener('click',function(e){if(e.target===lb)lb.classList.remove('show')});
document.addEventListener('keydown',function(e){if(!lb.classList.contains('show'))return;if(e.key==='Escape')lb.classList.remove('show');if(e.key==='ArrowRight')show(idx+1);if(e.key==='ArrowLeft')show(idx-1)});
var tx=0;lbImg.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});lbImg.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>40)show(idx+(dx<0?1:-1))},{passive:true});
}
})();
