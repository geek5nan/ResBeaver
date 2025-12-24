<p align="center">
  <img src="public/logo.png" alt="ResBeaver Logo" width="200">
</p>

<h1 align="center">ResBeaver</h1>

<p align="center">
  <strong>Android 资源管理工具</strong><br>
  图片多密度转换 · 字符串资源合并
</p>

<p align="center">
  🌐 [在线体验](https://resbeaver.pages.dev) · 
  📄 [项目上下文](./PROJECT_CONTEXT.md) ·
  🇺🇸 [English Documentation](./README.md)
</p>

---

## ✨ 功能特性

### 🖼️ Drawable 处理器

一键生成 Android 多密度适配图片，告别手动切图。

| 功能 | 描述 |
|------|------|
| **多密度生成** | 自动生成 mdpi / hdpi / xhdpi / xxhdpi / xxxhdpi |
| **WebP 编码** | 支持有损 (Lossy) 与无损 (Lossless) 压缩模式 |
| **质量控制** | 可调节压缩质量/压缩力度 (0-100) |
| **智能缩放** | 高质量采样算法，确保缩放后清晰度 |
| **批量操作** | 支持文件重命名、一键下载 ZIP 包 |

### 📝 String 处理器

Android 多语言 XML 资源的高效合并工具，解决翻译导入痛点。

| 功能 | 描述 |
|------|------|
| **项目扫描** | 自动识别 Android 项目中所有 `res` 目录与模块 |
| **语言映射** | 灵活配置源文件 → 目标 `values-*` 目录的映射规则 |
| **Diff 预览** | 精确到行的变更对比，支持键盘快捷导航 (N/P) |
| **注释保留** | 智能合并算法，完整保留目标文件中的注释 |
| **双模式合并** | 覆盖模式 / 仅新增模式，按需选择 |
| **配置持久化** | 映射规则自动保存，支持导入/导出 JSON 配置 |
| **本地写入** | 基于 File System Access API，直接写入本地项目 |

---

## 📖 使用指南

### Drawable 处理

1. **上传图片** — 拖拽或点击上传 PNG/JPG/WebP (建议使用 3x 或 4x 高清图)
2. **选择输入倍率** — 标注原图是几倍图
3. **选择输出密度** — 勾选需要生成的 drawable 目录
4. **调整编码参数** — 选择 Lossy/Lossless 模式，调整质量
5. **下载** — 单个下载或批量下载 ZIP

### String 处理

1. **选择项目** — 指向 Android 工程根目录
2. **选择翻译源** — 选择包含翻译 XML 文件的文件夹
3. **配置映射** — 编辑源文件与目标 locale 的对应关系
4. **预览变更** — 逐行检查 Diff，使用 N/P 快捷键导航
5. **执行导入** — 确认无误后一键合并

---

## 🛠️ 技术栈

| 类型 | 技术 |
|------|------|
| **框架** | React 18 + TypeScript + Vite |
| **样式** | Tailwind CSS + Shadcn UI |
| **图标** | Lucide Icons |
| **图片处理** | WebAssembly (@aspect/webp) + Canvas API |
| **文件操作** | File System Access API |

---

## 💻 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

---

## 📜 许可证

MIT
