figma.showUI(__html__, { width: 450, height: 300 });

figma.ui.onmessage = async msg => {
  if (msg.type === 'create-couch-cursor' && msg.imageUrl) {
    try {
      // Logique pour créer l'image sur le canevas
      const imageUrl = msg.imageUrl;
      const response = await fetch(imageUrl);
      const imageData = await response.arrayBuffer();
      const imageHash = figma.createImage(new Uint8Array(imageData)).hash;
      const rect = figma.createRectangle();
      rect.resize(400, 200); // Ajustez la taille selon les besoins
      rect.fills = [{ type: 'IMAGE', scaleMode: 'FILL', imageHash }];
      rect.x = 100; // Ces valeurs pourraient être ajustées en fonction de la position de glisser-déposer
      rect.y = 100;
      figma.currentPage.appendChild(rect);

      // Créer le texte
      const textNode = figma.createText();
      await figma.loadFontAsync({ family: "Roboto", style: "Bold" });
      textNode.fontName = { family: "Roboto", style: "Bold" };
      textNode.characters = "Cursors chill couch";
      textNode.fontSize = 32;
      textNode.x = rect.x + (rect.width - textNode.width) / 2;
      textNode.y = rect.y - textNode.height - 10; // 10px au-dessus de l'image
      figma.currentPage.appendChild(textNode);

      figma.viewport.scrollAndZoomIntoView([rect, textNode]);
    } catch (error) {
      console.error('Erreur lors du chargement de l’image ou de la création du texte:', error);
    }
  }
};
