import { motion } from 'framer-motion';
import { Instagram, Twitter, Youtube, Music2 } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  { icon: Music2, href: 'https://spotify.com', label: 'Spotify' },
];

export function Footer() {
  return (
    <footer className="relative pt-20 pb-10 border-t border-white/5">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-purple)]/20 to-transparent pointer-events-none" />
      
      <div className="container-custom relative z-10">
        {/* Main footer content */}
        <div className="flex flex-col items-center text-center mb-16">
          <ScrollReveal>
            {/* Logo */}
            <a href="#" className="inline-block mb-8">
              <span className="font-['Orbitron'] text-3xl md:text-4xl font-bold">
                <span className="neon-text-glow">XANTHAN</span>
                <span className="text-white">L</span>
              </span>
            </a>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-white/60 max-w-md mb-8">
              Independent synth-pop and neo-psychedelic sounds from the mind of XanthanL. 
              Drift into the Electric Mirage.
            </p>
          </ScrollReveal>

          {/* Social links */}
          <ScrollReveal delay={0.2}>
            <div className="flex items-center gap-6 mb-8">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[var(--neon-purple)] hover:border-[var(--neon-purple)] hover:bg-[var(--neon-purple)]/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom footer */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {/* Copyright */}
          <p className="text-[10px] text-white/20 uppercase tracking-widest">
            © 2026 XanthanL
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--neon-purple)]/5 rounded-full blur-3xl pointer-events-none" />
    </footer>
  );
}
