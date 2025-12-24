<p align="center">
  <img src="public/logo.png" alt="ResBeaver Logo" width="200">
</p>

<h1 align="center">ResBeaver</h1>

<p align="center">
  <strong>Android Resource Management Tool</strong><br>
  Multi-density Image Conversion · String Resource Merging
</p>

<p align="center">
  🌐 <a href="https://resbeaver.pages.dev">Online Demo</a>
  🇨🇳 <a href="./README.zh-CN.md"> 中文文档</a>
</p>

---

## ✨ Features

### 🖼️ Drawable Processor

Generate Android multi-density images with one click, saying goodbye to manual cropping.

| Feature | Description |
|------|------|
| **Multi-density Generation** | Automatically generate mdpi / hdpi / xhdpi / xxhdpi / xxxhdpi |
| **WebP Encoding** | Supports Lossy and Lossless compression modes |
| **Quality Control** | Adjustable compression quality/effort (0-100) |
| **Smart Scaling** | High-quality sampling algorithms for sharpness |
| **Batch Operations** | Supports renaming and ZIP package download |

### 📝 String Processor

Efficient merging tool for Android multi-language XML resources, solving translation import pain points.

| Feature | Description |
|------|------|
| **Project Scanning** | Correlates all `res` directories and modules in Android projects |
| **Language Mapping** | Configurable mapping rules from source files to target `values-*` |
| **Diff Preview** | Line-by-line comparison with keyboard navigation (N/P) |
| **Comment Preservation** | Smart merging algorithm that preserves comments |
| **Dual Mode Merge** | Choose between 'Overwrite' and 'Add Only' modes |
| **Config Persistence** | Auto-saves mapping rules with JSON Import/Export support |
| **Local Writing** | Writes directly to local projects via File System Access API |

---

## 📖 Usage Guide

### Drawable Processing

1. **Upload Images** — Drag & drop PNG/JPG/WebP (Suggest using 3x or 4x high-res images)
2. **Select Input Scale** — Specify the scale of the source images
3. **Select Output Densities** — Choose target drawable directories
4. **Adjust Parameters** — Choose Lossy/Lossless and set quality
5. **Download** — Individual or batch ZIP download

### String Processing

1. **Select Project** — Point to the Android project root
2. **Select Translation Source** — Folders containing translation XML files
3. **Configure Mappings** — Map source files to target locales
4. **Preview Changes** — Review Diff line-by-line (N/P for navigation)
5. **Execute Import** — Confirm and merge with one click

---

## 🛠️ Tech Stack

| Category | Technology |
|------|------|
| **Framework** | React 18 + TypeScript + Vite |
| **Styling** | Tailwind CSS + Shadcn UI |
| **Icons** | Lucide Icons |
| **Image Processing** | WebAssembly (@aspect/webp) + Canvas API |
| **File Operations** | File System Access API |

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 📜 License

MIT
