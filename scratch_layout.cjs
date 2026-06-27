const fs = require('fs');

let content = fs.readFileSync('components/contact-section.tsx', 'utf8');

const replacement = `
          {/* Main Layout: Title + Form on left, Info on right */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-[clamp(3rem,6vw,8rem)]">
            {/* Left side: Title & Form */}
            <div className="flex-1">
              <div className="overflow-hidden mb-12">
                <h2
                  ref={emailRef}
                  className="tracking-[-0.01em] leading-[0.9] uppercase inline-flex flex-wrap"
                  style={{
                    color: '#f5f5f5',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 400,
                    fontSize: 'clamp(3rem, 8vw, 8rem)'
                  }}
                >
                  {emailText.split("").map((char, i) => (
                    <span key={i} className="email-char" style={{ display: 'inline-block' }}>
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </h2>
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
            </div>

            {/* Right side: Info strip */}
            <motion.div
              className="lg:w-72 flex flex-col gap-10 lg:border-l lg:border-white/20 lg:pl-12 pt-4"
              initial={{ opacity: 0 }}
              animate={sectionInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
            >
              {[
                { label: 'Location', value: 'Remote · Worldwide' },
                { label: 'Response', value: 'Within 24 hours' },
                { label: 'Status', value: 'Available for projects', pulse: true },
              ].map((item) => (
                <div key={item.label}>
                  <p
                    className="text-[0.55rem] tracking-[0.22em] uppercase text-white/40 font-medium mb-2"
                    style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                  >
                    {item.label}
                  </p>
                  <div className="flex items-center gap-2">
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
`;

content = content.replace(/{\/\* Giant Contact Title \*\/}[\s\S]*?{\/\* ── Footer ──────────────────────────────────────────────────────── \*\//m, replacement + '\n\n          {/* ── Footer ──────────────────────────────────────────────────────── */');

fs.writeFileSync('components/contact-section.tsx', content, 'utf8');
console.log('Layout updated');
