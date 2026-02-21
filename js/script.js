// Interactive behaviors for the portfolio
document.addEventListener('DOMContentLoaded', ()=>{
  const skills = document.querySelectorAll('.skill');
  const animateBtn = document.getElementById('animateBtn');
  const modeToggle = document.getElementById('modeToggle');
  const portrait = document.getElementById('portrait');
  const tagline = document.getElementById('tagline');

  // Typewriter-style subtle animation for tagline
  const fullTag = 'Aspiring AI developer • Game-inspired portfolio';
  let i=0;
  function typeTick(){
    if(i<=fullTag.length){
      tagline.textContent = fullTag.slice(0,i++);
      setTimeout(typeTick, 28);
    }
  }
  typeTick();

  // Fill skill bars to their data-value when activated
  function fillSkills(){
    skills.forEach(s=>{
      const target = s.dataset.value || 60;
      const fill = s.querySelector('.fill');
      fill.style.width = target + '%';
    });
  }

  animateBtn.addEventListener('click', ()=>{
    // randomize rep and level a bit for demo effect
    document.getElementById('rep').textContent = 30 + Math.floor(Math.random()*70);
    document.getElementById('level').textContent = 1 + Math.floor(Math.random()*10);
    fillSkills();
    portrait.style.transform = 'scale(1.02) rotate(-1deg)';
    setTimeout(()=>portrait.style.transform='none',900);
  });

  // Night mode toggle
  modeToggle.addEventListener('change',(e)=>{
    document.body.classList.toggle('night', e.target.checked);
  });

  // Parallax on mouse move over the left panel
  const left = document.querySelector('.left-panel');
  left.addEventListener('mousemove', (ev)=>{
    const rect = left.getBoundingClientRect();
    const x = (ev.clientX - rect.left) / rect.width - 0.5;
    const y = (ev.clientY - rect.top) / rect.height - 0.5;
    portrait.style.transform = `translate(${x*10}px,${y*8}px)`;
  });
  left.addEventListener('mouseleave', ()=> portrait.style.transform='none');

  // Auto-fill a bit when scrolled into view
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(en=>{ if(en.isIntersecting) fillSkills(); });
  },{threshold:0.2});
  observer.observe(document.querySelector('.stat-block'));
});
