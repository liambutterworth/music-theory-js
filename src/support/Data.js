import * as data from './data.json';

export default {
    notes: {
        all() {
            return data.notes;
        },

        find(symbol) {
            return this.all().find(note => note.symbols.includes(symbol));
        },

        findIndex(symbol) {
            return this.all().findIndex(note => note.symbols.includes(symbol));
        },

        findByArray(symbols) {
            return symbols.map(symbol => this.find(symbol));
        },

        findByIndex(index) {
            return this.all()[index];
        },
    },

    intervals: {
        all() {
            return data.intervals.filter(interval => {
                return /^[PMm]/.test(interval.symbol);
            });
        },

        find(symbol) {
            return this.all().find(interval => interval.symbol === symbol);
        },

        findByArray(symbols) {
            return symbols.map(symbol => this.find(symbol));
        },

        findBySteps(steps) {
            return this.all().find(interval => interval.steps === steps);
        },
    },

    degrees: {
        all() {
            return data.degrees;
        },

        find(symbol) {
            return this.all().find(degree => degree.symbol === symbol);
        },

        findByArray(symbols) {
            return symbols.map(symbol => this.find(symbol));
        },
    },

    chords: {
        all() {
            return data.chords;
        },

        find(symbol) {
            return this.all().find(chord => chord.symbols.includes(symbol));
        },
    },

    scales: {
        all() {
            return data.scales;
        },

        find(name) {
            return this.all().find(scale => scale.name === name);
        },
    },
};
