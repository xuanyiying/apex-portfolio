# Apex Portfolio v1.0.0

Apex Portfolio 是一个为现代全栈开发者量身定制的、极具视觉冲击力的个人作品集网站。它融合了赛博朋克美学与玻璃拟态（Glassmorphism）设计风格，旨在通过流畅的交互和 3D 视觉元素，全方位展示开发者的技能、项目和经历。

## 1. 主要功能和目标

- **响应式设计**：完美适配桌面、平板和移动端。
- **中英双语支持**：内置完善的国际化（i18n）方案，支持一键切换语言。
- **3D 交互视觉**：利用 Three.js 实现炫酷的 3D 背景和交互元素。
- **平滑动画**：基于 Framer Motion 实现的丝滑页面过渡和入场动画。
- **自动化集成**：支持通过脚本自动从 GitHub 获取最新的开源项目信息。
- **深色模式优化**：原生支持深色模式，提供极致的视觉体验。

## 2. 核心技术栈和依赖项

### 核心框架
- **Next.js 14 (App Router)**: 用于构建高性能 React 应用的基础框架。
- **TypeScript**: 提供强类型检查，提升代码质量和可维护性。

### UI & 动画
- **Tailwind CSS**: 实用优先的 CSS 框架，用于构建响应式布局。
- **Framer Motion**: 用于实现复杂的交互动画和页面过渡。
- **Lucide React**: 简洁美观的图标库。
- **Canvas Confetti**: 用于表单提交成功后的烟花特效。

### 3. 系统架构和模块划分

项目采用清晰的模块化开发模式，便于扩展和维护：

```text
apex-portfolio/
├── scripts/              # 自动化脚本（如：GitHub 数据抓取）
├── src/
│   ├── app/              # Next.js App Router 路由、布局和全局样式
│   ├── components/       # 可复用的 UI 组件（Hero, Projects, Skills 等）
│   ├── data/             # 静态数据配置文件（项目、经历、技能等）
│   ├── lib/              # 核心库逻辑（i18n, Context Provider, 工具函数）
│   ├── messages/         # 国际化翻译文件（JSON 格式）
│   └── types/            # 全局 TypeScript 类型定义
├── public/               # 静态资源（图片、字体等）
└── tailwind.config.ts    # 样式配置与主题定义
```

## 4. 安装部署说明

### 环境要求
- Node.js 18.x 或更高版本
- npm / pnpm / yarn

### 本地开发
1. 克隆仓库：
   ```bash
   git clone https://github.com/xuanyiying/apex-portfolio.git
   cd apex-portfolio
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 启动开发服务器：
   ```bash
   npm run dev
   ```
   访问 [http://localhost:3000](http://localhost:3000) 即可查看效果。

### 构建与生产环境部署
1. 执行构建：
   ```bash
   npm run build
   ```

2. 启动生产服务器：
   ```bash
   npm run start
   ```

## 5. 使用方法和示例

### 自定义内容
- **个人信息**：编辑 `src/data/hero.ts` 和 `src/data/contact.ts`。
- **技能列表**：编辑 `src/data/skills.ts`。
- **工作经历**：编辑 `src/data/experience.ts`。

### 同步 GitHub 项目
项目提供了一个便捷的脚本，可以根据用户名自动抓取 GitHub 仓库并生成项目列表：

1. 打开 `scripts/fetch-github-projects.ts`。
2. 修改 `GITHUB_USERNAME` 为你的用户名。
3. 运行同步脚本：
   ```bash
   npm run update-projects
   ```

### 多语言配置
在 `src/messages/` 目录下编辑 `en.json` 和 `zh.json` 即可完成文案的更新。

## 6. 贡献指南

欢迎通过 Pull Request 或 Issue 来帮助改进这个项目！

1. Fork 本项目。
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)。
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)。
4. 推送到分支 (`git push origin feature/AmazingFeature`)。
5. 开启一个 Pull Request。

## 7. 许可证信息

本项目采用 [MIT License](LICENSE) 许可。你可以自由地使用、修改和分发本项目。

---

© 2025 Alex Chen. Built with ❤️ and Next.js.
