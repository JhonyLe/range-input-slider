import Validator from './Validator';
import SliderOptions from 'common/SliderOptions';
import { expect } from 'chai';
import 'mocha';

describe('optionsValidate ', () => {
    const options: SliderOptions = {
        min: 1,
        max: 5,
        minPoint: 2,
        maxPoint: 4,
        element: document.createElement('div'),
        onValueChangeStop: () => {}
    };

    it('should be error when max is less then min', () => {
        options.min = 6;
        expect(Validator.optionsValidate.bind(this, options)).to.be.throw();
    });

    it('should change minPoing to min when minPoint is less then min', () => {
        options.minPoint = 0;
        Validator.optionsValidate(options);
        expect(options.minPoint).to.be.equal(options.min);
    });

    it('should change maxPoing to max when maxPoint is more then max', () => {
        options.maxPoint = 10;
        Validator.optionsValidate(options);
        expect(options.maxPoint).to.be.equal(options.max);
    });

    afterEach(() => {
        options.min = 1;
        options.max = 5;
        options.minPoint = 2;
        options.maxPoint = 4;
    });
});

describe('positionsValidation', () => {
    it('should be value when value more then 0 and less then 100', () => {
        let value = 10;
        expect(Validator.positionValidation(value)).to.be.equal(10);
    });

    it('should be 0 when value less then 0', () => {
        let value = -10;
        expect(Validator.positionValidation(value)).to.be.equal(0);
    });

    it('should be 100 when value more then 100', () => {
        let value = 2300;
        expect(Validator.positionValidation(value)).to.be.equal(100);
    });
});