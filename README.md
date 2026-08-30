# Yash Baviskar - Cloud & DevOps Portfolio

An interactive Linux desktop environment simulating Ubuntu GNOME, built to showcase cloud infrastructure projects, DevOps workflows, container orchestration, and system telemetry.

Live Portfolio: https://yashbaviskar.me  
GitHub Repository: https://github.com/yashbaviskar15/portfolio  

---

## Overview

This portfolio is an interactive Web-based desktop interface demonstrating production engineering concepts. Designed as an authentic Linux environment with window management, a bottom fluid dock, real-time client telemetry, interactive terminal emulator with a virtual filesystem, and multi-language localization.

---

## Key Features

### 1. Window & Desktop Management
- Full multi-window orchestration powered by Zustand and react-rnd.
- Support for floating, snapping, minimizing, maximizing, focus layering, and z-index ordering.
- Standard traffic-light window controls and Alt+Tab window switching with reverse cycling support.
- Fully responsive on mobile, tablet, and widescreen desktop displays.

### 2. Interactive Bash Terminal Emulator
- Custom Linux shell parser supporting standard Unix commands: `ls`, `cd`, `cat`, `pwd`, `mkdir`, `touch`, `rm`, `echo`, `clear`, `whoami`, `uname`, `help`, `curl`, and `history`.
- Interactive scripts and flags: `./deploy.sh`, `curl cv`, `curl projects`, `terraform plan`, `docker ps`.
- Persistent virtual filesystem with realistic directory hierarchy (`/home/yash`, `/etc`, `/var/log`).

### 3. macOS & GNOME Hybrid Fluid Dock
- Horizontal bottom-center dock with continuous cursor-distance wave magnification.
- Dynamic physical margins on hover for clean spacing without overlapping elements.
- Active application indicators beneath running apps.
- Single-layer tooltips positioned above each launcher.

### 4. Real-Time Telemetry & Client Network Detection
- Real-time client network and device platform detection (OS type, connection speed, latency).
- Live desktop Conky widget visualizing CPU core usage, memory allocation, NVMe storage, and AWS infrastructure health.
- Dynamic notification center logging real session events with relative timestamps.

### 5. Multi-Language Localization (i18n)
- Support for 9 languages: English, Hindi, Spanish, German, French, Portuguese, Japanese, Chinese, and Arabic (with dynamic RTL layout switching).
- Deep-linking from the top navigation bar directly to Region & Language settings.

---

## Tech Stack

### Core Technologies
- Framework: React 18 with TypeScript / JavaScript
- Build Tool: Vite
- Styling: Tailwind CSS
- Animation Engine: Framer Motion
- State Management: Zustand with localStorage persistence
- Window Resizing: react-rnd
- Keyboard Shortcuts: react-hotkeys-hook
- Icons: Lucide React

### DevOps & Cloud Focus
- Cloud Providers: Amazon Web Services (AWS)
- Infrastructure as Code: Terraform
- Containerization & Orchestration: Docker, Kubernetes (K8s)
- CI/CD Automation: GitHub Actions
- Observability: Prometheus, Grafana, Alertmanager

---

## Project Structure

```
yash-portfolio/
├── public/                  # Static assets (CV, profile photo, favicon, robots.txt, sitemap.xml)
├── src/
│   ├── components/
│   │   └── Gnome/          # Desktop components (TopBar, Dock, Window, DesktopIcons, etc.)
│   │       └── Apps/       # Individual application windows (Terminal, Projects, Skills, About, etc.)
│   ├── data/               # Portfolio and CV dataset
│   ├── hooks/              # Custom React hooks (useNetworkDevice)
│   ├── lib/                # Utilities, animations, and virtual filesystem
│   ├── locales/            # Translation schemas and language dictionaries
│   ├── store/              # Zustand global state store
│   ├── types/              # TypeScript interfaces and type definitions
│   ├── App.jsx             # Root application component
│   └── index.css           # Global Tailwind and custom scrollbar styles
├── index.html              # HTML entry point with structured SEO metadata
├── package.json            # Project dependencies and npm scripts
├── tailwind.config.js      # Tailwind design tokens and plugins
└── vite.config.js          # Vite configuration
```

---

## Keyboard Shortcuts

- `Super` or `Ctrl + Space`: Open Activities / Application Launcher
- `Alt + Tab` / `Alt + Shift + Tab`: Cycle through open windows
- `Ctrl + Alt + T`: Open Terminal
- `Ctrl + Alt + F`: Open Projects (Files)
- `Ctrl + Alt + A`: Open System Settings (About)
- `Ctrl + Alt + R`: Open Resume PDF
- `Ctrl + Alt + C`: Open Contact Form
- `Ctrl + Alt + P`: Open Projects Showcase
- `Ctrl + Alt + S`: Open Skills Matrix
- `Ctrl + W`: Close active window
- `Ctrl + M`: Minimize active window
- `F11`: Toggle maximized window state
- `Escape`: Close open popovers / modals

---

## Contact & Links

- Developer: Yash Baviskar
- Role: Cloud / DevOps Engineer
- Email: yashbaviskar0215@outlook.com
- Phone: +91 96231 66585
- Website: https://yashbaviskar.me
- LinkedIn: https://linkedin.com/in/yashbaviskar15
- GitHub: https://github.com/yashbaviskar15

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.
