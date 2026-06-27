const fs = require('fs');

let content = fs.readFileSync('components/contact-section.tsx', 'utf8');

// Remove MagneticCTA and ContactModal
content = content.replace(/\/\* ── Buttons ── \*\/[\s\S]*?\/\* ── Main section ──/m, '/* ── Main section ──');

// Inject state variables into ContactSection
const stateVars = `
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
    setTimeout(() => {
      setStatus('sent');
    }, 1500);
  };

  const fieldClass = (hasError: boolean) =>
    \`w-full bg-transparent border \${hasError ? 'border-red-400/50 focus:border-red-400/70' : 'border-white/12 focus:border-white/40'} text-white placeholder:text-white/30 px-5 py-3.5 text-sm focus:outline-none transition-colors duration-200\`;

  const errorClass = 'text-[0.58rem] tracking-[0.04em] text-red-400/70 mt-1.5 block';
`;

content = content.replace('const [modal, setModal] = useState<null | \'message\' | \'call\'>(null);', stateVars);

const formJSX = `
            <motion.div
              className="mt-8 max-w-xl"
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
                        className={\`\${fieldClass(touched.message && !!errors.message)} resize-none\`}
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
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
`;

content = content.replace(/<motion\.div\s+className="flex flex-wrap items-center gap-4"[\s\S]*?<\/motion\.div>/, formJSX);

// Remove the modal portal at the end
content = content.replace(/{\/\* Modal portal \*\/}[\s\S]*?<\/AnimatePresence>/, '');

fs.writeFileSync('components/contact-section.tsx', content, 'utf8');
console.log('Refactor complete');
