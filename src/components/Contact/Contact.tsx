import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, slideInLeft, staggerContainer, viewportOnce } from '@/hooks/animations'
import styles from './Contact.module.css'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const SUBJECTS = [
  'Narrative Film',
  'School Production',
  'Corporate Film',
  'Collaboration',
  'Other',
]

function validate(data: FormState): FormErrors {
  const errors: FormErrors = {}
  if (!data.name.trim()) errors.name = 'Name is required'
  if (!data.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email'
  }
  if (!data.message.trim()) errors.message = 'Message is required'
  else if (data.message.trim().length < 10) errors.message = 'Message must be at least 10 characters'
  return errors
}

export function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '', email: '', subject: SUBJECTS[0], message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // Focus first error field for a11y
      const firstError = Object.keys(errs)[0]
      document.getElementById(`field-${firstError}`)?.focus()
      return
    }
    setSubmitting(true)
    // Simulate API call
    await new Promise(r => setTimeout(r, 1200))
    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      className={`${styles.contact} section section--alt`}
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <div className={styles.header}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p className={styles.num}>04 — Contact</p>
            <h2 id="contact-heading" className={styles.title}>Let's Make Something</h2>
            <p className={styles.sub}>Open for commissions & collaboration</p>
          </motion.div>
        </div>

        <div className={styles.grid}>
          {/* Info */}
          <motion.div
            className={styles.info}
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p className={styles.quote}>
              "Every great film begins with a single conversation."
            </p>

            <address className={styles.details} aria-label="Contact details">
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Email</span>
                <a href="mailto:alexandre@noir.studio" className={styles.detailValue}>
                  alexandre@noir.studio
                </a>
              </div>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Location</span>
                <span className={styles.detailValue}>Stockholm, Sweden · Available worldwide</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Press Kit</span>
                <a
                  href="/press-kit.pdf"
                  className={styles.detailLink}
                  download
                  aria-label="Download press kit PDF"
                >
                  Download PDF →
                </a>
              </div>
            </address>

            <div className={styles.social}>
              <p className={styles.socialLabel}>Follow the work</p>
              <nav aria-label="Social media links">
                {[
                  { name: 'Instagram', href: '#' },
                  { name: 'Vimeo', href: '#' },
                  { name: 'IMDb', href: '#' },
                  { name: 'LinkedIn', href: '#' },
                ].map(s => (
                  <a
                    key={s.name}
                    href={s.href}
                    className={styles.socialLink}
                    aria-label={`Visit ${s.name} profile`}
                  >
                    {s.name}
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className={styles.formWrap}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {submitted ? (
              <motion.div
                className={styles.success}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                role="status"
                aria-live="polite"
              >
                <span className={styles.successIcon} aria-hidden="true">✓</span>
                <h3 className={styles.successTitle}>Message sent</h3>
                <p className={styles.successText}>
                  Thank you for reaching out. Alexandre will be in touch shortly.
                </p>
              </motion.div>
            ) : (
              <form
                className={styles.form}
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
              >
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="field-name">Name</label>
                    <input
                      id="field-name"
                      name="name"
                      type="text"
                      className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'err-name' : undefined}
                    />
                    {errors.name && (
                      <span id="err-name" className={styles.error} role="alert">{errors.name}</span>
                    )}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="field-email">Email</label>
                    <input
                      id="field-email"
                      name="email"
                      type="email"
                      className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="email"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'err-email' : undefined}
                    />
                    {errors.email && (
                      <span id="err-email" className={styles.error} role="alert">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="field-subject">Subject</label>
                  <select
                    id="field-subject"
                    name="subject"
                    className={styles.input}
                    value={form.subject}
                    onChange={handleChange}
                  >
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="field-message">Message</label>
                  <textarea
                    id="field-message"
                    name="message"
                    className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                    placeholder="Tell me about your project..."
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'err-message' : undefined}
                  />
                  {errors.message && (
                    <span id="err-message" className={styles.error} role="alert">{errors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className={styles.submit}
                  disabled={submitting}
                  aria-busy={submitting}
                >
                  {submitting ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
