import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

export default function Contact({ personalInfo }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 4500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      showToast('All fields are required.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast('Please provide a valid email.', 'error');
      return;
    }

    setLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.warn("Simulating EmailJS delivery in local/default environment.");
      setTimeout(() => {
        setLoading(false);
        showToast('Message sent successfully! (Simulated)');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 1200);
      return;
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_name: personalInfo.name,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setLoading(false);
        showToast('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        showToast('Failed to send. Please try direct email.', 'error');
      });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start select-text">
      {/* Contact Details (Left sm:col-span-5) */}
      <div className="sm:col-span-5 space-y-4">
        <h3 className="text-base font-display font-semibold text-textPrimary leading-snug select-none">
          Let's Start a Conversation
        </h3>
        
        <p className="text-xs text-textSecondary leading-relaxed">
          Fill out the secure mailer on the right, or contact me directly via the credentials below.
        </p>

        <div className="space-y-2 select-none">
          <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-neutral-900/50 border border-white/5 text-xs text-textSecondary">
            <FaEnvelope className="text-accentPrimary shrink-0 text-base" />
            <a href={`mailto:${personalInfo.email}`} className="text-textPrimary hover:text-accentPrimary transition-colors truncate">
              {personalInfo.email}
            </a>
          </div>
          <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-neutral-900/50 border border-white/5 text-xs text-textSecondary">
            <FaPhone className="text-accentSecondary shrink-0 text-base" />
            <a href={`tel:${personalInfo.phone}`} className="text-textPrimary hover:text-accentSecondary transition-colors">
              {personalInfo.phone}
            </a>
          </div>
          <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-neutral-900/50 border border-white/5 text-xs text-textSecondary">
            <FaMapMarkerAlt className="text-accentPrimary shrink-0 text-base" />
            <span className="text-textPrimary truncate">{personalInfo.location}</span>
          </div>
        </div>
      </div>

      {/* Form (Right sm:col-span-7) */}
      <form onSubmit={handleSubmit} className="sm:col-span-7 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="px-3 py-2.5 rounded-lg bg-neutral-900 border border-white/5 text-textPrimary text-xs focus:outline-none focus:border-accentPrimary focus:shadow-glow transition-all"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="px-3 py-2.5 rounded-lg bg-neutral-900 border border-white/5 text-textPrimary text-xs focus:outline-none focus:border-accentPrimary focus:shadow-glow transition-all"
            required
          />
        </div>
        
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="w-full px-3 py-2.5 rounded-lg bg-neutral-900 border border-white/5 text-textPrimary text-xs focus:outline-none focus:border-accentPrimary focus:shadow-glow transition-all"
          required
        />

        <textarea
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          placeholder="Type your message details..."
          className="w-full px-3 py-2.5 rounded-lg bg-neutral-900 border border-white/5 text-textPrimary text-xs focus:outline-none focus:border-accentPrimary focus:shadow-glow transition-all resize-none"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg bg-accent-gradient text-textPrimary text-xs font-semibold flex items-center justify-center space-x-1.5 hover:shadow-glow-accent transition-all select-none disabled:opacity-50"
        >
          {loading ? (
            <span className="w-4 h-4 rounded-full border-2 border-t-transparent border-white animate-spin" />
          ) : (
            <>
              <FaPaperPlane className="text-[10px]" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>

      {/* Pop-up message Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`fixed bottom-24 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-xl shadow-2xl z-50 flex items-center space-x-2 text-[10px] font-mono border whitespace-nowrap select-none ${
              toast.type === 'success' 
                ? 'bg-emerald-950/95 text-emerald-400 border-emerald-500/30' 
                : 'bg-rose-950/95 text-rose-400 border-rose-500/30'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-ping bg-current" />
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
