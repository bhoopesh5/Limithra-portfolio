import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, MapPin, Mail, Phone, Github, Linkedin, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { playClickSound, playHoverSound, playSuccessSound } from '../lib/audio';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activationRequired, setActivationRequired] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !msg) return;

    playClickSound();
    setIsSubmitting(true);
    setErrorMessage('');
    setActivationRequired(false);

    try {
      const response = await fetch('https://formsubmit.co/ajax/limithral820@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message: msg,
          _subject: `New Portfolio Message from ${name}`
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success === 'true' || data.success === true) {
          playSuccessSound();
          setIsDone(true);
          setName('');
          setEmail('');
          setMsg('');
          setTimeout(() => setIsDone(false), 6000);
        } else if (data.message && data.message.toLowerCase().includes('activate')) {
          setActivationRequired(true);
          setErrorMessage('Activation required: Please check your inbox at limithral820@gmail.com and click the confirmation link from FormSubmit to activate your contact form.');
        } else {
          setErrorMessage(data.message || 'Form submission failed. Please try again.');
        }
      } else {
        throw new Error('Server responded with an error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Failed to send message over AJAX (this can happen if adblockers are active). Please click the mail link on the right to send an email directly!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 relative bg-[#050505] overflow-hidden select-none">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-3">
            <Sparkles className="w-3 h-3 text-brand-cyan" />
            <span className="text-[9px] font-mono tracking-wider text-brand-cyan uppercase">
              CONNECT
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
            Establish Connection
          </h2>
          <div className="w-10 h-[2px] bg-brand-purple mt-3 rounded-full" />
        </div>

        {/* Split Form & Map HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-4xl mx-auto">
          
          {/* Left Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#111111]/80 rounded-2xl p-5 sm:p-6 border border-white/5 relative overflow-hidden h-full">
              <div className="absolute inset-0 animated-grid opacity-5 pointer-events-none" />

              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <h3 className="text-lg font-display font-bold text-white mb-2">
                  Send Message
                </h3>

                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-brand-muted uppercase tracking-wider font-semibold">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={playHoverSound}
                    placeholder="E.g., Dr. Elizabeth Shaw"
                    className="w-full bg-[#161616] border border-white/5 rounded-xl px-3.5 py-2.5 text-xs font-sans text-white placeholder-brand-muted/30 focus:outline-none focus:border-brand-cyan/50 focus:shadow-lg focus:shadow-brand-cyan/5 transition-all cursor-none"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-brand-muted uppercase tracking-wider font-semibold">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={playHoverSound}
                    placeholder="E.g., contact@corporation.com"
                    className="w-full bg-[#161616] border border-white/5 rounded-xl px-3.5 py-2.5 text-xs font-sans text-white placeholder-brand-muted/30 focus:outline-none focus:border-brand-cyan/50 focus:shadow-lg focus:shadow-brand-cyan/5 transition-all cursor-none"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-brand-muted uppercase tracking-wider font-semibold">
                    MESSAGE
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    onFocus={playHoverSound}
                    placeholder="Enter your message..."
                    className="w-full bg-[#161616] border border-white/5 rounded-xl px-3.5 py-2.5 text-xs font-sans text-white placeholder-brand-muted/30 focus:outline-none focus:border-brand-cyan/50 focus:shadow-lg focus:shadow-brand-cyan/5 transition-all resize-none cursor-none"
                  />
                </div>

                {/* Feedback Send State */}
                <AnimatePresence mode="wait">
                  {isDone ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 text-brand-success text-[11px] font-mono py-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>MESSAGE SENT SUCCESSFULLY. THANK YOU!</span>
                    </motion.div>
                  ) : errorMessage ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`flex gap-2 text-[11px] font-mono p-3 rounded-lg border ${
                        activationRequired
                          ? 'text-amber-400 border-amber-500/20 bg-amber-500/5'
                          : 'text-rose-400 border-rose-500/20 bg-rose-500/5'
                      }`}
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                {/* Action Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={playHoverSound}
                  className="w-full relative group inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-black font-jakarta font-semibold text-xs rounded-xl overflow-hidden transition-all duration-300 active:scale-95 cursor-none"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center justify-center gap-1.5 group-hover:text-white transition-colors duration-200">
                    {isSubmitting ? 'SENDING...' : 'SEND'}
                    {!isSubmitting && <Send className="w-3.5 h-3.5" />}
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Map Coordinates HUD */}
          <div className="lg:col-span-5">
            <div className="bg-[#111111]/80 rounded-2xl p-5 sm:p-6 border border-white/5 flex flex-col justify-between h-full relative overflow-hidden group">
              {/* Abstract Target Crosshair Map Background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
                <div className="w-48 h-48 rounded-full border border-dashed border-brand-cyan/20 animate-spin" style={{ animationDuration: '35s' }} />
                <div className="absolute w-32 h-32 rounded-full border border-white/5" />
                {/* Horizontal & Vertical grid crosshair */}
                <div className="absolute left-4 right-4 h-[1px] bg-white/5" />
                <div className="absolute top-4 bottom-4 w-[1px] bg-white/5" />
              </div>

              <div className="space-y-3 relative z-10">
                <h3 className="text-lg font-display font-bold text-white">
                  Coordinates
                </h3>

                {/* Coordinate details */}
                <div className="space-y-2.5 font-mono text-xs pt-2">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-3.5 h-3.5 text-brand-cyan" />
                    <div>
                      <span className="text-brand-muted block text-[9px] font-semibold">LOCATION</span>
                      <strong className="text-white text-xs">Salem, Tamil Nadu, India</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-3.5 h-3.5 text-brand-purple" />
                    <div>
                      <span className="text-brand-muted block text-[9px] font-semibold">EMAIL</span>
                      <strong className="text-white text-xs">limithral820@gmail.com</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-3.5 h-3.5 text-brand-success" />
                    <div>
                      <span className="text-brand-muted block text-[9px] font-semibold">PHONE</span>
                      <strong className="text-white text-xs">+91 6238466323</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom connect badges */}
              <div className="pt-5 border-t border-white/5 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com/Limithra2006"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
                    className="p-2 rounded-lg bg-white/5 border border-white/5 text-brand-muted hover:text-brand-cyan hover:border-brand-cyan/25 transition-all cursor-none"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/limithra-shanmugam"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
                    className="p-2 rounded-lg bg-white/5 border border-white/5 text-brand-muted hover:text-brand-cyan hover:border-brand-cyan/25 transition-all cursor-none"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="text-right">
                  <span className="text-[9px] font-mono text-brand-muted uppercase block">Connection</span>
                  <span className="text-[8px] font-mono text-brand-success uppercase animate-pulse">● SSL ACTIVE</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
