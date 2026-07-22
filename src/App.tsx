import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, BadgeCheck, BarChart3, BriefcaseBusiness, CalendarDays,
  Check, ChevronDown, ChevronRight, Clock3, Download, FileText, Globe2,
  Handshake, Landmark, Mail, MapPin, Menu, MessageCircle,
  Phone, Play, Send, Share2, ShieldCheck, Sparkles, UsersRound, X,
} from 'lucide-react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Lorem', to: '/about' }, { label: 'Ipsum', to: '/leadership' },
  { label: 'Dolor', to: '/membership' }, { label: 'Sit amet', to: '/events' },
  { label: 'Consectetur', to: '/news' }, { label: 'Adipiscing', to: '/services' },
  { label: 'Eiusmod', to: '/resources' }, { label: 'Tempor', to: '/contact' },
]

const stats = [
  { value: 65, suffix: '+', label: 'Lorem ipsum dolor' },
  { value: 1200, suffix: '+', label: 'Consectetur elit' },
  { value: 480, suffix: '+', label: 'Sed do eiusmod' },
  { value: 35, suffix: '+', label: 'Tempor incididunt' },
]

const services = [
  { icon: Handshake, title: 'Lorem ipsum dolor', copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do.', tone: 'blue' },
  { icon: BarChart3, title: 'Consectetur elit', copy: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.', tone: 'gold' },
  { icon: Landmark, title: 'Sed do eiusmod', copy: 'Duis aute irure dolor in reprehenderit in voluptate velit esse.', tone: 'blue' },
  { icon: Sparkles, title: 'Tempor incididunt', copy: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa.', tone: 'gold' },
]

const events = [
  { date: '18', month: 'AUG', type: 'Lorem ipsum', title: 'Lorem ipsum dolor sit amet consectetur', place: 'Lorem ipsum dolor sit amet', image: 'https://images.unsplash.com/photo-1540317580384-e5d43867caa6?auto=format&fit=crop&w=1100&q=85' },
  { date: '04', month: 'SEP', type: 'Dolor sit amet', title: 'Consectetur adipiscing elit sed do', place: 'Lorem ipsum dolor sit amet', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1100&q=85' },
  { date: '23', month: 'SEP', type: 'Eiusmod tempor', title: 'Ut enim ad minim veniam quis nostrud', place: 'Lorem ipsum dolor sit amet', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1100&q=85' },
]

const news = [
  { category: 'Lorem ipsum', date: '14 July 2026', title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1000&q=85' },
  { category: 'Dolor sit amet', date: '08 July 2026', title: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=85' },
  { category: 'Consectetur', date: '27 June 2026', title: 'Duis aute irure dolor in reprehenderit in voluptate velit.', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85' },
]

const pageCopy: Record<string, { eyebrow: string; title: string; copy: string; cards: { title: string; copy: string }[] }> = {
  about: { eyebrow: 'Lorem ipsum', title: 'Lorem ipsum dolor sit amet.', copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.', cards: [{ title: 'Lorem ipsum', copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }, { title: 'Dolor sit amet', copy: 'Ut enim ad minim veniam, quis nostrud exercitation.' }, { title: 'Consectetur elit', copy: 'Duis aute irure dolor in reprehenderit in voluptate.' }] },
  leadership: { eyebrow: 'Lorem ipsum', title: 'Consectetur adipiscing elit.', copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.', cards: [{ title: 'Lorem ipsum', copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }, { title: 'Dolor sit amet', copy: 'Ut enim ad minim veniam, quis nostrud exercitation.' }, { title: 'Consectetur elit', copy: 'Duis aute irure dolor in reprehenderit in voluptate.' }] },
  membership: { eyebrow: 'Lorem ipsum', title: 'Sed do eiusmod tempor.', copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.', cards: [{ title: 'Lorem ipsum', copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }, { title: 'Dolor sit amet', copy: 'Ut enim ad minim veniam, quis nostrud exercitation.' }, { title: 'Consectetur elit', copy: 'Duis aute irure dolor in reprehenderit in voluptate.' }] },
  events: { eyebrow: 'Lorem ipsum', title: 'Ut enim ad minim veniam.', copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.', cards: [{ title: 'Lorem ipsum', copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }, { title: 'Dolor sit amet', copy: 'Ut enim ad minim veniam, quis nostrud exercitation.' }, { title: 'Consectetur elit', copy: 'Duis aute irure dolor in reprehenderit in voluptate.' }] },
  news: { eyebrow: 'Lorem ipsum', title: 'Quis nostrud exercitation.', copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.', cards: [{ title: 'Lorem ipsum', copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }, { title: 'Dolor sit amet', copy: 'Ut enim ad minim veniam, quis nostrud exercitation.' }, { title: 'Consectetur elit', copy: 'Duis aute irure dolor in reprehenderit in voluptate.' }] },
  services: { eyebrow: 'Lorem ipsum', title: 'Ullamco laboris nisi ut.', copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.', cards: [{ title: 'Lorem ipsum', copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }, { title: 'Dolor sit amet', copy: 'Ut enim ad minim veniam, quis nostrud exercitation.' }, { title: 'Consectetur elit', copy: 'Duis aute irure dolor in reprehenderit in voluptate.' }] },
  resources: { eyebrow: 'Lorem ipsum', title: 'Aliquip ex ea commodo.', copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.', cards: [{ title: 'Lorem ipsum', copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }, { title: 'Dolor sit amet', copy: 'Ut enim ad minim veniam, quis nostrud exercitation.' }, { title: 'Consectetur elit', copy: 'Duis aute irure dolor in reprehenderit in voluptate.' }] },
  contact: { eyebrow: 'Lorem ipsum', title: 'Duis aute irure dolor.', copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.', cards: [{ title: 'Lorem ipsum', copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }, { title: 'Dolor sit amet', copy: 'Ut enim ad minim veniam, quis nostrud exercitation.' }, { title: 'Consectetur elit', copy: 'Duis aute irure dolor in reprehenderit in voluptate.' }] },
}

function Logo({ light = false }: { light?: boolean }) {
  return <Link className={`logo ${light ? 'logo-light' : ''}`} to="/" aria-label="SBFCI home"><span className="logo-mark"><i /><i /><i /></span><span><b>SBFCI</b><em>Lorem ipsum dolor<br />sit amet consectetur</em></span></Link>
}

function Container({ children, className = '' }: { children: ReactNode; className?: string }) { return <div className={`container ${className}`}>{children}</div> }

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: .55, delay }}>{children}</motion.div>
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const node = useRef<HTMLSpanElement>(null)
  const visible = useInView(node, { once: true })
  return <span ref={node}>{visible ? <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .3 }}>{value.toLocaleString()}{suffix}</motion.span> : '0'}</span>
}

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  return <>
    <div className="topbar"><Container><span>Lorem ipsum dolor sit amet consectetur</span><span><a href="tel:+910000000000"><Phone size={13} /> +91 00 0000 0000</a><a href="mailto:hello@example.com"><Mail size={13} /> hello@example.com</a></span></Container></div>
    <header className={`header ${isHome ? 'header-home' : ''}`}>
      <Container className="header-inner"><Logo light={isHome} /><nav className="desktop-nav" aria-label="Main navigation">{navItems.map(item => <NavLink key={item.to} to={item.to}>{item.label}</NavLink>)}</nav><div className="nav-actions"><Link to="/membership" className="btn btn-gold">Lorem ipsum <ArrowRight size={15} /></Link><button className="menu-button" onClick={() => setOpen(true)} aria-label="Open navigation"><Menu size={22} /></button></div></Container>
    </header>
    <AnimatePresence>{open && <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><div className="mobile-menu-panel"><div className="mobile-menu-head"><Logo /><button onClick={() => setOpen(false)} aria-label="Close navigation"><X /></button></div><nav>{navItems.map(item => <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)}>{item.label}<ArrowRight size={17} /></NavLink>)}</nav><Link to="/membership" className="btn btn-primary" onClick={() => setOpen(false)}>Lorem ipsum <ArrowRight size={16} /></Link></div></motion.div>}</AnimatePresence>
  </>
}

function Footer() {
  return <footer className="footer"><Container><div className="footer-main"><div><Logo light /><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p><div className="socials"><a href="#" aria-label="Lorem ipsum"><Share2 size={16} /></a><a href="#" aria-label="Lorem ipsum"><Mail size={16} /></a><a href="#" aria-label="Lorem ipsum"><MessageCircle size={16} /></a><a href="#" aria-label="Lorem ipsum"><Play size={16} /></a></div></div><div><h4>Lorem ipsum</h4><Link to="/about">Lorem ipsum</Link><Link to="/leadership">Dolor sit amet</Link><Link to="/services">Consectetur elit</Link><Link to="/gallery">Sed do eiusmod</Link></div><div><h4>Dolor sit amet</h4><Link to="/membership">Lorem ipsum</Link><Link to="/events">Tempor incididunt</Link><Link to="/resources">Ut enim ad minim</Link><Link to="/news">Quis nostrud</Link></div><div><h4>Lorem ipsum</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><form className="newsletter" onSubmit={e => e.preventDefault()}><input aria-label="Email address" type="email" placeholder="lorem@example.com" /><button aria-label="Subscribe"><Send size={16} /></button></form></div></div><div className="footer-bottom"><span>© 2026 Lorem ipsum dolor sit amet.</span><span><Link to="/privacy">Lorem ipsum</Link><Link to="/terms">Dolor sit amet</Link></span></div></Container></footer>
}

function Hero() {
  return <section className="hero"><div className="hero-image" /><div className="hero-overlay" /><Header /><Container className="hero-content"><motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .15 }}><div className="eyebrow eyebrow-light"><span />Lorem ipsum dolor sit amet</div><h1>Lorem ipsum dolor.<br /><i>Sit amet consectetur.</i><br />Adipiscing elit.</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><div className="hero-actions"><Link to="/membership" className="btn btn-gold">Lorem ipsum <ArrowDownRight size={17} /></Link><Link to="/contact" className="btn btn-glass">Dolor sit amet <ArrowRight size={17} /></Link></div></motion.div><motion.div className="hero-insight" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7, delay: .4 }}><div className="mini-label">LOREM IPSUM DOLOR</div><h3>Lorem ipsum dolor sit amet consectetur</h3><p><CalendarDays size={15} /> 18 August 2026 &nbsp;·&nbsp; Lorem ipsum</p><Link to="/events">Lorem ipsum <ArrowRight size={14} /></Link></motion.div></Container><div className="hero-bottom"><Container><span>LOREM IPSUM</span><span className="scroll-line" /></Container></div></section>
}

function Home() {
  return <><Hero /><main>
    <section className="stats"><Container><div className="stats-grid">{stats.map(stat => <Reveal key={stat.label}><div className="stat"><strong><Counter value={stat.value} suffix={stat.suffix} /></strong><span>{stat.label}</span></div></Reveal>)}</div></Container></section>
    <section className="section"><Container><div className="split-heading"><Reveal><div className="eyebrow">Lorem ipsum</div><h2>Lorem ipsum dolor<br />sit amet <i>consectetur.</i></h2></Reveal><Reveal delay={.12}><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><Link className="text-link" to="/about">Lorem ipsum <ArrowRight size={16} /></Link></Reveal></div><div className="service-grid">{services.map((service, index) => <Reveal key={service.title} delay={index * .08}><Link to="/services" className={`service-card ${service.tone}`}><service.icon strokeWidth={1.5} /><div><h3>{service.title}</h3><p>{service.copy}</p></div><span className="round-arrow"><ArrowUpRight /></span></Link></Reveal>)}</div></Container></section>
    <section className="president-section"><Container><div className="president-grid"><Reveal className="president-image-wrap"><div className="president-image" /><div className="image-caption"><span>LOREM IPSUM DOLOR</span><span>01 — 03</span></div></Reveal><Reveal delay={.15} className="president-copy"><div className="eyebrow">Lorem ipsum</div><blockquote>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.”</blockquote><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><div className="signature">Lorem Ipsum</div><span className="designation">Lorem ipsum dolor sit amet</span><Link className="text-link" to="/leadership">Lorem ipsum <ArrowRight size={16} /></Link></Reveal></div></Container></section>
    <section className="section section-soft"><Container><div className="section-top"><Reveal><div className="eyebrow">Lorem ipsum</div><h2>Lorem ipsum<br /><i>dolor sit amet.</i></h2></Reveal><Reveal delay={.12}><Link to="/events" className="btn btn-outline">Lorem ipsum <ArrowRight size={16} /></Link></Reveal></div><div className="event-grid">{events.map((event, index) => <Reveal key={event.title} delay={index * .1}><article className="event-card"><div className="event-image" style={{ backgroundImage: `url(${event.image})` }}><span className="event-type">{event.type}</span><div className="event-date"><b>{event.date}</b><span>{event.month}</span></div></div><div className="event-card-body"><h3>{event.title}</h3><p><MapPin size={15} /> {event.place}</p><Link to="/events" aria-label={`View ${event.title}`}><ArrowRight size={19} /></Link></div></article></Reveal>)}</div></Container></section>
    <section className="section"><Container><div className="section-top"><Reveal><div className="eyebrow">Lorem ipsum</div><h2>Dolor sit <i>amet.</i></h2></Reveal><Reveal delay={.12}><Link to="/news" className="text-link">Lorem ipsum <ArrowRight size={16} /></Link></Reveal></div><div className="news-grid">{news.map((item, index) => <Reveal key={item.title} delay={index * .1}><article className="news-card"><div className="news-image" style={{ backgroundImage: `url(${item.image})` }} /><div className="news-card-body"><div className="news-meta"><span>{item.category}</span><time>{item.date}</time></div><h3>{item.title}</h3><Link to="/news" className="text-link">Lorem ipsum <ArrowRight size={15} /></Link></div></article></Reveal>)}</div></Container></section>
    <section className="partners"><Container><div className="partners-intro"><div className="eyebrow">Lorem ipsum</div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></div><div className="partner-logos"><span>LOREM<br /><b>IPSUM</b></span><span>DOLOR <b>SIT</b><br />AMET</span><span><b>LOREM</b><br />IPSUM</span><span>CONSECTETUR<br /><b>ELIT</b></span><span><b>SED</b> DO<br />EIUSMOD</span></div></Container></section>
    <section className="quote-section"><Container><Reveal><div className="quote-mark">“</div><blockquote>Lorem ipsum dolor sit amet—<i>consectetur adipiscing elit.</i></blockquote><div className="testimonial-author"><div className="avatar" /> <span><b>Lorem Ipsum</b><small>Dolor sit amet consectetur</small></span></div></Reveal></Container></section>
    <section className="membership-cta"><Container><div><div className="eyebrow eyebrow-light">Lorem ipsum</div><h2>Lorem ipsum dolor<br />sit <i>amet.</i></h2></div><Link className="btn btn-gold" to="/membership">Lorem ipsum <ArrowRight size={16} /></Link></Container></section>
  </main><Footer /></>
}

function InteriorPage({ type }: { type: string }) {
  const data = pageCopy[type] ?? pageCopy.about
  const iconSet = [BriefcaseBusiness, ShieldCheck, Globe2]
  return <><Header /><main className="interior"><section className="interior-hero"><Container><div className="breadcrumb"><Link to="/">Lorem</Link><ChevronRight size={13} /><span>Ipsum</span></div><Reveal><div className="eyebrow">{data.eyebrow}</div><h1>{data.title}</h1><p>{data.copy}</p></Reveal></Container><div className="hero-orb orb-one" /><div className="hero-orb orb-two" /></section><section className="section"><Container><div className="page-card-grid">{data.cards.map((card, index) => { const Icon = iconSet[index]; return <Reveal key={card.title} delay={index * .1}><article className="page-card"><Icon strokeWidth={1.4} /><h2>{card.title}</h2><p>{card.copy}</p><a href="#details">Lorem ipsum <ArrowRight size={15} /></a></article></Reveal> })}</div></Container></section>{type === 'membership' && <MembershipForm />}{type === 'contact' && <ContactForm />}<section className="image-band"><div /><Container><Reveal><div className="image-band-card"><span>LOREM IPSUM</span><h2>Lorem ipsum dolor sit amet.</h2><Link to="/contact" className="btn btn-primary">Lorem ipsum <ArrowRight size={16} /></Link></div></Reveal></Container></section></main><Footer /></>
}

function MembershipForm() {
  const [sent, setSent] = useState(false)
  const submit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setSent(true) }
  return <section className="form-section" id="details"><Container><Reveal><div className="form-panel"><div><div className="eyebrow">Lorem ipsum</div><h2>Lorem ipsum dolor sit amet?</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p><div className="member-benefits"><span><Check size={16} /> Lorem ipsum dolor</span><span><Check size={16} /> Consectetur elit</span><span><Check size={16} /> Sed do eiusmod</span></div></div><form onSubmit={submit}>{sent ? <div className="form-success"><BadgeCheck size={30} /><strong>Lorem ipsum dolor sit amet.</strong><p>Consectetur adipiscing elit, sed do eiusmod.</p></div> : <><label>Lorem ipsum<input required placeholder="Lorem ipsum" /></label><label>Dolor sit amet<input required type="email" placeholder="lorem@example.com" /></label><label>Consectetur elit<input required placeholder="Lorem ipsum" /></label><button className="btn btn-primary" type="submit">Lorem ipsum dolor <ArrowRight size={16} /></button></>}</form></div></Reveal></Container></section>
}

function ContactForm() {
  const [sent, setSent] = useState(false)
  return <section className="form-section" id="details"><Container><Reveal><div className="form-panel"><div><div className="eyebrow">Lorem ipsum</div><h2>Lorem ipsum dolor sit amet.</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p><div className="contact-lines"><span><Phone size={16} /> +91 00 0000 0000</span><span><Mail size={16} /> hello@example.com</span><span><MessageCircle size={16} /> Lorem ipsum dolor</span></div></div><form onSubmit={e => { e.preventDefault(); setSent(true) }}>{sent ? <div className="form-success"><BadgeCheck size={30} /><strong>Lorem ipsum dolor sit amet.</strong><p>Consectetur adipiscing elit, sed do eiusmod.</p></div> : <><label>Lorem ipsum<input required placeholder="Lorem ipsum" /></label><label>Dolor sit amet<input required type="email" placeholder="lorem@example.com" /></label><label>Consectetur elit<textarea required placeholder="Lorem ipsum dolor sit amet" rows={3} /></label><button className="btn btn-primary" type="submit">Lorem ipsum <Send size={16} /></button></>}</form></div></Reveal></Container></section>
}

function Gallery() { return <><Header /><main className="interior"><section className="interior-hero gallery-hero"><Container><div className="breadcrumb"><Link to="/">Lorem</Link><ChevronRight size={13} /><span>Ipsum</span></div><Reveal><div className="eyebrow">Lorem ipsum</div><h1>Lorem ipsum dolor sit amet consectetur.</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p></Reveal></Container></section><section className="section"><Container><div className="masonry">{['photo-1511578314322-379afb476865','photo-1540317580384-e5d43867caa6','photo-1521737711867-e3b97375f902','photo-1556761175-b413da4baf72','photo-1556761175-4b46a572b786','photo-1497366754035-f200968a6e72'].map((id, i) => <Reveal key={id} delay={i * .06}><div className={`gallery-tile tile-${i + 1}`} style={{ backgroundImage: `url(https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85)` }}><span>{['Lorem ipsum', 'Dolor sit amet', 'Consectetur elit', 'Sed do eiusmod', 'Tempor incididunt', 'Ut labore'][i]}</span></div></Reveal>)}</div></Container></section></main><Footer /></> }

function Legal({ title }: { title: string }) { return <><Header /><main className="legal"><Container><div className="breadcrumb"><Link to="/">Lorem</Link><ChevronRight size={13} /><span>{title}</span></div><h1>{title}</h1><p className="legal-updated">Lorem ipsum dolor sit amet</p><h2>Lorem ipsum dolor</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><h2>Consectetur adipiscing</h2><p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p></Container></main><Footer /></> }

function NotFound() { return <><Header /><main className="not-found"><Container><span>404</span><h1>Lorem ipsum dolor sit amet.</h1><p>Consectetur adipiscing elit, sed do eiusmod.</p><Link to="/" className="btn btn-primary">Lorem ipsum <ArrowRight size={16} /></Link></Container></main><Footer /></> }

export default function App() { return <Routes><Route path="/" element={<Home />} /><Route path="/gallery" element={<Gallery />} /><Route path="/privacy" element={<Legal title="Lorem ipsum" />} /><Route path="/terms" element={<Legal title="Dolor sit amet" />} />{Object.keys(pageCopy).map(type => <Route key={type} path={`/${type}`} element={<InteriorPage type={type} />} />)}<Route path="*" element={<NotFound />} /></Routes> }
