import React, { useState, useRef, useEffect } from 'react';
import { Song, XANTHANL_PLAYLIST } from '../config/music';

export default function Player() {
  const [playlist] = useState<Song[]>(XANTHANL_PLAYLIST);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [parsedLyrics, setParsedLyrics] = useState<{ time: number; text: string }[]>([]);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentSong = playlist[currentIndex];

  // 解析 LRC 歌词
  useEffect(() => {
    if (!currentSong?.lyrics) {
      setParsedLyrics([]);
      return;
    }
    const lines = currentSong.lyrics.split('\n');
    const lyricsArr = lines
      .map((line) => {
        const match = line.match(/\[(\d+):(\d+)\.(\d+)\](.*)/);
        if (match) {
          const minutes = parseInt(match[1], 10);
          const seconds = parseInt(match[2], 10);
          const time = minutes * 60 + seconds;
          const text = match[4].trim();
          return { time, text };
        }
        return null;
      })
      .filter((item): item is { time: number; text: string } => item !== null);
    setParsedLyrics(lyricsArr);
  }, [currentSong]);

  // 监听播放进度更新歌词高亮
  useEffect(() => {
    if (parsedLyrics.length === 0) return;
    const index = parsedLyrics.findIndex(
      (lyric, i) =>
        currentTime >= lyric.time &&
        (i === parsedLyrics.length - 1 || currentTime < parsedLyrics[i + 1].time)
    );
    if (index !== -1) {
      setCurrentLyricIndex(index);
    }
  }, [currentTime, parsedLyrics]);

  // 播放/暂停控制
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => console.log("播放失败:", err));
    }
    setIsPlaying(!isPlaying);
  };

  // 切歌
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(false);
  };

  // 进度条更新
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.log(err));
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  // 格式化时间
  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-neutral-950 text-white font-sans">
      {/* 动态毛玻璃背景 */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out scale-110 blur-3xl opacity-30"
        style={{ backgroundImage: `url(${currentSong?.cover})` }}
      />

      {/* 播放器主体容器 */}
      <div className="relative z-10 w-full max-w-4xl px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
        
        {/* 左侧：黑胶唱片视觉区 */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative group">
            {/* 唱片外圈 */}
            <div className={`w-64 h-64 md:w-80 md:h-80 rounded-full bg-neutral-900 p-12 shadow-2xl border-4 border-neutral-800 flex items-center justify-center transition-transform duration-1000 ${isPlaying ? 'animate-spin [animation-duration:20s]' : ''}`}>
              {/* 唱片内圈与封面 */}
              <div 
                className="w-full h-full rounded-full bg-cover bg-center border-4 border-black"
                style={{ backgroundImage: `url(${currentSong?.cover})` }}
              />
              {/* 唱片中心孔 */}
              <div className="absolute w-6 h-6 bg-neutral-950 rounded-full border-2 border-neutral-800" />
            </div>
          </div>

          {/* 歌曲信息 */}
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold tracking-wide">{currentSong?.title}</h1>
            <p className="text-neutral-400 mt-1 text-sm md:text-base">{currentSong?.artist}</p>
          </div>
        </div>

        {/* 右侧：控制面板与歌词 */}
        <div className="flex flex-col h-full justify-between space-y-8">
          
          {/* 歌词滚动显示区 */}
          <div className="h-48 overflow-y-auto scrollbar-none flex flex-col items-center justify-center text-center space-y-4 mask-image-fade">
            {parsedLyrics.length > 0 ? (
              <div className="transition-all duration-500 transform translate-y-2">
                <p className="text-lg md:text-xl font-medium text-emerald-400 transition-all duration-300">
                  {parsedLyrics[currentLyricIndex]?.text || "🎵 ~~~ 🎵"}
                </p>
                <p className="text-sm text-neutral-500 mt-2">
                  {parsedLyrics[currentLyricIndex + 1]?.text || ""}
                </p>
              </div>
            ) : (
              <p className="text-neutral-500 italic">暂无歌词信息</p>
            )}
          </div>

          {/* 进度条 */}
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <div className="flex justify-between text-xs text-neutral-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* 播放控制按钮 */}
          <div className="flex items-center justify-center space-x-8">
            {/* 上一首 */}
            <button onClick={handlePrev} className="p-3 rounded-full hover:bg-white/10 transition text-neutral-300 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6L18 6v12z"/>
              </svg>
            </button>

            {/* 播放/暂停 */}
            <button onClick={togglePlay} className="p-5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black transition transform hover:scale-105 shadow-lg">
              {isPlaying ? (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>

            {/* 下一首 */}
            <button onClick={handleNext} className="p-3 rounded-full hover:bg-white/10 transition text-neutral-300 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6zm9-12v12h2V6z"/>
              </svg>
            </button>
          </div>

          {/* 音量控制 */}
          <div className="flex items-center justify-center space-x-3">
            <svg className="w-5 h-5 text-neutral-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>

        </div>
      </div>

      {/* 隐藏的 Audio 标签 */}
      <audio
        ref={audioRef}
        src={currentSong?.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleNext}
      />
    </div>
  );
}
