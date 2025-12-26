# AR Library App 📚

这是一个基于 **React Native** 和 **Expo** 构建的现代化图书馆借阅与浏览应用。项目使用了 **NativeWind (Tailwind CSS)** 进行快速且响应式的界面开发。

## ✨ 功能特性

本项目旨在提供流畅的图书浏览和管理体验，主要包含以下功能：

- **首页仪表盘 (Dashboard)**
  - 📖 **图书推荐**：包含 "为你推荐 (For You)"、"当下流行 (Trending Now)" 和 "新书上架 (New Arrivals)" 等版块。
  - 🔍 **快速搜索**：支持按书名、作者或关键词搜索图书。
  - 🤖 **AI 推荐**：集成 AI 助手入口，提供个性化阅读建议。
  - 🧭 **AR 导航**：特色的增强现实 (AR) 导航功能，辅助用户在图书馆内寻找书籍（概念功能）。
  - 📝 **借阅管理**：查看 "我借阅的书籍 (My Borrowed Items)"。

- **用户系统**
  - 👤 **个人资料**：展示用户头像、简介及注册信息。
  - 🔖 **收藏/保存**：管理感兴趣的书籍列表 (Saved)。

- **导航**
  - 使用 **Expo Router** 实现的底部标签栏导航 (Tab Navigation)，包含首页、搜索、收藏和个人中心。

## 🛠 技术栈

- **核心框架**: [React Native](https://reactnative.dev/)
- **开发平台**: [Expo](https://expo.dev/) (SDK 51)
- **路由管理**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **样式方案**: [NativeWind](https://nativewind.dev/) (Tailwind CSS for React Native)
- **语言**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 快速开始

### 前置要求

确保你的开发环境中已安装：
- [Node.js](https://nodejs.org/) (推荐 LTS 版本)
- npm 或 yarn

### 安装步骤

1. **克隆项目或进入项目目录**
   ```bash
   cd ar-project-name
   ```

2. **安装依赖**
   ```bash
   npm install
   # 或者
   yarn install
   ```

3. **启动开发服务器**
   ```bash
   npm start
   # 或者
   npx expo start
   ```

4. **运行应用**
   - 按 `a` 在 Android 模拟器运行
   - 按 `i` 在 iOS 模拟器运行 (仅限 macOS)
   - 按 `w` 在 Web 浏览器运行
   - 或者使用 **Expo Go** App 扫描终端显示的二维码在真机上预览。

## 📂 项目结构

```
ar-project-name/
├── app/                 # Expo Router 路由目录
│   ├── (tabs)/          # 底部标签栏页面 (首页, 搜索, 收藏, 个人中心)
│   └── _layout.tsx      # 全局布局配置
├── src/                 # 源代码 (组件, 工具函数等)
├── assets/              # 静态资源 (图片, 字体)
├── components/          # 可复用组件 (建议将内联组件提取至此)
├── app.json             # Expo 项目配置
├── tailwind.config.js   # Tailwind CSS 配置
└── package.json         # 项目依赖配置
```

## 📝 开发备注

- 当前首页 (`app/(tabs)/index.tsx`) 包含了一些内联组件（如 `BookCard`, `FeatureGridItem`），在后续开发中建议将其提取到独立的组件文件中以提高代码可维护性。
- AR 导航和 AI 推荐目前为 UI 展示功能，需进一步对接实际的 AR 引擎和 AI 接口。

## 📄 许可证

本项目仅供学习和演示使用。