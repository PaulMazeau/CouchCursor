# Getting Started with CouchCursor

CouchCursor is a Figma plugin designed to enhance your workflow within Figma and FigJam. This guide will help you set up, build, and use CouchCursor in your Figma environment.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js and npm](https://nodejs.org/)
- [Figma desktop app](https://www.figma.com/downloads/)
- [TypeScript](https://www.typescriptlang.org/)
- Figma plugin development environment ([Figma plugin documentation](https://www.figma.com/plugin-docs/setup/))

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/PaulMazeau/CouchCursor.git
   cd CouchCursor
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

## Build and Watch

To compile the plugin code or watch for changes during development, use the following npm scripts:

- **Build the plugin:**

  ```bash
  npm run build
  ```

- **Watch for changes:**

  ```bash
  npm run watch
  ```

> The TypeScript compiler will generate the output file (`code.js`) referenced in both `package.json` and `manifest.json`.

## Loading the Plugin in Figma

1. Open Figma desktop.
2. Go to `Plugins > Development > New Plugin...`.
3. Choose `Link existing plugin`, and select the folder containing the `manifest.json` file.
4. The plugin should appear in your development plugins list.

## Usage

Once the plugin is loaded in Figma, launch it via:

- **Figma:** `Plugins > Development > CouchCursor`
- **FigJam:** `Plugins > Development > CouchCursor`

> The UI will load from `ui.html`, allowing you to interact with the plugin features.

## Network Access

CouchCursor is permitted to access resources from domains such as:
- `https://static.figma.com`
- `https://fonts.googleapis.com`
- `https://fonts.gstatic.com`
- `https://i.postimg.cc/`

## Troubleshooting

- Ensure you are running the latest Figma desktop app.
- Make sure all dependencies are installed (`npm install`).
- If you encounter TypeScript errors, confirm your `tsconfig.json` matches the provided settings.

## Additional Resources

- [Figma Plugin Developer Documentation](https://www.figma.com/plugin-docs/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

You're now ready to start using and developing CouchCursor in Figma or FigJam. For updates and community support, check the repository page.