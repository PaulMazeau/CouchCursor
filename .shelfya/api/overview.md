# CouchCursor API Overview

**CouchCursor** is a Figma & FigJam plugin that enables users to quickly insert a "Couch Cursor" graphic into their document, complete with a custom image fill and annotated text. This document provides an overview of the plugin's API-like interactions, usage, and technical details relevant to developers and curious users.

---

## Key Features

- **Insert Graphic:** Add a pre-sized rectangle filled with a user-provided image onto the canvas.
- **Automatic Text Label:** A text label ("Cursors chill couch") is added and positioned above the rectangle.
- **Grouping and Positioning:** The image and text are grouped together for easy manipulation.
- **Works in Figma & FigJam:** Compatible with both editors.

---

## How It Works

### Workflow

1. **Display UI:**
   - The plugin opens a UI (`ui.html`) for user interaction.

2. **Message Format:**
   - The plugin expects a message of type `create-couch-cursor` with an `imageUrl` specifying the image source.

   ```json
   {
     "type": "create-couch-cursor",
     "imageUrl": "https://i.postimg.cc/example-couch.png"
   }
   ```

3. **On Message Reception:**
   - The plugin fetches the image from the supplied `imageUrl`.
   - It creates a rectangle (400×200px), sets its fill to the image, and places it at position (100, 100).
   - It creates a bold Roboto text node ("Cursors chill couch") above the rectangle.
   - Both nodes are grouped together as "Couch Cursor" and focused in the viewport.

---

## Example Usage

Below is a conceptual example for plugin UI → code communication:

```js
// Sending a message from your UI (pseudo-code)
parent.postMessage({
  pluginMessage: {
    type: 'create-couch-cursor',
    imageUrl: 'https://i.postimg.cc/your-image.png'
  }
}, '*');
```

The plugin code (TypeScript) responds to this message and creates the artwork.

---

## Supported Image Sources

Only images hosted on the following domains are supported due to network restrictions:

- `https://static.figma.com`
- `https://fonts.googleapis.com`
- `https://fonts.gstatic.com`
- `https://i.postimg.cc/`

---

## Requirements

- **Figma Editor or FigJam**
- The "Roboto" font (Bold) must be available in Figma (plugin attempts to load it automatically).

---

## Development

Install dependencies and build:

```sh
npm install
npm run build
# Or, for auto-rebuild on changes:
npm run watch
```

---

## Licensing & Credits

- Plugin makes use of Figma Plugin API.
- Font usage via [Google Fonts](https://fonts.google.com/specimen/Roboto).
- Review [package.json](../../package.json) for dev dependencies.

---

For more technical details or to contribute, see the repository [README](../../README.md) or explore the source files.