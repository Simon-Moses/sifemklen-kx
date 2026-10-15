'use client'

import { useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Clock3,
  Home,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
  X,
} from 'lucide-react'

const services = [
  { title: 'Residential care', text: 'Thoughtful recurring and one-off cleaning for homes that feel beautifully cared for.', price: 'From ₦18,500', icon: Home, tone: 'mint' },
  { title: 'Office & workspace', text: 'Reliable workplace cleaning programmes built around your people and schedule.', price: 'From ₦45,000', icon: ClipboardList, tone: 'blue' },
  { title: 'Hospitality standards', text: 'Inspection-ready room, lobby and back-of-house support for hospitality teams.', price: 'Tailored quote', icon: Sparkles, tone: 'sand' },
]

const bookings = [
  { ref: 'BK-1048', client: 'Amina Yusuf', service: 'Office deep clean', date: 'Today, 10:30', status: 'In progress', tone: 'progress' },
  { ref: 'BK-1047', client: 'Maitama Residence', service: 'Recurring home care', date: 'Today, 14:00', status: 'Assigned', tone: 'assigned' },
  { ref: 'BK-1046', client: 'The Green Room', service: 'Hospitality support', date: 'Tomorrow, 09:00', status: 'Confirmed', tone: 'confirmed' },
  { ref: 'BK-1045', client: 'Northbridge Offices', service: 'Post-construction clean', date: 'Oct 18, 08:30', status: 'Pending', tone: 'pending' },
]

export default function Page() {
  const [view, setView] = useState<'overview' | 'website'>('overview')
  const [menuOpen, setMenuOpen] = useState(false)
  const [period, setPeriod] = useState('Last 30 days')
  const [notice, setNotice] = useState('')

  const action = (message: string) => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 3000)
  }

  return (
    <div className="app-shell">
      {notice && <div className="toast"><CheckCircle2 size={17} /> {notice}</div>}
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <div className="brand"><span className="brand-mark"><Sparkles size={18} /></span><span>SIFEMKLEN</span></div>
        <div className="workspace-label">Workspace <ChevronDown size={14} /></div>
        <nav className="nav-list" aria-label="Main navigation">
          <button className="nav-item active"><BarChart3 size={18} /> Overview</button>
          <button className="nav-item" onClick={() => action('Bookings workspace selected')}><CalendarDays size={18} /> Bookings <span className="nav-count">12</span></button>
          <button className="nav-item" onClick={() => action('Customers workspace selected')}><Users size={18} /> Customers</button>
          <button className="nav-item" onClick={() => action('Service catalogue selected')}><Sparkles size={18} /> Service catalogue</button>
          <button className="nav-item" onClick={() => action('Team workspace selected')}><ShieldCheck size={18} /> Team & assignments</button>
          <button className="nav-item" onClick={() => action('Payments workspace selected')}><WalletCards size={18} /> Payments</button>
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card"><div className="help-icon"><ShieldCheck size={16} /></div><strong>Protected workspace</strong><p>Role-based access is enabled for your team.</p></div>
          <button className="profile"><span className="avatar">AO</span><span><strong>Admin Olivia</strong><small>Administrator</small></span><ChevronDown size={15} /></button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
          <div className="breadcrumb"><span>Workspace</span><span>/</span><strong>{view === 'overview' ? 'Overview' : 'Public website'}</strong></div>
          <div className="top-actions"><button className="icon-button" aria-label="Search"><Search size={18} /></button><button className="icon-button notification" aria-label="Notifications"><Bell size={18} /><i /></button><button className="website-switch" onClick={() => setView(view === 'overview' ? 'website' : 'overview')}>{view === 'overview' ? 'View website' : 'Back to dashboard'} <ArrowRight size={16} /></button></div>
        </header>

        {view === 'website' ? <PublicWebsite onBook={() => action('Booking request started')} /> : <Dashboard period={period} setPeriod={setPeriod} onAction={action} />}
      </main>
    </div>
  )
}

function Dashboard({ period, setPeriod, onAction }: { period: string; setPeriod: (value: string) => void; onAction: (message: string) => void }) {
  return <div className="dashboard-page">
    <section className="page-heading"><div><p className="eyebrow">Wednesday, October 15, 2026</p><h1>Good morning, Olivia <span>✦</span></h1><p className="subheading">Here&apos;s the operational pulse across your cleaning business.</p></div><button className="primary-button" onClick={() => onAction('New booking form opened')}><span>+</span> New booking</button></section>
    <div className="metric-grid">
      <Metric label="Bookings" value="128" change="12.8%" detail="vs previous period" icon={CalendarDays} tone="teal" />
      <Metric label="Collected revenue" value="₦2.84m" change="8.4%" detail="verified payments only" icon={WalletCards} tone="green" />
      <Metric label="Active customers" value="86" change="6.2%" detail="across 4 segments" icon={Users} tone="violet" />
      <Metric label="Completion rate" value="94.6%" change="2.1%" detail="of scheduled jobs" icon={CheckCircle2} tone="orange" />
    </div>
    <div className="content-grid"><section className="panel revenue-panel"><div className="panel-head"><div><h2>Revenue overview</h2><p>Verified collected payments</p></div><select value={period} onChange={(e) => setPeriod(e.target.value)}><option>Last 30 days</option><option>Last 7 days</option><option>This month</option><option>Previous month</option></select></div><div className="chart-wrap"><div className="y-axis"><span>₦400k</span><span>₦300k</span><span>₦200k</span><span>₦100k</span><span>₦0</span></div><div className="chart"><div className="grid-line g1" /><div className="grid-line g2" /><div className="grid-line g3" /><div className="grid-line g4" /><svg viewBox="0 0 700 230" preserveAspectRatio="none" aria-label="Revenue trend chart"><defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#0f9d82" stopOpacity=".18" /><stop offset="1" stopColor="#0f9d82" stopOpacity="0" /></linearGradient></defs><path d="M0 182 C50 174, 66 126, 110 145 S170 135, 210 156 S270 116, 310 128 S365 85, 410 110 S470 62, 520 88 S580 42, 620 58 S670 28, 700 38 L700 230 L0 230Z" fill="url(#area)" /><path d="M0 182 C50 174, 66 126, 110 145 S170 135, 210 156 S270 116, 310 128 S365 85, 410 110 S470 62, 520 88 S580 42, 620 58 S670 28, 700 38" fill="none" stroke="#0f9d82" strokeWidth="3" strokeLinecap="round" /></svg><div className="x-axis"><span>Sep 16</span><span>Sep 22</span><span>Sep 28</span><span>Oct 4</span><span>Oct 10</span><span>Oct 15</span></div></div></div></section><section className="panel status-panel"><div className="panel-head"><div><h2>Booking status</h2><p>Current period</p></div><button className="more-button" onClick={() => onAction('Status report opened')}>•••</button></div><div className="donut"><div className="donut-ring"><strong>128</strong><span>Total</span></div></div><div className="legend"><Legend color="var(--teal)" label="Completed" value="76" percent="59.4%" /><Legend color="#f5b94c" label="In progress" value="18" percent="14.1%" /><Legend color="#8b9aa8" label="Pending" value="22" percent="17.2%" /><Legend color="#d9e1e4" label="Cancelled" value="12" percent="9.3%" /></div></section></div>
    <section className="panel bookings-panel"><div className="panel-head"><div><h2>Recent bookings</h2><p>Stay on top of today&apos;s operations</p></div><button className="text-button" onClick={() => onAction('All bookings opened')}>View all <ArrowRight size={15} /></button></div><div className="table-scroll"><table><thead><tr><th>Reference</th><th>Customer</th><th>Service</th><th>Schedule</th><th>Status</th><th /></tr></thead><tbody>{bookings.map((booking) => <tr key={booking.ref}><td><strong>{booking.ref}</strong></td><td>{booking.client}</td><td>{booking.service}</td><td><span className="schedule"><Clock3 size={14} /> {booking.date}</span></td><td><span className={`status ${booking.tone}`}>{booking.status}</span></td><td><button className="row-button" onClick={() => onAction(`${booking.ref} details opened`)}>View</button></td></tr>)}</tbody></table></div></section>
    <section className="quick-strip"><div><span className="quick-icon green"><CheckCircle2 size={17} /></span><span><strong>18 jobs completed</strong><small>Today&apos;s completed work</small></span></div><div><span className="quick-icon amber"><Clock3 size={17} /></span><span><strong>7 awaiting assignment</strong><small>Needs team attention</small></span></div><div><span className="quick-icon blue"><WalletCards size={17} /></span><span><strong>₦184,500 to reconcile</strong><small>Manual payment evidence</small></span></div></section>
  </div>
}

function Metric({ label, value, change, detail, icon: Icon, tone }: { label: string; value: string; change: string; detail: string; icon: typeof CalendarDays; tone: string }) { return <div className="metric-card"><div className={`metric-icon ${tone}`}><Icon size={19} /></div><p>{label}</p><h2>{value}</h2><div className="metric-foot"><span className="positive">↑ {change}</span><span>{detail}</span></div></div> }
function Legend({ color, label, value, percent }: { color: string; label: string; value: string; percent: string }) { return <div className="legend-row"><i style={{ background: color }} /><span>{label}</span><strong>{value}</strong><small>{percent}</small></div> }

function PublicWebsite({ onBook }: { onBook: () => void }) { return <div className="website-page"><section className="hero"><div className="hero-copy"><p className="eyebrow">SIFEMKLEN CLEANING SERVICE</p><h1>Clean spaces.<br /><em>Better living.</em></h1><p className="hero-text">Thoughtful cleaning and facility care for the places where life happens. From a calm home to a thriving workplace, we make every space feel its best.</p><div className="hero-actions"><button className="primary-button" onClick={onBook}>Book a service <ArrowRight size={16} /></button><button className="outline-button" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>Explore services</button></div><div className="trust-row"><ShieldCheck size={17} /><span>Reliable teams · Clear pricing · Quality assured</span></div></div><div className="hero-art"><div className="orb orb-one" /><div className="orb orb-two" /><div className="room-card"><div className="room-top"><span>Today&apos;s standard</span><CheckCircle2 size={18} /></div><strong>Every detail,<br />beautifully handled.</strong><div className="room-line" /><small>Last inspection <b>98.4%</b></small></div></div></section><section className="service-section" id="services"><div className="section-heading"><div><p className="eyebrow">OUR SERVICES</p><h2>Care that fits your world.</h2></div><p>Professional services designed around your rhythm, your standards and the spaces you are proud of.</p></div><div className="service-grid">{services.map(({ title, text, price, icon: Icon, tone }) => <article className="service-card" key={title}><div className={`service-icon ${tone}`}><Icon size={22} /></div><h3>{title}</h3><p>{text}</p><footer><strong>{price}</strong><button onClick={onBook} aria-label={`Book ${title}`}><ArrowRight size={17} /></button></footer></article>)}</div></section><footer className="site-footer"><div className="brand"><span className="brand-mark"><Sparkles size={18} /></span><span>SIFEMKLEN</span></div><div><strong>53 Agade street, Wuse 2, Abuja</strong><span>07042106777 · sifemklen@gmail.com</span></div></footer></div> }
