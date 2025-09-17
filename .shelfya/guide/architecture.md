# CouchCursor Plugin Architecture

This document provides an overview of the CouchCursor plugin architecture, detailing its main components and how they interact to deliver the user experience inside Figma and FigJam.

## Overview

CouchCursor is a Figma/FigJam plugin that allows users to drag-and-drop a selection of "couch" images onto their canvas, designating a relaxing spot for their cursor. The plugin is composed of a user interface presented via HTML and a Figma plugin backend powered by TypeScript.

---

## Architecture Diagram

```
+-------------------+       postMessage        +---------------------+
|      ui.html      | <----------------------> |      code.ts        |
| (Frontend: HTML)  |                         | (Figma Backend API) |
+-------------------+                         +---------------------+
         |                                              |
   [User drag image]                                    |
         |                                              |
         |  create-couch-cursor + imageUrl (pluginMessage)
         |--------------------------------------------->|
         |                                              |
         |        [Image fetched, rectangle & label created]
         |<---------------------------------------------|
```

---

## Components

### 1. User Interface (`ui.html`)

- **Function:** Presents draggable images of couches arranged in a responsive container.
- **Interaction:**
  - Users drag a couch image.
  - When the drag ends, a message containing the selected image URL is sent to the Figma plugin backend.
- **Implementation Highlights:**
  - Images are fetched from `https://i.postimg.cc/`.
  - Draggable interaction is managed using JavaScript `dragstart`/`dragend` events.
  - Upon drag end, a `pluginMessage` with `type: 'create-couch-cursor'` and the image's URL is sent to Figma.

**Example UI snippet:**
```html
<img src="https://i.postimg.cc/zDsMPXRC/couch1.png" class="image" draggable="true">
```

---

### 2. Plugin Backend (`code.ts`)

- **Function:** Receives messages from the UI and creates objects on the Figma canvas.
- **Workflow:**
  1. Listens for a message of type `'create-couch-cursor'` with an image URL.
  2. Downloads the image from the provided URL.
  3. Creates a new rectangle node, fills it with the downloaded image, and positions it.
  4. Creates a text label `"Cursors chill couch"` above the image.
  5. Groups the rectangle and text together.
  6. Centers the viewport on the newly created group.

**Backend process illustration:**
```typescript
if (msg.type === 'create-couch-cursor' && msg.imageUrl) {
  const response = await fetch(msg.imageUrl);
  const imageData = await response.arrayBuffer();
  const imageHash = figma.createImage(new Uint8Array(imageData)).hash;
  const rect = figma.createRectangle();
  rect.fills = [{ type: 'IMAGE', scaleMode: 'FILL', imageHash }];
  // ... create text node, group, and viewport centering ...
}
```

---

### 3. Manifest (`manifest.json`)

Defines plugin metadata, permissions, and file associations:
- Specifies `main` backend code (`code.js`) and UI (`ui.html`).
- Restricts network access to image and font resources only.

---

## Data/Message Flow

1. **User Action:** User drags and drops a couch image from the plugin UI.
2. **UI Event:** JavaScript captures `dragend`, posts a message to the plugin backend with the selected image URL.
3. **Plugin Response:** The backend fetches the image, creates UI nodes in the Figma/ FigJam canvas, groups them, and scrolls the viewport to the new group.

**Pseudo-message:**
```js
{ type: 'create-couch-cursor', imageUrl: 'https://i.postimg.cc/...' }
```

---

## Extensibility

- **Adding More Images:** To add new couches, update the images in `ui.html`.
- **Customizing Text:** Change the label in `code.ts`.
- **UI Styling:** Adjust styles directly in the HTML `<style>` block.

---

## References

- [Figma Plugin API](https://www.figma.com/plugin-docs/api/)
- See `code.ts`, `ui.html`, and `manifest.json` in the repository for sourcing or customization.

---

## Summary

CouchCursor’s architecture separates UI and Figma backend logic, enabling a smooth drag-and-drop workflow for users wanting to relax their cursor with playful couches directly in their design workspace.