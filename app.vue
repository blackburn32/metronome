<template>
    <div class="flex flex-col w-screen h-screen justify-center items-center" data-theme="dark">
        <Metronome/>
    </div>
    <div class="absolute bottom-0 right-0 p-4">
        <NuxtLink external="external" href="https://github.com/blackburn32/metronome">
            <Icon
                name="mdi:github"
                size="32"
            />
        </NuxtLink>
    </div>
</template>
<script setup lang="ts">
useHead({
    title: 'Metronome',
    meta: [
        { name: 'description', content: 'A simple metronome component built with Nuxt and Tailwind CSS.' }
    ],
})
</script>