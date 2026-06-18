/* ============================================================
   main.js — 行为层
   主题切换 / 导航 / 滚动动效 / 计数器 / 内容渲染引擎
   纯原生 JS，无依赖，file:// 直接可用
   ============================================================ */
(function () {
  "use strict";

  var DATA = window.SITE_DATA || {};
  var doc = document;

  /* ---------- 小工具 ---------- */
  function qs(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function elFrom(html) {
    var t = doc.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function fmtDate(iso) {
    if (!iso) return "";
    var p = String(iso).split("-");
    if (p.length < 3) return iso;
    return p[0] + "年" + parseInt(p[1], 10) + "月" + parseInt(p[2], 10) + "日";
  }
  function currentPage() {
    var path = location.pathname.split("/").pop() || "index.html";
    return path === "" ? "index.html" : path;
  }
  function param(name) {
    var m = new RegExp("[?&]" + name + "=([^&]+)").exec(location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : null;
  }

  /* ---------- 图标库（内联 SVG） ---------- */
  var ICON = {
    sun: '<path d="M12 17a5 5 0 100-10 5 5 0 000 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>',
    moon: '<path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/>',
    arrowUp: '<path d="M12 19V5M5 12l7-7 7 7"/>',
    arrowRight: '<path d="M5 12h14M13 5l7 7-7 7"/>',
    arrowUpRight: '<path d="M7 17L17 7M7 7h10v10"/>',
    github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 00-.9-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0019.9 5 4.9 4.9 0 0019.8 1S18.5.6 15.5 2.5a13.4 13.4 0 00-7 0C5.5.6 4.2 1 4.2 1A4.9 4.9 0 004.1 5 5.2 5.2 0 002.7 8.6c0 5.2 3.2 6.4 6.2 6.7a3.4 3.4 0 00-.9 2.6V22"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/>',
    phone: '<path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8 11.5a16 16 0 006 6l1.2-1.1a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z"/>',
    weibo: '<circle cx="9" cy="14" r="5"/><path d="M17 8a4 4 0 014 4M16 4a8 8 0 018 8"/>',
    pen: '<path d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18M2 2l7.6 7.6"/>',
    code: '<path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>',
    palette: '<circle cx="13.5" cy="6.5" r="1.5"/><circle cx="17.5" cy="10.5" r="1.5"/><circle cx="8.5" cy="7.5" r="1.5"/><circle cx="6.5" cy="12.5" r="1.5"/><path d="M12 2a10 10 0 000 20 2.5 2.5 0 002-4 2.5 2.5 0 012-4h2a4 4 0 004-4 10 10 0 00-14-8z"/>',
    rocket: '<path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2a3 3 0 00-3-3zM12 15l-3-3a16 16 0 016.5-9 13 13 0 015.5-1 13 13 0 01-1 5.5A16 16 0 0112 15zM15 9a1 1 0 100-2 1 1 0 000 2z"/>',
    mapPin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>',
    sparkles: '<path d="M12 3l1.9 4.8L19 9.7l-4.1 2.9L16 18l-4-2.6L8 18l1.1-5.4L5 9.7l5.1-1.9z"/>',
    layers: '<path d="M12 2l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5"/>',
    cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/>'
  };
  function svg(name, cls) {
    return '<svg class="' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (ICON[name] || "") + "</svg>";
  }

  /* ============================================================
     主题
     ============================================================ */
  function initTheme() {
    // 防闪烁脚本已在 <head> 设过 data-theme，这里只接管切换
    var btn = qs(".theme-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var isLight = doc.documentElement.getAttribute("data-theme") === "light";
      var next = isLight ? "dark" : "light";
      if (next === "light") doc.documentElement.setAttribute("data-theme", "light");
      else doc.documentElement.removeAttribute("data-theme");
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  /* ============================================================
     注入共享框架：进度条 / 极光 / 导航 / 返回顶部 / 页脚
     ============================================================ */
  var NAV_LINKS = [
    { href: "index.html", label: "首页" },
    { href: "projects.html", label: "作品" },
    { href: "blog.html", label: "博客" },
    { href: "about.html", label: "关于" }
  ];

  function buildChrome() {
    var site = DATA.site || {};
    var page = currentPage();
    // 阅读单篇文章时，让导航高亮「博客」
    var activePage = (page === "post.html") ? "blog.html" : page;

    // 进度条
    doc.body.insertBefore(elFrom('<div class="scroll-progress" id="scrollProgress"></div>'), doc.body.firstChild);
    // 极光第三团光
    doc.body.insertBefore(elFrom('<div class="aurora"></div>'), doc.body.firstChild);

    // 导航
    var links = NAV_LINKS.map(function (l) {
      var active = (l.href === activePage) ? " is-active" : "";
      return '<a href="' + l.href + '" class="' + active.trim() + '">' + esc(l.label) + "</a>";
    }).join("");

    var nav = elFrom(
      '<nav class="nav" id="nav" aria-label="主导航">' +
        '<a class="nav__brand" href="index.html">' +
          '<span class="nav__logo">' + esc(site.initials || "S") + "</span>" +
          "<span>" + esc(site.name || "Stellar") + "</span>" +
        "</a>" +
        '<div class="nav__links" id="navLinks">' + links + "</div>" +
        '<div class="nav__actions">' +
          '<button class="theme-toggle" aria-label="切换明暗主题">' +
            svg("sun", "icon-sun") + svg("moon", "icon-moon") +
          "</button>" +
          '<button class="nav__burger" id="navBurger" aria-label="菜单" aria-expanded="false">' +
            "<span></span><span></span><span></span>" +
          "</button>" +
        "</div>" +
      "</nav>"
    );
    // 把导航放在 <main> 之前；没有 main 时直接追加
    var main = qs("main");
    if (main) doc.body.insertBefore(nav, main);
    else doc.body.appendChild(nav);

    // 返回顶部
    doc.body.appendChild(elFrom(
      '<button class="to-top" id="toTop" aria-label="返回顶部">' + svg("arrowUp") + "</button>"
    ));

    // 页脚
    var socials = (site.socials || []).map(function (s) {
      return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener" aria-label="' + esc(s.name) + '">' +
        svg(s.icon || "mail") + "</a>";
    }).join("");
    var year = (DATA.meta && DATA.meta.year) || "2026";
    var footer = elFrom(
      '<footer class="footer">' +
        '<div class="container footer__inner">' +
          '<div class="footer__brand">' +
            '<span class="nav__logo">' + esc(site.initials || "S") + "</span>" +
            "<div>" +
              '<div style="font-family:var(--font-display);font-weight:700;font-size:1.1rem">' + esc(site.name || "Stellar") + "</div>" +
              '<div class="footer__tagline">' + esc(site.tagline || "") + "</div>" +
            "</div>" +
          "</div>" +
          '<div class="socials">' + socials + "</div>" +
        "</div>" +
        '<div class="footer__bottom">© ' + esc(year) + " " + esc(site.name || "Stellar") +
          " · 用 ❤ 与渐变打造 · <a href=\"index.html\">回到首页</a></div>" +
      "</footer>"
    );
    doc.body.appendChild(footer);
  }

  /* ============================================================
     导航交互 + 进度条 + 返回顶部
     ============================================================ */
  function initNavAndScroll() {
    var nav = qs("#nav");
    var burger = qs("#navBurger");
    var navLinks = qs("#navLinks");
    var progress = qs("#scrollProgress");
    var toTop = qs("#toTop");

    if (burger && nav) {
      burger.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
      });
      qsa("a", navLinks).forEach(function (a) {
        a.addEventListener("click", function () {
          nav.classList.remove("is-open");
          burger.setAttribute("aria-expanded", "false");
        });
      });
    }

    function onScroll() {
      var y = window.pageYOffset || doc.documentElement.scrollTop;
      if (nav) nav.classList.toggle("is-scrolled", y > 20);
      if (toTop) toTop.classList.toggle("is-visible", y > 500);
      if (progress) {
        var h = doc.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (toTop) {
      toTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  /* ============================================================
     滚动揭示 + 计数器 + 技能条
     ============================================================ */
  function animateCount(node) {
    var target = parseFloat(node.getAttribute("data-count"));
    var suffix = node.getAttribute("data-suffix") || "";
    var dur = 1400, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      var shown = (target % 1 !== 0) ? val.toFixed(1) : Math.round(val);
      node.textContent = shown + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initObservers() {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var reveals = qsa(".reveal");
    var counts = qsa("[data-count]");
    var fills = qsa(".skill__fill");

    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach(function (n) { n.classList.add("is-visible"); });
      counts.forEach(function (n) { n.textContent = n.getAttribute("data-count") + (n.getAttribute("data-suffix") || ""); });
      fills.forEach(function (n) { n.style.width = (n.getAttribute("data-pct") || 0) + "%"; });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var node = en.target;
        node.classList.add("is-visible");
        if (node.hasAttribute("data-count")) animateCount(node);
        if (node.classList.contains("skill__fill")) node.style.width = (node.getAttribute("data-pct") || 0) + "%";
        qsa("[data-count]", node).forEach(animateCount);
        qsa(".skill__fill", node).forEach(function (f) { f.style.width = (f.getAttribute("data-pct") || 0) + "%"; });
        io.unobserve(node);
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -40px 0px" });

    reveals.forEach(function (n) { io.observe(n); });
    counts.forEach(function (n) { if (!n.closest(".reveal")) io.observe(n); });
    fills.forEach(function (n) { if (!n.closest(".reveal")) io.observe(n); });
  }

  /* ============================================================
     渲染：项目卡片
     ============================================================ */
  function projectCard(p, i) {
    var tags = (p.tags || []).map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("");
    var feat = p.featured ? '<span class="project-card__feat">★ 精选</span>' : "";
    var delay = (i % 3) + 1;
    var hasUrl = p.url && p.url !== "#";
    var media = hasUrl
      ? '<a class="project-card__media" href="' + esc(p.url) + '" target="_blank" rel="noopener" aria-label="' + esc(p.title) + '">'
      : '<div class="project-card__media" aria-label="' + esc(p.title) + '">';
    var mediaClose = hasUrl ? "</a>" : "</div>";
    var action = hasUrl
      ? '<a class="project-card__link" href="' + esc(p.url) + '" target="_blank" rel="noopener">查看' + svg("arrowUpRight") + "</a>"
      : '<span class="project-card__link is-disabled" aria-disabled="true">暂无链接</span>';
    return (
      '<article class="project-card reveal" data-delay="' + delay + '">' +
        media +
          '<span class="cover" style="background:' + esc(p.gradient) + '"></span>' +
          feat +
          '<span class="glyph">' + esc(p.glyph || "★") + "</span>" +
        mediaClose +
        '<div class="project-card__body">' +
          '<span class="project-card__cat">' + esc(p.category || "") + "</span>" +
          '<h3 class="project-card__title">' + esc(p.title) + "</h3>" +
          '<p class="project-card__desc">' + esc(p.desc || "") + "</p>" +
          '<div class="project-card__foot">' +
            '<div class="tag-row">' + tags + "</div>" +
            action +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  function renderProjects() {
    var feat = qs("#featured-projects");
    if (feat) {
      var list = (DATA.projects || []).filter(function (p) { return p.featured; }).slice(0, 3);
      feat.innerHTML = list.map(projectCard).join("");
    }
    var all = qs("#all-projects");
    if (all) {
      all.innerHTML = (DATA.projects || []).map(projectCard).join("");
    }
  }

  /* ============================================================
     渲染：博客卡片
     ============================================================ */
  function postCard(p, i) {
    var delay = (i % 3) + 1;
    return (
      '<article class="post-card card-hover reveal" data-delay="' + delay + '">' +
        '<div class="post-card__meta">' +
          '<span class="post-card__cat">' + esc(p.category || "文章") + "</span>" +
          "<span>" + svg("calendar") + " " + fmtDate(p.date) + "</span>" +
          "<span>" + (p.readMins || 5) + " 分钟</span>" +
        "</div>" +
        '<a href="post.html?slug=' + encodeURIComponent(p.slug) + '">' +
          '<h3 class="post-card__title">' + esc(p.title) + "</h3>" +
        "</a>" +
        '<p class="post-card__excerpt">' + esc(p.excerpt || "") + "</p>" +
        '<div class="post-card__foot">' +
          '<div class="tag-row">' + (p.tags || []).slice(0, 2).map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") + "</div>" +
          '<a class="post-card__read" href="post.html?slug=' + encodeURIComponent(p.slug) + '">阅读' + svg("arrowRight") + "</a>" +
        "</div>" +
      "</article>"
    );
  }

  function featureCard(p) {
    return (
      '<a class="post-feature reveal" href="post.html?slug=' + encodeURIComponent(p.slug) + '">' +
        '<div class="post-feature__media" style="background:' + esc(p.gradient) + '">' +
          '<span class="glyph">' + esc(p.glyph || "★") + "</span>" +
        "</div>" +
        '<div class="post-feature__body">' +
          '<div class="post-card__meta">' +
            '<span class="post-card__cat">最新</span>' +
            "<span>" + svg("calendar") + " " + fmtDate(p.date) + "</span>" +
            "<span>" + (p.readMins || 5) + " 分钟</span>" +
          "</div>" +
          '<h2 class="post-feature__title">' + esc(p.title) + "</h2>" +
          '<p class="post-feature__excerpt">' + esc(p.excerpt || "") + "</p>" +
          '<div class="post-feature__foot"><span class="post-card__read">阅读全文' + svg("arrowRight") + "</span></div>" +
        "</div>" +
      "</a>"
    );
  }

  function renderPosts() {
    var posts = (DATA.posts || []).slice().sort(function (a, b) {
      return (b.date || "").localeCompare(a.date || "");
    });

    // 首页：最近 3 篇
    var recent = qs("#recent-posts");
    if (recent) recent.innerHTML = posts.slice(0, 3).map(postCard).join("");

    // 博客页
    var blogFeature = qs("#blog-feature");
    var blogList = qs("#blog-list");
    if (blogList) {
      var rest = posts.slice();
      if (blogFeature && rest.length) {
        blogFeature.innerHTML = featureCard(rest.shift());
      }
      renderBlogFilter(posts);
      renderBlogCards(rest);
    }
  }

  // 标签筛选
  function renderBlogFilter(posts) {
    var bar = qs("#blog-filter");
    if (!bar) return;
    var cats = {};
    posts.forEach(function (p) { if (p.category) cats[p.category] = 1; });
    var chips = ['<button class="filter-chip is-active" data-cat="all">全部</button>'];
    Object.keys(cats).forEach(function (c) {
      chips.push('<button class="filter-chip" data-cat="' + esc(c) + '">' + esc(c) + "</button>");
    });
    bar.innerHTML = chips.join("");
    bar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-chip");
      if (!btn) return;
      qsa(".filter-chip", bar).forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var cat = btn.getAttribute("data-cat");
      qsa("#blog-list .post-card-wrap").forEach(function (w) {
        var show = cat === "all" || w.getAttribute("data-cat") === cat;
        w.style.display = show ? "" : "none";
      });
    });
  }

  function renderBlogCards(list) {
    var blogList = qs("#blog-list");
    if (!blogList) return;
    blogList.innerHTML = list.map(function (p, i) {
      return '<div class="post-card-wrap" data-cat="' + esc(p.category || "") + '">' + postCard(p, i) + "</div>";
    }).join("");
  }

  /* ============================================================
     渲染：技能 / 标签云 / 时间线 / 统计 / Hero 数据
     ============================================================ */
  function renderSkills() {
    var box = qs("#skills");
    if (!box) return;
    box.innerHTML = (DATA.skillGroups || []).map(function (g, gi) {
      var skills = (g.skills || []).map(function (s) {
        return (
          '<div class="skill">' +
            '<div class="skill__top"><span class="skill__name">' + esc(s.name) + "</span>" +
            '<span class="skill__pct">' + s.pct + "%</span></div>" +
            '<div class="skill__track"><div class="skill__fill" data-pct="' + s.pct + '"></div></div>' +
          "</div>"
        );
      }).join("");
      return (
        '<div class="skill-card glass reveal" data-delay="' + ((gi % 3) + 1) + '">' +
          '<div class="skill-card__head">' +
            '<span class="skill-card__ico">' + svg(g.icon || "code") + "</span>" +
            '<h3 class="skill-card__title">' + esc(g.title) + "</h3>" +
          "</div>" + skills +
        "</div>"
      );
    }).join("");
  }

  function renderStack() {
    var box = qs("#stack");
    if (!box) return;
    box.innerHTML = (DATA.stack || []).map(function (s) {
      return '<span class="chip"><span class="chip__dot"></span>' + esc(s) + "</span>";
    }).join("");
  }

  function renderTimeline() {
    var box = qs("#timeline");
    if (!box) return;
    box.innerHTML = (DATA.timeline || []).map(function (t) {
      return (
        '<div class="tl-item reveal">' +
          '<div class="tl-date">' + esc(t.date) + "</div>" +
          '<h3 class="tl-title">' + esc(t.title) + "</h3>" +
          '<div class="tl-org">' + esc(t.org || "") + "</div>" +
          '<p class="tl-desc">' + esc(t.desc || "") + "</p>" +
        "</div>"
      );
    }).join("");
  }

  function renderStats() {
    var stats = (DATA.site && DATA.site.stats) || [];
    var box = qs("#stats");
    if (box) {
      box.innerHTML = stats.map(function (s, i) {
        return (
          '<div class="stat-card glass reveal" data-delay="' + ((i % 4) + 1) + '">' +
            '<div class="stat-card__num" data-count="' + s.num + '" data-suffix="' + esc(s.suffix || "") + '">0</div>' +
            '<div class="stat-card__label">' + esc(s.label) + "</div>" +
          "</div>"
        );
      }).join("");
    }
    var hero = qs("#hero-stats");
    if (hero) {
      hero.innerHTML = stats.slice(0, 3).map(function (s) {
        return (
          "<div>" +
            '<div class="stat-num text-grad" data-count="' + s.num + '" data-suffix="' + esc(s.suffix || "") + '">0</div>' +
            '<div class="stat-label">' + esc(s.label) + "</div>" +
          "</div>"
        );
      }).join("");
    }
  }

  /* ============================================================
     渲染：单篇文章（post.html）
     ============================================================ */
  function renderPostDetail() {
    var box = qs("#post-detail");
    if (!box) return;
    var slug = param("slug");
    var posts = (DATA.posts || []).slice().sort(function (a, b) { return (b.date || "").localeCompare(a.date || ""); });
    var idx = -1;
    for (var i = 0; i < posts.length; i++) { if (posts[i].slug === slug) { idx = i; break; } }

    if (idx === -1) {
      box.innerHTML = (
        '<div class="empty-state container">' +
          '<div class="es-emoji">🛰️</div>' +
          "<h2>没有找到这篇文章</h2>" +
          '<p class="muted" style="margin:12px 0 24px">它可能已被移动，或链接有误。</p>' +
          '<a class="btn btn--primary" href="blog.html">' + svg("arrowRight") + "返回博客</a>" +
        "</div>"
      );
      return;
    }

    var p = posts[idx];
    doc.title = p.title + " · " + ((DATA.site && DATA.site.name) || "Blog");

    var tags = (p.tags || []).map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("");
    var html = (
      '<article class="container">' +
        '<header class="article__head reveal">' +
          '<div class="article__meta">' +
            '<span class="article__cat">' + esc(p.category || "文章") + "</span>" +
            "<span>" + svg("calendar") + " " + fmtDate(p.date) + "</span>" +
            "<span>" + svg("clock") + " " + (p.readMins || 5) + " 分钟阅读</span>" +
          "</div>" +
          '<h1 class="article__title">' + esc(p.title) + "</h1>" +
        "</header>" +
        '<div class="article__cover reveal" style="background:' + esc(p.gradient) + '">' +
          '<span class="glyph">' + esc(p.glyph || "★") + "</span>" +
        "</div>" +
        '<div class="article prose reveal">' + (p.body || "<p>（正文待补充）</p>") + "</div>" +
      "</article>" +
      '<div class="article__foot">' +
        '<div class="tag-row">' + tags + "</div>" +
        '<a class="btn btn--ghost btn--sm" href="blog.html">' + svg("arrowRight") + "更多文章</a>" +
      "</div>"
    );

    // 上一篇 / 下一篇
    var nav = "";
    var prev = posts[idx + 1]; // 更旧
    var next = posts[idx - 1]; // 更新
    if (prev || next) {
      nav += '<nav class="post-nav">';
      nav += prev
        ? '<a class="pn-prev" href="post.html?slug=' + encodeURIComponent(prev.slug) + '"><div class="pn-label">← 上一篇</div><div class="pn-title">' + esc(prev.title) + "</div></a>"
        : "<span></span>";
      nav += next
        ? '<a class="pn-next" href="post.html?slug=' + encodeURIComponent(next.slug) + '"><div class="pn-label">下一篇 →</div><div class="pn-title">' + esc(next.title) + "</div></a>"
        : "<span></span>";
      nav += "</nav>";
    }

    box.innerHTML = html + nav;
  }

  /* ============================================================
     启动
     ============================================================ */
  function init() {
    doc.documentElement.classList.add("js");
    buildChrome();
    initTheme();
    initNavAndScroll();

    renderStats();
    renderProjects();
    renderPosts();
    renderSkills();
    renderStack();
    renderTimeline();
    renderPostDetail();

    // 内容渲染完毕后再挂观察者
    initObservers();
  }

  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", init);
  else init();
})();
