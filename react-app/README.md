# 设计师作品集 (Designer Portfolio) - React 版

这是一个基于 [React 19](https://react.dev)、[Vite 7](https://vite.dev) 和 [Tailwind CSS 4](https://tailwindcss.com) 构建的高性能、响应式设计师作品集 Web App。

## ✨ 特性 (Features)

-   **📱 移动优先设计 (Mobile-First)**: 采用 Web App 风格，提供原生应用般的竖版浏览体验。
-   **🎨 现代 UI/UX**:
    -   瀑布流布局 (Masonry Grid) 展示作品列表。
    -   基于 React 19 的高性能状态驱动视图。
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

## 🚀 快速开始 (Quick Start)

### 1. 安装依赖

```bash
pnpm install
```

### 2. 本地开发

启动本地开发服务器，默认地址 `http://localhost:5173`。

```bash
pnpm dev
```

### 3. 构建部署

打包项目生成生产环境文件（输出目录：`dist/`）。

```bash
pnpm build
```

## 📁 项目结构 (Project Structure)

```text
/
├── public/                 # 静态资源
├── src/
│   ├── components/         # 核心 UI 组件
│   ├── data/               # JSON 配置文件
│   ├── layouts/            # 布局封装
│   ├── pages/              # 页面路由
│   ├── styles/             # 全局样式
│   ├── App.tsx             # 路由配置
│   └── main.tsx            # 入口文件
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
