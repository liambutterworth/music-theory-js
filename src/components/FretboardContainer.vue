<template>
    <div>
        <fretboard-string :group="group" :root="root" />
    </div>
</template>

<script>

import Music from '../support/Music';
import FretboardString from './FretboardString';

export default {
    name: 'fretboard-container',

    components: {
        FretboardString,
    },

    data() {
        return {
            root: 'C',
            group: null,
        };
    },

    created() {
        this.group = new Music.Scale('C', 'major');
    },
}

</script>
