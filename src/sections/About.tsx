import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ScrollReveal } from '../components/ScrollReveal';
import { Quote } from 'lucide-react';

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="about" ref={containerRef} className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <motion.div style={{ y: textY }} className="order-2 lg:order-1">
            <ScrollReveal direction="left">
              <span className="text-sm uppercase tracking-widest text-[var(--neon-purple)] mb-4 block">
                The Vision
              </span>
              <h2 className="font-['Orbitron'] text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
                <span className="neon-text-glow">XanthanL</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.2}>
              <div className="space-y-6 text-white/70 leading-relaxed">
                <p className="text-lg">
                  XanthanL is an independent artist crafting sonic landscapes at the intersection 
                  of synth-pop, disco, and neo-psychedelia. 
                </p>
                <p>
                  With a signature sound defined by hypnotic phasing effects, groovy basslines, 
                  and ethereal male vocals, the project invites listeners into a dreamy, 
                  lo-fi universe.
                </p>
                <p>
                  "Electric Mirage" marks the beginning of this journey—a collection 
                  that blends 80s disco energy with modern, immersive production.
                </p>
              </div>
            </ScrollReveal>

            {/* Quote */}
            <ScrollReveal delay={0.4}>
              <div className="mt-10 p-6 border-l-2 border-[var(--neon-pink)] bg-gradient-to-r from-[var(--neon-pink)]/5 to-transparent">
                <Quote className="w-8 h-8 text-[var(--neon-pink)] mb-4" />
                <blockquote className="text-xl md:text-2xl font-['Space_Grotesk'] italic text-white/90 mb-4">
                  "The music is a mirage—a fleeting, beautiful glitch in the reality of sound. 
                  It's about the rhythm that keeps you moving and the dreams that keep you drifting."
                </blockquote>
                <cite className="text-sm text-white/50 not-italic">
                  — XanthanL
                </cite>
              </div>
            </ScrollReveal>
          </motion.div>

          {/* Image */}
          <motion.div style={{ y: imageY }} className="order-1 lg:order-2">
            <ScrollReveal direction="right">
              <div className="relative">
                {/* Main image */}
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                  <img
                    src="images/about-mask.jpg"
                    alt="Blood Cultures - The Mask"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon-purple)]/10 via-transparent to-[var(--neon-blue)]/10" />
                  </div>

                  {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-black/90 backdrop-blur-sm border border-white/10 rounded-full"
                >
                  <span className="text-sm uppercase tracking-widest text-white/80">
                    2026
                  </span>
                </motion.div>
              </div>
            </ScrollReveal>
          </motion.div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--neon-purple)]/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />
    </section>
  );
}
