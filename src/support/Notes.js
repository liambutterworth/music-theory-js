import Data from './Data';
import Intervals from './Intervals';
import Note from './Note';

class Notes {
    static all(signature = 'flat') {
        const notes = Data.notes.all().map(data => new Note(data, signature));
        return new Notes(notes);
    }

    static byDegrees(degrees, root) {
        const notes = degrees.map(degree => Note.byDegree(degree, root));
        return new Notes(notes);
    }

    static byIntervals(intervals, root) {
        const notes = intervals.map(interval => Note.byInterval(interval, root));
        return new Notes(notes);
    }

    constructor(notes) {
        this.collection = notes.map(note => {
            return note instanceof Note ? note : new Note(note);
        });

        this.root = notes[0];
        this.resolveSigns();

        if (/bbb+|###+/.test(this.root.symbol)) {
            throw new Error(`${this.root.symbol}: why would you do this? we live in a society`);
        }

        if (['B##', 'Cbb', 'Fbb', 'E##'].includes(this.root.symbol)) {
            throw new Error(`${this.root.symbol}: using a root that doubles across B/C and E/F does weird things`);
        }

        if (this.collection.length <= 7) {
            this.resolvedNotes = [this.root.getId()];
            this.resolveLetters();
            delete this.resolvedNotes;
        }
    }

    getRoot() {
        return this.collection[0];
    }

    getSignature() {
        return this.getRoot().getSignature();
    }

    getDegrees() {
        const degrees = this.collection.map(note => {
            return this.getRoot().getDegreeWith(note);
        });

        return new Degrees(degrees);
    }

    getIntervals() {
        const intervals = this.collection.map(note => {
            return this.getRoot().getIntervalWith(note);
        });

        return new Intervals(intervals);
    }

    resolveSigns() {
        this.collection.forEach(note => {
            note.resolveSign(this.getSignature());
        });
    }

    resolveLetters() {
        const resolvedLetters = [];

        const letters = this.collection.map(note => {
            return note.getLetter();
        });

        const conflicts = letters.filter((letter, index) => {
            return letters.indexOf(letter) !== index;
        });

        if (conflicts.length === 0) return;

        this.collection.forEach(note => {
            const isConflicting = conflicts.includes(note.getLetter());
            const noteIsNotResolved = !this.resolvedNotes.includes(note.getId());
            const letterIsNotResolved = !resolvedLetters.includes(note.getLetter());

            if (isConflicting && noteIsNotResolved && letterIsNotResolved) {
                this.resolvedNotes.push(note.getId());
                resolvedLetters.push(note.getLetter());
                note.resolveLetter(this.getSignature());
            }
        });

        this.resolveLetters();
    }

    indexOf(find) {
        let index;

        if (typeof find === 'number') {
            index = find;
        } else if (typeof find === 'string') {
            index = this.collection.findIndex(note => note.symbol === find);
        } else if (find instanceof Note) {
            index = this.collection.indexOf(find);
        } else {
            throw 'startWith only accepts a number, string or a note class';
        }

        if (index === -1) {
            throw new Error(`note ${find} was not found in collection`);
        }

        return index;
    }

    startWith(find) {
        const index = this.indexOf(find);
        const indexes = [...this.collection.keys()];
        const indexesToAppend = indexes.slice(0, index);
        const indexesToPrepend = indexes.slice(index);
        const sortedIndexes = indexesToPrepend.concat(indexesToAppend);
        const sortedNotes = sortedIndexes.map(index => this.collection[index]);

        return new Notes(sortedNotes);
    }
}

export default Notes;
