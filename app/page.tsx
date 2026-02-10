'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import {
  Wrench,
  Zap,
  Shield,
  Clock,
  ArrowRight,
  Check,
  Star,
  Menu,
  X,
  ChevronDown,
  Hammer,
  Plug,
  Pipette,
  Paintbrush,
  Camera,
  CalendarCheck,
  UserCheck,
  Receipt,
  Phone,
  Leaf,
  BadgeDollarSign,
  CirclePlus,
  HelpCircle,
  ChevronUp,
  MapPin,
  Sparkles,
  Users,
} from 'lucide-react';

// ─── LEAD CAPTURE MODAL ─────────────────────────────────────────────────────

function LeadModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zip, setZip] = useState('');
  const [firstFix, setFirstFix] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, zip, firstFix }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setName('');
        setEmail('');
        setPhone('');
        setZip('');
        setFirstFix('');
        setSubmitted(false);
        setError('');
      }, 300);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center px-6 overflow-y-auto py-8"
          >
            <div className="relative w-full max-w-md bg-[#151515] border border-[#2a2a2a] rounded-2xl p-8 sm:p-10 my-auto">
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 text-[#888880] hover:text-[#f5f0e8] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {!submitted ? (
                <>
                  {/* Header */}
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#e8a838]/10 border border-[#e8a838]/20 rounded-full mb-4">
                      <Sparkles className="h-3 w-3 text-[#e8a838]" />
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[#e8a838] font-semibold">
                        First visit free
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#f5f0e8] tracking-tight mb-2">
                      Let&apos;s get you<br />
                      <span className="text-[#e8a838]">set up.</span>
                    </h3>
                    <p className="text-sm text-[#888880] font-light leading-relaxed">
                      Tell us a bit about yourself and what needs fixing.
                      We&apos;ll reach out within 24 hours to schedule your free first visit.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your name *"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl text-sm text-[#f5f0e8] placeholder-[#555] focus:outline-none focus:border-[#e8a838]/40 transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Email address *"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl text-sm text-[#f5f0e8] placeholder-[#555] focus:outline-none focus:border-[#e8a838]/40 transition-colors"
                    />
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl text-sm text-[#f5f0e8] placeholder-[#555] focus:outline-none focus:border-[#e8a838]/40 transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Zip code"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl text-sm text-[#f5f0e8] placeholder-[#555] focus:outline-none focus:border-[#e8a838]/40 transition-colors"
                    />
                    <textarea
                      placeholder="What needs fixing? (leaky faucet, mount a TV, squeaky door...)"
                      value={firstFix}
                      onChange={(e) => setFirstFix(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl text-sm text-[#f5f0e8] placeholder-[#555] focus:outline-none focus:border-[#e8a838]/40 transition-colors resize-none"
                    />

                    {error && (
                      <p className="text-xs text-red-400 px-1">{error}</p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 bg-[#e8a838] text-[#0a0a0a] text-sm uppercase tracking-widest font-semibold rounded-xl hover:bg-[#f5bc5c] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-[#0a0a0a]/30 border-t-[#0a0a0a] rounded-full animate-spin" />
                      ) : (
                        <>
                          Get My Free First Visit
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </motion.button>
                  </form>

                  <div className="mt-5 flex items-center justify-center gap-4 text-[10px] text-[#555]">
                    <span>No credit card required</span>
                    <span>•</span>
                    <span>We&apos;ll call within 24hrs</span>
                  </div>
                </>
              ) : (
                /* Success state */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-16 h-16 bg-[#e8a838]/10 border border-[#e8a838]/20 rounded-full flex items-center justify-center mx-auto mb-5"
                  >
                    <Check className="h-7 w-7 text-[#e8a838]" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[#f5f0e8] mb-2">
                    You&apos;re in, {name.split(' ')[0]}!
                  </h3>
                  <p className="text-sm text-[#888880] font-light leading-relaxed mb-4">
                    We&apos;ll reach out within 24 hours to match you with
                    your handyman and schedule your free first visit.
                  </p>
                  <div className="space-y-2 text-left bg-[#0a0a0a] rounded-xl p-4 mb-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#e8a838] font-semibold mb-3">What happens next</p>
                    {[
                      'We call you to learn about your home',
                      'We match you with a dedicated handyman',
                      'You schedule your free first visit',
                      'If you love it, membership is $99/mo after that',
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-[#e8a838]/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-[9px] text-[#e8a838] font-bold">{i + 1}</span>
                        </div>
                        <span className="text-xs text-[#c8c8c0]">{step}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-[#e8a838]">
                    Check your email for confirmation.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── NAV ────────────────────────────────────────────────────────────────────

function Nav({ onJoin }: { onJoin: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#2a2a2a]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#e8a838] rounded-lg flex items-center justify-center">
            <Wrench className="h-4 w-4 text-[#0a0a0a]" />
          </div>
          <span className="text-sm font-semibold tracking-wide uppercase text-[#f5f0e8]">
            Handyman Club
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#how" className="text-xs uppercase tracking-widest text-[#888880] hover:text-[#f5f0e8] transition-colors">
            How It Works
          </a>
          <a href="#perks" className="text-xs uppercase tracking-widest text-[#888880] hover:text-[#f5f0e8] transition-colors">
            What&apos;s Included
          </a>
          <a href="#pricing" className="text-xs uppercase tracking-widest text-[#888880] hover:text-[#f5f0e8] transition-colors">
            Pricing
          </a>
          <a href="#faq" className="text-xs uppercase tracking-widest text-[#888880] hover:text-[#f5f0e8] transition-colors">
            FAQ
          </a>
          <button
            onClick={onJoin}
            className="px-5 py-2 bg-[#e8a838] text-[#0a0a0a] text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-[#f5bc5c] transition-colors"
          >
            Get Started Free
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#f5f0e8]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#2a2a2a]"
          >
            <div className="px-6 pb-6 flex flex-col gap-4">
              <a href="#how" onClick={() => setMenuOpen(false)} className="text-sm text-[#888880] hover:text-[#f5f0e8] transition-colors">How It Works</a>
              <a href="#perks" onClick={() => setMenuOpen(false)} className="text-sm text-[#888880] hover:text-[#f5f0e8] transition-colors">What&apos;s Included</a>
              <a href="#pricing" onClick={() => setMenuOpen(false)} className="text-sm text-[#888880] hover:text-[#f5f0e8] transition-colors">Pricing</a>
              <a href="#faq" onClick={() => setMenuOpen(false)} className="text-sm text-[#888880] hover:text-[#f5f0e8] transition-colors">FAQ</a>
              <button
                onClick={() => { setMenuOpen(false); onJoin(); }}
                className="mt-2 px-5 py-2.5 bg-[#e8a838] text-[#0a0a0a] text-xs uppercase tracking-widest font-semibold rounded-full w-fit"
              >
                Get Started Free
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── HERO ───────────────────────────────────────────────────────────────────

function Hero({ onJoin }: { onJoin: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(232,168,56,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(232,168,56,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating accent shapes */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[15%] right-[10%] w-64 h-64 rounded-full bg-[#e8a838]/5 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-[20%] left-[5%] w-96 h-96 rounded-full bg-[#e8a838]/3 blur-3xl"
      />

      <motion.div style={{ y, opacity, scale }} className="relative z-10 text-center px-6 max-w-5xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#e8a838]/10 border border-[#e8a838]/20 rounded-full mb-8"
        >
          <Sparkles className="h-3 w-3 text-[#e8a838]" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#e8a838]">
            Your first visit is free
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.9] mb-6"
        >
          <span className="text-[#f5f0e8]">Your handyman.</span>
          <br />
          <span className="text-[#e8a838]">On speed dial.</span>
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-base sm:text-lg text-[#888880] font-light max-w-lg mx-auto mb-10 leading-relaxed"
        >
          One visit a month. One flat price. Your own dedicated handyman
          who knows your home — no quotes, no call-out fees, no surprises.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.button
            onClick={onJoin}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="group px-8 py-3.5 bg-[#e8a838] text-[#0a0a0a] text-sm uppercase tracking-widest font-semibold rounded-full flex items-center gap-3 hover:bg-[#f5bc5c] transition-colors"
          >
            Get Your Free First Visit
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <a
            href="#how"
            className="text-sm text-[#888880] hover:text-[#f5f0e8] transition-colors flex items-center gap-2"
          >
            See how it works
            <ChevronDown className="h-4 w-4" />
          </a>
        </motion.div>

        {/* Stats ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-16 flex items-center justify-center gap-8 sm:gap-16"
        >
          {[
            { num: 'Free', label: 'First visit, on us' },
            { num: '24hr', label: 'Scheduling window' },
            { num: '$0', label: 'Call-out fee' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-lg sm:text-2xl font-bold text-[#f5f0e8]">{stat.num}</p>
              <p className="text-[10px] sm:text-xs text-[#888880] uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 border border-[#2a2a2a] rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 bg-[#e8a838] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── HOW IT WORKS ───────────────────────────────────────────────────────────

const steps = [
  {
    num: '01',
    title: 'Join',
    desc: '$99/month. That\'s it. No contracts, cancel anytime. You\'re in.',
    icon: Shield,
  },
  {
    num: '02',
    title: 'Request',
    desc: 'Snap a photo or describe the issue. We diagnose it before we arrive.',
    icon: Camera,
  },
  {
    num: '03',
    title: 'We show up',
    desc: 'Your dedicated handyman arrives within 24 hours. Up to 2 hours, on us.',
    icon: Clock,
  },
];

function HowItWorks() {
  return (
    <section id="how" className="py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#e8a838] mb-4">The process</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#f5f0e8] leading-[1.1]">
            Three steps.<br />
            <span className="text-[#888880]">Zero headaches.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-[#2a2a2a] to-transparent" />
              )}

              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-2xl bg-[#151515] border border-[#2a2a2a] flex items-center justify-center group-hover:border-[#e8a838]/30 group-hover:bg-[#e8a838]/5 transition-all duration-500">
                  <step.icon className="h-6 w-6 text-[#e8a838]" />
                </div>
                <span className="text-5xl font-bold text-[#1e1e1e] group-hover:text-[#2a2a2a] transition-colors">
                  {step.num}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-[#f5f0e8] mb-2">{step.title}</h3>
              <p className="text-sm text-[#888880] leading-relaxed font-light">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MARQUEE ────────────────────────────────────────────────────────────────

function Marquee() {
  const items = [
    'Plumbing', 'Electrical', 'Painting', 'Assembly', 'Drywall',
    'Mounting', 'Appliances', 'Carpentry', 'Fixtures', 'Weatherproofing',
  ];

  return (
    <div className="py-6 border-y border-[#2a2a2a] overflow-hidden">
      <motion.div
        animate={{ x: [0, -1920] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="flex gap-8 whitespace-nowrap"
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="text-sm uppercase tracking-[0.2em] text-[#2a2a2a] font-semibold flex items-center gap-8">
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8a838]/30" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── PERKS ──────────────────────────────────────────────────────────────────

const perks = [
  {
    icon: CalendarCheck,
    title: '24-Hour Scheduling',
    desc: 'Request today, we\'re there tomorrow. No more two-week waits.',
  },
  {
    icon: UserCheck,
    title: 'Same Handyman Every Time',
    desc: 'They learn your home — your doors, your pipes, your quirks. Faster every visit.',
  },
  {
    icon: Receipt,
    title: 'No Call-Out Fee',
    desc: 'Retail handymen charge $50–75 just to show up. Yours is always $0.',
  },
  {
    icon: Camera,
    title: 'Photo Diagnosis',
    desc: 'Snap a pic, we tell you what\'s needed before the visit. No wasted trips.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Parts Up to $30 Included',
    desc: 'Screws, caulk, basic fixtures, filters — the small stuff is on us.',
  },
  {
    icon: Leaf,
    title: 'Annual Home Checkup',
    desc: 'Once a year, a full walk-through: gutters, caulk, filters, smoke detectors.',
  },
  {
    icon: Phone,
    title: 'Contractor Rolodex',
    desc: 'Need something bigger? We connect you with vetted pros at preferred rates.',
  },
  {
    icon: CirclePlus,
    title: 'Extra Visits at $79',
    desc: 'Need more? Members get extra visits at $79 — vs $130+ retail.',
  },
];

function Perks() {
  return (
    <section id="perks" className="py-32 px-6 md:px-12 bg-[#0e0e0e]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#e8a838] mb-4">What&apos;s included</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#f5f0e8] leading-[1.1]">
            Way more than<br />
            <span className="text-[#888880]">just a visit.</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-sm text-[#888880] font-light max-w-md mx-auto mb-16"
        >
          Every membership includes 1 visit per month (up to 2 hours) plus all these perks. No tiers, no upsells.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {perks.map((perk, i) => (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="group p-6 bg-[#151515] border border-[#2a2a2a] rounded-2xl hover:border-[#e8a838]/20 transition-all duration-500 cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-[#e8a838]/10 flex items-center justify-center mb-4 group-hover:bg-[#e8a838]/15 transition-colors">
                <perk.icon className="h-4.5 w-4.5 text-[#e8a838]" />
              </div>
              <h3 className="text-sm font-semibold text-[#f5f0e8] mb-1.5">{perk.title}</h3>
              <p className="text-xs text-[#888880] leading-relaxed font-light">{perk.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── YOUR HANDYMAN ──────────────────────────────────────────────────────────

const handymanTraits = [
  {
    icon: UserCheck,
    title: 'Same person, every time',
    desc: 'No random strangers. Your handyman learns your home — your finicky garage door, your old pipes, your preferred paint finish.',
  },
  {
    icon: Shield,
    title: 'Vetted & background-checked',
    desc: 'Licensed, insured, 5+ years of experience. We do the vetting so you never have to.',
  },
  {
    icon: Zap,
    title: 'Gets faster every visit',
    desc: 'They keep notes on your home. Second visit? They already know the layout, the quirks, and what to bring.',
  },
  {
    icon: Phone,
    title: 'Text them directly',
    desc: 'No call centers. No repeating yourself to a new person. One number, one person, done.',
  },
];

function YourHandyman() {
  return (
    <section className="py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left side — text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#e8a838] mb-4">The relationship</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#f5f0e8] leading-[1.1] mb-6">
              Your handyman.<br />
              <span className="text-[#888880]">Not a stranger.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#888880] font-light leading-relaxed mb-4 max-w-md">
              The worst part of home repairs isn&apos;t the fix — it&apos;s explaining your home to
              a new person every single time. We fix that.
            </p>
            <p className="text-sm sm:text-base text-[#888880] font-light leading-relaxed max-w-md">
              Every member gets a dedicated handyman who becomes <em className="text-[#c8c8c0] not-italic font-medium">your</em> handyman.
              They know your home, your preferences, and what to bring before they walk in the door.
            </p>
          </motion.div>

          {/* Right side — trait cards */}
          <div className="space-y-4">
            {handymanTraits.map((trait, i) => (
              <motion.div
                key={trait.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex gap-5 p-5 rounded-xl border border-[#2a2a2a] hover:border-[#e8a838]/20 bg-[#0a0a0a] hover:bg-[#111] transition-all duration-500"
              >
                <div className="w-11 h-11 rounded-lg bg-[#e8a838]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#e8a838]/15 transition-colors">
                  <trait.icon className="h-5 w-5 text-[#e8a838]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#f5f0e8] mb-1">{trait.title}</h3>
                  <p className="text-xs text-[#888880] leading-relaxed font-light">{trait.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES COVERED ───────────────────────────────────────────────────────

const servicesList = [
  { icon: Hammer, name: 'General Repairs', examples: 'Doors, drywall, shelving, furniture assembly, locks, hinges' },
  { icon: Plug, name: 'Electrical', examples: 'Outlets, switches, light fixtures, ceiling fans, doorbells' },
  { icon: Pipette, name: 'Plumbing', examples: 'Leaky faucets, running toilets, garbage disposals, caulking' },
  { icon: Paintbrush, name: 'Painting', examples: 'Touch-ups, accent walls, trim, cabinets — we bring supplies' },
  { icon: Wrench, name: 'Mounting & Install', examples: 'TVs, shelves, curtain rods, mirrors, towel bars, art' },
  { icon: Leaf, name: 'Seasonal', examples: 'Gutter checks, weatherstripping, filter replacement, caulking' },
];

function ServicesCovered() {
  return (
    <section id="services" className="py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#e8a838] mb-4">Services</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#f5f0e8] leading-[1.1]">
            If it&apos;s in your home,<br />
            <span className="text-[#888880]">it&apos;s covered.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#2a2a2a] rounded-2xl overflow-hidden">
          {servicesList.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-8 bg-[#0a0a0a] hover:bg-[#111] transition-colors"
            >
              <service.icon className="h-5 w-5 text-[#e8a838] mb-4" />
              <h3 className="text-base font-semibold text-[#f5f0e8] mb-2">{service.name}</h3>
              <p className="text-xs text-[#888880] leading-relaxed font-light">{service.examples}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRICING ────────────────────────────────────────────────────────────────

function Pricing({ onJoin }: { onJoin: () => void }) {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-32 px-6 md:px-12 bg-[#0e0e0e]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#e8a838] mb-4">Membership</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#f5f0e8] leading-[1.1]">
            One plan.<br />
            <span className="text-[#888880]">Everything included.</span>
          </h2>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <span className={`text-sm transition-colors ${!annual ? 'text-[#f5f0e8]' : 'text-[#888880]'}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative w-12 h-6 rounded-full transition-colors ${annual ? 'bg-[#e8a838]' : 'bg-[#2a2a2a]'}`}
          >
            <motion.div
              animate={{ x: annual ? 24 : 2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="absolute top-1 w-4 h-4 bg-[#f5f0e8] rounded-full"
            />
          </button>
          <span className={`text-sm transition-colors ${annual ? 'text-[#f5f0e8]' : 'text-[#888880]'}`}>
            Annual
            <span className="ml-1.5 text-[10px] text-[#e8a838] font-semibold uppercase">Save 15%</span>
          </span>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative p-10 sm:p-12 rounded-3xl bg-[#151515] border border-[#e8a838]/20 hover:border-[#e8a838]/40 transition-all duration-500"
        >
          {/* Badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#e8a838] text-[#0a0a0a] text-[9px] uppercase tracking-[0.2em] font-bold rounded-full whitespace-nowrap flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" />
            First visit free — no commitment
          </div>

          <div className="text-center mb-10">
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={annual ? 'annual' : 'monthly'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-6xl sm:text-7xl font-bold text-[#f5f0e8]"
                >
                  ${annual ? 84 : 99}
                </motion.span>
              </AnimatePresence>
              <span className="text-lg text-[#888880]">/mo</span>
            </div>
            {annual && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-[#888880]"
              >
                Billed annually at $1,008/yr <span className="text-[#e8a838]">(save $180)</span>
              </motion.p>
            )}
            {!annual && (
              <p className="text-xs text-[#888880]">Billed monthly. Cancel anytime.</p>
            )}
          </div>

          {/* Feature grid */}
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 mb-10">
            {[
              '1 visit/month (up to 2 hrs)',
              '24-hour scheduling',
              'Same handyman every time',
              'No call-out fee',
              'Photo-based requests',
              'Parts up to $30 included',
              'Annual home checkup',
              'Contractor referral network',
              'Extra visits at $79 each',
              'Cancel anytime',
            ].map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.04 }}
                className="flex items-center gap-3"
              >
                <Check className="h-4 w-4 text-[#e8a838] flex-shrink-0" />
                <span className="text-sm text-[#c8c8c0]">{f}</span>
              </motion.div>
            ))}
          </div>

          <motion.button
            onClick={onJoin}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-[#e8a838] text-[#0a0a0a] text-sm uppercase tracking-widest font-semibold rounded-full hover:bg-[#f5bc5c] transition-colors"
          >
            Get Your Free First Visit
          </motion.button>

          <p className="text-center text-[10px] text-[#888880] mt-4">
            No credit card required. We&apos;ll call you within 24 hours to schedule.
          </p>
        </motion.div>

        {/* Comparison nudge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-[#888880] mb-3">vs. calling a handyman the old way</p>
          <div className="flex items-center justify-center gap-8 sm:gap-12">
            {[
              { label: 'Call-out fee', old: '$50–75', ours: '$0' },
              { label: 'Hourly rate', old: '$80–150', ours: '$49.50/hr*' },
              { label: 'Wait time', old: '1–3 weeks', ours: '24 hours' },
            ].map((c) => (
              <div key={c.label} className="text-center">
                <p className="text-[10px] text-[#888880] uppercase tracking-wider mb-1">{c.label}</p>
                <p className="text-xs text-[#555] line-through mb-0.5">{c.old}</p>
                <p className="text-sm font-semibold text-[#e8a838]">{c.ours}</p>
              </div>
            ))}
          </div>
          <p className="text-[9px] text-[#555] mt-3">*Based on full 2-hour visit usage</p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ───────────────────────────────────────────────────────────

const testimonials = [
  {
    text: "I used to dread finding a handyman. Now I snap a photo, and Mike shows up the next day. It's almost unfair how easy it is.",
    name: 'Sarah K.',
    title: 'Member for 8 months',
    rating: 5,
  },
  {
    text: "Fixed my leaky faucet, mounted the TV, and patched a drywall hole — all in one visit. That alone would've cost me $300+.",
    name: 'Marcus T.',
    title: 'Member for 1 year',
    rating: 5,
  },
  {
    text: "Having the same handyman every time is a game-changer. He knows my home better than I do at this point.",
    name: 'Linda P.',
    title: 'Member for 6 months',
    rating: 5,
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className="py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#e8a838] mb-4">Members</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#f5f0e8] leading-[1.1]">
            Don&apos;t take our<br />
            <span className="text-[#888880]">word for it.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 bg-[#151515] border border-[#2a2a2a] rounded-2xl hover:border-[#e8a838]/15 transition-all duration-500"
            >
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-[#e8a838] text-[#e8a838]" />
                ))}
              </div>
              <p className="text-sm text-[#f5f0e8] leading-relaxed mb-6 font-light">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold text-[#f5f0e8]">{t.name}</p>
                <p className="text-xs text-[#888880]">{t.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'What counts as a "visit"?',
    a: 'One visit is up to 2 hours of hands-on work. Your handyman can tackle multiple small jobs in a single visit — for example, mounting a TV, fixing a door, and patching drywall all at once.',
  },
  {
    q: 'What if I don\'t use my visit this month?',
    a: 'Visits don\'t roll over. But that\'s by design — most months you won\'t need one, and the ones you do, you\'ll be glad it\'s a text away instead of a 2-week search.',
  },
  {
    q: 'What\'s NOT covered?',
    a: 'Anything that requires a permit, structural work, or jobs over 2 hours (like full-room painting or major plumbing). For those, we\'ll connect you with a vetted contractor through our referral network.',
  },
  {
    q: 'What if I need more than 1 visit a month?',
    a: 'Members can book extra visits at $79 each — about half of what you\'d pay calling someone off Google.',
  },
  {
    q: 'How fast can you come?',
    a: 'We guarantee scheduling within 24 hours of your request. Most members get a next-day visit. We\'re not an emergency service, but we\'re close.',
  },
  {
    q: 'Can I really cancel anytime?',
    a: 'Yes. Monthly members can cancel with no penalty, effective at the end of the billing cycle. Annual members can cancel and receive a prorated refund.',
  },
  {
    q: 'What about parts and materials?',
    a: 'Basic parts up to $30 are included (screws, caulk, fixtures, filters). For anything beyond that, we bill parts at cost plus 20% — and always get your approval first.',
  },
  {
    q: 'What area do you serve?',
    a: 'We currently serve the greater Raleigh-Durham area. Expanding soon — join the waitlist for your city.',
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 px-6 md:px-12 bg-[#0e0e0e]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#e8a838] mb-4">FAQ</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#f5f0e8] leading-[1.1]">
            Questions?<br />
            <span className="text-[#888880]">Answered.</span>
          </h2>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="border border-[#2a2a2a] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-[#151515] transition-colors"
              >
                <span className="text-sm font-medium text-[#f5f0e8] pr-4">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4 text-[#888880] flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-[#888880] leading-relaxed font-light">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FINAL CTA ──────────────────────────────────────────────────────────────

function FinalCTA({ onJoin }: { onJoin: () => void }) {
  return (
    <section className="py-32 px-6 md:px-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-[#e8a838]/5 blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#e8a838]/10 border border-[#e8a838]/20 rounded-full mb-8">
            <MapPin className="h-3 w-3 text-[#e8a838]" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#e8a838]">
              Launching in Raleigh-Durham
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-[#f5f0e8] leading-[1.05] mb-6">
            Stop Googling<br />
            <span className="text-[#e8a838]">&ldquo;handyman near me.&rdquo;</span>
          </h2>
          <p className="text-base sm:text-lg text-[#888880] font-light max-w-lg mx-auto mb-10 leading-relaxed">
            Tell us what needs fixing. Your first visit is free — 
            no credit card, no commitment. Just results.
          </p>

          <motion.button
            onClick={onJoin}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="group px-10 py-4 bg-[#e8a838] text-[#0a0a0a] text-sm uppercase tracking-widest font-semibold rounded-full flex items-center gap-3 mx-auto hover:bg-[#f5bc5c] transition-colors"
          >
            Get Your Free First Visit
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <p className="mt-5 text-[10px] text-[#555]">
            Takes 30 seconds. We&apos;ll call you within 24 hours.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FOOTER ─────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-12 px-6 md:px-12 border-t border-[#2a2a2a]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#e8a838] rounded-md flex items-center justify-center">
            <Wrench className="h-3 w-3 text-[#0a0a0a]" />
          </div>
          <span className="text-xs font-semibold tracking-wide uppercase text-[#888880]">
            Handyman Club
          </span>
        </div>
        <p className="text-xs text-[#888880]">
          © {new Date().getFullYear()} Handyman Club. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-[#888880] hover:text-[#f5f0e8] transition-colors">Privacy</a>
          <a href="#" className="text-xs text-[#888880] hover:text-[#f5f0e8] transition-colors">Terms</a>
          <a href="#" className="text-xs text-[#888880] hover:text-[#f5f0e8] transition-colors">Contact</a>
        </div>
    </div>
    </footer>
  );
}

// ─── PAGE ───────────────────────────────────────────────────────────────────

export default function Home() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const openWaitlist = useCallback(() => setWaitlistOpen(true), []);
  const closeWaitlist = useCallback(() => setWaitlistOpen(false), []);

  return (
    <>
      <Nav onJoin={openWaitlist} />
      <Hero onJoin={openWaitlist} />
      <Marquee />
      <HowItWorks />
      <Perks />
      <YourHandyman />
      <ServicesCovered />
      <Marquee />
      <Pricing onJoin={openWaitlist} />
      <Testimonials />
      <FAQ />
      <FinalCTA onJoin={openWaitlist} />
      <Footer />
      <LeadModal isOpen={waitlistOpen} onClose={closeWaitlist} />
    </>
  );
}
