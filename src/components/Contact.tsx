'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { Mail, Send, MapPin, Phone, Github, Linkedin, Twitter, CheckCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { contactInfo } from '@/data';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Success
    setStatus('success');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00F0FF', '#7000FF', '#FF006E'],
    });

    setFormData({ name: '', email: '', subject: '', message: '' });

    // Reset status after 3 seconds
    setTimeout(() => setStatus('idle'), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfoList = [
    { icon: Mail, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { icon: Phone, label: 'Phone', value: contactInfo.phone || '', href: contactInfo.phone ? `tel:${contactInfo.phone}` : '#' },
    { icon: MapPin, label: 'Location', value: contactInfo.location || '', href: '#' },
  ];

  const socialLinks = [
    { icon: Github, href: contactInfo.socialLinks.github, label: 'GitHub' },
    { icon: Linkedin, href: contactInfo.socialLinks.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: contactInfo.socialLinks.twitter, label: 'Twitter' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
  };

  return (
    <section id="contact" className="relative py-20 sm:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-purple/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 bg-cyber-pink/10 border border-cyber-pink/20 rounded-full text-cyber-pink text-sm font-mono mb-6"
          >
            Contact
          </motion.span>
          <h2 className="section-title">{contactInfo.title}</h2>
          <p className="section-subtitle mx-auto">{contactInfo.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left side - Contact info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="font-display font-bold text-2xl mb-4">Let's talk about your project</h3>
              <p className="text-muted-foreground">
                {contactInfo.description}
              </p>
            </motion.div>

            {/* Contact info cards */}
            <div className="space-y-4 mb-8">
              {contactInfoList.map((info, index) => (
                info.value ? (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    variants={itemVariants}
                    className="glass-card p-4 flex items-center gap-4 hover:border-cyber-cyan/30 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-cyber-cyan/20 to-cyber-purple/20 rounded-xl flex items-center justify-center">
                      <info.icon className="w-5 h-5 text-cyber-cyan" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{info.label}</div>
                      <div className="text-foreground font-medium">{info.value}</div>
                    </div>
                  </motion.a>
                ) : null
              ))}
            </div>

            {/* Social links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-sm text-muted-foreground mb-4">{t('Contact.social')}</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center bg-muted/20 border border-border rounded-xl text-muted-foreground hover:text-cyber-cyan hover:border-cyber-cyan/30 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8">
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm text-muted-foreground mb-2">
                    {contactInfo.formFields.name.label}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required={contactInfo.formFields.name.required}
                    className="input-field"
                    placeholder={contactInfo.formFields.name.placeholder}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">
                    {contactInfo.formFields.email.label}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required={contactInfo.formFields.email.required}
                    className="input-field"
                    placeholder={contactInfo.formFields.email.placeholder}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm text-muted-foreground mb-2">
                  {contactInfo.formFields.subject.label}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required={contactInfo.formFields.subject.required}
                  className="input-field"
                  placeholder={contactInfo.formFields.subject.placeholder}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm text-muted-foreground mb-2">
                  {contactInfo.formFields.message.label}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required={contactInfo.formFields.message.required}
                  rows={5}
                  className="input-field resize-none"
                  placeholder={contactInfo.formFields.message.placeholder}
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className={`w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                  status === 'success'
                    ? 'bg-cyber-green/20 border border-cyber-green/30 text-cyber-green'
                    : status === 'error'
                    ? 'bg-red-500/20 border border-red-500/30 text-red-500'
                    : 'btn-primary'
                }`}
                whileHover={status === 'idle' || status === 'sending' ? { scale: 1.02 } : {}}
                whileTap={status === 'idle' || status === 'sending' ? { scale: 0.98 } : {}}
              >
                {status === 'sending' ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    {t('Contact.form.sending')}
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    {contactInfo.successMessage}
                  </>
                ) : status === 'error' ? (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    {contactInfo.errorMessage}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {contactInfo.submitButtonText}
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}