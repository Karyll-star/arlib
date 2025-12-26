以下为您整理的《React Native 与 Unity AR 混合应用开发实施技术指南》。本文档旨在为具备 Web 开发背景的工程师提供一套标准化的技术迁移与实施路径。

---

# React Native 与 Unity AR 混合应用开发实施技术指南

**版本**：1.0
**适用对象**：具备 VS Code + CLI 开发经验的 Web/全栈工程师
**技术架构**：React Native (Expo) + Unity (as a Library)

---

## 目录 (Table of Contents)

1.  **架构概述与开发策略**
2.  **开发环境配置 (Environment Setup)**
3.  **阶段一：项目初始化与基础架构搭建**
4.  **阶段二：通用业务模块开发 (Expo Standard Workflow)**
5.  **阶段三：AR 模块的接口定义与模拟 (Mock Strategy)**
6.  **阶段四：Unity 引擎集成与原生构建 (Native Integration)**
7.  **阶段五：构建流水线与发布 (Build & Distribution)**
8.  **附录：AI 辅助开发指令集**

---

## 1. 架构概述与开发策略

本方案采用**解耦开发模式 (Decoupled Development Pattern)**。

*   **宿主应用 (Host App)**：基于 React Native (Expo) 构建，负责用户账户、业务逻辑、界面交互及网络请求。
*   **功能模块 (Feature Module)**：基于 Unity 引擎构建，负责高性能 AR 渲染与交互，以原生库 (Library) 形式嵌入宿主应用。
*   **通信机制**：通过 Native Bridge 实现 JavaScript (RN) 与 C# (Unity) 之间的双向消息传递。

**核心策略**：在前中期开发阶段，保持对标准 Expo Go 环境的依赖，通过 Mock（模拟）技术隔离 Unity 依赖，直至项目后期进行原生集成。

---

## 2. 开发环境配置 (Environment Setup)

请确保开发终端满足以下配置要求。

### 2.1 基础开发环境
*   **IDE**: Visual Studio Code
*   **Runtime**: Node.js (建议 LTS 版本)
*   **Version Control**: Git
*   **CLI Tools**:
    *   `npm` 或 `yarn`
    *   `expo-cli` (全局安装或通过 `npx` 调用)
    *   **Aider** (命令行 AI 编程助手，建议配置 Claude 3.5 Sonnet 模型)

### 2.2 移动端调试环境
*   **阶段一至三**：移动设备安装 **Expo Go** 客户端。
*   **阶段四及以后**：
    *   macOS: Xcode (用于 iOS/Android 编译)
    *   Windows: Android Studio (仅用于 Android 编译)

### 2.3 AR 开发环境
*   **Unity Hub**: 用于管理编辑器版本。
*   **Unity Editor**: 建议使用 **2020.3 LTS** 或 **2021.3 LTS** 版本，以确保与 React Native 桥接库的最佳兼容性。
*   **模块支持**: 安装 Unity 时需勾选 Android Build Support (含 SDK/NDK) 及 iOS Build Support。

---

## 3. 阶段一：项目初始化与基础架构搭建

利用 CLI 快速生成符合现代化标准的前端项目结构。

### 3.1 项目初始化
使用 Expo 官方脚手架，并预置 NativeWind (Tailwind CSS 的 React Native 实现) 以降低样式迁移成本。

```bash
# 初始化项目
npx create-expo-app@latest ar-project-name --template nativewind

# 进入项目目录
cd ar-project-name

# 安装核心路由库
npm install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
```

### 3.2 AI 助手配置
在 VS Code 终端初始化 Aider，建立上下文索引。

```bash
aider --model claude-3-5-sonnet
```

---

## 4. 阶段二：通用业务模块开发 (Expo Standard Workflow)

在此阶段，开发者应专注于非 AR 业务逻辑（如登录、列表、个人中心）。利用 **Expo Go** 实现热重载 (Hot Reloading)，确保开发效率最大化。

### 4.1 技术栈映射 (Web to Native)
在使用 AI 生成代码时，需严格遵循以下组件映射规范：

| Web DOM | React Native Component | 说明 |
| :--- | :--- | :--- |
| `<div>` | `<View>` | 基础容器，默认 Flex 布局 (flex-col) |
| `<span>`, `<p>` | `<Text>` | **必须**包裹所有文本节点 |
| `<button>` | `<TouchableOpacity>` | 提供触控反馈的交互组件 |
| `<img>` | `<Image>` | 需指定 source 与 style |
| `<ul>`, `<li>` | `<FlatList>` | 高性能列表组件 |
| CSS Class | `className` | 使用 NativeWind 语法 |

### 4.2 开发执行
*   **输入**：设计稿截图或需求文档。
*   **执行**：通过 CLI 调用 Aider 读取设计稿，生成对应的 TSX 组件代码。
*   **验证**：使用真机运行 Expo Go 实时预览。

---

## 5. 阶段三：AR 模块的接口定义与模拟 (Mock Strategy)

为避免早期引入原生依赖导致开发流程阻塞，需建立 AR 模块的 Mock 替身。

### 5.1 定义接口契约
确定 React Native 与 Unity 的交互协议：
*   **Input (RN -> Unity)**: `startNav(targetId: string)`
*   **Output (Unity -> RN)**: `onNavComplete(data: object)`, `onNavExit()`

### 5.2 实现 Mock 组件
创建 `src/screens/ARScreen.tsx`，使用原生 RN 组件模拟 AR 界面及状态流转。

```typescript
// 伪代码示例
export default function ARScreenMock() {
  // 模拟业务逻辑
  const handleSimulateCompletion = () => {
    // 触发预定义的业务回调
    console.log('[Mock] AR Task Completed');
  };

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <Text style={{color: '#fff'}}>AR 模块占位视图</Text>
      <Button title="Debug: 模拟任务完成" onPress={handleSimulateCompletion} />
    </View>
  );
}
```

### 5.3 路由注册
在 Navigation Stack 中注册该页面。此时，应用程序已具备完整的业务闭环能力。

---

## 6. 阶段四：Unity 引擎集成与原生构建 (Native Integration)

此阶段涉及原生代码编译，**Expo Go 将不再适用**，需切换至 Development Build（自定义开发客户端）模式。

### 6.1 Unity 工程导出配置
1.  **Android 平台**: Build Settings 中勾选 **Export Project**。
2.  **iOS 平台**: Build Settings 中勾选 **Add to Existing Project**（如无此选项，需通过 Editor 脚本处理）。
3.  **优化**: 执行 Code Stripping 以减小库体积。

### 6.2 引入桥接库
在 React Native 项目中安装依赖：
```bash
npm install @azesmway/react-native-unity
```

### 6.3 配置原生预构建 (Prebuild)
修改 `app.json` 或 `app.config.js`，注册 Unity 插件并指定导出路径。
```json
{
  "expo": {
    "plugins": [
      [
        "@azesmway/react-native-unity",
        {
          "android": { "unityProject": "./unity/builds/android" },
          "ios": { "unityProject": "./unity/builds/ios" }
        }
      ]
    ]
  }
}
```

执行预构建指令，生成 `android` 及 `ios` 原生工程目录：
```bash
npx expo prebuild
```

### 6.4 组件替换与通信实现
1.  修改 `ARScreen.tsx`，将 Mock 组件替换为真实的 `<UnityView>`。
2.  在 Unity 中编写 C# 脚本挂载于场景，实现与 RN 的 `UnityMessageManager` 通信。
3.  连接真机，执行本地编译运行：
    ```bash
    npx expo run:android  # 或 run:ios
    ```

---

## 7. 阶段五：构建流水线与发布 (Build & Distribution)

推荐使用 **EAS (Expo Application Services)** 进行云端构建，以屏蔽本地环境差异。

### 7.1 配置构建环境
安装并登录 EAS CLI：
```bash
npm install -g eas-cli
eas login
eas build:configure
```

### 7.2 执行构建
提交云端构建任务：
```bash
# 构建 Android APK
eas build --platform android --profile preview

# 构建 iOS IPA (需 Apple Developer 账号)
eas build --platform ios --profile preview
```

---

## 附录：AI 辅助开发指令集 (Prompt Engineering)

在 CLI 工具 (Aider) 中交互时，建议使用以下结构化指令：

*   **UI 生成指令**:
    > "作为 React Native 专家，请根据 `design.png` 实现 `ProfileScreen.tsx`。技术约束：使用 Expo Router 进行导航，使用 NativeWind 处理样式。严禁使用 HTML 标签，必须使用 RN 原生组件。确保布局适配移动端 SafeArea。"

*   **Mock 组件生成指令**:
    > "创建一个名为 `ARScreen` 的占位组件。背景色为黑色（模拟相机流）。屏幕中央显示状态文本。包含两个调试按钮：'Simulate Success' 和 'Simulate Fail'，分别触发对应的 props 回调函数。此组件用于在未集成 Unity 前测试业务流程。"

*   **Unity C# 脚本指令**:
    > "编写一个 Unity C# 脚本 `UnityBridge.cs`。需求：1. 定义一个公共方法 `ReceiveMessage(string json)` 供 React Native 调用。2. 当检测到 AR 平面时，通过 `UnityMessageManager` 向 React Native 发送 JSON 格式的消息。"