import './styles/example.scss';
import RangeInputSlider from './index';

(function() {
    new RangeInputSlider({
        element: document.getElementById('slider-1'),
        minPoint: 2,
        maxPoint: 4,
        min: 1,
        max: 5,
        onValueChangeStop: function (newValues) {
            const el = document.getElementById('values-1');
            if (el) {
                el.innerText = newValues.min + ' - ' + newValues.max;
            }
        },
        onValueChange: function (newValues) {
            const el = document.getElementById('values-1');
            if (el) {
                el.innerText =  newValues.min + ' - ' + newValues.max;
            }
        },
        serifs: [
            { position: 0, html: '1' },
            { position: 25, html: '2' },
            { position: 50, html: '3' },
            { position: 75, html: '4' },
            { position: 100, html: '5' }
        ]
    }).init();

    new RangeInputSlider({
        element: document.getElementById('slider-2'),
        minPoint: 18,
        maxPoint: 45,
        min: 18,
        max: 100,
        onValueChangeStop: function (newValues) {
            const el = document.getElementById('values-2');
            if (el) {
                el.innerText = newValues.min + ' - ' + newValues.max;
            }
        },
        onValueChange: function (newValues) {
            const el = document.getElementById('values-2');
            if (el) {
                el.innerText =  newValues.min + ' - ' + newValues.max;
            }
        },
        serifs: [
            { position: 0, html: '18' },
            { position: 100, html: '100' }
        ]
    }).init();


    new RangeInputSlider({
        element: document.getElementById('slider-3'),
        minPoint: 20,
        maxPoint: 50,
        min: 1,
        max: 100,
        step: 10,
        onValueChangeStop: function (newValues) {
            const el = document.getElementById('values-3');
            if (el) {
                el.innerText = newValues.min + ' - ' + newValues.max;
            }
        },
        onValueChange: function (newValues) {
            const el = document.getElementById('values-3');
            if (el) {
                el.innerText =  newValues.min + ' - ' + newValues.max;
            }
        },
        serifs: [
            { position: 0, html: '<span class="small-serif" style="color: red;">1</span><script>alert(1);</script>' },
            { position: 10, html: '<span class="small-serif">10</span>' },
            { position: 20, html: '<span class="small-serif">20</span>' },
            { position: 30, html: '<span class="small-serif">30</span>' },
            { position: 40, html: '<span class="small-serif">40</span>' },
            { position: 50, html: '<span class="small-serif" style="color: red;">50</span>' },
            { position: 60, html: '<span class="small-serif">60</span>' },
            { position: 70, html: '<span class="small-serif">70</span>' },
            { position: 80, html: '<span class="small-serif">80</span>' },
            { position: 90, html: '<span class="small-serif">90</span>' },
            { position: 100, html: '<span class="small-serif" style="color: red;">100</span>' }
        ]
    }).init();

    new RangeInputSlider({
        element: document.getElementById('slider-4'),
        minPoint: 15,
        maxPoint: 45,
        min: 1,
        max: 100,
        onValueChangeStop: function (newValues) {
            const el = document.getElementById('values-4');
            if (el) {
                el.innerText = newValues.min + ' - ' + newValues.max;
            }
        },
        onValueChange: function (newValues) {
            const el = document.getElementById('values-4');
            if (el) {
                el.innerText =  newValues.min + ' - ' + newValues.max;
            }
        },
        serifs: [
            { position: 0, html: '1' },
            { position: 100, html: '100' }
        ],
        cssClasses: {
            wrapper: 'wrapper',
            line: 'line',
            control: 'control',
            activeRange: 'active-range',
            serifs: 'serifs',
            serif: 'serif'
        }
    }).init();
})();