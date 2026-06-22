const posts = [
    {
        title: "我的第一篇博客",
        date: "2026-06-15",
        excerpt: "终于搭建好了自己的博客！这里将记录我在技术路上的学习心得和项目经验，希望能和大家一起进步。",
        tags: ["随笔", "博客"],
        content: `
## 终于开张了！

这是我的第一篇博客文章，激动又忐忑。

### 为什么要写博客？

1. **记录学习** — 好记性不如烂笔头，写下来才是自己的。
2. **分享知识** — 曾经困扰我的问题，也许能帮到别人。
3. **督促成长** — 坚持输出是最好的输入。

### 我会写些什么？

主要分享 Web 开发相关的内容，包括：

- 前端技术（HTML/CSS/JS/React）
- 后端技术（Node.js/Python）
- 工具技巧（Git/VSCode/Linux）
- 项目经验与踩坑记录

希望这个博客能一直坚持下去，加油！
        `
    },
    {
        title: "JavaScript 基础知识点总结",
        date: "2026-06-18",
        excerpt: "整理了 JavaScript 中常用但容易混淆的基础概念，包括作用域、闭包、this 指向等，适合初学者复习。",
        tags: ["JavaScript", "前端"],
        content: `
## 作用域 (Scope)

JavaScript 有三种作用域：

- **全局作用域** — 任何地方都能访问
- **函数作用域** — 只在函数内部可访问
- **块级作用域** — let/const 只在 {} 内可访问

## 闭包 (Closure)

闭包是指函数可以访问其外部函数的变量，即使外部函数已经执行完毕。

\`\`\`js
function outer(x) {
    return function(y) {
        return x + y;
    };
}
const add5 = outer(5);
console.log(add5(3)); // 8
\`\`\`

## this 指向

| 调用方式 | this 指向 |
|---------|----------|
| 普通函数调用 | window/global |
| 对象方法调用 | 该对象 |
| 箭头函数 | 定义时的上下文 |
| new 调用 | 新创建的对象 |
        `
    },
    {
        title: "如何设计一个响应式布局",
        date: "2026-06-20",
        excerpt: "从 Flexbox 到 Grid，从媒体查询到容器查询，全面了解现代 CSS 响应式布局方案。",
        tags: ["CSS", "前端"],
        content: `
## 响应式布局的核心

### 1. 弹性布局 (Flexbox)

Flexbox 适用于一维布局（行或列）：

\`\`\`css
.container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
\`\`\`

### 2. 网格布局 (CSS Grid)

Grid 适用于二维布局：

\`\`\`css
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
}
\`\`\`

### 3. 媒体查询

在不同屏幕尺寸下调整样式：

\`\`\`css
@media (max-width: 640px) {
    .hero h1 { font-size: 2rem; }
}
\`\`\`

## 总结

推荐优先使用 Flexbox 和 Grid，媒体查询作为补充。
        `
    }
];

function renderPosts() {
    const grid = document.getElementById('blogGrid');
    grid.innerHTML = posts.map((post, i) => `
        <div class="blog-card" onclick="openPost(${i})">
            <div class="date">${post.date}</div>
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <div class="tags">
                ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function openPost(index) {
    const post = posts[index];
    const overlay = document.getElementById('postOverlay');
    document.getElementById('postTitle').textContent = post.title;
    document.getElementById('postDate').textContent = post.date;
    document.getElementById('postTags').innerHTML = post.tags.map(t => `<span class="tag">${t}</span>`).join('');
    document.getElementById('postContent').innerHTML = marked.parse(post.content);
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closePost() {
    document.getElementById('postOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

document.getElementById('postOverlay')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closePost();
});

const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
});

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

renderPosts();
