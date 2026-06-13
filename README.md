# Windows 12 Simulator

A high-fidelity, functional web-based simulation of a futuristic "Windows 12" built with Next.js 15, React 19, Tailwind CSS, and Framer Motion.

![Windows 12 Simulator](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop)

## 🌟 Features

### 🖥️ Core OS Experience
- **Modern UI**: Sleek glassmorphic design with rounded corners and subtle shadows.
- **Window Manager**: Fully draggable, resizable, minimizable, and maximizable windows.
- **Taskbar & Start Menu**: Centralized taskbar with app pinning and active window indicators.
- **System Clock**: Real-time clock and date display.

### 📦 Integrated Applications
- **🤖 Copilot (AI Assistant)**: A built-in AI chat interface to assist with tasks.
- **🌐 Web Browser**: Browse the web with a custom address bar and search interface.
- **📝 Notepad**: Fully functional text editor with the ability to save and open files (stored in `localStorage`).
- **🎨 Paint**: HTML5 Canvas-based drawing app with color and brush size controls.
- **🧮 Calculator**: Working calculator for standard mathematical operations.
- **📂 File Explorer**: Navigate a mock virtual filesystem and manage your saved documents.
- **🎵 Music Player**: Interactive UI for playing audio tracks with playlist support.
- **🛍️ Microsoft Store**: Browse, install, and uninstall applications dynamically.

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or pnpm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/windows12-simulator.git
   cd windows12-simulator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to experience Windows 12.

## 🛠️ Tech Stack
- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure
- `src/components/os/`: Core desktop and windowing logic.
- `src/components/apps/`: Individual application implementations.
- `src/store/`: Global OS state management.
- `src/types/`: TypeScript definitions for the OS ecosystem.

## 📝 License
This project is licensed under the MIT License.
