import { searchNext } from "../subtitle";

describe('subtitle', () => {
    it('return current index', () => {
        expect(searchNext([{
            start: 1000,
            end: 3000,
            text: ''
        }, {
            start: 5000,
            end: 6000,
            text: ''
        }, {
            start: 6000,
            end: 8000,
            text: ''
        }], 4, 1)).toBe(1);
    });

    it('return index of 0', () => {
        expect(searchNext([{
            start: 1000,
            end: 3000,
            text: ''
        }, {
            start: 5000,
            end: 6000,
            text: ''
        }, {
            start: 6000,
            end: 8000,
            text: ''
        }], 2, 1)).toBe(0);
    });

    it('return index of 1', () => {
        expect(searchNext([{
            start: 1000,
            end: 3000,
            text: ''
        }, {
            start: 5000,
            end: 6000,
            text: ''
        }, {
            start: 6000,
            end: 8000,
            text: ''
        }], 5, 1)).toBe(1);
    });

    it('return index of 2', () => {
        expect(searchNext([{
            start: 1000,
            end: 3000,
            text: ''
        }, {
            start: 5000,
            end: 6000,
            text: ''
        }, {
            start: 6001,
            end: 8000,
            text: ''
        }], 6.5, 1)).toBe(2);
    });
})