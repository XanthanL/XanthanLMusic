export interface Song {
  id: string;
  title: string;
  artist: string;
  src: string;      // 对应 public/music/ 中的音频文件名
  cover: string;    // 专辑封面图片链接或本地路径
  duration: string; // 歌曲时长展示
  lyrics?: string;  // LRC 格式歌词
}

export const XANTHANL_PLAYLIST: Song[] = [
  {
    id: "1",
    title: "XanthanL's Theme",
    artist: "XanthanL",
    src: "/music/theme.mp3", // 请确保 public/music/theme.mp3 存在
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=600&auto=format&fit=crop",
    duration: "03:45",
    lyrics: "[00:00.00]XanthanL's Theme\n[00:04.00]作曲 : XanthanL\n[00:08.00]编曲 : XanthanL\n[00:12.00]欢迎来到我的音乐世界\n[00:18.00]感受旋律的律动...\n[00:24.00]这是属于我们的空间"
  },
  {
    id: "2",
    title: "午夜极光 (Midnight Aurora)",
    artist: "XanthanL",
    src: "/music/midnight_aurora.mp3", // 请确保 public/music/midnight_aurora.mp3 存在
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop",
    duration: "04:12",
    lyrics: "[00:00.00]午夜极光\n[00:05.00]制作人 : XanthanL\n[00:15.00]极光在夜空中交织\n[00:25.00]音符在黑暗中闪烁"
  }
];
