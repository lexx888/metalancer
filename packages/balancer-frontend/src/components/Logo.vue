<template>
    <router-link class="logo" :to="'/'">
        <img src="../assets/images/logo.png" />
        <!-- <span class="logo__d"></span> -->
        <!-- <span class="logo__2">L</span>  -->
    </router-link>
</template>

<style scoped>
.logo {
    position: relative;
    font-size: 40px;
    font-weight: 900;
    line-height: 1;
    color: rgb(168, 14, 14);
}

.logo__d {
    font-size: 1em;
}

.logo__2 {
    position: absolute;
    top: -0.3em;
    right: -0.3em;
    font-size: 0.4em;
}
</style>
