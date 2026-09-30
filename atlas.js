/* Watcher HQ - celestial atlas layer.
 *
 * Everything here is atmosphere and motion: the starfield behind the whole app,
 * the constellation web, the login orrery, and the energy packets that run along
 * the TVA conduits from a source node toward its target.
 *
 * Nothing here is required to read the app. If GSAP is missing, or the reader
 * prefers reduced motion, every effect degrades to a static chart.
 */
(function () {
  'use strict';

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const prefersReduced = () => motionQuery.matches;
  const hasGsap = () => typeof window.gsap !== 'undefined';
  const svgEl = (name) => document.createElementNS('http://www.w3.org/2000/svg', name);
  const rand = (min, max) => min + Math.random() * (max - min);

  // The five streams. These mirror the tokens in :root; the timeline SVG needs
  // real colour values in attributes, not var() in some paint servers.
  const STREAMS = {
    red: '#ff6485',
    amber: '#ecab05',
    green: '#02b14b',
    blue: '#539afd',
    violet: '#d869fd',
  };

  // app.js names a group's hue on the group element: `tva-group-red`, and it
  // still calls amber "gold" for the historical issue colour. Map that back.
  const ACCENT_ALIASES = { gold: 'amber' };

  let reduced = prefersReduced();
  motionQuery.addEventListener('change', (event) => {
    reduced = event.matches;
    if (reduced) stopAll();
  });

  /* ---------------------------------------------------------------- sky ---- */

  let sky = null;
  let skyFrame = 0;
  let skySizer = false;

  function startSky() {
    const canvas = document.getElementById('atlas-sky-canvas');
    if (!canvas || reduced || skyFrame) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars = [];

    function size() {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // density scales with area so a big screen is not sparser than a laptop
      const count = Math.round((window.innerWidth * window.innerHeight) / 9000);
      stars = Array.from({ length: Math.min(count, 420) }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: rand(0.35, 1.5),
        base: rand(0.16, 0.72),
        drift: rand(0.004, 0.022),
        phase: Math.random() * Math.PI * 2,
        speed: rand(0.4, 1.5),
        warm: Math.random() < 0.22,
      }));
    }

    function frame(t) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        // slow parallax drift, wrapped, with an independent twinkle
        s.x -= s.drift;
        if (s.x < -2) s.x = w + 2;
        const twinkle = s.base + Math.sin(t * 0.001 * s.speed + s.phase) * 0.3;
        const a = Math.max(0, Math.min(1, twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.warm
          ? 'rgba(240, 226, 122, ' + a.toFixed(3) + ')'
          : 'rgba(214, 226, 255, ' + a.toFixed(3) + ')';
        ctx.fill();
      }
      skyFrame = requestAnimationFrame(frame);
    }

    size();
    // bind the resize listener once for the life of the page, not per restart
    if (!skySizer) {
      skySizer = true;
      let resizeTimer = 0;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(size, 160);
      });
    }
    skyFrame = requestAnimationFrame(frame);
  }

  function stopSky() {
    if (skyFrame) cancelAnimationFrame(skyFrame);
    skyFrame = 0;
  }

  /* ------------------------------------------------------- constellation ---- */

  // A fixed star pattern with nearest-neighbour links, so the web is a stable
  // chart rather than something that reshuffles on every resize.
  function buildConstellation() {
    const svg = document.getElementById('atlas-constellation');
    if (!svg) return;
    const W = 1200;
    const H = 800;
    const points = [];
    // a stable pseudo-random field: fixed seed, so the sky is always the same sky
    let seed = 20260930;
    const next = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    for (let i = 0; i < 74; i++) points.push({ x: next() * W, y: next() * H });

    const group = svgEl('g');
    group.setAttribute('class', 'atlas-constellation-web');
    const limit = 132;
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const d = Math.hypot(dx, dy);
        if (d > limit) continue;
        const line = svgEl('line');
        line.setAttribute('x1', points[i].x.toFixed(1));
        line.setAttribute('y1', points[i].y.toFixed(1));
        line.setAttribute('x2', points[j].x.toFixed(1));
        line.setAttribute('y2', points[j].y.toFixed(1));
        line.setAttribute('class', 'atlas-constellation-link');
        line.style.opacity = ((1 - d / limit) * 0.5).toFixed(3);
        group.appendChild(line);
      }
    }
    for (const p of points) {
      const dot = svgEl('circle');
      dot.setAttribute('cx', p.x.toFixed(1));
      dot.setAttribute('cy', p.y.toFixed(1));
      dot.setAttribute('r', (1 + (p.x % 3) * 0.4).toFixed(2));
      dot.setAttribute('class', 'atlas-constellation-star');
      group.appendChild(dot);
    }
    svg.appendChild(group);

    if (!reduced && hasGsap()) {
      window.gsap.to(group.querySelectorAll('.atlas-constellation-link'), {
        opacity: 0.9,
        duration: 3.4,
        ease: 'sine.inOut',
        stagger: { each: 0.05, from: 'random' },
        repeat: -1,
        yoyo: true,
      });
    }
  }

  /* -------------------------------------------------------------- orrery ---- */

  function buildOrrery() {
    const ticks = document.getElementById('orrery-ticks');
    const hand = document.getElementById('orrery-hand');
    if (ticks) {
      for (let i = 0; i < 72; i++) {
        const angle = (i / 72) * Math.PI * 2;
        const major = i % 6 === 0;
        const r1 = major ? 138 : 144;
        const r2 = 150;
        const line = svgEl('line');
        line.setAttribute('x1', (200 + Math.cos(angle) * r1).toFixed(2));
        line.setAttribute('y1', (200 + Math.sin(angle) * r1).toFixed(2));
        line.setAttribute('x2', (200 + Math.cos(angle) * r2).toFixed(2));
        line.setAttribute('y2', (200 + Math.sin(angle) * r2).toFixed(2));
        line.setAttribute('class', major ? 'login-orrery-tick login-orrery-tick-major' : 'login-orrery-tick');
        ticks.appendChild(line);
      }
    }
    if (!hand || reduced || !hasGsap()) return;
    // one revolution per minute, the way a real instrument would read
    window.gsap.to(hand, { rotation: 360, transformOrigin: '200px 200px', duration: 60, ease: 'none', repeat: -1 });
  }

  /* --------------------------------------------------- TVA energy packets ---- */

  const streams = new Set();

  function stopAll() {
    stopSky();
    if (hasGsap()) window.gsap.killTweensOf('[data-atlas-packet]');
  }

  // The conduit takes its colour from the group it belongs to, so every path in
  // an account bundle is lit in that team's signal hue.
  function colourFor(path) {
    const group = path.closest('.tva-stream-group');
    if (group) {
      for (const className of group.classList) {
        if (!className.startsWith('tva-group-')) continue;
        const key = className.slice('tva-group-'.length);
        return STREAMS[ACCENT_ALIASES[key] || key] || 'var(--brass)';
      }
    }
    // the master spine has no group, and is deliberately brass
    return 'var(--brass)';
  }

  // A copy of the rail that shares its geometry exactly, so the glow and the
  // live filament can never drift from the path they trace.
  function conduitFrom(path, className, colour) {
    const clone = path.cloneNode(false);
    clone.setAttribute('class', className);
    clone.setAttribute('stroke', colour);
    // the arrowhead belongs to the rail only; a second one would double it up
    clone.removeAttribute('marker-end');
    clone.removeAttribute('id');
    return clone;
  }

  // Give one path a glowing conduit, a travelling current and a packet that runs
  // from the source end of the path to its target end.
  function energise(path, index) {
    if (!path.getAttribute('d')) return;
    const parent = path.parentNode;
    if (!parent || path.dataset.atlasLive === '1') return;
    path.dataset.atlasLive = '1';

    const colour = colourFor(path);
    const isBranch = path.classList.contains('tva-branch-path');
    const isMaster = path.classList.contains('tva-master-path');
    const runSeconds = isBranch ? 2.4 : isMaster ? 5.4 : 4.2;

    const glow = conduitFrom(path, 'tva-conduit-glow', colour);
    parent.insertBefore(glow, path);
    const live = conduitFrom(path, 'tva-conduit-live', colour);
    parent.insertBefore(live, path);

    // the packet rides the original path, so it follows the real geometry
    const packet = svgEl('circle');
    packet.setAttribute('class', 'tva-packet');
    packet.setAttribute('r', isBranch ? '2.6' : '3.4');
    packet.setAttribute('fill', colour);
    packet.setAttribute('data-atlas-packet', '1');
    parent.appendChild(packet);

    streams.add(path);

    // measure the real rail so the draw-on covers the whole run and no more
    let length = 900;
    if (typeof path.getTotalLength === 'function') {
      try { length = path.getTotalLength() || 900; } catch (error) { length = 900; }
    }

    if (reduced || !hasGsap()) {
      // still show a completed conduit, just not moving
      live.style.strokeDasharray = 'none';
      glow.style.opacity = '0.5';
      packet.style.opacity = '0';
      return;
    }

    const gsap = window.gsap;
    for (const el of [glow, live]) {
      el.style.strokeDasharray = length;
      el.style.strokeDashoffset = length;
    }
    gsap.set(packet, { opacity: 0 });
    gsap.set(live, { opacity: 0.9 });
    gsap.set(glow, { opacity: 0.35 });

    // energise the conduit once, in reading order down the chart
    gsap
      .timeline({ delay: index * 0.06 })
      .to([glow, live], { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' }, 0)
      .to(glow, { opacity: isMaster ? 0.55 : 0.7, duration: 0.6, ease: 'sine.inOut' }, 0.5);

    // then keep a packet running source to target forever
    const along = {
      path,
      align: path,
      alignOrigin: [0.5, 0.5],
      autoRotate: false,
      start: 0,
      end: 1,
    };
    gsap.set(packet, { motionPath: along });
    gsap.timeline({ repeat: -1, repeatDelay: rand(0.6, 1.8) })
      .to(packet, { opacity: 1, duration: 0.25 }, 0)
      .to(packet, { motionPath: along, duration: runSeconds, ease: 'power1.inOut' }, 0)
      .to(packet, { opacity: 0, duration: 0.35 }, runSeconds - 0.35);
  }

  function clearStreams(root) {
    for (const path of root.querySelectorAll('.tva-conduit-glow, .tva-conduit-live, .tva-packet')) path.remove();
    for (const path of root.querySelectorAll('[data-atlas-live]')) delete path.dataset.atlasLive;
  }

  // The map is re-rendered on every route change, so watch for it rather than
  // trying to hook into app.js internals.
  function watchTimeline() {
    const root = document.getElementById('page-content');
    if (!root) return;
    let timer = 0;
    const run = () => {
      const map = root.querySelector('.tva-map-svg');
      if (!map) return;
      if (map.dataset.atlasWired === '1') return;
      map.dataset.atlasWired = '1';
      const paths = map.querySelectorAll('.tva-stream-path, .tva-branch-path, .tva-master-path');
      paths.forEach((path, i) => energise(path, i));
      if (!reduced && hasGsap()) {
        window.gsap.from(map.querySelectorAll('.tva-stream-node, .tva-group-junction'), {
          scale: 0.2, opacity: 0, transformOrigin: '50% 50%',
          duration: 0.7, ease: 'back.out(2.4)', stagger: 0.012, delay: 0.2,
        });
      }
    };
    const observer = new MutationObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(run, 60);
    });
    observer.observe(root, { childList: true, subtree: true });
    run();
  }

  /* ------------------------------------------------------------ ignition ---- */

  function init() {
    // register the plugins once, up front, so the first packet is not late
    if (hasGsap() && window.gsap.registerPlugin) {
      if (window.MotionPathPlugin) window.gsap.registerPlugin(window.MotionPathPlugin);
      if (window.DrawSVGPlugin) window.gsap.registerPlugin(window.DrawSVGPlugin);
    }
    buildConstellation();
    buildOrrery();
    if (!reduced) startSky();
    watchTimeline();

    // a page that was already on the app (session restored) still needs the sky
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopSky();
      else if (!reduced) startSky();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.WatcherAtlas = { STREAMS, energise, clearStreams, startSky, stopSky, prefersReduced };
})();
