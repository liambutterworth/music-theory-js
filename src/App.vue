<template>
    <div>
        <header id="header">
            <router-link to="/">Home</router-link>
        </header>

        <main id="page">
            <router-view />
        </main>
    </div>
</template>

<style lang="scss">

* {
    border: none;
    margin: 0;
    padding: 0;

    &, &::after, &::before {
        box-sizing: border-box;
    }
}

</style>
