import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { plusIcon, crossIcon, copyIcon } from './icons'

@customElement('my-element')
export class MyElement extends LitElement {
  @property({ type: Array })
  colors: string[] = []

  constructor() {
    super()
    for (let i = 0; i < 200; i++) {
      this.colors.push(this._generateColor());
    }
  }

  private _toggleModal() {
    const modal = this.shadowRoot?.querySelector('.modal');
    if (modal) {
      (modal as HTMLElement).style.display = (modal as HTMLElement).style.display === 'none' ? 'flex' : 'none';
    }
  }

  private _addColor() {
    const colorInput = this.shadowRoot?.querySelector<HTMLInputElement>('#color');
    if (colorInput) {
      const color = colorInput.value;
      this.colors = [...this.colors, color];
    }
    this._toggleModal();
  }

  private _generateColor() {
    let color = Math.floor(Math.random() * 16777215).toString(16);
    while (color.length < 6) {
      color = '0' + color;
    }
    return '#' + color;
  }

  private _copyToClipboard(color: string) {
    navigator.clipboard.writeText(color).then(() => {
      alert(`Copied ${color} to clipboard`);
    });
  }


  private _exportAsJSON() {
    const paletteJSON = JSON.stringify(this.colors, null, 2);
    const blob = new Blob([paletteJSON], { type: 'application/json' });
    this.downloadFile(blob, 'palette.json');
  }

  exportAsCSS() {
    let cssVars = ':root {\n';
    this.colors.forEach((color, index) => {
      cssVars += `  --color-${index + 1}: ${color};\n`;
    });
    cssVars += '}';
    const blob = new Blob([cssVars], { type: 'text/css' });
    this.downloadFile(blob, 'palette.css');
  }

  exportAsSVG() {
    const svgContent = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">${this.colors.map((color, index) => `<rect x="${index * 20}" y="0" width="20" height="100" fill="${color}" />`).join('')}</svg>`;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    this.downloadFile(blob, 'palette.svg');
  }

  downloadFile(blob: Blob, fileName: string) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  render() {
    return html`
      <div class="container">

      <h1 class="title">
        Color Picker
      </h1>

     <div class="plusIcon" @click=${this._toggleModal}>
      ${plusIcon}
     </div>

     <div class="modal">
      <label for="color" class="label_color">Choose a color:</label>
      <input id="color" type="color" value="#ff0000" class="input_color">

      <div class="crossIcon" @click=${this._toggleModal}>
        ${crossIcon}
      </div>

      <button @click=${this._addColor} class="button_color">Add</button>
     </div>

      <div class="grid">
        ${this.colors.map(color => html`<div class="card" style="background-color: ${color};">
          ${color}
          <button @click="${() => this._copyToClipboard(color)}" class="button_copy">
            ${copyIcon}
          </button>
          </div>`)}
      </div>

      <div class="export-buttons">
        <button @click="${this._exportAsJSON}" class="button_export_json">Export as JSON</button>
        <button @click="${this.exportAsCSS}" class="button_export_css">Export as CSS Variables</button>
        <button @click="${this.exportAsSVG}" class="button_export_svg">Export as SVG</button>
      </div>

      </div>
    `
  }

  static styles = css`
    :host {
      width: 100%;
      padding: 0%;
      text-align: center;
      font-family: "Pacifico", cursive;
      font-weight: 400;
      font-style: normal;
    }

    .container {
      width: 100%;
    }

    .title {
      font-size: 3rem;
    }

    .plusIcon{
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20px 0;
      background-color: black;
      color: white;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      padding: 10px;
      position: fixed;
      bottom: 10px;
      right: 10px;
      cursor: pointer;
      z-index: 100;
    }

    .modal {
      position: fixed;
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 20px;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      bottom: 50%;
      right: 50%;
      transform: translate(50%, 50%);
      width: 500px;
      z-index: 200;
    }

    .crossIcon {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: black;
      color: white;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      cursor: pointer;
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 10px;
    }

    .label_color {
      font-size: 4rem;
    }

    .input_color {
      width: 100%;
    }

    .button_color {
      padding: 10px;
      border: none;
      border-radius: 10px;
      background-color: black;
      font-size: 1.5rem;
      color: white;
      cursor: pointer;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      place-items: center;
      gap: 20px;
      padding-bottom: 20px;  
    }

    .card {
      width: 300px;
      height: 300px;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
      position: relative;
    }

    .button_copy {
      position: absolute;
      bottom: 10px;
      right: 10px;
      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      width: 30px;
      height: 30px;
    }

    .button_export_json, .button_export_css, .button_export_svg {
      padding: 10px;
      border: none;
      border-radius: 10px;
      background-color: black;
      font-size: 1rem;
      color: white;
      cursor: pointer;
      margin-bottom: 20px;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
