# XanthanL 个人音乐主页 (XanthanL Music)

欢迎来到 XanthanL 的专属音乐空间！这是一个为展示 XanthanL 个人音乐作品而量身定制的现代、美观、沉浸式的音乐播放与分享平台。

## 🎵 音乐资源配置

您的音乐文件已安全存放在本地目录：
`XanthanLMusic/public/music/`

### 如何添加和呈现新歌：
1. **放置音频文件**：将您的音乐作品（支持 `.mp3`, `.wav`, `.flac` 等格式）放入 `public/music/` 文件夹中。
2. **配置音乐元数据**：在前端应用（如 `apps/web/config/music.ts`）中注册您的歌曲信息。例如：
   ```typescript
   export const playlist = [
     {
       id: "1",
       title: "我的第一首单曲",
       artist: "XanthanL",
       src: "/music/song1.mp3", // 对应 public/music/song1.mp3
       cover: "/images/covers/album1.jpg",
       lyrics: "[00:00.00] 歌词开始..."
     }
   ];
   ```

## 🚀 技术栈

*   **前端框架**: Next.js 14 (React)
*   **样式与动画**: Tailwind CSS + Framer Motion (实现黑胶唱片旋转与丝滑过渡)
*   **音频引擎**: Howler.js / HTML5 Audio API (保障流畅的音频流与播放控制)
*   **组件库**: Shadcn UI + Lucide Icons

## 🛠️ 快速开始

### 1. 安装依赖
在项目根目录下执行：
