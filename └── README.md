
## 2. 技术栈与视觉选型
为了让页面显得极其“美观”且富有艺术感，我们采用以下技术栈：

*   **视觉与样式 (Design & Styling):**
    *   **Tailwind CSS**: 快速实现响应式设计，支持深色模式（Dark Mode，音乐网站标配）。
    *   **Framer Motion**: 用于实现黑胶唱片旋转、歌词渐显、页面切换等丝滑的动效。
    *   **Shadcn UI / Radix UI**: 提供无障碍、高定制性的精美基础组件。
*   **前端框架 (Frontend):**
    *   **Next.js (React)**: 支持服务端渲染 (SSR)，让音乐主页秒开。
*   **音频处理 (Audio):**
    *   **Howler.js** 或 **Wavesurfer.js**: 用于实现专业的音频播放控制及波形可视化。
*   **后端与存储 (Backend & Storage):**
    *   **Supabase / Vercel Postgres**: 存储音乐列表、歌词、访客留言。
    *   **Vercel Blob / AWS S3**: 托管高品质音频文件 (MP3/FLAC) 和专辑封面。

## 3. 核心功能模块
1.  **沉浸式音乐播放器**: 支持播放/暂停、切歌、进度条拖动、音量调节，以及后台播放。
2.  **黑胶唱片/专辑墙**: 3D 倾斜悬停效果的专辑封面展示。
3.  **动态歌词同步**: 随音乐播放进度高亮滚动显示歌词。
4.  **关于 XanthanL**: 个人简介、音乐理念、社交媒体（SoundCloud, Spotify, Bilibili 等）快捷链接。

## 4. 后续步骤
1. 初始化 `apps/web` 目录并安装 Next.js 与 Tailwind CSS。
2. 设计并实现第一版“黑胶唱片播放器”组件。
3. 导入 XanthanL 的首批音乐作品与封面素材。
