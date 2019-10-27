import Data from './Data';
import Intervals from './Intervals';
import Note from './Note';
import Notes from './Notes';

class Scale {
    constructor(root, name) {
        if (root instanceof Note || typeof root === 'string') {
            if (typeof name === 'undefined') {
                throw new Error('scale initialized without a name');
            }

            this.root = root instanceof Note ? root : new Note(root);
            this.data = Data.scales.find(name);
            this.intervals = Intervals.byDegrees(this.data.degrees);
            this.notes = this.intervals.getNotes(this.root);
            this.signature = this.notes.getSignature();
        } else if (root instanceof Notes || Array.isArray(root)) {
            this.notes = root instanceof Notes ? root : new Notes(root);
            this.root = this.notes.getRoot();
            this.intervals = this.notes.getIntervals();
            this.signature = this.notes.getSignature();
        } else {
            throw new Error('scale initialized incorrectly');
        }
    }

    getName() {
        return this.data.name;
    }

    getDegrees() {
        return this.intervals.getDegrees();
    }

    getMode(modeNumber) {
        if (typeof modeNumber !== 'number') {
            throw `getMode() only accepts a number. Got type of ${typeof modeNumber}`;
        }

        const modeIndex = modeNumber - 1;
        const indexesLength = this.notes.collection.length;

        if (modeIndex > indexesLength - 1) {
            throw `Mode index is too high. Max mode index is ${indexesLength}`;
        }

        const modeNotes = this.notes.startWith(modeIndex);
        return new Scale(modeNotes);
    }

    getModes() {
        const noteIndexes = [...this.notes.collection.keys()];
        const modeNumbers = noteIndexes.map(index => index + 1);

        return modeNumbers.map(modeNumber => this.getMode(modeNumber));
    }
}

export default Scale;
