import SliderOptions, { controlInformation } from 'common/SliderOptions';
import { isTouchSupported, MOUSE_EVENTS } from 'common/Events';
import Validator from 'slider/Validator';
import Renderer from 'slider/Renderer';
import '../../styles/slider.scss';

class RangeInputSlider {
    private options: SliderOptions;
    private renderer: Renderer;
    private mouseDown: EventListenerObject;
    private mouseMove: EventListenerObject;
    private mouseUp: EventListenerObject;
    private activeControl: number; // 1 - min, 2 - max, 0 - not active control
    private step: number = 0;


    constructor(options: SliderOptions) {
        this.options = options;
        this.renderer = new Renderer(options.element, options.cssClasses, options.min,  options.max, options.serifs);
        this.mouseDown = this.onMouseDown.bind(this);
        this.mouseMove = this.onMouseMove.bind(this);
        this.mouseUp = this.onMouseUp.bind(this);
    }

    public init() {
        Validator.optionsValidate(this.options);
        this.renderer.render();
        this.step = this.renderer.getStep(this.options.step);

        const minControlPosition = this.calculateControlPostionByValue(this.options.minPoint);
        const maxControlPosition = this.calculateControlPostionByValue(this.options.maxPoint);
        this.renderer.setMinControlPosition(minControlPosition);
        this.renderer.setMaxControlPosition(maxControlPosition);

        this.renderer.setActiveRangePosition(minControlPosition, maxControlPosition);

        if (this.options.element) {
            this.options.element.addEventListener(MOUSE_EVENTS.mousedown, this.mouseDown);
        }
    }

    private calculateControlPostionByValue(value: number) {
        return (value - this.options.min) * 100 / (this.options.max - this.options.min);
    }

    private calculateValuesByPosition(position: number) {
        let value = Math.round(position * (this.options.max - this.options.min) / 100) + this.options.min;
        if (this.step && value % this.step !== 1 && value > this.options.min && value < this.options.max) {
            value = Math.round(value / this.step) * this.step;
        }
        return value;
    }

    private onMouseDown(e: MouseEvent) {
        document.body.style.userSelect = 'none';
        document.body.style.webkitUserSelect = 'none';
        (document.body.style as any).MozUserSelect = 'none';
        document.body.setAttribute('unselectable', 'on');

        this.activeControl = this.renderer.getControlByTarget(e.target);

        if (this.activeControl) {
            document.documentElement.addEventListener(MOUSE_EVENTS.mouseup, this.mouseUp);
            document.documentElement.addEventListener(MOUSE_EVENTS.mousemove, this.mouseMove);
        }
    }

    private onMouseMove(e: MouseEvent | any) {
        const positions = this.renderer.getSliderLeftAndRightPositions();
        const pageX = isTouchSupported ? e.changedTouches[e.changedTouches.length - 1].pageX : e.pageX;
        const left = Validator.positionValidation((pageX - positions.left) * 100 / (positions.right - positions.left));

        if (this.activeControl === controlInformation.MIN) {
            this.renderer.setMinControlPosition(left);
            this.renderer.setActiveRangePosition(left);
        } else {
            this.renderer.setMaxControlPosition(left);
            this.renderer.setActiveRangePosition(null, left);
        }

        if ('onValueChange' in this.options && this.options.onValueChange) {
            const positions = this.renderer.getControlsPositions();
            let minPoint;
            let maxPoint;
            if (this.activeControl === controlInformation.MIN) {
                minPoint = this.calculateValuesByPosition(left);
                maxPoint = this.calculateValuesByPosition(positions.max);
            } else {
                minPoint = this.calculateValuesByPosition(positions.min);
                maxPoint = this.calculateValuesByPosition(left);
            }
            this.options.onValueChange({
                min: minPoint,
                max: maxPoint
            });
        }
    }

    private onMouseUp(e: MouseEvent) {
        document.documentElement.removeEventListener(MOUSE_EVENTS.mouseup, this.mouseUp);
        document.documentElement.removeEventListener(MOUSE_EVENTS.mousemove, this.mouseMove);

        const positions = this.renderer.getControlsPositions();
        const minPoint = this.calculateValuesByPosition(positions.min);
        const maxPoint = this.calculateValuesByPosition(positions.max);

        const minControlPosition = this.calculateControlPostionByValue(minPoint);
        const maxControlPosition = this.calculateControlPostionByValue(maxPoint);

        if (this.activeControl === controlInformation.MIN) {
            this.renderer.setMinControlPosition(minControlPosition);
        } else {
            this.renderer.setMaxControlPosition(maxControlPosition);
        }
        this.renderer.setActiveRangePosition(minControlPosition, maxControlPosition);

        this.options.onValueChangeStop({
            min: minPoint,
            max: maxPoint
        });
        this.activeControl = controlInformation.UNKNOWN;

    }
}

export default RangeInputSlider;
