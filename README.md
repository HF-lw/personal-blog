# 罗旺 · 个人博客 & 作品集

一个**现代渐变 · 毛玻璃**风格的个人网站，含作品集与迷你博客。
纯静态（HTML + CSS + 原生 JS），**无需安装、无需构建**，双击即可预览，也能一键部署到 GitHub Pages / Vercel。

> 内容已换成罗旺本人的真实资料（电子科学与技术 · 求职数据标注 / AI 训练师）。
> 想继续维护（改文字、加项目、写文章）时，看下面的指南即可——**90% 的修改只发生在一个文件里**。

---

## 🚀 三种打开方式

1. **本地预览（最简单）**：直接双击 `index.html`，浏览器即可打开。
2. **本地服务器（推荐，体验更佳）**：在项目根目录运行
   ```bash
   # 任选其一
   python -m http.server 8000        # 然后访问 http://localhost:8000
   npx serve                          # Node 环境
   ```
3. **VS Code**：安装 “Live Server” 插件，右键 `index.html` → Open with Live Server。

---

## ✏️ 如何替换成你自己的内容

### 第一步：改资料（最重要）
打开 **`js/data.js`**，这里集中了**几乎所有可改内容**。它分成几块：

| 区块 | 改什么 |
|------|--------|
| `site` | 你的名字、头衔、标语、邮箱、所在地、社交链接、首页数字 |
| `skillGroups` | 技能分组与百分比（进度条） |
| `stack` | 技能小标签云 |
| `timeline` | 关于页的经历时间线 |
| `projects` | 作品集卡片（标题、描述、标签、链接、封面渐变） |
| `posts` | 博客文章（标题、日期、正文等） |

> 每一项旁边都有中文注释，照着改就行。改完**刷新页面**即可看到效果。

### 第二步：写一篇新文章
在 `js/data.js` 的 `posts` 数组里**复制一项**，然后修改：

```js
{
  slug: "my-first-post",            // 网址标识，英文/数字/连字符，需唯一
  title: "我的第一篇文章",
  category: "随笔",                  // 分类（会自动变成筛选标签）
  date: "2026-06-10",               // 年-月-日
  readMins: 5,                       // 预计阅读分钟
  glyph: "My",                       // 封面上的字
  gradient: "linear-gradient(135deg,#6366f1,#a855f7,#ec4899)",
  tags: ["随笔", "生活"],
  excerpt: "一句话摘要，会显示在卡片上。",
  body: `
    <p>正文用 HTML 写。段落用 p 标签。</p>
    <h2>小标题</h2>
    <p>支持 <strong>加粗</strong>、列表、引用、代码块等。</p>
  `
}
```
文章链接会自动生成为 `post.html?slug=my-first-post`，无需手动建页面。

### 第三步（可选）：改名字与浏览器标签标题
- 各页 `<head>` 里的 `<title>` 和 `<meta name="description">` 可改成你的信息。
- 头像/Logo 显示的字：在 `data.js` 的 `site.initials`、`site.avatarGlyph`，
  以及 `about.html` 里的 `<div class="avatar-glyph">星</div>` 处修改。

---

## 🎨 换配色（可选）

主题色集中在 **`css/style.css`** 顶部的 `:root` 变量里。改这三行就能换整站主色调：

```css
--grad: linear-gradient(135deg, #6366f1 0%, #a855f7 45%, #ec4899 100%);
--c-indigo: #6366f1;
--c-violet: #a855f7;
--c-pink:   #ec4899;
```

亮/暗两套主题已内置，右上角按钮即可切换，会自动记住你的选择。

---

## 📁 文件结构

```
personal-blog/
├── index.html         首页（Hero / 精选作品 / 技能 / 最新文章）
├── projects.html      作品集
├── blog.html          博客列表（含头条 + 标签筛选）
├── post.html          文章阅读页（?slug= 动态渲染）
├── about.html         关于页（简介 / 数据 / 时间线 / 技能）
├── css/
│   ├── style.css      设计令牌 / 布局 / 导航 / 页脚 / 动效
│   └── components.css 卡片 / Hero / 技能 / 时间线 / 文章排版
├── js/
│   ├── data.js        ★ 你的内容都在这里 ★
│   └── main.js        交互与渲染引擎（一般无需改动）
└── README.md
```

---

## ☁️ 部署上线

### GitHub Pages（免费）
1. 新建一个 GitHub 仓库，把本文件夹所有内容推上去。
2. 仓库 → **Settings → Pages → Branch 选 `main` / 根目录 → Save**。
3. 等一两分钟，访问 `https://你的用户名.github.io/仓库名/` 即可。

### Vercel / Netlify（更快）
- 直接把文件夹拖到 [vercel.com](https://vercel.com) 或 [app.netlify.com/drop](https://app.netlify.com/drop)，
  无需任何配置，几秒钟出网址。

---

## 💡 小贴士

- **字体**来自 Google Fonts，离线时会自动回退到系统字体，不影响使用。
- 想加页面或大改布局，结构都很清晰，跟着现有写法照葫芦画瓢即可。
- 全站无后端、无追踪、无 Cookie，纯净、安全、可托管在任何静态空间。

祝你用得开心，求职顺利！🎉
