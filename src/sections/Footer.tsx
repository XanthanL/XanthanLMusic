import { ScrollReveal } from '../components/ScrollReveal';

const relatedWorks = [
  { label: 'Diagonal Art', href: 'https://www.diagonal-art.com/' },
  { label: 'XanthanL', href: 'https://xanthanl.github.io/' },
  { label: 'ARH', href: 'https://xanthanl.github.io/ARH' },
  { label: 'Shuyan Travel', href: 'https://xanthanl.github.io/shuyan-travel/' },
  { label: 'PicMark Studio', href: 'https://xanthanl.github.io/picmark-studio/' },
  { label: 'PicMark Studio (Vercel)', href: 'https://picmark-studio.vercel.app/' },
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
            <div className="max-w-xl mx-auto space-y-4 mb-8 text-white/60 leading-relaxed">
              <p>
                XanthanL is a synthetic phantom drifting between sound, image, and code —
                a solo project born from neon-lit dreams and late-night experiments.
              </p>
              <p>
                Behind the mask lies a restless creator: the same hands that shape
                synth-pop mirages have built visual worlds, architectural sketches,
                travel memories, and digital tools. Each project is a fragment of the
                same obsession — capturing fleeting beauty in structured form.
              </p>
              <p className="text-white/40 text-sm italic">
                Follow the signals. Not everything is meant to be understood.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Related Works */}
        <ScrollReveal delay={0.2}>
          <div className="max-w-3xl mx-auto mb-16">
            <h3 className="text-xs uppercase tracking-[0.3em] text-white/30 mb-6 text-center">
              More Works
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {relatedWorks.map((work) => (
                <a
                  key={work.href}
                  href={work.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs text-white/60 border border-white/10 rounded-full hover:border-[var(--neon-purple)] hover:text-[var(--neon-purple)] hover:bg-[var(--neon-purple)]/5 transition-all duration-300"
                >
                  {work.label}
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>

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
