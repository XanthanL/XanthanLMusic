import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/ScrollReveal';

const albums = [
  {
    id: 1,
    title: 'Electric Mirage',
    year: '2024',
    image: '/images/album-uncertainty.jpg',
    description: 'A hypnotic fusion of synth-pop and neo-psychedelia. Explore the shimmering textures of disco-infused rhythms and ethereal soundscapes.',
    tracks: [
      { name: 'Electric Mirage', type: 'Single' },
      { name: 'Glass Candle', type: 'Single' },
      { name: 'Les Nuits', type: 'Single' },
      { name: 'Midnight Chill', type: 'Single' },
      { name: 'spring 2 summer', type: 'Single' }
    ],
    musicUrl: 'https://music.163.com/#/album?id=373726685',
    platform: 'NetEase Cloud Music',
  },
];

function AlbumCard({ album }: { album: typeof albums[0] }) {
  return (
    <StaggerItem>
      <motion.div
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="group relative max-w-lg mx-auto bg-white/[0.02] border border-white/5 p-8 rounded-2xl backdrop-blur-sm"
      >
        {/* Album cover */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-[var(--dark-card)] shadow-2xl">
          <motion.img
            src={album.image}
            alt={album.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
          
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <motion.a
              href={album.musicUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 rounded-full bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] flex items-center justify-center animate-neon-pulse shadow-[0_0_30px_rgba(176,38,255,0.5)]"
            >
              <Play className="w-10 h-10 text-white ml-1" fill="white" />
            </motion.a>
          </div>
        </div>
        
        {/* Album info */}
        <div className="mt-8 text-center">
          <h3 className="font-['Orbitron'] text-3xl font-bold text-white mb-2">
            {album.title}
          </h3>
          <p className="text-white/40 text-sm mb-8 uppercase tracking-widest">{album.year}</p>
          
          <p className="text-white/60 leading-relaxed mb-10 max-w-sm mx-auto italic">
            {album.description}
          </p>
          
          {/* Tracklist */}
          <div className="space-y-4 mb-12 text-left max-w-xs mx-auto">
            {album.tracks.map((track, i) => (
              <div key={i} className="flex items-center gap-6 group/track">
                <span className="text-[10px] text-white/20 font-['Orbitron']">0{i + 1}</span>
                <span className="text-white/80 font-light tracking-wide group-hover/track:text-[var(--neon-purple)] transition-colors">{track.name}</span>
              </div>
            ))}
          </div>
          
          {/* Main CTA - Subtle */}
          <motion.a
            href={album.musicUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            className="ghost-button rounded-full w-full py-4 text-xs tracking-[0.2em]"
          >
            LISTEN
          </motion.a>
        </div>
      </motion.div>
    </StaggerItem>
  );
}

export function Music() {
  return (
    <section id="music" className="section-padding relative">
      <div className="container-custom">
        {/* Section header */}
        <ScrollReveal className="mb-16">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h2 className="font-['Orbitron'] text-4xl md:text-5xl lg:text-6xl font-bold">
                <span className="neon-text-glow">Music</span>
              </h2>
            </div>
            <p className="text-white/60 max-w-md text-right hidden md:block">
              Synth-pop drenched in 80s disco drums and neo-psychedelic textures. Phasing effects and ethereal vocals define the sound of XanthanL.
            </p>
          </div>
        </ScrollReveal>
        
        {/* Albums grid */}
        <StaggerContainer className="flex justify-center">
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </StaggerContainer>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[var(--neon-purple)]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
    </section>
  );
}
