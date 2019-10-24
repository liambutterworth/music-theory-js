<template>
    <div class="fretboard-string">
        <fretboard-fret
            v-for="note in notes"
            :key="note.symbol"
            :note="note"
            :pressed="pressNote(note)"
        />
    </div>
</template>

<script>

import Music from '../support/Music';
import FretboardFret from './FretboardFret';

export default {
    name: 'fretboard-string',

    components: {
        FretboardFret,
    },

    props: {
        group: {
            required: true,
            type: [Music.Chord, Music.Scale],
        },

        root: {
            required: true,
            type: String,
        },

        signature: {
            default: 'flat',
            type: String,
        },
    },

    data() {
        return {
            notes: null,
        };
    },

    created() {
        this.notes = Music.notes(this.signature);
    },

    methods: {
        pressNote(note) {
            return note.in(this.group);
        },
    },
}

</script>
