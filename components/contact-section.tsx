'use client';

import { useEffect, useRef, useState, useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, X, Mail, Instagram, Youtube, Linkedin } from 'lucide-react';
import dynamic from 'next/dynamic';

const ContactCanvas = dynamic(() => import('./contact-canvas').then((mod) => mod.ContactCanvas), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1] as const;

const SOCIALS = [
  { label: 'Email', href: 'mailto:mediapvtcentraverse.com@gmail.com', icon: <Mail size={15} /> },
  { label: 'Instagram', href: '#', icon: <Instagram size={15} /> },
  { label: 'YouTube', href: '#', icon: <Youtube size={15} /> },
  { label: 'LinkedIn', href: '#', icon: <Linkedin size={15} /> },
];

/* ── Magnetic CTA button ──────────────────────────────────────────────────── */
function MagneticCTA({
  label,
  onClick,
  variant = 'outline',
}: {
  label: string;
  onClick: () => void;
  variant?: 'outline' | 'solid';
}) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 280, damping: 26 });
  const y = useSpring(rawY, { stiffness: 280, damping: 26 });

  const solid = variant === 'solid';

  return (
    <motion.button
      style={{ x, y }}
      onClick={onClick}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        rawX.set((e.clientX - r.left - r.width / 2) * 0.3);
        rawY.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onMouseLeave={() => { rawX.set(0); rawY.set(0); }}
      className={
        solid
          ? 'group inline-flex items-center gap-3 bg-white text-black px-8 py-4 hover:bg-white/85 transition-colors duration-300 rounded-full'
          : 'group inline-flex items-center gap-3 border border-white/20 px-8 py-4 text-white/60 hover:text-white hover:border-white/50 transition-colors duration-300 rounded-full'
      }
      whileHover={!solid ? { backgroundColor: 'rgba(255,255,255,0.04)' } : undefined}
    >
      <span
        className="text-[0.65rem] tracking-[0.22em] uppercase font-medium"
        style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
      >
        {label}
      </span>
      <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
    </motion.button>
  );
}

/* ── Validation ───────────────────────────────────────────────────────────── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormState = { name: string; email: string; message: string };
type FieldErrors = Record<keyof FormState, string>;

function getErrors(f: FormState): FieldErrors {
  return {
    name: f.name.trim().length < 2 ? 'Please enter your name.' : '',
    email: !EMAIL_RE.test(f.email.trim()) ? 'Enter a valid email address.' : '',
    message: f.message.trim().length < 10 ? 'A little more detail helps (10+ characters).' : '',
  };
}

/* ── Contact modal ────────────────────────────────────────────────────────── */
function ContactModal({ intent, onClose }: { intent: 'message' | 'call'; onClose: () => void }) {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    message: intent === 'call' ? 'I’d like to book a quick call to discuss a project. My availability / timezone is: ' : '',
  });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const errors = getErrors(form);
  const isValid = !errors.name && !errors.email && !errors.message;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) {
      setTouched({ name: true, email: true, message: true });
      return;
    }
    setStatus('sending');
    // Simulate sending delay
    setTimeout(() => {
      setStatus('sent');
    }, 1500);
  };

  const fieldClass = (hasError: boolean) =>
    `w-full bg-transparent border ${hasError ? 'border-red-400/50 focus:border-red-400/70' : 'border-white/12 focus:border-white/40'} text-white placeholder:text-white/30 px-5 py-3.5 text-sm focus:outline-none transition-colors duration-200`;

  const errorClass =
    'text-[0.58rem] tracking-[0.04em] text-red-400/70 mt-1.5 block';

  return (
    <motion.div
      className="fixed inset-0 z-[999999] flex items-end sm:items-center justify-center p-0 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Panel */}
      <motion.div
        className="relative w-full sm:max-w-xl bg-[#0d0d0d] border border-white/10 overflow-hidden rounded-t-2xl sm:rounded-2xl"
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        {/* Corner accents */}
        <div className="absolute top-0 right-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-px h-12 bg-white/20" />
          <div className="absolute top-0 right-0 w-12 h-px bg-white/20" />
        </div>
        <div className="absolute bottom-0 left-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-px h-12 bg-white/10" />
          <div className="absolute bottom-0 left-0 w-12 h-px bg-white/10" />
        </div>

        <div className="p-8 sm:p-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <span
                className="text-[0.55rem] tracking-[0.28em] uppercase text-white/40 font-medium block mb-2"
                style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
              >
                {intent === 'call' ? 'Book a Call' : 'Get in Touch'}
              </span>
              <h2
                className="font-black text-white tracking-[-0.035em] leading-tight"
                style={{
                  fontFamily: 'Satoshi, system-ui, sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
                  textTransform: 'uppercase',
                }}
              >
                {intent === 'call' ? 'Let’s' : 'Start a'}{' '}
                <span
                  style={{
                    fontStyle: 'italic',
                    fontWeight: 900,
                    color: 'rgba(255,255,255,0.4)',
                  }}
                >
                  {intent === 'call' ? 'talk' : 'conversation'}
                </span>
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 border border-white/12 flex items-center justify-center text-white/50 hover:text-white hover:border-white/35 transition-colors duration-200 shrink-0 mt-1 rounded-full"
            >
              <X size={14} />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-12 text-center"
              >
                <div className="w-12 h-px bg-white/20 mx-auto mb-8" />
                <p
                  className="text-white/70 leading-relaxed mb-2 uppercase"
                  style={{
                    fontFamily: 'var(--font-instrument), Georgia, serif',
                    fontStyle: 'italic',
                    fontWeight: 900,
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                  }}
                >
                  Message received.
                </p>
                <p
                  className="text-white/50 text-sm"
                  style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                >
                  I&apos;ll be in touch soon.
                </p>
                <button
                  onClick={onClose}
                  className="mt-8 text-[0.6rem] tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors"
                  style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                >
                  Close
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-4"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-[0.58rem] tracking-[0.18em] uppercase text-white/40 mb-2 font-medium"
                      style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      onBlur={() => setTouched((p) => ({ ...p, name: true }))}
                      className={fieldClass(touched.name && !!errors.name)}
                      style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                      placeholder="Your name"
                      aria-invalid={touched.name && !!errors.name}
                    />
                    {touched.name && errors.name && (
                      <span className={errorClass} style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>{errors.name}</span>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-[0.58rem] tracking-[0.18em] uppercase text-white/40 mb-2 font-medium"
                      style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      onBlur={() => setTouched((p) => ({ ...p, email: true }))}
                      className={fieldClass(touched.email && !!errors.email)}
                      style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                      placeholder="your@email.com"
                      aria-invalid={touched.email && !!errors.email}
                    />
                    {touched.email && errors.email && (
                      <span className={errorClass} style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>{errors.email}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    className="block text-[0.58rem] tracking-[0.18em] uppercase text-white/40 mb-2 font-medium"
                    style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                  >
                    Message
                  </label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    onBlur={() => setTouched((p) => ({ ...p, message: true }))}
                    className={`${fieldClass(touched.message && !!errors.message)} resize-none`}
                    style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                    placeholder="Tell me about your project..."
                    aria-invalid={touched.message && !!errors.message}
                  />
                  {touched.message && errors.message && (
                    <span className={errorClass} style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>{errors.message}</span>
                  )}
                </div>

                {status === 'error' && (
                  <p
                    className="text-[0.6rem] tracking-[0.12em] text-red-400/70 font-medium"
                    style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                  >
                    Something went wrong — please try again or email directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending' || !isValid}
                  className="w-full bg-white text-black py-4 text-[0.62rem] tracking-[0.22em] uppercase font-semibold hover:bg-white/88 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed mt-2 rounded-lg"
                  style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                >
                  {status === 'sending' ? 'Sending...' : intent === 'call' ? 'Request Call' : 'Send Message'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main section ─────────────────────────────────────────────────────────── */
interface ContactProps {
  onNavigate?: (sectionId: string) => void;
}

export default function ContactSection({ onNavigate }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const emailRef = useRef<HTMLHeadingElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: '-12%' });

  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const errors = getErrors(form);
  const isValid = !errors.name && !errors.email && !errors.message;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) {
      setTouched({ name: true, email: true, message: true });
      return;
    }
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus('sent');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission failed:', error);
      setStatus('error');
    }
  };

  const fieldClass = (hasError: boolean) =>
    `w-full bg-transparent border ${hasError ? 'border-red-400/50 focus:border-red-400/70' : 'border-white/12 focus:border-white/40'} text-white placeholder:text-white/30 px-5 py-3.5 text-sm focus:outline-none transition-colors duration-200`;

  const errorClass = 'text-[0.58rem] tracking-[0.04em] text-red-400/70 mt-1.5 block';


  /* ── CENTRAVERSE wordmark animation (Custom manual split) ── */
  const wordmarkText = "CENTRAVERSE";

  useEffect(() => {
    const el = wordmarkRef.current;
    if (!el) return;

    let glitchTimer: ReturnType<typeof setTimeout> | undefined;

    const ctx = gsap.context(() => {
      const chars = el.querySelectorAll('.glitch-char');

      gsap.set(chars, {
        color: 'rgba(255,255,255,0)',
        y: -40,
        skewX: () => (Math.random() - 0.5) * 10,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top bottom', // fire as soon as any part enters viewport
          toggleActions: 'play none none none',
        },
      });

      /* 1 — fly in with a bright flash */
      tl.to(chars, {
        color: 'rgba(255,255,255,0.4)',
        y: 0,
        skewX: 0,
        duration: 1.6,
        stagger: { amount: 0.55, from: 'random' },
        ease: 'expo.out',
      });

      /* 2 — settle to the original ghost opacity */
      tl.to(chars, {
        color: 'rgba(255,255,255,0.06)',
        duration: 2,
        stagger: { amount: 0.4 },
        ease: 'power2.inOut',
      }, '-=0.7');

      /* 3 — continuous idle float */
      chars.forEach((char, i) => {
        gsap.to(char, {
          y: `${2 + Math.sin(i * 0.9) * 3}px`,
          duration: 3.5 + i * 0.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.09,
        });
      });

      /* 4 — periodic glitch on a random character */
      const scheduleGlitch = (delay = 4200) => {
        glitchTimer = setTimeout(() => {
          if (!chars.length) return;
          const i = Math.floor(Math.random() * chars.length);
          gsap.timeline()
            .to(chars[i], { color: 'rgba(255,255,255,0.4)', x: 3, skewX: 7, duration: 0.055 })
            .to(chars[i], { color: 'rgba(255,255,255,0.02)', x: -2, skewX: -5, duration: 0.055 })
            .to(chars[i], { color: 'rgba(255,255,255,0.06)', x: 0, skewX: 0, duration: 0.1 });
          scheduleGlitch(1500 + Math.random() * 3000);
        }, delay);
      };
      scheduleGlitch();
    }, el);

    return () => {
      clearTimeout(glitchTimer);
      ctx.revert();
    };
  }, []);

  /* ── Heading SplitText animation ── */
  const emailText = "CONTACT";
  useEffect(() => {
    if (!sectionRef.current || !emailRef.current) return;
    const ctx = gsap.context(() => {
      const chars = emailRef.current!.querySelectorAll('.email-char');
      gsap.fromTo(
        chars,
        { y: 48, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1.1,
          stagger: 0.022,
          ease: 'power4.out',
          scrollTrigger: { trigger: emailRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="contact"
        className="w-full bg-[#0A0A0A] relative overflow-hidden text-white"
        style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        {/* Constellation background */}
        <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
          {sectionInView && <ContactCanvas />}
        </div>

        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-[clamp(1.25rem,5vw,5rem)] pt-[clamp(5rem,10vw,11rem)] pb-0 flex-1 flex flex-col">

          {/* Section label */}
          <div className="flex items-center gap-4 mb-[clamp(3rem,6vw,8rem)]">
            <motion.span
              className="text-[0.6rem] tracking-[0.22em] uppercase text-white/40 font-medium shrink-0"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
              initial={{ opacity: 0, x: -16 }}
              animate={sectionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
            >
              Get in Touch
            </motion.span>
            <motion.div
              className="flex-1 h-px bg-white/20"
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              animate={sectionInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.15, ease: EASE }}
            />
          </div>


          {/* Main Layout: Title + Form on left, Info on right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-0 w-full">
            {/* Left side: Title & Form */}
            <div className="w-full">
              <div className="overflow-hidden mb-12">
                <h2
                  ref={emailRef}
                  className="tracking-[-0.01em] leading-[0.9] uppercase inline-flex flex-wrap"
                  style={{
                    color: '#f5f5f5',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 400,
                    fontSize: 'clamp(2rem, 8vw, 8rem)'
                  }}
                >
                  {emailText.split("").map((char, i) => (
                    <span key={i} className="email-char" style={{ display: 'inline-block' }}>
                      {char === " " ? " " : char}
                    </span>
                  ))}
                </h2>
                <motion.p
                  className="text-[0.6rem] tracking-[0.22em] uppercase text-white/40 font-medium mt-4"
                  style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={sectionInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
                >
                  Send a message
                </motion.p>
              </div>

              <motion.div
                className="max-w-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={sectionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
              >
                <AnimatePresence mode="wait">
                  {status === 'sent' ? (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="py-12"
                    >
                      <div className="w-12 h-px bg-white/20 mb-8" />
                      <p
                        className="text-white/70 leading-relaxed mb-2 uppercase"
                        style={{
                          fontFamily: 'var(--font-instrument), Georgia, serif',
                          fontStyle: 'italic',
                          fontWeight: 900,
                          fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                        }}
                      >
                        Message received.
                      </p>
                      <p
                        className="text-white/50 text-sm"
                        style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                      >
                        I'll be in touch soon.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-4"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[0.58rem] tracking-[0.18em] uppercase text-white/40 mb-2 font-medium" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>Name</label>
                          <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                            onBlur={() => setTouched((p) => ({ ...p, name: true }))}
                            className={fieldClass(touched.name && !!errors.name)}
                            style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                            placeholder="Your name"
                          />
                          {touched.name && errors.name && <span className={errorClass}>{errors.name}</span>}
                        </div>
                        <div>
                          <label className="block text-[0.58rem] tracking-[0.18em] uppercase text-white/40 mb-2 font-medium" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>Email</label>
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                            onBlur={() => setTouched((p) => ({ ...p, email: true }))}
                            className={fieldClass(touched.email && !!errors.email)}
                            style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                            placeholder="your@email.com"
                          />
                          {touched.email && errors.email && <span className={errorClass}>{errors.email}</span>}
                        </div>
                      </div>
                      <div>
                        <label className="block text-[0.58rem] tracking-[0.18em] uppercase text-white/40 mb-2 font-medium" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>Message</label>
                        <textarea
                          rows={5}
                          value={form.message}
                          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                          onBlur={() => setTouched((p) => ({ ...p, message: true }))}
                          className={`${fieldClass(touched.message && !!errors.message)} resize-none`}
                          style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                          placeholder="Tell me about your project..."
                        />
                        {touched.message && errors.message && <span className={errorClass}>{errors.message}</span>}
                      </div>
                      {status === 'error' && (
                        <p className="text-[0.6rem] tracking-[0.12em] text-red-400/70 font-medium" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
                          Something went wrong — please try again or email directly.
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={status === 'sending' || !isValid}
                        className="w-full sm:w-auto px-8 bg-white text-black py-4 text-[0.62rem] tracking-[0.22em] uppercase font-semibold hover:bg-white/88 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed mt-2 rounded-lg"
                        style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                      >
                        {status === 'sending' ? 'Sending...' : 'Send Message'}
                      </button>
                      <div className="mt-0 -mb-16 overflow-hidden -ml-6">
                        <Image
                          src="/logo3.png"
                          alt="Centraverse Logo"
                          width={300}
                          height={300}
                          className="w-auto h-40 opacity-100 object-cover scale-[1.4] origin-left"
                        />
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Right side: Info strip */}
            <motion.div
              className="flex flex-col justify-center gap-16 lg:pl-20 lg:border-l lg:border-white/10"
              initial={{ opacity: 0 }}
              animate={sectionInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
            >
              {[
                { label: 'Location', value: 'Remote · Worldwide' },
                { label: 'Response', value: 'Within 24 hours' },
                { label: 'Status', value: 'Available for projects', pulse: true },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center text-center">
                  <p
                    className="text-[0.55rem] tracking-[0.22em] uppercase text-white/40 font-medium mb-2"
                    style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                  >
                    {item.label}
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    {item.pulse && <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse shrink-0" />}
                    <p
                      className="text-white/80 font-medium"
                      style={{
                        fontFamily: 'Satoshi, system-ui, sans-serif',
                        fontSize: 'clamp(0.85rem, 1.3vw, 1rem)',
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <footer className="mt-0 relative z-10 overflow-hidden w-full">

          {/* Big background wordmark removed */}

          <div className="relative z-10 max-w-[1600px] mx-auto px-[clamp(1.25rem,5vw,5rem)] pb-12 pt-0">

            {/* Top row: socials */}
            <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-end gap-6 sm:gap-8 mb-10 sm:mb-12">
              {/* Socials */}
              <motion.div
                className="flex flex-col items-center sm:items-end gap-3"
                initial={{ opacity: 0 }}
                animate={sectionInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7, ease: EASE }}
              >
                <span
                  className="text-[0.6rem] tracking-[0.22em] uppercase text-white/40 font-medium"
                  style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                >
                  Connect Directly
                </span>
                <div className="w-[200px] sm:w-[240px] h-[60px] flex items-center relative overflow-hidden -mr-2">
                  <LogoLoop
                    logos={SOCIALS.map(({ label, href, icon }) => ({
                      node: (
                        <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-all duration-200 hover:scale-110">
                          {icon}
                        </div>
                      ),
                      href,
                      ariaLabel: label
                    }))}
                    speed={25}
                    gap={12}
                    logoHeight={40}
                    pauseOnHover={true}
                  />
                </div>
              </motion.div>
            </div>


            {/* Bottom bar */}
            <motion.div
              className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 border-t border-white/20 pt-8"
              initial={{ opacity: 0 }}
              animate={sectionInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.85, ease: EASE }}
            >
              <p
                className="text-[0.55rem] tracking-[0.16em] uppercase text-white/40 font-medium text-center sm:text-left"
                style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
              >
                © 2026 Shreyas Shetty · Centraverse
              </p>
              <a
                href="#home"
                onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('home'); }}
                className="text-[0.55rem] tracking-[0.14em] uppercase text-white/40 hover:text-white transition-colors text-center sm:text-right"
                style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
              >
                Back to top ↑
              </a>
            </motion.div>
          </div>
        </footer>
      </section>


    </>
  );
}

/* ── LogoLoop Component (Merged) ─────────────────────────────────────────── */

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 };

const toCssLength = (value: string | number) => (typeof value === 'number' ? `${value}px` : (value ?? undefined));

const useResizeObserver = (callback: () => void, elements: any[], dependencies: any[]) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener('resize', handleResize);
      callback();
      return () => window.removeEventListener('resize', handleResize);
    }
    const observers = elements.map(ref => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });
    callback();
    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, [callback, elements, dependencies]);
};

const useImageLoader = (seqRef: any, onLoad: () => void, dependencies: any[]) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll('img') ?? [];
    if (images.length === 0) {
      onLoad();
      return;
    }
    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages === 0) onLoad();
    };
    images.forEach((img: any) => {
      const htmlImg = img;
      if (htmlImg.complete) {
        handleImageLoad();
      } else {
        htmlImg.addEventListener('load', handleImageLoad, { once: true });
        htmlImg.addEventListener('error', handleImageLoad, { once: true });
      }
    });
    return () => {
      images.forEach((img: any) => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageLoad);
      });
    };
  }, [onLoad, seqRef, dependencies]);
};

const useAnimationLoop = (trackRef: any, targetVelocity: number, seqWidth: number, seqHeight: number, isHovered: boolean, hoverSpeed: number | undefined, isVertical: boolean) => {
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const seqSize = isVertical ? seqHeight : seqWidth;

    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
      const transformValue = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`;
      track.style.transform = transformValue;
    }

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;

      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (seqSize > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
        offsetRef.current = nextOffset;

        const transformValue = isVertical
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${-offsetRef.current}px, 0, 0)`;
        track.style.transform = transformValue;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical, trackRef]);
};

const LogoLoop = memo(
  ({
    logos,
    speed = 120,
    direction = 'left',
    width = '100%',
    logoHeight = 28,
    gap = 32,
    pauseOnHover,
    hoverSpeed,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    renderItem,
    ariaLabel = 'Partner logos',
    className,
    style
  }: any) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const seqRef = useRef<HTMLUListElement>(null);

    const [seqWidth, setSeqWidth] = useState(0);
    const [seqHeight, setSeqHeight] = useState(0);
    const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
    const [isHovered, setIsHovered] = useState(false);

    const effectiveHoverSpeed = useMemo(() => {
      if (hoverSpeed !== undefined) return hoverSpeed;
      if (pauseOnHover === true) return 0;
      if (pauseOnHover === false) return undefined;
      return 0;
    }, [hoverSpeed, pauseOnHover]);

    const isVertical = direction === 'up' || direction === 'down';

    const targetVelocity = useMemo(() => {
      const magnitude = Math.abs(speed);
      let directionMultiplier;
      if (isVertical) {
        directionMultiplier = direction === 'up' ? 1 : -1;
      } else {
        directionMultiplier = direction === 'left' ? 1 : -1;
      }
      const speedMultiplier = speed < 0 ? -1 : 1;
      return magnitude * directionMultiplier * speedMultiplier;
    }, [speed, direction, isVertical]);

    const updateDimensions = useCallback(() => {
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const sequenceRect = seqRef.current?.getBoundingClientRect?.();
      const sequenceWidth = sequenceRect?.width ?? 0;
      const sequenceHeight = sequenceRect?.height ?? 0;
      if (isVertical) {
        const parentHeight = containerRef.current?.parentElement?.clientHeight ?? 0;
        if (containerRef.current && parentHeight > 0) {
          const targetHeight = Math.ceil(parentHeight);
          if (containerRef.current.style.height !== `${targetHeight}px`)
            containerRef.current.style.height = `${targetHeight}px`;
        }
        if (sequenceHeight > 0) {
          setSeqHeight(Math.ceil(sequenceHeight));
          const viewport = containerRef.current?.clientHeight ?? parentHeight ?? sequenceHeight;
          const copiesNeeded = Math.ceil(viewport / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM;
          setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
        }
      } else if (sequenceWidth > 0) {
        setSeqWidth(Math.ceil(sequenceWidth));
        const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
      }
    }, [isVertical]);

    useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight, isVertical]);

    useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight, isVertical]);

    useAnimationLoop(trackRef, targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical);

    const cssVariables = useMemo(
      () => ({
        '--logoloop-gap': `${gap}px`,
        '--logoloop-logoHeight': `${logoHeight}px`,
        ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor })
      }),
      [gap, logoHeight, fadeOutColor]
    );

    const rootClassName = useMemo(
      () =>
        [
          'logoloop',
          isVertical ? 'logoloop--vertical' : 'logoloop--horizontal',
          fadeOut && 'logoloop--fade',
          scaleOnHover && 'logoloop--scale-hover',
          className
        ]
          .filter(Boolean)
          .join(' '),
      [isVertical, fadeOut, scaleOnHover, className]
    );

    const handleMouseEnter = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(true);
    }, [effectiveHoverSpeed]);
    const handleMouseLeave = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(false);
    }, [effectiveHoverSpeed]);

    const renderLogoItem = useCallback(
      (item: any, key: string) => {
        if (renderItem) {
          return (
            <li className="logoloop__item" key={key} role="listitem">
              {renderItem(item, key)}
            </li>
          );
        }
        const isNodeItem = 'node' in item;
        const content = isNodeItem ? (
          <span className="logoloop__node" aria-hidden={!!item.href && !item.ariaLabel}>
            {item.node}
          </span>
        ) : (
          <img
            src={item.src}
            srcSet={item.srcSet}
            sizes={item.sizes}
            width={item.width}
            height={item.height}
            alt={item.alt ?? ''}
            title={item.title}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        );
        const itemAriaLabel = isNodeItem ? (item.ariaLabel ?? item.title) : (item.alt ?? item.title);
        const itemContent = item.href ? (
          <a
            className="logoloop__link"
            href={item.href}
            aria-label={itemAriaLabel || 'logo link'}
            target="_blank"
            rel="noreferrer noopener"
          >
            {content}
          </a>
        ) : (
          content
        );
        return (
          <li className="logoloop__item" key={key} role="listitem">
            {itemContent}
          </li>
        );
      },
      [renderItem]
    );

    const logoLists = useMemo(
      () =>
        Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul
            className="logoloop__list"
            key={`copy-${copyIndex}`}
            role="list"
            aria-hidden={copyIndex > 0}
            ref={copyIndex === 0 ? seqRef : undefined}
          >
            {logos.map((item: any, itemIndex: number) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
          </ul>
        )),
      [copyCount, logos, renderLogoItem]
    );

    const containerStyle = useMemo(
      () => ({
        width: isVertical
          ? toCssLength(width) === '100%'
            ? undefined
            : toCssLength(width)
          : (toCssLength(width) ?? '100%'),
        ...cssVariables,
        ...style
      }),
      [width, cssVariables, style, isVertical]
    );

    return (
      <div ref={containerRef} className={rootClassName} style={containerStyle as any} role="region" aria-label={ariaLabel}>
        <div className="logoloop__track" ref={trackRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {logoLists}
        </div>
      </div>
    );
  }
);

LogoLoop.displayName = 'LogoLoop';
