(() => {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const all = (selector, context = document) => Array.from(context.querySelectorAll(selector));

  // Animate only retained landing content; respect reduced-motion preferences.
  const reveal = all('.reveal');
  if (!reduce && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: .09, rootMargin: '0px 0px -24px 0px' });
    reveal.forEach(element => observer.observe(element));
  } else {
    reveal.forEach(element => element.classList.add('visible'));
  }

  // Hero conceptual: escena SVG/CSS continua en lugar de capturas.
  // No es un visor de imágenes ni presenta datos reales o simulados.

  // El botón de regreso acompaña la navegación, pero NO aparece durante
  // la primera sección (hero). Se activa al alcanzar el bloque de la demo.
  const backToTop = document.querySelector('[data-back-to-top]');
  const firstSection = document.querySelector('main > section.hero');
  if (backToTop && firstSection) {
    let updatePending = false;
    const updateBackToTop = () => {
      updatePending = false;
      const afterFirstSection = firstSection.getBoundingClientRect().bottom <= 0;
      backToTop.classList.toggle('is-visible', afterFirstSection);
      backToTop.setAttribute('aria-hidden', String(!afterFirstSection));
      backToTop.inert = !afterFirstSection;
      if (afterFirstSection) {
        backToTop.removeAttribute('tabindex');
      } else {
        backToTop.setAttribute('tabindex', '-1');
      }
    };
    const scheduleBackToTopUpdate = () => {
      if (updatePending) return;
      updatePending = true;
      requestAnimationFrame(updateBackToTop);
    };
    window.addEventListener('scroll', scheduleBackToTopUpdate, { passive:true });
    window.addEventListener('resize', scheduleBackToTopUpdate, { passive:true });
    window.addEventListener('pageshow', scheduleBackToTopUpdate);
    updateBackToTop();
  }

  // Analytics fires only when an independently consent-controlled dataLayer exists.
  all('[data-cta]').forEach(link => link.addEventListener('click', () => {
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: 'prestazo_playstore_click', position: link.dataset.cta });
    }
  }));
})();

/* Prestazo — avance contextual de la demostración; fuente: pantalla activa. */
(() => {
  'use strict';

  const init = () => {
    const header = document.querySelector('.site-header');
    const headerInner = header?.querySelector('.header-inner');
    const demo = document.querySelector('[data-miniprestazo]');
    const tour = document.getElementById('pantallas');
    const download = document.getElementById('descargar');
    if (!header || !headerInner || !demo || !tour || !download) return;
    if (headerInner.querySelector('.prestazo-mobile-section-name')) return;

    const en = document.documentElement.lang.toLowerCase().startsWith('en');
    const translations = demo.querySelector('[data-mp-i18n]')?.dataset || {};
    const headings = [
      translations.settingsHeading,
      translations.customerHeading,
      translations.loanHeading,
      translations.paymentHeading
    ].map(value => (value || '').trim().replace(/[.!]+$/u, ''));
    const shortNames = en
      ? ['Setup', 'Customers', 'Loans', 'Payments']
      : ['Configuración', 'Clientes', 'Préstamos', 'Pagos'];

    const mobile = document.createElement('span');
    mobile.className = 'prestazo-mobile-section-name';
    mobile.setAttribute('aria-live', 'off');
    mobile.textContent = en ? 'Home' : 'Inicio';
    headerInner.prepend(mobile);

    const desktop = document.createElement('span');
    desktop.className = 'prestazo-desktop-step-progress';
    desktop.setAttribute('aria-hidden', 'true');
    headerInner.querySelector('.brand')?.after(desktop);

    const announcer = document.createElement('span');
    announcer.className = 'prestazo-step-sr-only';
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    headerInner.append(announcer);

    const orderTitle = tour.querySelector('[data-mp-order-title]');
    const stepTitle = tour.querySelector('[data-mp-story-title]');
    const screens = [...demo.querySelectorAll('[data-mp-screen]')];
    let pending = false;
    let lastStep = null;
    let lastMobileText = '';
    let lastDesktopText = '';
    let lastDesktopVisibility = false;

    const stepForScreen = () => {
      const screen = screens.find(item => !item.hidden)?.dataset.mpScreen;
      if (screen === 'customer') return 1;
      if (screen === 'loan') return 2;
      if (screen === 'payment') return 3;
      return 0; // company, monetary, policy, sequences = etapa 1
    };

    const visibleBelowHeader = (element, headerBottom) => {
      if (!element || demo.classList.contains('mp-story-active')) return false;
      const style = getComputedStyle(element);
      if (style.display === 'none' || style.visibility === 'hidden' ||
          Number(style.opacity) < 0.02) return false;
      const rect = element.getBoundingClientRect();
      return rect.bottom > headerBottom + 4 && rect.top < innerHeight - 4;
    };

    const sync = () => {
      pending = false;
      const headerBottom = header.getBoundingClientRect().bottom;
      const tourRect = tour.getBoundingClientRect();
      const downloadRect = download.getBoundingClientRect();
      const inTour = tourRect.top <= headerBottom + 100 &&
        tourRect.bottom > headerBottom + 5;
      const inDownload = downloadRect.top <= headerBottom + 5;
      const step = stepForScreen();
      const orderVisible = visibleBelowHeader(orderTitle, headerBottom);
      const titleVisible = visibleBelowHeader(stepTitle, headerBottom);

      let mobileText;
      let desktopText = '';
      let showDesktop = false;
      let fullAccessibleText = '';

      if (inDownload) {
        mobileText = en ? 'Download free' : 'Descargar gratis';
        fullAccessibleText = mobileText;
      } else if (!inTour) {
        mobileText = en ? 'Home' : 'Inicio';
        fullAccessibleText = mobileText;
      } else {
        fullAccessibleText = (en ? 'Step ' : 'Paso ') + (step + 1) +
          (en ? ' of 4: ' : ' de 4: ') + headings[step];
        if (orderVisible) {
          mobileText = en ? 'The app' : 'La aplicación';
        } else if (titleVisible) {
          mobileText = (en ? 'Step ' : 'Paso ') + (step + 1) +
            (en ? ' of 4' : ' de 4');
          showDesktop = true;
          desktopText = (en ? 'Step ' : 'Paso ') + (step + 1) + '/4';
        } else {
          mobileText = (step + 1) + '/4 · ' + shortNames[step];
          showDesktop = true;
          desktopText = (en ? 'Step ' : 'Paso ') + (step + 1) + '/4';
          if (innerWidth > 900) desktopText += ' · ' + headings[step];
        }
        if (inTour && step !== lastStep) {
          if (lastStep !== null) announcer.textContent = fullAccessibleText;
          lastStep = step;
        }
      }

      if (mobileText !== lastMobileText) {
        mobile.textContent = mobileText;
        lastMobileText = mobileText;
      }
      mobile.title = fullAccessibleText;
      mobile.setAttribute('aria-label', fullAccessibleText);
      if (desktopText !== lastDesktopText) {
        desktop.textContent = desktopText;
        lastDesktopText = desktopText;
      }
      if (showDesktop !== lastDesktopVisibility) {
        desktop.classList.toggle('is-visible', showDesktop);
        lastDesktopVisibility = showDesktop;
      }
    };

    const schedule = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(sync);
    };

    window.addEventListener('scroll', schedule, {passive:true});
    window.addEventListener('resize', schedule, {passive:true});
    window.addEventListener('pageshow', schedule);
    window.addEventListener('hashchange', schedule);
    window.addEventListener('load', schedule);
    screens.forEach(screen => new MutationObserver(schedule).observe(
      screen, {attributes:true, attributeFilter:['hidden']}
    ));
    new MutationObserver(schedule).observe(demo, {
      attributes:true, attributeFilter:['class']
    });
    sync();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, {once:true});
  } else {
    init();
  }
})();

/* Prestazo — separate initial overlay and entrance animation; no photo modifications. */
(() => {
  'use strict';

  const init = () => {
    const hero = document.querySelector('.hero.hero--full-bleed');
    if (!hero || hero.querySelector('.prestazo-hero-lettering')) return;
    const lang = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'es';

    // The lettering, without the initial, remains within the hero's layout.
    const lettering = document.createElement('picture');
    lettering.className = 'prestazo-hero-lettering';
    lettering.setAttribute('aria-hidden', 'true');
    const mobile = document.createElement('source');
    mobile.media = '(max-width: 600px)';
    mobile.type = 'image/svg+xml';
    mobile.srcset = '/img/lettering/hero-lettering-' + lang + '-mobile.svg';
    const mainImage = document.createElement('img');
    mainImage.src = '/img/lettering/hero-lettering-' + lang + '-desktop.svg';
    mainImage.alt = '';
    mainImage.decoding = 'async';
    mainImage.loading = 'eager';
    mainImage.fetchPriority = 'high';
    lettering.append(mobile,mainImage);
    hero.insertBefore(lettering,hero.querySelector('.hero-grid'));

    // This is a separate body-level layer so it can actually pass ABOVE
    // the sticky header. Keeping it inside hero would trap its z-index.
    const layer = document.createElement('picture');
    layer.className = 'prestazo-hero-initial-layer';
    layer.setAttribute('aria-hidden','true');
    const mobileInitial = document.createElement('source');
    mobileInitial.media='(max-width: 600px)';
    mobileInitial.type='image/svg+xml';
    mobileInitial.srcset='/img/lettering/hero-initial-'+lang+'-mobile.svg';
    const initialImage = document.createElement('img');
    initialImage.src='/img/lettering/hero-initial-'+lang+'-desktop.svg';
    initialImage.alt='';
    initialImage.decoding='async';
    initialImage.loading='eager';
    initialImage.fetchPriority='high';
    layer.append(mobileInitial,initialImage);
    document.body.append(layer);

    let ready=false;
    let entrancePlayed=false;
    let alignmentScheduled=false;
    let scrollScheduled=false;

    const align = () => {
      alignmentScheduled=false;
      if (!layer.isConnected) return;
      // Use layout coordinates, not getBoundingClientRect() on the animated
      // lettering: its translateY would otherwise offset the C permanently.
      const heroRect=hero.getBoundingClientRect();
      layer.style.left=(heroRect.left+window.scrollX+lettering.offsetLeft)+'px';
      layer.style.top=(heroRect.top+window.scrollY+lettering.offsetTop)+'px';
      layer.style.width=lettering.offsetWidth+'px';
    };
    const scheduleAlignment = () => {
      if (alignmentScheduled) return;
      alignmentScheduled=true;
      requestAnimationFrame(align);
    };
    const syncStack = () => {
      scrollScheduled=false;
      const behind=window.scrollY>8;
      layer.classList.toggle('is-behind-header',behind);
      layer.dataset.stack=behind?'behind':'above';
    };
    const scheduleStack = () => {
      if (scrollScheduled) return;
      scrollScheduled=true;
      requestAnimationFrame(syncStack);
    };
    const playEntrance = () => {
      if (!ready || entrancePlayed) return;
      entrancePlayed=true;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      layer.classList.add('is-entrance');
      lettering.classList.add('is-entrance');
    };
    const maybeEntrance = () => {
      if (entrancePlayed || !ready) return;
      const bounds=hero.getBoundingClientRect();
      if (bounds.bottom>0 && bounds.top<window.innerHeight*.8) {
        requestAnimationFrame(playEntrance);
      }
    };

    const failure=()=>{
      // If one vector fails, restore the original accessible HTML heading
      // rather than showing an incomplete word without its initial.
      ready=false;
      hero.classList.remove('hero--vector-ready');
      lettering.remove();
      layer.remove();
    };
    const activate = () => {
      if (ready) return;
      if (!(mainImage.complete && mainImage.naturalWidth &&
          initialImage.complete && initialImage.naturalWidth)) return;
      ready=true;
      align();
      syncStack();
      hero.classList.add('hero--vector-ready');
      maybeEntrance();
    };
    mainImage.addEventListener('load',activate);
    initialImage.addEventListener('load',activate);
    mainImage.addEventListener('error',failure,{once:true});
    initialImage.addEventListener('error',failure,{once:true});
    if (mainImage.complete && initialImage.complete) activate();
    window.addEventListener('resize',scheduleAlignment,{passive:true});
    window.addEventListener('resize',scheduleStack,{passive:true});
    window.addEventListener('scroll',scheduleStack,{passive:true});
    window.addEventListener('pageshow',()=>{scheduleAlignment();scheduleStack();maybeEntrance()});
    window.addEventListener('scroll',maybeEntrance,{passive:true});
    if ('ResizeObserver' in window) {
      new ResizeObserver(scheduleAlignment).observe(lettering);
    }
    if (document.fonts?.ready) document.fonts.ready.then(scheduleAlignment);
  };

  if (document.readyState==='loading')
    document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();


/* Prestazo: two-gesture collision between initial glyph and glass header.
   This is a decorative enhancement restricted to the first scroll attempt.
   Accessibility: reduced-motion users scroll normally. */
(() => {
  'use strict';
  const init = () => {
    const header=document.querySelector('.site-header');
    const hero=document.querySelector('.hero.hero--full-bleed');
    if (!header || !hero || header.classList.contains('prestazo-impact-host')) return;
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return;
    const skin=document.createElement('div');
    skin.className='prestazo-header-impact-skin';
    skin.setAttribute('aria-hidden','true');
    const edge=document.createElementNS('http://www.w3.org/2000/svg','svg');
    edge.classList.add('prestazo-header-impact-edge');
    edge.setAttribute('aria-hidden','true');
    edge.setAttribute('viewBox','0 0 180 46');
    edge.setAttribute('preserveAspectRatio','none');
    const line=document.createElementNS('http://www.w3.org/2000/svg','path');
    line.setAttribute('fill','none');
    line.setAttribute('stroke','rgba(145,223,209,.24)');
    line.setAttribute('stroke-width','1.1');
    line.setAttribute('stroke-linecap','round');
    // The cut-out must be genuinely transparent: show the current section
    // beneath the header, whether it is turquoise, navy or a photo.
    const shade=document.createElementNS('http://www.w3.org/2000/svg','path');
    shade.setAttribute('fill','none');
    shade.setAttribute('stroke','rgba(0,13,28,.5)');
    shade.setAttribute('stroke-width','7');
    shade.setAttribute('stroke-linecap','round');
    shade.classList.add('prestazo-header-edge-shadow-path');
    edge.append(shade,line);
    header.prepend(skin);
    header.append(edge);
    header.classList.add('prestazo-impact-host');
    let phase='armed',depth=0,lastWheel=0,lockedTouch=false,touchStartY=0,touchStartX=0,gestureCaptured=false,animationToken=0;
    const radius=76;
    let centerX=92;
    const initial=()=>document.querySelector('.prestazo-hero-initial-layer');
    const getCenter=()=>{
      const l=initial();
      if(!l)return Math.min(92,header.clientWidth*.25);
      const r=l.getBoundingClientRect();
      const h=header.getBoundingClientRect();
      // The visually prominent right-hand arc of the C/F impacts the header.
      return Math.max(radius*.85,Math.min(header.clientWidth-radius*.85,r.left-h.left+r.width*.23));
    };
    const shape=(d)=>{
      const width=header.getBoundingClientRect().width;
      const height=header.getBoundingClientRect().height;
      const cx=Math.min(width-60,Math.max(60,centerX));
      const points=[[0,height],[cx-radius,height],
        [cx-radius*.78,height-d*.06],[cx-radius*.60,height-d*.25],
        [cx-radius*.42,height-d*.58],[cx-radius*.22,height-d*.9],
        [cx,height-d],[cx+radius*.22,height-d*.9],
        [cx+radius*.42,height-d*.58],[cx+radius*.60,height-d*.25],
        [cx+radius*.78,height-d*.06],[cx+radius,height],[width,height]];
      const poly=['0px 0px',width+'px 0px',...points.slice().reverse().map(p=>p[0].toFixed(2)+'px '+p[1].toFixed(2)+'px')];
      skin.style.clipPath='polygon('+poly.join(',')+')';
      // Full-width edge silhouette. The same path follows the deformed
      // section and extends to both ends of the glass header.
      edge.style.left='0px';
      edge.style.top=(height-46)+'px';
      edge.setAttribute('viewBox','0 0 '+width.toFixed(2)+' 46');
      const local=[[0,46],[cx-radius,46],
        [cx-radius*.78,46-d*.06],[cx-radius*.60,46-d*.25],
        [cx-radius*.42,46-d*.58],[cx-radius*.22,46-d*.9],
        [cx,46-d],[cx+radius*.22,46-d*.9],
        [cx+radius*.42,46-d*.58],[cx+radius*.60,46-d*.25],
        [cx+radius*.78,46-d*.06],[cx+radius,46],[width,46]];
      const edgePath='M '+local.map(([x,y])=>x.toFixed(2)+' '+y.toFixed(2)).join(' L ');
      line.setAttribute('d',edgePath);
      shade.setAttribute('d',edgePath);
      edge.style.opacity='1';
      header.style.setProperty('--prestazo-impact-depth',d+'px');
    };
    const animateDepth=(from,to,duration,done)=>{
      const token=++animationToken,started=performance.now();
      const frame=(now)=>{
        if(token!==animationToken)return;
        const t=Math.min(1,(now-started)/duration),ease=1-Math.pow(1-t,3);
        depth=from+(to-from)*ease;
        shape(depth);
        if(t<1)requestAnimationFrame(frame);
        else if(done)done();
      };
      requestAnimationFrame(frame);
    };
    // Collision transmits a spring impulse to the real header branding.
    // Desktop: wallet icon + Prestazo name move together as one anchor.
    // Mobile: the live section label (Inicio) receives the same impulse.
    // Native WAAPI ensures all motion is transform-only and clickable.
    let brandImpulse=null;
    const brandTarget=()=>window.matchMedia('(max-width:600px)').matches
      ?header.querySelector('.prestazo-mobile-section-name')
      :header.querySelector('.brand');
    const pushBrand=()=>{
      const target=brandTarget();
      if(!target || typeof target.animate!=='function')return;
      brandImpulse?.cancel();
      const intensity=Math.min(1.15,Math.max(.75,30/30));
      const y=-12*intensity;
      brandImpulse=target.animate([
        {transform:'translate3d(0,0,0)',offset:0},
        {transform:'translate3d(0,'+(y*.30).toFixed(1)+'px,0)',offset:.14},
        {transform:'translate3d(0,'+y.toFixed(1)+'px,0)',offset:.31},
        {transform:'translate3d(0,'+(y*.79).toFixed(1)+'px,0)',offset:.46},
        {transform:'translate3d(0,2.9px,0)',offset:.64},
        {transform:'translate3d(0,-1.8px,0)',offset:.79},
        {transform:'translate3d(0,.6px,0)',offset:.92},
        {transform:'translate3d(0,0,0)',offset:1}
      ],{duration:860,easing:'linear',iterations:1,fill:'none'});
      brandImpulse.finished.catch(()=>{});
    };
    const collide=()=>{
      if(phase!=='armed')return;
      phase='resisting';
      centerX=getCenter();
      const l=initial();
      if(l){
        l.classList.remove('is-entrance');
        l.classList.add('prestazo-c-impact');
      }
      header.classList.add('prestazo-impact-colliding');
      pushBrand();
      animateDepth(depth,30,210,()=>{
        animateDepth(30,15,550,()=>{
          if(phase==='resisting')phase='blocked';
          header.classList.remove('prestazo-impact-colliding');
          header.classList.add('prestazo-impact-dented');
        });
      });
    };
    const release=()=>{
      if(phase!=='blocked' && phase!=='resisting')return;
      phase='released';
      header.classList.remove('prestazo-impact-colliding');
      header.classList.add('prestazo-impact-dented','prestazo-impact-breached');
      animateDepth(depth,17,260);
      initial()?.classList.remove('prestazo-c-impact');
    };
    // Return-to-top resets the dent for the next collision sequence.
    // Do not rearm on the initial blocked gesture: the page must first move away.
    let hasLeftTop=false;
    let lastObservedScrollY=window.scrollY;
    const restoreHeader=()=>{
      if(phase!=='released'||!hasLeftTop)return;
      phase='restoring';
      header.classList.remove('prestazo-impact-breached','prestazo-impact-colliding');
      initial()?.classList.remove('prestazo-c-impact');
      animateDepth(depth,0,440,()=>{
        depth=0;
        shape(0);
        header.classList.remove('prestazo-impact-dented');
        hasLeftTop=false;
        lastWheel=0;
        phase='armed';
      });
    };
    const syncReturn=()=>{
      const y=window.scrollY;
      if(phase==='released'){
        if(y>30) hasLeftTop=true;
        const upperHero=Math.min(180,window.innerHeight*.25);
        // Only restore on an actual upward return, not the second
        // downward gesture which just released the C.
        if(hasLeftTop && y<=upperHero && y<lastObservedScrollY-1){
          restoreHeader();
        }
      }
      lastObservedScrollY=y;
    };
    window.addEventListener('scroll',syncReturn,{passive:true});
    const nearTop=()=>window.scrollY<=3 && !!initial() && hero.classList.contains('hero--vector-ready');
    const shouldIgnore=(target)=>{
      return !!target.closest?.('a,button,input,textarea,select,[contenteditable="true"],[role="button"],[role="textbox"]');
    };
    const wheel=(e)=>{
      if(e.deltaY<=0||e.ctrlKey||!nearTop()||phase==='released'||shouldIgnore(e.target))return;
      const now=performance.now();
      if(phase==='armed'){
        e.preventDefault();
        lastWheel=now;
        collide();
        return;
      }
      if(now-lastWheel<520){
        e.preventDefault();
        lastWheel=now;
        return;
      }
      release();
    };
    window.addEventListener('wheel',wheel,{passive:false,capture:true});
    // First upward swipe is resisted, the next separate swipe passes.
    window.addEventListener('touchstart',e=>{
      if(!nearTop()||phase==='released'||!e.touches.length||shouldIgnore(e.target)){
        lockedTouch=false;return;
      }
      touchStartY=e.touches[0].clientY;touchStartX=e.touches[0].clientX;
      lockedTouch=phase==='armed'||phase==='blocked'||phase==='resisting';
      gestureCaptured=false;
      // Second gesture is permitted immediately after the first finger lift.
      if(phase==='blocked'){
        lockedTouch=false;release();
      }
    },{passive:true,capture:true});
    window.addEventListener('touchmove',e=>{
      if(!lockedTouch||!nearTop()||!e.touches.length)return;
      const dy=touchStartY-e.touches[0].clientY,dx=Math.abs(touchStartX-e.touches[0].clientX);
      if(dy<=8||dx>Math.abs(dy)*1.3)return;
      e.preventDefault();
      gestureCaptured=true;
      collide();
    },{passive:false,capture:true});
    const touchFinish=()=>{
      if(!lockedTouch)return;
      lockedTouch=false;
      if(gestureCaptured&&phase==='resisting')phase='blocked';
    };
    window.addEventListener('touchend',touchFinish,{passive:true,capture:true});
    window.addEventListener('touchcancel',touchFinish,{passive:true,capture:true});
    window.addEventListener('resize',()=>{
      centerX=getCenter();
      shape(depth);
    },{passive:true});
    window.addEventListener('pageshow',()=>{centerX=getCenter();shape(depth)});
    centerX=getCenter();shape(0);
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();


/* The header dent shows the real first-section background. No fixed paint. */
(() => {
  const updateUnderlay=()=>{
    const main=document.querySelector('main#content');
    const hero=main?.querySelector('.hero.hero--full-bleed');
    if(!main || !hero)return;
    const background=getComputedStyle(hero).backgroundColor;
    main.style.setProperty('--prestazo-first-section-bg',background);
  };
  if(document.readyState==='loading')
    document.addEventListener('DOMContentLoaded',updateUnderlay,{once:true});
  else updateUnderlay();
  window.addEventListener('pageshow',updateUnderlay);
})();


/* Prestazo desktop checklist: reads the same live demo headings;
   no parallel step engine, no extra timers, and no touch-specific changes. */
(() => {
  'use strict';
  const initialize=()=>{
    for(const demo of document.querySelectorAll('[data-miniprestazo]')) {
      if(demo.querySelector('.mp-desktop-checklist'))continue;
      const editorial=demo.querySelector('.mp-editorial');
      const title=demo.querySelector('[data-mp-story-title]');
      const order=demo.closest('.mp-tour')?.querySelector('[data-mp-order-title]');
      const local=demo.querySelector('[data-mp-i18n]')?.dataset||{};
      if(!editorial||!title||!order)return;
      const names=[
        local.settingsHeading||'Configurar tu empresa.',
        local.customerHeading||'Crear tu primer cliente.',
        local.loanHeading||'Gestionarle un préstamo.',
        local.paymentHeading||'Registrar un pago.'
      ];
      const list=document.createElement('ol');
      list.className='mp-desktop-checklist';
      list.setAttribute('aria-label',demo.dataset.locale==='en'?'Demo progress':'Progreso de la demostración');
      const rows=names.map((name,i)=>{
        const li=document.createElement('li');
        const number=document.createElement('span');
        number.className='mp-check-index';
        number.textContent=String(i+1).padStart(2,'0');
        number.setAttribute('aria-hidden','true');
        const label=document.createElement('span');
        label.className='mp-check-label';
        label.textContent=name.replace(/\.$/,'');
        li.append(number,label);
        list.append(li);
        return li;
      });
      editorial.insertBefore(list,editorial.querySelector('.mp-actions'));
      let last=-1;
      const update=()=>{
        const normalized=order.textContent.trim().toLowerCase();
        const headings=demo.dataset.locale==='en'
          ?['first','second','third','fourth']
          :['lo primero','lo segundo','lo tercero','lo cuarto'];
        let index=headings.findIndex(x=>normalized.startsWith(x));
        if(index<0){
          const actual=title.textContent.trim().toLowerCase();
          index=names.findIndex(x=>actual===x.toLowerCase());
        }
        if(index<0)index=0;
        if(index===last)return;
        last=index;
        rows.forEach((row,i)=>{
          row.classList.toggle('is-active',i===index);
          row.classList.toggle('is-complete',i<index);
          if(i===index)row.setAttribute('aria-current','step');
          else row.removeAttribute('aria-current');
        });
      };
      new MutationObserver(update).observe(order,{childList:true,characterData:true,subtree:true});
      new MutationObserver(update).observe(title,{childList:true,characterData:true,subtree:true});
      update();
    }
  };
  if(document.readyState==='loading')
    document.addEventListener('DOMContentLoaded',initialize,{once:true});
  else initialize();
})();
