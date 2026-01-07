# 设计师作品集 (Designer Portfolio)

这是一个基于 [Astro](https://astro.build) 和 [Tailwind CSS](https://tailwindcss.com) 构建的高性能、响应式设计师作品集 Web App。

## ✨ 特性 (Features)

-   **📱 移动优先设计 (Mobile-First)**: 采用 Web App 风格，提供原生应用般的竖版浏览体验。
-   **🎨 现代 UI/UX**:
    -   瀑布流布局 (Masonry Grid) 展示作品列表。
    -   玻璃拟态 (Glassmorphism) 导航栏与菜单。
    -   平滑的过渡动画与交互微操。
-   **🖼️ 沉浸式画廊 lightbox**:
    -   支持多图浏览：每个作品可包含多张高清大图。
    -   手势支持：移动端支持左右滑动切换图片。
    -   键盘支持：桌面端支持方向键导航。
    -   高清自适应：自动加载高清大图，并带有加载指示器。
-   **⚙️ 灵活配置 (JSON Driven)**:
    -   **作品数据**: `src/data/portfolio.json`
    -   **服务类型**: `src/data/services.json`
    -   **分类管理**: `src/data/categories.json`
    -   **个人信息**: `src/data/profile.json`
    -   支持通过 `visible: false` 属性一键隐藏任意内容。
-   **🌐 全中文本地化**: 界面默认采用中文展示。
-   **🔍 SEO 优化**: 
    -   包含 TDK (Title, Description, Keywords) 优化。
    -   支持 Open Graph 与 Twitter Cards 社交分享协议。
    -   内置 JSON-LD 结构化数据，提升搜索引擎抓取效率。
    -   提供 `robots.txt` 引导爬虫。

## 🚀 快速开始 (Quick Start)

### 1. 安装依赖

```bash
npm install
```

### 2. 本地开发

启动本地开发服务器，默认地址 `http://localhost:4321`。

```bash
npm run dev
```

### 3. 构建部署

打包项目生成静态文件（输出目录：`dist/`）。

```bash
npm run build
```

## 📁 项目结构 (Project Structure)

```text
/
├── public/                 # 静态资源
├── src
│   ├── components/         # UI 组件
│   │   ├── ProjectCard.astro    # 作品卡片 (支持 Lightbox 触发)
│   │   ├── ImageLightbox.astro  # 全屏图片画廊
│   │   ├── CategoryFilter.astro # 顶部滑动筛选
│   │   └── BottomMenu.astro     # 底部固定导航
│   ├── data/               # JSON 配置文件
│   │   ├── portfolio.json       # 作品集数据 (图集、描述等)
│   │   ├── services.json        # 业务类型数据
│   │   ├── categories.json      # 分类数据
│   │   └── profile.json         # 个人资料与社交链接
│   ├── layouts/            # 页面布局
│   └── pages/              # 页面路由
│       ├── index.astro          # 首页 (作品集)
│       ├── services.astro       # 服务范围
│       └── contact.astro        # 联系我
└── package.json
```

## 🛠️ 配置说明 (Configuration)

### 添加/修改作品
编辑 `src/data/portfolio.json`:

```json
{
  "id": 10,
  "title": "新项目标题",
  "category": "UI/UX",
  "imageUrl": "缩略图 URL",
  "images": [
      "大图 1 URL",
      "大图 2 URL"
  ],
  "description": "项目描述",
  "visible": true
}
```

### 隐藏内容
在任意 JSON 数据项中设置 `"visible": false` 即可隐藏该项，无需修改代码。

## 📜 许可证 (License)

MIT License
