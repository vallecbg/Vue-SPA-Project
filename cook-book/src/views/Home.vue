<template>
    <span>
        <home-hero></home-hero>
        <home-details></home-details>
    </span>
</template>

<script>

export default {
    name: 'Home',
    components: {
        HomeHero: () => import('@/components/HomeHero'),
        HomeDetails: () => import('@/components/HomeDetails')
    }
};
</script>
