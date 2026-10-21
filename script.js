(() => {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let width = 0, height = 0, particles = [];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function resize(){
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth; height = window.innerHeight;
    canvas.width = width * dpr; canvas.height = height * dpr;
    canvas.style.width = width + 'px'; canvas.style.height = height + 'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    const count = Math.min(75, Math.floor(width / 7));
    particles = Array.from({length:count}, () => ({x:Math.random()*width,y:Math.random()*height,r:.5+Math.random()*1.8,v:.15+Math.random()*.55,a:.2+Math.random()*.55,dr:(Math.random()-.5)*.3}));
  }
  function draw(){
    ctx.clearRect(0,0,width,height);
    for(const p of particles){
      ctx.beginPath(); ctx.fillStyle = `rgba(190,105,255,${p.a})`; ctx.shadowBlur = 10; ctx.shadowColor = '#a94dff';
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
      if(!reduceMotion){p.y -= p.v; p.x += p.dr; if(p.y < -5){p.y=height+5;p.x=Math.random()*width;} if(p.x < -5)p.x=width+5; if(p.x>width+5)p.x=-5;}
    }
    ctx.shadowBlur = 0;
    if(!reduceMotion) requestAnimationFrame(draw);
  }
  resize(); draw(); window.addEventListener('resize',resize);
  const video = document.querySelector('.video-frame video');
  const frame = document.querySelector('.video-frame');
  video.addEventListener('loadedmetadata', () => frame.classList.add('has-video'));
  video.addEventListener('play', () => frame.classList.add('has-video'));
  video.addEventListener('error', () => frame.classList.remove('has-video'));
})();
