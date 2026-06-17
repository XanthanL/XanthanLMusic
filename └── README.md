
## 2. 本地音乐呈现方案

为了让 `public/music/` 下的音乐自动呈现在网页上，我们采用**静态配置驱动**的设计：

### 1. 静态资源映射
Next.js 会自动将 `public` 目录下的文件映射到根路径。
*   物理路径：`public/music/my-song.mp3`
*   浏览器访问路径：`/music/my-song.mp3`

### 2. 音乐元数据配置 (`apps/web/config/music.ts`)
在前端建立一个轻量级的配置文件，用于绑定音频文件与视觉信息（歌名、封面、歌词）：
