import SliderOptions from 'common/SliderOptions';

class Validator {
    static optionsValidate(options: SliderOptions) {
        if (options.min > options.max) {
            throw new Error('Min must be less then max');
        }
        if (options.minPoint < options.min) {
            options.minPoint = options.min;
        }
        if (options.maxPoint > options.max) {
            options.maxPoint = options.max;
        }
    }

    static positionValidation(value: number) {
        if (value < 0) value = 0;
        if (value > 100) value = 100;
        return value;
    }
}

export default Validator;