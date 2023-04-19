<template>
    <div class="flex flex-col w-screen h-screen justify-center items-center" data-theme="dark">
        <Metronome/>
    </div>
    <div class="absolute bottom-0 right-0 p-4">
        <NuxtLink external="external" href="https://github.com/blackburn32/metronome">
            <Icon
                class="text-base-content hover:text-accent-content transform transition-transform duration-200 hover:scale-125"
                name="mdi:github"
                size="32"
            />
        </NuxtLink>
    </div>
</template>
<script lang="ts" setup>
useHead({
    title: 'Metronome',
    meta: [
        {
            name: 'description',
            content: 'A simple metronome component built with Nuxt and Tailwind CSS.',
        },
    ],
});
</script>