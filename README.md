# YashOS 24.04 LTS (Portfolio Edition) - Cloud & DevOps Workstation

An authentic, interactive Linux desktop environment simulating Ubuntu GNOME 46 (Noble Numbat), built to showcase cloud infrastructure projects, DevOps automation, container orchestration, and real-time telemetry.

- Live Portfolio: https://yashbaviskar.me
- Canonical Mirror: https://yashbaviskar15.vercel.app
- Owner: Yash Baviskar, Cloud & DevOps Engineer

---

## 1. Overview & Architecture

YashOS 24.04 LTS is a modular Single Page Application (SPA) designed with a virtual Linux kernel and reactive in-memory virtual filesystem (VFS) persisted to localStorage. Every desktop concept acts as an authentic vehicle for demonstrating real Cloud and DevOps engineering competencies:

- Hardware Boot Pipeline: BIOS/UEFI POST prompt -> GNU GRUB 2.06 menu (with 3-second countdown timer and Executive Recruiter entry) -> Scrolling Systemd boot journal with [ OK ] units -> Plymouth splash -> GDM 46 Login Screen.
- Shell Interpreter: Lexical bash engine supporting pipes (`|`), output redirection (`>`, `>>`), input redirection (`<`), conditional execution (`&&`, `||`, `;`), environment variable expansion (`$VAR`, `$?`), globbing (`*.md`), aliases, command substitution (`$(...)`), and editable `~/.bashrc`.
- Reactive Virtual Filesystem: Single source of truth across all desktop applications (`/home/yash/Desktop`, `/home/yash/Documents`, `/home/yash/Projects`, `/home/yash/experience`, `/etc`, `/proc`, `/var/log`, Trash system).
- GNOME 46 Desktop Shell: TopBar with Activities search, center Calendar & Notification center popover with Do Not Disturb, right Quick Settings cluster (Wifi, Bluetooth, volume slider, brightness slider, night light, dark mode, lock screen, power off), fluid bottom launcher dock, and Yaru window decorations with snap zones.
- Multi-Workspace Engine: Workspaces 1 and 2 with seamless window migration, workspace carousel switcher, and keyboard navigation (`Ctrl+Alt+Left/Right`).
- Mobile Linux Shell (Phosh / Ubuntu Touch): For screen widths below 768px, windows operate in full-viewport application sheet mode (`100dvh`) with native back header navigation and virtual terminal keyboard bar (`Tab`, `Ctrl+C`, `Clear`, `Up`, `Down`, `|`, `~`, `/`, `-`, `&&`).
- Executive Recruiter Layer: Persistent 1-click ATS summary modal accessible from TopBar, Login screen, GRUB, and Context menu with printable view and instant CV downloads (`.pdf` and `.docx`).

---

## 2. Interactive Terminal Commands

### Core Utilities
- `pwd` : Print current working directory.
- `cd [dir]` : Change directory (supports `~`, `..`, `-`, `/`).
- `ls [-l|-a|-la]` : List directory contents with permissions, owner, size, and dates.
- `cat [file]` : Display contents of file or stream standard input.
- `head [-n N] [file]` : Output first N lines of file.
- `tail [-n N] [file]` : Output last N lines of file.
- `grep [-i|-c] <pattern> [file]` : Search text using regex patterns.
- `find [dir] [-name pattern]` : Search directory tree for files matching pattern.
- `wc [-l|-w|-c] [file]` : Print newline, word, and byte counts.
- `tree [dir]` : Display recursive visual directory tree.
- `mkdir [-p] <dir>` : Create new directories.
- `touch <file>` : Create empty file in virtual filesystem.
- `rm [-r|-f|-rf] <file>` : Remove file or directory (moves to Trash).
- `cp <src> <dest>` : Copy file or directory.
- `mv <src> <dest>` : Move or rename file or directory.
- `echo <text>` : Print text or expand variables.
- `date` : Display current system timestamp.
- `cal` : Display current month calendar grid.
- `clear` : Clear terminal viewport.
- `history` : Display numbered command history.
- `alias [name='cmd']` : Display or create shell aliases.
- `export [KEY=VAL]` : Export environment variables.
- `env` : Print all exported environment variables.
- `whoami` : Display current active username (`yash`).
- `hostname` : Display system hostname (`yashos`).
- `id` : Display user and group IDs.
- `uname -a` : Display Linux kernel version (`6.8.0-45-generic`).
- `uptime` : Display system uptime and load average.
- `free -h` : Display RAM memory and swap usage.
- `df -h` : Display filesystem disk usage and mount points.
- `ps aux` : Report snapshot of current active processes.
- `ip a` : Display network IP addresses and interfaces.
- `ping <host>` : Send simulated ICMP network packets.
- `crontab -l` : Display automated cron backup and healthcheck tasks.
- `apt list --installed` : List installed Debian packages.
- `apt search <query>` : Search package repository.
- `apt install <package>` : Simulate installation of Debian package.
- `neofetch` / `fastfetch` : Display system specs and ASCII YashOS logo.

### DevOps & Portfolio Tools
- `terraform plan` / `terraform apply` : Run execution plan against modular AWS 3-tier infrastructure with S3 backend state locking.
- `kubectl get pods -A` : List containerized microservice pods across all Kubernetes namespaces.
- `kubectl get nodes` : Inspect status of Kubernetes cluster worker nodes.
- `docker ps` : List active running containerized application containers.
- `docker images` : Display local container images and repository tags.
- `aws sts get-caller-identity` : Retrieve AWS IAM identity and account metadata.
- `aws s3 ls` : List AWS S3 bucket storage endpoints.
- `git status` : Show working tree status in Git repositories.
- `git log --oneline` : Display work and education milestones as Git commits.
- `systemctl status yash.service` : Check engineering availability and contact status.
- `skills` : Open technical skills matrix.
- `projects` : Open cloud projects gallery.
- `resume` : Open CV document in viewer.
- `contact` / `mail` : Open message composition window.
- `open <file>` / `xdg-open <file>` : Launch file with associated desktop application.

### Easter Eggs & Interactive TUI Modes
- `top` / `htop` : Live interactive system process monitor.
- `cmatrix` : Matrix digital stream terminal animation.
- `sl` : Steam locomotive ASCII animation.
- `cowsay <message>` : Configurable ASCII cow banner.
- `fortune` : Display random computer science quote.
- `vim [file]` / `nano [file]` : Launch working in-terminal text editors.
- `sudo rm -rf /` : Simulated kernel panic and automatic 3-second reboot sequence.

---

## 3. Desktop Keyboard Shortcuts

- `Super` / `Ctrl + Space` : Toggle Activities Overview and CMDK search palette.
- `Super + A` : Open Applications Grid.
- `Ctrl + Alt + T` : Launch Terminal.
- `Ctrl + Alt + F` : Open Files (Nautilus).
- `Ctrl + Alt + A` : Open Settings & About.
- `Ctrl + Alt + R` : Open Document Viewer (Resume PDF).
- `Ctrl + Alt + C` : Open Contact Form.
- `Ctrl + Alt + P` : Open Projects Gallery.
- `Ctrl + Alt + S` : Open Skills Matrix.
- `Ctrl + Alt + Left` / `Ctrl + Alt + Right` : Switch between Workspace 1 and Workspace 2.
- `Super + L` : Lock Desktop Screen.
- `PrintScreen` : Capture screenshot to `~/Pictures/Screenshots/`.
- `Alt + Tab` / `Alt + Shift + Tab` : Cycle forward / backward through active windows.
- `Ctrl + W` : Close active window.
- `Ctrl + M` : Minimize active window.
- `Ctrl + Shift + M` / `F11` : Maximize / Restore active window.
- `Ctrl + Up / Down / Left / Right` : Nudge active window by 20 pixels.
- `Ctrl + Alt + Shift + Left / Right` : Tile active window to 50% left or right screen edge.
- `Ctrl + Alt + Shift + Up` : Tile active window to full screen.
- `Shift + ?` : Open Keyboard Shortcuts Cheat Sheet modal.
- `Escape` : Close context menus, Activities overview, or Recruiter modal.

---

## 4. Application Suite

1. **Terminal (YashOS Bash):** Multi-tab terminal emulator, custom ANSI color themes (Yaru, Matrix, Dracula), font size scaler, command history search (`Ctrl+R`), and mobile virtual keys bar.
2. **Files (Nautilus):** Breadcrumb path bar, Back/Forward/Up history stack, Grid and List layout modes, live search filter, New Folder creation, Trash management, and double-click file associations.
3. **Text Editor (gedit):** Multi-tab document editor with line numbering, syntax highlighting tags (Markdown, Terraform HCL, YAML, Bash, JSON), and direct Save to virtual filesystem.
4. **Document Viewer (Evince):** High-fidelity PDF document rendering, page navigation, zoom controls, and instant download buttons for `.pdf` and `.docx`.
5. **Image Viewer (Eye of GNOME):** Zoom in/out, rotate 90deg, fit to window, and slideshow traversal across AWS cloud architecture maps and screenshots.
6. **Web Browser (Firefox/GNOME Web):** Address bar navigation, bookmarks bar, and rich responsive interactive local cards for GitHub repositories, live AWS architecture maps, and cloud status.
7. **System Monitor & Grafana:** Real-time CPU, RAM, Swap, and Network bandwidth charts, process list with kill signals, disk filesystem usage, and an embedded Grafana telemetry dashboard tab.
8. **Software Center (App Center):** Cloud & DevOps skills packaged as installable Debian packages with ratings, version strings, proficiency badges, and project launch buttons.
9. **Settings:** Appearance (Dark/Light themes, Accent colors, Ubuntu wallpapers), Display (UI text scaling, Night Light warm tint), Sound (UI sound effects synthesizer), Keyboard shortcuts guide, and Factory Reset button.
10. **Utility Apps:** Calculator, Calendar, World Clocks, and Cloud-Region Weather.
11. **Contact App:** Validated form with anti-spam honeypot (`_gotcha`), 45-second rate limiting, single-click copy buttons, and structured `mailto:` payload dispatch.

---

## 5. Manual Setup & Deployment Instructions

### Local Development Setup
```bash
# Clone the repository
git clone https://github.com/yashbaviskar15/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Environment Variables
For contact form forwarding (optional):
- `VITE_FORMSPREE_ENDPOINT`: Optional endpoint URL if routing through Formspree webhook instead of direct mailto dispatch.

### DNS & Canonical Domain Configuration
- Primary Domain: `https://yashbaviskar.me`
- DNS Records:
  - Type `A` Record pointing `@` to Vercel IP: `76.76.21.21`
  - Type `CNAME` Record pointing `www` to `cname.vercel-dns.com`
- Redirects: `vercel.json` provides permanent 301 redirects, security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`), and single-page routing rewrites.
