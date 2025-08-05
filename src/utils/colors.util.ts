type ColorFormat = 'hex' | 'rgb' | 'hsl';

const createRegexValidator =
  (pattern: RegExp) =>
  (input: string): boolean =>
    pattern.test(input);

export const isHex: (hex: string) => boolean = createRegexValidator(/^#([0-9A-Fa-f]{3}){1,2}$/);
export const isRGB: (color: string) => boolean = createRegexValidator(/^rgb\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})\)$/i);
export const isHSL: (color: string) => boolean = createRegexValidator(
  /^hsl\((\d{1,3}),\s?(\d{1,3}%),\s?(\d{1,3}%)\)$/i,
);

const toHex = (value: number | string) => Math.round(+value).toString(16).padStart(2, '0');

export function convertHexToRGB(hex: string) {
  if (!isHex(hex)) throw new Error('Invalid hex color');

  const fullHex = hex.length === 4 ? hex.slice(1).replace(/./g, '$&$&') : hex.slice(1);
  const [r, g, b] = fullHex.match(/.{2}/g)!.map((x) => Number.parseInt(x, 16));

  return { b, g, r, toString: () => `rgb(${r}, ${g}, ${b})` };
}

export function convertHexToHSL(hex: string) {
  if (!isHex(hex)) {
    throw new Error('Invalid hex color');
  }

  const { r, g, b } = convertHexToRGB(hex);

  return convertRGBToHSL(r, g, b);
}

export function convertHSLToHex(hue: number, saturation: number, lightness: number) {
  const { r, g, b } = convertHSLToRGB(hue, saturation, lightness);
  return convertRGBToHex(r, g, b);
}

export function convertRGBToHex(red: number | string, green: number | string, blue: number | string) {
  return `#${[red, green, blue].map(toHex).join('')}`;
}

export function convertRGBToHSL(red: number, green: number, blue: number) {
  const clamp = (value: number) => Math.min(255, Math.max(0, value)) / 255;
  const [r, g, b] = [red, green, blue].map(clamp);

  const cmax = Math.max(r, g, b);
  const cmin = Math.min(r, g, b);
  const delta = cmax - cmin;

  let h = 0;
  if (delta) {
    if (cmax === r) h = ((g - b) / delta) % 6;
    else if (cmax === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  const l = ((cmax + cmin) / 2) * 100;
  const s = delta ? (delta / (1 - Math.abs(2 * (l / 100) - 1))) * 100 : 0;

  return {
    h: +h.toFixed(1),
    l: +l.toFixed(1),
    s: +s.toFixed(1),
    toString: () => `hsl(${h}, ${s}%, ${l}%)`,
  };
}

export function convertHSLToRGB(hue: number, saturation: number, lightness: number) {
  const h = ((hue % 360) + 360) % 360;
  const s = Math.min(100, Math.max(0, saturation)) / 100;
  const l = Math.min(100, Math.max(0, lightness)) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  const [r, g, b] = [
    [c, x, 0], // 0° ≤ h < 60°
    [x, c, 0], // 60° ≤ h < 120°
    [0, c, x], // 120° ≤ h < 180°
    [0, x, c], // 180° ≤ h < 240°
    [x, 0, c], // 240° ≤ h < 300°
    [c, 0, x], // 300° ≤ h < 360°
  ][Math.floor(h / 60)] || [0, 0, 0];

  const to255 = (value: number) => Math.round((value + m) * 255);

  return {
    b: to255(b),
    g: to255(g),
    r: to255(r),
    toString: () => `rgb(${to255(r)}, ${to255(g)}, ${to255(b)})`,
  };
}

export class Colorful {
  private _hex = '#000000';
  private _rgb: { r: number; g: number; b: number } = { b: 0, g: 0, r: 0 };
  private _hsl: { h: number; s: number; l: number } = { h: 0, l: 0, s: 0 };
  private _alpha = 0;

  constructor(color = '#000000', alpha = 0) {
    this.setColor(color);
    this.alpha = alpha;
  }

  private extractNumbers(color: string): number[] {
    const matches = color.match(/\d+/g);
    if (!matches) throw new Error('No numbers found in color string');
    return matches.map(Number);
  }

  public getDominantColorFromImage(image: HTMLImageElement, format: ColorFormat = 'rgb'): string {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1;
    canvas.height = 1;

    if (!ctx) throw new Error('Failed to get canvas context');

    //draw the image to one pixel and let the browser find the dominant color
    ctx.drawImage(image, 0, 0, 1, 1);

    //get pixel color
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;

    this.setColor(`rgb(${r}, ${g}, ${b})`);
    this.alpha = (a / 255) * 100;

    return this.getFormat(format);
  }

  public setColor(color: string): void {
    if (isHex(color)) {
      this._hex = color;
      this._rgb = convertHexToRGB(color);
      this._hsl = convertRGBToHSL(this._rgb.r, this._rgb.g, this._rgb.b);
    } else if (isRGB(color)) {
      const [r, g, b] = this.extractNumbers(color);
      this._rgb = { b, g, r };
      this._hsl = convertRGBToHSL(r, g, b);
      this._hex = convertRGBToHex(r, g, b);
    } else if (isHSL(color)) {
      const [h, s, l] = this.extractNumbers(color);
      this._hsl = { h, l, s };
      this._rgb = convertHSLToRGB(h, s, l);
      this._hex = convertRGBToHex(this._rgb.r, this._rgb.g, this._rgb.b);
    } else {
      throw new Error('Invalid color format. Use HEX, RGB, or HSL.');
    }
  }

  public set alpha(value: number) {
    if (value < 0 || value > 100) {
      throw new Error('Alpha must be a number between 0 and 100');
    }
    this._alpha = value;
  }

  public get alpha(): number {
    return this._alpha;
  }

  public getFormat(format: ColorFormat): string {
    const alpha = this._alpha > 0 ? this._alpha / 100 : undefined;
    switch (format) {
      case 'hex':
        if (alpha !== undefined) {
          const a = Math.round(alpha * 255)
            .toString(16)
            .padStart(2, '0');
          return `${this._hex}${a}`;
        }
        return this._hex;
      case 'rgb':
        if (alpha !== undefined) {
          return `rgba(${this._rgb.r}, ${this._rgb.g}, ${this._rgb.b}, ${alpha})`;
        }
        return `rgb(${this._rgb.r}, ${this._rgb.g}, ${this._rgb.b})`;
      case 'hsl':
        if (alpha !== undefined) {
          return `hsla(${this._hsl.h}, ${this._hsl.s}%, ${this._hsl.l}%, ${alpha})`;
        }
        return `hsl(${this._hsl.h}, ${this._hsl.s}%, ${this._hsl.l}%)`;
      default:
        throw new Error(`Unhandled color type: ${format}`);
    }
  }

  public get hex(): string {
    return this.getFormat('hex');
  }

  public get rgb(): { r: number; g: number; b: number } {
    return { ...this._rgb };
  }

  public get hsl(): { h: number; s: number; l: number } {
    return { ...this._hsl };
  }
}
