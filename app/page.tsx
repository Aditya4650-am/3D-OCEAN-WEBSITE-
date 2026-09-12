"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowDown, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import Lenis from "lenis";

const img = (id: string) => `/images/${id}.jpg`;

const marine = [
  { name: "Green sea turtle", latin: "Chelonia mydas", habitat: "Tropical & subtropical seas", size: "Up to 1.2 m", diet: "Seagrass and algae", fact: "Adults can migrate thousands of kilometres between feeding grounds and nesting beaches.", image: img("photo-1544551763-46a013bb70d5") },
  { name: "Great white shark", latin: "Carcharodon carcharias", habitat: "Coastal temperate waters", size: "Up to 6 m", diet: "Fish and marine mammals", fact: "Their finely tuned senses can detect the electrical fields of prey.", image: img("photo-1560275619-4662e36fa65c") },
  { name: "Manta ray", latin: "Mobula alfredi", habitat: "Warm oceans", size: "Up to 5.5 m", diet: "Plankton", fact: "Mantas are filter feeders, gathering plankton with their wide, graceful mouths.", image: img("photo-1546026423-cc4642628d2b") },
  { name: "Moon jelly", latin: "Aurelia aurita", habitat: "Coastal oceans", size: "Up to 40 cm", diet: "Zooplankton", fact: "Its translucent bell reveals a simple body built for drifting currents.", image: img("photo-1559827260-dc66d52bef19") },
];

const zones = [
  ["Sunlight", "0–200 m", "Where most marine photosynthesis occurs."],
  ["Twilight", "200–1,000 m", "A dim blue world beyond sunlight."],
  ["Midnight", "1,000–4,000 m", "No sunlight reaches this depth."],
  ["Abyssal", "4,000–6,000 m", "Vast plains under immense pressure."],
  ["Hadal", "6,000–11,000 m", "Trenches at the ocean's extreme edge."],
];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null); const visible = useInView(ref, { once: true, margin: "-12%" });
  return <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 32 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: .8, ease: [0.22, 1, .36, 1] }}>{children}</motion.div>;
}

function Counter({ value, label }: { value: string; label: string }) {
  const ref = useRef(null); const active = useInView(ref, { once: true });
  return <div ref={ref} className="stat"><span>{active ? value : "—"}</span><p>{label}</p></div>;
}

export default function Home() {
  const video = useRef<HTMLVideoElement>(null); const hero = useRef<HTMLElement>(null);
  const heroCopy = useRef<HTMLDivElement>(null); const heroBottom = useRef<HTMLDivElement>(null);
  const progressLine = useRef<HTMLElement>(null); const progressLabel = useRef<HTMLElement>(null);
  const [menu, setMenu] = useState(false);
  const [selectedMarine, setSelectedMarine] = useState<(typeof marine)[number] | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.innerWidth < 769) return;
    const lenis = new Lenis({ lerp: .075, duration: 1.1, smoothWheel: true, wheelMultiplier: .85, touchMultiplier: 1 });
    let frame = 0;
    const animate = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(animate); };
    frame = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); };
  }, []);

  useEffect(() => {
    const v = video.current, container = hero.current; if (!v || !container) return;
    let frame = 0, targetProgress = 0, displayedProgress = 0, active = true;
    const clamp = (n: number) => Math.max(0, Math.min(1, n));
    const setTarget = () => {
      const distance = container.offsetHeight - window.innerHeight;
      targetProgress = clamp(-container.getBoundingClientRect().top / distance);
      if (!frame) frame = requestAnimationFrame(render);
    };
    const render = () => {
      frame = 0;
      displayedProgress += (targetProgress - displayedProgress) * 0.13;
      const p = Math.abs(targetProgress - displayedProgress) < .0004 ? targetProgress : displayedProgress;
      const fade = clamp((.98 - p) / .19);
      if (heroCopy.current) { heroCopy.current.style.opacity = String(fade); heroCopy.current.style.transform = `translate3d(0, ${-p * 86}px, 0)`; }
      if (heroBottom.current) heroBottom.current.style.opacity = String(fade);
      if (progressLine.current) progressLine.current.style.transform = `scaleX(${p})`;
      if (progressLabel.current) progressLabel.current.textContent = `${String(Math.max(1, Math.ceil(p * 8))).padStart(2, "0")} / 08`;
      if (v.readyState > 0 && Number.isFinite(v.duration)) {
        const time = Math.min(p * v.duration, Math.max(0, v.duration - .04));
        if (Math.abs(v.currentTime - time) > .022) v.currentTime = time;
      }
      if (active && Math.abs(targetProgress - displayedProgress) >= .0004) frame = requestAnimationFrame(render);
    };
    const onSeeked = () => { if (active && !frame && Math.abs(targetProgress - displayedProgress) >= .0004) frame = requestAnimationFrame(render); };
    const pause = () => { if (document.hidden) v.pause(); };
    v.pause(); v.addEventListener("seeked", onSeeked); window.addEventListener("scroll", setTarget, { passive: true }); window.addEventListener("resize", setTarget); document.addEventListener("visibilitychange", pause); setTarget();
    return () => { active = false; cancelAnimationFrame(frame); v.removeEventListener("seeked", onSeeked); window.removeEventListener("scroll", setTarget); window.removeEventListener("resize", setTarget); document.removeEventListener("visibilitychange", pause); };
  }, []);

  const nav = ["Explore", "Marine Life", "Ocean Zones", "Coral Reefs", "Deep Sea", "Facts"];
  return <main>
    <nav className="nav" aria-label="Main navigation">
      <a className="logo" href="#top">OCEAN<span>INFOTECH</span></a>
      <div className="navlinks">{nav.map(x => <a key={x} href={`#${x.toLowerCase().replace(" ", "-")}`}>{x}</a>)}</div>
      <button className="menu" aria-label="Toggle navigation" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
    </nav>
    <AnimatePresence>{menu && <motion.div className="mobile-menu" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>{nav.map(x => <a onClick={() => setMenu(false)} key={x} href={`#${x.toLowerCase().replace(" ", "-")}`}>{x}</a>)}</motion.div>}</AnimatePresence>
    <AnimatePresence>{selectedMarine && <motion.div className="profile-modal" role="dialog" aria-modal="true" aria-label={`${selectedMarine.name} profile`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedMarine(null)}><motion.article initial={{ y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 18, opacity: 0 }} transition={{ duration: .3 }} onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setSelectedMarine(null)} aria-label="Close creature profile"><X /></button><img src={selectedMarine.image} alt={selectedMarine.name} /><div className="profile-content"><p className="eyebrow">SPECIES PROFILE</p><h2>{selectedMarine.name}</h2><i>{selectedMarine.latin}</i><div className="profile-facts"><span><b>HABITAT</b>{selectedMarine.habitat}</span><span><b>AVERAGE SIZE</b>{selectedMarine.size}</span><span><b>DIET</b>{selectedMarine.diet}</span></div><p className="profile-fact">{selectedMarine.fact}</p></div></motion.article></motion.div>}</AnimatePresence>

    <section id="top" className="hero-scroll" ref={hero}>
      <div className="hero-sticky">
        <video ref={video} className="hero-video" src="/turtle-scroll.mp4" preload="auto" muted playsInline disablePictureInPicture aria-label="Baby sea turtle swimming underwater" />
        <div className="hero-wash" /><div className="grain" />
        <div className="hero-copy" ref={heroCopy}>
          <p className="eyebrow">Field notes / 01—08</p><h1>OCEAN<br /><em>INFOTECH</em></h1><p className="hero-tag">Explore the world<br />beneath the surface.</p>
        </div>
        <div className="hero-bottom" ref={heroBottom}><span>SCROLL TO DIVE</span><ArrowDown size={15} /><div className="hero-progress"><i ref={progressLine} /></div><b ref={progressLabel}>01 / 08</b></div>
      </div>
    </section>

    <section id="explore" className="intro section">
      <div className="intro-image photo"><img src={img("photo-1484291470158-b8f8d608850d")} alt="Sunlight passing through the ocean surface" /></div>
      <Reveal className="intro-copy"><p className="eyebrow">01 / The living blue</p><h2>THE<br /><i>OCEAN</i></h2><h3>The largest living environment on Earth.</h3><p>Covering approximately 71% of Earth&apos;s surface, the ocean moderates climate, drives weather and contains a vast web of life—much of it still poorly understood.</p><div className="big-number">71<sup>%</sup><span>of Earth&apos;s surface is ocean</span></div><div className="glass-note"><span>OCEAN SYSTEM</span><p>One connected circulation system moves heat, nutrients and life around the planet.</p><b>01 — 05</b></div></Reveal>
    </section>

    <section id="ocean-zones" className="zones section">
      <Reveal><p className="eyebrow">02 / A vertical expedition</p><h2>DESCEND INTO<br /><i>THE BLUE</i></h2></Reveal>
      <div className="zone-list">{zones.map(([name, depth, note], i) => <Reveal key={name} className="zone-row"><span>0{i + 1}</span><h3>{name} <i>Zone</i></h3><strong>{depth}</strong><p>{note}</p></Reveal>)}</div>
      <Reveal className="zones-field"><div className="photo"><img src={img("photo-1475924156734-496f6cac6ec1")} alt="Shoal of fish in blue ocean water" /></div><div className="zone-dossier"><p className="eyebrow">Field record / water column</p><h3>Every depth has<br /><i>its own rules.</i></h3><p>Light, pressure, temperature and food availability reshape the ocean from the sunlit surface to the deepest trenches.</p><div><span><b>200 M</b> sunlight fades</span><span><b>1,000 M</b> midnight begins</span><span><b>11,000 M</b> trench frontier</span></div></div></Reveal>
    </section>

    <section id="marine-life" className="life section"><Reveal><p className="eyebrow">03 / Species archive</p><h2>LIFE BENEATH<br /><i>THE SURFACE</i></h2></Reveal><div className="life-grid">{marine.map((m, i) => <Reveal className={`life-card card-${i}`} key={m.name}><img src={m.image} alt={m.name} /><div className="card-shade" /><div className="card-info"><p>{m.latin}</p><h3>{m.name}</h3><div><span>{m.habitat}</span><span>{m.size}</span></div><small>{m.fact}</small><button className="card-action" onClick={() => setSelectedMarine(m)}>View profile <ArrowUpRight size={13} /></button></div></Reveal>)}</div></section>

    <section className="dossier section"><Reveal className="dossier-intro"><p className="eyebrow">Specimen notes / selected encounters</p><h2>ANATOMY OF<br /><i>ADAPTATION</i></h2><p>Marine animals are shaped by their habitat—streamlined for distance, sensitive to faint signals and precisely adapted to their place in the water column.</p></Reveal><div className="dossier-grid"><Reveal className="dossier-card large"><img src={img("photo-1568430462989-44163eb1752f")} alt="Large whale in open ocean" /><div><p>BLUE WHALE / BALAENOPTERA MUSCULUS</p><h3>Built for a<br />blue planet.</h3><span>Largest known animal · Filter feeder · Global oceans</span></div></Reveal><Reveal className="dossier-card"><img src={img("photo-1545671913-b89ac1b4ac10")} alt="Octopus beneath the water" /><div><p>OCTOPUS / OCTOPODA</p><h3>Eight arms,<br />one remarkable mind.</h3><span>Flexible body · Coastal & deep water</span></div></Reveal><Reveal className="dossier-card quote"><p>“The more we learn about marine life, the more we see a planet connected by water.”</p><span>OCEAN INFOTECH / FIELD NOTE 03</span></Reveal></div></section>

    <section className="giants"><div className="giants-bg photo"><img src={img("photo-1568430462989-44163eb1752f")} alt="Whale beneath ocean surface" /></div><Reveal className="giants-copy"><p className="eyebrow">04 / Open-ocean scale</p><h2>MEET<br />THE <i>GIANTS</i></h2><p>From a blue whale&apos;s low-frequency call to the poised glide of a manta ray, the open ocean is measured in enormous lives.</p><div className="giant-brief"><span><b>30 M</b> blue whale length</span><span><b>18 M</b> sperm whale length</span><span><b>7 M</b> manta ray wingspan</span></div><a href="#marine-life">Enter the species archive <ArrowUpRight size={16} /></a></Reveal></section>

    <section id="coral-reefs" className="reef section"><Reveal className="reef-heading"><p className="eyebrow">05 / Living architecture</p><h2>CITIES BENEATH<br /><i>THE SEA</i></h2><p>Coral reefs shelter extraordinary biodiversity while covering only a small fraction of the seafloor. Their health is a powerful signal of changing seas.</p></Reveal><div className="reef-images"><Reveal className="photo"><img src={img("photo-1546026423-cc4642628d2b")} alt="Healthy coral reef with fish" /><span>HEALTHY REEF</span></Reveal><Reveal className="photo damaged"><img src={img("photo-1582967788606-a171c1080cb0")} alt="Bleached coral reef" /><span>REEFS UNDER PRESSURE</span></Reveal></div><div className="reef-notes"><Reveal><b>SYMBIOSIS</b><p>Reef-building corals live with microscopic algae that help fuel their growth.</p></Reveal><Reveal><b>BIODIVERSITY</b><p>Complex reef structure creates shelter, feeding grounds and nurseries for marine life.</p></Reveal><Reveal><b>CONSERVATION</b><p>Reducing warming and local pressures gives reefs a stronger chance to recover.</p></Reveal></div></section>

    <section id="facts" className="facts section"><Reveal><p className="eyebrow">06 / By the numbers</p><h2>OCEAN<br /><i>FACTS</i></h2></Reveal><div className="stats"><Counter value="71%" label="Earth covered by ocean" /><Counter value="~11 KM" label="Deepest known ocean depth" /><Counter value="5" label="Major ocean basins" /><Counter value="∞" label="Reasons to keep learning" /></div></section>

    <section id="deep-sea" className="abyss"><div className="abyss-specks" /><Reveal className="abyss-copy"><p className="eyebrow">07 / Beyond the light</p><h2>INTO THE<br /><i>ABYSS</i></h2><p>At depth, pressure rises, temperatures fall and sunlight disappears. Life persists through remarkable adaptations: slow metabolism, sensitive bodies and, in some species, their own light.</p></Reveal><div className="bio"><span /> <span /> <span /> <span /> <span /></div><Reveal className="abyss-record"><img src={img("photo-1551244072-5d12893278ab")} alt="Jellyfish drifting in dark water" /><div><p>DEEP-WATER OBSERVATION</p><h3>Life finds<br />a signal.</h3><span>Bioluminescence can aid camouflage, communication and hunting.</span></div></Reveal><Reveal className="bio-copy"><h3>LIGHT IN THE DARK</h3><p>Bioluminescence is a chemical production of light—used for camouflage, communication and hunting in the dark water column.</p></Reveal></section>

    <section className="conservation section"><Reveal><p className="eyebrow">08 / A shared responsibility</p><h2>THE OCEAN<br /><i>NEEDS US</i></h2><p>Ocean warming, pollution, acidification, habitat loss and overfishing affect systems that support both marine life and human communities. Understanding is the first step toward protection.</p><div className="threats"><span>Ocean warming</span><span>Plastic pollution</span><span>Habitat loss</span><span>Acidification</span></div><a className="outline-button" href="#top">Return to the surface <ChevronDown size={16} /></a></Reveal><div className="conserve-image photo"><img src={img("photo-1518467166778-b88f373ffec7")} alt="Aerial view of deep blue ocean waves" /></div></section>

    <footer><p className="logo">OCEAN<span>INFOTECH</span></p><div><a href="#explore">Explore</a><a href="#marine-life">Marine Life</a><a href="#ocean-zones">Ocean Zones</a><a href="#deep-sea">Deep Sea</a></div><p>© 2026 Ocean Infotech. Explore. Understand. Protect.</p></footer>
  </main>;
}
