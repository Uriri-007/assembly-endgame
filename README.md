# Assembly Endgame

A modern web application built with **React 19** and **Vite 7**, designed to deliver fast development and production builds with Hot Module Replacement (HMR).

## 🚀 Features

- **React 19.1.1** - Latest version of React for building dynamic user interfaces
- **Vite 7.1.7** - Lightning-fast build tool with instant HMR for seamless development
- **ESLint Configuration** - Integrated linting to maintain code quality
- **CSS Utilities** - Includes `clsx` for conditional className management
- **React Hooks Support** - Optimized ESLint rules for React Hooks

## 📁 Project Structure

```
assembly-endgame/
├── src/                  # Source files for your React components
├── public/               # Public static assets
├── index.html            # Main HTML entry point
├── package.json          # Project dependencies and scripts
├── vite.config.js        # Vite configuration
├── eslint.config.js      # ESLint configuration
└── README.md             # This file
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Uriri-007/assembly-endgame.git

# Navigate to the project directory
cd assembly-endgame

# Install dependencies
npm install
```

### Development

Start the development server with HMR enabled:

```bash
npm run dev
```

The application will open in your browser at `http://localhost:5173` (default Vite port).

### Build

Create a production-ready build:

```bash
npm run build
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

### Linting

Check code quality with ESLint:

```bash
npm run lint
```

## 📦 Dependencies

### Core
- **react** (^19.1.1) - UI library
- **react-dom** (^19.1.1) - React DOM rendering

### Utilities
- **clsx** (^2.1.1) - Conditional className utility

## 🔧 Development Dependencies

- **Vite** (^7.1.7) - Build tool and dev server
- **@vitejs/plugin-react** (^5.0.4) - Vite plugin for React with Babel
- **ESLint** (^9.36.0) - Code quality tool
- **ESLint Plugins** - React-specific linting rules
- **TypeScript Types** - Type definitions for React and React-DOM

## 📝 Notes

- The **React Compiler** is not enabled by default due to performance impact on development and build times. See the [React Compiler documentation](https://react.dev/learn/react-compiler/installation) to enable it if needed.
- For production applications, consider using TypeScript with type-aware ESLint rules. Refer to the [Vite React TypeScript template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for setup guidance.

## 🤝 Contributing

Feel free to fork this repository and submit pull requests for any improvements!

## 📄 License

This project is provided as-is. Feel free to use it as a starter template for your projects.

---

**Created:** October 2025  
**Last Updated:** March 2026
