/* ============================================================
   data.js — 站点数据（示例占位内容）
   ------------------------------------------------------------
   ★★★ 这里就是你要替换的地方 ★★★
   全部内容都是演示用的「陈星河 / Stellar」虚构人物，
   把下面的文字、项目、文章换成你自己的即可，无需改动其它文件。
   （详细替换说明见 README.md）
   ============================================================ */
window.SITE_DATA = {

  /* ---------- 站点基础信息 ---------- */
  site: {
    name: "陈星河",                       // 你的名字
    initials: "星",                        // Logo 里显示的字（1个字或字母）
    role: "创意开发者 · 设计工程师",        // 一句话头衔
    tagline: "把想法变成会呼吸的界面。",     // 标语
    email: "hello@example.com",            // 联系邮箱（示例）
    location: "中国 · 重庆",
    avatarGlyph: "星",                     // 头像里的大字
    resumeUrl: "#",                        // 简历下载链接（可留 #）
    socials: [
      { name: "GitHub",  url: "https://github.com",   icon: "github" },
      { name: "邮箱",     url: "mailto:hello@example.com", icon: "mail" },
      { name: "微博",     url: "#", icon: "weibo" },
      { name: "稀土掘金",  url: "#", icon: "pen" }
    ],
    stats: [
      { num: 28, suffix: "+", label: "完成项目" },
      { num: 40, suffix: "+", label: "技术文章" },
      { num: 3,  suffix: "年", label: "实践经验" },
      { num: 12, suffix: "k", label: "累计阅读" }
    ]
  },

  /* ---------- 技能 ---------- */
  skillGroups: [
    {
      title: "前端工程",
      icon: "code",
      skills: [
        { name: "HTML / CSS", pct: 95 },
        { name: "JavaScript / TS", pct: 90 },
        { name: "React / Vue", pct: 85 }
      ]
    },
    {
      title: "设计 & 动效",
      icon: "palette",
      skills: [
        { name: "UI / 视觉设计", pct: 88 },
        { name: "动效 / 交互", pct: 82 },
        { name: "Figma", pct: 90 }
      ]
    },
    {
      title: "工程能力",
      icon: "rocket",
      skills: [
        { name: "Node.js", pct: 78 },
        { name: "性能优化", pct: 80 },
        { name: "Git / 协作", pct: 92 }
      ]
    }
  ],

  // 技能小标签云
  stack: [
    "React", "Vue", "TypeScript", "Vite", "Tailwind",
    "Node.js", "Three.js", "GSAP", "Figma", "Python", "Git", "Webpack"
  ],

  /* ---------- 时间线（关于页） ---------- */
  timeline: [
    {
      date: "2025 — 至今",
      title: "自由职业 · 独立开发",
      org: "Freelance",
      desc: "为初创团队提供从设计到落地的一站式前端方案，专注界面美感与交互体验。"
    },
    {
      date: "2023 — 2025",
      title: "前端开发工程师",
      org: "某科技公司（示例）",
      desc: "负责核心产品 Web 端开发与组件库建设，推动页面性能与可维护性的持续优化。"
    },
    {
      date: "2022 — 2023",
      title: "Web 前端实习",
      org: "某互联网公司（示例）",
      desc: "参与营销活动页与数据看板开发，积累工程化与跨团队协作经验。"
    },
    {
      date: "2018 — 2022",
      title: "计算机相关专业 · 本科",
      org: "某大学（示例）",
      desc: "系统学习计算机基础与软件工程，期间持续做个人项目并撰写技术博客。"
    }
  ],

  /* ---------- 项目作品 ---------- */
  // gradient: 卡片封面渐变（用 CSS 渐变字符串）
  projects: [
    {
      slug: "aurora-ui",
      title: "Aurora 设计系统",
      category: "Design System",
      glyph: "Au",
      gradient: "linear-gradient(135deg,#6366f1,#a855f7,#ec4899)",
      desc: "一套以毛玻璃和渐变为核心的现代组件库，含 40+ 可定制组件与暗色主题。",
      tags: ["React", "TypeScript", "Storybook"],
      featured: true,
      url: "#",
      repo: "#"
    },
    {
      slug: "nebula-dashboard",
      title: "Nebula 数据看板",
      category: "Web App",
      glyph: "Ne",
      gradient: "linear-gradient(135deg,#22d3ee,#6366f1,#a855f7)",
      desc: "实时数据可视化平台，支持自定义图表、拖拽布局与多端自适应。",
      tags: ["Vue", "ECharts", "WebSocket"],
      featured: true,
      url: "#",
      repo: "#"
    },
    {
      slug: "motion-lab",
      title: "Motion Lab 动效实验室",
      category: "Creative",
      glyph: "ML",
      gradient: "linear-gradient(135deg,#f472b6,#a855f7,#6366f1)",
      desc: "收集与复刻精彩 Web 动效的开源合集，每个案例都附带可复制的代码。",
      tags: ["GSAP", "Three.js", "Canvas"],
      featured: true,
      url: "#",
      repo: "#"
    },
    {
      slug: "pocket-notes",
      title: "Pocket 笔记",
      category: "Productivity",
      glyph: "Pk",
      gradient: "linear-gradient(135deg,#34d399,#22d3ee,#6366f1)",
      desc: "极简本地优先的 Markdown 笔记应用，支持双链、标签与离线使用。",
      tags: ["React", "IndexedDB", "PWA"],
      featured: false,
      url: "#",
      repo: "#"
    },
    {
      slug: "palette-pick",
      title: "PalettePick 取色器",
      category: "Tool",
      glyph: "Pp",
      gradient: "linear-gradient(135deg,#fbbf24,#f472b6,#a855f7)",
      desc: "面向设计师的智能配色工具，一键生成无障碍对比度达标的渐变方案。",
      tags: ["TypeScript", "Color", "a11y"],
      featured: false,
      url: "#",
      repo: "#"
    },
    {
      slug: "story-flow",
      title: "StoryFlow 博客引擎",
      category: "Open Source",
      glyph: "Sf",
      gradient: "linear-gradient(135deg,#818cf8,#c084fc,#f472b6)",
      desc: "零配置的静态博客生成器，Markdown 即写即得，主题优雅且高度可定制。",
      tags: ["Node.js", "Markdown", "SSG"],
      featured: false,
      url: "#",
      repo: "#"
    }
  ],

  /* ---------- 博客文章 ---------- */
  // body 为 HTML 字符串，按 .prose 排版渲染
  posts: [
    {
      slug: "glassmorphism-guide",
      title: "毛玻璃设计完全指南：从原理到落地",
      category: "设计",
      date: "2026-05-28",
      readMins: 8,
      glyph: "Gl",
      gradient: "linear-gradient(135deg,#6366f1,#a855f7,#ec4899)",
      tags: ["设计", "CSS", "UI"],
      excerpt: "毛玻璃（Glassmorphism）不只是加个模糊那么简单。本文拆解它的视觉层级、对比度与性能取舍，并给出可直接复用的代码片段。",
      body: `
<p>毛玻璃风格之所以迷人，在于它在「通透」与「层次」之间找到了平衡：背景透出来，但又不至于喧宾夺主。要做好它，核心是三件事——<strong>背景模糊、半透明填充、细腻的边框高光</strong>。</p>
<h2>一、最小可用配方</h2>
<p>一个合格的玻璃卡片，只需要四行关键属性：</p>
<pre><code>.glass {
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 18px;
}</code></pre>
<p>注意 <code>backdrop-filter</code> 需要同时写 <code>-webkit-</code> 前缀以兼容 Safari。</p>
<h2>二、可读性是底线</h2>
<p>玻璃面板最大的陷阱是<strong>文字对比度不足</strong>。建议给面板背后铺一层足够暗（或足够亮）的渐变，并保证正文对比度不低于 WCAG AA 的 4.5:1。</p>
<blockquote>好看与可用从来不是单选题。先保证能读清楚，再谈氛围感。</blockquote>
<h2>三、性能取舍</h2>
<p><code>blur()</code> 是 GPU 合成开销较大的属性。页面里玻璃层不宜过多，移动端可适当降低模糊半径。给会动的元素加上 <code>will-change: transform</code> 能减少重绘抖动。</p>
<h3>小结</h3>
<p>毛玻璃是「克制」的艺术：模糊、透明、高光三者配比得当，界面就会自然透出高级感。把上面的配方收进你的组件库，下次三分钟就能搭出一张漂亮的玻璃卡。</p>
`
    },
    {
      slug: "css-gradient-art",
      title: "用纯 CSS 画出会流动的渐变背景",
      category: "前端",
      date: "2026-05-12",
      readMins: 6,
      glyph: "Gr",
      gradient: "linear-gradient(135deg,#22d3ee,#6366f1,#a855f7)",
      tags: ["前端", "CSS", "动效"],
      excerpt: "不用一行 JavaScript，也能让背景里的极光缓缓流动。聊聊径向渐变、模糊光斑与关键帧的组合拳。",
      body: `
<p>本站的背景就是纯 CSS 实现的——三团径向渐变光斑，叠加缓慢的位移动画，再用大半径模糊把边缘揉开，极光感就出来了。</p>
<h2>核心思路</h2>
<p>用伪元素承载光斑，固定定位铺满视口，然后让它在 <code>@keyframes</code> 里慢慢漂移：</p>
<pre><code>body::before {
  content: "";
  position: fixed;
  width: 60vw; height: 60vw;
  background: radial-gradient(circle, #7c3aed, transparent 62%);
  filter: blur(90px);
  animation: drift 22s ease-in-out infinite alternate;
}
@keyframes drift {
  to { transform: translate(8vw, 10vh) scale(1.12); }
}</code></pre>
<h2>三团光的配色</h2>
<p>选三种相邻色相（如靛蓝 → 紫 → 粉），让它们在不同角落漂移、节奏各不相同，叠加后就会不断产生新的色彩过渡，永远不重复。</p>
<h3>记得照顾「减少动态」偏好</h3>
<p>用 <code>@media (prefers-reduced-motion: reduce)</code> 关掉动画，是对前庭敏感用户的基本尊重。</p>
`
    },
    {
      slug: "frontend-performance",
      title: "前端性能优化：我常用的 7 个高性价比手段",
      category: "工程",
      date: "2026-04-20",
      readMins: 10,
      glyph: "Pf",
      gradient: "linear-gradient(135deg,#f472b6,#a855f7,#6366f1)",
      tags: ["工程", "性能"],
      excerpt: "性能优化不必一上来就上重武器。这份清单从「改一行就有效」开始，覆盖加载、渲染与运行时三个层面。",
      body: `
<p>性能优化最忌讳「为优化而优化」。先用 Lighthouse 量出瓶颈，再对症下药。下面是我在真实项目里反复验证过的 7 个手段，按性价比排序。</p>
<h2>加载层</h2>
<ul>
<li><strong>图片懒加载</strong>：给非首屏图片加 <code>loading="lazy"</code>，几乎零成本。</li>
<li><strong>字体优化</strong>：<code>font-display: swap</code> 避免文字不可见；只加载需要的字重。</li>
<li><strong>资源预连接</strong>：对关键第三方域名用 <code>&lt;link rel="preconnect"&gt;</code>。</li>
</ul>
<h2>渲染层</h2>
<ul>
<li><strong>避免布局抖动</strong>：批量读写 DOM，别在循环里交替触发 reflow。</li>
<li><strong>合成层提升</strong>：动画只动 <code>transform</code> 和 <code>opacity</code>。</li>
</ul>
<h2>运行时</h2>
<ul>
<li><strong>防抖与节流</strong>：滚动、输入、resize 事件务必包一层。</li>
<li><strong>虚拟列表</strong>：长列表只渲染可视区域。</li>
</ul>
<blockquote>先测量，再优化，最后再测量验证。没有数据的优化都是猜。</blockquote>
`
    },
    {
      slug: "design-to-code",
      title: "从设计稿到代码：我如何还原 100% 的细节",
      category: "设计",
      date: "2026-03-30",
      readMins: 7,
      glyph: "Dc",
      gradient: "linear-gradient(135deg,#34d399,#22d3ee,#6366f1)",
      tags: ["设计", "前端", "协作"],
      excerpt: "像素级还原靠的不是死磕，而是一套可复用的流程：先对齐设计变量，再搭间距系统，最后处理边界情况。",
      body: `
<p>「还原度」是前端和设计师之间最容易起摩擦的地方。与其逐像素对比，不如把设计语言先翻译成<strong>一套共享的变量</strong>。</p>
<h2>第一步：抽取设计令牌</h2>
<p>把颜色、间距、圆角、阴影、字号都变成 CSS 变量。设计稿改了，只动变量，全站同步。</p>
<h2>第二步：建立间距节奏</h2>
<p>采用 4 或 8 的倍数作为间距基准，页面会自然产生秩序感。用 <code>clamp()</code> 让间距随视口平滑缩放。</p>
<h2>第三步：处理边界情况</h2>
<p>设计稿往往只画了「理想态」。真正考验功力的是：超长文本怎么截断、空数据展示什么、加载和错误态长什么样。</p>
<h3>结语</h3>
<p>高还原度的秘密，是把一次性的「照着画」变成系统化的「按规则生成」。</p>
`
    },
    {
      slug: "indie-hacker-journey",
      title: "独立开发的第一年：我学到的 5 件事",
      category: "随笔",
      date: "2026-02-18",
      readMins: 9,
      glyph: "Ih",
      gradient: "linear-gradient(135deg,#fbbf24,#f472b6,#a855f7)",
      tags: ["随笔", "成长"],
      excerpt: "从写代码到对自己负责，独立开发逼着我把产品、营销和自律都补了一遍。记录这一年踩过的坑和想通的事。",
      body: `
<p>过去一年我尝试独立做产品，收入起伏、心态过山车，但成长是实打实的。挑五件最重要的分享出来。</p>
<h2>1. 先卖，再造</h2>
<p>最贵的教训：埋头三个月做出来的东西没人要。后来学会先用落地页验证需求，再决定要不要写代码。</p>
<h2>2. 完成 &gt; 完美</h2>
<p>能上线的 80 分，远胜永远在打磨的 100 分。把功能切小，快速发布，让真实反馈替你做决策。</p>
<h2>3. 写作就是复利</h2>
<p>持续写技术博客带来的信任和流量，是任何一次性广告都换不来的。这个网站就是我的「主场」。</p>
<h2>4. 自律靠系统，不靠意志</h2>
<p>固定的工作节奏、清晰的待办、可见的进度，比每天和自己较劲有效得多。</p>
<h2>5. 照顾好身体</h2>
<p>一个人撑全栈，健康是唯一不能外包的基础设施。</p>
<blockquote>独立开发不是逃离打工，而是把全部责任都揽到自己身上。累，但很真实。</blockquote>
`
    },
    {
      slug: "learning-to-learn",
      title: "高效学习新技术的一套方法论",
      category: "成长",
      date: "2026-01-22",
      readMins: 6,
      glyph: "Lr",
      gradient: "linear-gradient(135deg,#818cf8,#c084fc,#f472b6)",
      tags: ["成长", "方法论"],
      excerpt: "技术更新太快，与其追着学，不如建立一套能迁移的学习框架。聊聊我的「主干—验证—输出」三步法。",
      body: `
<p>前端生态每年都在变，焦虑是常态。我的解法不是学得更多，而是学得<strong>更有结构</strong>。</p>
<h2>第一步：先抓主干</h2>
<p>任何新框架，先搞清它要解决什么问题、核心心智模型是什么。主干清楚了，枝叶查文档即可。</p>
<h2>第二步：动手验证</h2>
<p>读十篇不如写一个 Demo。带着具体问题去用，理解会深刻得多。</p>
<h2>第三步：输出倒逼输入</h2>
<p>把学到的写成博客或讲给别人听。讲不清楚的地方，就是你还没真懂的地方。</p>
<h3>底层逻辑</h3>
<p>具体的 API 会过时，但「如何快速吃透一个新事物」的能力会跟你一辈子。投资后者。</p>
`
    }
  ]
};
