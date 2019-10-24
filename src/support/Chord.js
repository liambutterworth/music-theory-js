import Data from './Data';
import Degrees from './Degrees';
import Note from './Note';

class Chord {
    constructor(notation) {
        const matches = notation.match(/([A-G](?:#|b)?)(\w+)/);

        this.root = new Note(matches[1]);
        this.symbol = matches[2] || 'maj';
        this.data = Data.chords.find(this.symbol);
        this.name = this.data.name;
        this.degrees = new Degrees(this.data.degrees);
        this.intervals = this.degrees.getIntervals();
        this.notes = this.degrees.getNotes(this.root);
    }
}

export default Chord;
