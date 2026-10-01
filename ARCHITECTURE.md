# YashOS 24.04 LTS (Portfolio Edition) — System Architecture

**Owner:** Yash Baviskar — Cloud & DevOps Engineer  
**Canonical Domain:** [https://yashbaviskar.me](https://yashbaviskar.me) (Vercel: `https://yashbaviskar15.vercel.app`)  
**OS Codename:** *Noble Numbat / Cloud Workstation*  
**Architecture Target:** Modular React 18 + Vite 5 + TypeScript + Zustand + Framer Motion + Virtual Linux Kernel / Shell Engine

---

## 1. High-Level System Topology

```
+-----------------------------------------------------------------------------------+
|                                 YashOS Hardware & Boot                            |
|  [Power-On / BIOS] -> [GRUB Menu] -> [Systemd Target Units] -> [Plymouth Splash]  |
|                                       |                                           |
|                              [GDM Login Screen] <---------------+                 |
|                                       |                         | Log Out         |
+---------------------------------------v-------------------------+-----------------+
|                               GNOME 46 Desktop Shell                              |
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  | TopBar: Activities | Center Clock/Calendar Popover | Quick Settings Cluster |  |
|  +-----------------------------------------------------------------------------+  |
|                                                                                   |
|  +-----------+  +--------------------------------------------+  +--------------+  |
|  | Left Dock |  | Active Workspace 1 / Workspace 2 (Window)  |  | Right Conky  |  |
|  | - Favs    |  | - Yaru Window Frame (Headerbar, Controls)  |  | System HUD   |  |
|  | - Dots    |  | - Snap Zones & Ghost Overlays              |  | (RAM, CPU,   |  |
|  | - AppGrid |  | - Isolated React Error Boundary            |  |  Network)    |  |
|  | - Bounce  |  +--------------------------------------------+  +--------------+  |
|  +-----------+                                                                    |
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  | Desktop Surface: Icons, Rubber-band Drag Selection, Context Menu, Canvas    |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
|                        Core Subsystems & Portfolio Layer                          |
|                                                                                   |
|  +----------------------------------+  +---------------------------------------+  |
|  | Virtual Bash Interpreter (sh.ts) |  | Reactive Virtual Filesystem (vfs.ts)  |  |
|  | - Pipes (|), Redirects (>, >>)   |  | - Single source of truth (/home, /etc)|  |
|  | - Env vars ($VAR), Globbing (*)  |  | - LocalStorage persistence            |  |
|  | - Coreutils + DevOps CLI Tools   |  | - Trash, permissions & metadata       |  |
|  | - Interactive TUI (top, vim)     |  | - File associations launcher          |  |
|  +----------------------------------+  +---------------------------------------+  |
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  | Suite of Complete Desktop Apps:                                             |  |
|  | - Terminal (Multi-tab, Bash Engine, DevOps commands, Easter Eggs)           |  |
|  | - Nautilus Files (Breadcrumbs, Tree, Grid/List, Search, Drag-Drop)          |  |
|  | - gedit Text Editor (Tabs, Line numbers, Syntax highlight, VFS save)        |  |
|  | - Evince Document Viewer (PDF Zoom, Page nav, Direct download)             |  |
|  | - Eye of GNOME Image Viewer (Architecture diagrams, Zoom/Pan)              |  |
|  | - Firefox Browser (Rich Local Previews: GitHub, Topology, Status)           |  |
|  | - System Monitor & Grafana Dashboard (Telemetry, Process tree)             |  |
|  | - Software Center (Skills as installed deb packages, Ratings, Docs)       |  |
|  | - Settings (Appearance, Background, Display Scale, Night Light, Audio)     |  |
|  | - Utilities (Calculator, Calendar, Clocks, Weather, Screenshot, Trash)    |  |
|  | - Contact App (Honeypot, Rate-limiting, Mailto fallback)                    |  |
|  +-----------------------------------------------------------------------------+  |
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  | Executive Recruiter Layer:                                                  |  |
|  | - 1-Click ATS Modal (TopBar, Login, GRUB, Context Menu)                      |  |
|  | - auto-open about.md on first boot with interactive bash hints               |  |
|  | - Guided 3-step skippable tour (Activities, Terminal, Files)                |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

---

## 2. Boot & Power Pipeline Architecture

1. **Power-On & BIOS/UEFI POST (`BootScreen.tsx`):**
   - Emulates hardware initialization with American Megatrends / TianoCore style UEFI prompt (`DEL/F2: Setup`, `F12: Boot Menu`).
2. **GRUB 2.06 Bootloader Menu:**
   - Entries:
     - `* YashOS 24.04 LTS (Portfolio Edition) - Linux 6.8.0-generic`
     - `Advanced options for YashOS` (Recovery mode, Memory test)
     - `Executive Recruiter Mode (Skip desktop & open instant ATS view)`
   - 3-second countdown timer with instant `<Enter>` or mouse selection.
3. **Systemd Scrolling Boot Journal:**
   - High-speed Linux kernel log messages showing real Cloud & DevOps stack initialization:
     - `[  OK  ] Started Docker Application Container Engine`
     - `[  OK  ] Reached target Terraform-Provisioned Infrastructure`
     - `[  OK  ] Initialized Kubernetes (k3s) Cluster Core`
     - `[  OK  ] Started Prometheus Telemetry Node Exporter`
     - `[  OK  ] Reached target Multi-AZ Cloud Architecture`
     - `[  OK  ] Starting GNOME Display Manager (GDM 46.0)...`
4. **Plymouth Splash Screen:**
   - Animated glowing geometric spinner with "YashOS 24.04 LTS".
5. **GDM Login Screen (`LoginScreen.tsx`):**
   - Displays avatar image, "Yash Baviskar", role badge ("Cloud / DevOps Engineer").
   - Password prompt accepting any input or providing hint (`Press Enter to login`).
   - Power cluster in top-right (Accessibility, Network, Battery, Power off).
   - Prominent "Recruiter Fast Access" button.
6. **Power States (`useGnomeStore.ts`):**
   - **Shut Down:** Renders black display with centered glowing power button (`Press to power on`).
   - **Restart:** Clears runtime cache and restarts sequence from BIOS.
   - **Log Out:** Returns to GDM Login Screen with active session preservation.
   - **Suspend:** Dims screen to 2% brightness and wakes immediately on keypress or click.
   - **Lock Screen (`Super+L`):** Renders clock, date, active notifications, unlockable by drag or click.

---

## 3. Shell & Virtual Bash Engine (`src/lib/bashInterpreter.ts`)

The shell is not a static lookup table; it is an interactive lexical interpreter that parses command ASTs and executes against the reactive Virtual File System.

### Parser & Grammar Specification
* **Command Chaining:** `;`, `&&` (execute on exit code 0), `||` (execute on non-zero exit code).
* **Piping (`|`):** Connects `stdout` of LHS command into `stdin` of RHS command (e.g. `cat resume.txt | grep -i aws | wc -l`).
* **Redirection:**
  * `>` Overwrite file destination (e.g. `echo "hello" > test.txt`).
  * `>>` Append to file destination (e.g. `date >> log.txt`).
  * `<` Stdin redirect from file.
* **Variable Expansion:** `$VAR`, `$USER`, `$HOME`, `$SHELL`, `$PATH`, `$PWD`, `$?` (exit code of last command), `${VAR:-default}`.
* **Globbing:** Expansion of `*`, `?`, and `[a-z]` patterns against existing VFS directory entries.
* **Command Substitution:** `$(command)` or `` `command` `` (e.g. `echo "Kernel: $(uname -r)"`).
* **Environment & Config:** Fully editable `/home/yash/.bashrc`, aliases (`ll='ls -la'`, `k='kubectl'`), history buffer (`~/.bash_history`), and `history` navigation.

### Core Command Set
| Command Category | Commands Implemented |
|---|---|
| **File Coreutils** | `ls` (`-l`, `-a`, `-h`, `-t`, `-R`), `cd`, `pwd`, `cat`, `less`, `more`, `head`, `tail`, `grep` (`-i`, `-n`, `-v`), `find`, `wc` (`-l`, `-w`, `-c`), `sort`, `uniq`, `cut`, `tree`, `touch`, `mkdir` (`-p`), `rm` (`-r`, `-f`), `cp` (`-r`), `mv`, `chmod`, `echo`, `printf` |
| **System & Diagnostics** | `uname` (`-a`, `-r`, `-m`), `hostname`, `whoami`, `id`, `uptime`, `free` (`-h`), `df` (`-h`), `lsblk`, `ps` (`aux`), `top` / `htop` (live updating interactive TUI), `ip` (`a`), `ping` (simulated ICMP round-trip), `ss` (`-tulpn`), `systemctl` (`status`, `list-units`), `journalctl`, `crontab` (`-l`, `-e`), `neofetch` / `fastfetch` |
| **Package Manager** | `apt list --installed`, `apt search <query>`, `apt install <pkg>` (simulated dpkg installation with progress bars), `which`, `export`, `env`, `alias`, `history`, `clear`, `exit` |
| **Cloud & DevOps CLI** | `docker ps`, `docker images`, `docker logs <id>`, `kubectl get pods -A`, `kubectl describe pod <name>`, `terraform plan`, `terraform apply`, `aws sts get-caller-identity`, `aws s3 ls`, `git status`, `git log --oneline`, `git diff` |
| **Utilities & IPC** | `xdg-open` / `open <file|app>`, `mail` / `contact`, `resume`, `skills`, `projects`, `curl`, `man <cmd>`, `--help` |
| **Easter Eggs & Games** | `cowsay <text>`, `fortune`, `sl` (steam locomotive animation), `cmatrix` (digital rain matrix), `vim` (interactive mini-modal with `:q!`, `:wq`, `i`), `nano` (working mini-editor), `sudo rm -rf /` (simulated kernel panic + reboot prompt) |

---

## 4. Reactive Virtual Filesystem (`src/lib/virtualFileSystem.ts`)

The VFS acts as the canonical single source of truth across all system applications:

```
/
├── bin/ -> /usr/bin
├── etc/
│   ├── os-release
│   ├── hostname
│   ├── motd
│   └── environment
├── proc/
│   ├── cpuinfo       (dynamically hydrated with navigator.hardwareConcurrency)
│   ├── meminfo       (dynamically hydrated with navigator.deviceMemory)
│   └── uptime        (dynamic session timer)
├── var/
│   └── log/
│       ├── syslog
│       ├── auth.log
│       ├── cloud-init.log
│       └── nginx/access.log
├── home/
│   └── yash/
│       ├── .bashrc
│       ├── .bash_history
│       ├── .ssh/
│       │   └── id_ed25519.pub
│       ├── .config/
│       │   └── gnome-session.json
│       ├── Desktop/
│       │   ├── README.md              (Auto-opens on first boot with OS tips)
│       │   ├── Resume.pdf             (Binary link to CV document)
│       │   ├── AWS-Topology.drawio
│       │   └── Contact-Yash.desktop
│       ├── Documents/
│       │   ├── YASH_BAVISKAR_CV.pdf
│       │   ├── cover-letter.md
│       │   ├── certifications/
│       │   │   ├── aws-cloud-solutions.md
│       │   │   ├── terraform-associate.md
│       │   │   └── docker-certified.md
│       │   └── architecture-notes.md
│       ├── Projects/
│       │   ├── terraform-aws-infrastructure/
│       │   │   ├── main.tf, variables.tf, outputs.tf, README.md, architecture.png
│       │   ├── docker-k8s-microservices/
│       │   │   ├── Dockerfile, deployment.yaml, service.yaml, README.md
│       │   ├── github-actions-cicd/
│       │   │   ├── .github/workflows/deploy.yml, README.md
│       │   └── prometheus-grafana-monitoring/
│       │       ├── prometheus.yml, alertmanager.yml, dashboard.json, README.md
│       │   └── acos-cloud-automation/
│       ├── experience/                (Simulated Git Repo)
│       │   ├── .git/
│       │   ├── 01_education_bca.md
│       │   ├── 02_cloud_projects.md
│       │   └── 03_devops_contributions.md
│       ├── Pictures/
│       │   ├── profile.jpg
│       │   └── Screenshots/
│       └── .local/share/Trash/
│           ├── files/
│           └── info/
```

### VFS Reactive Operations
* **CRUD Capabilities:** `createFile`, `createFolder`, `readFile`, `writeFile`, `deleteNode` (moves to Trash), `restoreFromTrash`, `emptyTrash`, `renameNode`, `copyNode`, `moveNode`.
* **MIME Association Routing:**
  * `.md`, `.txt`, `.json`, `.yml`, `.tf`, `.sh` $\to$ **gedit Text Editor**
  * `.pdf` $\to$ **Evince Document Viewer**
  * `.png`, `.jpg`, `.svg` $\to$ **Eye of GNOME Image Viewer**
  * `.desktop`, `.sh` $\to$ **Terminal Runner**
  * Folders $\to$ **Nautilus Files Manager**
* **Persistence & Recovery:** Synced to `localStorage` under `yashos_vfs_v2` with a "Restore Factory Defaults" action in Settings.

---

## 5. GNOME 46 Desktop Shell Subsystems

### 1. Window Manager (`Window.tsx`, `useGnomeStore.ts`)
* **Multi-Workspace Engine:** Workspaces 1 & 2 with workspace switcher in Activities, seamless window migration, and `Ctrl+Alt+Left/Right` switching.
* **Yaru Visual Fidelity:** Aubergine/warm-charcoal window borders, active focus glow, min/max/close button cluster with proper tooltips, titlebar double-click to maximize, and drag threshold.
* **Snap Zones & Live Ghost Previews:** Dragging to left/right screen edge previews 50% split view; dragging to top previews full-screen maximization.

### 2. Left Dock (`Dock.tsx`)
* App launcher items with running indicator dot, launch bounce animation, hover tooltips, and right-click context menu (*New Window*, *Pin to Dash*, *Quit*).
* Bottom "Show Applications" 9-dot grid button.

### 3. TopBar & Quick Settings (`TopBar.tsx`)
* **Activities Button:** Triggers fullscreen Overview with search bar, active window miniatures, and workspace carousel.
* **Center Calendar & Notification Popover:** Live month calendar, world clocks, system notification feed, and "Do Not Disturb" toggle.
* **Right Quick Settings Cluster:** Unified menu with stateful Wi-Fi selector, Bluetooth toggle, Dark Mode switch, Night Light slider, Volume slider, Brightness slider, Battery percentage, Lock button, and Power Off dialog.
* **Recruiter Fast Access Pill:** High-visibility badge opening the 1-page ATS view.

---

## 6. Complete Native Application Suite

1. **Terminal (`TerminalApp.tsx`):**
   - Multi-tab support, custom ANSI themes (Ubuntu Yaru, Monokai, Dracula, Matrix), font size scaler, live bash engine, history search (`Ctrl+R`), mobile virtual keys bar.
2. **Files / Nautilus (`FilesApp.tsx`):**
   - Sidebar places (Home, Desktop, Documents, Projects, Pictures, Trash), address breadcrumbs path, grid/list view, instant search filter, new folder/file creation, file deletion, properties dialog.
3. **Text Editor / gedit (`TextEditorApp.tsx`):**
   - Multi-tab document editing, line numbering, syntax highlighting for Bash, Terraform HCL, YAML, Markdown, JSON, and direct Save back to VFS.
4. **Document Viewer / Evince (`ResumeApp.tsx`):**
   - PDF zoom, page traversal, search in text, printable mode, and direct download links for both `.pdf` and `.docx`.
5. **Image Viewer / Eye of GNOME (`ImageViewerApp.tsx`):**
   - Zoom in/out, pan, rotate, and slideshow traversal across AWS cloud architecture diagrams and screenshots.
6. **Web Browser / Firefox (`BrowserApp.tsx`):**
   - Navigation toolbar, URL bar, bookmarks bar, and rich responsive interactive previews for GitHub repositories, live AWS architecture maps, and cloud status.
7. **System Monitor & Grafana Dashboard (`SystemMonitorApp.tsx`):**
   - Real-time CPU, RAM, Swap, and Network bandwidth charts, running processes table with kill signals, disk filesystem usage, and an embedded Grafana telemetry dashboard tab.
8. **Software Center / App Center (`SoftwareCenterApp.tsx`):**
   - Yash's Cloud & DevOps skills packaged as installable Debian packages with ratings, version strings, proficiency badges, and "Launch Project" actions.
9. **Settings App (`AboutApp.tsx`):**
   - Appearance (Dark/Light, Accent color palette, Ubuntu wallpapers), Display (Text Scaling, Night Light, Resolution), Sound (UI sounds enable/disable), Keyboard Shortcuts guide, About YashOS info, and Factory Reset button.
10. **Executive Recruiter View (`RecruiterView.tsx`):**
    - One-page ATS executive summary with skills breakdown, verified GitHub links, direct CV downloads, contact copy buttons, and CEFR language proficiencies.

---

## 7. Mobile Linux (Phosh / Ubuntu Touch Experience)

* For screen widths $< 768\text{px}$:
  * Windows operate in full-viewport application sheet mode (`100dvh`).
  * Top system status bar with time, battery, wifi, and notification pill.
  * Native mobile app header with prominent `<ArrowLeft />` back button, app title, and `<X />` close action.
  * Terminal provides an extra utility bar above the mobile soft keyboard with `Tab`, `Ctrl`, `Esc`, `|`, `~`, `/`, `-`, and arrow keys.
  * Touch long-press (500ms) triggers desktop/file context menus.

---

## 8. Accessibility, Sound & Performance Metrics

* **WCAG 2.1 AA Compliance:** Minimum 4.5:1 contrast ratios across Yaru dark and light themes, keyboard tab rings (`focus-visible:ring-2 focus-visible:ring-orange-500`), ARIA dialog roles, and screen-reader labels.
* **Audio Synthesis Engine (`soundEffects.ts`):** Web Audio API synthesized UI audio cues (login chime, notification ding, click pop, volume slider beep) with default mute and explicit user opt-in.
* **Performance Budget:** Sub-8-second boot, lazy chunk splitting for heavy sub-applications, pre-rendered `<noscript>` semantic fallback, and 60fps Framer Motion spring physics.
