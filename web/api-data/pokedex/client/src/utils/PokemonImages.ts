// @ts-nocheck
export const importImageByFilename = async (filename: string) => {
  const shinyImages = import.meta.glob('../assets/pokemons/shiny/*.(png|jpe?g|svg)', { eager: true });
  const defaultImages = import.meta.glob('../assets/pokemons/default/*.(png|jpe?g|svg)', { eager: true });

  const supportedExtensions = ['png', 'jpg', 'jpeg', 'svg'];

  for (const extension of supportedExtensions) {
    const shinyPath = `../assets/pokemons/shiny/${filename}.${extension}`;
    const defaultPath = `../assets/pokemons/default/${filename}.${extension}`;

    // Check in shiny folder first
    if (shinyImages[shinyPath]) {
      return shinyImages[shinyPath].default;
    }
    // If not found, check in default folder
    else if (defaultImages[defaultPath]) {
      return defaultImages[defaultPath].default;
    }
  }

  throw new Error(`Image ${filename} not found in either shiny or default folders.`);
};