import Data from './Data';
import Interval from './Interval';

class Note {
    static byDegree(degree, root) {
        const interval = Interval.byDegree(degree);
        return this.byInterval(interval, root);
    }

    static byInterval(interval, root) {
        interval = interval instanceof Interval ? interval : new Interval(interval);
        root = root instanceof Note ? root : new Note(root);

        if (interval.getSteps() === 0) {
            return root;
        }

        const rootSymbol = root instanceof Note ? root.symbol : root;
        const rootIndex = Data.notes.findIndex(rootSymbol);
        const intervalSteps = interval.getSteps();
        const noteIndex = (rootIndex + intervalSteps) % 12;
        const noteData = Data.notes.findByIndex(noteIndex);
        const noteSignature = root.getSignature();

        return new Note(noteData, noteSignature);
    }

    constructor(data, signature) {
        if (typeof data === 'string') {
            this.data = Data.notes.find(data);
            this.symbol = data;
        } else if (typeof data === 'object') {
            this.data = data;
            this.symbol = this.getSymbol(signature);
        } else {
            throw `Note only accepts a string or object. Got type of ${typeof data}`;
        }
    }

    isAccidental() {
        return this.data.type === 'accidental';
    }

    isNatural() {
        return this.data.type === 'natural';
    }

    isFlat() {
        return /[A-G]b*/.test(this.symbol);
    }

    isSharp() {
        return /[A-G]#*/.test(this.symbol);
    }

    isDoubleFlat() {
        return /[A-G]bb/.test(this.symbol);
    }

    isDoubleSharp() {
        return /[A-G]##/.test(this.symbol);
    }

    isDoubled() {
        return this.isDoubleFlat() || this.isDoubleSharp();
    }

    getSymbol(signature) {
        let symbol;

        if (typeof this.symbol !== 'undefined') {
            symbol = this.symbol;
        } else if (this.isNatural()) {
            symbol = this.data.symbols.find(symbol => /[A-G](?!b|#)/.test(symbol));
        } else {
            const sign = typeof signature === 'undefined' || signature === 'flat' ? /b/ : /#/;
            symbol = this.data.symbols.find(symbol => sign.test(symbol));
        }

        return symbol;
    }

    getId() {
        return this.data.symbols.join('');
    }

    getLetter() {
        return this.symbol.match(/([A-G])/)[1];
    }

    getSign() {
        return this.symbol.match(/[A-G](.*)/)[1];
    }

    getSymbolIndex() {
        return this.data.symbols.indexOf(this.symbol);
    }

    getSignature() {
        let signature;

        if (/b|#/.test(this.symbol)) {
            signature = /b/.test(this.symbol) ? 'flat' : 'sharp';
        } else {
            signature = this.symbol === 'F' ? 'flat' : 'sharp';
        }

        return signature;
    }

    getDegreeWith(note) {
        return this.getIntervalWith(note).getDegree();
    }

    getIntervalWith(note) {
        const targetSymbol = note instanceof Note ? note.symbol : note;
        const unsortedTargetIndex = Data.notes.findIndex(targetSymbol);
        const notes = Data.notes.all();
        const notesToAppend = notes.slice(0, unsortedTargetIndex);
        const notesToPrepend = notes.slice(unsortedTargetIndex);
        const sortedNotes = notesToPrepend.concat(notesToAppend);
        const targetIndex = sortedNotes.findIndex(note => note.symbols.includes(targetSymbol)) || 12;
        const currentIndex = sortedNotes.findIndex(note => note.symbols.includes(this.symbol)) || 12;
        const steps = Math.abs(currentIndex - targetIndex);
        const interval = Interval.bySteps(steps);

        return interval;
    }

    resolveSign(signature) {
        const sign = signature === 'flat' ? /b/ : /#/;

        if ((this.isAccidental() || this.isDoubled()) && !sign.test(this.getSign())) {
            this.symbol = this.data.symbols.find(symbol => sign.test(symbol));
        }
    }

    resolveLetter(signature) {
        if (typeof signature === 'undefined') {
            throw 'Signature must be defined when resolving a note letter';
        }

        if (signature === 'flat') {
            this.lowerSymbol();
        } else {
            this.raiseSymbol();
        }
    }

    lowerSymbol() {
        const symbols = this.data.symbols.slice();
        symbols.splice(this.getSymbolIndex(), 1);

        const symbol = symbols.find(symbol => {
            return /b/.test(symbol)
        });

        if (typeof symbol !== 'undefined') {
            this.symbol = symbol;
        }
    }

    raiseSymbol() {
        const symbols = this.data.symbols.slice();
        symbols.splice(this.getSymbolIndex(), 1);

        const symbol = symbols.find(symbol => {
            return /#/.test(symbol)
        });

        if (typeof symbol !== 'undefined') {
            this.symbol = symbol;
        }
    }
}

export default Note;
