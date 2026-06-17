import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { XANTHANL_PLAYLIST, Song } from '../../apps/web/config/music';

export function Music() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSong = XANTHANL_PLAYLIST[currentIndex];

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.error("Playback failed:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const playSong = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true);
    // Audio src will change, useEffect handles playing
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % XANTHANL_PLAYLIST.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + XANTHANL_PLAYLIST.length) % XANTHANL_PLAYLIST.length);
  };

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(err => console.error("Playback failed:", err));
    }
  }, [currentIndex, isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Intro & Tracklist */}
          <ScrollReveal direction="left" className="space-y-8">
            <div className="space-y-4">
              <h3 className="font-['Orbitron'] text-2xl font-bold text-white">Electric Mirage</h3>
              <p className="text-white/60 max-w-md leading-relaxed">
                Synth-pop drenched in 80s disco drums and neo-psychedelic textures. 
                Phasing effects and ethereal vocals define the sound of XanthanL.
              </p>
              <p className="text-white/40 text-sm italic">
                A hypnotic fusion of synth-pop and neo-psychedelia. Explore the shimmering textures of disco-infused rhythms and ethereal soundscapes.
              </p>
            </div>

            <div className="space-y-2 mt-8">
              {XANTHANL_PLAYLIST.map((song, index) => (
                <motion.div
                  key={song.id}
                  whileHover={{ x: 10 }}
                  onClick={() => playSong(index)}
                  className={`group flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                    currentIndex === index 
                      ? 'bg-white/10 border border-white/20' 
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className={`font-['Orbitron'] text-xs w-6 ${
                    currentIndex === index ? 'text-[var(--neon-purple)]' : 'text-white/20'
                  }`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h4 className={`text-sm font-medium tracking-wide transition-colors ${
                      currentIndex === index ? 'text-white' : 'text-white/70 group-hover:text-white'
                    }`}>
                      {song.title}
                    </h4>
                    <p className="text-[10px] text-white/30 uppercase tracking-widest">{song.artist}</p>
                  </div>
                  {currentIndex === index && isPlaying && (
                    <div className="flex gap-1 items-end h-3">
                      {[1, 2, 3].map(i => (
                        <motion.div
                          key={i}
                          animate={{ height: [4, 12, 4] }}
                          transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                          className="w-0.5 bg-[var(--neon-purple)]"
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* Right Column: Player Interface */}
          <ScrollReveal direction="right">
            <div className="relative group p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--neon-purple)]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10 flex flex-col gap-8">
                {/* Album Cover Area */}
                <div className="relative aspect-square w-full max-w-[320px] mx-auto overflow-hidden rounded-2xl shadow-2xl bg-neutral-900 border border-white/5">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentSong.id}
                      src={currentSong.cover}
                      alt={currentSong.title}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  
                  {/* Playing State Overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <motion.div
                      animate={isPlaying ? { rotate: 360 } : {}}
                      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                      className={`w-3/4 h-3/4 rounded-full border border-white/10 flex items-center justify-center p-4 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <div className="w-full h-full rounded-full border-4 border-white/5 border-dashed" />
                    </motion.div>
                  </div>
                </div>

                {/* Song Info */}
                <div className="text-center space-y-2">
                  <h3 className="font-['Orbitron'] text-2xl font-bold tracking-wider text-white">
                    {currentSong.title}
                  </h3>
                  <p className="text-white/40 text-xs uppercase tracking-[0.3em] font-light">
                    {currentSong.artist}
                  </p>
                </div>

                {/* Controls */}
                <div className="space-y-6">
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max={duration || 100}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[var(--neon-purple)]"
                    />
                    <div className="flex justify-between text-[10px] font-['Orbitron'] text-white/40 tracking-widest">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Main Buttons */}
                  <div className="flex items-center justify-center gap-8">
                    <button 
                      onClick={handlePrev}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      <SkipBack size={24} />
                    </button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={togglePlay}
                      className="w-16 h-16 rounded-full bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] flex items-center justify-center shadow-[0_0_20px_rgba(176,38,255,0.3)]"
                    >
                      {isPlaying ? (
                        <Pause size={28} className="text-white" fill="white" />
                      ) : (
                        <Play size={28} className="text-white ml-1" fill="white" />
                      )}
                    </motion.button>

                    <button 
                      onClick={handleNext}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      <SkipForward size={24} />
                    </button>
                  </div>

                  {/* Volume Control */}
                  <div className="flex items-center gap-3 justify-center text-white/40">
                    <Volume2 size={14} />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value);
                        setVolume(v);
                        if (audioRef.current) audioRef.current.volume = v;
                      }}
                      className="w-24 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white/40"
                    />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
      
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentSong.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleNext}
      />

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[var(--neon-purple)]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
    </section>
  );
}
