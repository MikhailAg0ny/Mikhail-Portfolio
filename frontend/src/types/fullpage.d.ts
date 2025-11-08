declare module 'fullpage.js' {
  type FullPageDirection = 'up' | 'down';

  interface FullPageSection {
    index: number;
    anchor: string;
    item: HTMLElement;
  }

  interface FullPageOptions {
    licenseKey?: string;
    navigation?: boolean;
    navigationPosition?: 'left' | 'right';
    navigationTooltips?: string[];
    anchors?: string[];
    menu?: string;
    scrollingSpeed?: number;
    autoScrolling?: boolean;
    fitToSection?: boolean;
    scrollBar?: boolean;
    easing?: string;
    loopBottom?: boolean;
    loopTop?: boolean;
    normalScrollElements?: string;
    touchSensitivity?: number;
    lockAnchors?: boolean;
    recordHistory?: boolean;
    animateAnchor?: boolean;
    onLeave?: (origin: FullPageSection, destination: FullPageSection, direction: FullPageDirection) => void;
    afterLoad?: (origin: FullPageSection, destination: FullPageSection, direction: FullPageDirection) => void;
    afterRender?: () => void;
  }

  export interface FullPageApi {
    destroy(type?: string): void;
    moveTo(section: number | string, slide?: number): void;
    silentMoveTo(section: number | string, slide?: number): void;
    moveSectionUp(): void;
    moveSectionDown(): void;
    setAutoScrolling(active: boolean): void;
    setFitToSection(active: boolean): void;
    setScrollingSpeed(speed: number): void;
  }

  export default class FullPage implements FullPageApi {
    constructor(selector: string, options: FullPageOptions);
    destroy(type?: string): void;
    moveTo(section: number | string, slide?: number): void;
    silentMoveTo(section: number | string, slide?: number): void;
    moveSectionUp(): void;
    moveSectionDown(): void;
    setAutoScrolling(active: boolean): void;
    setFitToSection(active: boolean): void;
    setScrollingSpeed(speed: number): void;
  }
}

declare module 'fullpage.js/dist/fullpage.css' {
  const content: string;
  export default content;
}

declare global {
  interface Window {
    fullpage_api?: import('fullpage.js').default;
  }
}
