export interface CssClasses {
    wrapper?: string;
    lineWrapper?: string;
    line?: string;
    control?: string;
    activeRange?: string;
    serifs?: string;
    serif?: string;
}

export interface Serif {
    position: number,
    html: string
}

export interface Values {
    min: number;
    max: number;
}

export const controlInformation: any = {
    MIN: 1,
    MAX: 2,
    UNKNOWN: 0
};

interface SliderOptions {
    minPoint: number;
    maxPoint: number;
    onValueChange?(values: Values): any;
    onValueChangeStop(values: Values): any;
    min: number;
    max: number;
    element?: HTMLElement | null;
    orientation?: string; // will be nedded in future versions
    cssClasses?: CssClasses;
    serifs?: Serif[];
    step?: number;
}

export default SliderOptions;