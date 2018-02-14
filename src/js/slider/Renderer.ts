import { CssClasses, Serif, controlInformation } from 'common/SliderOptions';
import Validator from 'slider/Validator';

const CLASSES_NAMES = {
    slider: 'input-range-slider',
    wrapper: 'input-range-slider__line-wrapper',
    control: 'input-range-slider__control',
    minControl: 'input-range-slider__control_min',
    maxControl: 'input-range-slider__control_max',
    activeRange: 'input-range-slider__active-range',
    serifs: 'input-range-slider__serifs',
    serif: 'input-range-slider__serifs-item'
};

const STEPS = [ 1, 5, 10, 50, 100, 500, 1000, 10000, 100000 ];

class Renderer {
    private element: HTMLElement | null;
    private cssClasses: CssClasses | undefined;
    private min : number;
    private max: number;
    private serifs: Serif[] | undefined;
    private withSerifs: boolean;
    private elements: any = {
        wrapper: HTMLElement,
        lineWrapper: HTMLElement,
        line: HTMLElement,
        minControl: HTMLElement,
        maxControl: HTMLElement,
        activeRange: HTMLElement,
    };


    constructor(
        element: HTMLElement | null,
        cssClasses: CssClasses | undefined,
        min: number,
        max: number,
        serifs: Serif[] | undefined
    ) {
       this.element = element;
       this.cssClasses = cssClasses;
       this.min = min;
       this.max = max;
       this.serifs = serifs;
    }

    private static safeJs (htmlCode: string) {
        return htmlCode.replace(/<script[^>]*>[\S\s]*?<\/script[^>]*>/ig, '');
    }

    /*
     * Returns number which control is target
     */
    getControlByTarget(target: any) {
        const listOfClasses = target.classList;
        if (listOfClasses.contains(CLASSES_NAMES.control)) {
            if (listOfClasses.contains(CLASSES_NAMES.minControl)) {
                return controlInformation.MIN;
            } else if (listOfClasses.contains(CLASSES_NAMES.maxControl)) {
                return controlInformation.MAX;
            }
        }
        return controlInformation.UNKNOWN;
    }

    public setMinControlPosition(left: number) {
        left = Validator.positionValidation(left);
        const maxControlLeft = parseInt(this.elements.maxControl.style.left, 10) || 100;

        if (this.element && left <= maxControlLeft) {
            this.elements.minControl.style.left = left + '%';
        }
    }

    public setMaxControlPosition(left: number) {
        left = Validator.positionValidation(left);
        const minControlLeft = parseInt(
            this.elements.minControl.style.left, 10
        ) || 0;

        if (this.element && left >= minControlLeft) {
            this.elements.maxControl.style.left = left + '%';
        }
    }

    public setActiveRangePosition(left?: number | null, right?: number | null) {
        if (this.element) {
            const activeRange: HTMLElement = this.elements.activeRange;
            if (typeof left === 'number') {
                left = Validator.positionValidation(left);
            } else {
                left = parseInt(String(activeRange.style.left), 10);
            }
            if (typeof right  === 'number') {
                right = 100 - Validator.positionValidation(right);
            } else {
                right = parseInt(String(activeRange.style.right), 10);
            }
            activeRange.style.left = left + '%';
            activeRange.style.right = right + '%';
        }
    }

    public getSliderLeftAndRightPositions() {
        return {
            left: this.elements.wrapper.getBoundingClientRect().left,
            right: this.elements.wrapper.getBoundingClientRect().left + this.elements.wrapper.clientWidth
        }
    }

    public getStep(currentStep: number | undefined) {
        const lengthInPX = this.elements.wrapper.clientWidth;
        let step = (this.max - this.min) / lengthInPX;
        if (currentStep && currentStep >= step) return currentStep;

        if (step <= 1) step = 1;
        for (let i = 1; i < STEPS.length; i++) {
            if (step > STEPS[i - 1] && step <= STEPS[i]) {
                step = STEPS[i];
                break;
            }
        }
        if (currentStep) console.warn(`WARNING! Step value ${currentStep} can't be applied. Step has modified to nearest correct value ${step}.`);
        return step;
    }

    public getControlsPositions() {
        return {
            min: parseInt(this.elements.minControl.style.left, 10),
            max: parseInt(this.elements.maxControl.style.left, 10)
        }
    }

    public render() {
        const fragment: DocumentFragment = document.createDocumentFragment();
        this.elements.wrapper = document.createElement('div');
        this.elements.wrapper.classList.add(CLASSES_NAMES.slider);
        if (this.cssClasses && this.cssClasses.wrapper) {
            this.elements.wrapper.classList.add(this.cssClasses.wrapper);
        }

        this.elements.lineWrapper = document.createElement('div');
        this.elements.lineWrapper.classList.add(CLASSES_NAMES.wrapper);
        if (this.cssClasses && this.cssClasses.lineWrapper) {
            this.elements.lineWrapper.classList.add(this.cssClasses.lineWrapper);
        }

        this.elements.line = document.createElement('div');
        this.elements.line.classList.add('input-range-slider__line');
        if (this.cssClasses && this.cssClasses.line) {
            this.elements.line.classList.add(this.cssClasses.line);
        }

        this.elements.minControl = document.createElement('div');
        this.elements.minControl.classList.add(CLASSES_NAMES.control, CLASSES_NAMES.minControl);
        this.elements.maxControl = document.createElement('div');
        this.elements.maxControl.classList.add(CLASSES_NAMES.control, CLASSES_NAMES.maxControl);
        if (this.cssClasses && this.cssClasses.control) {
            this.elements.minControl.classList.add(this.cssClasses.control);
            this.elements.maxControl.classList.add(this.cssClasses.control);
        }

        this.elements.activeRange = document.createElement('div');
        this.elements.activeRange.classList.add(CLASSES_NAMES.activeRange);
        if (this.cssClasses && this.cssClasses.activeRange) {
            this.elements.activeRange.classList.add(this.cssClasses.activeRange);
        }

        this.elements.lineWrapper.appendChild(this.elements.minControl);
        this.elements.lineWrapper.appendChild(this.elements.maxControl);
        this.elements.lineWrapper.appendChild(this.elements.activeRange);
        this.elements.lineWrapper.appendChild(this.elements.line);
        this.elements.wrapper.appendChild(this.elements.lineWrapper);

        // serifs
        if (this.serifs) {
            const serifs: HTMLElement = document.createElement('div');
            serifs.classList.add(CLASSES_NAMES.serifs);
            if (this.cssClasses && this.cssClasses.serifs) {
                serifs.classList.add(this.cssClasses.serifs);
            }
            for (let i = 0; i < this.serifs.length; i++) {
                const serif: HTMLElement = document.createElement('div');
                if ('html' in this.serifs[i]) {
                    serif.innerHTML = Renderer.safeJs(this.serifs[i].html);
                }
                if ('position' in this.serifs[i]) {
                    serif.style.left = `${this.serifs[i].position}%`;
                }
                serif.classList.add(CLASSES_NAMES.serif);
                if (this.cssClasses && this.cssClasses.serif) {
                    serif.classList.add(this.cssClasses.serif);
                }
                serifs.appendChild(serif);
            }
            this.elements.wrapper.appendChild(serifs);
        }

        fragment.appendChild(this.elements.wrapper);

        if (this.element) {
            this.element.appendChild(fragment);
        }
    }
}

export default Renderer;