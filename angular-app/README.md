# Angular Portfolio App (作品集 Angular 版)

这是使用 **Angular 19** 和 **Tailwind CSS 4** 构建的高性能单页应用版本，深度还原了设计师的作品集 UI 方案。

## 🌟 技术栈

- **核心框架**: Angular 19 (采用全 Standalone Components 架构)
- **状态管理**: Angular Signals (细粒度响应式更新)
- **样式引擎**: Tailwind CSS 4 + PostCSS
- **构建工具**: Vite + Tailwind CLI (解决 Angular 19 对新版 Tailwind 的预扫描限制)
- **数据驱动**: 100% JSON 配置驱动 (`src/app/data`)
- **字体方案**: Inter (通过 Google Fonts 引入)

## ✨ UI/UX 特色功能

1.  **高度还原设计稿**: 
    -   **极致粗体标题**: 采用 `font-black` 展现专业气息。
    -   **作品瀑布流**: 标题居中覆盖与 1.1x 平滑缩放动画。
    -   **Pill 药丸式过滤**: 极简的交互形态。
2.  **沉浸式灯箱 (Lightbox)**:
    -   多图轮播切换，支持触摸屏滑动。
    -   背景模糊 (`backdrop-blur-md`) 与高级复合缩放动画。
3.  **布局偏移优化 (Shaking Fix)**:
    -   智能计算 `scrollbar-width`。
    -   开启模态框时自动进行物理间距补偿，确保页面内容无抖动。
4.  **毛玻璃导航**: 底部固定导航栏，支持 URL 自动感知的活跃状态流式交互。

## 🛠️ 开发与构建

### 依赖安装
```bash
pnpm install
```

### 启动开发环境
```bash
pnpm start
```
该命令会自动开启 Tailwind CLI 监听并启动 Angular Dev Server。

### 项目构建
```bash
pnpm build
```
执行预编译流程，生成高度优化的静态产物。

## 📁 核心目录

- `src/app/components`: 核心 UI 原子组件。
- `src/app/pages`: 基于路由的功能页面。
- `src/app/services`: 应用状态中心（基于 Signals）。
- `src/app/data`: 全局数据配置文件。
