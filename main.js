const posts = [
    {
        title: "我的第一篇博客",
        date: "2026-06-15",
        excerpt: "终于搭建好了自己的博客！这里将记录我在技术路上的学习心得和项目经验，希望能和大家一起进步。",
        tags: ["随笔", "博客"]
    },
    {
        title: "JavaScript 基础知识点总结",
        date: "2026-06-18",
        excerpt: "整理了 JavaScript 中常用但容易混淆的基础概念，包括作用域、闭包、this 指向等，适合初学者复习。",
        tags: ["JavaScript", "前端"]
    },
    {
        title: "如何设计一个响应式布局",
        date: "2026-06-20",
        excerpt: "从 Flexbox 到 Grid，从媒体查询到容器查询，全面了解现代 CSS 响应式布局方案。",
        tags: ["CSS", "前端"]
    }
];

function renderPosts() {
    const grid = document.getElementById('blogGrid');
    grid.innerHTML = posts.map(post => `
        <div class="blog-card">
            <div class="date">${post.date}</div>
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <div class="tags">
                ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

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
