declare module 'fullpage.js' {
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
    onLeave?: (origin: any, destination: any, direction: string) => void;
    afterLoad?: (origin: any, destination: any, direction: string) => void;
    afterRender?: () => void;
  }

  export default class FullPage {
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
