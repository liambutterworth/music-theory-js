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
            return data.intervals;
        },

        unique() {
            return data.intervals.filter(interval => {
                return /^[PMm]|d5/.test(interval.symbol);
            });
        },

        find(symbol) {
            return this.all().find(interval => interval.symbol === symbol);
        },

        findByArray(symbols) {
            return symbols.map(symbol => this.find(symbol));
        },

        findByDegree(degree) {
            return this.all().find(interval => interval.degree === degree);
        },

        findBySteps(steps) {
            return this.all().find(interval => interval.steps === steps);
        },

        filterBySteps() {
            return this.all().filter(interval => interval.steps === steps);
        }
    },

    degrees: {
        all() {
            return data.degrees;
        },

        find(symbol) {
            return this.all().find(degree => degree.symbol === symbol);
        },

        findByInterval(interval) {
            return this.all().find(degree => degree.interval === interval);
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

        findByDegrees(degrees) {
            return this.all().find(scale => {
                let found;

                if (scale.degrees.length === degrees.length) {
                    found = scale.degrees.every(degree => degrees.includes(degree));
                } else {
                    found = false;
                }

                return found;
            });
        }
    },
};
