# Range input

Realization of capability of range input.

## Demo
You can see demo page [here](https://jhonyle.github.io/range-input-slider/ "Demo page")

## Installation
`npm install range-input-slider --save`

## Documentation
### Interface:
```
    const Slider = new InputRangeSlider({
        element: document.getElementById('slider'),
        minPoint: 50,
        maxPoint: 100,
        min: 1,
        max: 200,
        step: 10,
        onValueChangeStop: (newValues) => {
            console.log('Change', newValues);
        },
        onValueChange: (newValues) => {
            console.log('Change', newValues);
        },
        serifs: [
            { position: 0, html: '<span style="color: red; font-size: 11px;">1</span>' },
            { position: 25, html: '<span style="font-size: 11px;">50</span>' },
            { position: 50, html: '<span style="color: green; font-size: 11px;">100</span>' },
            { position: 75, html: '<span style="font-size: 11px;">150</span>' },
            { position: 100, html: '<span style="color: red; font-size: 11px;">200</span>' }
        ],
        cssClasses: {
            wrapper: 'wrapper',
            lineWrapper: 'lineWrapper',
            line: 'line',
            control: 'control',
            activeRange: 'activeRange',
            serifs: 'serifs',
            serif: 'serif'
        }
    });

    Slider.init();
```

### Methods
*init* - range input initialization

### Settings
| Setting       | Type          | Description   | Example       | Required      |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| min | number | Minimum possible value of range | 1 | yes |
| max | number | Maximum possible value of range | 100 | yes |
| minPoint | number  | Default value for minimum value. Default position of minimum value control will be determ by this value. | 1 | yes |
| maxPoint  | number | Default value for maximum value. Default position of maximum value control will be determ by this value.| 10 | yes |
| step  | number | Value of interval between control position. Default value is 1. | 5 | no |
| element  | HTMLElement  | Element which will be a parent for range input element. | `document.getElementById('price')` | yes|
| onValueChangeStop | function  | Will be called every time when control position changing is stoped. | `(newValues) => {    console.log(`min: ${newValues.min}, max: ${newValues.max} `);    }` | yes |
| onValueChange | function | Will be called every time when control position is changed. | `(newValues) => {    console.log(`min: ${newValues.min}, max: ${newValues.max} `);    } `| no |
| serifs | array | Array of serifs. Serif is object with `position` - value in percents of left serif position and `html` - content of position. | `[{ position: 0, html: '<span style="color: red">1</span>' }, { position: 0, html: '100' }]` | no |
| cssClasses | object | Classes for all internal elements of range input. | ```{    wrapper: 'my-site-wrapper',    lineWrapper: 'my-site-line-wrapper',    line: 'my-site-line',    control: 'my-site-control',    activeRange: 'my-site-active-range',    serifs: 'my-site-serifs',    serif: 'my-site-serif'    }``` | no |


## Development
```
$ npm install
$ npm start
```

## License
MIT
