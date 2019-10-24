import Data from './Data';
import Degrees from './Degrees';
import Note from './Note';

class Scale {
    constructor(root, name) {
        this.root = new Note(root);
        this.data = Data.scales.find(name);
        this.name = this.data.name;
        this.degrees = new Degrees(this.data.degrees);
        this.intervals = this.degrees.getIntervals();
        this.notes = this.degrees.getNotes(this.root);
    }
}

export default Scale;
