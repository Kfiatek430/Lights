# Lights - Smart Home Lighting Control System

A modern web application for controlling smart home lighting system built with Next.js, TypeScript, and real-time WebSocket communication.

## 🚀 Features

- **Real-time Control**: WebSocket-based real-time communication for instant lighting updates
- **Room Management**: Organize and control lights by rooms
- **Pattern Presets**: Pre-defined lighting patterns
- **Motion Detection**: Monitor and display motion sensor status
- **Brightness Control**: Adjustable brightness levels

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Kfiatek430/Lights.git
   cd Lights
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_SERVER_URL=backend_server_url
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── common/
│   ├── layout/
│   └── ui/
├── hooks/
├── lib/
│   ├── utils.ts
│   └── constants.ts
├── providers/
├── types/
└── styles/
```

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn](https://ui.shadcn.com/)
- **WebSocket**: [STOMP.js](https://stomp-js.github.io/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
